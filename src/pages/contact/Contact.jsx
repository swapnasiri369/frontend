import { useState } from "react";

import "./contact.css";
import Axios from "../../axios/Axios";

const Contact = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [contactSuccess, setContactSuccess] = useState("");
  const [contactError, setContactError] = useState("");
  const [contactLoading, setContactLoading] = useState(false);

  // INPUT CHANGE METHOD
  const handleContactChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT METHOD
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSuccess("");
    setContactError("");
    setContactLoading(true);

    try {
      await Axios.post("/contact", contactData);
      setContactSuccess("Message sent successfully ✅");
      setContactData({ name: "", email: "", message: "" });
    } catch (err) {
      setContactError("Failed to send message");
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <form className="contact-form" onSubmit={handleContactSubmit}>
        <h2 className="contact-title">Contact Us</h2>

        {contactSuccess && (
          <p className="contact-success">{contactSuccess}</p>
        )}
        {contactError && <p className="contact-error">{contactError}</p>}

        <input
          className="contact-input"
          type="text"
          name="name"
          placeholder="Your Name"
          value={contactData.name}
          onChange={handleContactChange}
          required
        />

        <input
          className="contact-input"
          type="email"
          name="email"
          placeholder="Your Email"
          value={contactData.email}
          onChange={handleContactChange}
          required
        />

        <textarea
          className="contact-textarea"
          name="message"
          placeholder="Your Message"
          value={contactData.message}
          onChange={handleContactChange}
          required
        ></textarea>

        <button
          className="contact-button"
          type="submit"
          disabled={contactLoading}
        >
          {contactLoading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;