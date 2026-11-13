<?php

namespace App\Models;

use Database\Factories\PartnerFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    /** @use HasFactory<PartnerFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'logo',
        'url',
        'is_published',
        'sort',
    ];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
            'sort' => 'integer',
        ];
    }

    public const TYPES = ['accreditation' => 'Akkreditasiya', 'partner' => 'Tərəfdaş'];

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort')->orderBy('id');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }
}
