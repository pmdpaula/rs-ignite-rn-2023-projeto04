import { Loading } from "./src/components/Loading";
import { CartContextProvider } from "./src/contexts/CartContext";
import { tagUserInfoCreate } from "./src/notifications/notificationsTags";
import { Routes } from "./src/routes";
import { THEME } from "./src/theme";
import { ONE_SIGNAL_APP_ID } from "@env";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { NativeBaseProvider } from "native-base";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import OneSignal from "react-native-onesignal";

OneSignal.setAppId(String(ONE_SIGNAL_APP_ID));
OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((notificationResponse) => {
      const { actionId } = notificationResponse.action as any;

      switch (actionId) {
        case "1":
          return console.log("Ver todas");

        case "2":
          return console.log("Ver pedido");

        default:
          return console.log("Não foi clicado em botão de ação");
      }
    });

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <CartContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</CartContextProvider>
    </NativeBaseProvider>
  );
}
