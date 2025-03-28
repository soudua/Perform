import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//defenir images
const Images = () => {
    
    
    

  return (
    <>
    
        
    
    <div className="flex justify-center transform translate-y-12 gap-4 mb-24">
    <img src="/people1.png" alt="people1" />
    <img src="/people2.png" alt="people2" />
    <img src="/people3.png" alt="people3" />
    </div>
    

    <div className="">
    <img src="/bigshoe.png" alt="bigshoe" />
    </div>

    <video autoPlay muted loop playsInline>
        <source src="/video123.mp4" type="video/mp4" />
    </video>

    <div className="mb-24">
    <img src="/lastimage.png" alt="lastimage" />
    </div>


{/*linha */}
    <hr className="absolute left-12 right-12 transform translate-x- h-1 bg-gray-400 border" />

    <div className="grid grid-cols-3 gap-4 transform translate-y-12 translate-x-12 mb-5 max-w-[1300px]">
    <Link to="/kids" className="font-bold">Resources</Link>
    <Link to="/kids" className="font-bold">Help</Link>
    <Link to="/kids" className="font-bold">Company</Link>
    </div>

    <div className="grid grid-cols-3 gap-2 transform translate-y-12 translate-x-12 mb-20 text-gray-500 max-w-[1300px]">
    <Link to="/kids" className="font-bold">Gift Cards</Link>
    <Link to="/kids" className="font-bold">Get Help</Link>
    <Link to="/kids" className="font-bold">About Nike</Link>
    <Link to="/kids" className="font-bold">Find a Store</Link>
    <Link to="/kids" className="font-bold">Order Status</Link>
    <Link to="/kids" className="font-bold">News</Link>
    <Link to="/kids" className="font-bold">Nike Journal</Link>
    <Link to="/kids" className="font-bold">Shipping and Delivery</Link>
    <Link to="/kids" className="font-bold">Careers</Link>
    <Link to="/kids" className="font-bold">Become a Member</Link>
    <Link to="/kids" className="font-bold">Returns</Link>
    <Link to="/kids" className="font-bold">Investors</Link>
    <Link to="/kids" className="font-bold">Feedback</Link>
    <Link to="/kids" className="font-bold">Payment Options</Link>
    <Link to="/kids" className="font-bold">Sustainability</Link>

    </div>

    <div className="flex justify-start transform translate-y-6 translate-x-11  gap-12 text-gray-500 mb-20">
    <Link to="/kids" className="font-bold hover:text-gray-400">@ 2025 Nike,Inc. ALl rights reserved</Link>
    <Link to="/kids" className="font-bold hover:text-gray-400">Guides</Link>
    <Link to="/kids" className="font-bold hover:text-gray-400">Terms of Use</Link>
    <Link to="/kids" className="font-bold hover:text-gray-400">Terms of Use</Link>
    <Link to="/kids" className="font-bold hover:text-gray-400">Company Details</Link>
    <Link to="/kids" className="font-bold hover:text-gray-400">Privacy & Cookie Policy</Link>
    <Link to="/kids" className="font-bold hover:text-gray-400">Privacy & Cookie Settings</Link>
    </div>
    
    
    <div className="w-full h-32 bg-black"></div>


    </>
    
  );
};

export default Images;



