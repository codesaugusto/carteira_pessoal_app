import { useState } from "react";
import { useNotifications } from "../../hooks/notifications";
import NotificationPanel from "../Notifications/NotificationPanel";
import Avatar from "../Avatar/Avatar";

interface HeaderProps {
  onNavigateToProfile?: () => void;
}

const Header = ({ onNavigateToProfile }: HeaderProps) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, deleteNotification } =
    useNotifications();

  return (
    <>
      <div className="flex justify-between items-center px-6 py-6">
        <button
          onClick={onNavigateToProfile}
          className="flex items-center gap-4 hover:opacity-80 transition"
        >
          <Avatar alt="Carlos Augusto" fallback="CA" size="lg" />
          <div>
            <p className="text-gray-400 text-sm text-left">Olá,</p>
            <p className="text-white text-xl font-semibold">Carlos Augusto</p>
          </div>
        </button>
        <button
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          className="relative w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
          </svg>

          {/* Badge de notificações não lidas */}
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      <NotificationPanel
        notifications={notifications}
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        onMarkAsRead={markAsRead}
        onDeleteNotification={deleteNotification}
      />
    </>
  );
};

export default Header;
