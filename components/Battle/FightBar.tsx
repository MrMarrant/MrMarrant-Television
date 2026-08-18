"use client";

import React, { useEffect, useRef, useState } from 'react';

const PERIOD_MS = 900;
const AUTO_RESOLVE_MS = 3200;

interface FightBarProps {
    playerAtk: number;
    onResolve: (damage: number) => void;
}

function computePosition(elapsed: number): number {
    return 50 + 45 * Math.sin((elapsed / PERIOD_MS) * Math.PI * 2);
}

const FightBar: React.FC<FightBarProps> = ({ playerAtk, onResolve }) => {
    const [pos, setPos] = useState(50);
    const startRef = useRef<number | null>(null);
    const resolvedRef = useRef(false);
    const rafRef = useRef<number>(0);
    const onResolveRef = useRef(onResolve);

    useEffect(() => { onResolveRef.current = onResolve; }, [onResolve]);

    useEffect(() => {
        resolvedRef.current = false;
        startRef.current = performance.now();

        const resolve = (elapsed: number) => {
            if (resolvedRef.current) return;
            resolvedRef.current = true;
            const p = computePosition(elapsed);
            const accuracy = 1 - Math.abs(p - 50) / 45;
            const damage = Math.max(1, Math.round(playerAtk * (0.3 + accuracy * 1.2)));
            onResolveRef.current(damage);
        };

        const tick = (now: number) => {
            const elapsed = now - (startRef.current ?? now);
            setPos(computePosition(elapsed));
            if (!resolvedRef.current) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                resolve(performance.now() - (startRef.current ?? performance.now()));
            }
        };
        window.addEventListener('keydown', onKeyDown);

        const timeout = setTimeout(() => resolve(AUTO_RESOLVE_MS), AUTO_RESOLVE_MS);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('keydown', onKeyDown);
            clearTimeout(timeout);
        };
    }, [playerAtk]);

    return (
        <div className="px-8 py-6">
            <p className="text-white text-sm mb-4">* Press SPACE or ENTER when the marker is centered!</p>
            <div className="relative h-6 border-2 border-white bg-black">
                <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-green-500/60" />
                <div
                    className="absolute top-0 bottom-0 w-2 bg-yellow-400"
                    style={{ left: `calc(${pos}% - 4px)` }}
                />
            </div>
        </div>
    );
};

export default FightBar;
