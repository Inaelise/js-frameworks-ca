import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import styles from "../css/Home.module.css";

export default function GoToTop() {
  const [showBtn, setShowBtn] = useState(false);

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleVisibility = () => {
      setShowBtn(window.pageYOffset > 500);
    };

    window.addEventListener("scroll", handleVisibility);

    return () => {
      window.removeEventListener("scroll", handleVisibility);
    };
  }, []);

  return (
    <div className={showBtn ? "" : styles.goTopHidden} onClick={handleScrollUp}>
      <button className={styles.goTop} title="Go to top">
        <ChevronUp size={28} />
      </button>
    </div>
  );
}
