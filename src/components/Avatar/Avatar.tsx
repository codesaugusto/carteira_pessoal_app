import React from "react";

interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-16 h-16 text-lg",
  xxl: "w-20 h-20 text-xl",
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size = "md",
  className = "",
}) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-orange-300 to-orange-200 flex items-center justify-center overflow-hidden flex-shrink-0 ${className}`}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-semibold text-gray-950">{fallback}</span>
      )}
    </div>
  );
};

export default Avatar;
