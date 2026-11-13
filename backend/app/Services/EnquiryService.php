<?php

namespace App\Services;

use App\Events\EnquirySubmitted;
use App\Models\Enquiry;
use Illuminate\Support\Str;

class EnquiryService
{
    public function submit(array $data, ?string $ip, ?string $userAgent): Enquiry
    {
        $enquiry = Enquiry::query()->create([
            ...$data,
            'status' => 'new',
            'ip_address' => $ip,
            'user_agent' => $userAgent ? Str::limit($userAgent, 250, '') : null,
        ]);

        EnquirySubmitted::dispatch($enquiry);

        return $enquiry;
    }

    public function updateStatus(Enquiry $enquiry, string $status, ?string $note = null): Enquiry
    {
        $enquiry->forceFill([
            'status' => $status,
            'admin_note' => $note,
            'handled_at' => $status === 'new' ? null : ($enquiry->handled_at ?? now()),
        ])->save();

        return $enquiry;
    }
}
