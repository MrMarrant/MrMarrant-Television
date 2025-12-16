/*
* Class AudioPlayer
* Use for playing various background music depend on the current channel
*/
export class AudioPlayer {
    private static currentAudio: HTMLAudioElement | null = null;
    private static volume: number = 1;
    private static loop: boolean = true;

    /**
   * Play a sound located in the /sounds folder
   *
   * @param soundUrl @string - The path url
   * @returns @void
   */
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

    /**
   * Stop playing the current sound if there is one
   *
   * @returns @void
   */
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

    /**
   * Set the volume of the current sound played
   *
   * @param volume @number - The new volume
   * @returns @void
   */
    static setVolume(volume: number): void {
        AudioPlayer.volume = Math.min(1, Math.max(0, volume));

        if (AudioPlayer.currentAudio) {
            AudioPlayer.currentAudio.volume = AudioPlayer.volume;
        }
    }

    /**
   * Get the volume of the current sound played
   *
   * @returns @number
   */
    static getVolume(): number {
        return AudioPlayer.volume;
    }

    /**
   * Return true is a sound is actually playing
   *
   * @returns @boolean
   */
    static isPlaying(): boolean {
        return !!AudioPlayer.currentAudio && !AudioPlayer.currentAudio.paused;
    }
}
