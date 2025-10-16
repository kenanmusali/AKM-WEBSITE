import { useEffect, useRef, useState } from 'react';

const TRACK_PADDING = 10; 

export const ScrollbarGUI = ({ children }) => {
  const scrollRef = useRef(null);
  const thumbYRef = useRef(null);
  const thumbXRef = useRef(null);

  const [showY, setShowY] = useState(false);
  const [showX, setShowX] = useState(false);
  const [thumbYHeight, setThumbYHeight] = useState(20);
  const [thumbXWidth, setThumbXWidth] = useState(20);

  const isDraggingY = useRef(false);
  const isDraggingX = useRef(false);
  const startY = useRef(0);
  const startX = useRef(0);
  const startScrollTop = useRef(0);
  const startScrollLeft = useRef(0);

  const updateThumbs = () => {
    const el = scrollRef.current;
    if (!el) return;

    const showVertical = el.scrollHeight > el.clientHeight;
    const showHorizontal = el.scrollWidth > el.clientWidth;

    setShowY(showVertical);
    setShowX(showHorizontal);

    if (showVertical) {
      const ratio = el.clientHeight / el.scrollHeight;
      const availableHeight = el.clientHeight - TRACK_PADDING;
      setThumbYHeight(Math.max(30, ratio * availableHeight));
    }

    if (showHorizontal) {
      const ratio = el.clientWidth / el.scrollWidth;
      const availableWidth = el.clientWidth - TRACK_PADDING;
      setThumbXWidth(Math.max(30, ratio * availableWidth));
    }

    updateThumbPosition();
  };

  const updateThumbPosition = () => {
    const el = scrollRef.current;
    const thumbY = thumbYRef.current;
    const thumbX = thumbXRef.current;

    if (!el) return;

    if (showY && thumbY) {
      const thumbHeight = thumbY.offsetHeight;
      const maxTrack = el.clientHeight - TRACK_PADDING - thumbHeight;
      const scrollRatio = el.scrollTop / (el.scrollHeight - el.clientHeight);
      const top = scrollRatio * maxTrack;
      thumbY.style.transform = `translateY(${top}px)`;
    }

    if (showX && thumbX) {
      const thumbWidth = thumbX.offsetWidth;
      const maxTrack = el.clientWidth - TRACK_PADDING - thumbWidth;
      const scrollRatio = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      const left = scrollRatio * maxTrack;
      thumbX.style.transform = `translateX(${left}px)`;
    }
  };

  const onThumbYMouseDown = (e) => {
    e.preventDefault();
    isDraggingY.current = true;
    startY.current = e.clientY;
    startScrollTop.current = scrollRef.current.scrollTop;

    thumbYRef.current.classList.add('dragging');

    const onMouseMove = (e) => {
      if (!isDraggingY.current || isDraggingX.current) return;
      const el = scrollRef.current;
      const deltaY = e.clientY - startY.current;
      const maxThumbTop = el.clientHeight - TRACK_PADDING - thumbYRef.current.offsetHeight;
      const scrollableHeight = el.scrollHeight - el.clientHeight;
      const scrollRatio = scrollableHeight / maxThumbTop;
      el.scrollTop = startScrollTop.current + deltaY * scrollRatio;
      updateThumbPosition();
    };

    const onMouseUp = () => {
      isDraggingY.current = false;
      thumbYRef.current.classList.remove('dragging');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onThumbXMouseDown = (e) => {
    e.preventDefault();
    isDraggingX.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = scrollRef.current.scrollLeft;

    thumbXRef.current.classList.add('dragging');

    const onMouseMove = (e) => {
      if (!isDraggingX.current || isDraggingY.current) return;
      const el = scrollRef.current;
      const deltaX = e.clientX - startX.current;
      const maxThumbLeft = el.clientWidth - TRACK_PADDING - thumbXRef.current.offsetWidth;
      const scrollableWidth = el.scrollWidth - el.clientWidth;
      const scrollRatio = scrollableWidth / maxThumbLeft;
      el.scrollLeft = startScrollLeft.current + deltaX * scrollRatio;
      updateThumbPosition();
    };

    const onMouseUp = () => {
      isDraggingX.current = false;
      thumbXRef.current.classList.remove('dragging');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observer = new ResizeObserver(updateThumbs);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);

    updateThumbs();

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateThumbPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    el.addEventListener('scroll', onScroll);

    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', onScroll);
    };
  }, [showY, showX]);

  return (
    <div className="scroll-container">
      <div className="scroll-content" ref={scrollRef}>
        {children}
      </div>

      {showY && (
        <div
          className="scrollbar-y"
          onClick={(e) => {
            if (isDraggingX.current || isDraggingY.current) return;
            e.stopPropagation();
            const el = scrollRef.current;
            const track = e.currentTarget;
            const trackRect = track.getBoundingClientRect();
            const clickY = e.clientY - trackRect.top;
            const thumbHeight = thumbYRef.current.offsetHeight;
            const maxTrack = track.clientHeight - TRACK_PADDING - thumbHeight;
            const scrollRatio = (clickY - TRACK_PADDING / 2 - thumbHeight / 2) / maxTrack;
            const targetScrollTop = scrollRatio * (el.scrollHeight - el.clientHeight);
            el.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
          }}
        >
          <div
            className="thumb-y"
            ref={thumbYRef}
            style={{ height: `${thumbYHeight}px` }}
            onMouseDown={onThumbYMouseDown}
          />
        </div>
      )}

      {showX && (
        <div
          className="scrollbar-x"
          onClick={(e) => {
            if (isDraggingX.current || isDraggingY.current) return;
            e.stopPropagation();
            const el = scrollRef.current;
            const track = e.currentTarget;
            const trackRect = track.getBoundingClientRect();
            const clickX = e.clientX - trackRect.left;
            const thumbWidth = thumbXRef.current.offsetWidth;
            const maxTrack = track.clientWidth - TRACK_PADDING - thumbWidth;
            const scrollRatio = (clickX - TRACK_PADDING / 2 - thumbWidth / 2) / maxTrack;
            const targetScrollLeft = scrollRatio * (el.scrollWidth - el.clientWidth);
            el.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
          }}
        >
          <div
            className="thumb-x"
            ref={thumbXRef}
            style={{ width: `${thumbXWidth}px` }}
            onMouseDown={onThumbXMouseDown}
          />
        </div>
      )}
    </div>
  );
};
export default ScrollbarGUI