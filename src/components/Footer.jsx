import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <nav>
          <h6 className="footer-title">Services</h6>
          <Link to="/" className="link link-hover">Home Cleaning</Link>
          <Link to="/" className="link link-hover">Fitness Training</Link>
          <Link to="/" className="link link-hover">Event Photography</Link>
          <Link to="/" className="link link-hover">Homeopathy</Link>
        </nav>
        <nav>
          <h6 className="footer-title">HomeHero</h6>
          <Link to="/" className="link link-hover">About Us</Link>
          <Link to="/" className="link link-hover">Contact Support</Link>
          <Link to="/" className="link link-hover">Become a Provider</Link>
          <Link to="/" className="link link-hover">Careers</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link to="/" className="link link-hover">Terms of Service</Link>
          <Link to="/" className="link link-hover">Privacy Policy</Link>
          <Link to="/" className="link link-hover">Refund Policy</Link>
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
            <Link to="/" className="link link-hover text-2xl font-bold">
            HomeHero © {new Date().getFullYear()}
          </Link>
          <p className="mt-1">
            Empowering homes with trusted services</p>
          </div>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              {/* Twitter Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M24 4.557c-..."></path>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              {/* YouTube Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M19.615 3.184c-..."></path>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              {/* Facebook Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M9 8h-3v4h3v12h5v-12h3.642..."></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;