import { useEffect, useState } from "react";
import {
  fetchNotifications,
  markNotificationRead,
} from "../utils/notificationApi";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await fetchNotifications();
      setNotifications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = notifications.filter(
    (n) => !n.isRead
  ).length;

  const handleRead = async (id) => {
    await markNotificationRead(id);

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-2xl"
      >
        🔔

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
          <h2 className="font-bold mb-2">
            Notifications
          </h2>

          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-b py-2 cursor-pointer ${
                  !notification.isRead
                    ? "font-semibold"
                    : ""
                }`}
                onClick={() =>
                  handleRead(notification.id)
                }
              >
                <p>{notification.title}</p>

                <p className="text-sm text-gray-600">
                  {notification.message}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;