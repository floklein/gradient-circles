import { Circles } from "./components/Circles";

import styles from "./App.module.css";
import { cn } from "./lib/cn";

export function App() {
  return (
    <>
      <Circles colors={["red", "green", "blue"]}>
        <div className={styles.section}>
          <div className={styles.sectionContent}></div>
        </div>
      </Circles>
      <div className={cn([styles.section, styles.sectionSecondary])}>
        <div className={styles.sectionContent}></div>
      </div>
      <div className={styles.section}>
        <div className={styles.sectionContent}></div>
      </div>
    </>
  );
}
