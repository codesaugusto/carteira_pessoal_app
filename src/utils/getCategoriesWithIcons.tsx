import { IoFastFood, IoCarSport, IoGameController, IoHeart } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import type { Category } from "../data/categoriesData";
import { CATEGORIES_CONFIG } from "../data/categoriesData";

const getIconForCategory = (iconName: string) => {
  const iconClass = "text-green-500 w-6 h-6";
  
  switch (iconName) {
    case "food":
      return <IoFastFood className={iconClass} />;
    case "transport":
      return <IoCarSport className={iconClass} />;
    case "games":
      return <IoGameController className={iconClass} />;
    case "health":
      return <IoHeart className={iconClass} />;
    case "education":
      return <FaGraduationCap className={iconClass} />;
    case "shopping":
      return <LuShoppingBag className={iconClass} />;
    default:
      return <IoFastFood className={iconClass} />;
  }
};

export const getCategoriesWithIcons = (): Category[] => {
  return CATEGORIES_CONFIG.map((cat) => ({
    ...cat,
    icon: getIconForCategory(cat.iconName),
  }));
};
