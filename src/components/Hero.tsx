
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle: string;
  showButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  overlay?: boolean;
  height?: "small" | "medium" | "large";
  centered?: boolean;
}

export default function Hero({
  title,
  subtitle,
  showButton = true,
  buttonText = "Explore Courses",
  buttonLink = "/courses",
  backgroundImage,
  overlay = true,
  height = "medium",
  centered = true,
}: HeroProps) {
  
  const heightClasses = {
    small: "min-h-[300px]",
    medium: "min-h-[400px]",
    large: "min-h-[500px]",
  };
  
  const bgStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <div
      className={`w-full relative flex items-center ${
        backgroundImage ? "bg-cover bg-center" : "gradient-bg"
      } ${heightClasses[height]}`}
      style={bgStyle}
    >
      {/* Overlay for better text visibility on images */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-black/40"></div>
      )}
      
      <div className={`container relative z-10 px-4 ${centered ? 'text-center' : ''}`}>
        <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${backgroundImage ? 'text-white' : ''}`}>
          {title}
        </h1>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${backgroundImage ? 'text-white/90' : ''}`}>
          {subtitle}
        </p>
        {showButton && (
          <Button
            asChild
            className="px-6 py-2 text-lg bg-lms-accent hover:bg-lms-primary"
          >
            <a href={buttonLink}>{buttonText}</a>
          </Button>
        )}
      </div>
    </div>
  );
}
