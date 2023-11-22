import { FONT12, FONT14, FONT16 } from "@/styles/FontStyles";
import { useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const Font = Quill.import("attributors/class/font");
Font.whitelist = ["noto-sans-kr", "pretendard", "nanum-myeongjo", "ibm-plex-sans-kr", "gaegu", "diphylleia", "orbit", "black-han-sans", "poppins", "agbalumo"];
Quill.register(Font, true);

const Size = Quill.import("attributors/style/size");
Size.whitelist = ["1.0rem", "1.2rem", "1.4rem", "1.6rem", "2.0rem", "2.4rem", "3.2rem", "4.0rem", "4.8rem"];
Quill.register(Size, true);

const CustomToolbar = () => (
  <div id="toolbar">
    <div>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
    </div>
    <div>
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </div>
    <div>
      <select className="ql-font" defaultValue="noto-sans-kr">
        <option value="noto-sans-kr">Noto Sans KR</option>
        <option value="pretendard">pretendard</option>
        <option value="nanum-myeongjo">Nanum Myeongjo</option>
        <option value="ibm-plex-sans-kr">IBM Plex Sans KR</option>
        <option value="gaegu">Gaegu</option>
        <option value="diphylleia">Diphylleia</option>
        <option value="orbit">Orbit</option>
        <option value="black-han-sans">Black Han Sans</option>
        <option value="poppins">Poppins</option>
        <option value="agbalumo">Agbalumo</option>
      </select>
      <select className="ql-size" defaultValue="1.6rem">
        <option value="1.0rem">10</option>
        <option value="1.2rem">12</option>
        <option value="1.4rem">14</option>
        <option value="1.6rem">16</option>
        <option value="2.0rem">20</option>
        <option value="2.4rem">24</option>
        <option value="3.2rem">32</option>
        <option value="4.0rem">40</option>
        <option value="4.8rem">48</option>
      </select>
    </div>
  </div>
);

let KEY = {};

function TextEditor({ setValue }) {
  const editor = useRef();
  const handleChange = (content, delta, source, editor) => {
    setValue((prev) => ({ ...prev, content }));
  };

  const handleKeyUp = (event) => {
    if (KEY.Control && event.key === "Control") {
      editor.current.blur();
      KEY = {};
      return;
    }
    KEY[event.key] = event.key;
  };

  return (
    <Container>
      <CustomToolbar />
      <ReactQuill
        ref={editor}
        style={{ width: "100%", height: "26rem" }}
        placeholder="당신의 마음을 표현하세요."
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        modules={{
          toolbar: {
            container: "#toolbar",
          },
        }}
      />
      <p>키보드 사용자는 Ctrl 두 번 눌러 다음으로 갈 수 있어요.</p>
    </Container>
  );
}

export default TextEditor;

const Container = styled.div`
  #toolbar {
    padding: 1.6rem;

    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;

    border-top-right-radius: 0.8rem;
    border-top-left-radius: 0.8rem;

    > div {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
  }

  p,
  span,
  .ql-blank::before {
    ${FONT16};
    font-style: normal;
  }

  .ql-picker {
    width: 3.2rem;
    height: 100%;
  }

  .ql-picker-label {
    display: flex;
    align-items: center;
  }

  .ql-container {
    border: 0.1rem solid var(--Gray3);
    border-top: 0;
    border-bottom-right-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
  }

  .ql-snow.ql-toolbar button {
    padding: 0;
  }

  .ql-picker.ql-font {
    width: 17rem;
    ${FONT12};
  }
  .ql-picker-options {
    ${FONT14};
  }

  ::-webkit-scrollbar {
    width: 0.8rem;
  }

  ::-webkit-scrollbar-thumb {
    border-bottom-right-radius: 0.8rem;
    border-bottom-left-radius: 0.8rem;
    background-color: var(--Gray3);
  }

  > p {
    visibility: hidden;
    ${FONT12}
    color: var(--Gray6);
  }

  &:focus-within {
    > p {
      visibility: visible;
    }
  }
`;
