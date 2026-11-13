<?php

namespace App\Listeners;

use App\Events\EnquirySubmitted;
use App\Mail\NewEnquiryMail;
use App\Models\Setting;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;

/** Emails the team about a new enquiry (queued so the API response stays fast). */
class NotifyTeamOfEnquiry implements ShouldQueue
{
    public function handle(EnquirySubmitted $event): void
    {
        $to = Setting::map()['enquiry_notify_email'] ?? null;

        if ($to) {
            Mail::to($to)->send(new NewEnquiryMail($event->enquiry));
        }
    }
}
