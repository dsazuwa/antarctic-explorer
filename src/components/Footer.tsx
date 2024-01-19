import React from "react";

function Footer() {
  return (
    <footer className="mt-auto py-4 text-center text-xs text-navy bg-light_gray">
      <p>Developed by Danielle Osazuwa &copy; {new Date().getFullYear()}</p>
      <p>
        <a
          href="https://github.com/dsazuwa/antarctica-explorer-app"
          className="text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </a>
      </p>
    </footer>
  );
}

export default Footer;
