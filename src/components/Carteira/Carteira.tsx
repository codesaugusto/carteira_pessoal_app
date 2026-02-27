import { useState, useEffect } from "react";
import MobileCarteira from "./MobileCarteira";
import { DesktopCarteira } from "./DesktopLayout";

const Carteira = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop) {
    return <DesktopCarteira />;
  }

  return <MobileCarteira />;
};

export default Carteira;
