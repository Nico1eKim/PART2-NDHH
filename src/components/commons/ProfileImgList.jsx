import { FONT12 } from "@/styles/FontStyles";
import { Z_INDEX } from "@/styles/ZindexStyles";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * @param {*} data recentMessages 배열
 */
ProfileImgList.propTypes = {
  messageCount: PropTypes.number,
  data: PropTypes.array,
};
function ProfileImgList({ messageCount, data }) {
  const rest = messageCount - 3;

  return (
    <Container>
      {data[0] && <Img order={Z_INDEX.profileImgList_Img[0]} src={data[0].profileImageURL} />}
      {data[1] && <Img order={Z_INDEX.profileImgList_Img[1]} src={data[1].profileImageURL} />}
      {data[2] && <Img order={Z_INDEX.profileImgList_Img[2]} src={data[2].profileImageURL} />}
      {rest > 0 && <Rest>+{rest <= 999 ? rest : "999"}</Rest>}
    </Container>
  );
}

export default ProfileImgList;

const Container = styled.div`
  width: 10rem;
  height: 3rem;

  position: relative;

  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 2.8rem;
  height: 2.8rem;

  position: absolute;
  left: ${({ order }) => `${1.7 * order - 1.7}rem`};

  z-index: ${({ order }) => order};

  border-radius: 100%;
  border: 0.15rem solid var(--White);

  background-size: cover;
  background-position: center;
`;

const Rest = styled.div`
  min-width: 2.8rem;
  height: 2.8rem;
  padding: 0.6rem 0.5rem;

  position: absolute;
  left: 5.1rem;

  z-index: ${Z_INDEX.profileImgList_Rest};

  display: flex;
  align-items: center;

  border: 0.1rem solid var(--Gray3);
  border-radius: 3rem;

  background-color: var(--White);

  ${FONT12}
  color: var(--gray-500, #555);
  letter-spacing: -0.006rem;
`;
