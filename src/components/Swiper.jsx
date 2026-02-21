import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// IMPORTANT: Ensure these are imported
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Marcus Thompson",
    role: "Day Trader",
    text: "I used to trade alone. Since joining, I’ve connected with veterans whose insights changed my strategy. Portfolio is up 22% this quarter!",
  },
  {
    name: "Sarah Ladi",
    role: "Investor",
    text: "Seeing real-time moves from the leaderboard gave me the edge I needed. It’s like having experts in my pocket.",
  },
  {
    name: "David Kalu",
    role: "Crypto Enthusiast",
    text: "This platform puts me in the same room as the whales. I saw the trend and hit my target before it hit the news.",
  },
  {
    name: "Amina Jibril",
    role: "Swing Trader",
    text: "In crypto, timing is everything. I get the 'alpha' here before it goes mainstream. I’m no longer chasing the market.",
  },
  {
    name: "Tunde Olatunji",
    role: "Beginner",
    text: "The community logic in the comments is better than any paid course. I went from lost to making calculated trades.",
  },
  {
    name: "Jason Wright",
    role: "Full-time Trader",
    text: "Creating an account was my best pivot. I moved from losing on hype to winning on social sentiment and data.",
  },
  {
    name: "Elena Rodriguez",
    role: "Wealth Manager",
    text: "Most apps are just buttons. This is a home. Verifying track records of peers gives me the ultimate advantage.",
  },
  {
    name: "Michael Smith",
    role: "Retail Investor",
    text: "The social feed gives me context to stay calm during volatility. I'm finally an investor, not a gambler.",
  },
  {
    name: "Sophie Laurent",
    role: "Portfolio Manager",
    text: "Transparency is unmatched. You see who is actually winning and can copy their moves instantly. A 24/7 masterclass.",
  },
  {
    name: "Chris Banks",
    role: "Early Adopter",
    text: "Finance is social. I’ve built a network of 50+ traders here. Why trade alone when you can trade with a tribe?",
  },
];

const TestimonialSection = () => {
  return (
    <section
      style={{
        padding: "80px 20px",
        backgroundColor: "#0f172a", // Deep Navy/Dark background
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Trusted by 10,000+ Traders
          </h2>
          <p style={{ color: "#94a3b8" }}>
            Join the social revolution of finance.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          style={{ paddingBottom: "50px" }} // Space for dots
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div
                style={{
                  background: "#1e293b", // Lighter dark for cards
                  padding: "40px 30px",
                  borderRadius: "20px",
                  border: "1px solid #334155",
                  height: "280px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.3s ease",
                }}
              >
                <p
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.6",
                    color: "#e2e8f0",
                  }}
                >
                  "{t.text}"
                </p>
                <div>
                  <h4
                    style={{
                      margin: "0",
                      color: "#38bdf8",
                      fontSize: "1.2rem",
                    }}
                  >
                    {t.name}
                  </h4>
                  <span style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
                    {t.role}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --- BOTTOM CTA SECTION --- */}
        <div
          style={{
            marginTop: "60px",
            textAlign: "center",
            padding: "40px",
            borderRadius: "20px",
            background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)",
          }}
        >
          <h3 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>
            Ready to stop trading alone?
          </h3>
          <Link
            to="/register"
            style={{
              padding: "15px 40px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "50px",
              border: "none",
              backgroundColor: "#fff",
              color: "#2563eb",
              cursor: "pointer",
              boxShadow: "0 10px 15px rgba(0,0,0,0.2)",
            }}
          >
            Create Your Free Account
          </Link>
        </div>
        {/* ------------------------- */}
      </div>
    </section>
  );
};
export default TestimonialSection;
