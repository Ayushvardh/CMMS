import React, { useEffect, useState } from "react";

export default function AdminIssues() {
  const [issues, setIssues] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchIssues = async () => {
    const res = await fetch("http://localhost:5000/api/issues");
    const data = await res.json();
    setIssues(data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/issues/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchIssues(); // refresh
  };

  const updatePriority = async (id, priority) => {
    await fetch(`http://localhost:5000/api/issues/${id}/priority`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority }),
    });

    setIssues((prev) =>
      prev.map((i) =>
        i._id === id ? { ...i, priority } : i
      )
    );
  };

  const filteredIssues =
    filter === "All"
      ? issues
      : issues.filter((i) => i.status === filter);

  return (
    <div className="admin-issues-container">
      <h2 className="admin-title">🛠 Reported Issues</h2>

      {/* FILTER */}
      <div className="filter-bar">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="issues-card">
        <table className="issues-table">
          <thead>
            <tr>
              <th>Computer</th>
              <th>Dept</th>
              <th>Issue</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {filteredIssues.map((issue) => (
              <tr key={issue._id}>
                <td>{issue.computerId}</td>
                <td>{issue.department}</td>
                <td>{issue.issueType}</td>

                {/* STATUS */}
                <td>
                  <select
                    value={issue.status || "Pending"}
                    onChange={(e) =>
                      updateStatus(issue._id, e.target.value)
                    }
                    className={`status-badge ${(issue.status || "Pending")
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </td>

                {/* PRIORITY */}
                <td>
                  <span className={`priority ${issue.priority}`}>
                    {issue.priority}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}