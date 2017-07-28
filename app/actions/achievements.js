import database from './database';

export const GET_ADMIN_ACHIEVEMENTS_REQUESTED = 'GET_ADMIN_ACHIEVEMENTS_REQUESTED';
export const GET_ADMIN_ACHIEVEMENTS_FULFILLED = 'GET_ADMIN_ACHIEVEMENTS_FULFILLED';
export const ADD_TO_USER_REQUESTED = 'ADD_TO_USER_REQUESTED';
export const ADD_TO_USER_FULFILLED = 'ADD_TO_USER_FULFILLED';
export const USER_ADDED = 'USER_ADDED';

export const UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED = 'UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED';
export const READ_SITES_AND_EVENTS = 'READ_SITES_AND_EVENTS';
export const ADD_TIMESTAMP_TO_LOGGER = 'ADD_TIMESTAMP_TO_LOGGER';

function addTimestampToLogger(timestamp, beaconInfo, achievements, count) {
  return {
    type: ADD_TIMESTAMP_TO_LOGGER,
    timestamp,
    beaconInfo,
    achievements,
    count,
  };
}

export function addToLogger(deviceUniqueId, timestamp, beaconInfo, achievements, count) {
  return (dispatch) => {
    database
      .ref(`users/${deviceUniqueId}/logger`)
      .push({ timestamp, beaconInfo, achievements, count })
      .then(() => {
        dispatch(
          addTimestampToLogger({
            timestamp,
            beaconInfo,
            achievements,
            count,
          }),
        );
      });
  };
}

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

function addToUserRequestedAction() {
  return {
    type: ADD_TO_USER_REQUESTED,
  };
}

function addToUserFulfilledAction(deviceUniqueId, deviceManufacturer, deviceName, deviceVersion) {
  return {
    type: ADD_TO_USER_FULFILLED,
    deviceName,
    deviceUniqueId,
    deviceManufacturer,
    deviceVersion,
  };
}

export function addToUser(deviceUniqueId, deviceManufacturer, deviceName, deviceVersion) {
  return (dispatch) => {
    dispatch(addToUserRequestedAction());
    database
      .ref(`users/${deviceUniqueId}`)
      .set({
        deviceUniqueId,
        deviceManufacturer,
        deviceName,
        deviceVersion,
      })
      .then(() => {
        dispatch(
          addToUserFulfilledAction({
            deviceUniqueId,
            deviceManufacturer,
            deviceName,
            deviceVersion,
          }),
        );
      });
  };
}
