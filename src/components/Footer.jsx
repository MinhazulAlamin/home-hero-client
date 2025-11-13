import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">

        <nav>
          <h6 className="footer-title">Services</h6>
          <a href="/" className="link link-hover">
            Home Cleaning
          </a>
          <a href="/" className="link link-hover">
            Fitness Training
          </a>
          <a href="/" className="link link-hover">
            Event Photography
          </a>
          <a href="/" className="link link-hover">
            Homeopathy
          </a>
        </nav>


        <nav>
          <h6 className="footer-title">HomeHero</h6>
          <a href="/" className="link link-hover">
            About Us
          </a>
          <a href="/" className="link link-hover">
            Contact Support
          </a>
          <a href="/" className="link link-hover">
            Become a Provider
          </a>
          <a href="/" className="link link-hover">
            Careers
          </a>
        </nav>


        <nav>
          <h6 className="footer-title">Legal</h6>
          <a href="/" className="link link-hover">
            Terms of Service
          </a>
          <a href="/" className="link link-hover">
            Privacy Policy
          </a>
          <a href="/" className="link link-hover">
            Refund Policy
          </a>
        </nav>
      </footer>

      <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">

        <aside className="grid-flow-col items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current"
          >
            <path d="M22.672 15.226l-2.432.811..."></path>
          </svg>
          <div>
            <p className="text-2xl font-bold">
              HomeHero © {new Date().getFullYear()}
            </p>
            <p className="mt-1">Empowering homes with trusted services</p>
          </div>
        </aside>

        {/* Social Icons */}
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4 text-base-content">

            <a href="/" aria-label="X">
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


            <a href="/" aria-label="YouTube">
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


            <a href="/" aria-label="Facebook">
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
