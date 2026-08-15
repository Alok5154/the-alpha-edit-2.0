/**
 * TestimonialCard
 * Props: quote, authorName, authorTitle, avatarUrl
 */
export const TestimonialCard = ({ quote, authorName, authorTitle, avatarUrl }) => {
  return (
    <div className="testimonial-card flex flex-col items-start justify-between gap-4 p-6 bg-[#0a1024]/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl w-96 flex-shrink-0 transition-all duration-300 hover:border-[#D9FD31]/50 hover:shadow-[0_10px_30px_rgba(217,253,49,0.15)] hover:-translate-y-1 select-none">
      <p className="text-gray-200 text-base leading-relaxed font-normal">"{quote}"</p>
      <div className="flex items-center gap-4 mt-2 pt-2 border-t border-white/5 w-full">
        <img
          src={avatarUrl}
          alt={authorName}
          className="w-12 h-12 rounded-full border-2 border-[#D9FD31] bg-black/40 object-cover object-top flex-shrink-0"
        />
        <div>
          <h4 className="text-base font-bold text-white tracking-wide">{authorName}</h4>
          <p className="text-xs font-semibold text-[#D9FD31] uppercase tracking-wider">{authorTitle}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * HorizontalScroller
 * Props: children, speed (e.g., "40s"), direction ("left" | "right")
 */
export const HorizontalScroller = ({ children, speed = "40s", direction = "left" }) => {
  const animationClass =
    direction === "right" ? "animate-scroll-horizontal-reverse" : "animate-scroll-horizontal";

  return (
    <div className="w-full overflow-hidden group relative mask-fade py-2">
      <div
        className={`flex ${animationClass} group-hover:[animation-play-state:paused]`}
        style={{ ["--scroll-duration"]: speed }}
      >
        <div className="flex items-stretch justify-center gap-6 px-3">{children}</div>
        <div className="flex items-stretch justify-center gap-6 px-3" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * TestimonialsSection
 * Props: data { title, subtitle, rows[] }
 */
export default function TestimonialsSection({ data }) {
  return (
    <section className="testimonials-section relative flex flex-col items-center gap-10 py-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-4 text-center z-10 max-w-2xl px-4">
        <h2
          className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight"
          style={{ opacity: 0, animation: "fadeInUp 0.7s ease-out 0.2s forwards" }}
        >
          {data.title}
        </h2>
        <p
          className="text-base sm:text-lg text-gray-400"
          style={{ opacity: 0, animation: "fadeInUp 0.7s ease-out 0.4s forwards" }}
        >
          {data.subtitle}
        </p>
      </div>

      <div className="flex flex-col gap-6 z-10 w-full">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                quote={t.quote}
                authorName={t.authorName}
                authorTitle={t.authorTitle}
                avatarUrl={t.avatarUrl}
              />
            ))}
          </HorizontalScroller>
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 85% 67% at 50% 100%, rgba(217,253,49,0.08) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
    </section>
  );
}
