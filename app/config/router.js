import React from 'react';
import { Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import NearbyAndroid from '../screens/NearbyAndroid';
import NearbyIOS from '../screens/NearbyIOS';
import Achievements from '../screens/Achievements';
import Campus from '../screens/Campus';
import Details from '../screens/Details';
import Feed from '../screens/Feed';

export const Tabs = TabNavigator(
  {
    Nearby: {
      screen: Platform.OS === 'ios' ? NearbyIOS : NearbyAndroid,
      navigationOptions: {
        tabBarLabel: 'Near Me',
        tabBarIcon: ({ tintColor }) => <Icon name="gps-fixed" size={12} color={tintColor} />,
      },
    },
    Achievements: {
      screen: Achievements,
      navigationOptions: {
        tabBarLabel: 'Achievements',
        tabBarIcon: ({ tintColor }) =>
          <Icon name="diamond" type="font-awesome" size={12} color={tintColor} />,
      },
    },
    Campus: {
      screen: Campus,
      navigationOptions: {
        tabBarLabel: 'Campus',
        tabBarIcon: ({ tintColor }) => <Icon name="list" size={12} color={tintColor} />,
      },
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      upperCaseLabel: false,
      style: {
        backgroundColor: '#ef8389',
      },
      iconStyle: {
        height: 11,
      },
      labelStyle: {
        fontSize: 10,
        fontWeight: '600',
      },
      activeTintColor: '#FFFF00',
    },
  },
);

export const SitesStack = StackNavigator({
  Sites: {
    screen: Feed,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.screen}`,
      headerLeft: (
        <Icon
          name={'chevron-left'}
          size={40}
          onPress={() => {
            navigation.goBack(null);
          }}
        />
      ),
    }),
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
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.screen}`,
      headerLeft: (
        <Icon
          name={'chevron-left'}
          size={40}
          onPress={() => {
            navigation.goBack(null);
          }}
        />
      ),
    }),
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
