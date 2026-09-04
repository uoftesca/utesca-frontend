import { Globe, Mail } from "lucide-react";
import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = {
  facebook: "https://www.facebook.com/uoftesca/",
  instagram: "https://www.instagram.com/utesca/",
  linkedin: "https://www.linkedin.com/company/utescaconsulting/",
} as const;

export default function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-8 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* First column */}
          <div className="space-y-4">
            <h2 className="max-w-sm text-xl font-bold">
              University of Toronto Engineering Student Consulting Association
            </h2>
            <p className="flex items-center gap-2 text-sm text-sidebar-foreground/80">
              <Mail className="h-4 w-4" />
              uoft.esca@gmail.com
            </p>
            <p className="flex items-center gap-2 text-sm text-sidebar-foreground/80">
              <Globe className="h-4 w-4" />
              www.utesca.ca
            </p>
          </div>

          <div className="flex gap-10 md:gap-24">
            {/* Second Column */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:underline">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:underline">
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            {/* Third Column */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Connect</h3>
              <div className="flex space-x-4">
                <Link
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 ease-in-out hover:text-primary"
                >
                  <span className="sr-only">Instagram</span>
                  <FaInstagram className="h-6 w-6" />
                </Link>
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 ease-in-out hover:text-primary"
                >
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin className="h-6 w-6" />
                </Link>
                <a
                  href="mailto:uoft.esca@gmail.com"
                  className="transition-colors duration-200 ease-in-out hover:text-primary"
                >
                  <span className="sr-only">Email</span>
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-5xl border-t border-primary-foreground/10 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} University of Toronto Engineering
            Student Consulting Association. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
