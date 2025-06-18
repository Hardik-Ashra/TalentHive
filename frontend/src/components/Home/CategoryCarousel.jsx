import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Button } from "../ui/button";

import {
  Code2,
  Server,
  Paintbrush,
  Brain,
  Smartphone,
  Settings,
  LayoutDashboard,
  Gamepad2,
  ShieldCheck,
  Cloud,
  Blocks,
  User,
  Activity,
} from "lucide-react";

const categoryIcons = {
  "Frontend Developer": <Code2 className="mr-2 h-4 w-4" />,
  "Backend Developer": <Server className="mr-2 h-4 w-4" />,
  "Data Scientist": <Activity className="mr-2 h-4 w-4" />,
  "Graphic Designer": <Paintbrush className="mr-2 h-4 w-4" />,
  "Fullstack Developer": <LayoutDashboard className="mr-2 h-4 w-4" />,
  "Mobile Developer": <Smartphone className="mr-2 h-4 w-4" />,
  "DevOps Engineer": <Settings className="mr-2 h-4 w-4" />,
  "UI/UX Designer": <Paintbrush className="mr-2 h-4 w-4" />,
  "Game Developer": <Gamepad2 className="mr-2 h-4 w-4" />,
  "AI/ML Engineer": <Brain className="mr-2 h-4 w-4" />,
  "Product Manager": <User className="mr-2 h-4 w-4" />,
  "Cybersecurity Analyst": <ShieldCheck className="mr-2 h-4 w-4" />,
  "Blockchain Developer": <Blocks className="mr-2 h-4 w-4" />,
  "Cloud Engineer": <Cloud className="mr-2 h-4 w-4" />,
};

const categories = Object.keys(categoryIcons);

const CategoryCarousel = () => {
  const plugin = useRef(
    Autoplay({ delay: 1000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <Carousel plugins={[plugin.current]} className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {categories.map((cat, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/4 lg:basis-1/4 xl:basis-1/4"
          >
            <Button
              variant="outline"
              className="w-full rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200 text-sm py-2"
            >
              {categoryIcons[cat]} {cat}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-[-10px]" />
      <CarouselNext className="right-[-10px]" />
    </Carousel>
  );
};

export default CategoryCarousel;
