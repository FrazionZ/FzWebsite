<?php

namespace App\Mail;

use App\Models\EmailIdentify;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

class ConfirmMail extends Mailable
{
    use Queueable, SerializesModels;

   
    public $subject = "";
    public $codeTempo = "";

    public function __construct($request, $subject = "")
    {
        $this->subject = $subject;
        $this->codeTempo = Str::random(12);

        //CHECK AND REMOVE OLD CODE
        $codes = EmailIdentify::where('user_id', $request->user()->id)->get();
        foreach($codes as $code)
            $code->delete();

        EmailIdentify::insert([
            'code' => bcrypt($this->codeTempo),
            'user_id' => $request->user()->id
        ]);
    }

    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
    public function envelope()
    {
        return new Envelope(
            subject: 'Confirmation de votre adresse mail - '.$this->subject,
        );
    }

    /**
     * Get the message content definition.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */
    public function content()
    {
        return new Content(
            view: 'emails.identify',
            with: [
                'codeTempo' => $this->codeTempo
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}
