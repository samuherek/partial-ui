import clsx from 'clsx';
import React from 'react';
import styled from 'styled-components';
import { useForkRef } from '@partial-ui/utils';
import { Transition } from 'react-transition-group';

export interface SnackbarProps {
  autoHideDuration?: number;
  children?: React.ReactNode;
  className?: string;
  disableWindowBlurListener?: boolean;
  message?: string;
  onClose?: () => void;
  onMouseEnter?: (ev: any) => void;
  onMouseLeave?: (ev: any) => void;
  open?: boolean;
  resumeHideDuration?: number;
  TransitionComponent?: any;
  transitionDuration?: number;
}

const classes = {
  root: 'Snackbar',
};

const WrapStyled = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1400;

  left: 50%;
  right: auto;
  bottom: 24px;
  transform: translateX(-50%);
`;

// TODO: we use this in the Popover as well.
const DefaultTransitionComponent = React.forwardRef<any, any>(function(
  props,
  ref
) {
  const {
    children,
    in: inProp,
    onEnter,
    onExit,
    onExited,
    onEntering,
    timeout = 0,
    ...rest
  } = props;

  const handleRef = useForkRef(children?.ref, ref);

  return (
    <Transition
      appear
      in={inProp}
      onEnter={onEnter}
      onExit={onExit}
      onExited={onExited}
      onEntering={onEntering}
      timeout={timeout}
      {...rest}
    >
      {(_: any, childProps: any) => {
        return React.cloneElement(children, { ref: handleRef, ...childProps });
      }}
    </Transition>
  );
});

function useSnackbarCore(props: SnackbarProps, ref: React.Ref<any>) {
  const {
    autoHideDuration = 3000,
    disableWindowBlurListener = false,
    onClose,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
  } = props;

  const timerAutoHide = React.useRef();
  const [exited, setExited] = React.useState(true);

  const setAutoHideTimer = React.useCallback(
    autoHideDurationParam => {
      const autoHideDurationBefore =
        autoHideDurationParam != null
          ? autoHideDurationParam
          : autoHideDuration;

      if (!onClose || autoHideDuration == null) {
        return;
      }

      clearTimeout(timerAutoHide.current);
      // @ts-ignore
      timerAutoHide.current = setTimeout(() => {
        const autoHideDurationAfter =
          autoHideDurationParam != null
            ? autoHideDurationParam
            : autoHideDuration;
        if (!onClose || autoHideDurationAfter == null) {
          return;
        }
        onClose();
      }, autoHideDurationBefore);
    },
    [autoHideDuration, onClose]
  );

  React.useEffect(() => {
    if (open) {
      // @ts-ignore
      setAutoHideTimer();
    }

    return () => {
      clearTimeout(timerAutoHide.current);
    };
  }, [open, setAutoHideTimer]);

  function handlePause() {
    clearTimeout(timerAutoHide.current);
  }

  const handleResume = React.useCallback(() => {
    if (typeof autoHideDuration === 'number') {
      if (typeof resumeHideDuration === 'number') {
        setAutoHideTimer(resumeHideDuration);
        return;
      }
      setAutoHideTimer(autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);

  function handleMouseEnter(ev: any) {
    if (onMouseEnter) {
      onMouseEnter(ev);
    }

    handlePause();
  }

  function handleMouseLeave(ev: any) {
    if (onMouseLeave) {
      onMouseLeave(ev);
    }

    handleResume();
  }

  function handleExited() {
    setExited(true);
  }

  function handleEnter() {
    setExited(false);
  }

  React.useEffect(() => {
    if (!disableWindowBlurListener && open) {
      window.addEventListener('focus', handleResume);
      window.addEventListener('blur', handlePause);

      return () => {
        window.removeEventListener('focus', handleResume);
        window.removeEventListener('blur', handlePause);
      };
    }
    return undefined;
  }, [disableWindowBlurListener, handleResume, open]);

  return {
    props: {
      ...props,
    },
    ref,
    state: {
      exited,
    },
    handleMouseEnter,
    handleMouseLeave,
    handleExited,
    handleEnter,
  };
}

// TODO: This needs to be worked out correctly. There are still some bugs in appear and
// disappear transition as well as hovering over doesn't actually pauses it.
const Snackbar = React.forwardRef<any, SnackbarProps>(function Snackbar(p, r) {
  const {
    props: {
      open,
      className,
      children,
      transitionDuration,
      TransitionComponent = DefaultTransitionComponent,
      ...rest
    },
    ref,
    state,
    handleMouseEnter,
    handleMouseLeave,
    handleEnter,
    handleExited,
  } = useSnackbarCore(p, r);

  // So we only render active snackbars.
  if (!open && state.exited) {
    return null;
  }

  return (
    <WrapStyled
      className={clsx(className, classes.root)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={ref}
      {...rest}
    >
      <TransitionComponent
        appear
        in={open}
        onEnter={handleEnter}
        onExit={handleExited}
        duration={transitionDuration}
      >
        {children}
      </TransitionComponent>
    </WrapStyled>
  );
});

export { Snackbar, classes as SnackbarClasses };
