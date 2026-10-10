import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <div className="contact-page">
      <div className="contact-breadcrumb">Home　/　Contact</div>
      <div className="contact-layout">
        <aside className="contact-details">
          <section>
            <h2>
              <span className="contact-icon">⌕</span>Call To Us
            </h2>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </section>
          <section>
            <h2>
              <span className="contact-icon">✉</span>Write To Us
            </h2>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Emails: customer@exclusive.com</p>
            <p>Emails: support@exclusive.com</p>
          </section>
        </aside>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-inputs">
            <input required name="name" placeholder="Your Name *" />
            <input required name="email" type="email" placeholder="Your Email *" />
            <input required name="phone" type="tel" placeholder="Your Phone *" />
          </div>
          <textarea required name="message" placeholder="Your Message" />
          <div className="contact-form-footer">
            {sent && (
              <p className="contact-success" role="status">
                Your message has been sent.
              </p>
            )}
            <button className="red-btn" type="submit">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
