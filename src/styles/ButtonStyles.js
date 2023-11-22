import { css } from "styled-components";
import { FONT14, FONT16, FONT18B } from "./FontStyles";

export const HEIGHTS = {
  xl: css`
    --padding: 14px 24px;
    --border-radius: 12px;
    ${FONT18B}
  `,
  l: css`
    --padding: 0.8rem 1.6rem;
    --border-radius: 0.6rem;
    ${FONT16}
  `,
  m: css`
    --padding: 0.6rem 1.6rem;
    --border-radius: 0.6rem;
    ${FONT16}
  `,
  s: css`
    --padding: 0.2rem 1.6rem;
    --border-radius: 0.6rem;
    ${FONT14}

    --img-width: 2rem;
    --img-height: 2rem;
  `,
};

export const TYPES = {
  primary: css`
    --color: var(--White);
    --border-color: var(--purple6);
    --bg-color: var(--purple6);

    --hover-color: var(--White);
    --hover-border-color: var(--purple7);
    --hover-bg-color: var(--purple7);

    --pressed-color: var(--White);
    --pressed-border-color: var(--purple8);
    --pressed-bg-color: var(--purple8);

    --focus-color: var(--White);
    --focus-bg-color: var(--purple8);
    --focus-border-color: var(--purple9);
  `,
  secondary: css`
    --color: var(--purple7);
    --border-color: var(--purple6);
    --bg-color: var(--White);

    --hover-color: var(--purple6);
    --hover-border-color: var(--purple7);
    --hover-bg-color: var(--purple1);

    --pressed-color: var(--purple6);
    --pressed-border-color: var(--purple8);
    --pressed-bg-color: var(--purple1);

    --focus-color: var(--purple6);
    --focus-border-color: var(--purple8);
    --focus-bg-color: var(--White);
  `,
  outlined: css`
    --color: var(--Gray9);
    --border-color: var(--Gray3);
    --bg-color: var(--White);

    --hover-color: var(--Gray9);
    --hover-border-color: var(--Gray3);
    --hover-bg-color: var(--Gray1);

    --pressed-color: var(--Gray9);
    --pressed-border-color: var(--Gray3);
    --pressed-bg-color: var(--Gray1);

    --focus-color: var(--Gray9);
    --focus-border-color: var(--Gray5);
    --focus-bg-color: var(--White);
  `,
  plus: css`
    --border-color: var(--Gray5);
    --bg-color: var(--Gray5);

    --hover-border-color: var(--Gray6);
    --hover-bg-color: var(--Gray6);

    --pressed-border-color: var(--Gray7);
    --pressed-bg-color: var(--Gray7);

    --focus-border-color: var(--Gray8);
    --focus-bg-color: var(--Gray7);

    --padding: 1.6rem;
    --border-radius: 10rem;
  `,
  trash: css`
    --border-color: var(--Gray3);
    --bg-color: var(--White);

    --hover-border-color: var(--Gray3);
    --hover-bg-color: var(--Gray1);

    --pressed-border-color: var(--Gray3);
    --pressed-bg-color: var(--Gray1);

    --focus-border-color: var(--Gray5);
    --focus-bg-color: var(--White);

    --padding: 0.6rem;
    --border-radius: 0.6rem;
  `,
  error: css`
    --color: var(--White);
    --border-color: var(--Error2);
    --bg-color: var(--Error2);

    --hover-color: var(--White);
    --hover-border-color: var(--Error1);
    --hover-bg-color: var(--Error1);

    --pressed-color: var(--White);
    --pressed-border-color: var(--Error3);
    --pressed-bg-color: var(--Error3);

    --focus-color: var(--White);
    --focus-bg-color: var(--Error3);
    --focus-border-color: var(--Error3);
  `,
};

export const SELECTED = {
  color: "색깔",
  image: "이미지",
};
