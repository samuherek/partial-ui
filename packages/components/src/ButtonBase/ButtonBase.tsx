import clsx from 'clsx';
import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import { BaseProps } from '@partial-ui/core';

export interface ButtonBaseProps extends BaseProps {
  onClick?: any;
  component?: React.ReactNode;
  to?: string;
  disabled?: boolean;
  tabIndex?: string | number;
  href?: string;
  type?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const classes = {
  root: 'ButtonBase',
};

const ButtonBaseStyled = styled.button`
  color: inherit;
  cursor: pointer;
  margin: 0;
  border: 0;
  display: inline-flex;
  position: relative;
  user-select: none;
  align-items: center;
  border-radius: 0;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  font: inherit;
  padding: 0;
  outline: none;

  &:disabled,
  &:disabled:hover,
  &:disabled:active,
  &.disabled,
  &.disabled:hover,
  &.disabled:active {
    cursor: default;
    pointer-events: none;
  }
`;

const ButtonBase = React.forwardRef<any, ButtonBaseProps>(function ButtonBase(
  props,
  ref
) {
  const {
    children,
    component: componentProp = 'button',
    tabIndex = '0',
    className,
    disabled,
    onClick,
    startAdornment,
    endAdornment,
    ...other
  } = props;

  let Component = componentProp;

  if (Component === 'button' && other.href) {
    Component = 'a';
  }

  const buttonProps: any = {};

  if (Component === 'button') {
    buttonProps.type = other.type;
    buttonProps.disabled = disabled;
  } else {
    if (Component !== 'a' || !other.href) {
      buttonProps.role = 'button';
    }
  }

  function handleClick(ev: SyntheticEvent<any>) {
    ev.currentTarget.blur();

    if (typeof onClick === 'function') {
      onClick(ev);
    }
  }

  return (
    <ButtonBaseStyled
      onClick={handleClick}
      as={Component}
      ref={ref}
      // @ts-ignore
      target={other && other.withNewTab ? '_blank' : null}
      className={clsx(className, classes.root)}
      {...buttonProps}
      {...other}
    >
      {startAdornment}
      {children}
      {endAdornment}
    </ButtonBaseStyled>
  );
});

export { ButtonBase, classes as buttonBaseClasses };
