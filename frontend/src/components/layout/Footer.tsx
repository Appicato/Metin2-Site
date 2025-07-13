import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-center py-4 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto">
        &copy; {new Date().getFullYear()} Lucerna Laetus — Made with ❤️
      </div>
    </footer>
  );
};

export default Footer;
