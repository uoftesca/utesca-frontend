import { Globe, Mail } from "lucide-react";
import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdOutlineForwardToInbox } from "react-icons/md";

const socialLinks = {
  facebook: "https://www.facebook.com/uoftesca/",
  instagram: "https://www.instagram.com/utesca/",
  linkedin: "https://www.linkedin.com/company/utescaconsulting/",
  mailingList:
    "https://docs.google.com/forms/d/e/1FAIpQLScRBQrz6BUoxtbjPG-wmoDpDJnLd4Ac3iALir-K5vEJ3wHE2g/viewform?pli=1",
} as const;

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto px-6 py-6 md:px-10">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* First column */}
          <div className="space-y-2">
            <h2 className="max-w-sm text-2xl font-black md:text-3xl">
              University of Toronto Engineering Students Consulting Association
            </h2>
            <p className="flex items-center gap-2 text-base text-primary-foreground/80">
              <Mail className="h-4 w-4" />
              uoft.esca@gmail.com
            </p>
            <p className="flex items-center gap-2 text-base text-primary-foreground/80">
              <Globe className="h-4 w-4" />
              www.utesca.ca
            </p>
          </div>

          <div className="flex gap-10 md:gap-24">
            {/* Second Column */}
            <div>
              <h3 className="mb-2 text-xl font-black md:text-2xl">Explore</h3>
              <ul className="space-y-2 text-base">
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
              <h3 className="mb-2 text-xl font-black md:text-2xl">Connect</h3>
              <div className="flex flex-col gap-3">
                <Link
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-opacity duration-200 ease-in-out hover:opacity-70"
                >
                  <FaInstagram className="h-7 w-7" />
                  <span>Instagram</span>
                </Link>
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-opacity duration-200 ease-in-out hover:opacity-70"
                >
                  <FaLinkedin className="h-7 w-7" />
                  <span>LinkedIn</span>
                </Link>
                <a
                  href="mailto:uoft.esca@gmail.com"
                  className="flex items-center gap-3 transition-opacity duration-200 ease-in-out hover:opacity-70"
                >
                  <Mail className="h-7 w-7" />
                  <span>Email</span>
                </a>
                <Link
                  href={socialLinks.mailingList}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-opacity duration-200 ease-in-out hover:opacity-70"
                >
                  <MdOutlineForwardToInbox className="h-7 w-7" />
                  <span>Join Mailing List</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-4 max-w-5xl border-t border-primary-foreground/10 pt-4 text-center text-base">
          <p>
            &copy; {new Date().getFullYear()} University of Toronto Engineering
            Student Consulting Association. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
