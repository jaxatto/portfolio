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
// so the tooltip is `aria-hidden` and nothing is announced twice. Look: the violet name tag shared with
// the pet photo tags (src/styles/name-tag.module.css, D-105).

type TooltipProps = {
  label: string;
  placement?: Placement;
  offset?: number; // px between the control and the tag (default 0, the tag hugs the control's padding)
  children: React.ReactElement<React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }>;
};

const Tooltip: React.FC<TooltipProps> = ({ label, placement = 'top-end', offset: gap = 0, children }) => {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context, placement: finalPlacement } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    // `offset` px off the control. The tag's square corner (its tip) sits over the control's center and the body
    // extends away from it, so a control at the right edge of the page never clips the tag.
    middleware: [
      offset(({ rects }) => ({ mainAxis: gap, alignmentAxis: rects.reference.width / 2 })),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
    ],
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
            data-side={finalPlacement.split('-')[0]}
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
