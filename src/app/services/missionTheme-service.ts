import { AxiosResponse } from "axios";
import {
  IGetListPayload,
  IMissionThemePayload,
} from "../utility/interfaces/payload";
import http from "./base-service";

export const getAllMissionTheme = (
  payload: IGetListPayload
): Promise<AxiosResponse> => {
  return http.post("admin/missiontheme/search", payload);
};

export const getMissionTheme = (id: string): Promise<AxiosResponse> => {
  return http.get("admin/missiontheme/" + id);
};

export const addMissionTheme = (
  payload: IMissionThemePayload
): Promise<AxiosResponse> => {
  return http.post("admin/missiontheme", payload);
};

export const editMissionTheme = (
  id: string,
  payload: IMissionThemePayload
): Promise<AxiosResponse> => {
  return http.put("admin/missiontheme/" + id, payload);
};

export const deleteMissionTheme = (id: string): Promise<AxiosResponse> => {
  return http.delete("admin/missiontheme/" + id);
};
