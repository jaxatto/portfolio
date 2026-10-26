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
  useTransitionStyles,
  type Placement,
} from '@floating-ui/react';
import NameTag, { type NameTagCorner } from '#components/NameTag';
import styles from './Tooltip.module.css';

// The one tooltip for the site (D-103). Wrap an icon-only control:
//   <Tooltip label="Back to top"><button ...>...</button></Tooltip>
// Floating UI places it above the control by default and flips or shifts it when there is no room, so it
// stays on screen at any edge or zoom. Shows on hover (after a short delay) and on keyboard focus,
// stays open while the pointer moves onto it (WCAG 1.4.13: hoverable) and closes with Escape (dismissible).
// It is portaled to <body>, so a themed ancestor (the footer band) cannot recolor it.
// The tooltip is visual only: the control keeps its real accessible name (aria-label or sr-only text),
// so the tooltip is `aria-hidden` and nothing is announced twice. Look: the violet name tag shared with
// the pet photo tags (the NameTag component, D-105, D-107).

type TooltipProps = {
  label: string;
  placement?: Placement;
  offset?: number; // px between the control and the tag (default 0, the tag hugs the control's padding)
  children: React.ReactElement<
    React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> }
  >;
};

// The square corner is the one nearest the control, so it follows the side the tag ends up on.
const cornerFor: Record<string, NameTagCorner> = {
  top: 'bottom-right',
  bottom: 'top-right',
  left: 'top-right',
  right: 'top-left',
};

const Tooltip: React.FC<TooltipProps> = ({
  label,
  placement = 'top-end',
  offset: gap = 0,
  children,
}) => {
  const [open, setOpen] = useState(false);
  // The tooltip is portaled out of its section, so it copies the control's tone (data-tone, src/styles/tone.css,
  // D-109) and wears the section's colors, for example the footer's blue. Read when it opens, not during render.
  const [tone, setTone] = useState<string | undefined>();

  const {
    refs,
    floatingStyles,
    context,
    placement: finalPlacement,
  } = useFloating({
    open,
    onOpenChange: (next) => {
      if (next) {
        const control = refs.domReference.current as HTMLElement | null;
        setTone(control?.closest<HTMLElement>('[data-tone]')?.dataset.tone);
      }
      setOpen(next);
    },
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

  const hover = useHover(context, {
    move: false,
    delay: { open: 700, close: 0 },
    handleClose: safePolygon(),
  });
  const focus = useFocus(context, { visibleOnly: true });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss]);

  const ref = useMergeRefs([refs.setReference, children.props.ref]);

  const side = finalPlacement.split('-')[0];

  // Enters and leaves with a short fade and a 4px drift away from the control. The motion sits on an inner
  // element because the outer one is positioned with a transform. Reduced motion keeps the instant swap.
  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { isMounted, styles: motion } = useTransitionStyles(context, {
    // The durations: --motion-duration-moderate (0.3s) in, 0.2s out.
    duration: reduceMotion ? 0 : { open: 300, close: 200 },
    initial: ({ side: placed }) => ({
      opacity: 0,
      transform: reduceMotion ? 'none' : `translateY(${placed === 'bottom' ? '-4px' : '4px'})`,
    }),
    common: { transitionTimingFunction: 'var(--motion-ease-out)' },
  });
  return (
    <>
      {cloneElement(children, getReferenceProps({ ...children.props, ref }))}
      {isMounted && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className={styles.tooltip}
            style={floatingStyles}
            data-tone={tone}
            aria-hidden="true"
            {...getFloatingProps()}
          >
            <div style={motion}>
              <NameTag corner={cornerFor[side]} className={styles.tag}>
                {label}
              </NameTag>
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default Tooltip;
