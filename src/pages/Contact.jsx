import React, { useState } from "react";
import axios from "axios";
import { FiSend, FiMessageSquare } from "react-icons/fi";

// Define the base URL for the contact API endpoint
const API_URL = "https://portfolio-backend-1-sx2x.onrender.com/api/v1/contact";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    type: "",
    text: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage({ type: "", text: "" }); // Clear previous messages

    try {
      // Send the POST request to your Express API
      const res = await axios.post(API_URL, formData);

      setResponseMessage({
        type: "success",
        text:
          res.data.message ||
          "Thank you! Your message has been sent successfully.",
      });
      // Clear the form after successful submission
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      // Error handling from the backend (e.g., validation errors)
      const errorMsg =
        error.response?.data?.error ||
        "An unexpected error occurred. Please try again later.";

      setResponseMessage({
        type: "error",
        text: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full p-3 rounded-md border border-sapphire-bg bg-navy-bg focus:outline-none focus:ring-2 focus:ring-mint-accent text-slate-light placeholder-slate-dark transition duration-300";
  const labelClasses = "block text-sm font-mono text-slate-light mb-1";
  const buttonClasses =
    "px-6 py-3 border border-mint-accent text-mint-accent font-semibold rounded-md transition duration-300 hover:bg-mint-accent hover:text-navy-bg disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="container mx-auto px-4 max-w-xl text-center">
        {/* --- Section Title and Subtitle --- */}
        <h3 className="text-3xl font-bold text-slate-light mb-4">
          <span className="text-mint-accent font-mono mr-2">03.</span>
          Get In Touch
        </h3>
        <p className="text-slate-dark text-lg mb-12">
          I am actively seeking new opportunities. Whether you have a project
          idea, a job offer, or just want to say hi, my inbox is always open.
        </p>

        {/* --- Form --- */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-sapphire-bg p-8 rounded-lg shadow-2xl"
        >
          {/* Display Response Message */}
          {responseMessage.text && (
            <div
              className={`p-3 rounded-md text-center text-sm font-semibold ${
                responseMessage.type === "success"
                  ? "bg-mint-accent/20 text-mint-accent"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {responseMessage.text}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label htmlFor="name" className={labelClasses}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Your Name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="your.email@example.com"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className={labelClasses}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className={inputClasses + " resize-none"}
              placeholder="Let's build something great together!"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={
              buttonClasses + " flex items-center justify-center mx-auto"
            }
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-mint-accent"></div>
            ) : (
              <>
                <FiSend className="mr-2" /> Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
