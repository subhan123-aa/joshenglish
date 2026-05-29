export function EnrollmentsSection({
  enrollmentForm,
  setEnrollmentForm,
  courses,
  enrollments,
  onSubmit,
  onStatusChange,
}) {
  return (
    <section className="dashboard-stack">
      <form className="admin-card form-card" onSubmit={onSubmit}>
        <div className="card-header">
          <div>
            <h2>Add Manual Lead</h2>
            <p>Capture walk-in enquiries or phone leads directly from the dashboard.</p>
          </div>
        </div>
        <div className="form-grid">
          <label>
            Name
            <input
              type="text"
              value={enrollmentForm.name}
              onChange={(event) =>
                setEnrollmentForm((current) => ({ ...current, name: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Phone
            <input
              type="tel"
              value={enrollmentForm.phone}
              onChange={(event) =>
                setEnrollmentForm((current) => ({ ...current, phone: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Selected Program
            <select
              value={enrollmentForm.course}
              onChange={(event) =>
                setEnrollmentForm((current) => ({ ...current, course: event.target.value }))
              }
              required
            >
              <option value="">Choose program</option>
              {courses.map((course) => (
                <option key={course._id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Save Lead
        </button>
      </form>

      <div className="admin-card">
        <div className="card-header">
          <div>
            <h2>Enquiry Leads</h2>
            <p>Track incoming consultation requests and update their status.</p>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Branch</th>
                <th>Message</th>
                <th>Date</th>
                <th>Source</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.course}</td>
                  <td>{item.branch || "-"}</td>
                  <td>{item.message || "-"}</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td>{item.source}</td>
                  <td>
                    <span className={`status-pill ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="ghost-button"
                        onClick={() => onStatusChange(item._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        className="danger-button"
                        onClick={() => onStatusChange(item._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

