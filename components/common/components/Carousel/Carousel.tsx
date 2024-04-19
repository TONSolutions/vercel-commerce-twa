"use client";

import classNames from "classnames";
import { DotButton, useDotButton } from "components/common/components/Carousel/hooks/useDotButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

import type { EmblaOptionsType } from "embla-carousel";
import type { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  options?: EmblaOptionsType;
  autoplay?: boolean;
  withDots?: boolean;
  dotsClassName?: string;
  wrapperClassName?: string;
};

export const Carousel: FunctionComponent<Props> = ({
  children,
  options,
  autoplay,
  wrapperClassName,
  dotsClassName,
  withDots = false
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 3000 })
  ]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

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
    <div className="relative">
      <div className={wrapperClassName}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">{children}</div>
        </div>
      </div>

      {withDots ? (
        <div
          className={classNames(
            "absolute bottom-4 left-[50%] flex -translate-x-[50%] items-center justify-evenly gap-2 rounded-xl bg-[#FFFFFF26]",
            dotsClassName
          )}
        >
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={classNames("h-2 w-2 rounded-full", {
                "bg-[#FFFFFF4D]": index !== selectedIndex,
                "bg-[#FFFFFF]": index === selectedIndex
              })}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
