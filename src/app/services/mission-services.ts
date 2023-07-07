import { IMission } from "../utility/interfaces/mission";
import http from "./base-service";

const MISSION_URL = "admin/missions/";

const getMissionList = () => {
  const response = http.post(`${MISSION_URL}search`, {
    pageSize: 10,
    pageNumber: 0,
    searchkey: "",
  });
  return response;
};

const addEditMission = (missionData: IMission) => {
  let response;
  if (missionData.id === 0) {
    response = http.post(MISSION_URL, missionData);
  } else {
    response = http.put(`${MISSION_URL}${missionData.id}`, missionData);
  }
  return response;
};

const fetchMissionData = (missionId: number) => {
  const response = http.get(`${MISSION_URL}${missionId}`);
  return response;
};

export default { getMissionList, addEditMission, fetchMissionData };
