import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { update } from '@/routes/password';
import { Zap, LogIn, UserPlus, Wrench, Hammer, Ruler, Drill, Settings } from 'lucide-react';



type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <AuthLayout
            title="Restablecer contraseña"
            description="Por favor, ingresa tu nueva contraseña a continuación"
        >
            <Head title="Restablecer contraseña" />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] text-primary opacity-5 animate-bounce" style={{ animationDelay: '6s' }}>
            <Wrench size={48} />
          </div>
          <div className="absolute top-[20%] right-[10%] text-primary opacity-4 animate-pulse" style={{ animationDelay: '6.5s' }}>
            <Hammer size={56} />
          </div>
          <div className="absolute bottom-[30%] left-[15%] text-primary opacity-3 animate-bounce" style={{ animationDelay: '7s' }}>
            <Settings size={44} />
          </div>
          <div className="absolute bottom-[20%] right-[5%] text-primary opacity-4 animate-pulse" style={{ animationDelay: '7.5s' }}>
            <Ruler size={64} />
          </div>
          <div className="absolute top-[60%] left-[80%] text-primary opacity-3 animate-bounce" style={{ animationDelay: '8s' }}>
            <Drill size={52} />
          </div>
          <div className="absolute top-[40%] left-[40%] text-primary opacity-2 animate-pulse" style={{ animationDelay: '8.5s' }}>
            <Wrench size={40} />
          </div>
          <div className="absolute bottom-[10%] left-[50%] text-primary opacity-3 animate-bounce" style={{ animationDelay: '9s' }}>
            <Hammer size={48} />
          </div>
          <div className="absolute top-[15%] right-[40%] text-primary opacity-2 animate-pulse" style={{ animationDelay: '9.5s' }}>
            <Settings size={36} />
          </div>
        </div>

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                className="mt-1 block w-full"
                                readOnly
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                autoComplete="new-password"
                                className="mt-1 block w-full"
                                autoFocus
                                placeholder="Contraseña"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Confirmar contraseña
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                autoComplete="new-password"
                                className="mt-1 block w-full"
                                placeholder="Confirmar contraseña"
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            disabled={processing}
                            data-test="reset-password-button"
                        >
                            {processing && <Spinner />}
                            Restablecer contraseña
                        </Button>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
