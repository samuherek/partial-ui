import React from "react";
import styled from "styled-components";
import ButtonBase from "../ButtonBase";
import { useForkRef } from "../../utils/ref";

export interface InputFileProps extends React.HTMLProps<HTMLInputElement> {
  id: string;
  labelProps?: Object;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const LabelStyled = styled.label`
  input {
    margin: 0;
    opacity: 0;
    position: absolute;
    width: 0;
    height: 0;
  }

  .ButtonBase {
    padding: 8px;

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const InputFile = React.forwardRef<any, InputFileProps>(function InputFile(
  props,
  ref
) {
  const {
    id,
    labelProps,
    children,
    onMouseEnter,
    onMouseLeave,
    ...rest
  } = props;
  const inputRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(inputRef, ref);

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <LabelStyled
      htmlFor={id}
      ref={handleRef}
      {...labelProps}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input type="file" id={id} name={id} {...rest} />
      <ButtonBase onClick={handleClick}>{children}</ButtonBase>
    </LabelStyled>
  );
});

export default InputFile;
