import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

// Screens
import DashboardScreen from './screens/DashboardScreen';
import AirQualityScreen from './screens/AirQualityScreen';
import GreenSpacesScreen from './screens/GreenSpacesScreen';
import WaterQualityScreen from './screens/WaterQualityScreen';
import ReportIssueScreen from './screens/ReportIssueScreen';
import AlertsScreen from './screens/AlertsScreen';
import InitiativesScreen from './screens/InitiativesScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Air Quality') {
            iconName = focused ? 'cloud' : 'cloud-outline';
          } else if (route.name === 'Green Spaces') {
            iconName = focused ? 'leaf' : 'leaf-outline';
          } else if (route.name === 'Water') {
            iconName = focused ? 'water' : 'water-outline';
          } else if (route.name === 'Report') {
            iconName = focused ? 'flag' : 'flag-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E8B57',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#2E8B57',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Air Quality" component={AirQualityScreen} />
      <Tab.Screen name="Green Spaces" component={GreenSpacesScreen} />
      <Tab.Screen name="Water" component={WaterQualityScreen} />
      <Tab.Screen name="Report" component={ReportIssueScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Request notification permissions
      const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
      if (notificationStatus === 'granted') {
        console.log('Notification permissions granted');
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Alerts" 
          component={AlertsScreen}
          options={{
            title: 'Environmental Alerts',
            headerStyle: { backgroundColor: '#2E8B57' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Initiatives" 
          component={InitiativesScreen}
          options={{
            title: 'Green Initiatives',
            headerStyle: { backgroundColor: '#2E8B57' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}