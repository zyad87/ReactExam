import React, { useState } from 'react';
import CardCategory from './CardCategory';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(1);

  const goToSlide = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };

  return (
    <div className="relative">
      <div className="carousel w-full relative">
        <div id={`slide${currentSlide}`} className="carousel-item relative w-full">
          {currentSlide === 1 && (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZZSLoKbNiKROChgm_S1sJnI5LO3--jP1yFKQhQ-kGojijSZywURNJ1_ZPFhTRU2j6Els&usqp=CAU"
              className="w-full transition-opacity duration-500"
              alt="Slide 1"
            />
          )}




        </div>
      </div>

      <div className="flex justify-center items-center gap-20 absolute m-auto left-0 right-0 bottom-5 max-md:hidden z-0">
      </div>
    </div>
  );
}

export default Carousel;
