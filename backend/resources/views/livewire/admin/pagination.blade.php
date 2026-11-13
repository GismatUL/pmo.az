@if ($paginator->hasPages())
    <nav class="pager" aria-label="Səhifələr">
        <button type="button" class="btn btn-ghost" wire:click="previousPage" @disabled($paginator->onFirstPage())>← Əvvəlki</button>
        <span class="muted">{{ $paginator->currentPage() }} / {{ $paginator->lastPage() }}</span>
        <button type="button" class="btn btn-ghost" wire:click="nextPage" @disabled(! $paginator->hasMorePages())>Növbəti →</button>
    </nav>
@endif
