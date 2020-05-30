import React from 'react';
import { InputLabel } from '../InputLabel';
import { InputBaseProps, InputBase } from '../InputBase';
import { FormControl } from '@partial-ui/core';

// TODO: for whatever reason it wants me to pass "CSS" property as required
export interface TextFieldProps extends InputBaseProps {
  error?: boolean;
  FormHelperTextProps?: object;
  helperText?: React.ReactNode;
  InputLabelProps?: object;
  inputProps?: object;
  focused?: boolean;
  inputRef?: React.Ref<any>;
  label?: string;
  select?: boolean;
  SelectProps?: object;
  value: any;
  variant?: 'standard';
  startAdornment?: any;
  endAdornment?: any;
}

const TextField = React.forwardRef<any, TextFieldProps>(function TextField(
  props,
  ref
) {
  const {
    autoComplete,
    autoFocus,
    // children,
    className,
    defaultValue,
    endAdornment,
    error = false,
    // FormHelperTextProps,
    focused = false,
    helperText,
    id,
    // InputLabelProps,
    inputProps,
    inputRef,
    label,
    multiline,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    rows,
    disabled = false,
    select = false,
    // SelectProps,
    startAdornment,
    type,
    value,
    // variant = 'standard',
    // ...rest
  } = props;

  // warning(
  //   !select || !children,
  //   'Nexoya: `select` is not implemented for `TextField` just yet'
  // );

  const InputMore = {};

  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;

  return (
    <FormControl
      error={error}
      focused={focused}
      // @ts-ignore
      ref={ref}
      disabled={disabled}
      className={className}
      required={required}
      // {...rest}
    >
      {!label ? null : <InputLabel htmlFor={id || name}>{label}</InputLabel>}
      {select ? null : (
        <InputBase
          aria-describedby={helperTextId}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          defaultValue={defaultValue}
          multiline={multiline}
          name={name}
          rows={rows}
          inputRef={inputRef}
          type={type}
          value={value}
          id={id || name}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          inputProps={inputProps}
          startAdornment={startAdornment}
          endAdornment={endAdornment}
          // required={required}
          {...InputMore}
        />
      )}
      {/* {!helperText ? null : (
          <FormHelperText id={helperTextId}>{helperText}</FormHelperText>
        )} */}
    </FormControl>
  );
});

export { TextField };
