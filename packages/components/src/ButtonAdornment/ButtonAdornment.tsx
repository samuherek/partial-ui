import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';

export interface ButtonAdornmentProps {
  className?: string;
  component?: any;
  position: 'start' | 'end';
  children: React.ReactNode;
}

const classes = {
  root: 'ButtonAdornment',
  positionStart: 'start',
  positionEnd: 'end',
};

const WrapStyled = styled.span`
  &.start {
    margin-right: 8px;
  }
  &.end {
    margin-left: 8px;
  }
`;

const ButtonAdornment = React.forwardRef<any, ButtonAdornmentProps>(
  function ButtonAdornment(props, ref) {
    const {
      className,
      position,
      component: Component = WrapStyled,
      ...rest
    } = props;

    return (
      <Component
        ref={ref}
        className={clsx(className, classes.root, {
          [classes.positionStart]: position === 'start',
          [classes.positionEnd]: position === 'end',
        })}
        {...rest}
      />
    );
  }
);

export { ButtonAdornment, classes as buttonAdornmentClasses };
