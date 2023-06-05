import OneSignal from "react-native-onesignal";

export const tagUserInfoCreate = () => {
  OneSignal.sendTags({ user_name: "Pedro", user_email: "pmdpaula@yahoo.com.br" });
};

export const tagCartUpdate = (itemsCount: string) => {
  OneSignal.sendTag("cart_items_count", itemsCount);
};
