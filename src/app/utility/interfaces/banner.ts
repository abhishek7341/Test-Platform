export interface IBannerData {
  id?: string;
  image?: File | null;
  bannerImagePath?: string;
  bannerText: string;
  sortOrder: number;
  status: string | number;
}
