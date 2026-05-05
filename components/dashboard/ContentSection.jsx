export function ContentSection({ content, setContent, onSubmit, defaultContent }) {
  return (
    <section className="admin-card form-card">
      <div className="card-header">
        <div>
          <h2>Content Management</h2>
          <p>Edit website content without touching the code.</p>
        </div>
      </div>
      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Hero Title
          <input
            type="text"
            value={content.heroTitle}
            onChange={(event) =>
              setContent((current) => ({ ...current, heroTitle: event.target.value }))
            }
          />
        </label>
        <label>
          Hero Subtitle
          <input
            type="text"
            value={content.heroSubtitle}
            onChange={(event) =>
              setContent((current) => ({ ...current, heroSubtitle: event.target.value }))
            }
          />
        </label>
        <label className="full-span">
          Hero Description
          <textarea
            rows={4}
            value={content.heroDescription}
            onChange={(event) =>
              setContent((current) => ({
                ...current,
                heroDescription: event.target.value,
              }))
            }
          />
        </label>
        <label>
          About Title
          <input
            type="text"
            value={content.aboutTitle}
            onChange={(event) =>
              setContent((current) => ({ ...current, aboutTitle: event.target.value }))
            }
          />
        </label>
        <label className="full-span">
          About Text
          <textarea
            rows={5}
            value={content.aboutText}
            onChange={(event) =>
              setContent((current) => ({ ...current, aboutText: event.target.value }))
            }
          />
        </label>
        <label>
          Contact Phone
          <input
            type="text"
            value={content.contactPhone}
            onChange={(event) =>
              setContent((current) => ({ ...current, contactPhone: event.target.value }))
            }
          />
        </label>
        <label>
          WhatsApp Number
          <input
            type="text"
            value={content.whatsappNumber}
            onChange={(event) =>
              setContent((current) => ({
                ...current,
                whatsappNumber: event.target.value,
              }))
            }
          />
        </label>
        <label>
          Contact Email
          <input
            type="email"
            value={content.contactEmail}
            onChange={(event) =>
              setContent((current) => ({ ...current, contactEmail: event.target.value }))
            }
          />
        </label>
        <label>
          Islampur Branch
          <input
            type="text"
            value={content.branches?.[0]?.subtitle || ""}
            onChange={(event) =>
              setContent((current) => ({
                ...current,
                branches: [
                  { title: "Islampur", subtitle: event.target.value },
                  current.branches?.[1] || defaultContent.branches[1],
                  current.branches?.[2] || defaultContent.branches[2],
                ],
              }))
            }
          />
        </label>
        <label>
          Chakulia Branch
          <input
            type="text"
            value={content.branches?.[1]?.subtitle || ""}
            onChange={(event) =>
              setContent((current) => ({
                ...current,
                branches: [
                  current.branches?.[0] || defaultContent.branches[0],
                  { title: "Chakulia", subtitle: event.target.value },
                  current.branches?.[2] || defaultContent.branches[2],
                ],
              }))
            }
          />
        </label>
        <label>
          Barodhia Branch
          <input
            type="text"
            value={content.branches?.[2]?.subtitle || ""}
            onChange={(event) =>
              setContent((current) => ({
                ...current,
                branches: [
                  current.branches?.[0] || defaultContent.branches[0],
                  current.branches?.[1] || defaultContent.branches[1],
                  { title: "Barodhia", subtitle: event.target.value },
                ],
              }))
            }
          />
        </label>
        <label>
          YouTube Link
          <input
            type="url"
            value={content.socialLinks?.youtube || ""}
            onChange={(event) =>
              setContent((current) => ({
                ...current,
                socialLinks: {
                  ...(current.socialLinks || defaultContent.socialLinks),
                  youtube: event.target.value,
                },
              }))
            }
          />
        </label>
        <label>
          Instagram Link
          <input
            type="url"
            value={content.socialLinks?.instagram || ""}
            onChange={(event) =>
              setContent((current) => ({
                ...current,
                socialLinks: {
                  ...(current.socialLinks || defaultContent.socialLinks),
                  instagram: event.target.value,
                },
              }))
            }
          />
        </label>
        <label>
          Facebook Link
          <input
            type="url"
            value={content.socialLinks?.facebook || ""}
            onChange={(event) =>
              setContent((current) => ({
                ...current,
                socialLinks: {
                  ...(current.socialLinks || defaultContent.socialLinks),
                  facebook: event.target.value,
                },
              }))
            }
          />
        </label>
        <div className="full-span">
          <button type="submit" className="btn btn-primary">
            Save Content
          </button>
        </div>
      </form>
    </section>
  );
}
