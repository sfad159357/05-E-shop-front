import http from "./httpService";

const apiEndpoint = "categories";

export function getCategories() {
  return http.get(apiEndpoint); // 回傳Promise
}
