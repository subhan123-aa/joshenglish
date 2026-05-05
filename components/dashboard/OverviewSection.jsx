export function OverviewSection({ dashboard, notifications, onMarkRead }) {
  return (
    <section className="dashboard-stack">
      <div className="stats-grid">
        <div className="metric-card">
          <span>Total Students</span>
          <strong>{dashboard.stats.totalStudents}</strong>
        </div>
        <div className="metric-card">
          <span>Total Enrollments</span>
          <strong>{dashboard.stats.totalEnrollments}</strong>
        </div>
        <div className="metric-card">
          <span>Active Courses</span>
          <strong>{dashboard.stats.activeCourses}</strong>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="admin-card">
          <div className="card-header">
            <div>
              <h2>Recent Enrollments</h2>
              <p>Fresh requests coming from the website and manual entries.</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Course</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.recentEnrollments.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.course}</td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-pill ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="admin-card">
          <div className="card-header">
            <div>
              <h2>Notifications</h2>
              <p>New enrollment alerts and recent admin activity.</p>
            </div>
            <button type="button" className="ghost-button" onClick={onMarkRead}>
              Mark all read
            </button>
          </div>
          <div className="notification-list">
            {notifications.length ? (
              notifications.map((item) => (
                <article
                  key={item._id}
                  className={`notification-item ${item.read ? "" : "unread"}`}
                >
                  <h3>{item.title}</h3>
                  <p>{item.message}</p>
                  <small>{new Date(item.createdAt).toLocaleString()}</small>
                </article>
              ))
            ) : (
              <p className="muted-copy">No new notifications yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
