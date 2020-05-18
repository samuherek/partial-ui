import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import { StandardProps } from '../types';

export interface PaperProps extends StandardProps<HTMLElement> {
  component?: any;
  elevation?: number;
  children?: React.ReactNode;
}

const classes = {
  root: 'Paper',
  elevation: 'elevation',
};

const PaperStyled = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 0 1 auto;
`;

const Paper = React.forwardRef<unknown, PaperProps>((props, ref) => {
  const {
    className,
    component: Component = PaperStyled,
    elevation = 0,
    ...rest
  } = props;

  return (
    <Component
      ref={ref}
      className={clsx(
        className,
        classes.root,
        `${classes.elevation}-${elevation}`
      )}
      {...rest}
    />
  );
});

export { Paper, classes as paperClasses };
