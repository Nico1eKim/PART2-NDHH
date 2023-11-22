import Header from "@/components/commons/header/Header";
import Layout from "@/pages/list/Layout";
import GlobalStyles from "@/styles/GlobalStyles";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

function ListPage() {
  return (
    <>
      <Helmet>
        <title>List | Rolling</title>
      </Helmet>
      <CustomGlobalStyle />
      <Header />
      <Layout />
    </>
  );
}

export default ListPage;

const CustomGlobalStyle = styled(GlobalStyles)`
  body {
    overflow-y: hidden !important;
  }
`;
