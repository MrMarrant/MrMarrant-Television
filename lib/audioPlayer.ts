/*
* Class AudioPlayer
* Use for playing various background music depend on the current channel
*/
export class AudioPlayer {
    private static currentAudio: HTMLAudioElement | null = null;
    private static sfxAudio: HTMLAudioElement | null = null;
    private static volume: number = 1;
    private static loop: boolean = true;

    static play(soundUrl: string): void {
        if (typeof window === 'undefined') return;

        if (AudioPlayer.currentAudio) {
            AudioPlayer.currentAudio.pause();
            AudioPlayer.currentAudio.currentTime = 0;
            AudioPlayer.currentAudio = null;
        }

        const audio = new Audio(soundUrl);
        audio.volume = AudioPlayer.volume;
        audio.loop = AudioPlayer.loop;

        audio.play().catch((error) => {
            console.error("Erreur lors de la lecture du son :", error);
        });

        AudioPlayer.currentAudio = audio;
    }

    static playSfx(soundUrl: string): void {
        if (typeof window === 'undefined') return;

        if (AudioPlayer.sfxAudio) {
            AudioPlayer.sfxAudio.pause();
            AudioPlayer.sfxAudio.currentTime = 0;
            AudioPlayer.sfxAudio = null;
        }

        const audio = new Audio(soundUrl);
        audio.volume = AudioPlayer.volume;

        audio.play().catch((error) => {
            console.error("Erreur lors de la lecture du son :", error);
        });

        AudioPlayer.sfxAudio = audio;
    }

    static stop(): void {
        if (!AudioPlayer.currentAudio) return;

        AudioPlayer.currentAudio.pause();
        AudioPlayer.currentAudio.currentTime = 0;
        AudioPlayer.currentAudio = null;
    }

    static setLoop(loop: boolean): void {
        AudioPlayer.loop = loop;
        if (AudioPlayer.currentAudio) {
            AudioPlayer.currentAudio.loop = loop;
        }
    }

    static setVolume(volume: number): void {
        AudioPlayer.volume = Math.min(1, Math.max(0, volume));
        if (AudioPlayer.currentAudio) {
            AudioPlayer.currentAudio.volume = AudioPlayer.volume;
        }
        if (AudioPlayer.sfxAudio) {
            AudioPlayer.sfxAudio.volume = AudioPlayer.volume;
        }
    }

    static getVolume(): number {
        return AudioPlayer.volume;
    }

    static isPlaying(): boolean {
        return !!AudioPlayer.currentAudio && !AudioPlayer.currentAudio.paused;
    }
}