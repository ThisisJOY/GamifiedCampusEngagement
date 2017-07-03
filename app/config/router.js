import React from 'react';
// import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import NearbyAndroid from '../screens/NearbyAndroid';
import NearbyIOS from '../screens/NearbyIOS';
// import Events from '../screens/Events';
import Achievements from '../screens/Achievements';
import Campus from '../screens/Campus';
// import Sites from '../screens/Sites';
import Details from '../screens/Details';
import Feed from '../screens/Feed';

export const Tabs = TabNavigator({
  Achievements: {
    screen: Achievements,
    navigationOptions: {
      tabBarLabel: 'Achievements',
      tabBarIcon: ({ tintColor }) =>
        <Icon name="diamond" type="font-awesome" size={30} color={tintColor} />,
    },
  },
  Nearby: {
    screen: Platform.OS === 'ios' ? NearbyIOS : NearbyAndroid,
    navigationOptions: {
      tabBarLabel: 'Near Me',
      tabBarIcon: ({ tintColor }) => <Icon name="gps-fixed" size={30} color={tintColor} />,
    },
  },
  Campus: {
    screen: Campus,
    navigationOptions: {
      tabBarLabel: 'Campus',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={30} color={tintColor} />,
    },
  },
});

export const SitesStack = StackNavigator({
  Sites: {
    screen: Feed,
    navigationOptions: {
      title: 'Sites',
    },
  },
  Details: {
    screen: Details,
    navigationOptions: {
      title: 'Details',
    },
  },
});

export const EventsStack = StackNavigator({
  Events: {
    screen: Feed,
    navigationOptions: {
      title: 'Events',
    },
  },
  Details: {
    screen: Details,
    navigationOptions: {
      title: 'Details',
    },
  },
});

export const Root = StackNavigator(
  {
    Tabs: {
      screen: Tabs,
    },
    Sites: {
      screen: SitesStack,
    },
    Events: {
      screen: EventsStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);
