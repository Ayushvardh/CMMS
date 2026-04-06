import React, { useEffect, useState } from "react";

export default function AdminWorkOrders() {
  const [orders, setOrders] = useState([]);
  const [editedOrders, setEditedOrders] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/issues")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  // handle dropdown changes (NO API call yet)
  const handleChange = (id, field, value) => {
    setEditedOrders((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  // SAVE button → updates DB
  const saveChanges = async (id) => {
  const updates = editedOrders[id];
  if (!updates) return;

  const res = await fetch(`http://localhost:5000/api/issues/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (res.ok) {
    alert("✅ Saved successfully!");
  } else {
    alert("❌ Failed to save");
  }

  setOrders((prev) =>
    prev.map((o) =>
      o._id === id ? { ...o, ...updates } : o
    )
  );

  setEditedOrders((prev) => {
    const copy = { ...prev };
    delete copy[id];
    return copy;
  });
};

  return (
    <div className="workorders-container">
      <h2>📋 Manage Work Orders</h2>

      <div className="workorders-card">
        <table className="workorders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Computer</th>
              <th>Issue</th>
              <th>Technician</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Date</th>
              <th>Save</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id.slice(-5)}</td>
                <td>{o.computerId}</td>
                <td>{o.issueType}</td>

                {/* Technician */}
                <td>
                  <select
                    value={
                      editedOrders[o._id]?.assignedTo ||
                      o.assignedTo ||
                      "Unassigned"
                    }
                    onChange={(e) =>
                      handleChange(
                        o._id,
                        "assignedTo",
                        e.target.value
                      )
                    }
                  >
                    <option>Unassigned</option>
                    <option value="tech">tech</option>
                  </select>
                </td>

                {/* Status */}
                <td>
                  <select
                    value={
                      editedOrders[o._id]?.status || o.status
                    }
                    onChange={(e) =>
                      handleChange(
                        o._id,
                        "status",
                        e.target.value
                      )
                    }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </td>

                {/* Priority */}
                <td>
                  <select
                    value={
                      editedOrders[o._id]?.priority ||
                      o.priority ||
                      "Medium"
                    }
                    onChange={(e) =>
                      handleChange(
                        o._id,
                        "priority",
                        e.target.value
                      )
                    }
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </td>

                {/* Date */}
                <td>
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>

                {/* Save Button */}
                <td>
                  <button
                    className="save-btn"
                    onClick={() => saveChanges(o._id)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}