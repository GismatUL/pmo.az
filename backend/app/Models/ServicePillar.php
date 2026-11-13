<?php

namespace App\Models;

use Database\Factories\ServicePillarFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServicePillar extends Model
{
    /** @use HasFactory<ServicePillarFactory> */
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'summary',
        'home_summary',
        'highlights',
        'body',
        'link_label',
        'link_url',
        'image',
        'sort',
    ];

    protected function casts(): array
    {
        return [
            'highlights' => 'array',
            'body' => 'array',
            'sort' => 'integer',
        ];
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort')->orderBy('id');
    }
}
