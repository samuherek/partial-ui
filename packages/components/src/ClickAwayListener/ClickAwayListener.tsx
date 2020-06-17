// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useForkRef, setRef } from '@partial-ui/utils';

interface ClickAwayListenerProps {
  children: any;
  mouseEvent: 'onClick' | 'onMouseDown' | 'onMouseUp' | false;
  onClickAway: (ev: any) => void;
}

function ownerDocument(node: any) {
  return (node && node.ownerDocument) || document;
}

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function useEventCallback(fn: any) {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  // @ts-ignore
  return React.useCallback((...args) => (0, ref.current)(...args), []);
}

function mapEventPropToEvent(eventProp: any) {
  return eventProp.substring(2).toLowerCase();
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */
const ClickAwayListener = React.forwardRef(function ClickAwayListener(
  props: ClickAwayListenerProps,
  ref
) {
  const { children, mouseEvent = 'onClick', onClickAway } = props;

  const nodeRef = React.useRef(null);
  const mountedRef = React.useRef(false);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleNodeRef = useForkRef(nodeRef, ref);
  // can be removed once we drop support for non ref forwarding class components
  const handleOwnRef = React.useCallback(
    instance => {
      // #StrictMode ready
      // $FlowFixMe
      setRef(handleNodeRef, ReactDOM.findDOMNode(instance));
    },
    [handleNodeRef]
  );
  // $FlowFixMe
  const handleRef = useForkRef(children.ref, handleOwnRef);

  const handleClickAway = useEventCallback((event: any) => {
    // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviours like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.

    // IE 11 support, which trigger the handleClickAway even after the unbind
    if (!mountedRef.current) {
      return;
    }

    // The child might render null.
    if (!nodeRef.current) {
      return;
    }

    // Multi window support
    const doc = ownerDocument(nodeRef.current);

    if (
      doc.documentElement &&
      doc.documentElement.contains(event.target) &&
      // @ts-ignore
      !nodeRef.current.contains(event.target)
    ) {
      onClickAway(event);
    }
  });

  React.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = ownerDocument(nodeRef.current);

      doc.addEventListener(mappedMouseEvent, handleClickAway);

      return () => {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }

    return undefined;
  }, [handleClickAway, mouseEvent]);

  // $FlowFixMe
  return (
    <React.Fragment>
      {React.cloneElement(children, { ref: handleRef })}
    </React.Fragment>
  );
});

ClickAwayListener.propTypes = {};

export default ClickAwayListener;
