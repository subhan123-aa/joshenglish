const sections = [
  { key: "overview", label: "Dashboard" },
  { key: "students", label: "Students" },
  { key: "courses", label: "Courses" },
  { key: "enquiries", label: "Enquiry Leads" },
  { key: "seminars", label: "Seminar Gallery" },
  { key: "content", label: "Content" },
  { key: "settings", label: "Settings" },
];

export function AdminShell({
  children,
  activeSection,
  onSectionChange,
  onLogout,
  notificationCount,
  adminName,
}) {
  return (
    <main className="admin-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark">J</span>
          <div>
            <strong>Josh English Academy</strong>
            <div className="muted-copy">Professional institute dashboard</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sections.map((section) => (
            <button
              key={section.key}
              type="button"
              className={activeSection === section.key ? "active" : ""}
              onClick={() => onSectionChange(section.key)}
            >
              <span>{section.label}</span>
              {section.key === "overview" && notificationCount ? <strong>{notificationCount}</strong> : null}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-meta">
            <strong>{adminName}</strong>
            <div className="muted-copy">Secure academy operations</div>
          </div>
          <button type="button" className="btn logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="topbar">
          <div>
            <h1>{sections.find((item) => item.key === activeSection)?.label}</h1>
            <p>Manage coaching content, enquiry leads, seminar imagery, and academy settings.</p>
          </div>
          <div className="topbar-badge">
            <span>New alerts</span>
            <strong>{notificationCount}</strong>
          </div>
        </header>

        {children}
      </section>
    </main>
  );
}
