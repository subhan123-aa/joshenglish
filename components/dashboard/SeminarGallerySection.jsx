function updateGalleryItem(gallery, index, field, value) {
  return gallery.map((item, currentIndex) =>
    currentIndex === index ? { ...item, [field]: value } : item
  );
}

export function SeminarGallerySection({ content, setContent, onSubmit }) {
  const gallery = content.seminarGallery || [];

  function addItem() {
    setContent((current) => ({
      ...current,
      seminarGallery: [
        ...(current.seminarGallery || []),
        {
          title: "New Seminar Event",
          month: "New Month",
          caption: "Add a short event caption for the gallery card.",
          imageUrl: "",
          status: "Upload image",
        },
      ],
    }));
  }

  function removeItem(index) {
    setContent((current) => ({
      ...current,
      seminarGallery: (current.seminarGallery || []).filter((_, currentIndex) => currentIndex !== index),
    }));
  }

  return (
    <section className="dashboard-stack">
      <div className="admin-card">
        <div className="card-header">
          <div>
            <h2>Seminar Gallery Manager</h2>
            <p>Maintain monthly event cards and upload-ready image placeholders.</p>
          </div>
          <button type="button" className="ghost-button" onClick={addItem}>
            Add Seminar Card
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {gallery.length ? (
            gallery.map((item, index) => (
              <div key={`${item.month}-${index}`} className="rounded-3xl border border-[#edf2f7] bg-[#f8fafc] p-5">
                <div className="grid gap-4">
                  <label>
                    Card Title
                    <input
                      type="text"
                      value={item.title}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          seminarGallery: updateGalleryItem(
                            current.seminarGallery || [],
                            index,
                            "title",
                            event.target.value
                          ),
                        }))
                      }
                    />
                  </label>
                  <label>
                    Month / Period
                    <input
                      type="text"
                      value={item.month}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          seminarGallery: updateGalleryItem(
                            current.seminarGallery || [],
                            index,
                            "month",
                            event.target.value
                          ),
                        }))
                      }
                    />
                  </label>
                  <label className="full-span">
                    Caption
                    <textarea
                      rows={3}
                      value={item.caption}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          seminarGallery: updateGalleryItem(
                            current.seminarGallery || [],
                            index,
                            "caption",
                            event.target.value
                          ),
                        }))
                      }
                    />
                  </label>
                  <label className="full-span">
                    Image URL
                    <input
                      type="url"
                      value={item.imageUrl}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          seminarGallery: updateGalleryItem(
                            current.seminarGallery || [],
                            index,
                            "imageUrl",
                            event.target.value
                          ),
                        }))
                      }
                      placeholder="Paste seminar image link or CDN upload URL"
                    />
                  </label>
                  <label>
                    Card Status
                    <select
                      value={item.status}
                      onChange={(event) =>
                        setContent((current) => ({
                          ...current,
                          seminarGallery: updateGalleryItem(
                            current.seminarGallery || [],
                            index,
                            "status",
                            event.target.value
                          ),
                        }))
                      }
                    >
                      <option value="Upload image">Upload image</option>
                      <option value="Published">Published</option>
                      <option value="Scheduled">Scheduled</option>
                    </select>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => removeItem(index)}
                    >
                      Remove Card
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-[#cbd5e1] bg-white px-6 py-10 text-sm text-[#64748b]">
              No seminar cards yet. Add the first monthly event card to start building the gallery.
            </div>
          )}
        </div>

        <div className="action-row">
          <button type="button" className="btn btn-primary" onClick={onSubmit}>
            Save Seminar Gallery
          </button>
        </div>
      </div>
    </section>
  );
}

