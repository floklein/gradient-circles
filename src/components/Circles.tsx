import { CSSProperties, ReactNode, useRef } from "react";

import styles from "./circles.module.css";
import { Circle } from "./Circle";

interface ContainerProps {
  children: ReactNode;
  colors: CSSProperties["backgroundColor"][];
}

export function Circles({ children, colors }: ContainerProps) {
  const containerRef = useRef(null);

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.circles}>
        {colors.map((color) => (
          <Circle color={color} key={color} containerRef={containerRef} />
        ))}
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
}
