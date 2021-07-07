import React from "react";
import { EpicProps } from "shared";

export const ContributionsEpic: React.FC<EpicProps> = ({
  content,
}: EpicProps) => {
  return (
    <div>
      <h1>{content.header}</h1>
      <p>{content.body}</p>
    </div>
  );
};
