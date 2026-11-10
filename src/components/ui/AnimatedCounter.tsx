import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number; // in seconds
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  duration = 1.8,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  const [count, setCount] = useState<number>(from);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(from + (to - from) * easeProgress));

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            setCount(to);
          }
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.2 });

    observer.observe(element);

    return () => observer.disconnect();
  }, [from, to, duration]);

  return (
    <span ref={elementRef} className={`tabular-nums ${className}`}>
      {prefix}{count}{suffix}
    </span>
  );
};
