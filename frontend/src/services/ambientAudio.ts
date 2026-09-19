/**
 * Ambient Sound Service for Jirjirak
 * - Night Mode: Authentic relaxing jazz ballad
 * - Day Mode: Authentic gentle open-space office ambience
 */

class AmbientAudioService {
  private audioElement: HTMLAudioElement | null = null;
  private currentMode: 'night' | 'day' = 'night';
  private isCurrentlyPlaying = false;
  private fadeInterval: number | null = null;
  private targetVolume = 0.55;

  private readonly TRACKS = {
    night: '/assets/audio/jazz_night.mp3',
    day: '/assets/audio/office_day.mp3',
  };

  private getAudio(): HTMLAudioElement {
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';
    }
    return this.audioElement;
  }

  public play(isNight: boolean) {
    const nextMode = isNight ? 'night' : 'day';
    const audio = this.getAudio();

    if (this.currentMode !== nextMode || !this.isCurrentlyPlaying || !audio.src) {
      this.currentMode = nextMode;
      const targetSrc = this.TRACKS[nextMode];
      
      // Update source
      audio.src = targetSrc;
      audio.currentTime = 0;
    }

    this.isCurrentlyPlaying = true;
    audio.volume = 0;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.fadeIn(audio, this.targetVolume);
        })
        .catch((err) => {
          console.warn('[AmbientAudio] Autoplay prevented or error:', err);
          this.isCurrentlyPlaying = false;
        });
    }
  }

  public stop() {
    this.isCurrentlyPlaying = false;
    if (!this.audioElement) return;

    this.fadeOut(this.audioElement, () => {
      if (this.audioElement) {
        this.audioElement.pause();
      }
    });
  }

  public setNightMode(isNight: boolean) {
    const newMode = isNight ? 'night' : 'day';
    if (this.currentMode === newMode) return;
    this.currentMode = newMode;

    // If currently playing, smoothly crossfade to the other track
    if (this.isCurrentlyPlaying && this.audioElement) {
      const audio = this.audioElement;
      this.fadeOut(audio, () => {
        if (!this.isCurrentlyPlaying) return;
        audio.src = this.TRACKS[newMode];
        audio.currentTime = 0;
        audio.play().then(() => {
          this.fadeIn(audio, this.targetVolume);
        }).catch((err) => {
          console.warn('[AmbientAudio] Mode switch play error:', err);
        });
      });
    }
  }

  private fadeIn(audio: HTMLAudioElement, targetVol: number) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    const step = 0.05;
    this.fadeInterval = window.setInterval(() => {
      if (audio.volume < targetVol - step) {
        audio.volume += step;
      } else {
        audio.volume = targetVol;
        if (this.fadeInterval) clearInterval(this.fadeInterval);
      }
    }, 50);
  }

  private fadeOut(audio: HTMLAudioElement, onComplete: () => void) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    const step = 0.08;
    this.fadeInterval = window.setInterval(() => {
      if (audio.volume > step) {
        audio.volume -= step;
      } else {
        audio.volume = 0;
        if (this.fadeInterval) clearInterval(this.fadeInterval);
        onComplete();
      }
    }, 40);
  }
}

export const ambientAudio = new AmbientAudioService();
