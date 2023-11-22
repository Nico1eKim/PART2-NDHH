import api from "@/api/api";
import { makeMessage, makeRecipient } from "@/api/makePostData";
import useCatch from "@/hooks/useCatch";
import { useNavigate, useParams } from "react-router";

function usePostData(value) {
  const navigate = useNavigate();
  const { id } = useParams();
  const handleFunction = value.font
    ? async () => {
      if (!value.sender) {
        throw new Error("보내는 사람의 이름을 써주세요.");
      }

      if (!value.content) {
        throw new Error("당신의 마음을 적는 걸 깜빡하셨어요.");
      }
      console.log(makeMessage(value));

      const { recipientId } = await api("RECIPIENTS_MESSAGES", "POST", id, makeMessage(value));
      if (recipientId) {
        console.log(recipientId);
        navigate(`/post/${recipientId}`);
        return;
      }
      throw new Error("축약된 URL로 시도해주세요.");
    }
    : async () => {
      if (!value.name) {
        throw new Error("받는 사람의 이름이 정확한가요?");
      }

      if (!value.backgroundColor && !value.URL) {
        throw new Error("이미지를 추가해봅시다.");
      }

      if (value.password.length < 4) {
        throw new Error("비밀번호가 4자리인가요?");
      }

      const { id } = await api("RECIPIENTS", "POST", null, makeRecipient(value));

      if (id) {
        navigate(`/post/${id}`);
        return;
      }
      throw new Error("축약된 URL로 시도해주세요.");
    };

  return useCatch(handleFunction);
}

export default usePostData;
