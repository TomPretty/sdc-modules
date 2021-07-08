import { Cta } from "./shared";

export interface BannerProps {
  content: {
    header: string;
    body: string;
    cta?: Cta;
  };
  mobileContent: {
    header: string;
    body: string;
    cta?: Cta;
  };
}
