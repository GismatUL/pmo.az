<?php

namespace App\Livewire\Admin;

use App\Models\Enquiry;
use App\Models\Expert;
use App\Models\Post;
use App\Models\Program;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Component;

#[Layout('layouts.admin')]
#[Title('İdarə paneli')]
class Dashboard extends Component
{
    public function render()
    {
        return view('livewire.admin.dashboard', [
            'cards' => [
                ['Yeni müraciətlər', Enquiry::query()->where('status', 'new')->count(), route('admin.enquiries')],
                ['Bloq yazıları', Post::query()->count(), route('admin.resources.index', 'posts')],
                ['Proqramlar', Program::query()->count(), route('admin.resources.index', 'programs')],
                ['Ekspertlər', Expert::query()->count(), route('admin.resources.index', 'experts')],
            ],
            'latestEnquiries' => Enquiry::query()->latest()->limit(5)->get(),
            'latestPosts' => Post::query()->latestFirst()->limit(5)->get(['id', 'title', 'category', 'published_at']),
        ]);
    }
}
