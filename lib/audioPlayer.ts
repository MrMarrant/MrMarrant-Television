export class AudioPlayer {
    private static currentAudio: HTMLAudioElement | null = null;
    private static volume: number = 1;
    private static loop: boolean = true;

    static play(soundUrl: string): void {
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
        // Clamp du volume
        AudioPlayer.volume = Math.min(1, Math.max(0, volume));

        // Applique immédiatement le volume si un son est en cours
        if (AudioPlayer.currentAudio) {
            AudioPlayer.currentAudio.volume = AudioPlayer.volume;
        }
    }

    static getVolume(): number {
        return AudioPlayer.volume;
    }

    static isPlaying(): boolean {
        return !!AudioPlayer.currentAudio && !AudioPlayer.currentAudio.paused;
    }
}
