// Components
import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Zap, LogIn, UserPlus, Wrench, Hammer, Ruler, Drill, Settings } from 'lucide-react';


export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Verificar correo"
            description="Por favor, verifica tu correo electrónico haciendo clic en el enlace que acabamos de enviarte por correo."
        >
            <Head title="Verificación de correo" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionaste durante el registro.
                </div>
            )}

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

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <Button disabled={processing} variant="secondary">
                            {processing && <Spinner />}
                            Reenviar correo de verificación
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block text-sm"
                        >
                            Cerrar sesión
                        </TextLink>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
