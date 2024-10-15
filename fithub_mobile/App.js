import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PickRole from "./src/screens/PickRole";

import MemberTabNavigator from "./src/navigator/MemberTabNavigator";
import MemberLogin from "./src/screens/Member/Login";
import MemberRegistration from "./src/screens/Member/Registration";
import MemberDashboard from "./src/screens/Member/Dashboard";
import MemberAccount from "./src/screens/Member/Account";
import MemberChangePassword from "./src/screens/Member/ChangePassword";
import MemberAccountInformation from "./src/screens/Member/AccountInformation";
import MemberNotification from "./src/screens/Member/Notification";
import MemberViewRideHistory from "./src/screens/Member/ViewRideHistory";
import MemberEmergency from "./src/screens/Member/Emergency";
import MemberAddEmergency from "./src/screens/Member/AddEmergency";
import MemberConnect from "./src/screens/Member/Connect";
import MemberAddConnect from "./src/screens/Member/AddConnect";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Pick Role"
          component={PickRole}
          options={{ headerShown: false }}
        /> */}
        {/* Member */}
        <Stack.Screen name="Member Login" component={MemberLogin} />
        <Stack.Screen
          name="Member Tab Navigator"
          component={MemberTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Member Registration"
          component={MemberRegistration}
        />
        <Stack.Screen
          name="Member Dashboard"
          component={MemberDashboard}
        />
        <Stack.Screen name="Member Account" component={MemberAccount} />
        <Stack.Screen
          name="Member Change Password"
          component={MemberChangePassword}
        />
        <Stack.Screen
          name="Member Account Information"
          component={MemberAccountInformation}
        />
        <Stack.Screen
          name="Member Notification"
          component={MemberNotification}
        />
        <Stack.Screen
          name="Member View Ride History"
          component={MemberViewRideHistory}
        />
        <Stack.Screen name="Member Connect" component={MemberConnect} />
        <Stack.Screen
          name="Member Emergency"
          component={MemberEmergency}
        />
        <Stack.Screen
          name="Member Add Emergency"
          component={MemberAddEmergency}
        />
        <Stack.Screen
          name="Member Add Connect"
          component={MemberAddConnect}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
