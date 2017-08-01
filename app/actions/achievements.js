import database from './database';

export const GET_ADMIN_REQUESTED = 'GET_ADMIN_REQUESTED';
export const GET_ADMIN_FULFILLED = 'GET_ADMIN_FULFILLED';
export const ADD_TO_USER_REQUESTED = 'ADD_TO_USER_REQUESTED';
export const ADD_TO_USER_REJECTED = 'ADD_TO_USER_REJECTED';
export const ADD_TO_USER_FULFILLED = 'ADD_TO_USER_FULFILLED';
export const USER_ADDED = 'USER_ADDED';

export const UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED = 'UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED';
export const READ_SITES_AND_EVENTS = 'READ_SITES_AND_EVENTS';
export const ADD_TIMESTAMP_TO_LOGGER = 'ADD_TIMESTAMP_TO_LOGGER';
export const ADD_TIMESTAMP_TO_LOGGER_REQUESTED = 'ADD_TIMESTAMP_TO_LOGGER_REQUESTED';
export const ADD_TIMESTAMP_TO_LOGGER_FULFILLED = 'ADD_TIMESTAMP_TO_LOGGER_FULFILLED';
export const ADD_TIMESTAMP_TO_LOGGER_REJECTED = 'ADD_TIMESTAMP_TO_LOGGER_REJECTED';

function addTimestampToLoggerRequestedAction() {
  return {
    type: ADD_TIMESTAMP_TO_LOGGER_REQUESTED,
  };
}

function addTimestampToLoggerRejectedAction() {
  return {
    type: ADD_TIMESTAMP_TO_LOGGER_REJECTED,
  };
}

function addTimestampToLoggerFulfilledAction(timestamp, beaconInfo, achievements, count) {
  return {
    type: ADD_TIMESTAMP_TO_LOGGER_FULFILLED,
    timestamp,
    beaconInfo,
    achievements,
    count,
  };
}

export function addToLogger(deviceUniqueId, timestamp, beaconInfo, achievements, count) {
  return (dispatch) => {
    dispatch(addTimestampToLoggerRequestedAction());
    if (beaconInfo) {
      database
        .ref(`users/${deviceUniqueId}/logger`)
        .push({ timestamp, beaconInfo, achievements, count })
        .then(() => {
          dispatch(
            addTimestampToLoggerFulfilledAction({
              timestamp,
              beaconInfo,
              achievements,
              count,
            }),
          );
        })
        .catch((error) => {
          dispatch(addTimestampToLoggerRejectedAction());
        });
    } else {
      database
        .ref(`users/${deviceUniqueId}/logger`)
        .push({ timestamp, achievements, count })
        .then(() => {
          dispatch(
            addTimestampToLoggerFulfilledAction({
              timestamp,
              achievements,
              count,
            }),
          );
        })
        .catch((error) => {
          dispatch(addTimestampToLoggerRejectedAction());
        });
    }
  };
}

export const unlockAchievementIfBeaconDetected = beacon => ({
  type: UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED,
  beacon,
});

export const readSitesAndEvents = () => ({
  type: READ_SITES_AND_EVENTS,
});

function getAdminRequestedAction() {
  return {
    type: GET_ADMIN_REQUESTED,
  };
}

function getAdminFulfilledAction(admin) {
  return {
    type: GET_ADMIN_FULFILLED,
    admin,
  };
}

export function getAdmin() {
  return (dispatch) => {
    dispatch(getAdminRequestedAction());
    database.ref('Admin').on('value', (snap) => {
      const admin = snap.val();
      dispatch(getAdminFulfilledAction(admin));
    });
  };
}

function addToUserRequestedAction() {
  return {
    type: ADD_TO_USER_REQUESTED,
  };
}

function addToUserRejectedAction() {
  return {
    type: ADD_TO_USER_REJECTED,
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
      })
      .catch((error) => {
        dispatch(addToUserRejectedAction());
      });
  };
}
