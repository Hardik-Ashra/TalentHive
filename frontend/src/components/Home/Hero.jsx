import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import CategoryCarousel from "./CategoryCarousel";

const HeroSection = () => {
  return (
    <section className="bg-background min-h-[60vh] flex flex-col items-center justify-center px-6 pt-20  space-y-14 max-w-6xl mx-auto">
      {/* Welcome Text */}
      <div className="text-center max-w-2xl">
        <span className="text-primary font-medium tracking-wider text-sm sm:text-base">
          Welcome to TalentHive
        </span>

        <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold leading-tight text-foreground">
          Your Gateway to <span className="text-primary">Dream Jobs</span> and Top Talent
        </h1>

        <p className="mt-6 text-muted-foreground text-sm sm:text-lg leading-relaxed">
          Join thousands of professionals and recruiters. Create your profile, get discovered, and take your career or hiring to the next level.
        </p>
      </div>

      <form
        className="flex flex-col sm:flex-row w-full max-w-xl gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search jobs, companies, or skills"
          className="flex-grow rounded-lg border border-border bg-card px-4 py-2 text-base text-foreground placeholder:text-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
        <Button
          size="lg"
          className="flex items-center justify-center gap-2 px-6 py-2 bg-primary hover:bg-primary/90 shadow-md transition-transform active:scale-95"
        >
          <Search className="h-5 w-5" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </form>


      {/* Category Carousel */}
      <div className="w-full">
        <CategoryCarousel />
      </div>
    </section>
  );
};

export default HeroSection;
