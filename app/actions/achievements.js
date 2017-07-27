// import firebase from '../firebase';
// import { achievementsRef } from '../firebase';

export const UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED = 'UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED';
export const READ_SITES_AND_EVENTS = 'READ_SITES_AND_EVENTS';
export const READ_ADMIN_ACHIEVEMENTS = 'READ_ADMIN_ACHIEVEMENTS';

export const unlockAchievementIfBeaconDetected = beacon => ({
  type: UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED,
  beacon,
});

export const readSitesAndEvents = () => ({
  type: READ_SITES_AND_EVENTS,
});

// export const readAdminAchievements = () => ({
//   type: READ_ADMIN_ACHIEVEMENTS,
//   achievements: achievementsRef,
// });
