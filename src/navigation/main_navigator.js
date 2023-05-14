import { createStackNavigator } from "@react-navigation/stack";
import { IntroScreen } from "../components/intro";
import { ChooseSeatsScreen } from "../components/chooseseats";
import Lyrics from "../components/songscreen";
import MusicPlayer from "../components/song";
import Karaoke from "../components/karaoke";
import { PlayProvider } from "../providers/PlayProvider";

const Stack = createStackNavigator();

export const MainNavigator = () => {
  return (
    <PlayProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="introscreen"
          options={{ headerShown: false }}
          component={IntroScreen}
        />
        <Stack.Screen
          name="choosescreen"
          options={{ headerShown: false }}
          component={ChooseSeatsScreen}
        />
        <Stack.Screen
          name="songscreen"
          options={{ headerShown: false }}
          component={Karaoke}
        />
      </Stack.Navigator>
    </PlayProvider>
  );
};
