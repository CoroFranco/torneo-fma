import { Link } from "react-router-dom";
import { Copa, RightArrow, LeftArrow } from "./Icons";
import useSlider from "../hooks/useSlider";
import TeamSliderCard from "./TeamSliderCard";
import { useState } from "react";


export default function Slider () {
  const{scrollPrev, scrollNext, emblaRef} = useSlider()
  const[grabbing, setGrabbing] = useState(false)
  const handleGrab = () => {
    setGrabbing(!grabbing)
  }

  return (
    <section className='w-[95%] mx-auto flex flex-col gap-6'>
        <div className ='text-emerald-600 flex place-items-center w-full justify-between'>
          <div className='flex place-items-center gap-2'>
          <Copa />
        <h2 className="text-black font-bold text-2xl" >Equipos Destacados</h2>
          </div>
          <div className='flex place-items-center gap-2'>
            <Link to='/'> Ver todos </Link>
            <RightArrow/>
          </div>
        </div>
      <div className={`embla relative ${grabbing ? "cursor-grabbing" : 'cursor-grab'}`}
      onMouseDown={handleGrab}
      onMouseUp={handleGrab}
      onMouseLeave={() => setGrabbing(false)}
      >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <TeamSliderCard />
          <TeamSliderCard />
          <TeamSliderCard />
          <TeamSliderCard />
          <TeamSliderCard />      
        </div>
      </div>
      <button className="embla__prev absolute top-[50%] left-10 bg-white p-2 rounded-4xl opacity-80 cursor-pointer" onClick={scrollPrev}>
        <span>
          <LeftArrow />
        </span>
      </button>
      <button className="embla__next absolute top-[50%] right-10 bg-white p-2 rounded-4xl opacity-80 cursor-pointer" onClick={scrollNext}>
        <span>
          <RightArrow />
        </span>
      </button>
    </div>
      </section>
  )
}
