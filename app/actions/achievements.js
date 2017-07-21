export const UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED = 'UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED';

export const unlockAchievementIfBeaconDetected = beacon => ({
  type: UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED,
  beacon,
});
