<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ApprovalMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $organizationName,
        public string $loginUrl,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Organization Has Been Approved!',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.approval',
            with: [
                'organizationName' => $this->organizationName,
                'loginUrl' => $this->loginUrl,
            ],
        );
    }
}
