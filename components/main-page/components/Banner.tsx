import classNames from "classnames";
import ChevronRightIcon from "components/assets/icons/ChevronRightIcon";
import { Button } from "konsta/react";
import { generateBgColorClass } from "lib/shopify/utils";
import { useRouter } from "next/navigation";

import type { Banner as BannerType } from "components/main-page/types";
import type { FunctionComponent } from "react";

type Props = {
  title: BannerType["title"];
  linkText: BannerType["link_text"];
  linkUrl: BannerType["link_url"];
  image: BannerType["thumbnail"];
  bgColorsList: BannerType["bg_colors_list"];
  titleColor: BannerType["title_color"];
  linkColor: BannerType["link_color"];
  isCropped: BannerType["crop_image"];
};

export const Banner: FunctionComponent<Props> = ({
  title,
  linkText,
  linkUrl,
  bgColorsList,
  titleColor,
  linkColor,
  image,
  isCropped
}) => {
  const router = useRouter();

  const bgClass = generateBgColorClass(bgColorsList);

  return (
    <div className="flex-carousel m-4 min-w-0 rounded-xl" style={{ backgroundImage: bgClass }}>
      <div className="flex h-full w-full items-center justify-between">
        <div className="max-w-[60%] p-4">
          <h2 className="text-regular font-semibold" style={{ color: titleColor ?? "" }}>
            {title}
          </h2>

          {linkText && linkUrl ? (
            <Button
              clear
              onClick={() => router.push(linkUrl)}
              className="w-max !p-0 !text-base !font-normal normal-case"
              style={{ color: linkColor ?? "" }}
            >
              <span className="mr-1 text-xs">{linkText}</span>

              <ChevronRightIcon className="h-4 w-2" />
            </Button>
          ) : null}
        </div>

        <div
          className={classNames("relative h-full w-full max-w-[40%]", {
            "overflow-hidden": isCropped
          })}
        >
          <img
            src={image.url}
            className={classNames("block object-cover", {
              "absolute bottom-0 right-0": !isCropped,
              "h-full w-full": isCropped
            })}
          />
        </div>
      </div>
    </div>
  );
};
