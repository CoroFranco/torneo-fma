import comark from '../assets/comark.jpg'

export default function TeamSliderCard () {
  return (
    <div className="embla__slide rounded-2xl overflow-hidden">
        <header className="relative max-h-[300px] w-full">
          <img className="w-full h-full object-cover brightness-80" src={comark} alt="imagen" />
          <div className="absolute bottom-5 left-0 p-2 bg-opacity-50">
          <span className='text-white font-bold text-3xl'>
            Equipo 1
          </span>
          </div>
        </header>
              </div>
  )
}
