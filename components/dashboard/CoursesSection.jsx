export function CoursesSection({
  courseForm,
  setCourseForm,
  editingCourseId,
  setEditingCourseId,
  courses,
  onSubmit,
  onDelete,
}) {
  const emptyCourse = { name: "", description: "", price: "", duration: "" };

  return (
    <section className="dashboard-grid">
      <form className="admin-card form-card" onSubmit={onSubmit}>
        <div className="card-header">
          <div>
            <h2>{editingCourseId ? "Edit Course" : "Add Course"}</h2>
            <p>Manage the public course catalog.</p>
          </div>
        </div>
        <div className="form-grid">
          <label>
            Course Name
            <input
              type="text"
              value={courseForm.name}
              onChange={(event) =>
                setCourseForm((current) => ({ ...current, name: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Duration
            <input
              type="text"
              value={courseForm.duration}
              onChange={(event) =>
                setCourseForm((current) => ({ ...current, duration: event.target.value }))
              }
              required
            />
          </label>
          <label>
            Price
            <input
              type="text"
              value={courseForm.price}
              onChange={(event) =>
                setCourseForm((current) => ({ ...current, price: event.target.value }))
              }
            />
          </label>
          <label className="full-span">
            Description
            <textarea
              rows={5}
              value={courseForm.description}
              onChange={(event) =>
                setCourseForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              required
            />
          </label>
        </div>
        <div className="action-row">
          <button type="submit" className="btn btn-primary">
            {editingCourseId ? "Update Course" : "Add Course"}
          </button>
          {editingCourseId ? (
            <button
              type="button"
              className="ghost-button"
              onClick={() => {
                setEditingCourseId("");
                setCourseForm(emptyCourse);
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
            <h2>Course List</h2>
            <p>Active courses shown on the website.</p>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.name}</td>
                  <td>{course.duration}</td>
                  <td>{course.price ? `Rs. ${course.price}` : "Optional"}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="ghost-button"
                        onClick={() => {
                          setEditingCourseId(course._id);
                          setCourseForm({
                            name: course.name,
                            description: course.description,
                            price: course.price || "",
                            duration: course.duration,
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="danger-button"
                        onClick={() => onDelete("/courses", course._id, "course")}
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
