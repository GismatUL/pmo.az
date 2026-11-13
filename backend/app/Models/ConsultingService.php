<?php

namespace App\Models;

use Database\Factories\ConsultingServiceFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConsultingService extends Model
{
    /** @use HasFactory<ConsultingServiceFactory> */
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'crumb',
        'summary',
        'intro',
        'detail',
        'is_published',
        'sort',
    ];

    protected function casts(): array
    {
        return [
            'detail' => 'array',
            'is_published' => 'boolean',
            'sort' => 'integer',
        ];
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort')->orderBy('id');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }
}
