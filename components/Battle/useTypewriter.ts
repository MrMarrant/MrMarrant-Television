"use client";

import { useEffect, useRef, useState } from 'react';

const CHAR_INTERVAL_MS = 28;

/**
 * Reveals `text` one character at a time, Undertale dialogue-box style.
 * `skip()` instantly completes the current reveal instead of advancing.
 */
export function useTypewriter(text: string) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        indexRef.current = 0;
        setDisplayed('');
        setDone(text.length === 0);

        if (text.length === 0) return;

        const interval = setInterval(() => {
            indexRef.current += 1;
            setDisplayed(text.slice(0, indexRef.current));
            if (indexRef.current >= text.length) {
                clearInterval(interval);
                setDone(true);
            }
        }, CHAR_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [text]);

    const skip = () => {
        indexRef.current = text.length;
        setDisplayed(text);
        setDone(true);
    };

    return { displayed, done, skip };
}
