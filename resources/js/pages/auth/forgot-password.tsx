// Components
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { email } from '@/routes/password';
import { Zap, LogIn, UserPlus, Wrench, Hammer, Ruler, Drill, Settings } from 'lucide-react';


export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Olvidé mi contraseña"
            description="Ingresa tu correo electrónico para recibir un enlace de restablecimiento de contraseña"
        >
            <Head title="Olvidé mi contraseña" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="space-y-6">

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

                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="email@ejemplo.com"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div className="my-6 flex items-center justify-start">
                                <Button
                                    className="w-full"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Enviar enlace de restablecimiento
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="space-x-1 text-center text-sm text-muted-foreground">
                    <span>O, regresa a</span>
                    <TextLink href={login()}>iniciar sesión</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
