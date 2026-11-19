import { useEffect, useRef, useState } from "react";
import "./LandingIntro.css";

/*
 * The first paint, in the same beats as the reference portfolio: a drop falls
 * into the cup, a flash, cream ripples spread, the monogram and name rise, then
 * a cream flood wipes the overlay away.
 *
 * The rules the previous intro carried stay: reduced motion skips it, it plays
 * three times a day (counted locally, reset daily), `?intro=1` replays it on
 * demand, and the exit waits for the page to finish loading instead of cutting
 * a half-drawn scene.
 *
 * Timings live in LandingIntro.css; this file only decides when the exit
 * starts. The one number here, HOLD_MS, is where the tagline lands in that
 * stylesheet's sequence.
 */

const KEY_DATE = "v2-intro-date";
const KEY_COUNT = "v2-intro-count";
const PLAYS_PER_DAY = 3;

const HOLD_MS = 1950; // the tagline lands here (1.55s delay + 0.4s)
const EXIT_MS = 1360; // flood 280ms, then the 1s fade with its 320ms delay

/* Ring radii. Each circle is dashed to the length of its own circumference, so
   the ring traces itself outward instead of popping into place. */
const RINGS = [128, 151, 174, 197, 220, 243];
const RING_CENTER = { x: 300, y: 348 };

/* React StrictMode runs effects twice on one page load in development. Without
   this guard a single visit would spend two of the three plays. */
let counted = false;

function isForcedReplay() {
  try {
    return new URLSearchParams(window.location.search).get("intro") === "1";
  } catch {
    return false;
  }
}

function playsToday() {
  try {
    if (localStorage.getItem(KEY_DATE) !== new Date().toDateString()) return 0;
    const n = parseInt(localStorage.getItem(KEY_COUNT) || "0", 10);
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

function registerPlay() {
  if (counted) return;
  counted = true;
  try {
    const today = new Date().toDateString();
    if (localStorage.getItem(KEY_DATE) !== today) {
      localStorage.setItem(KEY_DATE, today);
      localStorage.setItem(KEY_COUNT, "1");
      return;
    }
    localStorage.setItem(KEY_COUNT, String(playsToday() + 1));
  } catch {
    /* Private mode blocks storage; the intro still plays, it just forgets. */
  }
}

function shouldPlay() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  /* A deliberate ?intro=1 replay is a preview, not a visit, so it does not
     spend one of the day's three plays. */
  if (isForcedReplay()) return true;
  if (playsToday() < PLAYS_PER_DAY) {
    registerPlay();
    return true;
  }
  return false;
}

/* The favicon's two-tone B, drawn inline so the lockup never waits on an image
   request and never flashes an empty plate. */
function Monogram({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#13233F" />
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7">
        <path d="M24 19v26" stroke="#E9EDF5" />
        <path d="M24 19h12a6.5 6.5 0 0 1 0 13H24" stroke="#F26B1D" />
        <path d="M24 32h13.5a7 7 0 0 1 0 14H24" stroke="#F26B1D" />
      </g>
    </svg>
  );
}

export default function LandingIntro() {
  const [phase, setPhase] = useState(() => (shouldPlay() ? "playing" : "off"));
  const run = useRef(phase === "playing");

  useEffect(() => {
    if (!run.current) return;
    run.current = false;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const release = () => {
      root.style.overflow = previousOverflow;
    };

    /* The floor keeps the scene from being cut off mid-beat; the load promise
       keeps it from ending before the page behind it can be painted. */
    const floor = new Promise((resolve) => window.setTimeout(resolve, HOLD_MS));
    const painted = new Promise((resolve) => {
      if (document.readyState === "complete") {
        requestAnimationFrame(() => resolve());
        return;
      }
      window.addEventListener("load", () => requestAnimationFrame(() => resolve()), {
        once: true,
      });
    });

    let closed = false;
    Promise.all([floor, painted]).then(() => {
      if (closed) return;
      closed = true;
      setPhase("leaving");
      release();
      window.setTimeout(() => setPhase("off"), EXIT_MS);
    });

    /* No cleanup on purpose: StrictMode re-runs this effect in development and
       the second pass must not cancel the timeline the first one started. */
  }, []);

  if (phase === "off") return null;

  return (
    <div className={`li${phase === "leaving" ? " li--leaving" : ""}`} aria-hidden="true">
      <div className="li__stage" />

      <div className="li__scene">
        <svg className="li__ripple" viewBox="0 0 600 600" role="presentation">
          {RINGS.map((r, i) => (
            <circle
              key={r}
              className={`li__ring li__ring--${i + 1}`}
              cx={RING_CENTER.x}
              cy={RING_CENTER.y}
              r={r}
              strokeDasharray={2 * Math.PI * r}
              strokeDashoffset={2 * Math.PI * r}
            />
          ))}
          <circle
            className="li__ring-accent"
            cx={RING_CENTER.x}
            cy={RING_CENTER.y}
            r="111"
            strokeDasharray="698"
          />
          <circle className="li__flash" cx={RING_CENTER.x} cy={RING_CENTER.y} r="26" />
          <path
            className="li__drop"
            d="M300 292C309 309 318 322 318 334A18 18 0 0 1 282 334C282 322 291 309 300 292Z"
          />
        </svg>
      </div>

      <div className="li__lockup">
        <span className="li__mark">
          <Monogram />
        </span>
        <span className="li__word">BRYAN SACUEZA</span>
        <span className="li__tag">Code, coffee, and curiosity.</span>
      </div>

      <div className="li__flood" />
    </div>
  );
}
