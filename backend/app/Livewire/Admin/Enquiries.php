<?php

namespace App\Livewire\Admin;

use App\Models\Enquiry;
use App\Services\EnquiryService;
use Illuminate\Validation\Rule;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Attributes\Url;
use Livewire\Component;
use Livewire\WithPagination;

#[Layout('layouts.admin')]
#[Title('Müraciətlər')]
class Enquiries extends Component
{
    use WithPagination;

    #[Url(except: '')]
    public string $status = '';

    #[Url(except: '')]
    public string $search = '';

    #[Url(as: 'id')]
    public ?int $selectedId = null;

    public string $newStatus = 'new';

    public string $note = '';

    public function mount(?Enquiry $enquiry = null): void
    {
        if ($enquiry?->exists) {
            $this->select($enquiry->id);
        } elseif ($this->selectedId) {
            $this->select($this->selectedId);
        }
    }

    public function updating($property): void
    {
        if (in_array($property, ['status', 'search'], true)) {
            $this->resetPage();
        }
    }

    public function select(int $id): void
    {
        $enquiry = Enquiry::query()->findOrFail($id);
        $this->selectedId = $enquiry->id;
        $this->newStatus = $enquiry->status;
        $this->note = (string) $enquiry->admin_note;
    }

    public function close(): void
    {
        $this->selectedId = null;
    }

    public function saveStatus(EnquiryService $service): void
    {
        $this->validate([
            'newStatus' => ['required', Rule::in(array_keys(Enquiry::STATUSES))],
            'note' => ['nullable', 'string', 'max:5000'],
        ]);

        $service->updateStatus(Enquiry::query()->findOrFail($this->selectedId), $this->newStatus, $this->note ?: null);
        session()->flash('status', 'Müraciət yeniləndi.');
    }

    public function delete(int $id): void
    {
        Enquiry::query()->whereKey($id)->delete();
        if ($this->selectedId === $id) {
            $this->selectedId = null;
        }
        session()->flash('status', 'Müraciət silindi.');
    }

    public function render()
    {
        return view('livewire.admin.enquiries', [
            'enquiries' => Enquiry::query()
                ->status($this->status ?: null)
                ->when($this->search, fn ($q) => $q->where(fn ($w) => $w
                    ->where('name', 'like', "%{$this->search}%")
                    ->orWhere('email', 'like', "%{$this->search}%")
                    ->orWhere('company', 'like', "%{$this->search}%")))
                ->latest()
                ->paginate(15),
            'selected' => $this->selectedId ? Enquiry::query()->find($this->selectedId) : null,
            'counts' => Enquiry::query()->selectRaw('status, count(*) as total')->groupBy('status')->pluck('total', 'status'),
        ]);
    }
}
