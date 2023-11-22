/**
 * 최신순으로 정렬하는 함수
 * @param {*} data recentMessages 배열
 */
export const sortNew = (data) => {
  const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
  return sortedData;
};

/**
 * 인기순으로 정렬하는 함수
 * @param {*} data  recentMessages 배열
 */
export const sortHot = (data) => {
  const sortedData = data.sort((a, b) => b.messageCount - a.messageCount).slice(0, 10);
  return sortedData;
};
