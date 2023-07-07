import axios from "axios";
import http from "./base-service";

interface UserDataProps {}
// const url = "https://apit1.web2.anasource.com/";

export const getAllUsers = async (
  path: string,
  pageNumber: number,
  pageSize: number,
  sortBy?: string,
  sortOrder?: string,
  searchKey?: string
) => {
  let result;
  await http
    .post(path, {
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortBy: sortBy,
      sortOrder: sortOrder,
      searchKey: searchKey,
    })
    .then((response) => {
      result = response.data.data.result;
    })
    .catch((err) => {});
  return result;
};
