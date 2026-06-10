import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/password/confirm';
import { Zap, LogIn, UserPlus, Wrench, Hammer, Ruler, Drill, Settings } from 'lucide-react';


export default function ConfirmPassword() {
    return (
        <AuthLayout
            title="Confirma tu contraseña"
            description="Esta es un área segura de la aplicación. Por favor, confirma tu contraseña antes de continuar."
        >
            <Head title="Confirmar contraseña" />

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

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Contraseña"
                                autoComplete="current-password"
                                autoFocus
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center">
                            <Button
                                className="w-full"
                                disabled={processing}
                                data-test="confirm-password-button"
                            >
                                {processing && <Spinner />}
                                Confirmar contraseña
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
