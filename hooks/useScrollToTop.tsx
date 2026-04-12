import { useEffect } from "react";

export const useScrollToTop = () => {
  useEffect(() => {
    // Matikan browser scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Scroll to top sekali saat mount
    window.scrollTo(0, 0);

    // Scroll lagi setelah browser selesai restore (next tick)
    const raf = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => cancelAnimationFrame(raf);
  }, []);
};
