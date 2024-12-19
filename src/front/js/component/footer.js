import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          {/* Brand Section */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Anime Finder</h5>
            <p className="small">
              Discover and explore anime and manga resources in one place.
            </p>
          </div>

          {/* Links Section */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-light text-decoration-none">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/terms" className="text-light text-decoration-none">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-4 mb-3">
            <h5 className="text-uppercase">Follow Us</h5>
            <div className="d-flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-light"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-light"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-light"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-light"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-3">
          <p className="mb-0 small">
            &copy; {new Date().getFullYear()} Anime Finder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
