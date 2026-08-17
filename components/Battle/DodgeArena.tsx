"use client";

import React, { useEffect, useRef } from 'react';
import {
    Bullet,
    PatternState,
    createPatternState,
    spawnRain,
    spawnBones,
    spawnHoming,
    updateBullets,
    checkCollision,
} from './bulletPatterns';

const BOX_W = 440;
const BOX_H = 200;
const SOUL_R = 5;
const SOUL_SPEED = 0.17; // px/ms
const IFRAME_MS = 650;
const HEART_PATH = 'M10 18l-1-1C4 12 1 9 1 5a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 4-3 7-8 12l-1 1z';

interface DodgeArenaProps {
    patternIndex: 0 | 1 | 2;
    duration: number;
    enemyAtk: number;
    onHit: (damage: number) => void;
    onComplete: () => void;
}

const DodgeArena: React.FC<DodgeArenaProps> = ({ patternIndex, duration, enemyAtk, onHit, onComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const onHitRef = useRef(onHit);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => { onHitRef.current = onHit; }, [onHit]);
    useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const heartPath = new Path2D(HEART_PATH);
        const soul = { x: BOX_W / 2, y: BOX_H / 2 };
        const keys = new Set<string>();
        let bullets: Bullet[] = [];
        const patternState: PatternState = createPatternState();
        let iframeUntil = 0;
        let lastTime = performance.now();
        const startTime = lastTime;
        let done = false;
        let animationFrameId: number;

        const arrowKeys = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

        const onKeyDown = (e: KeyboardEvent) => {
            if (arrowKeys.has(e.key)) {
                e.preventDefault();
                keys.add(e.key);
            }
        };
        const onKeyUp = (e: KeyboardEvent) => {
            keys.delete(e.key);
        };
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        const render = (now: number) => {
            const dt = now - lastTime;
            lastTime = now;
            const elapsed = now - startTime;

            if (!done) {
                let dx = 0, dy = 0;
                if (keys.has('ArrowLeft')) dx -= 1;
                if (keys.has('ArrowRight')) dx += 1;
                if (keys.has('ArrowUp')) dy -= 1;
                if (keys.has('ArrowDown')) dy += 1;
                if (dx !== 0 && dy !== 0) { dx *= Math.SQRT1_2; dy *= Math.SQRT1_2; }
                soul.x = Math.min(BOX_W - SOUL_R, Math.max(SOUL_R, soul.x + dx * SOUL_SPEED * dt));
                soul.y = Math.min(BOX_H - SOUL_R, Math.max(SOUL_R, soul.y + dy * SOUL_SPEED * dt));

                const box = { w: BOX_W, h: BOX_H };
                if (patternIndex === 0) spawnRain(elapsed, patternState, box, bullets);
                else if (patternIndex === 1) spawnBones(elapsed, patternState, box, bullets);
                else spawnHoming(elapsed, patternState, box, bullets, soul);

                bullets = updateBullets(bullets, dt, box);

                if (elapsed >= iframeUntil && checkCollision(bullets, soul, SOUL_R)) {
                    iframeUntil = elapsed + IFRAME_MS;
                    onHitRef.current(enemyAtk);
                }

                if (elapsed >= duration) {
                    done = true;
                    onCompleteRef.current();
                }
            }

            ctx.clearRect(0, 0, BOX_W, BOX_H);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeRect(2, 2, BOX_W - 4, BOX_H - 4);

            ctx.fillStyle = '#f5f5f5';
            for (const b of bullets) {
                if (b.kind === 'orb') {
                    ctx.beginPath();
                    ctx.arc(b.x, b.y, b.r ?? 5, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    ctx.fillRect(b.x, b.y, b.w ?? 0, b.h ?? 0);
                }
            }

            const invuln = elapsed < iframeUntil;
            ctx.save();
            ctx.translate(soul.x, soul.y);
            ctx.scale(0.6, 0.6);
            ctx.translate(-10, -10);
            ctx.fillStyle = invuln && Math.floor(elapsed / 80) % 2 === 0 ? '#ffb3b3' : '#ff0000';
            ctx.fill(heartPath);
            ctx.restore();

            if (!done) animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
        };
    }, [patternIndex, duration, enemyAtk]);

    return (
        <canvas
            ref={canvasRef}
            width={BOX_W}
            height={BOX_H}
            className="w-full max-w-md mx-auto block"
        />
    );
};

export default DodgeArena;
