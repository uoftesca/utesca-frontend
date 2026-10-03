import { Globe, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = {
  facebook: "https://www.facebook.com/uoftesca/",
  instagram: "https://www.instagram.com/utesca/",
  linkedin: "https://www.linkedin.com/company/utescaconsulting/",
  linktree:
    "https://linktr.ee/utesca?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacWyg05AcbVPBbzzkkfNY4HTou2a79VVtOFkm50xIEN_hmaNbo8s7iQVW9Vxg_aem_Mt5DZh6z1lRn9ZLEgQ0mpQ",
} as const;

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-8 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* First column */}
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <h2 className="max-w-sm text-2xl font-black md:text-3xl">
                University of Toronto Engineering Student Consulting Association
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
            <Link
              href={socialLinks.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Image
                src="/linktree-qrcode2.png"
                alt="Scan to open the UTESCA Linktree"
                width={144}
                height={144}
                className="rounded-md bg-white p-1.5"
              />
            </Link>
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
              <div className="flex flex-col gap-4">
                <Link
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-opacity duration-200 ease-in-out hover:opacity-70"
                >
                  <FaInstagram className="h-9 w-9" />
                  <span>Instagram</span>
                </Link>
                <Link
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-opacity duration-200 ease-in-out hover:opacity-70"
                >
                  <FaLinkedin className="h-9 w-9" />
                  <span>LinkedIn</span>
                </Link>
                <a
                  href="mailto:uoft.esca@gmail.com"
                  className="flex items-center gap-3 transition-opacity duration-200 ease-in-out hover:opacity-70"
                >
                  <Mail className="h-9 w-9" />
                  <span>Email</span>
                </a>
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
