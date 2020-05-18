// @flow
import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import { Fade } from '@partial-ui/transitions';
import { StandardProps } from '../types';
import { TransitionProps } from '@partial-ui/transitions';

export interface BackdropProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible?: boolean;
  /**
   * If `true`, the backdrop is open.
   */
  open: boolean;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout?: TransitionProps['timeout'];
}
const classes = {
  root: 'Backdrop',
};

const BackdropStyled = styled.div`
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: -1;
  position: fixed;
  touch-action: none;
`;

export const BackdropLight = styled.div<{ invisible?: boolean }>`
  background-color: ${({ invisible }) =>
    invisible ? 'transparent' : 'rgba(255,255,255,0.75)'};
`;

export const BackdropDark = styled.div<{ invisible?: boolean }>`
  background-color: ${({ invisible }) =>
    invisible ? 'transparent' : 'rgba(50,50,50,0.65)'};
`;

const Backdrop = React.forwardRef<any, BackdropProps>((props, ref) => {
  const { open, timeout, invisible = false, className, ...rest } = props;

  return (
    <Fade in={open} timeout={timeout} {...rest}>
      <BackdropStyled
        as={BackdropDark}
        className={clsx(className, classes.root)}
        aria-hidden
        // @ts-ignore
        invisible={invisible}
      />
    </Fade>
  );
});

export { Backdrop, classes as backdropClasses };
