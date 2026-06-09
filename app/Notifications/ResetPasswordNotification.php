<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    /**
     * The password reset token.
     *
     * @var string
     */
    public $token;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $url = URL::temporarySignedRoute(
            'password.reset',
            Carbon::now()->addMinutes(Config::get('auth.passwords.' . Config::get('auth.defaults.passwords') . '.expire')),
            [
                'token' => $this->token,
                'email' => $notifiable->getEmailForPasswordReset(),
            ]
        );

        return (new MailMessage)
            ->subject(Lang::get('Restablecer Contraseña'))
            ->greeting('¡Hola ' . $notifiable->name . '!')
            ->line(Lang::get('Has solicitado restablecer tu contraseña en LuckFeer.'))
            ->line(Lang::get('Haz clic en el botón a continuación para continuar:'))
            ->action(Lang::get('Restablecer Contraseña'), $url)
            ->line(Lang::get('Este enlace de restablecimiento de contraseña expirará en :count minutos.', ['count' => Config::get('auth.passwords.' . Config::get('auth.defaults.passwords') . '.expire')]))
            ->line(Lang::get('Si no solicitaste un restablecimiento de contraseña, por favor ignora este correo electrónico.'))
            ->salutation('Saludos')
            ->line('Equipo LuckFeer');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
