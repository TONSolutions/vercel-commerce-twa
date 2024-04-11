"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

import type { EmblaOptionsType } from "embla-carousel";
import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  options?: EmblaOptionsType;
  autoplay?: boolean;
  wrapperClassName?: string;
};

export const Carousel: FunctionComponent<Props> = ({
  children,
  options,
  autoplay,
  wrapperClassName
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 3000 })
  ]);

  //   const [isPlaying, setIsPlaying] = useState(false);

  //   useEffect(() => {
  //     const autoplay = emblaApi?.plugins()?.autoplay;

  //     if (!autoplay) {
  //       return;
  //     }

  //     setIsPlaying(autoplay.isPlaying());
  //     emblaApi
  //       .on("autoplay:play", () => setIsPlaying(true))
  //       .on("autoplay:stop", () => setIsPlaying(false))
  //       .on("reInit", () => setIsPlaying(autoplay.isPlaying()));
  //   }, [emblaApi]);

  useEffect(() => {
    if (autoplay) {
      const emblaAutoplay = emblaApi?.plugins()?.autoplay;

      if (!emblaAutoplay) {
        return;
      }

      emblaAutoplay.play();
    }
  }, [emblaApi, autoplay]);

  return (
    <div className={wrapperClassName}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>
    </div>
  );
};
