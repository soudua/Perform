import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { FaSearch, FaHeart, FaShoppingBag } from "react-icons/fa";
import { SiNike } from "react-icons/si";
import Dropdown from "./Dropdown";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  

  return (
    <>
    
    {/*Primeiro navbar */}
    <div className="flex justify-between items-center  bg-gray-200 px-5 py-1.5 text-xs font-bold">
      <div>
        <img src="/jordan-logo.png" alt="Jordan Logo" width={40} className="transform translate-x-8"/>
      </div>
      <div className="flex gap-5">
      <Link to="/men" className="hover:underline hover:underline-offset-4">Find a store</Link><h1>|</h1>
        <Link to="/women" className="hover:underline hover:underline-offset-4">Help</Link><h1>|</h1>
        <Link to="/kids" className="hover:underline hover:underline-offset-4">Join Us</Link><h1>|</h1>
        <Link to="/kids" className="hover:underline hover:underline-offset-4">Sign in</Link>
      </div>
    </div>

    {/*Segundo navbar */}
    <div className="flex justify-between bg-white px-5 py-3 font-semibold">
      <div><SiNike size={60} className="transform translate-x-8"/></div>

      <div className="flex gap-5 font-semibold text-lg transform translate-y-3 translate-x-6">
      <Dropdown
          title="New and Featured"
          links={[
            [
                
              { name: "Air Force 1", href: "/New and Featured/tshirts" },
              { name: "Air Jordan 1", href: "/New and Featured/shoes" },
              { name: "Air Max", href: "/New and Featured/accessories" },
              { name: "Dunk", href: "/New and Featured/hoodies" },
            ],
            [
              { name: "Blazer", href: "/New and Featured/jackets" },
              { name: "Pegasus", href: "/New and Featured/shorts" },
              { name: "Mercurial", href: "/New and Featured/pants" },
              { name: "Running", href: "/New and Featured/socks" },
            ],
            [
              { name: "Basketball", href: "/New and Featured/All Clothing" },
              { name: "Training and Gym", href: "/New and Featured/Hoodies and Sweatshirts" },
              { name: "Golf", href: "/New and Featured/Jackets" },
              { name: "Tennis", href: "/New and Featured/Trousers and Tights" },
            ],
            [
              { name: "Yoga", href: "/New and Featured/Tracksuits" },
              { name: "Dance", href: "/New and Featured/Top and T-shirts" },
              { name: "Skateboarding", href: "/New and Featured/Shorts" },
              { name: "Air Max Home", href: "/New and Featured/Kits and Jerseys" },
            ],
          ]}
        />
      <Dropdown
          title="Men"
          links={[
            [
                
              { name: "T-Shirts", href: "/men/tshirts" },
              { name: "Shoes", href: "/men/shoes" },
              { name: "Accessories", href: "/men/accessories" },
              { name: "Hoodies", href: "/men/hoodies" },
            ],
            [
              { name: "Jordan", href: "/men/jackets" },
              { name: "Running", href: "/men/shorts" },
              { name: "Football", href: "/men/pants" },
              { name: "Basketball", href: "/men/socks" },
            ],
            [
              { name: "All Clothing", href: "/men/All Clothing" },
              { name: "Hoodies and Sweatshirts", href: "/men/Hoodies and Sweatshirts" },
              { name: "Jackets", href: "/men/Jackets" },
              { name: "Trousers and Tights", href: "/men/Trousers and Tights" },
            ],
            [
              { name: "Tracksuits", href: "/men/Tracksuits" },
              { name: "Tops and T-shirts", href: "/men/Top and T-shirts" },
              { name: "Shorts", href: "/men/Shorts" },
              { name: "Kits and Jerseys", href: "/men/Kits and Jerseys" },
            ],
          ]}
        />
        <Dropdown
          title="Woman"
          links={[
            [
              { name: "All Clothing", href: "/woman/All Clothing" },
              { name: "Hoodies", href: "/woman/Hoodies" },
              { name: "Jackets", href: "/woman/Jackets" },
              { name: "Trousers", href: "/woman/Trousers" },
            ],
            [
              { name: "Leggings", href: "/woman/Leggings" },
              { name: "Matching Sets", href: "/woman/Matching Sets" },
              { name: "Tops and T-Shirts", href: "/woman/Tops and T-Shirts" },
              { name: "Sports bras", href: "/woman/Sports bras" },
            ],
            [
              { name: "Shorts", href: "/woman/Shorts" },
              { name: "Training and Gym", href: "/woman/Training and Gym" },
              { name: "Running", href: "/woman/Running" },
              { name: "Football", href: "/woman/Football" },
            ],
            [
              { name: "Basketball", href: "/woman/Basketball" },
              { name: "Tennis", href: "/woman/Tennis" },
              { name: "Yoga", href: "/woman/Yoga" },
              { name: "Golf", href: "/woman/Golf" },
            ],
          ]}
        />
        <Dropdown
          title="Kids"
          links={[
            [
                
              { name: "ALl Clothing", href: "/Kids/ALl Clothing" },
              { name: "Hoodies and Sweatshirts", href: "/Kids/Hoodies and Sweatshirts" },
              { name: "Jackets", href: "/Kids/Jackets" },
              { name: "Trousers and Leggings", href: "/Kids/Trousers and Leggings" },
            ],
            [
              { name: "Trousers and Leggings", href: "/Kids/Trousers and Leggings" },
              { name: "Tracksuits", href: "/Kids/Tracksuits" },
              { name: "Matching Sets", href: "/Kids/Matching Sets" },
              { name: "Tops and T-shrits", href: "/Kids/Tops and T-shrits" },
            ],
            [
              { name: "All Clothing", href: "/Kids/All Clothing" },
              { name: "Hoodies and Sweatshirts", href: "/Kids/Hoodies and Sweatshirts" },
              { name: "Shorts", href: "/Kids/Shorts" },
              { name: "Kits and Jerseys", href: "/Kids/Kits and Jerseys" },
            ],
            [
              { name: "Lyfestyle", href: "/Kids/Lyfestyle" },
              { name: "Jordan", href: "/Kids/Jordan" },
              { name: "Running", href: "/Kids/Running" },
              { name: "Basketball", href: "/Kids/Basketball" },
            ],
          ]}
        />
      </div>

      <div className="flex gap-5 transform translate-y-2">
        <div className="relative">
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search"
          className="bg-gray-50 hover:bg-gray-200 rounded-[25px] h-10 w-40 pl-4 pr-10 text-bg border-transparent"
        />
        <FaSearch 
          size={20} 
          className="absolute top-4 transform -translate-y-[45%] right-3 text-gray-400" 
        />
        </div>
        
      
        <Link to="/Favorites"><FaHeart size={20} className=" text-red-600 transform translate-y-1 hover:animate-ping"/></Link>
        <Link to="/ShoppingBag"><FaShoppingBag size={20} className="text-green-500 transform translate-y-1 hover:animate-ping"/></Link>
      </div>

    </div>


    
    


    </> 
  )};