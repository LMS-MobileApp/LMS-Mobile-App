import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "@/components/StartScreen";
import Registration from "@/components/Registration";
import Login from "@/components/Login";
import AssignmentView from "@/components/tab/User/AssignmentView";
import Dashboard from "@/components/tab/User/Dashboard";

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
      </Stack.Navigator>
    </SafeAreaProvider>
  );
}
