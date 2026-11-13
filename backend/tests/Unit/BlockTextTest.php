<?php

namespace Tests\Unit;

use App\Admin\BlockText;
use PHPUnit\Framework\TestCase;

class BlockTextTest extends TestCase
{
    public function test_round_trip(): void
    {
        $blocks = [
            ['type' => 'p', 'text' => 'Giriş abzası.'],
            ['type' => 'h2', 'text' => 'Praktik təcrübə'],
            ['type' => 'image', 'src' => 'media/news/a.jpg'],
            ['type' => 'p', 'text' => 'Son abzas.'],
        ];

        $text = BlockText::toText($blocks);

        $this->assertSame("Giriş abzası.\n\n## Praktik təcrübə\n\n![](media/news/a.jpg)\n\nSon abzas.", $text);
        $this->assertSame($blocks, BlockText::toBlocks($text));
    }

    public function test_line_breaks_inside_a_paragraph_are_joined_and_blank_input_is_empty(): void
    {
        $this->assertSame([['type' => 'p', 'text' => 'bir iki']], BlockText::toBlocks("bir\niki"));
        $this->assertSame([], BlockText::toBlocks("  \n\n "));
        $this->assertSame('', BlockText::toText(null));
    }
}
