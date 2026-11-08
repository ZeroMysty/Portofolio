'use client';

interface ZigzagPatternProps {
  className?: string;
  opacity?: number;
}

export default function ZigzagPattern({
  className = '',
  opacity = 0.08,
}: ZigzagPatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}
      style={{ opacity }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1600 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Mask lembut di area tengah agar tidak bertabrakan dengan Logo 3D & teks utama */}
          <radialGradient id="center-fade" cx="50%" cy="48%" r="45%">
            <stop offset="0%" stopColor="white" stopOpacity="0.25" />
            <stop offset="55%" stopColor="white" stopOpacity="0.65" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </radialGradient>
          <mask id="subtle-mask">
            <rect width="1600" height="1000" fill="url(#center-fade)" />
          </mask>
        </defs>

        <g mask="url(#subtle-mask)">
          {/* ============================================================ */}
          {/* JALUR 1: Paling Atas (Navbar) - Acak, Menukik Tajam & Duri Asimetris */}
          {/* ============================================================ */}
          <polygon
            points="-80,70 140,-30 210,120 310,20 490,140 680,-40 790,95 990,-25 1120,130 1290,-10 1440,115 1680,-20 1680,2 1440,135 1290,10 1120,150 990,-5 790,115 680,-20 490,160 310,40 210,140 140,-10 -80,90"
            fill="currentColor"
          />

          {/* ============================================================ */}
          {/* JALUR 2: Pita Poligon Tajam dengan Ketebalan Kontras (Thick Wedge) */}
          {/* ============================================================ */}
          <polygon
            points="-80,240 70,110 240,320 390,80 430,360 610,190 730,380 910,120 1060,340 1250,90 1370,360 1520,140 1680,310 1680,332 1520,162 1370,382 1250,112 1060,362 910,142 730,402 610,212 430,382 390,102 240,342 70,132 -80,262"
            fill="currentColor"
          />

          {/* ============================================================ */}
          {/* JALUR 3: Garis Menukik Vertikal Ekstrem (Lightning Fractures) */}
          {/* ============================================================ */}
          <path
            d="M-80 390 L160 180 L290 530 L360 210 L540 590 L710 160 L840 540 L1020 220 L1180 580 L1310 190 L1490 530 L1680 270"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinejoin="miter"
            strokeMiterlimit="12"
          />

          {/* ============================================================ */}
          {/* JALUR 4: Poligon Zigzag Tebal Bertaring (Sharp Wedges & Shards) */}
          {/* ============================================================ */}
          <polygon
            points="-80,510 110,640 270,380 340,690 520,410 690,720 860,360 1010,710 1140,430 1330,730 1470,390 1680,680 1680,705 1470,415 1330,755 1140,455 1010,735 860,385 690,745 520,435 340,715 270,405 110,665 -80,535"
            fill="currentColor"
          />

          {/* ============================================================ */}
          {/* JALUR 5: Garis Bawah - Sudut Variatif Asimetris */}
          {/* ============================================================ */}
          <path
            d="M-80 720 L180 870 L310 630 L480 920 L660 670 L810 940 L970 630 L1150 930 L1280 680 L1460 920 L1680 690"
            stroke="currentColor"
            strokeWidth="16"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
          />

          {/* ============================================================ */}
          {/* JALUR 6: Dasar Bawah dengan Poligon Bergerigi */}
          {/* ============================================================ */}
          <polygon
            points="-80,880 90,760 260,990 420,780 590,1020 780,810 940,1020 1110,830 1290,1010 1440,820 1680,970 1680,995 1440,845 1290,1035 1110,855 940,1045 780,835 590,1045 420,805 260,1015 90,785 -80,905"
            fill="currentColor"
          />

          {/* ============================================================ */}
          {/* AKSEN SPORADIK: Belati & Garis Silang Tajam (Sharp Spikes) */}
          {/* ============================================================ */}
          <path
            d="M190 280 L290 530 L390 80"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinejoin="miter"
            strokeMiterlimit="8"
          />
          <path
            d="M1250 90 L1370 360 L1490 530"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinejoin="miter"
            strokeMiterlimit="8"
          />
        </g>
      </svg>
    </div>
  );
}
