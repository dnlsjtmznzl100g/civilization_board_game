export const gameState = {
  phase: "TURN_START",

  nextPhase() {
    const phases = ["TURN_START", "ACTION", "END"];
    const i = phases.indexOf(this.phase);
    this.phase = phases[(i + 1) % phases.length];
  },
};