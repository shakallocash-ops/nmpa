export function MinistryMark({
  className = "h-12 w-12",
  src
}: {
  className?: string;
  src?: string | null;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt="Ministry of Nomadic and Pastoral Affairs"
        className={`${className} object-contain`}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 64 72"
      className={className}
      role="img"
      aria-label="Coat of arms of the Ministry of Nomadic and Pastoral Affairs, Niger State"
    >
      <path
        d="M4 4h56v40c0 12-11 20-28 24C15 64 4 56 4 44Z"
        fill="#0B1F33"
      />
      <path
        d="M7 7h50v37c0 10.2-9.3 17.4-25 21C16.3 61.4 7 54.2 7 44Z"
        fill="none"
        stroke="#C6A15B"
        strokeWidth="1.4"
      />
      <path d="M7 7h50v6H7Z" fill="#0B6B4F" />
      <path
        d="M20 46V22h5.5l6.5 13 6.5-13H44v24h-5.5V31.5L32 44l-6.5-12.5V46Z"
        fill="#C6A15B"
      />
      <path
        d="M15 52c6-3.4 28-3.4 34 0"
        fill="none"
        stroke="#C6A15B"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
