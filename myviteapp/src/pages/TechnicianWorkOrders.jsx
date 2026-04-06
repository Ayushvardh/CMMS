import React, { useEffect, useState } from "react";

export default function TechnicianWorkOrders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("cmms_user"));

  useEffect(() => {
    fetch("http://localhost:5000/api/issues")
      .then((res) => res.json())
      .then((data) => {
        // ✅ FILTER ONLY ASSIGNED WORK
        const filtered = data.filter(
          (o) => o.assignedTo === user.username
        );
        setOrders(filtered);
      });
  }, []);

  // ✅ Update status
  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/issues/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, status: newStatus } : o
      )
    );
  };

  return (
    <div className="workorders-container">
      <h2>🧑‍🔧 My Assigned Work</h2>

      <div className="workorders-card">
        <table className="workorders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Computer</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5">No assigned work</td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id}>
                  <td>{o._id.slice(-5)}</td>
                  <td>{o.computerId}</td>
                  <td>{o.issueType}</td>

                  <td>{o.status}</td>

                  {/* 🔥 Technician updates status */}
                  <td>
                    <select
                      value={o.status}
                      onChange={(e) =>
                        updateStatus(o._id, e.target.value)
                      }
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}