/**
 * The CoreX lockup.
 *
 * The word "CORE" is closed by the brand's X mark rather than by a letter from
 * the typeface, so the mark and the wordmark are one object: the icon variant
 * is literally the part of the lockup that survives at 16px. The two diagonals
 * are deliberately not the same weight of colour - the ink stroke is drawn over
 * the lime one - which gives the X a lit edge instead of reading as a pair of
 * crossing lines, and keeps the lime accent that the rest of the page uses as
 * its only highlight.
 *
 * `currentColor` carries the ink stroke, so the mark inverts by inheriting the
 * text colour of whatever surface it sits on; the lime is fixed because it is
 * the one brand constant that does not change between paper and ink.
 */
const Logo = ({ className = "", wordmark = true, label = "CoreX" }) => (
  <span
    role="img"
    aria-label={label}
    className={`inline-flex items-center font-bebas-neue leading-none select-none ${className}`}
  >
    {wordmark && "CORE"}
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${
        wordmark ? "w-[0.74em] h-[0.74em] ml-[0.1em]" : "w-[1em] h-[1em]"
      }`}
    >
      <g strokeLinecap="butt">
        {/* Drawn first, so the ink stroke clips it at the crossing. */}
        <line x1="21" y1="3" x2="3" y2="21" stroke="#CCFF00" strokeWidth="3.8" />
        <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="3.8" />
      </g>
    </svg>
  </span>
);

export default Logo;
