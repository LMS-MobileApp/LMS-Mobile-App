import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "@/components/StartScreen";
import Registration from "@/components/Registration";
import Login from "@/components/Login";
import AssignmentView from "@/components/tab/User/AssignmentView";
import Dashboard from "@/components/tab/User/Dashboard";
import Assignments from "@/components/tab/User/Assignments";
import UserProfileScreen from "@/components/tab/User/UserProfileScreen";
import SettingScreen from "@/components/SettingScreen";

const Stack = createStackNavigator();

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AssignmentView"
          component={AssignmentView}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserDashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Assignments"
          component={Assignments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
