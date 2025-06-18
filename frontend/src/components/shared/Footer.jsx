import React from "react";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border text-muted-foreground py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
        {/* Branding */}
        <div className="flex flex-col space-y-2 max-w-xs">
          <h2 className="text-2xl font-extrabold text-primary">TalentHive</h2>
          <p className="text-sm leading-relaxed">
            Your gateway to dream jobs and top talent. Connect and grow your career.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-12 text-sm font-medium">
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Jobs</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>

          <ul className="space-y-3">
            <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-6 text-primary">
          {[Facebook, Twitter, Linkedin, Github].map((Icon, idx) => (
            <a
              href="#"
              key={idx}
              aria-label="Social Link"
              className="hover:text-primary/80 transition-colors"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-muted-foreground select-none">
        © {new Date().getFullYear()} TalentHive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
