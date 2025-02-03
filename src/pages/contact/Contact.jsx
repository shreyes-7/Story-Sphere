import "./contact.css";

export default function Contact() {
  return (
    <div className="contact">
      <div className="contactContainer">
        <h1 className="contactTitle">Contact Us</h1>
        <form className="contactForm">
          <label>Your Name</label>
          <input
            className="contactInput"
            type="text"
            placeholder="Enter your full name"
          />
          <label>Your Email</label>
          <input
            className="contactInput"
            type="email"
            placeholder="Enter your email"
          />
          <label>Your Message</label>
          <textarea
            className="contactTextArea"
            placeholder="Write your message here"
          ></textarea>
          <button className="contactButton">Send Message</button>
        </form>
      </div>
    </div>
  );
}
