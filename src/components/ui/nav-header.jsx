import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function NavHeader({
  links = [
    { text: "Why us", href: "#whyus" },
    { text: "Services", href: "#pricing" },
    { text: "Pricing", href: "#pricing" },
    { text: "Results", href: "#testimonials" },
    { text: "Contact", href: "#contact" },
  ],
}) {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex items-center w-fit rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-lg p-1 shadow-lg"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {links.map((link) => (
        <Tab key={link.text} href={link.href} setPosition={setPosition}>
          {link.text}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({ children, href, setPosition }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors duration-200 md:text-xs"
    >
      <a href={href} className="block w-full h-full">
        {children}
      </a>
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-[var(--accent-neon)]/15 border border-[var(--accent-neon)]/40 shadow-[0_0_15px_rgba(217,253,49,0.15)]"
      transition={{ type: "spring", stiffness: 450, damping: 32 }}
    />
  );
};

export default NavHeader;
