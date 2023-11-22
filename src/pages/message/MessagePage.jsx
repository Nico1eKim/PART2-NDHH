import Header from "@/components/commons/header/Header";
import Layout from "@/pages/message/Layout";
import { Helmet } from "react-helmet-async";

function MessagePage() {
  return (
    <>
      <Helmet>
        <title>Card 작성하기 | Rolling</title>
      </Helmet>
      <Header hideButton />
      <Layout />
    </>
  );
}

export default MessagePage;
