import React from "react";
import { BannerProps } from "@sdc/types";

export const ContributionsEpic: React.FC<BannerProps> = ({
  content,
  mobileContent,
}: BannerProps) => {
  return (
    <div>
      <div>
        <h1>{mobileContent.header}</h1>
        <p>{mobileContent.body}</p>
      </div>

      <div>
        <h1>{content.header}</h1>
        <p>{content.body}</p>
      </div>
    </div>
  );
};
