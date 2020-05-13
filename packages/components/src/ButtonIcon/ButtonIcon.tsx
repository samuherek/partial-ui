import clsx from 'clsx';
import styled from 'styled-components';
import { ButtonBase, ButtonBaseProps } from '../ButtonBase';
import React from 'react';

export interface ButtonIconProps
  extends ButtonBaseProps,
    Omit<ButtonBaseProps, 'startAdornment' | 'endAdornment'> {
  children: any;
  className?: string;
  active?: boolean;
}

const classes = {
  root: 'ButtonIcon',
  label: 'label',
  active: 'active',
};

const ButtonBaseStyled = styled(ButtonBase)`
  text-align: center;
  flex: 0 0 auto;
  overflow: visible;
`;

const ButtonLabel = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ButtonIcon = React.forwardRef<any, ButtonIconProps>(function ButtonIcon(
  props,
  ref
) {
  const { children, className, active = false, ...rest } = props;

  return (
    <ButtonBaseStyled
      ref={ref}
      className={clsx(className, classes.root, {
        [classes.active]: active,
      })}
      {...rest}
    >
      <ButtonLabel className={classes.label}>{children}</ButtonLabel>
    </ButtonBaseStyled>
  );
});

export { ButtonIcon, classes as ButtonIconClasses };
