import { IContent } from "../utility/interfaces/IContent";
import http from "./base-service";
import axios from "axios";

const BASE_URL = "api/cmspages/";

interface pagination {
  pageNo: number;
  pageSize: number;
  totalRecords: number;
}

const getContent = (
  searchkey: string | undefined,
  paginationData: pagination
) => {
  const response = http.post(`${BASE_URL}search`, {
    pageSize: paginationData.pageSize,
    pageNumber: paginationData.pageNo + 1,
    searchkey: searchkey,
  });
  return response;
};

interface FormValues {
  id?: number;
  title?: string;
  description?: string;
  slug?: string;
  status?: string;
}

export const addTitle = async (path: string, data: FormValues) => {
  const fullData = {
    ...data,
    description: data.description,
    slug: data.slug,
    status: data.status === "Active" ? 2 : data.status === null ? null : 1,
  };

  let message;

  const existingContentResponse = await http.post("api/cmspages/search", {
    pageSize: 1,
    pageNumber: 0,
    searchkey: fullData.title,
  });

  if (existingContentResponse.data.totalRecords > 0) {
    message = "Title must be unique";
  } else {
    try {
      const response = await axios.post(BASE_URL + path, fullData);
      message = response.data.message;
    } catch (error: any) {
      if (error.response) {
      }

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "DuplicateNameError"
      ) {
        throw new Error("Title must be unique");
      } else {
        throw new Error("Failed to add title");
      }
    }
  }

  return message;
};

const addEditTitle = (contentData: IContent) => {
  let response;
  if (contentData.id === 0) {
    response = http.post(BASE_URL, contentData);
  } else {
    response = http.put(`${BASE_URL}${contentData.id}`, contentData);
  }
  return response;
};

const fetchContentData = (contentId: number) => {
  const response = http.get(`${BASE_URL}${contentId}`);
  return response;
};

const deleteRecord = async (contentId: number) => {
  try {
    await axios.delete(`${BASE_URL}${contentId}`);
    window.location.reload();
  } catch (error: any) {}
};

export default {
  addEditTitle,
  deleteRecord,
  getContent,
  fetchContentData,
};
