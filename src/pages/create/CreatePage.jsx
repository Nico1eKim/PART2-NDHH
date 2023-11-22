import { Helmet } from "react-helmet-async";
import Header from "../../components/commons/header/Header";
import Layout from "./Layout";

function CreatePage() {
  return (
    <>
      <Helmet>
        <title>Post | Rolling</title>
      </Helmet>
      <Header hideButton />
      <Layout />
    </>
  );
}

export default CreatePage;
