"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Alpha Edit transformed our channel retention. We went from 10K to 150K subscribers in 4 months!",
    by: "Raj Patel, Tech Reviews",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 1,
    testimonial: "Retention rate jumped from 35% to 62%. They don't just edit—they optimize for watch time.",
    by: "Priya Singh, Lifestyle Vlogging",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 2,
    testimonial: "First video they edited hit 150K views overnight! World-class motion graphics and color grading.",
    by: "Vikram Sharma, Tech Creator",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 3,
    testimonial: "Our average watch time jumped from 2:30 to 8:15 minutes. Highly recommend Alpha Edit!",
    by: "Ananya Verma, Educational Content",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 4,
    testimonial: "Generated over 100K TikTok followers from repurposed podcast shorts in just 2 months.",
    by: "Arjun Kapoor, Short-Form Lead",
    imgSrc: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 5,
    testimonial: "Every thumbnail they design gets over 50% CTR. They are true growth specialists!",
    by: "Neha Gupta, Fashion & Beauty",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 6,
    testimonial: "Gaming pacing needs fast precision. Their slow-mo timing and VFX are 100% on point.",
    by: "Aditya Singh, Gaming Creator",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 7,
    testimonial: "Alpha Edit turned our startup video strategy into a revenue engine. Incredible ROI!",
    by: "Shreya Pant, Business & Startup",
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 8,
    testimonial: "Working with Alpha Edit saves me 40+ hours every month while scaling view counts.",
    by: "Daniel, Tech Lead",
    imgSrc: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
  },
  {
    tempId: 9,
    testimonial: "Switched to their monthly retainer plan and never looked back!",
    by: "Andy, Creative Producer",
    imgSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out select-none rounded-xl backdrop-blur-md",
        isCenter 
          ? "z-10 bg-[#D9FD31] text-[#050505] border-[#D9FD31] shadow-[0_15px_40px_rgba(217,253,49,0.3)]" 
          : "z-0 bg-[#0a1024]/90 text-white border-white/10 hover:border-[#D9FD31]/50 opacity-90 shadow-xl"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.4) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-white/20"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-14 rounded-full border-2 border-[#D9FD31] bg-black/40 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px rgba(0, 0, 0, 0.5)"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-lg font-semibold leading-snug",
        isCenter ? "text-[#050505]" : "text-white"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic font-medium",
        isCenter ? "text-[#050505]/80" : "text-gray-400"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-transparent py-8"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4 z-20">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-all duration-300 rounded-full cursor-pointer",
            "bg-[#0d142b] border-2 border-white/20 text-white hover:bg-[#D9FD31] hover:text-[#050505] hover:border-[#D9FD31] hover:scale-110",
            "focus-visible:outline-none shadow-lg"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-all duration-300 rounded-full cursor-pointer",
            "bg-[#0d142b] border-2 border-white/20 text-white hover:bg-[#D9FD31] hover:text-[#050505] hover:border-[#D9FD31] hover:scale-110",
            "focus-visible:outline-none shadow-lg"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
