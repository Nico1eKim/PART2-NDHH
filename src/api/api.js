import { BASE_URL, ENDPOINTS } from "@/api/config";

/**
 * API 호출 함수
 * @param {string} type - 데이터 종류 (예: "RECIPIENTS", "RECIPIENTS_MESSAGES")
 * @param {string} method - HTTP 메서드 (GET, POST, DELETE)
 * @param {Number} path - id or recipient_id 값 (해당 식별자로 엔드포인트 경로 찾음)
 * @param {Object} postData - POST 요청 시 전송할 데이터
 * @returns {Promise<Object>} - API 응답을 나타내는 Promise 객체
 */

async function api(type, method, path, postData, limit, offset) {
  const endpoint = ENDPOINTS[type][method];
  let url = typeof endpoint === "function" ? BASE_URL + endpoint(path) : BASE_URL + endpoint;
  if (limit) url = url + `?limit=${limit}`;
  if (offset) url = url + `?offset=${offset}`;

  switch (method) {
    case "GET": {
      const getResponse = await fetch(url);
      if (!getResponse.ok) {
        throw new Error("데이터를 불러오는데 실패했습니다.");
      }
      const result = await getResponse.json();
      return result;
    }
    case "POST": {
      const postResponse = await fetch(url, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await postResponse.json();
      return result;
    }
    case "DELETE":
      const deleteResponse = await fetch(url, {
        method: "DELETE",
      });
      if (!deleteResponse.ok) {
        throw new Error("데이터 삭제에 실패했습니다.");
      }
      return deleteResponse.ok;

    default:
      throw new Error("GET, POST, DELETE 중 하나를 입력해주세요");
  }
}

export default api;
