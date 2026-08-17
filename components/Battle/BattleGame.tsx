"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Sword, Nfc, X, FlaskConical } from 'lucide-react';
import { ENEMY, ActOption, PLAYER_MAX_HP, PLAYER_ATK, PLAYER_LV } from './enemyData';
import { useTypewriter } from './useTypewriter';
import DodgeArena from './DodgeArena';
import FightBar from './FightBar';
import { AudioPlayer } from '../../lib/audioPlayer';

type Phase = 'intro' | 'menu' | 'act-select' | 'dialogue' | 'fight-bar' | 'impact' | 'dodge' | 'result';
type DialogueContext = 'intro' | 'act' | 'item' | 'mercy';
type ResultKind = 'win-fight' | 'win-spare' | 'lose' | null;

const DODGE_DURATION_MS = 7000;
const REQUIRED_ACT_COUNT = 2;
const IMPACT_DURATION_MS = 900;

interface BattleGameProps {
    onExit: () => void;
}

const MENU_ITEMS = [
    { label: 'FIGHT', Icon: Sword },
    { label: 'ACT', Icon: Nfc },
    { label: 'ITEM', Icon: FlaskConical },
    { label: 'MERCY', Icon: X },
];

const EnemySprite: React.FC = () => {
    const [error, setError] = useState(false);

    if (error) {
        return (
            <svg width="96" height="96" viewBox="0 0 16 16" shapeRendering="crispEdges" className="opacity-90">
                <rect x="4" y="1" width="8" height="8" fill="#e5e5e5" />
                <rect x="2" y="9" width="12" height="5" fill="#e5e5e5" />
                <rect x="0" y="14" width="4" height="2" fill="#e5e5e5" />
                <rect x="6" y="14" width="4" height="2" fill="#e5e5e5" />
                <rect x="12" y="14" width="4" height="2" fill="#e5e5e5" />
                <rect x="6" y="4" width="1" height="1" fill="#000000" />
                <rect x="9" y="4" width="1" height="1" fill="#000000" />
            </svg>
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={ENEMY.image}
            alt={ENEMY.name}
            onError={() => setError(true)}
            className="h-24 md:h-[20rem] w-auto object-contain animate-float-y"
        />
    );
};

const HpBar: React.FC<{ current: number; max: number }> = ({ current, max }) => {
    const pct = Math.max(0, Math.min(100, (current / max) * 100));
    return (
        <div className="w-40 md:w-56 h-3 bg-neutral-800 border border-neutral-600">
            <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
    );
};

const PlayerStatusBar: React.FC<{ hp: number; maxHp: number; visible: boolean }> = ({ hp, maxHp, visible }) => {
    if (!visible) return null;
    const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100));
    return (
        <div className="mt-3 flex items-center gap-3 text-[9px] md:text-sm">
            <span className="text-white">RËPLAY</span>
            <span className="text-yellow-400">LV {PLAYER_LV}</span>
            <div className="flex items-center gap-1">
                <span className="text-yellow-400">HP</span>
                <div className="w-20 md:w-28 h-3 bg-red-900 border border-neutral-500">
                    <div className="h-full bg-yellow-400 transition-all duration-300" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-white">{hp} / {maxHp}</span>
            </div>
        </div>
    );
};

const DialogueBox: React.FC<{ text: string; showPrompt: boolean }> = ({ text, showPrompt }) => (
    <div className="articles-border min-h-[5.5rem] md:min-h-[6.5rem] text-sm md:text-lg leading-relaxed whitespace-pre-line">
        {text}
        {showPrompt && <span className="absolute bottom-2 right-3 animate-pulse text-white">&#9660;</span>}
    </div>
);

const ActionMenu: React.FC<{ selected: number; onSelect: (i: number) => void; onHover: (i: number) => void }> = ({ selected, onSelect, onHover }) => (
    <div className="flex text-orange-500 w-full justify-around uppercase text-[9px] md:text-lg gap-2 md:gap-8">
        {MENU_ITEMS.map(({ label, Icon }, i) => (
            <button
                key={label}
                onClick={() => onSelect(i)}
                onMouseEnter={() => onHover(i)}
                className={`flex items-center gap-1 border-2 px-2 py-1 transition-colors ${selected === i ? 'border-yellow-500 text-yellow-500' : 'border-orange-500 hover:border-yellow-500 hover:text-yellow-500'
                    }`}
            >
                <Icon size={16} />
                <span>{label}</span>
            </button>
        ))}
    </div>
);

const ActSelectMenu: React.FC<{
    options: ActOption[];
    selected: number;
    onSelect: (opt: ActOption) => void;
    onHover: (i: number) => void;
    onBack: () => void;
}> = ({ options, selected, onSelect, onHover, onBack }) => (
    <div className="articles-border">
        <p className="text-xs md:text-sm mb-2 text-neutral-400">* What will you do? (ESC to go back)</p>
        <div className="grid grid-cols-2 gap-2">
            {options.map((opt, i) => (
                <button
                    key={opt.label}
                    onClick={() => onSelect(opt)}
                    onMouseEnter={() => onHover(i)}
                    className={`text-left px-2 py-1 uppercase text-xs md:text-base ${selected === i ? 'text-yellow-400' : 'text-white'}`}
                >
                    * {opt.label}
                </button>
            ))}
        </div>
        <button onClick={onBack} className="mt-3 text-[10px] md:text-xs text-neutral-500 hover:text-white">
            &lt; Back
        </button>
    </div>
);

const ResultScreen: React.FC<{ kind: ResultKind; onContinue: () => void }> = ({ kind, onContinue }) => {
    const lines = kind === 'win-fight' ? ENEMY.defeatText
        : kind === 'win-spare' ? ENEMY.spareText
            : ['* You laugh.'];
    const isLose = kind === 'lose';
    return (
        <div className="articles-border text-center">
            <p className={`whitespace-pre-line text-sm md:text-lg mb-3 ${isLose ? 'text-red-500' : 'text-white'}`}>
                {lines.join('\n')}
            </p>
            <button onClick={onContinue} className="text-yellow-400 text-xs md:text-sm uppercase animate-pulse">
                Press Z / Enter to continue &#9660;
            </button>
        </div>
    );
};

const BattleGame: React.FC<BattleGameProps> = ({ onExit }) => {
    const [phase, setPhase] = useState<Phase>('intro');
    const [menuIndex, setMenuIndex] = useState(0);
    const [actIndex, setActIndex] = useState(0);
    const [canSpare, setCanSpare] = useState(false);
    const [usedActs, setUsedActs] = useState<Set<string>>(new Set());
    const [enemyHp, setEnemyHp] = useState(ENEMY.maxHp);
    const [playerHp, setPlayerHp] = useState(PLAYER_MAX_HP);
    const [turnCount, setTurnCount] = useState(0);
    const [dialogueContext, setDialogueContext] = useState<DialogueContext>('intro');
    const [dialogueText, setDialogueText] = useState(() => ENEMY.introText.join('\n'));
    const [resultKind, setResultKind] = useState<ResultKind>(null);
    const [closing, setClosing] = useState(false);
    const [lastDamage, setLastDamage] = useState<number | null>(null);

    const resultLockRef = useRef(false);
    const closingRef = useRef(false);

    const availableActs = ENEMY.actOptions;
    const { displayed, done, skip } = useTypewriter(dialogueText);

    const finishBattle = (kind: Exclude<ResultKind, null>) => {
        if (resultLockRef.current) return;
        resultLockRef.current = true;
        setResultKind(kind);
        setPhase('result');
        AudioPlayer.stop();
        AudioPlayer.playSfx("../sounds/ending_a2.ogg");
    };

    const goToMenu = () => {
        setMenuIndex(0);
        setPhase('menu');
    };

    const startDodge = () => setPhase('dodge');

    const selectMenuAction = (index: number) => {
        setMenuIndex(index);
        if (index === 0) {
            setPhase('fight-bar');
        } else if (index === 1) {
            setActIndex(0);
            setPhase('act-select');
        } else if (index === 2) {
            setDialogueContext('item');
            setDialogueText('* You check your pockets.\n* Nothing there.');
            setPhase('dialogue');
        } else {
            setDialogueContext('mercy');
            if (canSpare) {
                finishBattle('win-spare');
                return;
            }
            else {
                setDialogueText("* You can't bring yourself to spare them yet.");
                setPhase('dialogue');
            }
        }
    };

    const chooseAct = (opt: ActOption) => {
        if (opt.label != 'Check') setUsedActs((prev) => new Set(prev).add(opt.label));
        setDialogueContext('act');
        setDialogueText(opt.response.join('\n'));
        setPhase('dialogue');
    };

    const continueDialogue = () => {
        if (dialogueContext === 'intro') {
            goToMenu();
            return;
        }
        if (dialogueContext === 'act' && !canSpare && usedActs.size == REQUIRED_ACT_COUNT) {
            setDialogueText("* MrMarrant is ready to be spare now.");
            setCanSpare(true);
            return;
        }
        startDodge();
    };

    const resolveFight = (damage: number) => {
        const next = Math.max(0, enemyHp - damage);
        setEnemyHp(next);
        setLastDamage(damage);
        setPhase('impact');
        setTimeout(() => {
            if (next <= 0) finishBattle('win-fight');
            else startDodge();
        }, IMPACT_DURATION_MS);
    };

    const handleHit = (damage: number) => {
        setPlayerHp((prev) => Math.max(0, prev - damage));
    };

    const handleDodgeComplete = () => {
        setTurnCount((t) => t + 1);
        if (!resultLockRef.current) goToMenu();
    };

    const confirmResult = () => {
        if (closingRef.current) return;
        closingRef.current = true;
        setClosing(true);
        setTimeout(() => onExit(), 550);
    };

    useEffect(() => {
        if (playerHp <= 0) finishBattle('lose');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playerHp]);

    // Refs so the always-on keyboard listeners below never go stale without re-subscribing every render.
    const selectMenuActionRef = useRef(selectMenuAction);
    const chooseActRef = useRef(chooseAct);
    const continueDialogueRef = useRef(continueDialogue);
    const confirmResultRef = useRef(confirmResult);
    const skipRef = useRef(skip);
    const doneRef = useRef(done);
    const availableActsRef = useRef(availableActs);
    const menuIndexRef = useRef(menuIndex);
    const actIndexRef = useRef(actIndex);

    useEffect(() => { selectMenuActionRef.current = selectMenuAction; });
    useEffect(() => { chooseActRef.current = chooseAct; });
    useEffect(() => { continueDialogueRef.current = continueDialogue; });
    useEffect(() => { confirmResultRef.current = confirmResult; });
    useEffect(() => { skipRef.current = skip; });
    useEffect(() => { doneRef.current = done; });
    useEffect(() => { availableActsRef.current = availableActs; });
    useEffect(() => { menuIndexRef.current = menuIndex; });
    useEffect(() => { actIndexRef.current = actIndex; });

    useEffect(() => {
        if (phase !== 'menu') return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); setMenuIndex((i) => (i + 3) % 4); }
            else if (e.key === 'ArrowRight') { e.preventDefault(); setMenuIndex((i) => (i + 1) % 4); }
            else if (e.key === 'Enter' || e.key === 'z' || e.key === 'Z') {
                e.preventDefault();
                selectMenuActionRef.current(menuIndexRef.current);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [phase]);

    useEffect(() => {
        if (phase !== 'act-select') return;
        const onKeyDown = (e: KeyboardEvent) => {
            const list = availableActsRef.current;
            if (list.length === 0) return;
            if (e.key === 'ArrowUp') { e.preventDefault(); setActIndex((i) => (i - 1 + list.length) % list.length); }
            else if (e.key === 'ArrowDown') { e.preventDefault(); setActIndex((i) => (i + 1) % list.length); }
            else if (e.key === 'Enter' || e.key === 'z' || e.key === 'Z') {
                e.preventDefault();
                const opt = list[actIndexRef.current];
                if (opt) chooseActRef.current(opt);
            } else if (e.key === 'Escape') {
                e.preventDefault();
                goToMenu();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase]);

    useEffect(() => {
        if (phase !== 'intro' && phase !== 'dialogue') return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === 'z' || e.key === 'Z' || e.key === ' ') {
                e.preventDefault();
                if (!doneRef.current) skipRef.current();
                else continueDialogueRef.current();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [phase]);

    useEffect(() => {
        if (phase !== 'result') return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === 'z' || e.key === 'Z' || e.key === ' ') {
                e.preventDefault();
                confirmResultRef.current();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [phase]);

    const showEnemy = phase !== 'dodge';

    return (
        <div className={`w-full h-full bg-black text-white font-pixel-sans overflow-hidden flex flex-col relative`}>
            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 pt-4">
                {showEnemy && (
                    <>
                        <div className="text-xs md:text-2xl uppercase tracking-widest text-red-400">{ENEMY.name}</div>
                        <div className={`relative ${phase === 'impact' ? 'animate-enemy-hit' : ''}`}>
                            <EnemySprite />
                            {phase === 'impact' && lastDamage !== null && (
                                <span className="absolute -top-2 left-[23rem] -translate-x-1/2 text-red-500 text-xl md:text-3xl font-bold animate-damage-pop pointer-events-none drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]">
                                    -{lastDamage}
                                </span>
                            )}
                        </div>
                        <HpBar current={enemyHp} max={ENEMY.maxHp} />
                    </>
                )}
                {phase === 'dodge' && (
                    <DodgeArena
                        key={turnCount}
                        patternIndex={(turnCount % 3) as 0 | 1 | 2}
                        duration={DODGE_DURATION_MS}
                        enemyAtk={ENEMY.atk}
                        onHit={handleHit}
                        onComplete={handleDodgeComplete}
                    />
                )}
            </div>

            <div className="shrink-0 px-4 pb-4 md:px-8 md:pb-6 relative">
                {(phase === 'intro' || phase === 'dialogue') && (
                    <DialogueBox text={displayed} showPrompt={done} />
                )}
                {phase === 'menu' && (
                    <ActionMenu selected={menuIndex} onSelect={selectMenuAction} onHover={setMenuIndex} />
                )}
                {phase === 'act-select' && (
                    <ActSelectMenu
                        options={availableActs}
                        selected={actIndex}
                        onSelect={chooseAct}
                        onHover={setActIndex}
                        onBack={goToMenu}
                    />
                )}
                {phase === 'fight-bar' && (
                    <FightBar playerAtk={PLAYER_ATK} onResolve={resolveFight} />
                )}
                {phase === 'result' && (
                    <ResultScreen kind={resultKind} onContinue={confirmResult} />
                )}
                <PlayerStatusBar hp={playerHp} maxHp={PLAYER_MAX_HP} visible={phase === 'menu' || phase === 'dodge'} />
            </div>
        </div>
    );
};

export default BattleGame;
