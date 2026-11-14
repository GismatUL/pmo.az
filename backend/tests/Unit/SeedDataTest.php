<?php

namespace Tests\Unit;

use Database\Seeders\Support\SeedData;
use PHPUnit\Framework\TestCase;

class SeedDataTest extends TestCase
{
    public function test_media_points_at_the_live_site(): void
    {
        $this->assertSame('https://pmo.az/images/news/a_1.jpg', SeedData::media('/images/news/a_1.jpg'));
        $this->assertSame('https://pmo.az/images/news/a_1.jpg', SeedData::media('images/news/a_1.jpg'));
    }

    public function test_media_encodes_each_segment(): void
    {
        $this->assertSame('https://pmo.az/images/feedback/elg%C3%BCn_1.jpg', SeedData::media('/images/feedback/elgün_1.jpg'));
        $this->assertSame('https://pmo.az/images/partners/Uni%5B1%5D_1.svg', SeedData::media('/images/partners/Uni[1]_1.svg'));
    }

    public function test_media_is_null_safe(): void
    {
        $this->assertNull(SeedData::media(null));
        $this->assertNull(SeedData::media(''));
    }
}
