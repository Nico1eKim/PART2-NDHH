import styled from "styled-components";
import SaveBtn from "./SaveBtn";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
import { DeviceSizeNum } from "@/styles/DeviceSize";
import BackBtn from "@/components/post/BackBtn";

function ButtonControl({ name, setDEP, path, delList, setDelList, setOffset }) {
  const windowWidth = useGetWindowWidth();
  const password = recipientData.name.slice(-4);
  const userName = recipientData.name.slice(0, -4);

  return (
    <>
      <BackBtn URL={recipientData.backgroundImageURL} />
      {path === "edit" ? (
        windowWidth > DeviceSizeNum.tablet ? (
          <ButtonWrapper>
            <DeleteBtn name={userName} />
            <SaveBtn pc={true} setDEP={setDEP} delList={delList} setDelList={setDelList} setOffset={setOffset} />
          </ButtonWrapper>
        ) : (
          <>
            <DeleteBtn name={userName} />
            <SaveBtn setDEP={setDEP} delList={delList} setDelList={setDelList} setOffset={setOffset} />
          </>
        )
      ) : (
        <EditBtn password={password} />
      )}
    </>
  );
}

export default ButtonControl;

const ButtonWrapper = styled.div`
  width: 26.5rem;

  display: flex;
  justify-content: space-between;
`;
