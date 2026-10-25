/* SVG icons. Apple logo, search, bag and back paths are copied from apple.com's global nav. */

type IconProps = { className?: string };

export function AppleLogo({ className }: IconProps) {
  return (
    <svg className={className} height="44" viewBox="0 0 14 44" width="14" aria-hidden="true">
      <path
        fill="currentColor"
        d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z"
      />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg className={className} width="15" height="44" viewBox="0 0 15 44" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.298,27.202l-3.87-3.87c0.701-0.929,1.122-2.081,1.122-3.332c0-3.06-2.489-5.55-5.55-5.55c-3.06,0-5.55,2.49-5.55,5.55 c0,3.061,2.49,5.55,5.55,5.55c1.251,0,2.403-0.421,3.332-1.122l3.87,3.87c0.151,0.151,0.35,0.228,0.548,0.228 s0.396-0.076,0.548-0.228C14.601,27.995,14.601,27.505,14.298,27.202z M1.55,20c0-2.454,1.997-4.45,4.45-4.45 c2.454,0,4.45,1.997,4.45,4.45S8.454,24.45,6,24.45C3.546,24.45,1.55,22.454,1.55,20z"
      />
    </svg>
  );
}

export function BagIcon({ className }: IconProps) {
  return (
    <svg className={className} height="44" viewBox="0 0 14 44" width="14" aria-hidden="true">
      <path
        fill="currentColor"
        d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"
      />
    </svg>
  );
}

export function BackIcon({ className }: IconProps) {
  return (
    <svg className={className} height="48" viewBox="0 0 9 48" width="9" aria-hidden="true">
      <path
        fill="currentColor"
        d="m1.5618 24.0621 6.5581-6.4238c.2368-.2319.2407-.6118.0088-.8486-.2324-.2373-.6123-.2407-.8486-.0088l-7 6.8569c-.1157.1138-.1807.2695-.1802.4316.001.1621.0674.3174.1846.4297l7 6.7241c.1162.1118.2661.1675.4155.1675.1577 0 .3149-.062.4326-.1846.2295-.2388.2222-.6187-.0171-.8481z"
      />
    </svg>
  );
}

/** Two-line burger that morphs into an × (apple.com animates the same two polylines). */
export function MenuIcon({ open, className }: IconProps & { open: boolean }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={open ? "3.5 15, 15 3.5" : "2 12, 16 12"}
      />
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={open ? "3.5 3.5, 15 15" : "2 5, 16 5"}
      />
    </svg>
  );
}

/** Right-pointing chevron; rotate/flip it with the caller's class (RTL flips "next"). */
export function ChevronIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 36 36" width="36" height="36" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" d="M15 11l7 7-7 7" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <circle cx="12" cy="12" r="10.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M12 7.5v9M7.5 12h9" />
    </svg>
  );
}

export function PlusPlainIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M10 4v12M4 10h12" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M6 3.8v12.4c0 .7.8 1.1 1.4.7l9.6-6.2c.5-.3.5-1.1 0-1.4L7.4 3.1C6.8 2.7 6 3.1 6 3.8z" />
    </svg>
  );
}

export function PauseIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <rect x="5" y="3.5" width="3.2" height="13" rx="1" fill="currentColor" />
      <rect x="11.8" y="3.5" width="3.2" height="13" rx="1" fill="currentColor" />
    </svg>
  );
}

export function ReplayIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" d="M4.5 10a5.5 5.5 0 1 0 1.8-4.1" />
      <path fill="currentColor" d="M3.6 3.4v4.2h4.2z" />
    </svg>
  );
}

export function PlayCircleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 17 17" width="17" height="17" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="7.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path fill="currentColor" d="M6.8 5.4v6.2l4.9-3.1z" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export function SelectChevron({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 21 21" width="21" height="21" aria-hidden="true">
      <path
        fill="currentColor"
        d="m10.5 14.4639c.2051 0 .4004-.0781.5469-.2344l4.4336-4.4531c.1367-.1367.2051-.3125.2051-.5078 0-.4102-.3223-.7324-.7227-.7324-.1953 0-.3906.0879-.5273.2246l-3.9355 3.9453-3.9355-3.9453c-.1367-.1367-.3223-.2246-.5273-.2246-.4004 0-.7227.3223-.7227.7324 0 .1953.0781.3711.2051.5078l4.4336 4.4531c.166.1562.3418.2344.5469.2344z"
      />
    </svg>
  );
}
