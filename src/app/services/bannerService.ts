import { AxiosResponse } from "axios";
import { IGetListPayload } from "../utility/interfaces/payload";
import http from "./base-service";

export const getAllBanners = (
  payload: IGetListPayload = {}
): Promise<AxiosResponse> => {
  return http.post("api/banners/search-banner", payload);
};

export const addBanner = (payload: FormData): Promise<AxiosResponse> => {
  return http.post("api/banners", payload);
};

export const editBanner = (
  payload: FormData,
  id: string
): Promise<AxiosResponse> => http.put("api/banners/" + id, payload);

export const getBanner = (id: string): Promise<AxiosResponse> =>
  http.get("api/banners/" + id);

export const deleteBanner = (id: string): Promise<AxiosResponse> =>
  http.delete("api/banners/" + id);
