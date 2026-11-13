<?php

namespace App\Livewire\Admin;

use App\Admin\AdminResources;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Locked;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;

#[Layout('layouts.admin')]
class ResourceIndex extends Component
{
    use WithPagination;

    #[Locked]
    public string $resource;

    #[Url(except: '')]
    public string $search = '';

    #[Url(except: '')]
    public string $filter = '';

    public function mount(string $resource): void
    {
        AdminResources::get($resource);
        $this->resource = $resource;
    }

    public function updating($property): void
    {
        if (in_array($property, ['search', 'filter'], true)) {
            $this->resetPage();
        }
    }

    public function delete(int $id): void
    {
        $config = AdminResources::get($this->resource);
        $record = $config['model']::query()->findOrFail($id);

        foreach ($config['fields'] as $name => [$type]) {
            if ($type === 'image' && $record->{$name} && str_starts_with($record->{$name}, 'uploads/')) {
                Storage::disk('public')->delete($record->{$name});
            }
        }

        $record->delete();
        session()->flash('status', $config['singular'].' silindi.');
    }

    public function render()
    {
        $config = AdminResources::get($this->resource);
        [$orderColumn, $orderDirection] = $config['order'];

        $records = $config['model']::query()
            ->when($this->search, fn (Builder $q) => $q->where(function (Builder $w) use ($config) {
                foreach ($config['search'] as $column) {
                    $w->orWhere($column, 'like', '%'.$this->search.'%');
                }
            }))
            ->when($this->filter && isset($config['filter']), fn (Builder $q) => $q->where($config['filter'][0], $this->filter))
            ->orderBy($orderColumn, $orderDirection)
            ->orderBy('id', $orderDirection)
            ->paginate(20);

        return view('livewire.admin.resource-index', compact('config', 'records'))
            ->title($config['label']);
    }
}
