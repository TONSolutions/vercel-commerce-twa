import { Carousel } from "components/common/components/Carousel";
import { Banner } from "components/main-page/components/Banner";

import type { Banner as BannerType } from "components/main-page/types";
import type { FunctionComponent } from "react";

type Props = {
  banners: BannerType[];
};

export const BannersContainer: FunctionComponent<Props> = ({ banners }) => (
  <div>
    <h1 className="mb-0 px-4 text-xl font-bold">🔥 Speсial offers</h1>

    <Carousel options={{ loop: true }} wrapperClassName="mb-4" autoplay>
      {banners.map(
        (
          {
            title,
            link_text,
            link_url,
            bg_colors_list,
            title_color,
            link_color,
            thumbnail,
            crop_image
          },
          index
        ) => (
          <Banner
            key={index}
            title={title}
            linkText={link_text}
            linkUrl={link_url}
            bgColorsList={bg_colors_list}
            titleColor={title_color}
            linkColor={link_color}
            image={thumbnail}
            isCropped={JSON.parse(crop_image)}
          />
        )
      )}
    </Carousel>
  </div>
);
