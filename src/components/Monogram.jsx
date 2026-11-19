/* The favicon's two-tone B, drawn inline so a lockup never waits on an image
   request and never flashes an empty plate. */
export default function Monogram({ size = 40 }) {
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
