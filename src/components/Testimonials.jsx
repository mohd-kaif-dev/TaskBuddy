import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    image: "https://api.dicebear.com/6.x/avataaars/svg?seed=Sarah",
    message:
      "This productivity app has completely transformed how I manage my tasks. The gamification elements make work feel like play!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    image: "https://api.dicebear.com/6.x/avataaars/svg?seed=Michael",
    message:
      "I love how the app keeps me motivated with achievements and rewards. My productivity has increased significantly!",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Freelance Designer",
    image: "https://api.dicebear.com/6.x/avataaars/svg?seed=Emily",
    message:
      "The interface is beautiful and intuitive. Tracking tasks has never been more engaging and fun!",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Marketing Director",
    image: "https://api.dicebear.com/6.x/avataaars/svg?seed=David",
    message:
      "This is exactly what I needed to stay focused and productive. The gamification aspect is brilliantly executed.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? TESTIMONIALS.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }
    if (touchStart - touchEnd < -75) {
      handlePrevious();
    }
  };

  return (
    <div className="py-16 bg-gradient-to-b from-[#000000] to-[#14213d]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-[#fca311] to-[#ffd700] bg-clip-text text-transparent">
            What Our Champions Say
          </span>
        </h2>

        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="min-w-full px-4">
                <div className="bg-gradient-to-br from-[#14213d] to-[#1a2b4d] rounded-2xl p-8 shadow-xl border border-[#fca311]/20">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full mb-4 border-2 border-[#fca311]"
                    />
                    <p className="text-white/80 text-lg mb-6 italic">
                      "{testimonial.message}"
                    </p>
                    <h3 className="text-[#fca311] font-bold text-xl">
                      {testimonial.name}
                    </h3>
                    <p className="text-white/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#fca311]/10 hover:bg-[#fca311]/20 rounded-full p-3 text-[#fca311]"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#fca311]/10 hover:bg-[#fca311]/20 rounded-full p-3 text-[#fca311]"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>

          <div className="flex justify-center mt-8 gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-[#fca311]" : "bg-[#fca311]/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
