import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Top Footer Section */}
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link to="/" className="link link-hover">
            Home Cleaning
          </Link>
          <Link to="/" className="link link-hover">
            Fitness Training
          </Link>
          <Link to="/" className="link link-hover">
            Event Photography
          </Link>
          <Link to="/" className="link link-hover">
            Homeopathy
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">HomeHero</h6>
          <Link to="/" className="link link-hover">
            About Us
          </Link>
          <Link to="/" className="link link-hover">
            Contact Support
          </Link>
          <Link to="/" className="link link-hover">
            Become a Provider
          </Link>
          <Link to="/" className="link link-hover">
            Careers
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="/" className="link link-hover">
            Terms of Service
          </Link>
          <Link to="/" className="link link-hover">
            Privacy Policy
          </Link>
          <Link to="/" className="link link-hover">
            Refund Policy
          </Link>
        </nav>
      </footer>

      {/* Bottom Footer Section */}
      <footer className="footer bg-base-200 text-base-content border-t border-base-300 px-10 py-4">
        <aside className="grid-flow-col items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current"
          >
            <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0z" />
          </svg>
          <div>
            <Link to="/" className="link link-hover text-2xl font-bold">
              HomeHero © {new Date().getFullYear()}
            </Link>
            <p className="mt-1">Empowering homes with trusted services</p>
          </div>
        </aside>

        {/* Social Icons */}
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4 text-base-content">
            {/* X (Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 1227"
                width="24"
                height="24"
                className="fill-current"
              >
                <path d="M636 700l564 527h-132L504 700 0 0h132l564 527L1200 0h132z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M10 15l5.19-3L10 9v6zm12-9.5c0-.83-.67-1.5-1.5-1.5H3.5C2.67 4 2 4.67 2 5.5v13c0 .83.67 1.5 1.5 1.5h17c.83 0 1.5-.67 1.5-1.5v-13z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z" />
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
