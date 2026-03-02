import "react-native-gesture-handler";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import MainScreen from "./screens/MainScreen";
import DetailsScreen from "./screens/DetailsScreen";
import ContactsScreen from "./screens/ContactsScreen";
import CustomDrawer from "./components/CustomDrawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MenuButton({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      style={{ paddingHorizontal: 14 }}
    >
      <Text style={{ fontSize: 22 }}>☰</Text>
    </TouchableOpacity>
  );
}

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          title: "Новини",
          headerLeft: () => <MenuButton navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ navigation }) => ({
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
          <Drawer.Screen
            name="News"
            component={NewsStack}
            options={{ title: "Новини", headerShown: false }}
          />
          <Drawer.Screen
            name="Contacts"
            component={ContactsScreen}
            options={{ title: "Контакти" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}