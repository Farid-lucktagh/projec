import { router, usePage } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

type SessionTimeoutProps = {
    timeoutMinutes?: number;
    warningBeforeMinutes?: number;
};

export function SessionTimeout({
    timeoutMinutes = 120,
    warningBeforeMinutes = 5,
}: SessionTimeoutProps) {
    const { auth } = usePage().props;
    const [showWarning, setShowWarning] = useState(false);
    const [timeLeft, setTimeLeft] = useState(warningBeforeMinutes * 60);
    
    const timeoutMs = timeoutMinutes * 60 * 1000;
    const warningMs = (timeoutMinutes - warningBeforeMinutes) * 60 * 1000;
    
    const resetTimer = useCallback(() => {
        setShowWarning(false);
        setTimeLeft(warningBeforeMinutes * 60);
    }, [warningBeforeMinutes]);

    const handleStayLoggedIn = () => {
        resetTimer();
        // Ping the server to refresh the session
        router.reload({ only: [] });
    };

    const handleLogout = () => {
        router.post('/logout', {}, {
            onSuccess: () => {
                router.visit('/');
            }
        });
    };

    useEffect(() => {
        if (!auth?.user) {
            return;
        }

        let warningTimeout: NodeJS.Timeout;
        let logoutTimeout: NodeJS.Timeout;
        let countdownInterval: NodeJS.Timeout;

        const startTimers = () => {
            warningTimeout = setTimeout(() => {
                setShowWarning(true);
                setTimeLeft(warningBeforeMinutes * 60);
                
                countdownInterval = setInterval(() => {
                    setTimeLeft((prev) => {
                        if (prev <= 1) {
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }, warningMs);

            logoutTimeout = setTimeout(() => {
                handleLogout();
            }, timeoutMs);
        };

        const clearTimers = () => {
            if (warningTimeout) clearTimeout(warningTimeout);
            if (logoutTimeout) clearTimeout(logoutTimeout);
            if (countdownInterval) clearInterval(countdownInterval);
        };

        const resetTimers = () => {
            clearTimers();
            resetTimer();
            startTimers();
        };

        const events = [
            'mousemove',
            'mousedown',
            'click',
            'scroll',
            'keypress',
            'keydown',
            'keyup',
            'touchstart',
            'touchmove',
        ];

        events.forEach((event) => {
            document.addEventListener(event, resetTimers, { passive: true });
        });

        startTimers();

        return () => {
            clearTimers();
            events.forEach((event) => {
                document.removeEventListener(event, resetTimers);
            });
        };
    }, [auth?.user, timeoutMs, warningMs, warningBeforeMinutes, resetTimer]);

    if (!auth?.user) {
        return null;
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Dialog open={showWarning} onOpenChange={setShowWarning}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                        Sesión a punto de expirar
                    </DialogTitle>
                    <DialogDescription>
                        Por inactividad, tu sesión se cerrará automáticamente en:
                        <div className="mt-2 text-2xl font-bold text-center text-orange-600">
                            {formatTime(timeLeft)}
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex sm:justify-between gap-2">
                    <Button variant="outline" onClick={handleLogout}>
                        Cerrar Sesión
                    </Button>
                    <Button onClick={handleStayLoggedIn}>
                        Permanecer Conectado
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
