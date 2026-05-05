export function SettingsSection({
  settings,
  setSettings,
  credentialsForm,
  setCredentialsForm,
  onSettingsSubmit,
  onCredentialsSubmit,
}) {
  return (
    <section className="dashboard-grid">
      <form className="admin-card form-card" onSubmit={onSettingsSubmit}>
        <div className="card-header">
          <div>
            <h2>Basic Site Settings</h2>
            <p>Update academy-level contact and branding details.</p>
          </div>
        </div>
        <div className="form-grid">
          <label>
            Site Name
            <input
              type="text"
              value={settings.siteName}
              onChange={(event) =>
                setSettings((current) => ({ ...current, siteName: event.target.value }))
              }
            />
          </label>
          <label>
            Support Email
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  supportEmail: event.target.value,
                }))
              }
            />
          </label>
          <label>
            Contact Phone
            <input
              type="text"
              value={settings.contactPhone}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  contactPhone: event.target.value,
                }))
              }
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Save Settings
        </button>
      </form>

      <form className="admin-card form-card" onSubmit={onCredentialsSubmit}>
        <div className="card-header">
          <div>
            <h2>Admin Credentials</h2>
            <p>Change admin email and password securely.</p>
          </div>
        </div>
        <div className="form-grid">
          <label>
            Current Password
            <input
              type="password"
              value={credentialsForm.currentPassword}
              onChange={(event) =>
                setCredentialsForm((current) => ({
                  ...current,
                  currentPassword: event.target.value,
                }))
              }
              required
            />
          </label>
          <label>
            New Admin Email
            <input
              type="email"
              value={credentialsForm.newEmail}
              onChange={(event) =>
                setCredentialsForm((current) => ({
                  ...current,
                  newEmail: event.target.value,
                }))
              }
              required
            />
          </label>
          <label>
            New Password
            <input
              type="password"
              value={credentialsForm.newPassword}
              onChange={(event) =>
                setCredentialsForm((current) => ({
                  ...current,
                  newPassword: event.target.value,
                }))
              }
              placeholder="Leave blank to keep current password"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Credentials
        </button>
      </form>
    </section>
  );
}
