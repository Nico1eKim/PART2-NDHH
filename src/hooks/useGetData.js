import api from "@/api/api";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 각 메소드에 따른 함수 사용 순서
// GET: useGetData() 사용
// POST: getPostDate 파일 내 Create~~ 파일 사용하여 객체 생성 -> api 사용
// DELETE: api 사용

/**
 * 데이터를 가져오는 커스텀 훅
 * @param {string} type - 데이터 종류 (예: "RECIPIENTS", "RECIPIENTS_MESSAGES")
 * @param {string} method - HTTP 메서드 (GET, POST, DELETE)
 * @param {Number} path - id or recipient_id 값 (해당 식별자로 엔드포인트 경로 찾음)
 * @param {Object} postData - POST 요청 시 전송할 데이터 (기본값: null)
 *@returns {Object|null} - 가져온 데이터 또는 null (초기값)
 */

function useGetData(type, path, DEP, limit, offset) {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        const result = await api(type, "GET", path, null, limit, offset);

        if (["RECIPIENTS_ID", "BACKGROUND_IMGS", "PROFILE_IMGS", "MESSAGES"].includes(type)) return setData(result);

        const { results } = result;
        return setData(results);
      } catch (error) {
        return navigate("/notFound");
      }
    })();
  }, [DEP]);

  return data;
}

export default useGetData;
