/**
 * Procedural Web Audio API soundscape
 * Synthesizes ambient Moroccan Atlantic breeze and gentle acoustic Oud lute plucks
 * Zero external audio files or network requests!
 */
export class MoroccanSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private windNode: AudioNode | null = null;
  private oudInterval: number | null = null;

  // Traditional Arabic Rast / Bayati maqam notes frequencies (Hz)
  private maqamNotes = [
    146.83, // D3 (Yakah / Rast)
    164.81, // E3
    174.61, // F3
    196.00, // G3 (Nawa)
    220.00, // A3
    246.94, // B3
    261.63, // C4 (Kerdan)
    293.66, // D4
  ];

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public play() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;

    // 1. Ambient Atlantic / Bouregreg wind noise generator
    this.startAmbientWind();

    // 2. Periodic gentle Moroccan Oud string plucking
    this.startOudMelody();
  }

  public stop() {
    this.isPlaying = false;
    if (this.oudInterval) {
      window.clearInterval(this.oudInterval);
      this.oudInterval = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startAmbientWind() {
    if (!this.ctx || !this.masterGain) return;

    // Pink/Brown noise buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Resonant lowpass filter to mimic coastal wind gusts
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(260, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(windGain);
    windGain.connect(this.masterGain);

    whiteNoise.start();
    this.windNode = whiteNoise;
  }

  private pluckOudString(freq: number) {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Triangle / saw combination for warm acoustic string timbre
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, t);

    // Warm wooden soundboard resonance filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.frequency.exponentialRampToValueAtTime(300, t + 1.2);

    // Karplus-strong like pluck envelope
    gain.gain.setValueAtTime(0.0, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 2.3);
  }

  private startOudMelody() {
    let noteIndex = 0;
    const playNext = () => {
      if (!this.isPlaying) return;
      const freq = this.maqamNotes[noteIndex % this.maqamNotes.length];
      this.pluckOudString(freq);
      
      // Random organic interval between plucks (2.5s to 5s)
      noteIndex = (noteIndex + (Math.random() > 0.4 ? 1 : 2)) % this.maqamNotes.length;
      const nextDelay = 2500 + Math.random() * 2500;
      this.oudInterval = window.setTimeout(playNext, nextDelay);
    };

    playNext();
  }
}
