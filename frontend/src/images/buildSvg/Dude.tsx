import * as React from "react";

function SvgDude(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={143}
      height={167}
      viewBox="0 0 37.835 44.185"
      {...props}
    >
      <path
        className="dude_svg__circle"
        d="M37.766 19.086a18.817 18.954 0 01-18.817 18.953A18.817 18.954 0 01.132 19.086 18.817 18.954 0 0118.95.132a18.817 18.954 0 0118.817 18.954z"
      />
      <path
        className="dude_svg__body"
        d="M33.36 44.112s-.432-4.024-2.27-8.01c-1.836-3.988-5.401-7.976-12.317-7.976-6.875 0-10.076 4.21-11.703 7.984-1.734 4.025-2.294 7.984-2.294 7.984l3.25.037s.193-3.088 1.663-6.379c1.506-3.372 4.252-6.672 9.21-6.604 4.957.069 8.163 3.435 9.62 6.652 1.301 2.873 1.746 6.312 1.746 6.312z"
      />
      <path
        className="dude_svg__head"
        d="M19.077 5.539a9.682 9.641 0 00-9.682 9.641 9.682 9.641 0 009.682 9.641 9.682 9.641 0 009.682-9.641 9.682 9.641 0 00-9.682-9.641zm0 3.286a6.532 6.354 0 016.532 6.355 6.532 6.354 0 01-6.532 6.354 6.532 6.354 0 01-6.533-6.354 6.532 6.354 0 016.533-6.355z"
      />
    </svg>
  );
}

export default SvgDude;
