import database from './database';

export const GET_ADMIN_ACHIEVEMENTS_REQUESTED = 'GET_ADMIN_ACHIEVEMENTS_REQUESTED';
export const GET_ADMIN_ACHIEVEMENTS_FULFILLED = 'GET_ADMIN_ACHIEVEMENTS_FULFILLED';

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

function getAdminAchievementsRequestedAction() {
  return {
    type: GET_ADMIN_ACHIEVEMENTS_REQUESTED,
  };
}

function getAdminAchievementsFulfilledAction(adminAchievements) {
  return {
    type: GET_ADMIN_ACHIEVEMENTS_FULFILLED,
    adminAchievements,
  };
}

export function getAdminAchievements() {
  return (dispatch) => {
    dispatch(getAdminAchievementsRequestedAction());
    return database.ref('AdminAchievements').on('value', (snap) => {
      const adminAchievements = snap.val();
      dispatch(getAdminAchievementsFulfilledAction(adminAchievements));
    });
  };
}
