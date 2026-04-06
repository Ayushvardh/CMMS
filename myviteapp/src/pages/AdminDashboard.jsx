import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function StatCard({ title, value, sub }) {
  return (
    <div className="dash-card">
      <div className="dash-card-title">{title}</div>
      <div className="dash-card-value">{value}</div>
      {sub ? <div className="dash-card-sub">{sub}</div> : null}
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  // ✅ ALL HOOKS MUST BE INSIDE COMPONENT
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/issues")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("cmms_user");
    if (!storedUser) return navigate("/login");

    const user = JSON.parse(storedUser);
    if (user.role !== "admin") navigate("/dashboard");
  }, [navigate]);

  const stats = useMemo(() => {
    const total = orders.length;

    const byStatus = (s) =>
      orders.filter((o) => (o.status || "").toLowerCase() === s).length;

    const open = byStatus("open");
    const pending = orders.filter(o => o.status === "Pending").length;
    const inProgress = orders.filter(o => o.status === "In Progress").length;
    const completed = orders.filter(o => o.status === "Completed").length;

    const priorityHigh = orders.filter(
      (o) => (o.priority || "").toLowerCase() === "high"
    ).length;

    const recent = [...orders].slice(0, 6);
    const healthScore = total === 0 ? 100 : Math.max(30, 100 - (open + pending) * 6);

    return { total, open, inProgress, completed, pending, priorityHigh, recent, healthScore };
  }, [orders]);

  return (
    <div className="dash-wrap">

      <div style={{
        background: "#ffe8cc",
        borderRadius: 12,
        padding: "16px 20px",
        marginBottom: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <div>
          <h3 style={{ margin: 0 }}>🛠 Admin Control Center</h3>
          <small>Full system authority — manage users, tickets and technicians.</small>
        </div>

        <button className="dash-btn" onClick={() => navigate("/admin")}>
          Back to Admin Panel
        </button>
      </div>

      <div className="dash-grid">
        <button className="dash-action-btn orange" onClick={() => navigate("/workorders")}>
          Manage All Orders
        </button>
        <button className="dash-action-btn blue" onClick={() => navigate("/report")}>
          View All Issues
        </button>
        <button className="dash-action-btn blue">
          Assign Technician
        </button>
        <button className="dash-action-btn orange">
          Manage Users
        </button>
      </div>

      <div className="dash-grid">
        <StatCard title="Total System Orders" value={stats.total} sub="All users" />
        <StatCard title="Open Issues" value={stats.open} sub="Needs assignment" />
        <StatCard title="In Progress" value={stats.inProgress} sub="Technicians working" />
        <StatCard title="Completed" value={stats.completed} sub="Resolved tickets" />
      </div>

      <div className="dash-row">
        <div className="dash-panel">
          <h3>System Maintenance Health</h3>
          <p className="muted">Overall system load indicator.</p>

          <div className="health-bar">
            <div className="health-fill" style={{ width: `${stats.healthScore}%` }} />
          </div>

          <div className="health-meta">
            <span>Score: <b>{stats.healthScore}</b>/100</span>
            <span>High Priority: <b>{stats.priorityHigh}</b></span>
          </div>
        </div>

        <div className="dash-panel">
          <h3>⚠ System Alerts</h3>
          {stats.priorityHigh > 0 ? (
            <p className="pill high">High priority tickets require attention</p>
          ) : (
            <p className="muted">No critical alerts in system</p>
          )}
        </div>
      </div>

      <div className="dash-panel">
        <h3>Recent System Work Orders</h3>

        {stats.recent.length === 0 ? (
          <div className="empty">No work orders in system yet.</div>
        ) : (
          <div className="table">
            <div className="trow thead">
              <div>ID</div>
              <div>Title</div>
              <div>Status</div>
              <div>Priority</div>
              <div>Date</div>
            </div>

            {stats.recent.map((o) => (
              <div className="trow" key={o._id}>
                <div>{o._id}</div>
                <div className="t-title">{o.issueType || "Untitled"}</div>
                <div>
                  <span className={`pill ${String(o.status || "open").toLowerCase().replace(" ", "-")}`}>
                    {o.status || "Open"}
                  </span>
                </div>
                <div>{o.priority || "-"}</div>
                <div>{o.createdAt || "-"}</div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}