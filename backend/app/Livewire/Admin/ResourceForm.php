<?php

namespace App\Livewire\Admin;

use App\Admin\AdminResources;
use App\Admin\BlockText;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Locked;
use Livewire\Component;
use Livewire\WithFileUploads;

#[Layout('layouts.admin')]
class ResourceForm extends Component
{
    use WithFileUploads;

    #[Locked]
    public string $resource;

    #[Locked]
    public ?int $recordId = null;

    /** Form state keyed by field name. */
    public array $data = [];

    /** Pending image uploads keyed by field name. */
    public array $uploads = [];

    public function mount(string $resource, ?int $id = null): void
    {
        $config = AdminResources::get($resource);
        $this->resource = $resource;
        $this->recordId = $id;

        $record = $id ? $config['model']::query()->findOrFail($id) : new $config['model'];

        foreach ($config['fields'] as $name => [$type]) {
            $value = $record->{$name};
            $this->data[$name] = match ($type) {
                'blocks' => BlockText::toText($value),
                'lines' => implode("\n", $value ?? []),
                'json' => $value ? json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : '',
                'checkbox' => (bool) ($value ?? ($name === 'is_published')),
                'date' => $value?->format('Y-m-d\TH:i'),
                'number' => $value ?? ($name === 'sort' ? 0 : null),
                default => $value,
            };
        }
    }

    public function updatedDataTitle(string $value): void
    {
        $config = AdminResources::get($this->resource);

        if (! $this->recordId && isset($config['fields']['slug']) && blank($this->data['slug'] ?? null)) {
            $this->data['slug'] = Str::slug(Str::ascii($value));
        }
    }

    public function updatedDataName(string $value): void
    {
        $this->updatedDataTitle($value);
    }

    protected function rules(): array
    {
        $config = AdminResources::get($this->resource);
        $table = (new $config['model'])->getTable();
        $rules = [];

        foreach ($config['fields'] as $name => $field) {
            [$type, , $rule] = $field;
            $parts = explode('|', $rule);

            if (in_array('unique', $parts, true)) {
                $parts = array_diff($parts, ['unique']);
                $parts[] = Rule::unique($table, $name)->ignore($this->recordId);
            }
            if ($type === 'select') {
                $parts[] = Rule::in(array_keys($field[3]));
            }

            $rules["data.{$name}"] = array_values($parts);

            if ($type === 'image') {
                $rules["uploads.{$name}"] = ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'];
            }
        }

        return $rules;
    }

    protected function validationAttributes(): array
    {
        $config = AdminResources::get($this->resource);

        return collect($config['fields'])->mapWithKeys(fn ($f, $name) => ["data.{$name}" => mb_strtolower($f[1]), "uploads.{$name}" => mb_strtolower($f[1])])->all();
    }

    public function removeImage(string $field): void
    {
        $this->data[$field] = null;
        unset($this->uploads[$field]);
    }

    public function save()
    {
        $this->validate();
        $config = AdminResources::get($this->resource);

        /** @var Model $record */
        $record = $this->recordId ? $config['model']::query()->findOrFail($this->recordId) : new $config['model'];

        foreach ($config['fields'] as $name => [$type]) {
            $value = $this->data[$name] ?? null;

            $record->{$name} = match ($type) {
                'blocks' => BlockText::toBlocks($value),
                'lines' => array_values(array_filter(array_map('trim', preg_split('/\R/u', (string) $value)))) ?: null,
                'json' => filled($value) ? json_decode($value, true) : null,
                'checkbox' => (bool) $value,
                'number' => $value === '' ? null : $value,
                'image' => $this->storeImage($name, $record->{$name}),
                default => $value === '' ? null : $value,
            };
        }

        $record->save();

        session()->flash('status', $config['singular'].' yadda saxlanıldı.');

        return $this->redirectRoute('admin.resources.edit', ['resource' => $this->resource, 'id' => $record->getKey()], navigate: true);
    }

    private function storeImage(string $field, ?string $current): ?string
    {
        $upload = $this->uploads[$field] ?? null;

        if ($upload) {
            $path = $upload->store("uploads/{$this->resource}", 'public');

            if ($current && str_starts_with($current, 'uploads/')) {
                Storage::disk('public')->delete($current);
            }

            return $path;
        }

        return $this->data[$field] ?? null;
    }

    public function render()
    {
        $config = AdminResources::get($this->resource);

        return view('livewire.admin.resource-form', ['config' => $config])
            ->title(($this->recordId ? 'Redaktə: ' : 'Yeni: ').$config['singular']);
    }
}
