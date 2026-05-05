export function StudentsSection({
  studentForm,
  setStudentForm,
  editingStudentId,
  setEditingStudentId,
  courses,
  filters,
  setFilters,
  filteredStudents,
  onSubmit,
  onDelete,
  onPaymentUpdate,
}) {
  const emptyStudent = { name: "", phone: "", course: "", paymentStatus: "Pending" };

  return (
    <section className="dashboard-stack">
      <div className="dashboard-grid">
        <form className="admin-card form-card" onSubmit={onSubmit}>
          <div className="card-header">
            <div>
              <h2>{editingStudentId ? "Edit Student" : "Add Student"}</h2>
              <p>Manage student records and payment status.</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              Name
              <input
                type="text"
                value={studentForm.name}
                onChange={(event) =>
                  setStudentForm((current) => ({ ...current, name: event.target.value }))
                }
                required
              />
            </label>
            <label>
              Phone
              <input
                type="tel"
                value={studentForm.phone}
                onChange={(event) =>
                  setStudentForm((current) => ({ ...current, phone: event.target.value }))
                }
                required
              />
            </label>
            <label>
              Course
              <select
                value={studentForm.course}
                onChange={(event) =>
                  setStudentForm((current) => ({ ...current, course: event.target.value }))
                }
                required
              >
                <option value="">Choose course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Payment Status
              <select
                value={studentForm.paymentStatus}
                onChange={(event) =>
                  setStudentForm((current) => ({
                    ...current,
                    paymentStatus: event.target.value,
                  }))
                }
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
              </select>
            </label>
          </div>
          <div className="action-row">
            <button type="submit" className="btn btn-primary">
              {editingStudentId ? "Update Student" : "Add Student"}
            </button>
            {editingStudentId ? (
              <button
                type="button"
                className="ghost-button"
                onClick={() => {
                  setEditingStudentId("");
                  setStudentForm(emptyStudent);
                }}
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <div className="admin-card">
          <div className="card-header">
            <div>
              <h2>Search & Filters</h2>
              <p>Quickly find student records.</p>
            </div>
          </div>
          <div className="form-grid">
            <label>
              Search
              <input
                type="text"
                placeholder="Name or phone"
                value={filters.query}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, query: event.target.value }))
                }
              />
            </label>
            <label>
              Course
              <select
                value={filters.course}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, course: event.target.value }))
                }
              >
                <option value="">All courses</option>
                {courses.map((course) => (
                  <option key={course._id} value={course.name}>
                    {course.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Payment
              <select
                value={filters.paymentStatus}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    paymentStatus: event.target.value,
                  }))
                }
              >
                <option value="">All</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="card-header">
          <div>
            <h2>Students</h2>
            <p>Full student roster with payment controls.</p>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.phone}</td>
                  <td>{student.course}</td>
                  <td>
                    <select
                      value={student.paymentStatus}
                      onChange={(event) =>
                        onPaymentUpdate(student._id, event.target.value)
                      }
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="ghost-button"
                        onClick={() => {
                          setEditingStudentId(student._id);
                          setStudentForm({
                            name: student.name,
                            phone: student.phone,
                            course: student.course,
                            paymentStatus: student.paymentStatus,
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="danger-button"
                        onClick={() => onDelete("/students", student._id, "student")}
                      >
                        Delete
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
