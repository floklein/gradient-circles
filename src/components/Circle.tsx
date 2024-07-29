import { CSSProperties, RefObject, useEffect, useRef } from "react";
import { useAnimationFrame } from "framer-motion";

import styles from "./circles.module.css";

const SPEED = 0.5;

interface CircleProps {
  color: CSSProperties["backgroundColor"];
  containerRef: RefObject<HTMLDivElement>;
}

export function Circle({ color, containerRef }: CircleProps) {
  const circleRef = useRef<HTMLDivElement>(null);

  const speedX = useRef(SPEED);
  const speedY = useRef(SPEED);

  useEffect(() => {
    function onResize() {
      if (!circleRef.current || !containerRef.current) return;
      const { width: containerWidth, height: containerHeight } =
        containerRef.current.getBoundingClientRect();
      const { width: circleWidth, height: circleHeight } =
        circleRef.current.getBoundingClientRect();
      const x = Math.random() * (containerWidth - circleWidth);
      const y = Math.random() * (containerHeight - circleHeight);
      circleRef.current.style.transform = `translate(${x}px, ${y}px)`;
      speedX.current = SPEED * (Math.random() > 0.5 ? 1 : -1);
      speedY.current = SPEED * (Math.random() > 0.5 ? 1 : -1);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [containerRef]);

  useAnimationFrame(() => {
    if (!containerRef.current || !circleRef.current) return;
    const {
      width: containerWidth,
      height: containerHeight,
      x: containerX,
      y: containerY,
    } = containerRef.current.getBoundingClientRect();
    const {
      width: circleWidth,
      height: circleHeight,
      x: circleX,
      y: circleY,
    } = circleRef.current.getBoundingClientRect();
    const x = circleX - containerX;
    const y = circleY - containerY;
    const newX = x + speedX.current;
    const newY = y + speedY.current;
    const outSideX = newX + circleWidth > containerWidth || newX < 0;
    const outSideY = newY + circleHeight > containerHeight || newY < 0;
    if (outSideX) {
      speedX.current *= -1;
    }
    if (outSideY) {
      speedY.current *= -1;
    }
    circleRef.current.style.transform = `translate(${outSideX ? x : newX}px, ${outSideY ? y : newY}px)`;
  });

  return (
    <div
      ref={circleRef}
      className={styles.circle}
      style={{ backgroundColor: color }}
    />
  );
}
