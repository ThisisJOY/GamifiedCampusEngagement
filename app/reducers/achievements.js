import {
  UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED,
  READ_SITES_AND_EVENTS,
  GET_ADMIN_REQUESTED,
  GET_ADMIN_FULFILLED,
  ADD_TO_USER_REQUESTED,
  ADD_TO_USER_REJECTED,
  ADD_TO_USER_FULFILLED,
  ADD_TIMESTAMP_TO_LOGGER_REQUESTED,
  ADD_TIMESTAMP_TO_LOGGER_REJECETD,
  ADD_TIMESTAMP_TO_LOGGER_FULFILLED,
} from '../actions/achievements';

const initialState = {
  deviceUniqueId: '',
  timestamp: '',
  beaconInfo: { uuid: '', major: 0, minor: 0, rssi: '', proximity: '', distance: '', accuracy: '' },
  count: 0,
  achievements: [],
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case GET_ADMIN_REQUESTED: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: '',
      });
    }
    case GET_ADMIN_FULFILLED: {
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got admin.',
        achievements: action.admin,
        count: action.admin.filter(achievement => achievement.isUnlocked).length,
        sites: action.admin.filter(achievement => achievement.type === 'site'),
        events: action.admin.filter(achievement => achievement.type === 'event'),
      });
      return newState;
    }

    case ADD_TO_USER_REQUESTED: {
      return {
        ...state,
        inProgress: true,
        error: '',
        success: '',
      };
    }

    case ADD_TO_USER_REJECTED: {
      return {
        ...state,
        inProgress: false,
        error: 'Error in adding to user.',
      };
    }
    case ADD_TO_USER_FULFILLED: {
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Added user.',
      });
      newState.deviceName = newState.deviceName || [];
      newState.deviceName = newState.deviceName.slice();
      newState.deviceName.push(action.deviceName);
      return newState;
    }

    case UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED:
      return {
        ...state,
        achievements: state.achievements.map((achievement) => {
          if (action.beacon.major && achievement.major === action.beacon.major) {
            return {
              type: achievement.type,
              uuid: achievement.uuid,
              major: achievement.major,
              minor: achievement.minor,
              achievementName: achievement.achievementName,
              image: achievement.image,
              isUnlocked: true,
              instruction: achievement.instruction,
              feedback: achievement.feedback,
              address: achievement.address,
              gpscoordinaten: achievement.gpscoordinaten,
              name: achievement.name,
              locatieCode: achievement.locatieCode,
              picture: achievement.picture,
              info: achievement.info,
            };
          }
          return achievement;
        }),
        result: state.achievements.filter(
          achievement => achievement.major === action.beacon.major,
        )[0],
        count: state.achievements.filter(achievement => achievement.isUnlocked).length,
        beacon: action.beacon,
      };
    case READ_SITES_AND_EVENTS:
      return {
        ...state,
        sites: state.achievements.filter(achievement => achievement.type === 'site'),
        events: state.achievements.filter(achievement => achievement.type === 'event'),
      };

    case ADD_TIMESTAMP_TO_LOGGER_REQUESTED: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: '',
      });
    }
    case ADD_TIMESTAMP_TO_LOGGER_REJECETD: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in adding timestamp to logger.',
      });
    }
    case ADD_TIMESTAMP_TO_LOGGER_FULFILLED:
      return {
        ...state,
        timestamp: action.timestamp,
        beaconInfo: action.beaconInfo,
        count: state.count,
      };
    default:
      return state;
  }
};
