import React, { useEffect, useState } from "react";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(data.reverse()); // latest first
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>🔔 Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        notifications.map((n, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: 12,
              marginBottom: 10,
              borderRadius: 8,
            }}
          >
            <p>{n.message}</p>
            <small>{n.time}</small>
          </div>
        ))
      )}
    </div>
  );
}