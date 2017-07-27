import {
  UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED,
  READ_SITES_AND_EVENTS,
} from '../actions/achievements';

const initialState = {
  count: 1,
  result: {},
  sites: [],
  events: [],
  achievements: [
    {
      achievementName: 'Newbie',
      isUnlocked: true,
      image:
        'https://s-media-cache-ak0.pinimg.com/originals/0a/9c/8a/0a9c8a649b9ba8aa62c7fcaa86414019.png',
      feedback:
        'Welcome to TU Delft! Enjoy this first free sticker! View your collection of stickers under the Achievements Tab. Explore the campus to collect them all!',
    },
    {
      type: 'site',
      uuid: '01122334-4556-6778-899a-abbccddeeff0',
      major: 772,
      minor: 258,
      achievementName: 'Adventurer',
      isUnlocked: false,
      image:
        'https://s-media-cache-ak0.pinimg.com/originals/0a/9c/8a/0a9c8a649b9ba8aa62c7fcaa86414019.png',
      instruction:
        'Visit Electrical Engineering, Mathematics and Computer Sciences to unlock this sticker!',
      feedback:
        'Congratulations! You are now an adventurer! Do not wait! Continue to collect them all!',
      address: {
        postcode: '2628 CD',
        straat: 'Mekelweg',
        huisnummer: '4',
        plaats: 'Delft',
      },
      gpscoordinaten: { '@lon': '51.99903', '@lat': '4.37323' },
      name: 'Electrical Engineering, Mathematics and Computer Sciences',
      locatieCode: '36',
      picture: 'https://sg.tudelft.nl/wp-content/uploads/2013/10/TU-Delft-EWI-Building.jpg',
      info:
        'The Faculty of Architecture and the Built Environment at TU Delft (Dutch: Faculteit Bouwkunde; abbr. BK ) is the largest faculty of the university with around 2900 students. It is also one of the top faculties of the TU Delft and was ranked 3rd in the world’s top universities for architecture & built environment in the QS World University Rankings by Subject 2015, following the Massachusetts Institute of Technology (MIT) and University College London (UCL).',
    },
    {
      type: 'event',
      uuid: '01122334-4556-6778-899a-abbccddeeff0',
      major: 258,
      minor: 772,
      achievementName: 'Explorer',
      isUnlocked: false,
      image:
        'https://s-media-cache-ak0.pinimg.com/originals/0a/9c/8a/0a9c8a649b9ba8aa62c7fcaa86414019.png',
      instruction: 'You can unlock this sticker if you attend Latitud Presents on time!',
      feedback:
        'Congratulations! You are now an explorer! Do not wait! Continue to collect them all!!',
      address: {
        postcode: '2629 HS',
        straat: 'Kluyverweg',
        huisnummer: '5',
        plaats: 'Delft',
      },
      gpscoordinaten: { '@lon': '51.99065', '@lat': '4.37756' },
      name: 'Latitud Presents',
      start: 'Sunday, July 16, 2017 7:30 PM',
      end: 'Sunday, July 16, 2017 10:00 PM',
      cost: '8.00 euro',
      locatieCode: '66',
      picture: 'http://www.aal-europe.eu/wp-content/uploads/2013/12/events_medium.jpg',
      info:
        'The Faculty of Architecture and the Built Environment at TU Delft (Dutch: Faculteit Bouwkunde; abbr. BK ) is the largest faculty of the university with around 2900 students. It is also one of the top faculties of the TU Delft and was ranked 3rd in the world’s top universities for architecture & built environment in the QS World University Rankings by Subject 2015, following the Massachusetts Institute of Technology (MIT) and University College London (UCL).',
    },
  ],
};

export default (state = initialState, action) => {
  const { type } = action;
  const { achievements } = state;

  switch (type) {
    case UNLOCK_ACHIEVEMENT_IF_BEACON_DETECTED:
      return {
        ...state,
        achievements: achievements.map((achievement) => {
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
        result: achievements.filter(achievement => achievement.major === action.beacon.major)[0],
        count: achievements.filter(achievement => achievement.isUnlocked).length,
      };
    case READ_SITES_AND_EVENTS:
      return {
        ...state,
        sites: achievements.filter(achievement => achievement.type === 'site'),
        events: achievements.filter(achievement => achievement.type === 'event'),
      };
    // case READ_ADMIN_ACHIEVEMENTS:
    //   return {
    //     ...state,
    //     achievements: action.achievements,
    //   };
    default:
      return state;
  }
};
