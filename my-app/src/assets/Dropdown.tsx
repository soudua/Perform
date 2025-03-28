import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface DropdownProps {
  title: string;
  links: { name: string; href: string }[][];
}

const Dropdown: React.FC<DropdownProps> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Dropdown Trigger */}
      <button className="hover:underline hover:underline-offset-8 decoration-2 px-4 py-2 transform -translate-y-2">
        {title}
      </button>



      {/* Mega Menu */}
      {isOpen && (
        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-[600px] bg-white shadow-lg rounded-lg p-5 grid grid-cols-2 gap-5"
        >
          {links.map((column, colIndex) => (
            <div key={colIndex} className="space-y-2">
              {column.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="block text-gray-800 hover:bg-gray-200 px-3 py-2 rounded"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Dropdown;





