import api from "@/api/api";
import Button from "@/components/commons/Button";
import { DeviceSize } from "@/styles/DeviceSize";
import { Z_INDEX } from "@/styles/ZindexStyles";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

function SaveBtn({ pc = false, setDEP, delList, setDelList }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteSave = async (event) => {
    event.preventDefault();
    for (let msgId of delList) {
      const result = await api("MESSAGES", "DELETE", msgId);
    }
    navigate(`/post/${id}`);
    setDelList([]);
    setDEP([]);
    window.location.reload();
  };

  return pc ? (
    <Wrapper>
      <Button type="primary" height="l" width="100" onClick={handleDeleteSave}>
        저장하기
      </Button>
    </Wrapper>
  ) : (
    <Wrapper>
      <Button type="primary" height="xl" onClick={handleDeleteSave}>
        저장하기
      </Button>
    </Wrapper>
  );
}

export default SaveBtn;

const Wrapper = styled.div`
  width: 10rem;
  padding-bottom: 1.1rem;

  position: relative;

  z-index: ${Z_INDEX.postLayout_SaveWrapper};

  @media (max-width: ${DeviceSize.tablet}) {
    width: calc(100% - 4.8rem);
    padding: 0;

    flex-direction: column;

    position: fixed;
    bottom: 2.4rem;
  }

  @media (max-width: ${DeviceSize.mobile}) {
    width: calc(100% - 4rem);
    max-width: 38.4rem;
  }
`;
