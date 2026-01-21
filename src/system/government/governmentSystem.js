export function canChangeGovernment(player, newGovType) {
  if (player.government.changedThisTurn) return false;

  const gov = GOVERNMENTS[newGovType];
  if (!gov) return false;

  if (player.government.type === newGovType) return false;

  return true;
}


export function changeGovernment(player, newGovType) {
  if (!canChangeGovernment(player, newGovType)) return false;

  player.government.type = newGovType;
  player.government.changedThisTurn = true;

  return true;
}