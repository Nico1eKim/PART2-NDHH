import { useEffect } from "react";
import useGetWindowHeight from "./useGetWindowHeight";

/**
 * 현재 스크롤이 맨 끝에 도달했는지 유무를 알려주는 함수
 */
function useScrollBottom(setIsBottom) {
  const innerHeight = useGetWindowHeight();

  function onScroll() {
    const { scrollTop, offsetHeight } = document.documentElement;
    if (offsetHeight !== 0 && scrollTop + innerHeight >= offsetHeight) {
      setIsBottom(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

export default useScrollBottom;
