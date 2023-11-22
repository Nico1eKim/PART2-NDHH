import Header from "@/components/commons/header/Header.jsx";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import { DeviceSizeNum } from "@/styles/DeviceSize";
import Layout from "./Layout";

function PostPage({ page }) {
  const windowWidth = useGetWindowWidth();

  return (
    <>
      {windowWidth > DeviceSizeNum.mobile && <Header />}
      <Layout path={page} />
    </>
  );
}

export default PostPage;
