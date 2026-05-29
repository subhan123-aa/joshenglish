export function ContentSection({ content, setContent, onSubmit }) {
  function updatePath(path, value) {
    setContent((current) => {
      const next = { ...current };
      let target = next;

      for (let index = 0; index < path.length - 1; index += 1) {
        const key = path[index];
        target[key] = { ...(target[key] || {}) };
        target = target[key];
      }

      target[path[path.length - 1]] = value;
      return next;
    });
  }

  return (
    <section className="admin-card form-card">
      <div className="card-header">
        <div>
          <h2>Website Content</h2>
          <p>Update the public banner, about copy, official email, and consultation text.</p>
        </div>
      </div>

      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Hero Eyebrow
          <input
            type="text"
            value={content.heroEyebrow}
            onChange={(event) => updatePath(["heroEyebrow"], event.target.value)}
          />
        </label>
        <label>
          Banner Title
          <input
            type="text"
            value={content.bannerTitle}
            onChange={(event) => updatePath(["bannerTitle"], event.target.value)}
          />
        </label>
        <label>
          Banner Tagline
          <input
            type="text"
            value={content.bannerTagline}
            onChange={(event) => updatePath(["bannerTagline"], event.target.value)}
          />
        </label>
        <label className="full-span">
          Banner Copy
          <textarea
            rows={4}
            value={content.bannerCopy}
            onChange={(event) => updatePath(["bannerCopy"], event.target.value)}
          />
        </label>
        <label>
          About Title
          <input
            type="text"
            value={content.aboutTitle}
            onChange={(event) => updatePath(["aboutTitle"], event.target.value)}
          />
        </label>
        <label>
          About Experience
          <input
            type="text"
            value={content.aboutExperience}
            onChange={(event) => updatePath(["aboutExperience"], event.target.value)}
          />
        </label>
        <label>
          Experience Badge
          <input
            type="text"
            value={content.experienceBadge}
            onChange={(event) => updatePath(["experienceBadge"], event.target.value)}
          />
        </label>
        <label>
          Official Email
          <input
            type="email"
            value={content.officialEmail}
            onChange={(event) => updatePath(["officialEmail"], event.target.value)}
          />
        </label>
        <label>
          Govt Registration Badge
          <input
            type="text"
            value={content.govtBadge}
            onChange={(event) => updatePath(["govtBadge"], event.target.value)}
          />
        </label>
        <label>
          Consultation Heading
          <input
            type="text"
            value={content.consultationTitle}
            onChange={(event) => updatePath(["consultationTitle"], event.target.value)}
          />
        </label>
        <label className="full-span">
          Consultation Subheading
          <textarea
            rows={3}
            value={content.consultationSubtitle}
            onChange={(event) => updatePath(["consultationSubtitle"], event.target.value)}
          />
        </label>
        <label>
          Consultation Button
          <input
            type="text"
            value={content.consultationButton}
            onChange={(event) => updatePath(["consultationButton"], event.target.value)}
          />
        </label>
        <label className="full-span">
          Consultation Note
          <input
            type="text"
            value={content.consultationNote}
            onChange={(event) => updatePath(["consultationNote"], event.target.value)}
          />
        </label>
        <label>
          Contact Phone
          <input
            type="text"
            value={content.contactPhone}
            onChange={(event) => updatePath(["contactPhone"], event.target.value)}
          />
        </label>
        <label>
          WhatsApp Number
          <input
            type="text"
            value={content.whatsappNumber}
            onChange={(event) => updatePath(["whatsappNumber"], event.target.value)}
          />
        </label>
        <label className="full-span">
          About Copy
          <textarea
            rows={5}
            value={content.aboutCopy}
            onChange={(event) => updatePath(["aboutCopy"], event.target.value)}
          />
        </label>
        <label className="full-span">
          Seminar Section Title
          <input
            type="text"
            value={content.seminarSectionTitle}
            onChange={(event) => updatePath(["seminarSectionTitle"], event.target.value)}
          />
        </label>
        <label className="full-span">
          Seminar Section Copy
          <textarea
            rows={4}
            value={content.seminarSectionCopy}
            onChange={(event) => updatePath(["seminarSectionCopy"], event.target.value)}
          />
        </label>
        <div className="full-span">
          <button type="submit" className="btn btn-primary">
            Save Public Content
          </button>
        </div>
      </form>
    </section>
  );
}
