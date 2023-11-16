export const BASE_URL = "https://rolling-api.vercel.app";
export const TEAM = "1-7";

export const ENDPOINTS = {
  BACKGROUND_IMGS: {
    // 배경 이미지 받아오기 -> create page.
    GET: "/background-images/",
  },
  PROFILE_IMGS: {
    // 프로필 이미지 설정 -> message page.
    GET: "/profile-images/",
  },
  MESSAGES: {
    // id에 해당하는 메세지 객체 삭제 -> Card 컴포넌트
    DELETE: (path) => `/${TEAM}/messages/${path}/`,
  },
  RECIPIENTS: {
    // 새로운 대상객체 (To.~~) 생성 or 리스트에서 조회 시 사용
    GET: `/${TEAM}/recipients/`,
    POST: `/${TEAM}/recipients/`,
  },
  RECIPIENTS_ID: {
    // 해당 아이디 객체에 대한 편지, 반응들 조회 or 삭제
    GET: (path) => `/${TEAM}/recipients/${path}/`,
    DELETE: (path) => `/${TEAM}/recipients/${path}/`,
  },
  RECIPIENTS_MESSAGES: {
    // 대상에게 남기는 메세지 데이터를 저장 - 메세지 작성 / 특정 대상 메세지 목록 조회
    GET: (path) => `/${TEAM}/recipients/${path}/messages/`,
    POST: (path) => `/${TEAM}/recipients/${path}/messages/`,
  },
  RECIPIENTS_REACTIONS: {
    // 헤더에 쓰이는 이모지 데이터.
    GET: (path) => `/${TEAM}/recipients/${path}/reactions/`,
    POST: (path) => `/${TEAM}/recipients/${path}/reactions/`,
  },
};
