<?php

namespace App\Admin;

/**
 * Converts the JSON "blocks" body format to an editable plain-text form and back:
 *   "## Heading"        → ['type' => 'h2', 'text' => 'Heading']
 *   "![](media/x.jpg)"  → ['type' => 'image', 'src' => 'media/x.jpg']
 *   other paragraphs    → ['type' => 'p', 'text' => '…']
 * Paragraphs are separated by a blank line.
 */
class BlockText
{
    public static function toText(?array $blocks): string
    {
        return collect($blocks ?? [])->map(fn (array $b) => match ($b['type'] ?? 'p') {
            'h2' => '## '.$b['text'],
            'image' => '!['.($b['alt'] ?? '').']('.$b['src'].')',
            default => $b['text'] ?? '',
        })->implode("\n\n");
    }

    public static function toBlocks(?string $text): array
    {
        $chunks = preg_split("/\R\s*\R/u", trim((string) $text)) ?: [];

        return collect($chunks)
            ->map(fn ($chunk) => trim($chunk))
            ->filter()
            ->map(function (string $chunk) {
                if (str_starts_with($chunk, '## ')) {
                    return ['type' => 'h2', 'text' => trim(substr($chunk, 3))];
                }
                if (preg_match('/^!\[(.*?)\]\((.+?)\)$/u', $chunk, $m)) {
                    return array_filter(['type' => 'image', 'src' => $m[2], 'alt' => $m[1] ?: null]);
                }

                return ['type' => 'p', 'text' => preg_replace('/\s*\R\s*/u', ' ', $chunk)];
            })
            ->values()
            ->all();
    }
}
