export type BulletKind = 'orb' | 'bone';

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
    state.nextSpawn = elapsed + 220 + Math.random() * 140;
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
    state.nextSpawn = elapsed + 950;

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
    state.nextSpawn = elapsed + 1100;

    const edge = Math.floor(Math.random() * 4);
    let x = 0, y = 0;
    if (edge === 0) { x = Math.random() * box.w; y = -10; }
    else if (edge === 1) { x = Math.random() * box.w; y = box.h + 10; }
    else if (edge === 2) { x = -10; y = Math.random() * box.h; }
    else { x = box.w + 10; y = Math.random() * box.h; }

    const dx = soul.x - x;
    const dy = soul.y - y;
    const dist = Math.max(1, Math.hypot(dx, dy));
    const speed = 0.16;

    bullets.push({ id: idCounter++, x, y, vx: (dx / dist) * speed, vy: (dy / dist) * speed, kind: 'orb', r: 6 });
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
        if (b.kind === 'orb') {
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
