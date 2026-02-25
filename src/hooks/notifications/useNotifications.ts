import { useContext } from "react";
import { NotificationContext } from "../../contexts/notifications/notificationContext";

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications deve ser usado dentro de NotificationProvider",
    );
  }
  return context;
};
