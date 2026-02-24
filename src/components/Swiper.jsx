import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Marcus Thompson",
    role: "Day Trader",
    country: "United States",
    image: "/user1.jpeg",
    text: "I used to trade alone. Since joining, I’ve connected with veterans whose insights changed my strategy. Portfolio is up 22% this quarter!",
  },
  {
    name: "Sarah Ladi",
    role: "Investor",
    country: "Nigeria",
    image: "/user2.jpeg",
    text: "Seeing real-time moves from the leaderboard gave me the edge I needed. It’s like having experts in my pocket.",
  },
  {
    name: "David Kalu",
    role: "Crypto Enthusiast",
    country: "United Kingdom",
    image: "/user3.jpeg",
    text: "This platform puts me in the same room as the whales. I saw the trend and hit my target before it hit the news.",
  },
  {
    name: "Amina Jibril",
    role: "Swing Trader",
    country: "United Arab Emirates",
    image: "/user4.jpeg",
    text: "In crypto, timing is everything. I get the 'alpha' here before it goes mainstream. I’m no longer chasing the market.",
  },
  {
    name: "Tunde Olatunji",
    role: "Beginner",
    country: "South Africa",
    image: "/user5.jpeg",
    text: "The community logic in the comments is better than any paid course. I went from lost to making calculated trades.",
  },
  {
    name: "Jason Wright",
    role: "Full-time Trader",
    country: "Australia",
    image: "/user6.jpeg",
    text: "Creating an account was my best pivot. I moved from losing on hype to winning on social sentiment and data.",
  },
  {
    name: "Elena Rodriguez",
    role: "Wealth Manager",
    country: "Spain",
    image: "/user7.jpeg",
    text: "Most apps are just buttons. This is a home. Verifying track records of peers gives me the ultimate advantage.",
  },
  {
    name: "Michael Smith",
    role: "Retail Investor",
    country: "Canada",
    image: "/user8.jpeg",
    text: "The social feed gives me context to stay calm during volatility. I'm finally an investor, not a gambler.",
  },
  {
    name: "Sophie Laurent",
    role: "Portfolio Manager",
    country: "France",
    image: "/user9.jpeg",
    text: "Transparency is unmatched. You see who is actually winning and can copy their moves instantly. A 24/7 masterclass.",
  },
  {
    name: "Chris Banks",
    role: "Early Adopter",
    country: "Germany",
    image: "/user10.jpeg",
    text: "Finance is social. I’ve built a network of 50+ traders here. Why trade alone when you can trade with a tribe?",
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-white dark:bg-[#0a0c10] text-gray-900 dark:text-white border-t border-gray-100 dark:border-white/5 py-20 px-5 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase mb-4">
            Global <span className="text-sky-500">Sentiment</span>
          </h2>
          <p className="text-gray-500 font-medium">
            Trusted by 10,000+ traders across the globe.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2rem] border border-gray-100 dark:border-white/10 h-full flex flex-col justify-between transition-all hover:border-sky-500/30 group">
                {/* Testimonial Text */}
                <blockquote className="text-lg leading-relaxed italic text-gray-700 dark:text-gray-300 mb-8 relative">
                  <span className="text-sky-500 text-4xl absolute -top-4 -left-2 opacity-50">
                    “
                  </span>
                  {t.text}
                </blockquote>

                {/* User Profile */}
                <div className="flex items-center gap-4 border-t border-gray-200 dark:border-white/10 pt-6">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-sky-500/20 group-hover:border-sky-500 transition-colors"
                  />
                  <div>
                    <h4 className="text-text-main font-black text-sm uppercase m-0 tracking-tight">
                      {t.name}
                    </h4>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wider">
                        {t.role}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium italic">
                        {t.country}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
