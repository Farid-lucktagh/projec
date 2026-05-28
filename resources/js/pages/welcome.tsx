import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';
import { Zap, LogIn, UserPlus, Wrench, Hammer, Ruler, Drill, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Welcome({
  canRegister = true,
}: {
  canRegister?: boolean;
}) {
  const { auth } = usePage<SharedData>().props;
  const isLoggedIn = auth?.user !== null;
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 1500);
    const timer2 = setTimeout(() => setAnimationStage(2), 3000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <Head title="Luckfeer - Sistema de Gestión" />
      <div className="min-h-screen bg-background overflow-hidden relative">
        {/* Herramientas de fondo animadas */}
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
        
        {/* Animación de Apertura */}
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-primary transition-transform duration-1000 ease-in-out"
            style={{
              transform: animationStage >= 1 ? 'translateY(-100%)' : 'translateY(0)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-primary transition-transform duration-1000 ease-in-out"
            style={{
              transform: animationStage >= 1 ? 'translateY(100%)' : 'translateY(0)',
            }}
          />
        </div>

        {/* Contenido Principal Simplificado */}
        <div
          className="min-h-screen flex flex-col items-center justify-center transition-opacity duration-1000 px-4"
          style={{
            opacity: animationStage >= 2 ? 1 : 0,
            pointerEvents: animationStage >= 2 ? 'auto' : 'none',
          }}
        >
          {/* Logo Difuminado en el Centro */}
          <div className="mb-12">
            <img 
              src="/Luckfeer.png" 
              alt="Luckfeer Logo" 
              className="w-24 h-24 object-contain opacity-70"
            />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Luckfeer
          </h1>
          <p className="text-muted-foreground mb-10 text-center">
            Sistema de Gestión Profesional
          </p>

          {isLoggedIn ? (
            <Link
              href={dashboard()}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-4 text-base font-semibold text-primary-foreground hover:bg-accent transition-all shadow-lg"
            >
              Ir al Dashboard
              <Zap className="w-5 h-5" />
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={login()}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground hover:bg-accent transition-all shadow-lg"
              >
                <LogIn className="w-5 h-5" />
                Iniciar Sesión
              </Link>
              {canRegister && (
                <Link
                  href={register()}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-input px-8 py-4 text-base font-semibold text-foreground hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  <UserPlus className="w-5 h-5" />
                  Registrarse
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
