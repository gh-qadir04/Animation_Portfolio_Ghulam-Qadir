import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const outlinePosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    let isActive = true;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnter = () => {
      dot?.classList.add('hover');
      outline?.classList.add('hover');
    };

    const onMouseLeave = () => {
      dot?.classList.remove('hover');
      outline?.classList.remove('hover');
    };

    const animate = () => {
      if (!isActive) return;

      outlinePosRef.current.x += (posRef.current.x - outlinePosRef.current.x) * 0.15;
      outlinePosRef.current.y += (posRef.current.y - outlinePosRef.current.y) * 0.15;

      dot.style.left = posRef.current.x + 'px';
      dot.style.top = posRef.current.y + 'px';
      outline.style.left = outlinePosRef.current.x + 'px';
      outline.style.top = outlinePosRef.current.y + 'px';

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, .tilt-card, .project-card, .service-card, .skill-card, .highlight-card'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
      return interactiveElements;
    };

    let elements = addHoverListeners();

    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      elements = addHoverListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      isActive = false;
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  );
}
