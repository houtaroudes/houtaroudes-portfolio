import { flushSync } from "react-dom";

/*
 * The light and dark change arrives as a circle that starts at the toggle the
 * user pressed and grows past the furthest corner of the viewport, because the
 * theme change runs inside a View Transition whose new snapshot is clipped by
 * that circle. Without View Transitions, or under reduced motion, the switch is
 * instant, which is what those settings ask for.
 *
 * The size is computed from the button's own centre: the radius has to reach
 * whichever corner is furthest away, or the sweep would finish short and the
 * last strip of the page would snap instead of wiping.
 */
export function switchTheme(next, originEl, apply) {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.startViewTransition || reduce) {
    apply(next);
    return;
  }

  const rect = originEl?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  root.style.setProperty("--sweep-x", `${x}px`);
  root.style.setProperty("--sweep-y", `${y}px`);
  root.style.setProperty("--sweep-r", `${radius}px`);
  root.dataset.themeSweep = "on";

  let applied = false;
  const applyOnce = () => {
    if (applied) return;
    applied = true;
    /* flushSync, because React would otherwise batch the state change past the
       callback and the transition would photograph the old theme twice. */
    flushSync(() => apply(next));
  };

  const settle = () => {
    delete root.dataset.themeSweep;
    root.style.removeProperty("--sweep-x");
    root.style.removeProperty("--sweep-y");
    root.style.removeProperty("--sweep-r");
    /* A transition can be aborted before its update callback runs (a hidden
       tab does exactly this). Without this the toggle would quietly do
       nothing, so the theme is applied plainly instead. */
    if (!applied) applyOnce();
  };

  const transition = document.startViewTransition(applyOnce);
  /* then(settle, settle) rather than finally: an aborted transition rejects,
     and finally would hand that rejection on as an unhandled one. */
  transition.finished.then(settle, settle);
}
