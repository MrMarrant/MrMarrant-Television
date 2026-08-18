import { AudioPlayer } from '../../lib/audioPlayer';

export type BulletKind = 'orb' | 'bone' | 'tv';
export type TvPhase = 'entering' | 'charge' | 'fire' | 'falling';

export interface Bullet {
    id: number;
    x: number;
    y: number;
    vx: number; // px/ms
    vy: number; // px/ms
    kind: BulletKind;
    r?: number; // orb radius
    w?: number; // bone width
    h?: number; // bone height
    tvPhase?: TvPhase;
    phaseUntil?: number; // elapsed timestamp (ms) when the TV's current phase ends
    targetX?: number; // resting spot the TV slides in towards while entering
    targetY?: number;
    dirX?: number; // aim direction (unit vector), set once firing begins
    dirY?: number;
    beamEndX?: number; // beam segment endpoint, set once firing begins
    beamEndY?: number;
}

export interface PatternState {
    nextSpawn: number;
}

export function createPatternState(): PatternState {
    return { nextSpawn: 0 };
}

let idCounter = 0;

export interface Box {
    w: number;
    h: number;
}

/** Pattern 0: orbs raining down from the top at random X. */
export function spawnRain(elapsed: number, state: PatternState, box: Box, bullets: Bullet[]) {
    if (elapsed < state.nextSpawn) return;
    state.nextSpawn = elapsed + 50 + Math.random() * 50;
    bullets.push({
        id: idCounter++,
        x: 12 + Math.random() * (box.w - 24),
        y: -10,
        vx: 0,
        vy: 0.09 + Math.random() * 0.035,
        kind: 'orb',
        r: 5,
    });
}

/** Pattern 1: two bone segments sliding across horizontally, leaving a gap to dodge through. */
export function spawnBones(elapsed: number, state: PatternState, box: Box, bullets: Bullet[]) {
    if (elapsed < state.nextSpawn) return;
    state.nextSpawn = elapsed + 750;

    const fromLeft = Math.random() < 0.5;
    const boneW = 16;
    const gapSize = 50;
    const gapY = 16 + Math.random() * Math.max(1, box.h - gapSize - 32);
    const speed = fromLeft ? 0.15 : -0.15;
    const startX = fromLeft ? -boneW : box.w + boneW;

    bullets.push({ id: idCounter++, x: startX, y: 0, vx: speed, vy: 0, kind: 'bone', w: boneW, h: gapY });
    bullets.push({
        id: idCounter++,
        x: startX,
        y: gapY + gapSize,
        vx: speed,
        vy: 0,
        kind: 'bone',
        w: boneW,
        h: Math.max(0, box.h - (gapY + gapSize)),
    });
}

/** Pattern 2: orbs spawned at a random edge point, aimed at the soul's position at spawn time. */
export function spawnHoming(elapsed: number, state: PatternState, box: Box, bullets: Bullet[], soul: { x: number; y: number }) {
    if (elapsed < state.nextSpawn) return;
    state.nextSpawn = elapsed + 300 + Math.random() * 200;

    const edge = Math.floor(Math.random() * 4);
    let x = 0, y = 0;
    if (edge === 0) { x = Math.random() * box.w; y = -10; }
    else if (edge === 1) { x = Math.random() * box.w; y = box.h + 10; }
    else if (edge === 2) { x = -10; y = Math.random() * box.h; }
    else { x = box.w + 10; y = Math.random() * box.h; }

    const dx = soul.x - x;
    const dy = soul.y - y;
    const dist = Math.max(1, Math.hypot(dx, dy));
    const speed = 0.25;

    bullets.push({ id: idCounter++, x, y, vx: (dx / dist) * speed, vy: (dy / dist) * speed, kind: 'orb', r: 6 });
}

export const TV_SPAWN_INTERVAL_MS = 1600;
export const TV_ENTER_MS = 450;
export const TV_CHARGE_MS = 100;
export const TV_FIRE_MS = 220;
export const TV_FALL_SPEED = 0.35; // px/ms
export const TV_SIZE = 34;
export const BEAM_THICKNESS = 5;

/**
 * Pattern 3: TVs periodically slide in from a random screen edge towards the soul's current
 * spot, settle and pause briefly (charge), fire a laser aimed at wherever the soul is by the
 * time they go off, then fall off-screen. Several TVs can be mid-cycle at once since each
 * tracks its own phase independently.
 */
export function spawnTv(elapsed: number, state: PatternState, box: Box, bullets: Bullet[], soul: { x: number; y: number }) {
    if (elapsed < state.nextSpawn) return;
    state.nextSpawn = elapsed + TV_SPAWN_INTERVAL_MS;

    const half = TV_SIZE / 2;
    const targetX = Math.min(box.w - half, Math.max(half, soul.x + (Math.random() * 40 - 20)));
    const targetY = Math.min(box.h - half, Math.max(half, soul.y + (Math.random() * 40 - 20)));

    const edge = Math.floor(Math.random() * 4);
    let startX = targetX;
    let startY = targetY;
    if (edge === 0) startX = -half;
    else if (edge === 1) startX = box.w + half;
    else if (edge === 2) startY = -half;
    else startY = box.h + half;

    bullets.push({
        id: idCounter++,
        x: startX,
        y: startY,
        vx: (targetX - startX) / TV_ENTER_MS,
        vy: (targetY - startY) / TV_ENTER_MS,
        kind: 'tv',
        tvPhase: 'entering',
        phaseUntil: elapsed + TV_ENTER_MS,
        targetX,
        targetY,
    });
}

/** Advances each TV through entering -> charge -> fire -> falling, aiming at the soul once it fires, and removes it once it has fallen past the bottom. */
export function updateTvs(bullets: Bullet[], elapsed: number, soul: { x: number; y: number }, box: Box): Bullet[] {
    return bullets.filter((b) => {
        if (b.kind !== 'tv') return true;

        if (b.tvPhase === 'entering' && elapsed >= (b.phaseUntil ?? 0)) {
            b.x = b.targetX ?? b.x;
            b.y = b.targetY ?? b.y;
            b.vx = 0;
            b.vy = 0;

            const dx = soul.x - b.x;
            const dy = soul.y - b.y;
            const dist = Math.max(1, Math.hypot(dx, dy));
            const beamLen = (box.w + box.h) * 1.5;
            b.dirX = dx / dist;
            b.dirY = dy / dist;
            b.beamEndX = b.x + (dx / dist) * beamLen;
            b.beamEndY = b.y + (dy / dist) * beamLen;

            b.tvPhase = 'charge';
            b.phaseUntil = elapsed + TV_CHARGE_MS;
        } else if (b.tvPhase === 'charge' && elapsed >= (b.phaseUntil ?? 0)) {
            b.tvPhase = 'fire';
            b.phaseUntil = elapsed + TV_FIRE_MS;
            AudioPlayer.playSfx('../sounds/laser.mp3');
        } else if (b.tvPhase === 'fire' && elapsed >= (b.phaseUntil ?? 0)) {
            b.tvPhase = 'falling';
            b.vy = TV_FALL_SPEED;
        }

        if (b.tvPhase === 'falling' && b.y > box.h + TV_SIZE) return false;
        return true;
    });
}

function distanceToSegment(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    let t = lenSq === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));
    const cx = x1 + t * dx;
    const cy = y1 + t * dy;
    return Math.hypot(px - cx, py - cy);
}

export function updateBullets(bullets: Bullet[], dt: number, box: Box): Bullet[] {
    for (const b of bullets) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
    }
    return bullets.filter((b) => {
        if (b.kind === 'orb') {
            return b.x > -20 && b.x < box.w + 20 && b.y > -20 && b.y < box.h + 20;
        }
        return b.x > -60 && b.x < box.w + 60;
    });
}

export function checkCollision(bullets: Bullet[], soul: { x: number; y: number }, soulR: number): boolean {
    for (const b of bullets) {
        if (b.kind === 'tv') {
            if (b.tvPhase !== 'fire') continue;
            const dist = distanceToSegment(soul.x, soul.y, b.x, b.y, b.beamEndX ?? b.x, b.beamEndY ?? b.y);
            if (dist < soulR + BEAM_THICKNESS / 2) return true;
        } else if (b.kind === 'orb') {
            const dist = Math.hypot(b.x - soul.x, b.y - soul.y);
            if (dist < soulR + (b.r ?? 5)) return true;
        } else {
            const w = b.w ?? 0;
            const h = b.h ?? 0;
            const closestX = Math.max(b.x, Math.min(soul.x, b.x + w));
            const closestY = Math.max(b.y, Math.min(soul.y, b.y + h));
            const dist = Math.hypot(closestX - soul.x, closestY - soul.y);
            if (dist < soulR) return true;
        }
    }
    return false;
}
