import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";


export default function useSlider () {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return {scrollPrev, scrollNext, emblaRef}
}
