import { useState, useEffect } from "react";
import MobileCategories from "./MobileCategories";
import { DesktopCategories } from "./DesktopLayout";

const Categorias = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop) {
    return <DesktopCategories />;
  }

  return <MobileCategories />;
};

export default Categorias;
