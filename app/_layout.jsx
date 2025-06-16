import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <Stack screenOptions={stackOptions}>
        <Stack.Screen name="index" options={notesScreenOptions} />
      </Stack>
    </GestureHandlerRootView>
  );
};

const stackOptions = {
  headerStyle: {
    backgroundColor: "#114A5F",
  },
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentStyle: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#ffffff",
  },
  headerTintColor: "#fff",
  headerTitleAlign: "center",
};

const notesScreenOptions = {
  title: "Notes",
};

export default RootLayout;
