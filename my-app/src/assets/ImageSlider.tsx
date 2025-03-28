import React, { useState, useEffect } from "react";

//defenir images
const ImageSlider = () => {
    const images = [
      "/nike2.png",
      "/nike3.png",
    ];
  //função para dizer que o declarar variavel e para dizer que vai começar sempre em 0
    const [currentIndex, setCurrentIndex] = useState(0);
  
    // Função para ir ao prximo
    //% feito para fazer um loop, quando chega o numero final volta para o inicio assim se tenho 2 imagens tenho de fazer com o numero anterior
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    // Função para ir para o anterior slide
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
  
    // Auto-slide em 10 segundos
    useEffect(() => {
      const interval = setInterval(nextSlide, 10000);
      return () => clearInterval(interval); // Cleanup on unmount
    }, []);
  

  return (
    <div className="slider-container ">
      {/* Slider Image */}
      <div className="slider-image ">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>
      <div className="flex justify-between">
        <div></div>
        <div></div>
        <div>
            {/* Next Button */}
            <button className="slider-btn prev bg-gray-400 rounded-full h-8 w-8 transform translate-y-5 -translate-x-12 hover:bg-gray-300" onClick={prevSlide}>
        &#10094;
      </button>

      {/* Previous Button */}
      <button className="slider-btn next  prev bg-gray-400 rounded-full h-8 w-8 transform translate-y-5 -translate-x-8 hover:bg-gray-300" onClick={nextSlide}>
        &#10095;
      </button></div>
        
      
    </div>
      </div>
  );
};

export default ImageSlider;









