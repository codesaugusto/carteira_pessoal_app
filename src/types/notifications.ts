export interface Notification {
  id: number;
  title: string;
  message: string;
  type: "success" | "warning" | "error" | "info";
  timestamp: Date;
  read: boolean;
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    title: string,
    message: string,
    type: "success" | "warning" | "error" | "info",
  ) => void;
  markAsRead: (id: number) => void;
  deleteNotification: (id: number) => void;
  clearAll: () => void;
}
