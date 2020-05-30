import clsx from 'clsx';
import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { isFilled } from './utils';
import {
  InputCoreProps,
  useFormControlCtx,
  mergeFormControlState,
} from '@partial-ui/core';
import { useForkRef } from '@partial-ui/utils';

// TODO: not sure why it does not correctly extends the input core props
export interface InputBaseProps extends InputCoreProps {
  'aria-describedby'?: string;
  inputProps?: object;
  wrapProps?: object;
  defaultValue?: any;
  error?: boolean;
  multiline?: boolean;
  inputRef?: any;
  startAdornment?: any;
  endAdornment?: any;
  name: string;
  onEmpty?: () => void;
  onFilled?: () => void;
  // TODO: these are the repeated props that should come from input core
  autoComplete?: string;
  autoFocus?: boolean;
  className?: string;
  disabled?: boolean;
  id: string;
  onBlur?: (
    ev?: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onChange?: (
    ev: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onClick?: (
    ev: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onFocus?: (
    ev: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onKeyDown?: (ev: SyntheticEvent<any>) => void;
  onKeyUp?: (ev: SyntheticEvent<any>) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  rows?: number;
  type?: string;
  value?: any;
}

const classes = {
  root: 'InputWrap',
  input: 'InputBase',
  disabled: 'disabled',
  error: 'error',
  focused: 'focused',
  filled: 'filled',
  prefix: 'input-prefix',
  suffix: 'input-suffix',
};

const WrapStyled = styled.div`
  cursor: text;
  display: inline-flex;
  align-items: center;
  position: relative;

  &.disabled {
    cursor: default;
    pointer-events: none;
  }
`;

const InputBaseStyled = styled.input`
  background: none;
  border: 0;
  box-sizing: content-box;
  color: currentColor;
  display: block;
  font: inherit;
  margin: 0;
  min-width: 0;
  padding: 0;
  width: 100%;
  -webkit-tap-highlight-color: transparent;
  outline: none;

  &:disabled,
  &:disabled:hover,
  &.disabled,
  &.disabled:hover {
    cursor: default;
    pointer-events: none;
  }

  /*
  &:invalid {
    box-shadow: none;
  }
  */
  /*
  &::-webkit-search-decoration: {
    -webkit-appearance: none;
  } */

  &[type='search'] {
    -moz-appearance: textfield;
    -webkit-appearance: textfield;
  }
`;

const InputBase = React.forwardRef<any, InputBaseProps>(function InputBase(
  props,
  ref
) {
  const {
    'aria-describedby': ariaDescribedby,
    // onEmpty,
    // onFilled,
    // renderPrefix,
    autoComplete,
    autoFocus = false,
    className,
    inputProps: inputPropsProp = {},
    wrapProps = { as: 'div' },
    defaultValue,
    disabled = false,
    error = false,
    id,
    multiline = false,
    name,
    onBlur,
    onChange,
    onClick,
    inputRef: inputRefProp,
    onFocus,
    onEmpty,
    onFilled,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly = false,
    // required = false,
    startAdornment,
    endAdornment,
    rows,
    type = 'text',
    value,
    ...rest
  } = props;
  const ctxFormControl = useFormControlCtx();
  const [focused, setFocused] = React.useState(false);
  const { current: isControlled } = React.useRef(value != null);

  const inputRef = React.useRef(null);
  const handleInputRef = useForkRef(inputRef, inputRefProp);

  const fcs: any = mergeFormControlState({
    props,
    uiFormControlCtx: ctxFormControl,
    states: ['disabled', 'error', 'required', 'filled'],
  });
  fcs.focused = ctxFormControl ? ctxFormControl.focused : focused;

  // The blur won't fire when the disabled state is set on a focused input.
  // We need to book keep the focused state manually.
  React.useEffect(() => {
    if (!ctxFormControl && disabled && focused) {
      setFocused(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [ctxFormControl, disabled, focused, onBlur]);

  const checkDirty = React.useCallback(
    obj => {
      if (isFilled(obj)) {
        if (ctxFormControl && ctxFormControl.onFilled) {
          ctxFormControl.onFilled();
        }
        if (onFilled) {
          onFilled();
        }
        return;
      }

      if (ctxFormControl && ctxFormControl.onEmpty) {
        ctxFormControl.onEmpty();
      }
      if (onEmpty) {
        onEmpty();
      }
    },
    [ctxFormControl, onEmpty, onFilled]
  );

  React.useEffect(() => {
    if (isControlled) {
      checkDirty({ value });
    }
  }, [value, checkDirty, isControlled]);

  React.useEffect(() => {
    if (!isControlled) {
      checkDirty(inputRef.current);
    }
  }, [checkDirty, isControlled]);

  const handleFocus = (ev: SyntheticEvent<any>) => {
    if (fcs.disabled || disabled) {
      ev.stopPropagation();
      return;
    }

    if (onFocus) {
      onFocus(ev);
    }

    if (ctxFormControl && ctxFormControl.onFocus) {
      ctxFormControl.onFocus();
    } else {
      setFocused(true);
    }
  };

  const handleBlur = (ev: SyntheticEvent<any>) => {
    if (onBlur) {
      onBlur(ev);
    }

    if (ctxFormControl && ctxFormControl.onBlur) {
      ctxFormControl.onBlur();
    } else {
      setFocused(false);
    }
  };

  const handleChange = (ev: SyntheticEvent<any>, ...args: any) => {
    if (onChange) {
      // @ts-ignore
      onChange(ev, ...args);
    }
  };

  const handleClick = (ev: SyntheticEvent<any>) => {
    if (inputRef.current && ev.currentTarget === ev.target) {
      // @ts-ignore
      inputRef.current.focus();
    }
    if (onClick) {
      onClick(ev);
    }
  };

  const inputProps: any = {
    ...inputPropsProp,
    as: 'input',
  };

  inputProps.ref = handleInputRef;

  if (multiline || rows) {
    inputProps.as = 'textarea';
    inputProps.type = undefined;
  }

  return (
    <WrapStyled
      ref={ref}
      onClick={handleClick}
      className={clsx(className, classes.root, {
        [classes.disabled]: fcs.disabled,
        [classes.error]: fcs.error,
        [classes.focused]: fcs.focused,
        [classes.filled]: fcs.filled,
        [classes.prefix]: startAdornment,
        [classes.suffix]: endAdornment,
      })}
      {...wrapProps}
    >
      {startAdornment}
      <InputBaseStyled
        className={clsx(classes.input, {
          [classes.disabled]: fcs.disabled,
          [classes.prefix]: startAdornment,
          [classes.suffix]: endAdornment,
        })}
        aria-describedby={ariaDescribedby}
        aria-invalid={error}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        disabled={fcs.disabled}
        id={id}
        name={name}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        value={value}
        type={type}
        ref={inputRef}
        required={fcs.required}
        {...inputProps}
        {...rest}
      />
      {endAdornment}
    </WrapStyled>
  );
});

export { InputBase, classes as InputBaseClasses };
