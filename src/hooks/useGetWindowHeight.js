import { useEffect, useState } from "react";

/**
 * @returns 현재 윈도우 창크기의 innerHeight값
 */
const useGetWindowHeight = () => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    const resizeListener = () => {
      setInnerHeight(window.innerHeight);
    };
    window.addEventListener("resize", resizeListener);
  });
  return innerHeight;
};

export default useGetWindowHeight;
