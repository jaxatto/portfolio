import React, { cloneElement, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  type Placement,
} from '@floating-ui/react';
import styles from './Tooltip.module.css';

// The one tooltip for the site (D-103). Wrap an icon-only control:
//   <Tooltip label="Back to top"><button ...>...</button></Tooltip>
// Floating UI places it above the control by default and flips or shifts it when there is no room, so it
// stays on screen at any edge or zoom. Shows on hover (after a short delay) and on keyboard focus,
// stays open while the pointer moves onto it (WCAG 1.4.13: hoverable) and closes with Escape (dismissible).
// It is portaled to <body>, so a themed ancestor (the footer band) cannot recolor it.
// The tooltip is visual only: the control keeps its real accessible name (aria-label or sr-only text),
// so the tooltip is `aria-hidden` and nothing is announced twice. Look: the Figma tooltip, a dark
// rounded tag with white text (black and white in light, near white and black in dark).

type TooltipProps = {
  label: string;
  placement?: Placement;
  children: React.ReactElement<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>;
};

const Tooltip: React.FC<TooltipProps> = ({ label, placement = 'top', children }) => {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
  });

  const hover = useHover(context, { move: false, delay: { open: 120, close: 0 }, handleClose: safePolygon() });
  const focus = useFocus(context, { visibleOnly: true });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss]);

  const ref = useMergeRefs([refs.setReference, children.props.ref]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ...children.props, ref }))}
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className={styles.tooltip}
            style={floatingStyles}
            aria-hidden="true"
            {...getFloatingProps()}
          >
            {label}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;
