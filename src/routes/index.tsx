import { Notification } from "../components/Notification";
import { AppRoutes } from "./app.routes";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
// import * as Linking from "expo-linking";
import { useTheme } from "native-base";
import { useState, useEffect } from "react";
import OneSignal, { NotificationReceivedEvent, OSNotification } from "react-native-onesignal";

const linking = {
  prefixes: ["com.axesoft.igniteshoesapp://", "igniteshoesapp://", "exp+igniteshoesapp://"],
  config: {
    screens: {
      details: {
        path: "details/:productId",
        parse: {
          productId: (productId: string) => productId,
        },
      },
      cart: {
        path: "cart",
      },
    },
  },
};

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  // const deepLinking = Linking.createURL("details", {
  //   queryParams: {
  //     productId: "7",
  //   },
  // });

  // console.log("deepLinking: ", deepLinking);

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: NotificationReceivedEvent) => {
        let notificationResponse = notificationReceivedEvent.getNotification();
        setNotification(notificationResponse);
        // console.log("notification: ", notification);
        // const data = notification.additionalData;
        // console.log("additionalData: ", data);
        // // Complete with null means don't show a notification.
        // notificationReceivedEvent.complete(notification);
      }
    );

    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {notification?.title && (
        <Notification data={notification} onClose={() => setNotification(undefined)} />
      )}
    </NavigationContainer>
  );
}
