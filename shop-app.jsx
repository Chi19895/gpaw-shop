// Gpaw — Cửa hàng / Shop landing — 4 worlds, 4 vibes, 4 animations, Auth & Admin Redesign
// ─────────────────────────────────────────────────────────────────────────────

const { useState, useEffect, useRef } = React;

// ── In-view observer hook ─────────────────────────────────────────────────
function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Track which section is currently dominant (for top-nav theming) ───────
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-100px 0px -40% 0px" }
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [ids.join(",")]);
  return active;
}

// ── Vector Dog Paw Icon — solid fill, claws, color-adaptive ──────────────
// Redesigned to match real dog paw print silhouette reference
const PawIcon = ({ size = 20, color = "#b3242d" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    style={{
      width: size,
      height: size,
      display: "inline-block",
      verticalAlign: "middle",
      flexShrink: 0,
    }}
  >
    {/* Main palm pad — large rounded shape */}
    <path
      d="M50 48C33 48 18 62 18 78C18 85 22 91 29 95C36 99 43 101 50 101C57 101 64 99 71 95C78 91 82 85 82 78C82 62 67 48 50 48Z"
      fill={color}
    />
    {/* Left outer toe */}
    <ellipse cx="18" cy="36" rx="12" ry="17" transform="rotate(-22 18 36)" fill={color} />
    {/* Left inner toe */}
    <ellipse cx="37" cy="24" rx="11" ry="16" transform="rotate(-8 37 24)" fill={color} />
    {/* Right inner toe */}
    <ellipse cx="63" cy="24" rx="11" ry="16" transform="rotate(8 63 24)" fill={color} />
    {/* Right outer toe */}
    <ellipse cx="82" cy="36" rx="12" ry="17" transform="rotate(22 82 36)" fill={color} />
    {/* Claw marks */}
    <path d="M10 16C12 10 16 10 18 16C14 14 12 14 10 16Z" fill={color} />
    <path d="M31 6C33 0 37 0 39 6C35 4 33 4 31 6Z" fill={color} />
    <path d="M61 6C63 0 67 0 69 6C65 4 63 4 61 6Z" fill={color} />
    <path d="M82 16C84 10 88 10 90 16C86 14 84 14 82 16Z" fill={color} />
  </svg>
);

// ── Generic head+shoulders silhouette ─────────────────────────────────────
const SilPolitics = ({ color = "currentColor" }) => (
  <svg viewBox="0 0 120 160" fill={color}>
    <ellipse cx="60" cy="46" rx="30" ry="34" />
    <rect x="50" y="74" width="20" height="14" />
    <path d="M14 160 L22 100 Q30 88 60 88 Q90 88 98 100 L106 160 Z" />
    <polygon points="56,88 64,88 62,118 60,124 58,118" fill="#b3242d" />
  </svg>
);

// ── Anime stylized silhouette ─────────────────────────────────────────────
const SilAnime = ({ color = "#0a0a0a" }) => (
  <svg viewBox="0 0 120 160" fill={color}>
    <path d="M30 60 Q22 18 48 22 Q50 6 64 16 Q76 4 84 22 Q104 18 96 60 Q108 70 100 84 L20 84 Q12 70 30 60 Z" />
    <ellipse cx="60" cy="58" rx="26" ry="28" fill="#fff" stroke={color} strokeWidth="3" />
    <polygon points="50,56 51,62 57,63 52,66 53,72 50,68 47,72 48,66 43,63 49,62" fill={color} />
    <polygon points="70,56 71,62 77,63 72,66 73,72 70,68 67,72 68,66 63,63 69,62" fill={color} />
    <path d="M55 75 Q60 79 65 75" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M18 160 L26 100 Q36 88 60 88 Q84 88 94 100 L102 160 Z" />
    <polygon points="48,88 60,108 72,88 70,96 60,114 50,96" fill="#fff" />
    <polygon points="55,98 65,98 68,104 60,108 52,104" fill="#ff3a78" />
  </svg>
);

// ── Stars silhouette ──────────────────────────────────────────────────────
const SilStar = ({ color = "#fff" }) => (
  <svg viewBox="0 0 120 160" fill={color}>
    <polygon points="60,0 110,160 10,160" fill={color} opacity=".08" />
    <ellipse cx="60" cy="50" rx="22" ry="26" />
    <rect x="40" y="46" width="40" height="10" rx="3" fill="#0a0814" />
    <line x1="60" y1="49" x2="60" y2="53" stroke="#0a0814" strokeWidth="1.5" />
    <path d="M22 160 L30 96 Q38 86 60 86 Q82 86 90 96 L98 160 Z" />
    <line x1="60" y1="100" x2="60" y2="130" stroke="#ffd34d" strokeWidth="3" />
    <circle cx="60" cy="98" r="6" fill="#ffd34d" />
  </svg>
);

// ── Plush silhouettes ─────────────────────────────────────────────────────
const SilPlushBear = ({ color = "#a85e72" }) => (
  <svg viewBox="0 0 120 120" fill={color}>
    <circle cx="32" cy="34" r="14" />
    <circle cx="88" cy="34" r="14" />
    <circle cx="60" cy="64" r="42" />
    <circle cx="48" cy="56" r="5" fill="#fff" /><circle cx="48" cy="56" r="2.5" fill="#2a1c14" />
    <circle cx="72" cy="56" r="5" fill="#fff" /><circle cx="72" cy="56" r="2.5" fill="#2a1c14" />
    <ellipse cx="60" cy="70" rx="6" ry="4" fill="#2a1c14" />
    <path d="M52 78 Q60 86 68 78" stroke="#2a1c14" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <circle cx="40" cy="76" r="6" fill="#ff8ba0" opacity=".5" />
    <circle cx="80" cy="76" r="6" fill="#ff8ba0" opacity=".5" />
  </svg>
);
const SilPlushBunny = ({ color = "#a85e72" }) => (
  <svg viewBox="0 0 120 120" fill={color}>
    <ellipse cx="40" cy="22" rx="8" ry="20" />
    <ellipse cx="80" cy="22" rx="8" ry="20" />
    <ellipse cx="40" cy="22" rx="4" ry="14" fill="#ffc8d2" />
    <ellipse cx="80" cy="22" rx="4" ry="14" fill="#ffc8d2" />
    <circle cx="60" cy="68" r="40" />
    <circle cx="50" cy="60" r="4" fill="#2a1c14" />
    <circle cx="70" cy="60" r="4" fill="#2a1c14" />
    <path d="M56 70 L60 74 L64 70 Z" fill="#2a1c14" />
    <path d="M52 78 Q60 84 68 78" stroke="#2a1c14" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);
const SilPlushCat = ({ color = "#a85e72" }) => (
  <svg viewBox="0 0 120 120" fill={color}>
    <polygon points="28,22 36,52 18,46" />
    <polygon points="92,22 102,46 84,52" />
    <circle cx="60" cy="62" r="42" />
    <ellipse cx="50" cy="58" rx="2" ry="6" fill="#2a1c14" />
    <ellipse cx="70" cy="58" rx="2" ry="6" fill="#2a1c14" />
    <path d="M58 68 L60 71 L62 68 Z" fill="#2a1c14" />
    <path d="M52 76 Q56 82 60 78 Q64 82 68 76" stroke="#2a1c14" strokeWidth="2" fill="none" />
    <line x1="20" y1="64" x2="44" y2="64" stroke="#2a1c14" strokeWidth="1.5" />
    <line x1="20" y1="70" x2="44" y2="68" stroke="#2a1c14" strokeWidth="1.5" />
    <line x1="76" y1="64" x2="100" y2="64" stroke="#2a1c14" strokeWidth="1.5" />
    <line x1="76" y1="68" x2="100" y2="70" stroke="#2a1c14" strokeWidth="1.5" />
  </svg>
);
const SilPlushWhale = ({ color = "#a85e72" }) => (
  <svg viewBox="0 0 120 120" fill={color}>
    <ellipse cx="56" cy="64" rx="46" ry="30" />
    <polygon points="100,52 116,32 110,64" />
    <polygon points="100,76 116,96 110,64" />
    <ellipse cx="56" cy="80" rx="32" ry="14" fill="#fff" opacity=".4" />
    <circle cx="36" cy="58" r="3" fill="#2a1c14" />
    <path d="M28 70 Q34 76 40 70" stroke="#2a1c14" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M50 32 Q44 22 50 16 M58 32 Q52 22 58 16 M66 32 Q60 22 66 16" stroke="#62b3d9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </svg>
);
const SilPlushSheep = ({ color = "#a85e72" }) => (
  <svg viewBox="0 0 120 120" fill={color}>
    <circle cx="30" cy="58" r="14" fill="#fff" />
    <circle cx="40" cy="42" r="12" fill="#fff" />
    <circle cx="56" cy="36" r="14" fill="#fff" />
    <circle cx="74" cy="38" r="13" fill="#fff" />
    <circle cx="90" cy="50" r="13" fill="#fff" />
    <circle cx="92" cy="68" r="14" fill="#fff" />
    <circle cx="76" cy="76" r="14" fill="#fff" />
    <circle cx="56" cy="80" r="16" fill="#fff" />
    <circle cx="38" cy="74" r="13" fill="#fff" />
    <ellipse cx="60" cy="58" rx="22" ry="20" />
    <circle cx="52" cy="56" r="3" fill="#fff" />
    <circle cx="68" cy="56" r="3" fill="#fff" />
    <ellipse cx="60" cy="68" rx="6" ry="3" fill="#fff" />
  </svg>
);

// ── Shared Initial Mock Databases ─────────────────────────────────────────
const INITIAL_CUSTOMERS = [
  { id: 1, email: "chicuong@gmail.com", phone: "0901234567", points: 650, tier: "Vàng", status: "Active", dateJoined: "2024-05-15", name: "Chí Cường", address: "12 Lê Lợi, Phường Bến Nghé, Quận 1, TP. HCM" },
  { id: 2, email: "minhanh@yahoo.com", phone: "0918765432", points: 280, tier: "Bạc", status: "Active", dateJoined: "2026-05-10", name: "Minh Anh", address: "456 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. HCM" },
  { id: 3, email: "thanhbinh@hotmail.com", phone: "0987654321", points: 80, tier: "Đồng", status: "Active", dateJoined: "2025-11-20", name: "Thanh Bình", address: "789 Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. HCM" },
  { id: 4, email: "lanhuong@outlook.com", phone: "0934567890", points: 920, tier: "Vàng", status: "Active", dateJoined: "2023-01-10", name: "Lan Hương", address: "101 Cách Mạng Tháng Tám, Phường 15, Quận 10, TP. HCM" },
  { id: 5, email: "hoangnam@gmail.com", phone: "0977665544", points: 0, tier: "Đồng", status: "Pending", dateJoined: "2026-05-28", name: "Hoàng Nam", address: "202 Võ Thị Sáu, Phường Võ Thị Sáu, Quận 3, TP. HCM" }
];

const INITIAL_ORDERS = [
  { id: 101, customerEmail: "chicuong@gmail.com", customerName: "Chí Cường", datetime: "2026-05-28 10:30", details: "Gối Donald Trump (120cm)", value: "320.000đ", tier: "Vàng" },
  { id: 102, customerEmail: "minhanh@yahoo.com", customerName: "Minh Anh", datetime: "2026-05-27 15:45", details: "Gối Gấu Mochi (80cm)", value: "220.000đ", tier: "Bạc" },
  { id: 103, customerEmail: "lanhuong@outlook.com", customerName: "Lan Hương", datetime: "2026-05-26 09:15", details: "Gối Diva Sân Khấu (100cm)", value: "300.000đ", tier: "Vàng" },
  { id: 104, customerEmail: "thanhbinh@hotmail.com", customerName: "Thanh Bình", datetime: "2026-05-25 18:20", details: "Gối Senpai Schoolboy (120cm)", value: "320.000đ", tier: "Đồng" }
];

const INITIAL_VOUCHERS = [
  { code: "GPAWNEW", desc: "Tặng 100 Paw cho thành viên mới", pointsCost: 0, valueDesc: "+100 Paw", type: "welcome" },
  { code: "CUDDLE50", desc: "Giảm 50.000đ đổi bằng 100 Paw", pointsCost: 100, valueDesc: "-50.000₫", type: "discount", discountAmount: 50000 },
  { code: "VIPGOLD200", desc: "Giảm 200.000đ đổi bằng 400 Paw", pointsCost: 400, valueDesc: "-200.000₫", type: "discount", discountAmount: 200000 },
  { code: "FREESHIP", desc: "Miễn phí vận chuyển cho đơn đầu tiên", pointsCost: 0, valueDesc: "Free Ship", type: "freeship" }
];

// ── Product Catalog — centralized product data ───────────────────────────
const PRODUCT_CATALOG = [
  { id: "p001", name: "Gối ôm Donal Trump", category: "politics", img: "assets/pillow-front.png",
    url: "gpaw-goi-om-donald-trump.html",
    images: ["assets/pillow-front.png", "assets/pillow-hero.png"],
    sizes: [
      { label: "80cm", listedPrice: 380000, salePrice: 320000 },
      { label: "100cm", listedPrice: 450000, salePrice: 380000 },
      { label: "120cm", listedPrice: 520000, salePrice: 450000 },
      { label: "150cm", listedPrice: 600000, salePrice: 520000 },
    ],
    description: "Gối ôm chân dung Tổng thống Donal Trump phiên bản giới hạn. In 3D hai mặt, vải mịn mát, ruột polyester chống biến dạng. Bảo hành 4 năm.",
    specs: "Vải cotton lụa 100% · In 3D hai mặt · Ruột polyester chống xẹp · Bảo hành 4 năm",
    headline: "TRUMP PHÁT NGÔN NÓNG: 'TÔI BẢO HÀNH 4 NĂM CHO PHÒNG NGỦ CỦA BẠN!'",
    tag: "Đang bán", available: true, isBestSeller: true, isOnSale: true },
  { id: "p002", name: "Gối ôm Vladimir Putin", category: "politics", img: null,
    images: [], sizes: [
      { label: "80cm", listedPrice: 380000, salePrice: 350000 },
      { label: "120cm", listedPrice: 520000, salePrice: 480000 },
    ],
    description: "Phiên bản lãnh đạo Nga — bản thử mẫu hoàn thành, mở đặt trước.",
    specs: "Vải cotton lụa 100% · In 3D hai mặt · Ruột polyester chống xẹp",
    headline: "PUTIN LÊN TIẾNG: 'ĐÂY LÀ SẢN PHẨM KHÔNG THỂ BỊ CẤM VẬN'",
    tag: "Đặt trước", available: true, isBestSeller: false, isOnSale: true },
  { id: "p003", name: "Gối ôm Xi Jinping", category: "politics", img: null,
    images: [], sizes: [], description: "Đang trong xưởng — bản thử mẫu sẽ ra mắt trước.",
    specs: "", headline: "ĐƯỜNG CONG HOÀN HẢO ĐẠT CHUẨN XUẤT KHẨU TOÀN CẦU!", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },
  { id: "p004", name: "Gối ôm Kim Jong-un", category: "politics", img: null,
    images: [], sizes: [], description: "Phiên bản giới hạn — chỉ 200 ấn bản đánh số.",
    specs: "", headline: "BÌNH NHƯỠNG PHÁT LỆNH: ẤN BẢN ĐỘC QUYỀN GIỚI HẠN SIÊU MỊN!", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },
  { id: "p005", name: "Gối ôm Joe Biden", category: "politics", img: null,
    images: [], sizes: [], description: "Theo dõi Gpaw để không bỏ lỡ lịch phát hành.",
    specs: "", headline: "ẤN BẢN ĐẶC BIỆT CHỈ CÒN ĐƯỢC CHĂM SÓC BỞI LÒNG TIN", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },
  
  { id: "a001", name: "Gối ôm Senpai School", category: "anime", img: "assets/pillow-front.png",
    url: "gpaw-senpai-school-anime.html",
    images: ["assets/pillow-front.png", "assets/pillow-hero.png"],
    sizes: [
      { label: "80cm", listedPrice: 360000, salePrice: 320000 },
      { label: "100cm", listedPrice: 420000, salePrice: 380000 },
      { label: "120cm", listedPrice: 500000, salePrice: 450000 },
    ],
    description: "Gối ôm nhân vật Senpai trường học phong cách anime Nhật Bản. Bông siêu mượt chống xẹp lún.",
    specs: "Vải polyester mềm mại · In UV hai mặt · Ruột bông PP cotton · Giặt máy được",
    headline: "SENPAI SẼ ÔM BẠN ĐẾN HẾT TIẾT HỌC! TRẬN CHIẾN CUỐI CÙNG BẮT ĐẦU!",
    tag: "Đặt trước", available: true, isBestSeller: false, isOnSale: true },
  { id: "a002", name: "Gối ôm Mahō Shōjo", category: "anime", img: null,
    images: [], sizes: [], description: "Sức mạnh ma thuật biến hình thành êm ái siêu hạng!",
    specs: "", headline: "SỨC MẠNH MA THUẬT BIẾN HÌNH THÀNH ÊM ÁI SIÊU HẠNG!", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },
  { id: "a003", name: "Gối ôm Tsundere", category: "anime", img: null,
    images: [], sizes: [], description: "Gối ôm biểu cảm Tsundere siêu dễ thương.",
    specs: "", headline: "KHÔNG PHẢI TÔI MUỐN ÔM BẠN ĐÂU, ĐỒ BAKA! NHƯNG CỨ ÔM ĐI...", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },
  { id: "a004", name: "Gối ôm Samurai Edo", category: "anime", img: null,
    images: [], sizes: [], description: "Gối ôm võ sĩ đạo truyền thống dũng mãnh.",
    specs: "", headline: "ĐƯỜNG KIẾM LƯỚT NHẸ TRÊN VẢI SIÊU MỊN CHƯA TỪNG CÓ!", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },
  { id: "a005", name: "Gối ôm Neko Mascot", category: "anime", img: null,
    images: [], sizes: [], description: "Gối mèo linh vật anime cực kỳ ấm áp.",
    specs: "", headline: "GỐI ÔM BIẾT KÊU NYA~ SƯỞI ẤM ĐÊM ĐÔNG CÔ ĐƠN!", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },

  { id: "s001", name: "Gối ôm Diva Sân Khấu", category: "stars", img: null,
    url: "gpaw-diva-san-khau-ca-si.html",
    images: [],
    sizes: [
      { label: "80cm", listedPrice: 400000, salePrice: 350000 },
      { label: "100cm", listedPrice: 460000, salePrice: 400000 },
      { label: "120cm", listedPrice: 540000, salePrice: 480000 },
    ],
    description: "Gối ôm Diva Sân Khấu — Tour 2026 phiên bản giới hạn.",
    specs: "Vải satin cao cấp · In kỹ thuật số · Ruột silicon 3D",
    headline: "DIVA TIẾT LỘ: 'GIỮA HÀO QUANG VÀ SỰ CÔ ĐƠN, TÔI CHỌN CHIẾC GỐI NÀY!'",
    tag: "Đặt trước", available: true, isBestSeller: true, isOnSale: false },
  { id: "s002", name: "Gối ôm Rapper Kính Đen", category: "stars", img: null,
    images: [], sizes: [], description: "Gối ôm phong cách hip hop underground.",
    specs: "", headline: "RAPPER KÍNH ĐEN: RHYME CỰC CĂNG, VẢI ÊM CỰC CHẤT CHO ĐÊM FREESTYLE!", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },
  { id: "s003", name: "Gối ôm Idol Mic Hồng", category: "stars", img: null,
    images: [], sizes: [], description: "Gối ôm thần tượng Kpop mic hồng dễ thương.",
    specs: "", headline: "IDOL MIC HỒNG FANMEET ĐẶC BIỆT: GỐI ÔM CHỮ KÝ PHÁT HÀNH GIỚI HẠN!", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },
  { id: "s004", name: "Gối ôm Tài Tử Smoking", category: "stars", img: null,
    images: [], sizes: [], description: "Gối ôm hình nam diễn viên điện ảnh smoking lịch lãm.",
    specs: "", headline: "PHONG CÁCH QUÝ ÔNG LỊCH LÃM VÀ SỰ ẤM ÁP HOÀN HẢO CHO GIƯỜNG NGỦ!", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },
  { id: "s005", name: "Gối ôm Rock Star", category: "stars", img: null,
    images: [], sizes: [], description: "Gối ôm rocker bốc lửa cá tính mạnh.",
    specs: "", headline: "CƠN LỐC ROCK & ROLL ĐÁNH THỨC MỌI GIÁC QUAN VÀ GIẤC MƠ ÊM ÁI!", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },

  { id: "pl001", name: "Gối ôm Gấu Mochi", category: "plush", img: null,
    url: "gpaw-gau-mochi-thu-nhoi-bong.html",
    images: [],
    sizes: [
      { label: "40cm", listedPrice: 280000, salePrice: 220000 },
      { label: "60cm", listedPrice: 350000, salePrice: 280000 },
      { label: "80cm", listedPrice: 420000, salePrice: 350000 },
    ],
    description: "Gấu Mochi mềm và ấm áp — người bạn nhỏ đáng yêu nhất.",
    specs: "Vải nhung minky · Ruột bông gòn 3D · An toàn cho trẻ em · Giặt máy được",
    headline: "GẤU MOCHI THÚ NHẬN: 'TÔI MỀM VÀ ÊM ẤM HƠN CRUSH CỦA BẠN GẤP 10 LẦN!'",
    tag: "Đang bán", available: true, isBestSeller: true, isOnSale: true },
  { id: "pl002", name: "Gối ôm Thỏ Nougat", category: "plush", img: null,
    images: [], sizes: [
      { label: "40cm", listedPrice: 280000, salePrice: 250000 },
      { label: "60cm", listedPrice: 350000, salePrice: 300000 },
    ],
    description: "Thỏ tai dài Nougat vị kẹo bông — ôm ấm mỗi đêm đông.",
    specs: "Vải nhung minky · Ruột bông gòn 3D · An toàn cho trẻ em",
    headline: "VỊ NGỌT Kẹo bông thỏ NOUGAT: NGƯỜI BẠN TAI DÀI ÔM ẤM MỖI ĐÊM ĐÔNG CẬN KỀ!",
    tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: true },
  { id: "pl003", name: "Gối ôm Mèo Custard", category: "plush", img: null,
    images: [], sizes: [], description: "Gối mèo Custard nhân kem ngọt ngào tinh nghịch.",
    specs: "", headline: "TIẾNG RÙ RÙ ẤM ÁP CỦA MÈO CUSTARD XUA TAN MỌI MỆT MỎI SAU VÀI GIÂY!", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },
  { id: "pl004", name: "Gối ôm Cá Voi Vani", category: "plush", img: null,
    images: [], sizes: [], description: "Gối ôm cá voi Vani đại dương siêu to khổng lồ.",
    specs: "", headline: "GIẤC MƠ THỦY CUNG DI ĐỘNG SIÊU ÊM CÙNG CHÀO ĐÓN CÁ VOI KHỔNG LỒ!", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },
  { id: "pl005", name: "Gối ôm Cừu Mây", category: "plush", img: null,
    images: [], sizes: [], description: "Gối ôm cừu mây trắng xốp mềm mại như mây.",
    specs: "", headline: "LÀN MÂY BỒNG BỀNH CỪU MÂY ĐƯA BẠN VÀO GIẤC NGỦ THẦN TIÊN KHÔNG MƯA GIÔNG!", tag: "Sắp ra mắt", available: false, isBestSeller: false, isOnSale: false },
];

// ── Vietnam 2026 Provinces — 34 units per NQ 202/2025/QH15 ──────────────
const VN_PROVINCES = [
  { id: "HN", name: "Thành phố Hà Nội", wards: ["Ba Đình","Hoàn Kiếm","Đống Đa","Hai Bà Trưng","Thanh Xuân","Cầu Giấy","Hoàng Mai","Long Biên","Tây Hồ","Bắc Từ Liêm","Nam Từ Liêm","Hà Đông","Sơn Tây","Đông Anh","Gia Lâm","Thanh Trì","Hoài Đức","Đan Phượng","Mê Linh","Chương Mỹ","Thạch Thất","Quốc Oai","Ba Vì","Phúc Thọ","Sóc Sơn","Mỹ Đức","Ứng Hòa","Phú Xuyên","Thường Tín","Thanh Oai"] },
  { id: "HCM", name: "Thành phố Hồ Chí Minh", wards: ["Quận 1","Quận 3","Quận 4","Quận 5","Quận 6","Quận 7","Quận 8","Quận 10","Quận 11","Quận 12","Bình Thạnh","Gò Vấp","Phú Nhuận","Tân Bình","Tân Phú","Bình Tân","Thủ Đức","Nhà Bè","Hóc Môn","Củ Chi","Bình Chánh","Cần Giờ"] },
  { id: "HP", name: "Thành phố Hải Phòng", wards: ["Hồng Bàng","Ngô Quyền","Lê Chân","Hải An","Kiến An","Đồ Sơn","Dương Kinh","Thủy Nguyên","An Dương","An Lão","Kiến Thụy","Tiên Lãng","Vĩnh Bảo","Cát Hải"] },
  { id: "DN", name: "Thành phố Đà Nẵng", wards: ["Hải Châu","Thanh Khê","Sơn Trà","Ngũ Hành Sơn","Liên Chiểu","Cẩm Lệ","Hòa Vang","Hoàng Sa"] },
  { id: "CT", name: "Thành phố Cần Thơ", wards: ["Ninh Kiều","Bình Thủy","Cái Răng","Ô Môn","Thốt Nốt","Vĩnh Thạnh","Cờ Đỏ","Phong Điền","Thới Lai"] },
  { id: "HUE", name: "Thành phố Huế", wards: ["Huế","Hương Thủy","Hương Trà","Phong Điền","Quảng Điền","Phú Vang","Phú Lộc","Nam Đông","A Lưới"] },
  { id: "CB", name: "Tỉnh Cao Bằng", wards: [] },
  { id: "DB", name: "Tỉnh Điện Biên", wards: [] },
  { id: "LC", name: "Tỉnh Lai Châu", wards: [] },
  { id: "LS", name: "Tỉnh Lạng Sơn", wards: [] },
  { id: "SL", name: "Tỉnh Sơn La", wards: [] },
  { id: "HT", name: "Tỉnh Hà Tĩnh", wards: [] },
  { id: "NA", name: "Tỉnh Nghệ An", wards: [] },
  { id: "TH", name: "Tỉnh Thanh Hóa", wards: [] },
  { id: "QN", name: "Tỉnh Quảng Ninh", wards: [] },
  { id: "TQ", name: "Tỉnh Tuyên Quang", wards: [] },
  { id: "LCai", name: "Tỉnh Lào Cai", wards: [] },
  { id: "TN", name: "Tỉnh Thái Nguyên", wards: [] },
  { id: "PT", name: "Tỉnh Phú Thọ", wards: [] },
  { id: "BN", name: "Tỉnh Bắc Ninh", wards: [] },
  { id: "HY", name: "Tỉnh Hưng Yên", wards: [] },
  { id: "NB", name: "Tỉnh Ninh Bình", wards: [] },
  { id: "QTri", name: "Tỉnh Quảng Trị", wards: [] },
  { id: "QNgai", name: "Tỉnh Quảng Ngãi", wards: [] },
  { id: "GL", name: "Tỉnh Gia Lai", wards: [] },
  { id: "KH", name: "Tỉnh Khánh Hòa", wards: [] },
  { id: "DL", name: "Tỉnh Đắk Lắk", wards: [] },
  { id: "LDong", name: "Tỉnh Lâm Đồng", wards: [] },
  { id: "DNai", name: "Tỉnh Đồng Nai", wards: [] },
  { id: "TNinh", name: "Tỉnh Tây Ninh", wards: [] },
  { id: "VL", name: "Tỉnh Vĩnh Long", wards: [] },
  { id: "DT", name: "Tỉnh Đồng Tháp", wards: [] },
  { id: "AG", name: "Tỉnh An Giang", wards: [] },
  { id: "CM", name: "Tỉnh Cà Mau", wards: [] },
];

const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
const fmtPrice = (n) => n.toLocaleString("vi-VN") + "₫";
const calcDiscountPct = (listed, sale) => Math.round((1 - sale / listed) * 100);

// ─────────────────────────────────────────────────────────────────────────────
// ❶ POLITICS — newspaper layout with soft page flip curl
// ─────────────────────────────────────────────────────────────────────────────
function Politics({ catalog, onSelectProduct, onOpenAuth, siteSettings }) {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [displayActive, setDisplayActive] = useState(0);

  const cards = [
    { name: "Donal Trump",    en: "Donal Trump",    tag: "Đang bán",    tagColor: "red", price: "320.000đ", was: "420.000đ",
      href: "gpaw-goi-om-donald-trump.html", real: true, img: "assets/pillow-front.png",
      byline: "Ảnh: Gpaw Studio · No. 047", quote: "Một người bạn nguyên thủ — đảm bảo bốn năm bảo hành.", status: "Đã ra mắt · Thu 2025",
      headline: "TRUMP PHÁT NGÔN NÓNG: 'TÔI BẢO HÀNH 4 NĂM CHO PHÒNG NGỦ CỦA BẠN!'" },
    { name: "Vladimir Putin", en: "Vladimir Putin", tag: "Đặt trước", price: "Pre-order",
      byline: "Ảnh tư liệu · No. 048", quote: "Sản phẩm tiếp theo trong loạt sưu tập nguyên thủ.", status: "Đặt trước · giao 12/2026",
      headline: "PUTIN LÊN TIẾNG: 'ĐÂY LÀ SẢN PHẨM KHÔNG THỂ BỊ CẤM VẬN'" },
    { name: "Xi Jinping",     en: "Xi Jinping",     tag: "Sắp ra mắt", price: "Coming soon",
      byline: "Ảnh tư liệu · No. 049", quote: "Đang trong xưởng — bản thử mẫu sẽ ra mắt trước.", status: "Sắp ra mắt · 2026",
      headline: "ĐƯỜNG CONG HOÀN HẢO ĐẠT CHUẨN XUẤT KHẨU TOÀN CẦU!" },
    { name: "Kim Jong-un",    en: "Kim Jong-un",    tag: "Sắp ra mắt", price: "Coming soon",
      byline: "Ảnh tư liệu · No. 050", quote: "Phiên bản giới hạn — chỉ 200 ấn bản đánh số.", status: "Sắp ra mắt · 2026",
      headline: "BÌNH NHƯỠNG PHÁT LỆNH: ẤN BẢN ĐỘC QUYỀN GIỚI HẠN SIÊU MỊN!" },
    { name: "Joe Biden",      en: "Joe Biden",      tag: "Sắp ra mắt", price: "Coming soon",
      byline: "Ảnh tư liệu · No. 051", quote: "Theo dõi Gpaw để không bỏ lỡ lịch phát hành.", status: "Sắp ra mắt · 2026",
      headline: "ẤN BẢN ĐẶC BIỆT CHỈ CÒN ĐƯỢC CHĂM SÓC BỞI LÒNG TIN" },
  ];

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % cards.length);
    }, 5000);
    return () => clearInterval(t);
  }, [inView, cards.length]);

  useEffect(() => {
    setFlipping(true);
    const t1 = setTimeout(() => {
      setDisplayActive(active);
    }, 350);
    const t2 = setTimeout(() => {
      setFlipping(false);
    }, 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active]);

  const featured = cards[displayActive];

  const catalogItem = catalog.find(p => p.name.includes(featured.name) || featured.name.includes(p.name));
  const catalogItemDiscount = catalogItem?.sizes?.[0] ? calcDiscountPct(catalogItem.sizes[0].listedPrice, catalogItem.sizes[0].salePrice) : 0;

  const handleProductClick = (card) => {
    const p = catalog.find(x => x.name.includes(card.name) || card.name.includes(x.name));
    if (p) {
      onSelectProduct(p);
    } else {
      onSelectProduct({
        id: card.name.toLowerCase().replace(/\s+/g, '-'),
        name: `Gối ôm ${card.name}`,
        category: "politics",
        images: card.img ? [card.img] : [],
        sizes: [
          { label: "80cm", listedPrice: 380000, salePrice: 320000 },
          { label: "120cm", listedPrice: 520000, salePrice: 450000 },
        ],
        description: `${card.name} — ${card.quote || card.headline}`,
        specs: "Vải cotton lụa 100% · In 3D hai mặt · Ruột polyester chống xẹp · Bảo hành 4 năm",
        tag: card.tag,
        available: card.real || false,
        isBestSeller: false,
        isOnSale: false
      });
    }
  };

  return (
    <section
      id="politics"
      ref={ref}
      className={"world w-politics" + (inView ? " in" : "")}
      data-screen-label="01 Chính trị"
    >
      <div className="wrap">
        <div className="newspaper ani-paper">
          <div className="paper-meta-top">
            <span className="l">Bộ sưu tập số · <b>No. 047</b></span>
            <span className="c">Thứ Năm · 28 tháng 5, 2026</span>
            <span className="r">Vol. 47 · Giá 20<b>₫</b></span>
          </div>

          <div className="paper-masthead">
            <div className="ornament">Established 2024 · Saigon · Limited Issue</div>
            <h2 className="title">The Gpaw <em>Times</em></h2>
            <div className="vi">{siteSettings?.politicsSlogan || "Chuyên san chính trị · Political Series"}</div>
          </div>

          <div className="paper-headline">
            <span className="banner">Tin số một · Top story</span>
            <p className="head-quote">
              "{catalogItem?.headline || featured.headline}"
            </p>
            <div className="byline">Đặt bút bởi <b>Gpaw Atelier</b> · 24 phiên bản · Phát hành đến hết 2027</div>
          </div>

          <div className="paper-body">
            <div className="paper-featured page-flip-container">
              <div className={"page-curl" + (flipping ? " active" : "")}></div>
              <div className="timer-cap">
                <span>Hồ sơ <b>No. {String(displayActive + 1).padStart(3, "0")} / {String(cards.length).padStart(3, "0")}</b></span>
                <span>Lật trang tự động</span>
              </div>
              <a
                href={catalogItem?.url || "#"}
                onClick={(e) => {
                  if (!catalogItem || !catalogItem.url) {
                    e.preventDefault();
                    handleProductClick(featured);
                  }
                }}
                className="feat-flip"
              >
                <span className={"tag" + (featured.tagColor === "red" ? " red" : "")}>{featured.tag}</span>
                {featured.real && (
                  <span className="stamp">Phát hành<br /><b>Giới hạn</b></span>
                )}
                <div className={"frame" + (featured.real ? "" : " placeholder")} style={{ position: "relative" }}>
                  {catalogItem?.isOnSale && catalogItemDiscount > 0 && (
                    <div className="product-badge-container">
                      <img src="assets/badge-super-sale.png" alt="Giảm giá" />
                      <span className="discount-val">{catalogItemDiscount}%</span>
                    </div>
                  )}
                  {featured.real
                    ? <img src={featured.img} alt={featured.name} />
                    : <SilPolitics />}
                </div>
                <div className="cap">
                  <div className="cap-name">{featured.name}</div>
                  <div className="cap-byline">"{featured.quote}" — {featured.byline}</div>
                  <div className="cap-row">
                    <span>{featured.status}</span>
                    {featured.was
                      ? <span className="price"><b>{featured.price}</b> · <span style={{ textDecoration: "line-through", opacity: .55 }}>{featured.was}</span></span>
                      : <span className="price">{featured.price}</span>}
                  </div>
                </div>
              </a>
            </div>

            <div className="paper-thumbs">
              <div className="t-head">Cũng trong số này · Also in this issue</div>
              {cards.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  className={"thumb" + (i === active ? " active" : "")}
                  onClick={() => setActive(i)}
                >
                  <div className="t-frame">
                    {c.real
                      ? <img src={c.img} alt={c.name} />
                      : <SilPolitics />}
                  </div>
                  <div className="t-info">
                    <span className="t-num">Hồ sơ {String(i + 1).padStart(2, "0")} · {c.tag}</span>
                    <span className="t-name">{c.name}</span>
                    <span className="t-meta">{c.en} · {c.real ? "đang bán" : "chưa ra mắt"}</span>
                  </div>
                </button>
              ))}
              <div className="t-progress" key={active}></div>
            </div>
          </div>

          {/* Breaking News Feed Section */}
          {siteSettings && siteSettings.newsList && siteSettings.newsList.length > 0 && (
            <div className="paper-news-section">
              <h4>📰 Bản tin Gpaw Times (News & Updates)</h4>
              <div className="news-grid">
                {siteSettings.newsList.map((news, index) => (
                  <div key={index} className="news-item">
                    <span className="date-cat">{news.date} · {news.category}</span>
                    <h5>{news.title}</h5>
                    <p>{news.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="paper-foot">
            <div className="col">
              <h5>Cương lĩnh sản phẩm</h5>
              <p>Hai mươi bốn phiên bản chân dung các nhà lãnh đạo đương thời, mỗi chiếc cao 80–150 cm. In 3D hai mặt, vải mịn mát, ruột polyester chống biến dạng — đảm bảo bốn năm bảo hành, hoặc lâu hơn.</p>
            </div>
            <div className="col">
              <h5>Lịch phát hành</h5>
              <p>Trump đã chính thức bước vào bộ sưu tập từ mùa Thu 2025. Putin — bản thử mẫu hoàn thành, mở đặt trước. Xi, Kim, Biden — đang trong xưởng. Mỗi tháng một nhân vật mới sẽ được "tuyên thệ".</p>
            </div>
            <div className="col">
              <h5>Lời tòa soạn</h5>
              <p>Đây là sản phẩm mang tính giải trí — một phép châm biếm dịu dàng dành cho người yêu sưu tập. Mỗi chiếc gối là một bức chân dung, không phải một tuyên bố chính trị. Hãy ôm có trách nhiệm.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❷ ANIME — manga magazine layout with soft page flip curl
// ─────────────────────────────────────────────────────────────────────────────
function Anime({ catalog, onSelectProduct, siteSettings }) {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [displayActive, setDisplayActive] = useState(0);

  const cards = [
    { name: "Senpai School", en: "Schoolboy senpai", pow: "ふぁ!", href: "gpaw-senpai-school-anime.html", tag: "Đặt trước", real: true, img: "assets/pillow-front.png",
      headline: "SENPAI SẼ ÔM BẠN ĐẾN HẾT TIẾT HỌC! TRẬN CHIẾN CUỐI CÙNG BẮT ĐẦU!" },
    { name: "Mahō Shōjo",    en: "Magical girl",     pow: "✦",    tag: "Sắp ra mắt",
      headline: "SỨC MẠNH MA THUẬT BIẾN HÌNH THÀNH ÊM ÁI SIÊU HẠNG!" },
    { name: "Tsundere",      en: "Tsundere girl",    pow: "Baka!", tag: "Sắp ra mắt",
      headline: "KHÔNG PHẢI TÔI MUỐN ÔM BẠN ĐÂU, ĐỒ BAKA! NHƯNG CỨ ÔM ĐI..." },
    { name: "Samurai Edo",   en: "Samurai kimono",   pow: "斬!",   tag: "Sắp ra mắt",
      headline: "ĐƯỜNG KIẾM LƯỚT NHẸ TRÊN VẢI SIÊU MỊN CHƯA TỪNG CÓ!" },
    { name: "Neko Mascot",   en: "Talking cat",      pow: "Nya~", tag: "Sắp ra mắt",
      headline: "GỐI ÔM BIẾT KÊU NYA~ SƯỞI ẤM ĐÊM ĐÔNG CÔ ĐƠN!" },
  ];

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % cards.length);
    }, 5000);
    return () => clearInterval(t);
  }, [inView, cards.length]);

  useEffect(() => {
    setFlipping(true);
    const t1 = setTimeout(() => {
      setDisplayActive(active);
    }, 350);
    const t2 = setTimeout(() => {
      setFlipping(false);
    }, 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active]);

  const featured = cards[displayActive];

  const catalogItem = catalog.find(p => p.name.includes(featured.name) || featured.name.includes(p.name));
  const catalogItemDiscount = catalogItem?.sizes?.[0] ? calcDiscountPct(catalogItem.sizes[0].listedPrice, catalogItem.sizes[0].salePrice) : 0;

  const handleProductClick = (card) => {
    const p = catalog.find(x => x.name.includes(card.name) || card.name.includes(x.name));
    if (p) {
      onSelectProduct(p);
    } else {
      onSelectProduct({
        id: card.name.toLowerCase().replace(/\s+/g, '-'),
        name: `Gối ôm ${card.name}`,
        category: "anime",
        images: card.img ? [card.img] : ["assets/pillow-hero.png"],
        sizes: [
          { label: "80cm", listedPrice: 360000, salePrice: 320000 },
          { label: "100cm", listedPrice: 420000, salePrice: 380000 },
          { label: "120cm", listedPrice: 500000, salePrice: 450000 },
        ],
        description: `${card.name} — ${card.headline}`,
        specs: "Vải polyester mềm mại · In UV hai mặt · Ruột bông PP cotton · Giặt máy được",
        tag: card.tag,
        available: card.real || false,
        isBestSeller: false,
        isOnSale: false
      });
    }
  };

  const sakura = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 7.3) % 100}%`,
    delay: `${(i % 6) * 0.9}s`,
    dur: `${10 + (i % 5) * 2}s`,
    size: 14 + (i % 4) * 4,
    rot: (i * 37) % 90,
  }));

  return (
    <section
      id="anime"
      ref={ref}
      className={"world w-anime" + (inView ? " in" : "")}
      data-screen-label="02 Anime"
    >
      {sakura.map((s, i) => (
        <span key={i} className="sakura" style={{ left: s.left, top: "-20px", "--delay": s.delay, "--dur": s.dur }}>
          <svg width={s.size} height={s.size} viewBox="0 0 20 20" style={{ transform: `rotate(${s.rot}deg)` }}>
            <path d="M10 2 Q12 6 10 10 Q8 6 10 2 Z M10 10 Q14 8 18 10 Q14 12 10 10 Z M10 10 Q12 14 10 18 Q8 14 10 10 Z M10 10 Q6 12 2 10 Q6 8 10 10 Z" fill="#fff" />
            <circle cx="10" cy="10" r="2" fill="#ffea4b" />
          </svg>
        </span>
      ))}
      <div className="speedlines"></div>

      <div className="wrap">
        <div className="hd">
          <div className="badge-num"><span className="pip"></span>{siteSettings?.animeSlogan || "Hạng mục II · Chapter II"}</div>
          <h2 className="ani-h2">ANIM<span className="x">E!</span></h2>
        </div>

        <div className="manga-magazine ani-paper">
          <div className="manga-body">
            {/* Left: Manga cover - SOUL magazine style with all text inside frame */}
            <div className="manga-featured page-flip-container">
              <div className={"page-curl" + (flipping ? " active" : "")}></div>

              {/* V-Jump masthead strip */}
              <div className="vjump-masthead">
                <span className="vjump-logo">V·JUMP</span>
                <span className="vjump-sub">GPAW ANIME EDITION · {featured.tag}</span>
              </div>

              {/* Magazine cover frame with overlaid text like SOUL magazine */}
              <a
                href={catalogItem?.url || "#"}
                onClick={(e) => { if (!catalogItem || !catalogItem.url) { e.preventDefault(); handleProductClick(featured); } }}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div className="frame manga-cover-frame" style={{ position: "relative" }}>
                  {/* Badges */}
                  {catalogItem?.isOnSale && catalogItemDiscount > 0 && (
                    <div className="product-badge-container">
                      <img src="assets/badge-super-sale.png" alt="Giảm giá" />
                      <span className="discount-val">{catalogItemDiscount}%</span>
                    </div>
                  )}

                  {/* Main artwork */}
                  {featured.real ? <img src="assets/pillow-hero.png" alt={featured.name} /> : <SilAnime />}

                  {/* ── OVERLAID TEXT inside frame (SOUL magazine style) ── */}

                  {/* Top-left: Category tag */}
                  <div className="manga-overlay-top">
                    <span className="manga-overlay-category">CHUYÊN ĐỀ ANIME · NHẬT BẢN</span>
                  </div>

                  {/* Floating effect bubble (pow) */}
                  <span className="pow-bubble">{featured.pow}</span>

                  {/* Bottom gradient + text block */}
                  <div className="manga-overlay-bottom">
                    {/* Big character name like SOUL mag */}
                    <div className="manga-overlay-charname">{featured.name}</div>
                    <div className="manga-overlay-charen">{featured.en}</div>
                    {/* Headline below */}
                    <div className="manga-overlay-headline">
                      {catalogItem?.headline || featured.headline}
                    </div>
                    {/* Side story pills */}
                    <div className="manga-overlay-pills">
                      <span>Bông siêu mượt</span>
                      <span>In UV hai mặt</span>
                      <span>{featured.tag}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Right: Product details + lineup */}
            <div className="manga-thumbs">
              {/* Product info box */}
              <div className="manga-product-box">
                <div className="manga-product-label">✦ SẢN PHẨM NỔI BẬT</div>
                <div className="manga-product-name">{catalogItem ? catalogItem.name : ('Gối ôm ' + featured.name)}</div>
                {catalogItem?.sizes?.[0] && (
                  <div className="manga-product-price">
                    <span className="mprice-sale">{catalogItem.sizes[0].salePrice.toLocaleString('vi-VN')}₫</span>
                    {catalogItem.sizes[0].salePrice < catalogItem.sizes[0].listedPrice && (
                      <span className="mprice-listed">{catalogItem.sizes[0].listedPrice.toLocaleString('vi-VN')}₫</span>
                    )}
                  </div>
                )}
                <button type="button" className="manga-buy-btn" onClick={() => handleProductClick(featured)}>
                  ⚡ Mua ngay
                </button>
              </div>

              {/* Lineup */}
              <div className="m-head">LINEUP</div>
              {cards.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  className={"manga-thumb" + (i === active ? " active" : "")}
                  onClick={() => setActive(i)}
                >
                  <div className="t-frame">
                    {c.real ? <img src="assets/pillow-hero.png" style={{ transform: "scale(1.2)" }} alt={c.name} /> : <SilAnime />}
                  </div>
                  <div className="t-info">
                    <span className="t-num">Vol. {String(i + 1).padStart(2, "0")} · {c.tag}</span>
                    <span className="t-name">{c.name}</span>
                    <span className="t-meta">{c.en}</span>
                  </div>
                </button>
              ))}
              <div className="t-progress" key={active} style={{ background: "rgba(0,0,0,0.1)" }}></div>
            </div>
          </div>

          {/* Breaking News Feed Section */}
          {(() => {
            const animeNews = (siteSettings?.newsList || []).filter(news => 
              news.subCategory === "tinb" || 
              news.category.toUpperCase().includes("ANIME") || 
              news.category.toUpperCase().includes("MANGA")
            );
            const displayNews = animeNews.length > 0 ? animeNews : [
              { date: "29/05/2026", category: "MANGA WEEKLY", title: "SENPAI SCHOOL VOL. 1 CHÍNH THỨC PHÁT HÀNH", summary: "Tập đầu tiên của vũ trụ Anime đã chính thức cập bến kệ hàng Gpaw, mang lại những trang vẽ tay sắc nét trên chất vải mát lạnh." },
              { date: "28/05/2026", category: "REVIEW", title: "CẢM NHẬN KHÁCH HÀNG: ÊM HƠN CẢ KỲ VỌNG", summary: "Cộng đồng otaku tại Việt Nam đánh giá cao khả năng giữ phom của dòng gối mới, thích hợp cả khi đọc truyện lẫn ôm ngủ." }
            ];
            return (
              <div className="paper-news-section">
                <h4>📰 Bản tin Shonen Weekly (Manga & Figure)</h4>
                <div className="news-grid">
                  {displayNews.map((news, index) => (
                    <div key={index} className="news-item">
                      <span className="date-cat">{news.date} · {news.category}</span>
                      <h5>{news.title}</h5>
                      <p>{news.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          <div className="paper-foot">
            <div className="col">
              <h5>Tôn chỉ nét vẽ</h5>
              <p>Hệ thống nét vẽ tay thủ công được chuyển thể 100% sang dạng in kỹ thuật số 3D độ nét cực cao, tái hiện hoàn hảo thần thái 2D của các nhân vật Anime yêu thích.</p>
            </div>
            <div className="col">
              <h5>Tiến độ dự án</h5>
              <p>Tập 1 Senpai School đã chính thức gia nhập kệ hàng. Tập 2 Mahō Shōjo và Tập 3 Tsundere đang hoàn thiện khâu phối màu và chuẩn bị in test mẫu đầu tiên.</p>
            </div>
            <div className="col">
              <h5>Lưu ý độc giả</h5>
              <p>Sản phẩm được thiết kế độc quyền phục vụ văn hóa Otaku và các nhà sưu tầm Manga/Anime. Đảm bảo bản quyền thiết kế tinh xảo từ Gpaw Atelier.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❸ STARS — high-fashion concert layout with soft page flip curl
// ─────────────────────────────────────────────────────────────────────────────
function Stars({ catalog, onSelectProduct, siteSettings }) {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  const [displayActive, setDisplayActive] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const cards = [
    { name: "Diva Sân Khấu",  en: "Stage Diva",     issue: "Issue 01", season: "Spring 2026", href: "gpaw-diva-san-khau-ca-si.html", real: true,
      cover: "STYLE & SOUL", pullQuote: "Giữa triệu ánh đèn sân khấu, tôi vẫn cần một nơi chốn bình yên để đặt đầu.",
      headline: "DIVA TIẾT LỘ: 'GIỮA HÀO QUANG VÀ SỰ CÔ ĐƠN, TÔI CHỌN CHIẾC GỐI NÀY!'",
      subline: "Phỏng vấn độc quyền về thói quen chăm sóc bản thân của ngôi sao hàng đầu" },
    { name: "Rapper Kính Đen", en: "Rapper",        issue: "Issue 02", season: "Summer 2026",
      cover: "FLOW & FEEL", pullQuote: "Lyric hay cần cảm xúc thật. Và cảm xúc thật bắt đầu từ giấc ngủ đủ giấc.",
      headline: "RAPPER KÍNH ĐEN: RHYME CỰC CĂNG, VẢI ÊM CỰC CHẤT CHO ĐÊM FREESTYLE!",
      subline: "Bộ sưu tập giới hạn dành cho tín đồ hip-hop underground" },
    { name: "Idol Mic Hồng",  en: "Pop Idol",       issue: "Issue 03", season: "Summer 2026",
      cover: "IDOL LIFE", pullQuote: "Fanmeet hay nhất là lúc được ôm một chiếc gối mang ký ức về đêm nhạc.",
      headline: "IDOL MIC HỒNG FANMEET ĐẶC BIỆT: GỐI ÔM CHỮ KÝ PHÁT HÀNH GIỚI HẠN!",
      subline: "Limited edition chỉ 500 chiếc, kèm chữ ký in nổi và hộp quà cao cấp" },
    { name: "Tài Tử Smoking", en: "Leading Man",    issue: "Issue 04", season: "Autumn 2026",
      cover: "ELEGANCE", pullQuote: "Phong cách đỉnh cao không chỉ là bộ suit — mà còn là không gian ngủ hoàn hảo.",
      headline: "PHONG CÁCH QUÝ ÔNG LỊCH LÃM VÀ SỰ ẤM ÁP HOÀN HẢO CHO GIƯỜNG NGỦ!",
      subline: "Dành riêng cho quý ông biết thưởng thức cuộc sống sang trọng" },
    { name: "Rock Star",       en: "Rock Star",     issue: "Issue 05", season: "Winter 2026",
      cover: "LOUD & SOFT", pullQuote: "Tiếng rock chấn động mọi sân khấu. Nhưng về nhà, tôi cần sự mềm mại.",
      headline: "CƠN LỐC ROCK & ROLL ĐÁNH THỨC MỌI GIÁC QUAN VÀ GIẤC MƠ ÊM ÁI!",
      subline: "Phiên bản encore giới hạn với chữ ký thêu tay trực tiếp" },
  ];

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % cards.length);
    }, 5000);
    return () => clearInterval(t);
  }, [inView, cards.length]);

  useEffect(() => {
    setTransitioning(true);
    const t1 = setTimeout(() => { setDisplayActive(active); }, 280);
    const t2 = setTimeout(() => { setTransitioning(false); }, 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active]);

  const featured = cards[displayActive];

  const catalogItem = catalog.find(p => p.name.includes(featured.name) || featured.name.includes(p.name));
  const catalogItemDiscount = catalogItem?.sizes?.[0] ? calcDiscountPct(catalogItem.sizes[0].listedPrice, catalogItem.sizes[0].salePrice) : 0;

  const handleProductClick = (card) => {
    const p = catalog.find(x => x.name.includes(card.name) || card.name.includes(x.name));
    if (p) {
      onSelectProduct(p);
    } else {
      onSelectProduct({
        id: card.name.toLowerCase().replace(/\s+/g, '-'),
        name: 'Gối ôm ' + card.name,
        category: "stars",
        images: ["assets/pillow-front.png"],
        sizes: [
          { label: "80cm", listedPrice: 400000, salePrice: 350000 },
          { label: "100cm", listedPrice: 460000, salePrice: 400000 },
          { label: "120cm", listedPrice: 540000, salePrice: 480000 },
        ],
        description: card.name + ' — ' + card.headline,
        specs: "Vải satin cao cấp · In kỹ thuật số · Ruột silicon 3D",
        tag: "Đặt trước",
        available: card.real || false,
        isBestSeller: false,
        isOnSale: false
      });
    }
  };

  const twinkles = Array.from({ length: 18 }, (_, i) => ({
    top: ((i * 13) % 90 + 4) + '%',
    left: ((i * 27) % 96 + 2) + '%',
    delay: ((i % 7) * 0.4) + 's',
    size: 6 + (i % 3) * 3,
  }));

  return (
    <section
      id="stars"
      ref={ref}
      className={"world w-stars" + (inView ? " in" : "")}
      data-screen-label="03 Ca sĩ · Diễn viên"
    >
      {twinkles.map((t, i) => (
        <span key={i} className="twinkle" style={{ top: t.top, left: t.left, "--delay": t.delay, fontSize: t.size }}>✦</span>
      ))}

      <div className="wrap">
        {/* ELLE Magazine inspired header */}
        <div className="elle-header ani-paper">
          <div className="elle-section-label">Hạng mục III · Chapter III</div>
          <div className="elle-masthead-row">
            <div className="elle-logo">GPAW <em>ELLE</em></div>
            <div className="elle-edition-bar">
              <span>{featured.issue}</span>
              <span className="elle-dot">·</span>
              <span>{featured.season}</span>
              <span className="elle-dot">·</span>
              <span>Ca Sĩ &amp; Diễn Viên</span>
            </div>
          </div>
          <p className="elle-slogan">{siteSettings?.starsSlogan || "Ngôi sao của bạn, dưới dạng có thể ôm."}</p>
        </div>

        {/* ELLE Editorial Grid */}
        <div className={"elle-editorial ani-paper" + (transitioning ? " elle-fade-out" : " elle-fade-in")}>

          {/* Left: Cover Story */}
          <div className="elle-cover-story">
            <div className="elle-cover-badge">{featured.cover}</div>

            <a
              href={catalogItem?.url || "#"}
              onClick={(e) => { if (!catalogItem || !catalogItem.url) { e.preventDefault(); handleProductClick(featured); } }}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <div className="elle-cover-frame" style={{ position: "relative" }}>
                {catalogItem?.isOnSale && catalogItemDiscount > 0 && (
                  <div className="product-badge-container" style={{ top: '8px', right: '8px' }}>
                    <img src="assets/badge-super-sale.png" alt="Giảm giá" />
                    <span className="discount-val">{catalogItemDiscount}%</span>
                  </div>
                )}
                <SilStar />
                <div className="elle-frame-overlay"></div>
              </div>
            </a>

            {/* Pull quote */}
            <div className="elle-pull-quote">
              <svg width="20" height="14" viewBox="0 0 30 24" fill="currentColor" style={{ opacity: .45, marginBottom: 5, display: 'block' }}>
                <path d="M0 24V14.4C0 10.32.96 6.96 2.88 4.32 4.8 1.44 7.68 0 11.52 0l1.44 2.16c-2.4.48-4.32 1.8-5.76 3.96-1.44 2.16-2.16 4.56-2.16 7.2H12V24H0zm16.32 0V14.4c0-4.08.96-7.44 2.88-10.08C21.12 1.44 24 0 27.84 0l1.44 2.16c-2.4.48-4.32 1.8-5.76 3.96-1.44 2.16-2.16 4.56-2.16 7.2H28.32V24H16.32z" />
              </svg>
              <p className="elle-quote-text">{featured.pullQuote}</p>
              <div className="elle-quote-author">— {featured.name}</div>
            </div>
          </div>

          {/* Right: Editorial Sidebar */}
          <div className="elle-sidebar">

            {/* Story headline */}
            <div className="elle-story-box">
              <div className="elle-story-tag">Cover Story</div>
              <h3 className="elle-story-headline">{catalogItem?.headline || featured.headline}</h3>
              <p className="elle-story-sub">{featured.subline}</p>
              <div className="elle-story-cta">
                <button type="button" className="elle-btn-primary" onClick={() => handleProductClick(featured)}>
                  Xem sản phẩm →
                </button>
                {catalogItem?.sizes?.[0] && (
                  <div className="elle-price-strip">
                    <span className="elle-price-sale">{catalogItem.sizes[0].salePrice.toLocaleString('vi-VN')}₫</span>
                    {catalogItem.sizes[0].salePrice < catalogItem.sizes[0].listedPrice && (
                      <span className="elle-price-listed">{catalogItem.sizes[0].listedPrice.toLocaleString('vi-VN')}₫</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Issue divider */}
            <div className="elle-divider"><span>IN THIS ISSUE</span></div>

            {/* Issues list */}
            <div className="elle-issue-list">
              {cards.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  className={"elle-issue-item" + (i === active ? " active" : "")}
                  onClick={() => setActive(i)}
                >
                  <div className="elle-issue-thumb">
                    <SilStar color={i === active ? "#ff3eb8" : "#555"} />
                  </div>
                  <div className="elle-issue-info">
                    <span className="elle-issue-num">{c.issue} · {c.season}</span>
                    <span className="elle-issue-name">{c.name}</span>
                    <span className="elle-issue-en">{c.en}</span>
                  </div>
                  {i === active && <div className="elle-active-dot"></div>}
                </button>
              ))}
            </div>

            {/* Auto-progress bar */}
            <div className="elle-progress-bar">
              <div className="elle-progress-fill" key={active}></div>
            </div>
          </div>

          {/* Breaking News Feed Section */}
          {(() => {
            const starsNews = (siteSettings?.newsList || []).filter(news => 
              news.subCategory === "tinc" || 
              news.category.toUpperCase().includes("STARS") || 
              news.category.toUpperCase().includes("CA SĨ") || 
              news.category.toUpperCase().includes("IDOL") || 
              news.category.toUpperCase().includes("CELEB")
            );
            const displayNews = starsNews.length > 0 ? starsNews : [
              { date: "29/05/2026", category: "CONCERT TOUR", title: "DIVA SÂN KHẤU KHỞI ĐỘNG TOUR DIỄN PHÒNG NGỦ", summary: "Thiết kế gối ôm lấy cảm hứng từ trang phục concert lấp lánh của các Diva huyền thoại chính thức mở cổng đặt hàng." },
              { date: "28/05/2026", category: "STYLE NEWS", title: "CẢM HỨNG TỪ ÁNH HÀO QUANG VÀ SỰ ÊM ÁI", summary: "Sản phẩm không chỉ là chiếc gối ôm, mà còn là một tác phẩm thời trang làm nổi bật gu thẩm mỹ của căn phòng bạn." }
            ];
            return (
              <div className="paper-news-section">
                <h4>📰 Tạp chí Showbiz Arena (Celeb & Gossip)</h4>
                <div className="news-grid">
                  {displayNews.map((news, index) => (
                    <div key={index} className="news-item">
                      <span className="date-cat">{news.date} · {news.category}</span>
                      <h5>{news.title}</h5>
                      <p>{news.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          <div className="paper-foot">
            <div className="col">
              <h5>Phong cách thiết kế</h5>
              <p>Lấy cảm hứng từ thời trang cao cấp và ánh sáng sân khấu, mỗi chiếc gối là một tác phẩm thời trang làm nổi bật gu thẩm mỹ hiện đại của không gian sống.</p>
            </div>
            <div className="col">
              <h5>Lịch biểu diễn</h5>
              <p>Diva Sân Khấu đã khởi động Tour diễn phòng ngủ. Rapper Kính Đen và Idol Mic Hồng đang trong quá trình ghi âm mẫu và sẽ sớm được mở bán pre-order.</p>
            </div>
            <div className="col">
              <h5>Lời khuyên Stylist</h5>
              <p>Chất liệu lụa satin mát kháng khuẩn không chỉ bảo vệ làn da của bạn mà còn giữ nếp tóc hoàn hảo sau mỗi đêm diễn dài đầy năng lượng.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❹ PLUSH — cozy pastel lifestyle layout with soft page flip curl
// ─────────────────────────────────────────────────────────────────────────────
function Plush({ catalog, onSelectProduct, siteSettings }) {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [displayActive, setDisplayActive] = useState(0);

  const cards = [
    { name: "Gấu Mochi",   en: "mochi the bear",   icon: SilPlushBear,  c: { bg: "#ffe2b3", shadow: "#f6c8a8" }, href: "gpaw-gau-mochi-thu-nhoi-bong.html", real: true,
      headline: "GẤU MOCHI THÚ NHẬN: 'TÔI MỀM VÀ ÊM ẤM HƠN CRUSH CỦA BẠN GẤP 10 LẦN!'" },
    { name: "Thỏ Nougat",  en: "nougat the bunny", icon: SilPlushBunny, c: { bg: "#f6d5e3", shadow: "#e6b8d2" },
      headline: "VỊ NGỌT KẸO BÔNG THỎ NOUGAT: NGƯỜI BẠN TAI DÀI ÔM ẤM MỖI ĐÊM ĐÔNG CẬN KỀ!" },
    { name: "Mèo Custard", en: "custard the cat",  icon: SilPlushCat,   c: { bg: "#fff1b8", shadow: "#f0d97a" },
      headline: "TIẾNG RÙ RÙ ẤM ÁP CỦA MÈO CUSTARD XUA TAN MỌI MỆT MỎI SAU VÀI GIÂY!" },
    { name: "Cá Voi Vani", en: "vani the whale",   icon: SilPlushWhale, c: { bg: "#c8e7f0", shadow: "#9ccfdf" },
      headline: "GIẤC MƠ THỦY CUNG DI ĐỘNG SIÊU ÊM CÙNG CHÀO ĐÓN CÁ VOI KHỔNG LỒ!" },
    { name: "Cừu Mây",     en: "may the sheep",    icon: SilPlushSheep, c: { bg: "#e6dfff", shadow: "#c8bff0" },
      headline: "LÀN MÂY BỒNG BỀNH CỪU MÂY ĐƯA BẠN VÀO GIẤC NGỦ THẦN TIÊN KHÔNG MƯA GIÔNG!" },
  ];

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % cards.length);
    }, 5000);
    return () => clearInterval(t);
  }, [inView, cards.length]);

  useEffect(() => {
    setFlipping(true);
    const t1 = setTimeout(() => {
      setDisplayActive(active);
    }, 350);
    const t2 = setTimeout(() => {
      setFlipping(false);
    }, 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active]);

  const featured = cards[displayActive];
  const IconComponent = featured.icon;

  const catalogItem = catalog.find(p => p.name.includes(featured.name) || featured.name.includes(p.name));
  const catalogItemDiscount = catalogItem?.sizes?.[0] ? calcDiscountPct(catalogItem.sizes[0].listedPrice, catalogItem.sizes[0].salePrice) : 0;

  const handleProductClick = (card) => {
    const p = catalog.find(x => x.name.includes(card.name) || card.name.includes(x.name));
    if (p) {
      onSelectProduct(p);
    } else {
      onSelectProduct({
        id: card.name.toLowerCase().replace(/\s+/g, '-'),
        name: `Gối ôm ${card.name}`,
        category: "plush",
        images: [],
        sizes: [
          { label: "40cm", listedPrice: 280000, salePrice: 220000 },
          { label: "60cm", listedPrice: 350000, salePrice: 280000 },
          { label: "80cm", listedPrice: 420000, salePrice: 350000 },
        ],
        description: `${card.name} — ${card.headline}`,
        specs: "Vải nhung minky · Ruột bông gòn 3D · An toàn cho trẻ em · Giặt máy được",
        tag: card.href ? "Đang bán" : "Sắp ra mắt",
        available: card.real || false,
        isBestSeller: false,
        isOnSale: false
      });
    }
  };

  const hearts = Array.from({ length: 14 }, (_, i) => ({
    left: `${(i * 7.7) % 96 + 2}%`,
    delay: `${(i % 7) * 1.2}s`,
    dur: `${8 + (i % 5) * 1.5}s`,
    size: 14 + (i % 4) * 4,
  }));

  return (
    <section
      id="plush"
      ref={ref}
      className={"world w-plush" + (inView ? " in" : "")}
      data-screen-label="04 Thú nhồi bông"
    >
      <div className="hearts">
        {hearts.map((h, i) => (
          <span key={i} style={{ left: h.left, bottom: "-30px", "--delay": h.delay, "--dur": h.dur, fontSize: h.size }}>♥</span>
        ))}
      </div>

      <div className="wrap" style={{ position: "relative" }}>
        <div className="hd">
          <div className="badge-num"><span className="pip"></span>Hạng mục IV · Chapter IV</div>
          <h2 className="ani-h2">Thú nhồi <em>bông</em><span className="sq"> ~</span></h2>
          <p className="sub ani-sub">{siteSettings?.plushSlogan || "Không phải nhân vật — chỉ là người bạn nhỏ. ✿"}</p>
        </div>

        <div className="cozy-magazine ani-paper">
          <div className="cozy-body">
            <div className="cozy-featured page-flip-container" style={{ background: featured.c.bg + "20", borderColor: featured.c.shadow }}>
              <div className={"page-curl" + (flipping ? " active" : "")}></div>
              <div className="cozy-masthead">GPAW KINFOLK</div>

              <p className="cozy-headline">"{catalogItem?.headline || featured.headline}"</p>

              <a
                href={catalogItem?.url || "#"}
                onClick={(e) => { if (!catalogItem || !catalogItem.url) { e.preventDefault(); handleProductClick(featured); } }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="frame" style={{ background: featured.c.bg, position: "relative" }}>
                  {catalogItem?.isOnSale && catalogItemDiscount > 0 && (
                    <div className="product-badge-container">
                      <img src="assets/badge-super-sale.png" alt="Giảm giá" />
                      <span className="discount-val">{catalogItemDiscount}%</span>
                    </div>
                  )}
                  <IconComponent />
                </div>
              </a>

              {catalogItem?.sizes?.[0] ? (
                <span className="cozy-price-tag">
                  {catalogItem.sizes[0].salePrice.toLocaleString('vi-VN')}₫ · {catalogItem.sizes[0].salePrice < catalogItem.sizes[0].listedPrice ? 'Đang sale' : 'Đang bán'}
                </span>
              ) : (
                <span className="cozy-price-tag">{featured.href ? "Đang bán" : "Sắp ra mắt"}</span>
              )}

              <div className="cozy-meta-row">
                <span>{featured.name} ({featured.en})</span>
                <span>GPAW SOFTIES CUDDLE CLUB</span>
              </div>
            </div>

            <div className="cozy-thumbs">
              {/* Product info box */}
              {catalogItem && (
                <div className="cozy-product-box" style={{ background: featured.c.bg + "30", borderColor: featured.c.shadow + "60" }}>
                  <div className="cozy-product-label">✿ SẢN PHẨM YÊU THÍCH</div>
                  <div className="cozy-product-name">{catalogItem.name}</div>
                  <div className="cozy-product-price">
                    <span className="cprice-sale" style={{ color: "#a85e72" }}>{catalogItem.sizes[0].salePrice.toLocaleString('vi-VN')}₫</span>
                    {catalogItem.sizes[0].salePrice < catalogItem.sizes[0].listedPrice && (
                      <span className="cprice-listed">{catalogItem.sizes[0].listedPrice.toLocaleString('vi-VN')}₫</span>
                    )}
                  </div>
                  <button type="button" className="cozy-buy-btn" style={{ background: featured.c.shadow }} onClick={() => handleProductClick(featured)}>
                    🧸 Mua ngay
                  </button>
                </div>
              )}

              <div className="p-head">Soft family</div>
              {cards.map((c, i) => {
                const ThumbIcon = c.icon;
                return (
                  <button
                    key={i}
                    type="button"
                    className={"cozy-thumb" + (i === active ? " active" : "")}
                    onClick={() => setActive(i)}
                  >
                    <div className="t-frame" style={{ background: c.c.bg + "50" }}>
                      <ThumbIcon color="#a85e72" />
                    </div>
                    <div className="t-info">
                      <span className="t-num">Mẫu {String(i + 1).padStart(2, "0")} · {c.href ? "Đang bán" : "Đặt trước"}</span>
                      <span className="t-name">{c.name}</span>
                      <span className="t-meta">{c.en}</span>
                    </div>
                  </button>
                );
              })}
              <div className="t-progress" key={active} style={{ background: "rgba(168,94,114,0.15)" }}></div>
            </div>
          </div>

          {/* Breaking News Feed Section */}
          {(() => {
            const plushNews = (siteSettings?.newsList || []).filter(news => 
              news.category.toUpperCase().includes("PLUSH") || 
              news.category.toUpperCase().includes("THÚ BÔNG") || 
              news.category.toUpperCase().includes("MOCHI") || 
              news.category.toUpperCase().includes("CUTE")
            );
            const displayNews = plushNews.length > 0 ? plushNews : [
              { date: "29/05/2026", category: "CUTE CLUB", title: "BÉ GẤU MOCHI BÁN CHẠY NHẤT TUẦN NÀY", summary: "Phiên bản gấu Mochi co giãn 4 chiều mềm mịn đã chiếm trọn trái tim của hàng nghìn khách hàng nhí và cả người lớn." },
              { date: "28/05/2026", category: "CARE TIPS", title: "CÁCH GIỮ RUỘT BÔNG LUÔN TƠI XỐP NHƯ MỚI", summary: "Chỉ cần phơi ruột gối dưới nắng nhẹ từ 2-3 giờ mỗi tháng sẽ giúp bông silicon 3D phồng mịn đàn hồi trọn đời." }
            ];
            return (
              <div className="paper-news-section">
                <h4>📰 Bản tin Cute & Cozy (Pet & Plushie)</h4>
                <div className="news-grid">
                  {displayNews.map((news, index) => (
                    <div key={index} className="news-item">
                      <span className="date-cat">{news.date} · {news.category}</span>
                      <h5>{news.title}</h5>
                      <p>{news.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          <div className="paper-foot">
            <div className="col">
              <h5>Triết lý mềm mại</h5>
              <p>Bông microfiber silicon siêu mịn được nhồi căng phồng tối đa, kết hợp vải co giãn 4 chiều siêu mát, mang lại cảm giác ôm ấm áp như những cái ôm từ thú cưng của bạn.</p>
            </div>
            <div className="col">
              <h5>Nhật ký xưởng may</h5>
              <p>Gấu Mochi đang là gương mặt bán chạy nhất tuần này. Bé Mèo Ú và Thỏ Tai Dài đang được tạo phom dáng tai thỏ và mặt tròn, hứa hẹn cực kỳ ôm chân.</p>
            </div>
            <div className="col">
              <h5>Tuyên bố nâng niu</h5>
              <p>Sản phẩm an toàn 100% cho da nhạy cảm và trẻ em. Được sản xuất và kiểm duyệt nghiêm ngặt chống rụng lông hoặc xẹp bông trọn đời.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Top nav + intro desk + footer
// ─────────────────────────────────────────────────────────────────────────────
// Color palette for paw icon per product theme
const PAW_THEME_COLORS = {
  politics: "#b3242d",   // deep newspaper red
  anime:    "#ff4c94",   // manga pink
  stars:    "#ffd34d",   // golden glamour
  plush:    "#ff9eb1",   // pastel rose
};

function TopNav({ activeTheme, currentUser, onOpenAuth, onLogout, onOpenVouchers, onNavClick, siteSettings }) {
  const pawColor = PAW_THEME_COLORS[activeTheme] || "#b3242d";
  const items = [
    { id: "politics", vi: "Chính trị" },
    { id: "anime",    vi: "Anime" },
    { id: "stars",    vi: "Ca sĩ · Diễn viên" },
    { id: "plush",    vi: "Thú nhồi bông" },
  ];
  return (
    <div className={"topnav theme-" + activeTheme} data-screen-label="00 Top nav">
      <div className="wrap">
        <a href="#top" className="logo" style={{ textDecoration: "none", color: "inherit" }} onClick={(e) => { e.preventDefault(); onNavClick && onNavClick(null); }}>{siteSettings?.brandName || "GPAW"}</a>
        <nav>
          {items.map((it) => (
            <a
              key={it.id}
              href="#"
              className={activeTheme === it.id ? "active" : ""}
              onClick={(e) => { e.preventDefault(); onNavClick && onNavClick(it.id); }}
            >
              {it.vi}
            </a>
          ))}
        </nav>
        <div className="actions">
          {currentUser ? (
            <div className="user-widget">
              <span className="pts-badge" onClick={onOpenVouchers} title="Xem ví Paw">
                <PawIcon size={18} color={pawColor} /> <span style={{ fontWeight: 900 }}>{currentUser.points} Paw</span>
              </span>
              <button 
                type="button" 
                className="btn" 
                onClick={() => onOpenAuth('orders')} 
                style={{ background: '#fff', border: '1.5px solid #16213a', color: '#16213a', padding: '6px 12px', borderRadius: '999px', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: '800' }}
              >
                Đơn hàng của tôi
              </button>
              <div className="avatar" title={`${currentUser.name} (${currentUser.tier})`} onClick={() => onOpenAuth('profile')}>
                {currentUser.name.charAt(0)}
              </div>
              <button className="logout-btn" onClick={onLogout}>Thoát</button>
            </div>
          ) : (
            <>
              <button type="button" className="btn" onClick={() => onOpenAuth('login')}>Đăng nhập</button>
              <button type="button" className="btn fill" onClick={() => onOpenAuth('register')}>Đăng ký</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


function Complaint() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Vui lòng điền các trường bắt buộc (Họ tên, Email, Nội dung)!");
      return;
    }
    alert(`Cảm ơn bạn ${name}! Phản ánh của bạn đã được tiếp nhận. Chúng tôi sẽ phản hồi qua email ${email} trong vòng 24 giờ làm việc.`);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setFile(null);
    setFileName("");
  };

  return (
    <section className="complaint-section" id="complaints">
      <div className="wrap">
        <div className="complaint-box">
          <h3>Khiếu Nại &amp; Phản Ánh Dịch Vụ</h3>
          <p className="sub">GPAW cam kết lắng nghe và khắc phục mọi vấn đề của bạn để cải thiện chất lượng dịch vụ.</p>
          <form className="complaint-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ và Tên *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập họ và tên..." required />
            </div>
            <div className="form-group">
              <label>Email liên hệ *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="yourname@gmail.com" required />
            </div>
            <div className="form-group">
              <label>Số điện thoại</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nhập số điện thoại (nếu có)..." />
            </div>
            <div className="form-group">
              <label>Nội dung phản ánh / Lỗi gặp phải *</label>
              <textarea rows="4" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Chi tiết lỗi sản phẩm, dịch vụ hoặc giao hàng..." required></textarea>
            </div>
            <div className="form-group">
              <label>Tải file ảnh minh họa</label>
              <div className="file-upload">
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <span className="upload-txt">
                  {fileName ? `✓ Đã chọn: ${fileName}` : "📁 Kéo thả hoặc nhấp vào đây để tải ảnh lên (PNG, JPG)"}
                </span>
              </div>
            </div>
            <button type="submit" className="submit-btn">Gửi Phản Ánh</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function FloatContact({ siteSettings }) {
  const zalo = siteSettings?.zaloLink || "https://zalo.me/your_zalo_id";
  const messenger = siteSettings?.messengerLink || "https://m.me/your_messenger_id";
  const phone = siteSettings?.contactPhone || "0901234567";
  return (
    <div className="float-contact">
      <a href={zalo} target="_blank" rel="noopener noreferrer" className="float-btn zalo" title="Chat Zalo" style={{ padding: 0, overflow: 'hidden' }}>
        <img src="assets/icon-zalo.png" alt="Zalo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        <span className="tooltip">Chat Zalo</span>
      </a>
      <a href={messenger} target="_blank" rel="noopener noreferrer" className="float-btn messenger" title="Chat Messenger" style={{ padding: 0, overflow: 'hidden' }}>
        <img src="assets/icon-messenger.png" alt="Messenger" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        <span className="tooltip">Chat Messenger</span>
      </a>
      <a href={`tel:${phone}`} className="float-btn phone" title="Gọi hotline" style={{ padding: 0, overflow: 'hidden' }}>
        <img src="assets/icon-phone.png" alt="Hotline" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        <span className="tooltip">Hotline: {phone}</span>
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ProductDetail — full-screen overlay for product info, gallery, size, qty
// ─────────────────────────────────────────────────────────────────────────────
function ProductDetailPage({ catalog, product, onBuyNow, onAddToCart, siteSettings }) {
  const settings = siteSettings || {};
  const [selectedSize, setSelectedSize] = useState(product.sizes.length ? 0 : -1);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Force scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSelectedSize(product.sizes.length ? 0 : -1);
    setActiveImg(0);
    setQty(1);
    setIsFavorite(false);
  }, [product]);

  // Track recently viewed products in localStorage
  useEffect(() => {
    if (!product) return;
    try {
      const saved = localStorage.getItem("gpaw_recently_viewed");
      let list = saved ? JSON.parse(saved) : [];
      list = list.filter(id => id !== product.id);
      list.unshift(product.id);
      list = list.slice(0, 5); // Store last 5 items
      localStorage.setItem("gpaw_recently_viewed", JSON.stringify(list));
      
      // Update state, filtering out current product
      const displayList = list
        .filter(id => id !== product.id)
        .map(id => catalog.find(p => p.id === id))
        .filter(Boolean);
      setRecentlyViewed(displayList);
    } catch (e) {
      console.error("Error updating recently viewed", e);
    }
  }, [product, catalog]);

  const sizeObj = selectedSize >= 0 ? product.sizes[selectedSize] : null;
  const unitPrice = sizeObj ? sizeObj.salePrice : 0;
  const listedPrice = sizeObj ? sizeObj.listedPrice : 0;
  const discPct = sizeObj ? calcDiscountPct(listedPrice, unitPrice) : 0;
  const skuCode = `GP-${product.id.toUpperCase()}`;

  const handleBuy = () => {
    if (!sizeObj) { alert("Vui lòng chọn kích thước!"); return; }
    onBuyNow({ product, size: sizeObj, qty, unitPrice });
  };

  const handleCart = () => {
    if (!sizeObj) { alert("Vui lòng chọn kích thước!"); return; }
    onAddToCart({ product, size: sizeObj, qty, unitPrice });
    alert(`Đã thêm ${qty}x ${product.name} (${sizeObj.label}) vào giỏ hàng!`);
  };

  const displayImages = product.images.length
    ? product.images
    : ["assets/pillow-front.png"];

  // Related products mapping (3 items in same category)
  const relatedProducts = product.relatedIds && product.relatedIds.length
    ? product.relatedIds.map(id => catalog.find(p => p.id === id.trim())).filter(Boolean)
    : catalog.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  if (relatedProducts.length < 3) {
    const extra = catalog
      .filter((p) => p.id !== product.id && !relatedProducts.find((r) => r.id === p.id))
      .slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...extra);
  }

  const categoryNameMap = {
    politics: "Chính trị",
    anime: "Anime",
    stars: "Ca sĩ · Diễn viên",
    plush: "Thú nhồi bông"
  };

  // CSS size guide chart graphic
  const SizeChart = () => (
    <div className="specs-comparison-chart" style={{ border: "none", padding: 0, background: "none" }}>
      <img 
        src="assets/pillow-size-chart.png" 
        alt="Bảng so sánh kích thước gối Gpaw so với người thật" 
        style={{ width: "100%", height: "auto", display: "block", borderRadius: "12px", border: "1.5px solid #16213a", boxShadow: "var(--shadow-warm)" }}
      />
    </div>
  );

  // Brand Quality Commitments Strip
  const CommitmentsStrip = () => (
    <div className="commitment-strip">
      <div className="c-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="13" r="5"/></svg>
        <div>
          <h6>{settings.commit1Title || "Cotton lụa kháng khuẩn"}</h6>
          <p>{settings.commit1Desc || "Mát mịn, khóa kéo ẩn an toàn"}</p>
        </div>
      </div>
      <div className="c-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>
        <div>
          <h6>{settings.commit2Title || "Bảo hành bông 4 năm"}</h6>
          <p>{settings.commit2Desc || "Chống xẹp phom co rúm"}</p>
        </div>
      </div>
      <div className="c-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="13" height="10"/><path d="M14 8h5l3 4v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>
        <div>
          <h6>{settings.commit3Title || "Đổi trả 7 ngày"}</h6>
          <p>{settings.commit3Desc || "Miễn phí nếu phát sinh lỗi vải"}</p>
        </div>
      </div>
    </div>
  );

  const tabContents = {
    description: (
      <div className="tab-content-pane">
        <p style={{ fontWeight: 600, color: "#16213a", fontSize: "14.5px", margin: "0 0 12px" }}>{product.description}</p>
        {product.specs && (
          <div style={{ fontSize: "13px", color: "#666", fontFamily: "var(--body)", lineHeight: 1.8, fontWeight: 500 }}>
            {typeof product.specs === 'string' ? (
              product.specs.split(" · ").map((s, i) => <div key={i}>• {s}</div>)
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: "4px 8px" }}>
                {product.specs.sku && <><div style={{ fontWeight: "bold" }}>Mã sản phẩm:</div><div>{product.specs.sku}</div></>}
                {product.specs.size && <><div style={{ fontWeight: "bold" }}>Kích thước:</div><div>{product.specs.size}</div></>}
                {product.specs.weight && <><div style={{ fontWeight: "bold" }}>Cân nặng:</div><div>{product.specs.weight}</div></>}
                {product.specs.coverMaterial && <><div style={{ fontWeight: "bold" }}>Chất liệu vỏ:</div><div>{product.specs.coverMaterial}</div></>}
                {product.specs.fillMaterial && <><div style={{ fontWeight: "bold" }}>Chất liệu ruột:</div><div>{product.specs.fillMaterial}</div></>}
              </div>
            )}
          </div>
        )}
        <div style={{ marginTop: "16px", background: "#f8f6f2", padding: "16px", borderRadius: "10px", border: "1.5px solid #e0dcd5" }}>
          <h5 style={{ margin: "0 0 6px", fontSize: "13.5px", fontWeight: 800 }}>{settings.detailMaterialTitle || "Chất liệu & Gia công thủ công tại Sài Gòn"}</h5>
          <p style={{ margin: 0, fontSize: "12.5px", color: "#555", lineHeight: 1.6 }}>
            {settings.detailMaterialDesc || "Mọi chiếc gối ôm Gpaw được vẽ tay chi tiết, in kỹ thuật số 3D chống phai trực tiếp lên sợi vải mát lạnh kháng khuẩn. Ruột gối lót chống thoát bông chứa đầy hạt bông silicon 3D cao cấp tạo đàn hồi căng đầy tự nhiên, sản xuất độc quyền tại Việt Nam."}
          </p>
        </div>
      </div>
    ),
    care: (
      <div className="tab-content-pane">
        <p style={{ margin: "0 0 12px", fontSize: "13.5px", color: "#444", fontWeight: 600 }}>{settings.careTitle || "Hướng dẫn vệ sinh gối định kỳ giúp phom gối luôn phồng mịn, chống bám bụi:"}</p>
        <ul style={{ paddingLeft: "20px", fontSize: "13px", color: "#555", lineHeight: 1.8, margin: 0 }}>
          <li>{settings.careStep1 || "Giặt vỏ gối: Hãy lột vỏ gối giặt bằng máy chế độ nhẹ, nhiệt độ nước dưới 30°C. Nên lộn mặt trái gối trước khi giặt."}</li>
          <li>{settings.careStep2 || "Phơi khô: Không giặt khô vỏ gối, phơi vỏ gối ở bóng mát có gió lùa rộng rãi, không dùng bàn là trực tiếp lên hình in."}</li>
          <li>{settings.careStep3 || "Vệ sinh bông ruột: Tránh nhúng ướt ruột bông. Chỉ cần đem phơi ruột gối dưới nắng nhẹ 2-3 giờ mỗi tháng để bông tơi xốp tự nhiên."}</li>
        </ul>
      </div>
    ),
    policy: (
      <div className="tab-content-pane">
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <h5 style={{ margin: "0 0 4px", fontSize: "13.5px", fontWeight: 800, color: "#b3242d" }}>{settings.policyTitle1 || "🛡️ Chính sách bảo hành xẹp bông 4 năm"}</h5>
            <p style={{ margin: 0, fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{settings.policyDesc1 || "Gpaw Atelier cam kết bảo hành xẹp lún ruột bông trong vòng 4 năm. Nếu ruột gối của bạn bị xẹp xẹp trên 20% so với phom phồng ban đầu, chúng tôi hỗ trợ nhồi bù bông microfiber hoặc đổi ruột mới hoàn toàn miễn phí tại showroom."}</p>
          </div>
          <div>
            <h5 style={{ margin: "0 0 4px", fontSize: "13.5px", fontWeight: 800, color: "#16213a" }}>{settings.policyTitle2 || "🚚 Free ship đơn hàng từ 2 gối"}</h5>
            <p style={{ margin: 0, fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{settings.policyDesc2 || "Miễn phí vận chuyển toàn quốc cho tất cả các đơn hàng mua từ 2 sản phẩm gối ôm trở lên. Đơn 1 gối áp dụng phí giao hàng toàn quốc 30.000₫."}</p>
          </div>
          <div>
            <h5 style={{ margin: "0 0 4px", fontSize: "13.5px", fontWeight: 800, color: "#22c55e" }}>{settings.policyTitle3 || "🔄 Đổi trả lỗi trong 7 ngày"}</h5>
            <p style={{ margin: 0, fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{settings.policyDesc3 || "Khách hàng được đổi trả sản phẩm mới miễn phí trong vòng 7 ngày kể từ lúc nhận hàng nếu có lỗi từ nhà sản xuất (rách chỉ, hư dây kéo, sai mẫu mã)."}</p>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-inner">
        {/* Breadcrumbs */}
        <div className="product-breadcrumb">
          <a href="index.html">Trang chủ</a>
          <span className="sep">/</span>
          <a href={`index.html#${product.category}`}>{categoryNameMap[product.category] || product.category}</a>
          <span className="sep">/</span>
          <span className="current">{product.name}</span>
        </div>

        <div className="product-detail-grid">
          {/* Left: Gallery */}
          <div className="product-gallery">
            <div style={{ position: "relative" }}>
              {product.isOnSale && discPct > 0 && (
                <div className="product-badge-container">
                  <img src="assets/badge-super-sale.png" alt="Giảm giá" />
                  <span className="discount-val">{discPct}%</span>
                </div>
              )}
              <img
                className="main-image"
                src={displayImages[activeImg] || displayImages[0]}
                alt={product.name}
              />
            </div>
            {displayImages.length > 1 && (
              <div className="thumb-row">
                {displayImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    className={i === activeImg ? "active" : ""}
                    onClick={() => setActiveImg(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Info Panel */}
          <div className="product-info">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="product-category-tag">{categoryNameMap[product.category]}</span>
              <span className="sku-tag" style={{ fontFamily: "var(--body)", fontSize: "11px", color: "#888", fontWeight: 700 }}>{skuCode}</span>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginTop: "4px" }}>
              <h2 className="product-name" style={{ margin: 0 }}>{product.name}</h2>
              <button 
                type="button" 
                className={`fav-heart-btn${isFavorite ? " active" : ""}`}
                onClick={() => setIsFavorite(!isFavorite)}
                title={isFavorite ? "Bỏ thích" : "Thích sản phẩm"}
              >
                {isFavorite ? "❤️" : "🤍"}
              </button>
            </div>
            
            {sizeObj && (
              <div className="price-display">
                {listedPrice !== unitPrice && <span className="listed-price">{fmtPrice(listedPrice)}</span>}
                <span className="sale-price">{fmtPrice(unitPrice)}</span>
                {discPct > 0 && <span className="discount-pct">-{discPct}%</span>}
              </div>
            )}

            <div style={{ marginTop: "4px" }}>
              <span className="product-category-tag" style={{ background: product.tag === "Đang bán" ? "#dcfce7" : product.tag === "Đặt trước" ? "#fef9c3" : "#f1f5f9", color: product.tag === "Đang bán" ? "#166534" : product.tag === "Đặt trước" ? "#854d0e" : "#64748b" }}>{product.tag}</span>
            </div>

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="size-selector">
                <label>Chọn kích thước</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {product.sizes.map((s, i) => (
                    <button
                      key={s.label}
                      type="button"
                      className={`size-btn${selectedSize === i ? " active" : ""}`}
                      onClick={() => setSelectedSize(i)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity control & CTA buy now */}
            <div className="qty-control-row" style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "14px" }}>
              <div className="qty-control">
                <button type="button" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <input type="number" value={qty} min={1} max={99} onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))} />
                <button type="button" onClick={() => setQty(Math.min(99, qty + 1))}>+</button>
              </div>
              {product.available ? (
                <div style={{ display: "flex", gap: "12px", flex: 1 }}>
                  <button className="btn-add-cart" onClick={handleCart} style={{ flex: 1 }}>Thêm vào giỏ</button>
                  <button className="btn-buy-now" onClick={handleBuy} style={{ flex: 1.5 }}>Mua ngay</button>
                </div>
              ) : (
                <button className="btn-buy-now disabled" disabled style={{ flex: 1, background: "#ccc", cursor: "not-allowed", boxShadow: "none" }}>Sản phẩm sắp ra mắt</button>
              )}
            </div>

            {/* Size Guide Chart Inside Info Column */}
            <SizeChart />

            {/* Commitments Strip */}
            <CommitmentsStrip />
          </div>
        </div>

        {/* Tabbed Info Block (Details, Care, Policy) */}
        <div className="product-info-tabs" style={{ marginTop: "50px", borderTop: "1px solid #eee", paddingTop: "30px" }}>
          <div className="info-tabs-nav">
            <button className={activeTab === "description" ? "active" : ""} onClick={() => setActiveTab("description")}>Mô tả sản phẩm</button>
            <button className={activeTab === "care" ? "active" : ""} onClick={() => setActiveTab("care")}>Hướng dẫn bảo quản</button>
            <button className={activeTab === "policy" ? "active" : ""} onClick={() => setActiveTab("policy")}>Chính sách xưởng Gpaw</button>
          </div>
          <div className="info-tab-content" style={{ marginTop: "24px" }}>
            {tabContents[activeTab]}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="related-products-section">
          <h3>Có thể bạn sẽ thích</h3>
          <div className="related-grid">
            {relatedProducts.map((p) => {
              const pPrice = p.sizes[0] ? p.sizes[0].salePrice : 0;
              const pListed = p.sizes[0] ? p.sizes[0].listedPrice : 0;
              const pDisc = pListed > 0 && pPrice > 0 ? calcDiscountPct(pListed, pPrice) : 0;
              return (
                <a href={p.url || "#"} className="related-card" key={p.id}>
                  <div className="r-frame">

                    {p.isOnSale && pDisc > 0 && <span className="product-badge on-sale small">-{pDisc}%</span>}
                    <img src={p.img || "assets/pillow-front.png"} alt={p.name} />
                  </div>
                  <div className="r-info">
                    <span className="r-category">{categoryNameMap[p.category]}</span>
                    <h5 className="r-name">{p.name}</h5>
                    <div className="r-price-row">
                      <span className="r-price">{fmtPrice(pPrice)}</span>
                      {pListed !== pPrice && <span className="r-listed">{fmtPrice(pListed)}</span>}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Recently Viewed Products Section */}
        {recentlyViewed.length > 0 && (
          <div className="recently-viewed-section" style={{ marginTop: "60px", borderTop: "1px dashed rgba(22,33,58,0.15)", paddingTop: "50px" }}>
            <h3 style={{ fontFamily: "var(--display-serif)", fontSize: "24px", fontWeight: 800, color: "#16213a", margin: "0 0 24px", textAlign: "left" }}>Các sản phẩm bạn đã xem</h3>
            <div className="recently-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
              {recentlyViewed.map((p) => {
                const pPrice = p.sizes[0] ? p.sizes[0].salePrice : 0;
                const pListed = p.sizes[0] ? p.sizes[0].listedPrice : 0;
                const pDisc = pListed > 0 && pPrice > 0 ? calcDiscountPct(pListed, pPrice) : 0;
                return (
                  <a href={p.url || "#"} className="related-card" key={p.id} style={{ padding: "10px", borderRadius: "10px" }}>
                    <div className="r-frame" style={{ borderRadius: "6px" }}>

                      {p.isOnSale && pDisc > 0 && <span className="product-badge on-sale small">-{pDisc}%</span>}
                      <img src={p.img || "assets/pillow-front.png"} alt={p.name} />
                    </div>
                    <div className="r-info" style={{ padding: "8px 0 0" }}>
                      <span className="r-category" style={{ fontSize: "8px" }}>{categoryNameMap[p.category]}</span>
                      <h5 className="r-name" style={{ fontSize: "14px", fontWeight: 700 }}>{p.name}</h5>
                      <div className="r-price-row" style={{ marginTop: "4px" }}>
                        <span className="r-price" style={{ fontSize: "12px" }}>{fmtPrice(pPrice)}</span>
                        {pListed !== pPrice && <span className="r-listed" style={{ fontSize: "10px" }}>{fmtPrice(pListed)}</span>}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckoutForm({ item, currentUser, vouchers, onClose, onPlaceOrder }) {
  // Submitting state for serverless API
  const [submitting, setSubmitting] = useState(false);
  // Address state
  const [province, setProvince] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [phoneError, setPhoneError] = useState("");

  // Paw redemption
  const [pawInput, setPawInput] = useState(0);
  const pawBalance = currentUser?.points || 0;
  const pawDiscount = Math.min(pawInput, pawBalance) * 1000;

  // Voucher
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState("");

  // Payment method
  const [payMethod, setPayMethod] = useState("cod");

  // Computed
  const subtotal = item.unitPrice * item.qty;
  const isFreeship = item.qty >= 2;
  const shippingFee = isFreeship ? 0 : 30000;
  const voucherDiscount = appliedVoucher?.type === "freeship" ? shippingFee : (appliedVoucher?.discountAmount || 0);
  const total = Math.max(0, subtotal + shippingFee - pawDiscount - voucherDiscount);

  // Wards for selected province
  const selectedProvince = VN_PROVINCES.find(p => p.id === province);
  const availableWards = selectedProvince?.wards || [];

  const handleApplyVoucher = () => {
    const found = vouchers.find(v => v.code.toLowerCase() === voucherCode.trim().toLowerCase());
    if (!found) {
      setVoucherError("Mã voucher không hợp lệ!");
      setAppliedVoucher(null);
      return;
    }
    setAppliedVoucher(found);
    setVoucherError("");
  };

  const validatePhone = (val) => {
    setPhone(val);
    if (val && !VN_PHONE_REGEX.test(val)) {
      setPhoneError("Số điện thoại không đúng định dạng VN (VD: 0901234567)");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!province) { alert("Vui lòng chọn Tỉnh/Thành phố!"); return; }
    if (!address.trim()) { alert("Vui lòng nhập địa chỉ chi tiết!"); return; }
    if (!phone) { alert("Vui lòng nhập số điện thoại!"); return; }
    if (!VN_PHONE_REGEX.test(phone)) { alert("Số điện thoại không đúng định dạng!"); return; }

    const provinceName = selectedProvince?.name || province;
    const wardName = ward || "";
    const fullAddress = `${address}, ${wardName}${wardName ? ", " : ""}${provinceName}`;

    setSubmitting(true);
    const res = await onPlaceOrder({
      product: item.product,
      size: item.size,
      qty: item.qty,
      subtotal,
      shippingFee: isFreeship ? 0 : shippingFee,
      pawDiscount,
      voucherDiscount,
      total,
      payMethod,
      phone,
      fullAddress,
      appliedVoucher,
      pawUsed: Math.min(pawInput, pawBalance),
      customerName: currentUser ? currentUser.name : "Khách vãng lai",
      customerPhone: phone,
      customerAddress: fullAddress
    });

    if (res && !res.success) {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-inner" onClick={(e) => e.stopPropagation()}>
        <button className="product-detail-close" onClick={onClose}>✕</button>
        <h3 style={{ fontFamily: "var(--display-serif)", fontSize: "22px", fontWeight: 900, color: "#16213a", marginBottom: "4px" }}>Thanh Toán Đơn Hàng</h3>
        <p style={{ fontSize: "12px", color: "#888", fontWeight: 600, marginBottom: "20px" }}>
          {item.product.name} · {item.size.label} × {item.qty}
        </p>

        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* Address Section */}
          <div className="checkout-section">
            <h4>📍 Thông tin nhận hàng</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Tỉnh / Thành phố *</label>
                <select value={province} onChange={(e) => { setProvince(e.target.value); setWard(""); }}>
                  <option value="">— Chọn Tỉnh/TP —</option>
                  {VN_PROVINCES.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Quận / Huyện / Xã</label>
                {availableWards.length > 0 ? (
                  <select value={ward} onChange={(e) => setWard(e.target.value)}>
                    <option value="">— Chọn Quận/Huyện —</option>
                    {availableWards.map(w => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                ) : (
                  <input type="text" value={ward} onChange={(e) => setWard(e.target.value)} placeholder="Nhập quận/huyện/xã..." />
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Địa chỉ chi tiết *</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Số nhà, tên đường, tòa nhà..." />
            </div>
            <div className="form-group">
              <label>Số điện thoại *</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => validatePhone(e.target.value)}
                placeholder="VD: 0901234567 hoặc +84901234567"
                className={phoneError ? "input-error" : ""}
                maxLength={12}
              />
              {phoneError && <div className="error-msg">{phoneError}</div>}
            </div>
          </div>

          {/* Paw Redemption */}
          {currentUser && pawBalance > 0 && (
            <div className="checkout-section">
              <h4>🐾 Quy đổi điểm Paw</h4>
              <div className="paw-redeem">
                <div className="paw-balance">
                  <PawIcon size={18} color="#b3242d" /> Số dư: <span>{pawBalance} Paw</span>
                </div>
                <div className="paw-input-row">
                  <input
                    type="number"
                    min={0}
                    max={pawBalance}
                    value={pawInput}
                    onChange={(e) => setPawInput(Math.max(0, Math.min(pawBalance, parseInt(e.target.value) || 0)))}
                    placeholder="0"
                  />
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#444" }}>Paw (1 Paw = 1.000₫)</span>
                  {pawDiscount > 0 && <span className="paw-discount-preview">→ Giảm {fmtPrice(pawDiscount)}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Voucher */}
          <div className="checkout-section">
            <h4>🎫 Mã Voucher</h4>
            {appliedVoucher ? (
              <div className="voucher-applied">
                ✅ Đã áp dụng: <b>{appliedVoucher.code}</b> ({appliedVoucher.valueDesc})
                <button type="button" onClick={() => { setAppliedVoucher(null); setVoucherCode(""); }} style={{ marginLeft: "auto", background: "none", border: "none", color: "#e74c3c", cursor: "pointer", fontWeight: 800 }}>✕ Hủy</button>
              </div>
            ) : (
              <>
                <div className="voucher-row">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="Nhập mã voucher..."
                  />
                  <button type="button" onClick={handleApplyVoucher}>Áp dụng</button>
                </div>
                {voucherError && <div className="error-msg" style={{ marginTop: "6px" }}>{voucherError}</div>}
              </>
            )}
          </div>

          {/* Payment Method */}
          <div className="checkout-section">
            <h4>💳 Hình thức thanh toán</h4>
            <div className="payment-options">
              <label className={"payment-option" + (payMethod === "cod" ? " selected" : "")} onClick={() => setPayMethod("cod")}>
                <input type="radio" name="pay" value="cod" checked={payMethod === "cod"} onChange={() => setPayMethod("cod")} />
                <div>
                  <div className="pay-label">Ship COD — Thanh toán khi nhận hàng</div>
                  <div className="pay-desc">Kiểm tra hàng trước khi thanh toán cho shipper.</div>
                </div>
              </label>
              <label className={"payment-option" + (payMethod === "transfer" ? " selected" : "")} onClick={() => setPayMethod("transfer")}>
                <input type="radio" name="pay" value="transfer" checked={payMethod === "transfer"} onChange={() => setPayMethod("transfer")} />
                <div>
                  <div className="pay-label">Chuyển khoản ngân hàng</div>
                  <div className="pay-desc">Thanh toán trước qua chuyển khoản ngân hàng.</div>
                  <div className="pay-bonus">🎁 Được tặng voucher 10 Paw (tương ứng 10.000₫)</div>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary-box">
            <h4>Tổng kết đơn hàng</h4>
            <div className="summary-row">
              <span>{item.product.name} ({item.size.label}) × {item.qty}</span>
              <span>{fmtPrice(subtotal)}</span>
            </div>
            <div className={"summary-row" + (isFreeship ? " free-ship" : "")}>
              <span>Phí vận chuyển</span>
              <span>{isFreeship ? "MIỄN PHÍ 🎉" : fmtPrice(shippingFee)}</span>
            </div>
            {pawDiscount > 0 && (
              <div className="summary-row discount">
                <span>Paw quy đổi ({Math.min(pawInput, pawBalance)} Paw)</span>
                <span>-{fmtPrice(pawDiscount)}</span>
              </div>
            )}
            {voucherDiscount > 0 && (
              <div className="summary-row discount">
                <span>Voucher ({appliedVoucher.code})</span>
                <span>-{fmtPrice(voucherDiscount)}</span>
              </div>
            )}
            <div className="summary-row total">
              <span>TỔNG THANH TOÁN</span>
              <span>{fmtPrice(total)}</span>
            </div>
          </div>

          <button type="submit" className="btn-place-order" disabled={submitting}>
            {submitting ? "ĐANG XỬ LÝ..." : "ĐẶT HÀNG"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OrderSuccessPopup — thank you popup with Paw rewards
// ─────────────────────────────────────────────────────────────────────────────
function OrderSuccessPopup({ orderResult, onContinue, onTrackOrders }) {
  const basePaw = Math.ceil(orderResult.total / 100000);
  const bonusPaw = orderResult.payMethod === "transfer" ? 10 : 0;
  const totalPaw = basePaw + bonusPaw;

  return (
    <div className="success-overlay" onClick={onContinue}>
      <div className="success-popup" onClick={(e) => e.stopPropagation()}>
        <div className="success-icon">🎉</div>
        <h3>CẢM ƠN BẠN!</h3>
        <div className="order-code">Đơn hàng #{orderResult.orderId} đã được tiếp nhận thành công!</div>

        <div className="paw-reward-box">
          <div className="reward-line">
            <span>🐾 Paw thưởng đơn hàng</span>
            <span>+{basePaw} Paw</span>
          </div>
          {bonusPaw > 0 && (
            <div className="reward-line bonus">
              <span>🎁 Bonus chuyển khoản</span>
              <span>+{bonusPaw} Paw</span>
            </div>
          )}
          <div className="reward-total">
            <span>Tổng Paw nhận</span>
            <span>{totalPaw} Paw</span>
          </div>
        </div>

        <div className="success-btns">
          <button className="btn-continue" onClick={onContinue}>🛍️ Tiếp tục mua sắm</button>
          <button className="btn-track" onClick={onTrackOrders}>📦 Theo dõi đơn hàng</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FreeshipToast — suggestion for new customers
// ─────────────────────────────────────────────────────────────────────────────
function FreeshipToast({ onDismiss, onApply }) {
  return (
    <div className="freeship-toast">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 18, height: 18, color: '#ffea4b', flexShrink: 0 }}><rect x="1" y="6" width="13" height="10"/><path d="M14 8h5l3 4v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>
      <span>Khách hàng mới! Nhận mã <b style={{ color: '#ffea4b' }}>FREESHIP</b> cho đơn đầu tiên!</span>
      <button onClick={onApply}>Lấy ngay</button>
      <button className="close-toast" onClick={onDismiss}>✕</button>
    </div>
  );
}

function Footer({ siteSettings }) {
  return (
    <footer data-screen-label="99 Footer">
      <div className="wrap">
        <div className="col brand">
          <div className="lockup">{siteSettings?.brandName || "GPAW"}</div>
          <p>{siteSettings?.footerAbout || "Studio gối ôm 3D thủ công tại Sài Gòn. Bốn vũ trụ, một chiếc gối."}</p>
        </div>
        <div className="col">
          <h4>Hạng mục</h4>
          <a href="#politics">Chính trị</a>
          <a href="#anime">Anime</a>
          <a href="#stars">Ca sĩ · Diễn viên</a>
          <a href="#plush">Thú nhồi bông</a>
          <a href="#complaints">Khiếu nại dịch vụ</a>
        </div>
        <div className="col">
          <h4>Mua hàng</h4>
          <a href="#">Tất cả sản phẩm</a>
          <a href="#">Đặt theo yêu cầu</a>
          <a href="#">Hướng dẫn chọn size</a>
          <a href="#">Tra cứu đơn</a>
        </div>
        <div className="col">
          <h4>Theo dõi</h4>
          <a href="#">Facebook · @gpaw.studio</a>
          <a href="#">Instagram · @gpaw.pillows</a>
          <a href="#">TikTok · @gpaw</a>
          <a href="#">Shopee Mall</a>
        </div>
      </div>
      <div className="wrap legal">
        <span>© 2026 Gpaw Atelier · Sài Gòn</span>
        <span>Parody merchandise · Sản phẩm mang tính giải trí</span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ❸ ADMIN PANEL Component (admin.gpaw.vn)
// ─────────────────────────────────────────────────────────────────────────────

// ── AdminPanelProductEditor ──
function AdminPanel({ 
  customers, 
  onUpdateCustomers, 
  orders, 
  onUpdateOrders, 
  vouchers, 
  onCreateVoucher, 
  catalog, 
  onUpdateCatalog, 
  siteSettings, 
  onUpdateSiteSettings 
}) {
  const [activeTab, setActiveTab] = useState("products"); // products | text_theme | customers | orders | news | seo | vouchers

  // Sidebar selections & states
  // 1. Products Tab States
  const [selectedProdId, setSelectedProdId] = useState(null);
  const [collapsedCats, setCollapsedCats] = useState({
    politics: true,
    anime: true,
    stars: true,
    plush: true
  });
  const [prodName, setProdName] = useState("");
  const [prodCategory, setProdCategory] = useState("politics");
  const [prodHeadline, setProdHeadline] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  
  // Structured specs states:
  const [prodSpecSize, setProdSpecSize] = useState("");
  const [prodSpecWeight, setProdSpecWeight] = useState("");
  const [prodSpecFill, setProdSpecFill] = useState("");
  const [prodSpecCover, setProdSpecCover] = useState("");
  const [prodSpecSku, setProdSpecSku] = useState("");

  const [prodTag, setProdTag] = useState("Đang bán");
  const [prodAvailable, setProdAvailable] = useState(true);
  const [prodBestSeller, setProdBestSeller] = useState(false);
  const [prodOnSale, setProdOnSale] = useState(false);
  const [prodRelatedIds, setProdRelatedIds] = useState("");
  const [prodSizes, setProdSizes] = useState([
    { label: "80cm", listedPrice: 380000, salePrice: 320000 },
    { label: "120cm", listedPrice: 520000, salePrice: 450000 }
  ]);
  const [prodImages, setProdImages] = useState(["assets/pillow-front.png"]);

  // Excel Bulk Update Simulator States
  const [uploadingExcel, setUploadingExcel] = useState(false);
  const [excelProgress, setExcelProgress] = useState(0);
  const [excelLogs, setExcelLogs] = useState("");
  const [draggingExcel, setDraggingExcel] = useState(false);
  
  // Bulk CSV/Excel Uploader states:
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [uploadedProducts, setUploadedProducts] = useState(null);
  const [uploadedCount, setUploadedCount] = useState(0);

  // Load product settings when selected
  useEffect(() => {
    if (!selectedProdId) return;
    if (selectedProdId === "new") {
      setProdName("");
      setProdCategory("politics");
      setProdHeadline("");
      setProdDesc("");
      setProdSpecSize("80cm - 150cm");
      setProdSpecWeight("1.2kg - 2.8kg");
      setProdSpecFill("Ruột polyester chống xẹp");
      setProdSpecCover("Vải cotton lụa 100%");
      setProdSpecSku("GP-NEW");
      setProdTag("Đang bán");
      setProdAvailable(true);
      setProdBestSeller(false);
      setProdOnSale(false);
      setProdRelatedIds("");
      setProdSizes([
        { label: "80cm", listedPrice: 380000, salePrice: 320000 },
        { label: "120cm", listedPrice: 520000, salePrice: 450000 }
      ]);
      setProdImages(["assets/pillow-front.png"]);
    } else {
      const p = catalog.find(x => x.id === selectedProdId);
      if (p) {
        setProdName(p.name);
        setProdCategory(p.category || "politics");
        setProdHeadline(p.headline || "");
        setProdDesc(p.description || "");
        
        // Handle structured specs
        const specsObj = p.specs && typeof p.specs === "object" ? p.specs : {};
        let size = specsObj.size || "";
        let weight = specsObj.weight || "";
        let fill = specsObj.fillMaterial || "";
        let cover = specsObj.coverMaterial || "";
        let sku = specsObj.sku || p.id?.toUpperCase() || "";
        
        // Parse specs from string if needed
        if (typeof p.specs === "string" && p.specs) {
          const parts = p.specs.split(" · ");
          parts.forEach(part => {
            if (part.toLowerCase().includes("cotton") || part.toLowerCase().includes("vỏ") || part.toLowerCase().includes("vải") || part.toLowerCase().includes("satin") || part.toLowerCase().includes("nhung")) {
              cover = part;
            } else if (part.toLowerCase().includes("ruột") || part.toLowerCase().includes("bông") || part.toLowerCase().includes("silicon") || part.toLowerCase().includes("polyester")) {
              fill = part;
            } else if (part.toLowerCase().includes("nặng") || part.toLowerCase().includes("kg") || part.toLowerCase().includes("g")) {
              weight = part;
            } else if (part.toLowerCase().includes("kích thước") || part.toLowerCase().includes("cm") || part.toLowerCase().includes("m")) {
              size = part;
            }
          });
        }
        setProdSpecSize(size);
        setProdSpecWeight(weight);
        setProdSpecFill(fill);
        setProdSpecCover(cover);
        setProdSpecSku(sku);

        setProdTag(p.tag || "Đang bán");
        setProdAvailable(!!p.available);
        setProdBestSeller(!!p.isBestSeller);
        setProdOnSale(!!p.isOnSale);
        setProdRelatedIds((p.relatedIds || []).join(", "));
        setProdSizes(p.sizes || []);
        setProdImages(p.images || ["assets/pillow-front.png"]);
      }
    }
  }, [selectedProdId, catalog]);

  const handleProductPriceChange = (index, field, val) => {
    const updated = [...prodSizes];
    updated[index] = { ...updated[index], [field]: parseInt(val) || 0 };
    setProdSizes(updated);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!prodName) { alert("Vui lòng điền tên sản phẩm!"); return; }

    const sizeArray = prodSizes.map(s => ({
      label: s.label,
      listedPrice: Number(s.listedPrice) || 0,
      salePrice: Number(s.salePrice) || 0
    }));

    const parsedRelated = prodRelatedIds ? prodRelatedIds.split(",").map(x => x.trim()).filter(Boolean) : [];
    const updatedSpecs = {
      size: prodSpecSize,
      weight: prodSpecWeight,
      fillMaterial: prodSpecFill,
      coverMaterial: prodSpecCover,
      sku: prodSpecSku
    };

    if (selectedProdId === "new") {
      const prefixMap = { politics: "p", anime: "a", stars: "s", plush: "pl" };
      const prefix = prefixMap[prodCategory] || "p";
      const newId = prefix + String(catalog.length + 1).padStart(3, "0");
      const newProd = {
        id: newId,
        name: prodName,
        category: prodCategory,
        headline: prodHeadline,
        description: prodDesc,
        specs: updatedSpecs,
        tag: prodTag,
        available: prodAvailable,
        isBestSeller: prodBestSeller,
        isOnSale: prodOnSale,
        relatedIds: parsedRelated,
        sizes: sizeArray,
        images: prodImages
      };
      onUpdateCatalog([...catalog, newProd]);
      setSelectedProdId(newId);
      alert(`Đã thêm sản phẩm mới "${prodName}" với mã hàng GP-${newId.toUpperCase()}`);
    } else {
      const updated = catalog.map(p => {
        if (p.id === selectedProdId) {
          return {
            ...p,
            name: prodName,
            category: prodCategory,
            headline: prodHeadline,
            description: prodDesc,
            specs: updatedSpecs,
            tag: prodTag,
            available: prodAvailable,
            isBestSeller: prodBestSeller,
            isOnSale: prodOnSale,
            relatedIds: parsedRelated,
            sizes: sizeArray,
            images: prodImages
          };
        }
        return p;
      });
      onUpdateCatalog(updated);
      alert("Đã lưu các chỉnh sửa của sản phẩm!");
    }
  };

  const handleDeleteProduct = () => {
    if (selectedProdId === "new") return;
    if (confirm(`Bạn chắc chắn muốn xóa sản phẩm này khỏi hệ thống?`)) {
      const updated = catalog.filter(p => p.id !== selectedProdId);
      onUpdateCatalog(updated);
      setSelectedProdId(updated[0]?.id || "new");
      alert("Đã xóa sản phẩm thành công!");
    }
  };

  // Image Upload Simulator Handler
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProdImages([...prodImages, event.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const updated = prodImages.filter((_, idx) => idx !== index);
    setProdImages(updated.length > 0 ? updated : ["assets/pillow-front.png"]);
  };

  const handleCoverFileChange = (cat, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (cat === "politics") setCoverPol(event.target.result);
        if (cat === "anime") setCoverAni(event.target.result);
        if (cat === "stars") setCoverSta(event.target.result);
        if (cat === "plush") setCoverPlu(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Excel Bulk Update Simulator Handler
  const runMockExcelImport = (e) => {
    if (e) e.preventDefault();
    setUploadingExcel(true);
    setExcelProgress(0);
    setExcelLogs("Đang kết nối tệp Excel cập nhật hàng loạt...\n");
    
    let p = 0;
    const interval = setInterval(() => {
      p += 20;
      setExcelProgress(p);
      if (p === 20) setExcelLogs(l => l + "Đang phân tích cấu trúc cột (Mã SP, Tên, Giá, Tags)...\n");
      if (p === 60) setExcelLogs(l => l + "Phát hiện thay đổi trên dòng dữ liệu 2, 4 và thêm mới dòng 6...\n");
      if (p === 100) {
        clearInterval(interval);
        setUploadingExcel(false);
        
        // Actually modify some catalog items to simulate real bulk update!
        const updatedCatalog = catalog.map((item, idx) => {
          if (idx === 0) { // e.g. Donald Trump
            const updatedSizes = item.sizes.map(s => ({
              ...s,
              salePrice: s.salePrice - 10000 // decrease by 10k
            }));
            return { ...item, sizes: updatedSizes, tag: "Giá siêu rẻ" };
          }
          if (idx === 1) { // e.g. Vladimir Putin
            return { ...item, isBestSeller: true };
          }
          return item;
        });
        
        // Add a mock Koala plush product if not exists
        const koalaExists = catalog.find(x => x.id === "pl009");
        if (!koalaExists) {
          updatedCatalog.push({
            id: "pl009",
            name: "Gấu Koala Nhồi Bông",
            category: "plush",
            headline: "GẤU KOALA SIÊU ÊM ÁI DÀNH CHO BÉ",
            description: "Koala xám lông mịn từ bông PP nhập khẩu Hàn Quốc.",
            specs: "Bông PP rỗng 3D · Lông mịn sát · Giặt máy thoải mái · Đạt chuẩn xuất khẩu",
            tag: "Bán chạy",
            available: true,
            isBestSeller: true,
            isOnSale: false,
            sizes: [
              { label: "80cm", listedPrice: 320000, salePrice: 280000 },
              { label: "120cm", listedPrice: 480000, salePrice: 420000 }
            ],
            images: ["assets/pillow-front.png"]
          });
        }
        
        onUpdateCatalog(updatedCatalog);
        
        setExcelLogs(l => l + `[OK] Đã cập nhật giá bán gối GP-P001 (Donald Trump) giảm 10.000₫ và đổi tag.\n` +
                             `[OK] Đã kích hoạt nhãn 'Bán chạy' cho sản phẩm GP-A001.\n` +
                             `[OK] Tạo mới thành công sản phẩm GP-PL009 (Gấu Koala Nhồi Bông) vào danh mục Thú bông.\n` +
                             `🎉 Đồng bộ cơ sở dữ liệu thành công! Cập nhật 3 sản phẩm.`);
        alert("Đã cập nhật hàng loạt thành công dữ liệu từ file Excel!");
      }
    }, 250);
  };

  const handleExcelDragOver = (e) => {
    e.preventDefault();
    setDraggingExcel(true);
  };

  const handleExcelDragLeave = () => {
    setDraggingExcel(false);
  };

  const handleExcelDrop = (e) => {
    e.preventDefault();
    setDraggingExcel(false);
    runMockExcelImport();
  };

  // Excel Bulk Upload Template download and parser
  const downloadSampleCSV = () => {
    const headers = ["ID", "Name", "Category", "Headline", "Description", "SizeSpec", "WeightSpec", "FillSpec", "CoverSpec", "SkuSpec", "Tag", "Available", "Sizes"];
    const rows = [
      headers.join(","),
      `"p001","Gối ôm Donal Trump","politics","TRUMP SIÊU CẤP","Gối ôm Donald Trump cao cấp nhất.","80cm - 150cm","1.2kg - 2.8kg","Bông silicon 3D","Vải cotton lụa 100%","GP-P001","Bán chạy","TRUE","80cm:380000:320000|120cm:520000:450000"`,
      `"pl009","Gối ôm Koala","plush","KINKOF KOALA","Gối Koala xám lông mịn.","80cm - 120cm","1.0kg - 1.5kg","Bông PP Hàn Quốc","Vải nhung Minky","GP-PL009","Mới","TRUE","80cm:300000:250000|120cm:450000:380000"`
    ];
    const csvContent = "\uFEFF" + rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "gpaw_mau_san_pham.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExcelUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = [];
        let row = [""];
        let inQuotes = false;
        
        for (let i = 0; i < text.length; i++) {
          const c = text[i];
          const next = text[i+1];
          if (c === '"') {
            if (inQuotes && next === '"') {
              row[row.length - 1] += '"';
              i++;
            } else {
              inQuotes = !inQuotes;
            }
          } else if (c === ',' && !inQuotes) {
            row.push("");
          } else if ((c === '\r' || c === '\n') && !inQuotes) {
            if (c === '\r' && next === '\n') {
              i++;
            }
            lines.push(row);
            row = [""];
          } else {
            row[row.length - 1] += c;
          }
        }
        if (row.length > 1 || row[0] !== "") {
          lines.push(row);
        }
        
        if (lines.length < 2) {
          alert("File CSV trống hoặc không đúng định dạng!");
          return;
        }
        
        const headers = lines[0].map(h => h.trim().toLowerCase());
        const dataRows = lines.slice(1);
        
        const parsedProducts = dataRows.map(row => {
          if (row.length < 2) return null;
          
          const id = row[0]?.trim();
          const name = row[1]?.trim();
          const category = row[2]?.trim();
          const headline = row[3]?.trim();
          const description = row[4]?.trim();
          
          const sizeSpec = row[5]?.trim() || "";
          const weightSpec = row[6]?.trim() || "";
          const fillSpec = row[7]?.trim() || "";
          const coverSpec = row[8]?.trim() || "";
          const skuSpec = row[9]?.trim() || "";
          
          const tag = row[10]?.trim() || "Đang bán";
          const available = row[11]?.trim().toLowerCase() === "true" || row[11]?.trim() === "1";
          
          const sizesStr = row[12]?.trim() || "";
          const sizes = sizesStr.split("|").filter(Boolean).map(item => {
            const parts = item.split(":");
            return {
              label: parts[0] || "100cm",
              listedPrice: Number(parts[1]) || 0,
              salePrice: Number(parts[2]) || 0
            };
          });
          
          if (!id || !name) return null;
          
          return {
            id,
            name,
            category: category || "politics",
            headline: headline || "",
            description: description || "",
            specs: {
              size: sizeSpec,
              weight: weightSpec,
              fillMaterial: fillSpec,
              coverMaterial: coverSpec,
              sku: skuSpec
            },
            tag,
            available,
            isBestSeller: false,
            isOnSale: false,
            sizes,
            images: ["assets/pillow-front.png"]
          };
        }).filter(Boolean);
        
        if (parsedProducts.length === 0) {
          alert("Không tìm thấy sản phẩm hợp lệ nào trong file!");
          return;
        }
        
        let newCatalog = [...catalog];
        parsedProducts.forEach(newP => {
          const idx = newCatalog.findIndex(x => x.id === newP.id);
          if (idx >= 0) {
            newCatalog[idx] = { ...newCatalog[idx], ...newP };
          } else {
            newCatalog.push(newP);
          }
        });
        
        setUploadedProducts(newCatalog);
        setUploadedCount(parsedProducts.length);
        alert(`Đã tải thành công ${parsedProducts.length} sản phẩm. Nhấn nút Lưu ở dưới để hoàn tất.`);
      } catch (err) {
        console.error(err);
        alert("Lỗi đọc file CSV: " + err.message);
      }
    };
    reader.readAsText(file, "UTF-8");
  };


  // 2. Interface & Text Tab States
  const [selectedTextSec, setSelectedTextSec] = useState("homepage");
  const [introTitle, setIntroTitle] = useState(siteSettings.introTitle || "");
  const [introSub, setIntroSub] = useState(siteSettings.introSub || "");
  const [politicsSlog, setPoliticsSlog] = useState(siteSettings.politicsSlogan || "");
  const [animeSlog, setAnimeSlog] = useState(siteSettings.animeSlogan || "");
  const [starsSlog, setStarsSlog] = useState(siteSettings.starsSlogan || "");
  const [plushSlog, setPlushSlog] = useState(siteSettings.plushSlogan || "");
  const [footerAbout, setFooterAbout] = useState(siteSettings.footerAbout || "");
  const [themeColor, setThemeColor] = useState(siteSettings.themeColor || "#b3242d");
  const [coverPol, setCoverPol] = useState(siteSettings.coverPolitics || "");
  const [coverAni, setCoverAni] = useState(siteSettings.coverAnime || "");
  const [coverSta, setCoverSta] = useState(siteSettings.coverStars || "");
  const [coverPlu, setCoverPlu] = useState(siteSettings.coverPlush || "");
  const [contactPh, setContactPh] = useState(siteSettings.contactPhone || "");
  const [zaloL, setZaloL] = useState(siteSettings.zaloLink || "");
  const [messengerL, setMessengerL] = useState(siteSettings.messengerLink || "");
  const [brandN, setBrandN] = useState(siteSettings.brandName || "");
  const [bankId, setBankId] = useState(siteSettings.bankId || "MBBank");
  const [bankAccount, setBankAccount] = useState(siteSettings.bankAccount || "1636058622");
  const [bankAccountName, setBankAccountName] = useState(siteSettings.bankAccountName || "CONG TY GPAW ATELIER");
  const [cassoKey, setCassoKey] = useState(siteSettings.cassoKey || "");

  // Subpage detail texts states
  const [commit1Title, setCommit1Title] = useState(siteSettings.commit1Title || "Cotton lụa kháng khuẩn");
  const [commit1Desc, setCommit1Desc] = useState(siteSettings.commit1Desc || "Mát mịn, khóa kéo ẩn an toàn");
  const [commit2Title, setCommit2Title] = useState(siteSettings.commit2Title || "Bảo hành bông 4 năm");
  const [commit2Desc, setCommit2Desc] = useState(siteSettings.commit2Desc || "Chống xẹp phom co rúm");
  const [commit3Title, setCommit3Title] = useState(siteSettings.commit3Title || "Đổi trả 7 ngày");
  const [commit3Desc, setCommit3Desc] = useState(siteSettings.commit3Desc || "Miễn phí nếu phát sinh lỗi vải");
  const [sizeGuideTip, setSizeGuideTip] = useState(siteSettings.sizeGuideTip || "💡 Gợi ý: Gối 80cm gọn nhẹ thích hợp tựa lưng, gác chân. Bản 120cm và 150cm dài chuẩn ôm toàn thân thoải mái.");
  const [detailMaterialTitle, setDetailMaterialTitle] = useState(siteSettings.detailMaterialTitle || "Chất liệu & Gia công thủ công tại Sài Gòn");
  const [detailMaterialDesc, setDetailMaterialDesc] = useState(siteSettings.detailMaterialDesc || "Mọi chiếc gối ôm Gpaw được vẽ tay chi tiết, in kỹ thuật số 3D chống phai trực tiếp lên sợi vải mát lạnh kháng khuẩn. Ruột gối lót chống thoát bông chứa đầy hạt bông silicon 3D cao cấp tạo đàn hồi căng đầy tự nhiên, sản xuất độc quyền tại Việt Nam.");
  const [careTitle, setCareTitle] = useState(siteSettings.careTitle || "Hướng dẫn vệ sinh gối định kỳ giúp phom gối luôn phồng mịn, chống bám bụi:");
  const [careStep1, setCareStep1] = useState(siteSettings.careStep1 || "Giặt vỏ gối: Hãy lột vỏ gối giặt bằng máy chế độ nhẹ, nhiệt độ nước dưới 30°C. Nên lộn mặt trái gối trước khi giặt.");
  const [careStep2, setCareStep2] = useState(siteSettings.careStep2 || "Phơi khô: Không giặt khô vỏ gối, phơi vỏ gối ở bóng mát có gió lùa rộng rãi, không dùng bàn là trực tiếp lên hình in.");
  const [careStep3, setCareStep3] = useState(siteSettings.careStep3 || "Vệ sinh bông ruột: Tránh nhúng ướt ruột bông. Chỉ cần đem phơi ruột gối dưới nắng nhẹ 2-3 giờ mỗi tháng để bông tơi xốp tự nhiên.");
  const [policyTitle1, setPolicyTitle1] = useState(siteSettings.policyTitle1 || "🛡️ Chính sách bảo hành xẹp bông 4 năm");
  const [policyDesc1, setPolicyDesc1] = useState(siteSettings.policyDesc1 || "Gpaw Atelier cam kết bảo hành xẹp lún ruột bông trong vòng 4 năm. Nếu ruột gối của bạn bị xẹp xẹp trên 20% so với phom phồng ban đầu, chúng tôi hỗ trợ nhồi bù bông microfiber hoặc đổi ruột mới hoàn toàn miễn phí tại showroom.");
  const [policyTitle2, setPolicyTitle2] = useState(siteSettings.policyTitle2 || "🚚 Free ship đơn hàng từ 2 gối");
  const [policyDesc2, setPolicyDesc2] = useState(siteSettings.policyDesc2 || "Miễn phí vận chuyển toàn quốc cho tất cả các đơn hàng mua từ 2 sản phẩm gối ôm trở lên. Đơn 1 gối áp dụng phí giao hàng toàn quốc 30.000₫.");
  const [policyTitle3, setPolicyTitle3] = useState(siteSettings.policyTitle3 || "🔄 Đổi trả lỗi trong 7 ngày");
  const [policyDesc3, setPolicyDesc3] = useState(siteSettings.policyDesc3 || "Khách hàng được đổi trả sản phẩm mới miễn phí trong vòng 7 ngày kể từ lúc nhận hàng nếu có lỗi từ nhà sản xuất (rách chỉ, hư dây kéo, sai mẫu mã).");

  // Keep internal states in sync with props
  useEffect(() => {
    setIntroTitle(siteSettings.introTitle || "");
    setIntroSub(siteSettings.introSub || "");
    setPoliticsSlog(siteSettings.politicsSlogan || "");
    setAnimeSlog(siteSettings.animeSlogan || "");
    setStarsSlog(siteSettings.starsSlogan || "");
    setPlushSlog(siteSettings.plushSlogan || "");
    setFooterAbout(siteSettings.footerAbout || "");
    setThemeColor(siteSettings.themeColor || "#b3242d");
    setCoverPol(siteSettings.coverPolitics || "");
    setCoverAni(siteSettings.coverAnime || "");
    setCoverSta(siteSettings.coverStars || "");
    setCoverPlu(siteSettings.coverPlush || "");
    setContactPh(siteSettings.contactPhone || "");
    setZaloL(siteSettings.zaloLink || "");
    setMessengerL(siteSettings.messengerLink || "");
    setBrandN(siteSettings.brandName || "");
    setBankId(siteSettings.bankId || "MBBank");
    setBankAccount(siteSettings.bankAccount || "1636058622");
    setBankAccountName(siteSettings.bankAccountName || "CONG TY GPAW ATELIER");
    setCassoKey(siteSettings.cassoKey || "");
    
    // Sync subpage states
    setCommit1Title(siteSettings.commit1Title || "Cotton lụa kháng khuẩn");
    setCommit1Desc(siteSettings.commit1Desc || "Mát mịn, khóa kéo ẩn an toàn");
    setCommit2Title(siteSettings.commit2Title || "Bảo hành bông 4 năm");
    setCommit2Desc(siteSettings.commit2Desc || "Chống xẹp phom co rúm");
    setCommit3Title(siteSettings.commit3Title || "Đổi trả 7 ngày");
    setCommit3Desc(siteSettings.commit3Desc || "Miễn phí nếu phát sinh lỗi vải");
    setSizeGuideTip(siteSettings.sizeGuideTip || "💡 Gợi ý: Gối 80cm gọn nhẹ thích hợp tựa lưng, gác chân. Bản 120cm và 150cm dài chuẩn ôm toàn thân thoải mái.");
    setDetailMaterialTitle(siteSettings.detailMaterialTitle || "Chất liệu & Gia công thủ công tại Sài Gòn");
    setDetailMaterialDesc(siteSettings.detailMaterialDesc || "Mọi chiếc gối ôm Gpaw được vẽ tay chi tiết, in kỹ thuật số 3D chống phai trực tiếp lên sợi vải mát lạnh kháng khuẩn. Ruột gối lót chống thoát bông chứa đầy hạt bông silicon 3D cao cấp tạo đàn hồi căng đầy tự nhiên, sản xuất độc quyền tại Việt Nam.");
    setCareTitle(siteSettings.careTitle || "Hướng dẫn vệ sinh gối định kỳ giúp phom gối luôn phồng mịn, chống bám bụi:");
    setCareStep1(siteSettings.careStep1 || "Giặt vỏ gối: Hãy lột vỏ gối giặt bằng máy chế độ nhẹ, nhiệt độ nước dưới 30°C. Nên lộn mặt trái gối trước khi giặt.");
    setCareStep2(siteSettings.careStep2 || "Phơi khô: Không giặt khô vỏ gối, phơi vỏ gối ở bóng mát có gió lùa rộng rãi, không dùng bàn là trực tiếp lên hình in.");
    setCareStep3(siteSettings.careStep3 || "Vệ sinh bông ruột: Tránh nhúng ướt ruột bông. Chỉ cần đem phơi ruột gối dưới nắng nhẹ 2-3 giờ mỗi tháng để bông tơi xốp tự nhiên.");
    setPolicyTitle1(siteSettings.policyTitle1 || "🛡️ Chính sách bảo hành xẹp bông 4 năm");
    setPolicyDesc1(siteSettings.policyDesc1 || "Gpaw Atelier cam kết bảo hành xẹp lún ruột bông trong vòng 4 năm. Nếu ruột gối của bạn bị xẹp xẹp trên 20% so với phom phồng ban đầu, chúng tôi hỗ trợ nhồi bù bông microfiber hoặc đổi ruột mới hoàn toàn miễn phí tại showroom.");
    setPolicyTitle2(siteSettings.policyTitle2 || "🚚 Free ship đơn hàng từ 2 gối");
    setPolicyDesc2(siteSettings.policyDesc2 || "Miễn phí vận chuyển toàn quốc cho tất cả các đơn hàng mua từ 2 sản phẩm gối ôm trở lên. Đơn 1 gối áp dụng phí giao hàng toàn quốc 30.000₫.");
    setPolicyTitle3(siteSettings.policyTitle3 || "🔄 Đổi trả lỗi trong 7 ngày");
    setPolicyDesc3(siteSettings.policyDesc3 || "Khách hàng được đổi trả sản phẩm mới miễn phí trong vòng 7 ngày kể từ lúc nhận hàng nếu có lỗi từ nhà sản xuất (rách chỉ, hư dây kéo, sai mẫu mã).");
  }, [siteSettings]);

  const handleSaveTextTheme = (e) => {
    e.preventDefault();
    onUpdateSiteSettings({
      ...siteSettings,
      introTitle,
      introSub,
      politicsSlogan: politicsSlog,
      animeSlogan: animeSlog,
      starsSlogan: starsSlog,
      plushSlogan: plushSlog,
      footerAbout,
      themeColor,
      coverPolitics: coverPol,
      coverAnime: coverAni,
      coverStars: coverSta,
      coverPlush: coverPlu,
      contactPhone: contactPh,
      zaloLink: zaloL,
      messengerLink: messengerL,
      brandName: brandN,
      bankId,
      bankAccount,
      bankAccountName,
      cassoKey,
      commit1Title,
      commit1Desc,
      commit2Title,
      commit2Desc,
      commit3Title,
      commit3Desc,
      sizeGuideTip,
      detailMaterialTitle,
      detailMaterialDesc,
      careTitle,
      careStep1,
      careStep2,
      careStep3,
      policyTitle1,
      policyDesc1,
      policyTitle2,
      policyDesc2,
      policyTitle3,
      policyDesc3
    });
    alert("Đã lưu các cài đặt nội dung & giao diện thành công!");
  };


  // Orders Selection & Editing States
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [showOrderEditModal, setShowOrderEditModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editOrderCustName, setEditOrderCustName] = useState("");
  const [editOrderCustEmail, setEditOrderCustEmail] = useState("");
  const [editOrderDatetime, setEditOrderDatetime] = useState("");
  const [editOrderDetails, setEditOrderDetails] = useState("");
  const [editOrderValue, setEditOrderValue] = useState("");
  const [editOrderStatus, setEditOrderStatus] = useState("Processing");

  useEffect(() => {
    if (editingOrder) {
      setEditOrderCustName(editingOrder.customerName || "");
      setEditOrderCustEmail(editingOrder.customerEmail || "");
      setEditOrderDatetime(editingOrder.datetime || "");
      setEditOrderDetails(editingOrder.details || "");
      setEditOrderValue(editingOrder.value || "");
      setEditOrderStatus(editingOrder.status || "Processing");
    }
  }, [editingOrder]);

  // 3. Customers Tab States
  const [custSearch, setCustSearch] = useState("");
  const [custTierFilter, setCustTierFilter] = useState("All");
  const [custStatusFilter, setCustStatusFilter] = useState("All");
  const [selectedCustId, setSelectedCustId] = useState(String(customers[0]?.id || ""));
  const [custName, setCustName] = useState("");
  const [custPoints, setCustPoints] = useState(0);
  const [custPhone, setCustPhone] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custStatus, setCustStatus] = useState("Active");
  const [custNotes, setCustNotes] = useState("");
  const [custAddress, setCustAddress] = useState("");
  const [custTier, setCustTier] = useState("Đồng");

  const selectedCustomer = customers.find(c => String(c.id) === selectedCustId);

  useEffect(() => {
    if (selectedCustomer) {
      setCustName(selectedCustomer.name);
      setCustPoints(selectedCustomer.points);
      setCustPhone(selectedCustomer.phone || "");
      setCustEmail(selectedCustomer.email || "");
      setCustStatus(selectedCustomer.status || "Active");
      setCustNotes(selectedCustomer.notes || "");
      setCustAddress(selectedCustomer.address || "");
      setCustTier(selectedCustomer.tier || "Đồng");
    }
  }, [selectedCustId, selectedCustomer]);

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    const updated = customers.map(c => {
      if (String(c.id) === selectedCustId) {
        return {
          ...c,
          name: custName,
          email: custEmail,
          phone: custPhone,
          points: Number(custPoints) || 0,
          status: custStatus,
          notes: custNotes,
          address: custAddress,
          tier: custTier
        };
      }
      return c;
    });
    onUpdateCustomers(updated);
    alert(`Đã cập nhật thông tin thành viên "${custName}" thành công!`);
  };

  const filteredCustomers = customers.filter(c => {
    if (custTierFilter !== "All") {
      if (custTierFilter === "Gold" && c.points <= 500) return false;
      if (custTierFilter === "Silver" && (c.points < 100 || c.points > 500)) return false;
      if (custTierFilter === "Bronze" && c.points >= 100) return false;
    }
    if (custStatusFilter !== "All") {
      if (c.status !== custStatusFilter) return false;
    }
    if (custSearch) {
      const q = custSearch.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q);
    }
    return true;
  });

  // Calculate Customer Purchase Logs
  const getCustomerOrders = (email) => {
    if (!email) return [];
    return orders.filter(o => o.customerEmail && o.customerEmail.toLowerCase() === email.toLowerCase());
  };


  // 4. Orders Tab States
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");
  const [selectedOrderId, setSelectedOrderId] = useState(String(orders[0]?.id || ""));
  const [orderStatus, setOrderStatus] = useState("Processing");

  const selectedOrder = orders.find(o => String(o.id) === selectedOrderId);

  useEffect(() => {
    if (selectedOrder) {
      setOrderStatus(selectedOrder.status || "Processing");
    }
  }, [selectedOrderId, selectedOrder]);

  const handleSaveOrderStatus = (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    const updated = orders.map(o => {
      if (String(o.id) === selectedOrderId) {
        return { ...o, status: orderStatus };
      }
      return o;
    });
    onUpdateOrders(updated);
    alert(`Đã cập nhật trạng thái đơn #ORD${selectedOrderId} thành "${orderStatus}"`);
  };

  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== "All") {
      const status = o.status || "Processing";
      if (status !== orderStatusFilter) return false;
    }
    return true;
  });

  // Calculate Total Revenue
  const totalRevenue = orders
    .filter(o => o.status !== "Cancelled")
    .reduce((acc, curr) => {
      const valStr = curr.value.replace(/[^0-9]/g, '');
      const valNum = parseInt(valStr) || 0;
      return acc + valNum;
    }, 0);


  // 5. News Tab States
  const [editingNewsIdx, setEditingNewsIdx] = useState(-1);
  const [newsDate, setNewsDate] = useState("");
  const [newsCategory, setNewsCategory] = useState("TIN TỨC");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsSummary, setNewsSummary] = useState("");
  const [selectedNewsSubcat, setSelectedNewsSubcat] = useState("tina"); // tina | tinb | tinc

  // 6. Google SEO Tab States
  const [selectedSeoSection, setSelectedSeoSection] = useState("yoast");
  const [seoTitle, setSeoTitle] = useState(siteSettings.seoTitle || "GPAW - Bốn vũ trụ gối ôm");
  const [seoDesc, setSeoDesc] = useState(siteSettings.seoDesc || "Studio gối ôm 3D thủ công tại Sài Gòn. Bốn vũ trụ, một chiếc gối.");
  const [seoKeywords, setSeoKeywords] = useState(siteSettings.seoKeywords || "gối ôm, gpaw, gối ôm 3d, gối ôm thiết kế");
  const [seoSlug, setSeoSlug] = useState(siteSettings.seoSlug || "cua-hang-goi-om");
  const [focusKeyword, setFocusKeyword] = useState(siteSettings.focusKeyword || "gối ôm");
  const [seoPreviewMode, setSeoPreviewMode] = useState("mobile"); // mobile | desktop

  const handleAddOrEditNews = (e) => {
    e.preventDefault();
    if (!newsTitle || !newsSummary) { alert("Vui lòng điền đủ tiêu đề và nội dung tin tức!"); return; }

    const dateVal = newsDate || new Date().toLocaleDateString('vi-VN');
    const newArticle = {
      date: dateVal,
      category: newsCategory.toUpperCase(),
      title: newsTitle,
      summary: newsSummary,
      subCategory: selectedNewsSubcat
    };

    let updatedNews = [...(siteSettings.newsList || [])];
    if (editingNewsIdx >= 0) {
      updatedNews[editingNewsIdx] = newArticle;
      setEditingNewsIdx(-1);
      alert("Đã lưu tin tức chỉnh sửa!");
    } else {
      updatedNews.unshift(newArticle);
      alert("Đã đăng tin tức lên trang chủ thành công!");
    }

    onUpdateSiteSettings({ ...siteSettings, newsList: updatedNews });
    setNewsDate("");
    setNewsTitle("");
    setNewsSummary("");
  };

  const handleStartEditNews = (index) => {
    const article = siteSettings.newsList[index];
    if (article) {
      setEditingNewsIdx(index);
      setNewsDate(article.date);
      setNewsCategory(article.category);
      setNewsTitle(article.title);
      setNewsSummary(article.summary);
    }
  };

  const handleDeleteNews = (index) => {
    if (confirm("Bạn có chắc muốn xóa tin tức này khỏi trang chủ?")) {
      const updatedNews = (siteSettings.newsList || []).filter((_, idx) => idx !== index);
      onUpdateSiteSettings({ ...siteSettings, newsList: updatedNews });
      alert("Đã xóa tin tức!");
      if (editingNewsIdx === index) {
        setEditingNewsIdx(-1);
        setNewsDate("");
        setNewsTitle("");
        setNewsSummary("");
      }
    }
  };


  // Sync SEO states with siteSettings
  useEffect(() => {
    setSeoTitle(siteSettings.seoTitle || "GPAW - Bốn vũ trụ gối ôm");
    setSeoDesc(siteSettings.seoDesc || "Studio gối ôm 3D thủ công tại Sài Gòn. Bốn vũ trụ, một chiếc gối.");
    setSeoKeywords(siteSettings.seoKeywords || "gối ôm, gpaw, gối ôm 3d, gối ôm thiết kế");
    setSeoSlug(siteSettings.seoSlug || "cua-hang-goi-om");
    setFocusKeyword(siteSettings.focusKeyword || "gối ôm");
  }, [siteSettings]);

  const handleSaveSEO = (e) => {
    e.preventDefault();
    onUpdateSiteSettings({
      ...siteSettings,
      seoTitle,
      seoDesc,
      seoKeywords,
      seoSlug,
      focusKeyword
    });
    alert("Đã lưu cấu hình Google SEO! Trình duyệt sẽ cập nhật meta tags tự động.");
  };


  // 7. Vouchers Tab States
  const [selectedVoucherCode, setSelectedVoucherCode] = useState(vouchers[0]?.code || "new");
  const [vCode, setVCode] = useState("");
  const [vDesc, setVDesc] = useState("");
  const [vCost, setVCost] = useState("");
  const [vVal, setVVal] = useState("");

  const selectedVoucher = vouchers.find(v => v.code === selectedVoucherCode);

  const handleSubmitVoucher = (e) => {
    e.preventDefault();
    if (!vCode || !vDesc || !vVal) {
      alert("Vui lòng nhập đầy đủ thông tin voucher!");
      return;
    }
    const cost = Number(vCost) || 0;
    onCreateVoucher({
      code: vCode.toUpperCase(),
      desc: vDesc,
      pointsCost: cost,
      valueDesc: vVal,
      type: cost === 0 ? "welcome" : "discount"
    });
    setVCode("");
    setVDesc("");
    setVCost("");
    setVVal("");
    setSelectedVoucherCode(vCode.toUpperCase());
    alert("Tạo mã voucher mới thành công!");
  };

  return (
    <div className="admin-panel">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Overlay and Modal popup styles */
        .admin-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(5px);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .admin-modal-content {
          background: #fff;
          color: #000;
          padding: 24px;
          border-radius: 12px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        /* Table checkboxes styling */
        .admin-box table th, .admin-box table td {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 10px 8px;
        }
        
        /* News Categories and Badges */
        .admin-sidebar-item .badge {
          background: rgba(255,255,255,0.1);
          padding: 2px 6px;
          border-radius: 99px;
          font-size: 10px;
        }
      ` }} />
      <div className="wrap">
        <div className="admin-header">
          <h2>Admin.gpaw.vn Portal</h2>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>GPAW BACKOFFICE v2026.05</span>
        </div>

        {/* Tab Selection Row */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px", borderBottom: "2px solid rgba(255,255,255,0.08)", paddingBottom: "14px" }}>
          <button onClick={() => setActiveTab("products")} style={{ background: activeTab === "products" ? "#ffea4b" : "transparent", color: activeTab === "products" ? "#000" : "#fff", border: "1px solid #ffea4b", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", fontWeight: 700 }}>📦 Sản phẩm</button>
          <button onClick={() => setActiveTab("text_theme")} style={{ background: activeTab === "text_theme" ? "#ffea4b" : "transparent", color: activeTab === "text_theme" ? "#000" : "#fff", border: "1px solid #ffea4b", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", fontWeight: 700 }}>🎨 Text & Giao diện</button>
          <button onClick={() => setActiveTab("customers")} style={{ background: activeTab === "customers" ? "#ffea4b" : "transparent", color: activeTab === "customers" ? "#000" : "#fff", border: "1px solid #ffea4b", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", fontWeight: 700 }}>👥 Khách hàng ({customers.length})</button>
          <button onClick={() => setActiveTab("orders")} style={{ background: activeTab === "orders" ? "#ffea4b" : "transparent", color: activeTab === "orders" ? "#000" : "#fff", border: "1px solid #ffea4b", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", fontWeight: 700 }}>🛒 Đơn hàng ({orders.length})</button>
          <button onClick={() => setActiveTab("news")} style={{ background: activeTab === "news" ? "#ffea4b" : "transparent", color: activeTab === "news" ? "#000" : "#fff", border: "1px solid #ffea4b", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", fontWeight: 700 }}>📰 Tin tức</button>
          <button onClick={() => setActiveTab("seo")} style={{ background: activeTab === "seo" ? "#ffea4b" : "transparent", color: activeTab === "seo" ? "#000" : "#fff", border: "1px solid #ffea4b", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", fontWeight: 700 }}>🔍 Google SEO</button>
          <button onClick={() => setActiveTab("vouchers")} style={{ background: activeTab === "vouchers" ? "#ffea4b" : "transparent", color: activeTab === "vouchers" ? "#000" : "#fff", border: "1px solid #ffea4b", padding: "8px 16px", borderRadius: "5px", cursor: "pointer", fontWeight: 700 }}>🎟️ Vouchers</button>
        </div>

        {/* Outer 2-Column Sidebar Container */}
        <div className="admin-panel-container">
          
          {/* LEFT SIDEBAR PANEL */}
          <div className="admin-sidebar">
            
            {/* Products Tab Sidebar */}
            {activeTab === "products" && (
              <div className="admin-sidebar-menu">
                <h4>Sản phẩm</h4>
                <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
                  <button
                    className={"admin-sidebar-item " + (selectedProdId === "new" ? "active" : "")}
                    onClick={() => setSelectedProdId("new")}
                    style={{ flex: 1, margin: 0, padding: "8px 4px", fontSize: "11px", textAlign: "center" }}
                  >
                    ➕ Thêm mới
                  </button>
                  <button
                    type="button"
                    className="admin-sidebar-item"
                    onClick={() => setShowBulkModal(true)}
                    style={{ flex: 1, margin: 0, padding: "8px 4px", fontSize: "11px", textAlign: "center", background: "#ffea4b", color: "#000", fontWeight: "bold" }}
                  >
                    📊 Thêm hàng loạt
                  </button>
                </div>
                
                {["politics", "anime", "stars", "plush"].map(cat => {
                  const catLabel = { politics: "Chính trị", anime: "Anime", stars: "Ca sĩ", plush: "Thú bông" }[cat];
                  const catProds = catalog.filter(p => p.category === cat);
                  const isCollapsed = collapsedCats[cat];
                  return (
                    <div key={cat} className="sidebar-category-group">
                      <div 
                        className="sidebar-category-header" 
                        onClick={() => setCollapsedCats({ ...collapsedCats, [cat]: !isCollapsed })}
                      >
                        <span>{catLabel}</span>
                        <span style={{ fontSize: 9 }}>{isCollapsed ? "▼" : "▲"} ({catProds.length})</span>
                      </div>
                      {!isCollapsed && (
                        <div className="sidebar-product-list">
                          {catProds.map(p => (
                            <button
                              key={p.id}
                              className={"sidebar-product-item " + (selectedProdId === p.id ? "active" : "")}
                              onClick={() => setSelectedProdId(p.id)}
                              title={p.name}
                            >
                              [{p.id.toUpperCase()}] {p.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Interface & Text Tab Sidebar */}
            {activeTab === "text_theme" && (
              <div className="admin-sidebar-menu">
                <h4>Vị trí chỉnh sửa</h4>
                {[
                  { id: "homepage", vi: "Trang chủ - Khung Intro" },
                  { id: "politics", vi: "Vũ trụ Chính trị (Slogan)" },
                  { id: "anime", vi: "Vũ trụ Anime (Slogan)" },
                  { id: "stars", vi: "Vũ trụ Ca sĩ (Slogan)" },
                  { id: "plush", vi: "Vũ trụ Thú bông (Slogan)" },
                  { id: "footer", vi: "Footer & Chân trang" },
                  { id: "subpage", vi: "Trang phụ - Chi tiết gối" },
                  { id: "payment", vi: "💳 QR & Casso API" }
                ].map(sec => (
                  <button
                    key={sec.id}
                    className={"admin-sidebar-item " + (selectedTextSec === sec.id ? "active" : "")}
                    onClick={() => setSelectedTextSec(sec.id)}
                  >
                    {sec.vi}
                  </button>
                ))}
              </div>
            )}

            {/* Customers Tab Sidebar */}
            {activeTab === "customers" && (() => {
              // Sort customers dynamically by their latest purchase datetime
              const customerLatestOrderMap = {};
              orders.forEach(o => {
                if (o.customerEmail) {
                  const email = o.customerEmail.toLowerCase().trim();
                  const orderTime = new Date(o.datetime.replace(/-/g, '/')).getTime() || 0;
                  if (!customerLatestOrderMap[email] || orderTime > customerLatestOrderMap[email].time) {
                    customerLatestOrderMap[email] = { time: orderTime, dateStr: o.datetime };
                  }
                }
              });

              const sortedCustomers = [...filteredCustomers].sort((a, b) => {
                const timeA = customerLatestOrderMap[a.email?.toLowerCase().trim()]?.time || 0;
                const timeB = customerLatestOrderMap[b.email?.toLowerCase().trim()]?.time || 0;
                return timeB - timeA;
              });

              return (
                <div className="admin-sidebar-menu">
                  <h4>Bộ lọc khách hàng</h4>
                  
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: "block", marginBottom: 4, fontSize: 9, opacity: 0.5 }}>Hạng tích lũy</label>
                    <select 
                      value={custTierFilter} 
                      onChange={(e) => setCustTierFilter(e.target.value)}
                      style={{ width: "100%", height: 32, background: "#1e1a18", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "0 6px", outline: "none", fontSize: 12 }}
                    >
                      <option value="All">Tất cả hạng</option>
                      <option value="Gold">Hạng Vàng (&gt; 500đ)</option>
                      <option value="Silver">Hạng Bạc (100 - 500đ)</option>
                      <option value="Bronze">Hạng Đồng (&lt; 100đ)</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", marginBottom: 4, fontSize: 9, opacity: 0.5 }}>Trạng thái tài khoản</label>
                    <select 
                      value={custStatusFilter} 
                      onChange={(e) => setCustStatusFilter(e.target.value)}
                      style={{ width: "100%", height: 32, background: "#1e1a18", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "0 6px", outline: "none", fontSize: 12 }}
                    >
                      <option value="All">Tất cả trạng thái</option>
                      <option value="Active">Đã kích hoạt</option>
                      <option value="Pending">Chờ kích hoạt</option>
                      <option value="Banned">Bị khóa</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <h4 style={{ margin: 0, border: "none", padding: 0 }}>Thành viên ({sortedCustomers.length})</h4>
                    <button
                      type="button"
                      onClick={() => {
                        setBulkCustMode(!bulkCustMode);
                        setSelectedCustIds([]);
                      }}
                      style={{
                        background: bulkCustMode ? "#ff5b5b" : "#ffea4b",
                        color: "#000",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "10px",
                        cursor: "pointer"
                      }}
                    >
                      {bulkCustMode ? "Hủy chọn" : "✏️ Sửa hàng loạt"}
                    </button>
                  </div>

                  {bulkCustMode && selectedCustIds.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setBulkCustStatus("Active");
                        setBulkCustTier("Đồng");
                        setBulkCustAddPoints(0);
                        setBulkCustNotes("");
                        setUpdateCustStatus(false);
                        setUpdateCustTier(false);
                        setUpdateCustPoints(false);
                        setUpdateCustNotes(false);
                        setShowBulkCustModal(true);
                      }}
                      style={{
                        width: "100%",
                        padding: "8px",
                        background: "#22c55e",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "11px",
                        cursor: "pointer",
                        marginBottom: "10px"
                      }}
                    >
                      ⚙️ Thiết lập cho {selectedCustIds.length} khách
                    </button>
                  )}

                  <div style={{ maxHeight: "40vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
                    {sortedCustomers.map(c => {
                      const latestOrder = customerLatestOrderMap[c.email?.toLowerCase().trim()]?.dateStr || "Chưa mua";
                      const isSelected = selectedCustIds.includes(String(c.id));
                      return (
                        <div
                          key={c.id}
                          className={"admin-sidebar-item " + (selectedCustId === String(c.id) ? "active" : "")}
                          onClick={() => setSelectedCustId(String(c.id))}
                          style={{ 
                            fontSize: 12, 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "space-between",
                            padding: "6px 8px",
                            margin: "2px 0",
                            border: "1px solid rgba(255,255,255,0.05)",
                            borderRadius: "4px"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", flex: 1, minWidth: 0 }}>
                            {bulkCustMode && (
                              <input
                                type="checkbox"
                                checked={isSelected}
                                style={{ accentColor: "#ffea4b", marginRight: "4px" }}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedCustIds([...selectedCustIds, String(c.id)]);
                                  } else {
                                    setSelectedCustIds(selectedCustIds.filter(id => id !== String(c.id)));
                                  }
                                }}
                              />
                            )}
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px", overflow: "hidden" }}>
                              <span style={{ fontWeight: "bold", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</span>
                              <span style={{ fontSize: "9px", opacity: 0.5 }}>Mua cuối: {latestOrder}</span>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                            <span className="badge" style={{ fontSize: "10px" }}>{c.points}đ</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCustId(String(c.id));
                              }}
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#ffea4b",
                                fontSize: "14px",
                                cursor: "pointer",
                                padding: "2px 4px"
                              }}
                              title="Sửa thông tin"
                            >
                              ✏️
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* Orders Tab Sidebar (Simplified/Stats Only) */}
            {activeTab === "orders" && (
              <div className="admin-sidebar-menu">
                <h4>Bộ lọc đơn hàng</h4>
                <select 
                  value={orderStatusFilter} 
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  style={{ width: "100%", height: 32, background: "#1e1a18", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "0 6px", outline: "none", fontSize: 12, marginBottom: 16 }}
                >
                  <option value="All">Tất cả đơn hàng</option>
                  <option value="Processing">Đang xử lý</option>
                  <option value="Shipped">Đang giao</option>
                  <option value="Completed">Đã giao</option>
                  <option value="Cancelled">Đã hủy đơn</option>
                </select>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "6px", fontSize: "12px", lineHeight: "1.6", color: "#ccc" }}>
                  💡 <b>Thao tác nhanh:</b> Sử dụng hộp chọn ở mỗi dòng đơn hàng ở bảng bên phải để chọn nhiều đơn. Áp dụng hành động hàng loạt bằng thanh công cụ ở trên.
                </div>
              </div>
            )}

            {/* News Tab Sidebar */}
            {activeTab === "news" && (
              <div className="admin-sidebar-menu">
                <h4>Danh mục tin tức</h4>
                {[
                  { id: "tina", label: "Tin a" },
                  { id: "tinb", label: "Tin b" },
                  { id: "tinc", label: "Tin c" }
                ].map(cat => (
                  <button
                    key={cat.id}
                    className={"admin-sidebar-item " + (selectedNewsSubcat === cat.id ? "active" : "")}
                    onClick={() => {
                      setSelectedNewsSubcat(cat.id);
                      setEditingNewsIdx(-1);
                      setNewsDate("");
                      setNewsTitle("");
                      setNewsSummary("");
                    }}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <span>📂 {cat.label}</span>
                    <span className="badge" style={{ fontSize: 10 }}>
                      {(siteSettings.newsList || []).filter(n => n.subCategory === cat.id).length}
                    </span>
                  </button>
                ))}
                
                <button
                  type="button"
                  className="admin-sidebar-item"
                  onClick={() => {
                    setEditingNewsIdx(-2); // -2 indicates creating a new article
                    setNewsDate("");
                    setNewsTitle("");
                    setNewsSummary("");
                  }}
                  style={{ marginTop: "12px", background: "#ffea4b", color: "#000", fontWeight: "bold", textAlign: "center" }}
                >
                  🆕 Đăng tin mới...
                </button>
              </div>
            )}

            {/* Google SEO Tab Sidebar */}
            {activeTab === "seo" && (
              <div className="admin-sidebar-menu">
                <h4>Phân mục SEO</h4>
                {[
                  { id: "yoast", vi: "Yoast SEO Analyzer" },
                  { id: "keywords", vi: "Từ khóa SEO (Keywords)" },
                  { id: "guide", vi: "Hướng dẫn tối ưu SEO" }
                ].map(seo => (
                  <button
                    key={seo.id}
                    className={"admin-sidebar-item " + (selectedSeoSection === seo.id ? "active" : "")}
                    onClick={() => setSelectedSeoSection(seo.id)}
                  >
                    {seo.vi}
                  </button>
                ))}
              </div>
            )}

            {/* Vouchers Tab Sidebar */}
            {activeTab === "vouchers" && (
              <div className="admin-sidebar-menu">
                <h4>Mã giảm giá</h4>
                <button
                  className={"admin-sidebar-item " + (selectedVoucherCode === "new" ? "active" : "")}
                  onClick={() => setSelectedVoucherCode("new")}
                >
                  🎟️ Tạo voucher mới...
                </button>
                
                <h4>Đang phát hành ({vouchers.length})</h4>
                <div style={{ display: "flex", columnGap: 4 }}>
                  {vouchers.map(v => (
                    <button
                      key={v.code}
                      className={"admin-sidebar-item " + (selectedVoucherCode === v.code ? "active" : "")}
                      onClick={() => setSelectedVoucherCode(v.code)}
                    >
                      <span>{v.code}</span>
                      <span className="badge" style={{ background: "#27c93f", color: "#fff" }}>{v.valueDesc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT MAIN CONTENT PANEL */}
          <div className="admin-main-content">
            
            {/* TAB CONTENT: PRODUCTS */}
            {activeTab === "products" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
                {!selectedProdId ? (
                  <div className="admin-box">
                    <h3>📊 Bảng điều khiển & Cập nhật hàng loạt (Excel)</h3>
                    
                    {/* Excel bulk update widget always available in dashboard */}
                    <div 
                      className={`excel-drop-zone ${draggingExcel ? 'dragging' : ''}`}
                      onDragOver={handleExcelDragOver}
                      onDragLeave={handleExcelDragLeave}
                      onDrop={handleExcelDrop}
                      onClick={() => runMockExcelImport()}
                    >
                      <span className="icon">📊</span>
                      <b>Kéo & thả file Excel (.xlsx, .csv) tại đây để cập nhật hàng loạt</b>
                      <p>Hoặc bấm vào khung này để chạy giả lập cập nhật nhanh 3 sản phẩm & thêm gối Koala mới.</p>
                      
                      {uploadingExcel && (
                        <div style={{ marginTop: 14 }}>
                          <div style={{ background: "rgba(255,255,255,0.06)", height: 8, borderRadius: 99, overflow: "hidden", width: "80%", margin: "0 auto 8px" }}>
                            <div style={{ width: `${excelProgress}%`, background: "#ffea4b", height: "100%", transition: "width 0.2s" }}></div>
                          </div>
                          <span style={{ fontSize: 11, color: "#ffea4b", fontWeight: 700 }}>Đang cập nhật... {excelProgress}%</span>
                        </div>
                      )}

                      {excelLogs && (
                        <div className="excel-log-area" onClick={(e) => e.stopPropagation()}>
                          {excelLogs}
                        </div>
                      )}
                    </div>

                    {/* Bulk Excel Modal Popup */}
                    {showBulkModal && (
                      <div className="admin-modal-overlay">
                        <div className="admin-modal-content">
                          <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "800", color: "#16213a", fontFamily: "var(--display-serif)" }}>
                            📊 Thêm sản phẩm hàng loạt bằng Excel
                          </h3>
                          <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.5, marginBottom: "20px" }}>
                            Tải file mẫu Excel (.csv), điền đầy đủ thông tin (Kích thước, Cân nặng,...) rồi tải lên lại hệ thống để cập nhật hàng loạt.
                          </p>
                          
                          <button 
                            type="button"
                            onClick={downloadSampleCSV} 
                            style={{
                              width: "100%",
                              padding: "10px",
                              background: "#f0f0f0",
                              border: "2px dashed #999",
                              borderRadius: "8px",
                              color: "#333",
                              fontWeight: "bold",
                              fontSize: "12.5px",
                              cursor: "pointer",
                              marginBottom: "16px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px"
                            }}
                          >
                            📥 Tải File Excel Mẫu (.csv)
                          </button>
                          
                          <div style={{ marginBottom: "24px" }}>
                            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", fontSize: "12px", textTransform: "uppercase", color: "#333" }}>Chọn tệp tin CSV nguồn</label>
                            <input 
                              type="file" 
                              accept=".csv" 
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) handleExcelUpload(file);
                              }}
                              style={{
                                width: "100%",
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "6px",
                                fontSize: "13px"
                              }}
                            />
                            {uploadedCount > 0 && (
                              <div style={{ marginTop: "8px", color: "#22c55e", fontSize: "12.5px", fontWeight: "bold" }}>
                                ✓ Đã tải tệp chứa {uploadedCount} sản phẩm thành công!
                              </div>
                            )}
                          </div>

                          <div style={{ display: "flex", gap: "12px" }}>
                            <button 
                              type="button"
                              onClick={() => {
                                if (uploadedProducts) {
                                  onUpdateCatalog(uploadedProducts);
                                  alert("Đã lưu thành công danh sách sản phẩm mới!");
                                  setShowBulkModal(false);
                                  setUploadedProducts(null);
                                  setUploadedCount(0);
                                } else {
                                  alert("Vui lòng upload tệp trước khi lưu!");
                                }
                              }}
                              style={{
                                flex: 1,
                                padding: "10px",
                                background: "#b3242d",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                cursor: "pointer"
                              }}
                            >
                              Lưu lại
                            </button>
                            <button 
                              type="button"
                              onClick={() => {
                                setShowBulkModal(false);
                                setUploadedProducts(null);
                                setUploadedCount(0);
                              }}
                              style={{
                                flex: 1,
                                padding: "10px",
                                background: "#aaa",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                cursor: "pointer"
                              }}
                            >
                              Đóng
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 8 }}>
                        <h4 style={{ margin: "0 0 10px 0", color: "#ffea4b" }}>📊 Thống kê sản phẩm</h4>
                        <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                          Tổng số mẫu gối: <b>{catalog.length} mẫu</b><br />
                          • Chính trị: <b>{catalog.filter(p => p.category === "politics").length} mẫu</b><br />
                          • Anime: <b>{catalog.filter(p => p.category === "anime").length} mẫu</b><br />
                          • Ca sĩ · Diễn viên: <b>{catalog.filter(p => p.category === "stars").length} mẫu</b><br />
                          • Thú nhồi bông: <b>{catalog.filter(p => p.category === "plush").length} mẫu</b>
                        </div>
                      </div>

                      <div style={{ background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 8 }}>
                        <h4 style={{ margin: "0 0 10px 0", color: "#ffea4b" }}>💡 Hướng dẫn nhanh</h4>
                        <div style={{ fontSize: 13, lineHeight: 1.6 }}>
                          • <b>Sửa từng sản phẩm:</b> Click vào danh mục con bên tay trái để hiện danh sách, sau đó click chọn sản phẩm để sửa mô tả, giá và tải ảnh lên.<br />
                          • <b>Thêm sản phẩm mới:</b> Click vào <b>➕ Thêm gối mới...</b> ở đầu danh sách bên trái để tạo mẫu mới.<br />
                          • <b>Cập nhật hàng loạt:</b> Thả file Excel vào vùng trên để cập nhật toàn bộ database.
                        </div>
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="admin-box">
                    <h3>📦 {selectedProdId === "new" ? "Thêm sản phẩm mới" : `Chỉnh sửa sản phẩm: [GP-${selectedProdId.toUpperCase()}]`}</h3>
                    
                    <form onSubmit={handleSaveProduct} style={{ marginTop: "16px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div className="form-group">
                          <label>Tên sản phẩm *</label>
                          <input type="text" value={prodName} onChange={(e) => setProdName(e.target.value)} placeholder="Tên sản phẩm (VD: Gối ôm Donald Trump)" required />
                        </div>

                        <div className="form-group">
                          <label>Phân mục (Category)</label>
                          <select value={prodCategory} onChange={(e) => setProdCategory(e.target.value)} style={{ background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', height: '32px', borderRadius: '5px', width: '100%', outline: 'none', padding: "0 10px", fontSize: 13, fontFamily: "var(--body)" }}>
                            <option value="politics">Chính trị</option>
                            <option value="anime">Anime</option>
                            <option value="stars">Ca sĩ · Diễn viên</option>
                            <option value="plush">Thú nhồi bông</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group" style={{ marginTop: 10 }}>
                        <label>Tiêu đề trang bìa (Headline / Slogan trên bìa tạp chí)</label>
                        <input type="text" value={prodHeadline} onChange={(e) => setProdHeadline(e.target.value)} placeholder="VD: TRUMP PHÁT NGÔN NÓNG: 'TÔI BẢO HÀNH 4 NĂM...'" />
                      </div>

                      <div className="form-group" style={{ marginTop: 10 }}>
                        <label>Mô tả chi tiết sản phẩm</label>
                        <textarea rows="3" value={prodDesc} onChange={(e) => setProdDesc(e.target.value)} style={{ width: '100%', background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '5px', fontSize: '13px', outline: 'none', fontFamily: 'var(--body)' }} placeholder="Mô tả công dụng, ý tưởng và xuất xứ xưởng..."></textarea>
                      </div>

                      <div style={{ background: "rgba(255,255,255,0.02)", padding: 14, borderRadius: 8, margin: "14px 0", border: "1px dashed rgba(255,255,255,0.1)" }}>
                        <span style={{ fontSize: 10, textTransform: "uppercase", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: 10, fontFamily: "var(--mono)" }}>Thông số kỹ thuật</span>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                          <div className="form-group">
                            <label>Kích thước</label>
                            <input type="text" value={prodSpecSize} onChange={(e) => setProdSpecSize(e.target.value)} placeholder="VD: 80cm - 150cm" />
                          </div>
                          <div className="form-group">
                            <label>Cân nặng</label>
                            <input type="text" value={prodSpecWeight} onChange={(e) => setProdSpecWeight(e.target.value)} placeholder="VD: 1.2kg - 2.8kg" />
                          </div>
                          <div className="form-group">
                            <label>Chất liệu ruột</label>
                            <input type="text" value={prodSpecFill} onChange={(e) => setProdSpecFill(e.target.value)} placeholder="VD: Bông silicon 3D chống xẹp" />
                          </div>
                          <div className="form-group">
                            <label>Chất liệu vỏ gối</label>
                            <input type="text" value={prodSpecCover} onChange={(e) => setProdSpecCover(e.target.value)} placeholder="VD: Vải cotton lụa 100%" />
                          </div>
                        </div>
                        <div className="form-group" style={{ marginTop: 10 }}>
                          <label>Mã sản phẩm (SKU)</label>
                          <input type="text" value={prodSpecSku} onChange={(e) => setProdSpecSku(e.target.value)} placeholder="VD: GP-P001" />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginTop: 10 }}>
                        <label>Trạng thái nhãn (Tag)</label>
                        <input type="text" value={prodTag} onChange={(e) => setProdTag(e.target.value)} placeholder="VD: Đang bán, Đặt trước, Bán chạy" />
                      </div>

                      {/* Image Preview & Upload Simulated Area */}
                      <div className="form-group" style={{ marginTop: 14 }}>
                        <label>Hình ảnh sản phẩm (Mock Image Uploader)</label>
                        <div className="image-uploader-box" onClick={() => document.getElementById("prod-image-file-input").click()}>
                          📁 Nhấp vào đây để tải tệp ảnh lên (giả lập preview Base64)
                          <input 
                            id="prod-image-file-input" 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageFileChange} 
                            style={{ display: "none" }} 
                          />
                        </div>
                        <div className="image-preview-grid">
                          {prodImages.map((img, idx) => (
                            <div key={idx} className="image-preview-item">
                              <img src={img} alt="Product image preview" />
                              <button type="button" className="remove-img-btn" onClick={() => handleRemoveImage(idx)}>✕</button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "24px", margin: "16px 0", background: "rgba(255,255,255,0.02)", padding: "10px 14px", borderRadius: 6 }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: 11, fontFamily: "var(--mono)", color: "#fff" }}>
                          <input type="checkbox" checked={prodAvailable} onChange={(e) => setProdAvailable(e.target.checked)} style={{ accentColor: "#ffea4b" }} />
                          Đang mở bán
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: 11, fontFamily: "var(--mono)", color: "#fff" }}>
                          <input type="checkbox" checked={prodBestSeller} onChange={(e) => setProdBestSeller(e.target.checked)} style={{ accentColor: "#ffea4b" }} />
                          🔥 Bán chạy (Best Seller)
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: 11, fontFamily: "var(--mono)", color: "#fff" }}>
                          <input type="checkbox" checked={prodOnSale} onChange={(e) => setProdOnSale(e.target.checked)} style={{ accentColor: "#ffea4b" }} />
                          🏷️ Giảm giá (On Sale)
                        </label>
                      </div>

                      {/* Sizes and prices editor table */}
                      <div style={{ background: "rgba(0,0,0,0.15)", padding: "14px", borderRadius: "8px", margin: "18px 0" }}>
                        <span style={{ fontSize: "10px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "10px", fontFamily: "var(--mono)" }}>Cài đặt kích thước & Giá bán</span>
                        {prodSizes.map((s, idx) => (
                          <div key={s.label} style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: "10px", margin: "8px 0", alignItems: "center" }}>
                            <b>Size {s.label}</b>
                            <input type="number" value={s.listedPrice} onChange={(e) => handleProductPriceChange(idx, 'listedPrice', e.target.value)} placeholder="Giá gốc niêm yết" style={{ height: "28px", fontSize: "12px" }} />
                            <input type="number" value={s.salePrice} onChange={(e) => handleProductPriceChange(idx, 'salePrice', e.target.value)} placeholder="Giá bán thực tế" style={{ height: "28px", fontSize: "12px" }} />
                          </div>
                        ))}
                      </div>

                      <div className="form-group" style={{ borderTop: "1px dashed rgba(255,255,255,0.1)", paddingTop: "14px" }}>
                        <label>🔗 Đề xuất sản phẩm liên quan</label>
                        <div style={{ 
                          maxHeight: "150px", 
                          overflowY: "auto", 
                          background: "#1e1a18", 
                          border: "1px solid rgba(255,255,255,0.1)", 
                          borderRadius: "5px", 
                          padding: "8px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px"
                        }}>
                          {catalog
                            .filter(p => p.id !== selectedProdId)
                            .map(p => {
                              const currentIds = prodRelatedIds ? prodRelatedIds.split(",").map(x => x.trim()).filter(Boolean) : [];
                              const isChecked = currentIds.includes(p.id);
                              return (
                                <label key={p.id} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "12.5px", color: "#fff", margin: 0 }}>
                                  <input 
                                    type="checkbox" 
                                    checked={isChecked} 
                                    style={{ accentColor: "#ffea4b" }}
                                    onChange={(e) => {
                                      let nextIds;
                                      if (e.target.checked) {
                                        nextIds = [...currentIds, p.id];
                                      } else {
                                        nextIds = currentIds.filter(id => id !== p.id);
                                      }
                                      setProdRelatedIds(nextIds.join(", "));
                                    }} 
                                  />
                                  <span>[{p.id.toUpperCase()}] {p.name}</span>
                                </label>
                              );
                            })
                          }
                        </div>
                        <span style={{ fontSize: "10px", opacity: 0.5, marginTop: 4, display: "block" }}>
                          Chọn các sản phẩm đề xuất từ danh sách trên để hiển thị dưới trang sản phẩm.
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                        <button type="submit" className="admin-btn" style={{ flex: 2 }}>{selectedProdId === "new" ? "➕ Thêm Sản Phẩm Mới" : "💾 Lưu Thay Đổi"}</button>
                        {selectedProdId !== "new" && (
                          <button type="button" onClick={handleDeleteProduct} className="admin-btn" style={{ flex: 1, background: "#b3242d", color: "#fff" }}>🗑️ Xóa</button>
                        )}
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: INTERFACE & TEXT */}
            {activeTab === "text_theme" && (
              <form onSubmit={handleSaveTextTheme} className="admin-box">
                {selectedTextSec === "homepage" && (
                  <>
                    <h3>🎨 Chỉnh sửa Text: Trang chủ & Khung Intro chính</h3>
                    <div className="form-group">
                      <label>Khẩu hiệu chính trên bàn (Intro Title)</label>
                      <input type="text" value={introTitle} onChange={(e) => setIntroTitle(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: 10 }}>
                      <label>Phụ đề mô tả trên bàn (Intro Subtitle)</label>
                      <input type="text" value={introSub} onChange={(e) => setIntroSub(e.target.value)} />
                    </div>
                  </>
                )}

                {selectedTextSec === "politics" && (
                  <>
                    <h3>🎨 Chỉnh sửa: Chuyên mục Chính trị (Politics Series)</h3>
                    <div className="form-group">
                      <label>Slogan/Phụ đề dưới tên báo The Gpaw Times</label>
                      <input type="text" value={politicsSlog} onChange={(e) => setPoliticsSlog(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: 14 }}>
                      <label>Ảnh bìa tạp chí Chính trị (Politics Magazine Cover)</label>
                      <input type="text" value={coverPol} onChange={(e) => setCoverPol(e.target.value)} placeholder="Đường dẫn hoặc tải ảnh lên" />
                      <div className="image-uploader-box" onClick={() => document.getElementById("cover-pol-input").click()} style={{ marginTop: 8 }}>
                        📁 Nhấp vào đây để tải ảnh bìa mới (Base64)
                        <input id="cover-pol-input" type="file" accept="image/*" onChange={(e) => handleCoverFileChange("politics", e)} style={{ display: "none" }} />
                      </div>
                      {coverPol && (
                        <div className="image-preview-grid" style={{ marginTop: 8 }}>
                          <div className="image-preview-item">
                            <img src={coverPol} alt="Politics Cover Preview" />
                            <button type="button" className="remove-img-btn" onClick={() => setCoverPol("assets/cover-politics.png")}>✕ Reset</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {selectedTextSec === "anime" && (
                  <>
                    <h3>🎨 Chỉnh sửa: Phân mục Anime (Shonen Weekly)</h3>
                    <div className="form-group">
                      <label>Slogan/Chương sách trên banner (Manga Chapter Label)</label>
                      <input type="text" value={animeSlog} onChange={(e) => setAnimeSlog(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: 14 }}>
                      <label>Ảnh bìa tạp chí Anime (Anime Magazine Cover)</label>
                      <input type="text" value={coverAni} onChange={(e) => setCoverAni(e.target.value)} placeholder="Đường dẫn hoặc tải ảnh lên" />
                      <div className="image-uploader-box" onClick={() => document.getElementById("cover-ani-input").click()} style={{ marginTop: 8 }}>
                        📁 Nhấp vào đây để tải ảnh bìa mới (Base64)
                        <input id="cover-ani-input" type="file" accept="image/*" onChange={(e) => handleCoverFileChange("anime", e)} style={{ display: "none" }} />
                      </div>
                      {coverAni && (
                        <div className="image-preview-grid" style={{ marginTop: 8 }}>
                          <div className="image-preview-item">
                            <img src={coverAni} alt="Anime Cover Preview" />
                            <button type="button" className="remove-img-btn" onClick={() => setCoverAni("assets/cover-anime.png")}>✕ Reset</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {selectedTextSec === "stars" && (
                  <>
                    <h3>🎨 Chỉnh sửa: Phân mục Ca sĩ (Gpaw Vogue Series)</h3>
                    <div className="form-group">
                      <label>Slogan mô tả Vogue Stars</label>
                      <input type="text" value={starsSlog} onChange={(e) => setStarsSlog(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: 14 }}>
                      <label>Ảnh bìa tạp chí Ca sĩ (Stars Magazine Cover)</label>
                      <input type="text" value={coverSta} onChange={(e) => setCoverSta(e.target.value)} placeholder="Đường dẫn hoặc tải ảnh lên" />
                      <div className="image-uploader-box" onClick={() => document.getElementById("cover-sta-input").click()} style={{ marginTop: 8 }}>
                        📁 Nhấp vào đây để tải ảnh bìa mới (Base64)
                        <input id="cover-sta-input" type="file" accept="image/*" onChange={(e) => handleCoverFileChange("stars", e)} style={{ display: "none" }} />
                      </div>
                      {coverSta && (
                        <div className="image-preview-grid" style={{ marginTop: 8 }}>
                          <div className="image-preview-item">
                            <img src={coverSta} alt="Stars Cover Preview" />
                            <button type="button" className="remove-img-btn" onClick={() => setCoverSta("assets/cover-stars.png")}>✕ Reset</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {selectedTextSec === "plush" && (
                  <>
                    <h3>🎨 Chỉnh sửa: Phân mục Thú bông (Gpaw Kinfolk Series)</h3>
                    <div className="form-group">
                      <label>Khẩu hiệu tối giản Kinfolk</label>
                      <input type="text" value={plushSlog} onChange={(e) => setPlushSlog(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: 14 }}>
                      <label>Ảnh bìa tạp chí Thú bông (Plush Magazine Cover)</label>
                      <input type="text" value={coverPlu} onChange={(e) => setCoverPlu(e.target.value)} placeholder="Đường dẫn hoặc tải ảnh lên" />
                      <div className="image-uploader-box" onClick={() => document.getElementById("cover-plu-input").click()} style={{ marginTop: 8 }}>
                        📁 Nhấp vào đây để tải ảnh bìa mới (Base64)
                        <input id="cover-plu-input" type="file" accept="image/*" onChange={(e) => handleCoverFileChange("plush", e)} style={{ display: "none" }} />
                      </div>
                      {coverPlu && (
                        <div className="image-preview-grid" style={{ marginTop: 8 }}>
                          <div className="image-preview-item">
                            <img src={coverPlu} alt="Plush Cover Preview" />
                            <button type="button" className="remove-img-btn" onClick={() => setCoverPlu("assets/cover-plush.png")}>✕ Reset</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {selectedTextSec === "footer" && (
                  <>
                    <h3>🎨 Chỉnh sửa: Footer, Liên hệ & Cấu hình thương hiệu</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div className="form-group">
                        <label>Tên thương hiệu (Brand Name Logo)</label>
                        <input type="text" value={brandN} onChange={(e) => setBrandN(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Hotline số điện thoại</label>
                        <input type="text" value={contactPh} onChange={(e) => setContactPh(e.target.value)} />
                      </div>
                    </div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 10 }}>
                      <div className="form-group">
                        <label>Đường dẫn chat Zalo</label>
                        <input type="text" value={zaloL} onChange={(e) => setZaloL(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Đường dẫn chat Messenger</label>
                        <input type="text" value={messengerL} onChange={(e) => setMessengerL(e.target.value)} />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: 10 }}>
                      <label>Đoạn giới thiệu thương hiệu chân trang (Footer About)</label>
                      <textarea rows="3" value={footerAbout} onChange={(e) => setFooterAbout(e.target.value)} style={{ width: '100%', background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '5px', fontSize: '13px', outline: 'none', fontFamily: 'var(--body)' }}></textarea>
                    </div>
                    
                    <div className="form-group" style={{ marginTop: 14 }}>
                      <label>Màu sắc điểm nhấn chính (Theme Color Highlight)</label>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} style={{ width: "50px", height: "36px", padding: 0, border: "none", cursor: "pointer" }} />
                        <span>{themeColor} (Tự động áp dụng cho các liên kết, nút bấm chính)</span>
                      </div>
                    </div>
                  </>
                )}

                {selectedTextSec === "subpage" && (
                  <>
                    <h3>🎨 Chỉnh sửa: Trang chi tiết sản phẩm (Trang phụ)</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div className="form-group">
                        <label>Tiêu đề Cam kết 1</label>
                        <input type="text" value={commit1Title} onChange={(e) => setCommit1Title(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Mô tả Cam kết 1</label>
                        <input type="text" value={commit1Desc} onChange={(e) => setCommit1Desc(e.target.value)} />
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
                      <div className="form-group">
                        <label>Tiêu đề Cam kết 2</label>
                        <input type="text" value={commit2Title} onChange={(e) => setCommit2Title(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Mô tả Cam kết 2</label>
                        <input type="text" value={commit2Desc} onChange={(e) => setCommit2Desc(e.target.value)} />
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
                      <div className="form-group">
                        <label>Tiêu đề Cam kết 3</label>
                        <input type="text" value={commit3Title} onChange={(e) => setCommit3Title(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Mô tả Cam kết 3</label>
                        <input type="text" value={commit3Desc} onChange={(e) => setCommit3Desc(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group" style={{ marginTop: 10 }}>
                      <label>Mẹo chọn kích cỡ (Size Guide Tip)</label>
                      <input type="text" value={sizeGuideTip} onChange={(e) => setSizeGuideTip(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: 10 }}>
                      <label>Tiêu đề chất liệu (Tab Mô tả)</label>
                      <input type="text" value={detailMaterialTitle} onChange={(e) => setDetailMaterialTitle(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: 10 }}>
                      <label>Mô tả chi tiết chất liệu (Tab Mô tả)</label>
                      <textarea rows="3" value={detailMaterialDesc} onChange={(e) => setDetailMaterialDesc(e.target.value)} style={{ width: '100%', background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '5px', fontSize: '13px', outline: 'none', fontFamily: 'var(--body)' }}></textarea>
                    </div>
                    
                    <h4 style={{ margin: "16px 0 8px 0", color: "#ffea4b" }}>Chính sách bảo dưỡng & Vận chuyển</h4>
                    <div className="form-group">
                      <label>Tiêu đề phần Vệ sinh gối (Tab Bảo quản)</label>
                      <input type="text" value={careTitle} onChange={(e) => setCareTitle(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: 10 }}>
                      <label>Chi tiết Vệ sinh 1</label>
                      <input type="text" value={careStep1} onChange={(e) => setCareStep1(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: 10 }}>
                      <label>Chi tiết Vệ sinh 2</label>
                      <input type="text" value={careStep2} onChange={(e) => setCareStep2(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginTop: 10 }}>
                      <label>Chi tiết Vệ sinh 3</label>
                      <input type="text" value={careStep3} onChange={(e) => setCareStep3(e.target.value)} />
                    </div>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
                      <div className="form-group">
                        <label>Tiêu đề Chính sách 1</label>
                        <input type="text" value={policyTitle1} onChange={(e) => setPolicyTitle1(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Mô tả Chính sách 1</label>
                        <textarea rows="2" value={policyDesc1} onChange={(e) => setPolicyDesc1(e.target.value)} style={{ width: '100%', background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '5px', fontSize: '13px', outline: 'none', fontFamily: 'var(--body)' }}></textarea>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
                      <div className="form-group">
                        <label>Tiêu đề Chính sách 2</label>
                        <input type="text" value={policyTitle2} onChange={(e) => setPolicyTitle2(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Mô tả Chính sách 2</label>
                        <textarea rows="2" value={policyDesc2} onChange={(e) => setPolicyDesc2(e.target.value)} style={{ width: '100%', background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '5px', fontSize: '13px', outline: 'none', fontFamily: 'var(--body)' }}></textarea>
                      </div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
                      <div className="form-group">
                        <label>Tiêu đề Chính sách 3</label>
                        <input type="text" value={policyTitle3} onChange={(e) => setPolicyTitle3(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Mô tả Chính sách 3</label>
                        <textarea rows="2" value={policyDesc3} onChange={(e) => setPolicyDesc3(e.target.value)} style={{ width: '100%', background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '5px', fontSize: '13px', outline: 'none', fontFamily: 'var(--body)' }}></textarea>
                      </div>
                    </div>
                  </>
                )}

                {selectedTextSec === "payment" && (
                  <>
                    <h3>💳 Cấu hình Thanh toán & QR Ngân hàng</h3>
                    <p style={{ fontSize: "12.5px", color: "#b3b3b3", marginBottom: "20px", lineHeight: "1.5" }}>
                      Cấu hình tài khoản ngân hàng của shop để tự động hiển thị mã VietQR khi khách thanh toán chuyển khoản, và tích hợp mã bảo mật Casso để tự động phát hiện khách chuyển khoản thành công.
                    </p>
                    <div className="form-group" style={{ marginBottom: "14px" }}>
                      <label>Ngân hàng nhận tiền (Mã VietQR)</label>
                      <select value={bankId} onChange={(e) => setBankId(e.target.value)} required style={{ width: '100%', height: '36px', background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '0 10px', borderRadius: '5px' }}>
                        <option value="MBBank">MB Bank (Military Bank)</option>
                        <option value="Vietcombank">Vietcombank (VCB)</option>
                        <option value="Techcombank">Techcombank (TCB)</option>
                        <option value="VietinBank">VietinBank</option>
                        <option value="BIDV">BIDV</option>
                        <option value="ACB">ACB</option>
                        <option value="VPBank">VPBank</option>
                        <option value="Sacombank">Sacombank</option>
                        <option value="TPBank">TPBank</option>
                        <option value="HDBank">HDBank</option>
                        <option value="VIB">VIB</option>
                        <option value="MSB">MSB</option>
                      </select>
                      <span style={{ fontSize: "11px", color: "#888", display: "block", marginTop: "4px" }}>Chọn ngân hàng để sinh mã QR chuẩn xác.</span>
                    </div>
                    <div className="form-group" style={{ marginBottom: "14px" }}>
                      <label>Số tài khoản ngân hàng</label>
                      <input type="text" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} placeholder="Nhập số tài khoản..." required />
                    </div>
                    <div className="form-group" style={{ marginBottom: "14px" }}>
                      <label>Tên chủ tài khoản (Viết hoa không dấu)</label>
                      <input type="text" value={bankAccountName} onChange={(e) => setBankAccountName(e.target.value)} placeholder="Ví dụ: NGUYEN VAN A" required />
                    </div>
                    <div className="form-group" style={{ marginBottom: "14px" }}>
                      <label>Casso API Key (Đọc số dư chuyển khoản tự động)</label>
                      <input type="password" value={cassoKey} onChange={(e) => setCassoKey(e.target.value)} placeholder="Nhập API Key từ Casso.vn..." />
                      <span style={{ fontSize: "11px", color: "#888", display: "block", marginTop: "4px" }}>Để trống nếu muốn sử dụng Chế độ giả lập (Simulation Mode) để test thử.</span>
                    </div>
                  </>
                )}

                <button type="submit" className="admin-btn" style={{ marginTop: "20px" }}>💾 Lưu Cài Đặt Giao Diện & Text</button>
              </form>
            )}

            {/* TAB CONTENT: CUSTOMERS */}
            {activeTab === "customers" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
                
                {/* Bulk Edit Customer Modal */}
                {showBulkCustModal && (
                  <div className="admin-modal-overlay">
                    <div className="admin-modal-content" style={{ maxWidth: "450px" }}>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "800", color: "#16213a", fontFamily: "var(--display-serif)" }}>
                        ✏️ Sửa hàng loạt {selectedCustIds.length} khách hàng
                      </h3>
                      <p style={{ fontSize: "13px", color: "#666", marginBottom: "16px" }}>
                        Tích chọn các trường thông tin bạn muốn thay đổi đồng loạt dưới đây:
                      </p>
                      
                      <div style={{ background: "#f9f9f9", padding: "10px", borderRadius: "6px", marginBottom: "10px", border: "1px solid #eee" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", fontSize: "13px", color: "#333", cursor: "pointer", marginBottom: updateCustStatus ? "8px" : "0" }}>
                          <input type="checkbox" checked={updateCustStatus} onChange={(e) => setUpdateCustStatus(e.target.checked)} style={{ accentColor: "#ffea4b" }} />
                          Cập nhật Trạng thái tài khoản
                        </label>
                        {updateCustStatus && (
                          <select value={bulkCustStatus} onChange={(e) => setBulkCustStatus(e.target.value)} style={{ width: "100%", height: "32px", padding: "0 8px", borderRadius: "4px", border: "1px solid #ccc" }}>
                            <option value="Active">Đang hoạt động (Active)</option>
                            <option value="Pending">Chờ kích hoạt (Pending)</option>
                            <option value="Banned">🔴 Khóa tài khoản (Banned)</option>
                          </select>
                        )}
                      </div>

                      <div style={{ background: "#f9f9f9", padding: "10px", borderRadius: "6px", marginBottom: "10px", border: "1px solid #eee" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", fontSize: "13px", color: "#333", cursor: "pointer", marginBottom: updateCustTier ? "8px" : "0" }}>
                          <input type="checkbox" checked={updateCustTier} onChange={(e) => setUpdateCustTier(e.target.checked)} style={{ accentColor: "#ffea4b" }} />
                          Cập nhật Hạng thành viên
                        </label>
                        {updateCustTier && (
                          <select value={bulkCustTier} onChange={(e) => setBulkCustTier(e.target.value)} style={{ width: "100%", height: "32px", padding: "0 8px", borderRadius: "4px", border: "1px solid #ccc" }}>
                            <option value="Vàng">Vàng (Gold)</option>
                            <option value="Bạc">Bạc (Silver)</option>
                            <option value="Đồng">Đồng (Bronze)</option>
                          </select>
                        )}
                      </div>

                      <div style={{ background: "#f9f9f9", padding: "10px", borderRadius: "6px", marginBottom: "10px", border: "1px solid #eee" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", fontSize: "13px", color: "#333", cursor: "pointer", marginBottom: updateCustPoints ? "8px" : "0" }}>
                          <input type="checkbox" checked={updateCustPoints} onChange={(e) => setUpdateCustPoints(e.target.checked)} style={{ accentColor: "#ffea4b" }} />
                          Cộng/trừ điểm tích lũy Paw
                        </label>
                        {updateCustPoints && (
                          <input type="number" value={bulkCustAddPoints} onChange={(e) => setBulkCustAddPoints(Number(e.target.value) || 0)} style={{ width: "100%", height: "32px", padding: "0 8px", borderRadius: "4px", border: "1px solid #ccc" }} placeholder="Điền 100 để cộng, -50 để trừ" />
                        )}
                      </div>

                      <div style={{ background: "#f9f9f9", padding: "10px", borderRadius: "6px", marginBottom: "16px", border: "1px solid #eee" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", fontSize: "13px", color: "#333", cursor: "pointer", marginBottom: updateCustNotes ? "8px" : "0" }}>
                          <input type="checkbox" checked={updateCustNotes} onChange={(e) => setUpdateCustNotes(e.target.checked)} style={{ accentColor: "#ffea4b" }} />
                          Bổ sung Ghi chú nội bộ
                        </label>
                        {updateCustNotes && (
                          <textarea rows="2" value={bulkCustNotes} onChange={(e) => setBulkCustNotes(e.target.value)} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "12.5px" }} placeholder="Ghi chú bổ sung..."></textarea>
                        )}
                      </div>

                      <div style={{ display: "flex", gap: "12px" }}>
                        <button
                          type="button"
                          onClick={() => {
                            if (!updateCustStatus && !updateCustTier && !updateCustPoints && !updateCustNotes) {
                              alert("Vui lòng chọn ít nhất một trường cần cập nhật!");
                              return;
                            }
                            const updated = customers.map(c => {
                              if (selectedCustIds.includes(String(c.id))) {
                                const newC = { ...c };
                                if (updateCustStatus) newC.status = bulkCustStatus;
                                if (updateCustTier) newC.tier = bulkCustTier;
                                if (updateCustPoints) newC.points = Math.max(0, (newC.points || 0) + bulkCustAddPoints);
                                if (updateCustNotes) newC.notes = (newC.notes ? newC.notes + " \n" : "") + bulkCustNotes;
                                return newC;
                              }
                              return c;
                            });
                            onUpdateCustomers(updated);
                            setSelectedCustIds([]);
                            setBulkCustMode(false);
                            setShowBulkCustModal(false);
                            alert("Đã lưu hàng loạt cho các khách hàng được chọn!");
                          }}
                          style={{
                            flex: 1,
                            padding: "10px",
                            background: "#b3242d",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            cursor: "pointer"
                          }}
                        >
                          Lưu lại
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowBulkCustModal(false)}
                          style={{
                            flex: 1,
                            padding: "10px",
                            background: "#aaa",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            cursor: "pointer"
                          }}
                        >
                          Đóng
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {selectedCustomer ? (
                  <div className="admin-box">
                    <h3>👥 Chỉnh sửa thành viên: {custName} (Hạng {custTier})</h3>
                    
                    <form onSubmit={handleSaveCustomer}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div className="form-group">
                          <label>Họ và Tên</label>
                          <input type="text" value={custName} onChange={(e) => setCustName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label>Email liên hệ</label>
                          <input type="email" value={custEmail} onChange={(e) => setCustEmail(e.target.value)} required />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 10 }}>
                        <div className="form-group">
                          <label>Số điện thoại</label>
                          <input type="text" value={custPhone} onChange={(e) => setCustPhone(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label>Số dư điểm tích lũy Paw</label>
                          <input type="number" value={custPoints} onChange={(e) => setCustPoints(e.target.value)} required />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 10 }}>
                        <div className="form-group">
                          <label>Trạng thái tài khoản</label>
                          <select value={custStatus} onChange={(e) => setCustStatus(e.target.value)} style={{ background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', height: '32px', borderRadius: '5px', width: '100%', outline: 'none', padding: "0 10px", fontSize: 13, fontFamily: "var(--body)" }}>
                            <option value="Active">Đang hoạt động (Active)</option>
                            <option value="Pending">Chờ kích hoạt (Pending)</option>
                            <option value="Banned">🔴 Khóa tài khoản (Banned)</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Hạng thành viên</label>
                          <select value={custTier} onChange={(e) => setCustTier(e.target.value)} style={{ background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', height: '32px', borderRadius: '5px', width: '100%', outline: 'none', padding: "0 10px", fontSize: 13, fontFamily: "var(--body)" }}>
                            <option value="Vàng">Vàng (Gold)</option>
                            <option value="Bạc">Bạc (Silver)</option>
                            <option value="Đồng">Đồng (Bronze)</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group" style={{ marginTop: 10 }}>
                        <label>📍 Địa chỉ mặc định giao hàng</label>
                        <input type="text" value={custAddress} onChange={(e) => setCustAddress(e.target.value)} placeholder="Nhập địa chỉ giao hàng của khách..." />
                      </div>

                      <div className="form-group" style={{ marginTop: 10 }}>
                        <label>📝 Ghi chú riêng cho khách hàng (Giao dịch viên ghi chú thêm)</label>
                        <textarea rows="3" value={custNotes} onChange={(e) => setCustNotes(e.target.value)} style={{ width: '100%', background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '5px', fontSize: '13px', outline: 'none', fontFamily: 'var(--body)' }} placeholder="Nhập ghi chú..."></textarea>
                      </div>

                      <button type="submit" className="admin-btn" style={{ marginTop: 10 }}>💾 Cập Nhật Hồ Sơ Thành Viên</button>
                    </form>

                    {/* Purchase Logs timeline */}
                    <div style={{ marginTop: 24, borderTop: "1px dashed rgba(255,255,255,0.1)", paddingTop: 18 }}>
                      <h3>🛒 Nhật ký mua hàng (Purchase Logs)</h3>
                      {getCustomerOrders(custEmail).length > 0 ? (
                        <div className="customer-log-timeline">
                          {getCustomerOrders(custEmail).map(order => {
                            const isCompleted = order.status === "Completed";
                            const isCancelled = order.status === "Cancelled";
                            const timelineClass = "timeline-item" + (isCompleted ? " completed" : isCancelled ? " cancelled" : "");
                            return (
                              <div key={order.id} className={timelineClass}>
                                <div className="timeline-header">
                                  <span>Đơn đặt: <b>#ORD{order.id}</b> ({order.datetime})</span>
                                  <span style={{ color: isCompleted ? "#27c93f" : isCancelled ? "#b3242d" : "#ffbd2e", fontWeight: "bold" }}>
                                    {order.status || "Processing"}
                                  </span>
                                </div>
                                <div className="timeline-content">
                                  Sản phẩm: <b>{order.details}</b> · Thanh toán: <b>{order.value}</b>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p style={{ fontSize: 12, opacity: 0.5, margin: 0, fontStyle: "italic" }}>Khách hàng chưa phát sinh giao dịch mua hàng nào trên hệ thống.</p>
                      )}
                    </div>

                  </div>
                ) : (
                  <p style={{ opacity: 0.6, fontSize: "13px", margin: 0, textAlign: "center" }}>Vui lòng chọn khách hàng trong danh sách bên trái để xem nhật ký mua hàng và chỉnh sửa thông tin.</p>
                )}
              </div>
            )}

            {/* TAB CONTENT: ORDERS */}
            {activeTab === "orders" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
                
                {/* Order Edit Modal Overlay */}
                {showOrderEditModal && editingOrder && (
                  <div className="admin-modal-overlay">
                    <div className="admin-modal-content" style={{ maxWidth: "500px" }}>
                      <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "800", color: "#16213a", fontFamily: "var(--display-serif)" }}>
                        ✏️ Sửa thông tin đơn hàng #ORD{editingOrder.id}
                      </h3>
                      
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                        <div className="form-group">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#333", marginBottom: "4px" }}>Tên khách hàng</label>
                          <input type="text" value={editOrderCustName} onChange={(e) => setEditOrderCustName(e.target.value)} style={{ width: "100%", height: "32px", padding: "0 8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                        </div>
                        <div className="form-group">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#333", marginBottom: "4px" }}>Email đặt hàng</label>
                          <input type="email" value={editOrderCustEmail} onChange={(e) => setEditOrderCustEmail(e.target.value)} style={{ width: "100%", height: "32px", padding: "0 8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                        <div className="form-group">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#333", marginBottom: "4px" }}>Ngày mua</label>
                          <input type="text" value={editOrderDatetime} onChange={(e) => setEditOrderDatetime(e.target.value)} style={{ width: "100%", height: "32px", padding: "0 8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                        </div>
                        <div className="form-group">
                          <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#333", marginBottom: "4px" }}>Tổng thanh toán</label>
                          <input type="text" value={editOrderValue} onChange={(e) => setEditOrderValue(e.target.value)} style={{ width: "100%", height: "32px", padding: "0 8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: "10px" }}>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#333", marginBottom: "4px" }}>Chi tiết giỏ hàng</label>
                        <input type="text" value={editOrderDetails} onChange={(e) => setEditOrderDetails(e.target.value)} style={{ width: "100%", height: "32px", padding: "0 8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                      </div>

                      <div className="form-group" style={{ marginBottom: "20px" }}>
                        <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#333", marginBottom: "4px" }}>Trạng thái vận chuyển</label>
                        <select value={editOrderStatus} onChange={(e) => setEditOrderStatus(e.target.value)} style={{ width: "100%", height: "32px", padding: "0 8px", borderRadius: "4px", border: "1px solid #ccc" }}>
                          <option value="Processing">Đang xử lý (Processing)</option>
                          <option value="Shipped">Đang giao hàng (Shipped)</option>
                          <option value="Completed">Đã hoàn thành (Completed)</option>
                          <option value="Cancelled">❌ Hủy đơn (Cancelled)</option>
                        </select>
                      </div>

                      <div style={{ display: "flex", gap: "12px" }}>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = orders.map(o => {
                              if (o.id === editingOrder.id) {
                                return {
                                  ...o,
                                  customerName: editOrderCustName,
                                  customerEmail: editOrderCustEmail,
                                  datetime: editOrderDatetime,
                                  details: editOrderDetails,
                                  value: editOrderValue,
                                  status: editOrderStatus
                                };
                              }
                              return o;
                            });
                            onUpdateOrders(updated);
                            setShowOrderEditModal(false);
                            setEditingOrder(null);
                            alert("Cập nhật đơn hàng thành công!");
                          }}
                          style={{
                            flex: 1,
                            padding: "10px",
                            background: "#b3242d",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            cursor: "pointer"
                          }}
                        >
                          Lưu lại
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowOrderEditModal(false);
                            setEditingOrder(null);
                          }}
                          style={{
                            flex: 1,
                            padding: "10px",
                            background: "#aaa",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            cursor: "pointer"
                          }}
                        >
                          Đóng
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="admin-box">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                    <h3>🛒 Danh sách đơn hàng ({filteredOrders.length})</h3>
                    
                    {/* Bulk Action Bar */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <select 
                        id="order-bulk-action" 
                        style={{ height: 32, background: "#1e1a18", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "0 6px", fontSize: 12 }}
                      >
                        <option value="">-- Thao tác hàng loạt --</option>
                        <option value="status:Processing">Đổi sang: Đang xử lý</option>
                        <option value="status:Shipped">Đổi sang: Đang giao</option>
                        <option value="status:Completed">Đổi sang: Đã giao</option>
                        <option value="status:Cancelled">Đổi sang: Đã hủy</option>
                        <option value="delete">🗑️ Xóa các đơn đã chọn</option>
                      </select>
                      <button 
                        type="button"
                        onClick={() => {
                          const action = document.getElementById("order-bulk-action").value;
                          if (!action) { alert("Vui lòng chọn một thao tác!"); return; }
                          if (selectedOrderIds.length === 0) { alert("Vui lòng chọn ít nhất một đơn hàng!"); return; }
                          
                          if (action === "delete") {
                            if (confirm(`Bạn có chắc chắn muốn xóa ${selectedOrderIds.length} đơn hàng đã chọn?`)) {
                              const updated = orders.filter(o => !selectedOrderIds.includes(String(o.id)));
                              onUpdateOrders(updated);
                              setSelectedOrderIds([]);
                              alert("Đã xóa hàng loạt thành công!");
                            }
                          } else if (action.startsWith("status:")) {
                            const newStatus = action.split(":")[1];
                            const updated = orders.map(o => {
                              if (selectedOrderIds.includes(String(o.id))) {
                                return { ...o, status: newStatus };
                              }
                              return o;
                            });
                            onUpdateOrders(updated);
                            setSelectedOrderIds([]);
                            alert(`Đã cập nhật trạng thái cho ${selectedOrderIds.length} đơn hàng thành công!`);
                          }
                        }}
                        style={{
                          background: "#ffea4b",
                          color: "#000",
                          border: "none",
                          padding: "0 14px",
                          height: 32,
                          borderRadius: "4px",
                          fontWeight: "bold",
                          fontSize: "12px",
                          cursor: "pointer"
                        }}
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                  
                  {/* Table of Orders */}
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", color: "#fff", fontSize: "12.5px" }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)", textAlign: "left" }}>
                          <th style={{ padding: "8px" }}>
                            <input 
                              type="checkbox" 
                              checked={selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedOrderIds(filteredOrders.map(o => String(o.id)));
                                } else {
                                  setSelectedOrderIds([]);
                                }
                              }}
                              style={{ accentColor: "#ffea4b" }}
                            />
                          </th>
                          <th style={{ padding: "8px" }}>Mã đơn</th>
                          <th style={{ padding: "8px" }}>Khách hàng</th>
                          <th style={{ padding: "8px" }}>Ngày đặt</th>
                          <th style={{ padding: "8px" }}>Sản phẩm</th>
                          <th style={{ padding: "8px" }}>Giá trị</th>
                          <th style={{ padding: "8px" }}>Trạng thái</th>
                          <th style={{ padding: "8px", textAlign: "right" }}>Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map(o => {
                          const isChecked = selectedOrderIds.includes(String(o.id));
                          return (
                            <tr key={o.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: isChecked ? "rgba(255, 234, 75, 0.05)" : "transparent" }}>
                              <td style={{ padding: "8px" }}>
                                <input 
                                  type="checkbox" 
                                  checked={isChecked}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedOrderIds([...selectedOrderIds, String(o.id)]);
                                    } else {
                                      setSelectedOrderIds(selectedOrderIds.filter(id => id !== String(o.id)));
                                    }
                                  }}
                                  style={{ accentColor: "#ffea4b" }}
                                />
                              </td>
                              <td style={{ padding: "8px", fontWeight: "bold", color: "#ffea4b" }}>#ORD{o.id}</td>
                              <td style={{ padding: "8px" }}>
                                <div><b>{o.customerName}</b></div>
                                <div style={{ fontSize: "10.5px", opacity: 0.5 }}>{o.customerEmail}</div>
                              </td>
                              <td style={{ padding: "8px", whiteSpace: "nowrap" }}>{o.datetime}</td>
                              <td style={{ padding: "8px" }}>{o.details}</td>
                              <td style={{ padding: "8px", fontWeight: "bold" }}>{o.value}</td>
                              <td style={{ padding: "8px" }}>
                                <span style={{ 
                                  padding: "2px 6px", 
                                  borderRadius: "4px", 
                                  fontSize: "11px", 
                                  fontWeight: "bold",
                                  background: o.status === "Completed" ? "#22c55e" : o.status === "Cancelled" ? "#ef4444" : o.status === "Shipped" ? "#3b82f6" : "#eab308",
                                  color: "#fff"
                                }}>
                                  {o.status === "Completed" ? "Đã giao" : o.status === "Cancelled" ? "Đã hủy" : o.status === "Shipped" ? "Đang giao" : "Đang xử lý"}
                                </span>
                              </td>
                              <td style={{ padding: "8px", textAlign: "right", whiteSpace: "nowrap" }}>
                                <button 
                                  type="button"
                                  onClick={() => {
                                    setEditingOrder(o);
                                    setShowOrderEditModal(true);
                                  }}
                                  style={{ background: "transparent", border: "none", color: "#ffea4b", marginRight: "8px", cursor: "pointer", fontSize: "14px" }}
                                  title="Sửa đơn hàng"
                                >
                                  ✏️
                                </button>
                                <button 
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Bạn chắc chắn muốn xóa đơn hàng #ORD${o.id}?`)) {
                                      const updated = orders.filter(x => x.id !== o.id);
                                      onUpdateOrders(updated);
                                      alert("Đã xóa đơn hàng!");
                                    }
                                  }}
                                  style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "14px" }}
                                  title="Xóa đơn hàng"
                                >
                                  🗑️
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="admin-box">
                  <h3>📊 Thống kê doanh thu</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={{ background: "rgba(0,0,0,0.15)", padding: 14, borderRadius: 6 }}>
                      <span style={{ fontSize: 10, opacity: 0.5, display: "block" }}>TỔNG DOANH THU THỰC TẾ (TRỪ ĐƠN HỦY)</span>
                      <b style={{ fontSize: 22, color: "#27c93f" }}>{fmtPrice(totalRevenue)}</b>
                    </div>
                    <div style={{ background: "rgba(0,0,0,0.15)", padding: 14, borderRadius: 6 }}>
                      <span style={{ fontSize: 10, opacity: 0.5, display: "block" }}>TỔNG SỐ ĐƠN MUA HÀNG</span>
                      <b style={{ fontSize: 22, color: "#ffea4b" }}>{orders.length} đơn hàng</b>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB CONTENT: NEWS */}
            {activeTab === "news" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
                {editingNewsIdx === -1 ? (
                  <div className="admin-box">
                    <h3>📰 Chuyên mục: {{ tina: "Tin a", tinb: "Tin b", tinc: "Tin c" }[selectedNewsSubcat]}</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
                      {(siteSettings.newsList || [])
                        .map((news, idx) => ({ ...news, originalIndex: idx }))
                        .filter(news => news.subCategory === selectedNewsSubcat)
                        .map(news => (
                          <div 
                            key={news.originalIndex} 
                            style={{ 
                              background: "rgba(255,255,255,0.02)", 
                              border: "1px solid rgba(255,255,255,0.08)", 
                              padding: "16px", 
                              borderRadius: "8px", 
                              display: "flex", 
                              justifyContent: "space-between", 
                              alignItems: "center" 
                            }}
                          >
                            <div style={{ flex: 1, marginRight: "16px" }}>
                              <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                                <span style={{ fontSize: "11px", fontFamily: "var(--mono)", color: "#ffea4b" }}>{news.date}</span>
                                <span style={{ fontSize: "10px", background: "rgba(255,255,255,0.1)", padding: "1px 4px", borderRadius: "2px" }}>{news.category}</span>
                              </div>
                              <h4 style={{ margin: "0 0 6px 0", color: "#fff" }}>{news.title}</h4>
                              <p style={{ margin: 0, fontSize: "12.5px", opacity: 0.7, lineHeight: 1.5 }}>{news.summary}</p>
                            </div>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <button 
                                type="button"
                                onClick={() => {
                                  setEditingNewsIdx(news.originalIndex);
                                  setNewsDate(news.date);
                                  setNewsCategory(news.category || "TIN TỨC");
                                  setNewsTitle(news.title);
                                  setNewsSummary(news.summary);
                                }}
                                style={{ background: "#ffea4b", color: "#000", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}
                              >
                                Sửa
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleDeleteNews(news.originalIndex)}
                                style={{ background: "#b3242d", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold", fontSize: "12px" }}
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        ))
                      }
                      {(siteSettings.newsList || []).filter(n => n.subCategory === selectedNewsSubcat).length === 0 && (
                        <p style={{ opacity: 0.5, fontStyle: "italic", textAlign: "center", margin: "20px 0" }}>Chưa có tin tức nào trong danh mục này.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAddOrEditNews} className="admin-box">
                    <h3>{editingNewsIdx >= 0 ? "✏️ Chỉnh sửa bài viết tin tức" : "➕ Đăng tin tức mới"}</h3>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div className="form-group">
                        <label>Danh mục</label>
                        <select 
                          value={selectedNewsSubcat} 
                          onChange={(e) => setSelectedNewsSubcat(e.target.value)}
                          style={{ background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', height: '32px', borderRadius: '5px', width: '100%', outline: 'none', padding: "0 10px", fontSize: 13, fontFamily: "var(--body)" }}
                        >
                          <option value="tina">Tin a</option>
                          <option value="tinb">Tin b</option>
                          <option value="tinc">Tin c</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Ngày đăng (Mặc định: hôm nay)</label>
                        <input type="text" value={newsDate} onChange={(e) => setNewsDate(e.target.value)} placeholder="VD: 28/05/2026" />
                      </div>
                    </div>
                    
                    <div className="form-group" style={{ marginTop: 10 }}>
                      <label>Nhãn chuyên mục (VD: KHUYẾN MÃI, TIN BÃO)</label>
                      <input type="text" value={newsCategory} onChange={(e) => setNewsCategory(e.target.value)} placeholder="TIN TỨC" required />
                    </div>

                    <div className="form-group" style={{ marginTop: 10 }}>
                      <label>Tiêu đề tin tức *</label>
                      <input type="text" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} placeholder="Tiêu đề..." required />
                    </div>

                    <div className="form-group" style={{ marginTop: 10 }}>
                      <label>Nội dung tóm tắt *</label>
                      <textarea rows="4" value={newsSummary} onChange={(e) => setNewsSummary(e.target.value)} style={{ width: '100%', background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '5px', fontSize: '13px', outline: 'none', fontFamily: 'var(--body)' }} placeholder="Tóm tắt nội dung..." required></textarea>
                    </div>

                    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                      <button type="submit" className="admin-btn" style={{ flex: 1 }}>💾 Lưu Bài Tin</button>
                      <button 
                        type="button" 
                        className="admin-btn" 
                        style={{ background: "#666", color: "#fff", flex: 1 }}
                        onClick={() => {
                          setEditingNewsIdx(-1);
                          setNewsDate("");
                          setNewsTitle("");
                          setNewsSummary("");
                        }}
                      >
                        Hủy bỏ
                      </button>
                    </div>
                  </form>
                )}

                {editingNewsIdx >= 0 && (
                  <div className="admin-box" style={{ border: "1px solid #b3242d" }}>
                    <h3>🗑️ Xóa tin bài</h3>
                    <p style={{ fontSize: 12.5, opacity: 0.7, margin: "0 0 12px" }}>Hành động này sẽ gỡ bài tin tức này khỏi cột Bản tin của trang chủ mãi mãi.</p>
                    <button 
                      type="button" 
                      onClick={() => handleDeleteNews(editingNewsIdx)} 
                      style={{ background: "#b3242d", color: "#fff", height: 36, border: 0, borderRadius: 5, fontWeight: "bold", cursor: "pointer", width: "100%" }}
                    >
                      🗑️ Xác nhận xóa tin tức này
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: GOOGLE SEO */}
            {activeTab === "seo" && (() => {
              const analyzeSEO = () => {
                const results = [];
                const title = seoTitle || "";
                const desc = seoDesc || "";
                const slug = seoSlug || "";
                const kw = focusKeyword || "";
                
                if (kw) {
                  const hasKw = title.toLowerCase().includes(kw.toLowerCase());
                  results.push({
                    label: `Từ khóa trong Tiêu đề SEO`,
                    status: hasKw ? "green" : "red",
                    feedback: hasKw ? "Từ khóa chính xuất hiện ở tiêu đề!" : "Tiêu đề SEO không chứa từ khóa chính."
                  });
                }
                
                if (title.length === 0) {
                  results.push({ label: "Độ dài Tiêu đề SEO", status: "red", feedback: "Vui lòng nhập tiêu đề SEO!" });
                } else if (title.length >= 40 && title.length <= 60) {
                  results.push({ label: "Độ dài Tiêu đề SEO", status: "green", feedback: `Độ dài tốt! (${title.length} ký tự)` });
                } else if (title.length < 40) {
                  results.push({ label: "Độ dài Tiêu đề SEO", status: "yellow", feedback: `Tiêu đề quá ngắn (${title.length} ký tự, khuyến nghị 40-60).` });
                } else {
                  results.push({ label: "Độ dài Tiêu đề SEO", status: "red", feedback: `Tiêu đề quá dài (${title.length} ký tự, Google sẽ bị cắt bớt).` });
                }

                if (kw && slug) {
                  const cleanKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/\s+/g, "-");
                  const cleanSlug = slug.toLowerCase();
                  const hasKw = cleanSlug.includes(cleanKw);
                  results.push({
                    label: "Từ khóa chính trong Slug",
                    status: hasKw ? "green" : "yellow",
                    feedback: hasKw ? "Đường dẫn chứa từ khóa chính tối ưu!" : "Đường dẫn (slug) nên chứa từ khóa chính dạng không dấu."
                  });
                }

                if (desc.length === 0) {
                  results.push({ label: "Độ dài Thẻ mô tả (Meta Description)", status: "red", feedback: "Vui lòng nhập thẻ mô tả!" });
                } else if (desc.length >= 120 && desc.length <= 160) {
                  results.push({ label: "Độ dài Thẻ mô tả (Meta Description)", status: "green", feedback: `Độ dài tốt! (${desc.length} ký tự)` });
                } else if (desc.length < 120) {
                  results.push({ label: "Độ dài Thẻ mô tả (Meta Description)", status: "yellow", feedback: `Thẻ mô tả hơi ngắn (${desc.length} ký tự, khuyến nghị 120-160).` });
                } else {
                  results.push({ label: "Độ dài Thẻ mô tả (Meta Description)", status: "red", feedback: `Thẻ mô tả quá dài (${desc.length} ký tự, Google sẽ bị cắt bớt).` });
                }

                if (kw) {
                  const hasKw = desc.toLowerCase().includes(kw.toLowerCase());
                  results.push({
                    label: "Từ khóa chính trong Thẻ mô tả",
                    status: hasKw ? "green" : "red",
                    feedback: hasKw ? "Thẻ mô tả chứa từ khóa chính!" : "Thẻ mô tả không chứa từ khóa chính."
                  });
                }
                
                return results;
              };

              return (
                <form onSubmit={handleSaveSEO} className="admin-box">
                  {selectedSeoSection === "yoast" && (
                    <>
                      <h3>🔍 WordPress / Yoast SEO Snippet Editor</h3>
                      
                      <div className="form-group" style={{ marginBottom: 12 }}>
                        <label>Từ khóa chính (Focus Keyword)</label>
                        <input type="text" value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)} placeholder="VD: gối ôm" required />
                      </div>

                      <div className="form-group" style={{ marginBottom: 12 }}>
                        <label>Tiêu đề SEO (Title Tag)</label>
                        <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Tiêu đề hiển thị..." required />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                        <div className="form-group">
                          <label>Đường dẫn (Slug)</label>
                          <input type="text" value={seoSlug} onChange={(e) => setSeoSlug(e.target.value)} placeholder="VD: cua-hang-goi-om" required />
                        </div>
                        <div className="form-group">
                          <label>Từ khóa phụ (Keywords)</label>
                          <input type="text" value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} placeholder="Cú pháp: goi om, goi om 3d..." />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: 16 }}>
                        <label>Thẻ mô tả Meta (Meta Description)</label>
                        <textarea rows="3" value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} style={{ width: '100%', background: '#1e1a18', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '5px', fontSize: '13px', outline: 'none', fontFamily: 'var(--body)' }} placeholder="Tóm tắt mô tả..." required></textarea>
                      </div>

                      {/* Snippet Live Preview Box */}
                      <h4 style={{ margin: "16px 0 8px 0", color: "#ffea4b" }}>🖥️ Google Live Search Preview</h4>
                      <div style={{ background: "#fff", color: "#1a0dab", padding: "16px", borderRadius: "8px", border: "1px solid #ddd", width: "100%" }}>
                        <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid #f0f0f0", paddingBottom: "10px", marginBottom: "10px" }}>
                          <button 
                            type="button" 
                            onClick={() => setSeoPreviewMode("mobile")} 
                            style={{
                              padding: "4px 10px",
                              background: seoPreviewMode === "mobile" ? "#1a0dab" : "#f0f0f0",
                              color: seoPreviewMode === "mobile" ? "#fff" : "#333",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontWeight: "bold",
                              fontSize: "11px"
                            }}
                          >
                            📱 Mobile View
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setSeoPreviewMode("desktop")} 
                            style={{
                              padding: "4px 10px",
                              background: seoPreviewMode === "desktop" ? "#1a0dab" : "#f0f0f0",
                              color: seoPreviewMode === "desktop" ? "#fff" : "#333",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontWeight: "bold",
                              fontSize: "11px"
                            }}
                          >
                            💻 Desktop View
                          </button>
                        </div>
                        
                        <div style={{
                          maxWidth: seoPreviewMode === "mobile" ? "360px" : "100%",
                          background: "#fff",
                          padding: "10px",
                          border: "1px solid #eee",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                          fontFamily: "arial, sans-serif",
                          textAlign: "left"
                        }}>
                          <div style={{ fontSize: "12px", color: "#202124", marginBottom: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                            <span style={{ fontSize: "14px" }}>🌐</span>
                            <span>https://gpaw.vn › {seoSlug || "cua-hang"}</span>
                          </div>
                          <div style={{ 
                            fontSize: seoPreviewMode === "mobile" ? "18px" : "20px", 
                            color: "#1a0dab", 
                            lineHeight: 1.3, 
                            fontWeight: "medium",
                            marginBottom: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                          }}>
                            {seoTitle || "Vui lòng nhập tiêu đề SEO..."}
                          </div>
                          <div style={{ fontSize: "14px", color: "#4d5156", lineHeight: 1.5, wordBreak: "break-word" }}>
                            {seoDesc || "Vui lòng nhập thẻ mô tả meta description..."}
                          </div>
                        </div>
                      </div>

                      {/* Yoast scoring bullets */}
                      <h4 style={{ margin: "20px 0 8px 0", color: "#ffea4b" }}>🚦 Yoast SEO Analytics</h4>
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {analyzeSEO().map((item, idx) => {
                            const colorMap = { green: "#22c55e", yellow: "#eab308", red: "#ef4444" };
                            return (
                              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
                                <span style={{ 
                                  width: "12px", 
                                  height: "12px", 
                                  borderRadius: "50%", 
                                  background: colorMap[item.status], 
                                  display: "inline-block", 
                                  flexShrink: 0 
                                }}></span>
                                <span style={{ fontWeight: "bold", width: "200px", color: "#ccc" }}>{item.label}:</span>
                                <span style={{ color: "#fff" }}>{item.feedback}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedSeoSection === "keywords" && (
                    <>
                      <h3>🔍 Google SEO: Từ khóa Trang (Meta Keywords)</h3>
                      <div className="form-group">
                        <label>Các từ khóa SEO (Cách nhau bằng dấu phẩy)</label>
                        <input type="text" value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} />
                      </div>
                    </>
                  )}

                  {selectedSeoSection === "guide" && (
                    <>
                      <h3>🔍 Hướng dẫn tối ưu hóa Google SEO</h3>
                      <p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.8, margin: 0 }}>
                        - <b>Focus Keyword:</b> Nhập từ khóa chính để đánh giá (VD: "gối ôm").<br />
                        - <b>Title Tag:</b> Độ dài lý tưởng là 40-60 ký tự.<br />
                        - <b>Meta Description:</b> Trình bày tóm tắt thu hút, độ dài lý tưởng là 120-160 ký tự.<br />
                        - <b>Đường dẫn (Slug):</b> Chứa từ khóa không dấu, viết liền gạch ngang.
                      </p>
                    </>
                  )}

                  {selectedSeoSection !== "guide" && (
                    <button type="submit" className="admin-btn" style={{ marginTop: "20px" }}>💾 Lưu Cài Đặt Google SEO</button>
                  )}
                </form>
              );
            })()}

            {/* TAB CONTENT: VOUCHERS */}
            {activeTab === "vouchers" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
                
                {selectedVoucherCode === "new" ? (
                  <form onSubmit={handleSubmitVoucher} className="admin-box">
                    <h3>🎟️ Tạo Mã Voucher Khuyến Mại Mới</h3>
                    
                    <div className="form-group">
                      <label>Mã Voucher (In hoa, viết liền)</label>
                      <input type="text" placeholder="VD: GPAWNY2026" value={vCode} onChange={(e) => setVCode(e.target.value)} required />
                    </div>

                    <div className="form-group" style={{ marginTop: 10 }}>
                      <label>Mô tả hiển thị voucher</label>
                      <input type="text" placeholder="VD: Giảm 50k dịp tết dương lịch" value={vDesc} onChange={(e) => setVDesc(e.target.value)} required />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
                      <div className="form-group">
                        <label>Điểm quy đổi Paw yêu cầu</label>
                        <input type="number" placeholder="Nhập 0 nếu miễn phí cho khách" value={vCost} onChange={(e) => setVCost(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label>Giá trị giảm (Mô tả trị giá)</label>
                        <input type="text" placeholder="VD: -50.000₫ hoặc Giảm 10%" value={vVal} onChange={(e) => setVVal(e.target.value)} required />
                      </div>
                    </div>

                    <button type="submit" className="admin-btn" style={{ marginTop: 16 }}>🎟️ Tạo Mã & Phát Hành</button>
                  </form>
                ) : (
                  selectedVoucher && (
                    <div className="admin-box">
                      <h3>🎟️ Thông tin Voucher: {selectedVoucher.code}</h3>
                      <div style={{ background: "rgba(255,255,255,0.02)", padding: 14, borderRadius: 6, fontSize: 13, lineHeight: 1.6 }}>
                        <div>Mã code: <b style={{ color: "#ffea4b" }}>{selectedVoucher.code}</b></div>
                        <div>Mô tả: <b>{selectedVoucher.desc}</b></div>
                        <div>Yêu cầu đổi điểm: <b>{selectedVoucher.pointsCost} Paw</b></div>
                        <div>Giá trị quy đổi: <b>{selectedVoucher.valueDesc}</b></div>
                      </div>
                      
                      <button 
                        type="button" 
                        className="admin-btn" 
                        style={{ marginTop: 14, background: "#666", color: "#fff" }}
                        onClick={() => setSelectedVoucherCode("new")}
                      >
                        Tạo voucher khác
                      </button>
                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// Main Application wrapper with browser simulator and domain manager
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  const active = useActiveSection(["politics", "anime", "stars", "plush"]);
  const [currentDomain, setCurrentDomain] = useState(() => {
    const hostname = window.location.hostname;
    const searchParams = new URLSearchParams(window.location.search);
    if (hostname.includes("admin") || searchParams.has("admin") || window.location.hash.includes("admin")) {
      return "admin.gpaw.vn";
    }
    return "gpaw.vn";
  });
  
  // Simulated CMS/Site settings state with default values
  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem("gpaw_site_settings");
    const parsed = saved ? JSON.parse(saved) : {};
    return {
      seoTitle: "Gpaw · Bốn vũ trụ gối ôm",
      seoDesc: "Studio gối ôm 3D thủ công tại Sài Gòn. Bốn vũ trụ, một chiếc gối.",
      seoKeywords: "gối ôm, gpaw, gối ôm 3d, gối ôm thiết kế",
      introTitle: "Bốn vũ trụ. Một chiếc bàn.",
      introSub: "Chọn một cuốn tạp chí trên bàn để khám phá thế giới gối ôm.",
      politicsSlogan: "Chuyên san chính trị · Political Series",
      animeSlogan: "Hạng mục II · Chapter II",
      starsSlogan: "Ngôi sao của bạn, dưới dạng có thể ôm.",
      plushSlogan: "Không phải nhân vật — chỉ là người bạn nhỏ. ✿",
      footerAbout: "Studio gối ôm 3D thủ công tại Sài Gòn. Bốn vũ trụ, một chiếc gối.",
      coverPolitics: "assets/cover-politics.png",
      coverAnime: "assets/cover-anime.png",
      coverStars: "assets/cover-stars.png",
      coverPlush: "assets/cover-plush.png",
      contactPhone: "0901234567",
      zaloLink: "https://zalo.me/your_zalo_id",
      messengerLink: "https://m.me/your_messenger_id",
      brandName: "GPAW",
      newsList: [
        { date: "29/05/2026", category: "SỰ KIỆN", title: "KHAI TRƯƠNG SHOWROOM CHÍNH THỨC TẠI SÀI GÒN", summary: "Gpaw Atelier chính thức mở cửa không gian trưng bày đầu tiên tại Quận 1, giúp quý khách hàng trải nghiệm trực tiếp độ mềm mịn từ bông silicon cao cấp.", subCategory: "tina" },
        { date: "28/05/2026", category: "TIN TỨC", title: "RA MẮT CHÍNH THỨC BẢN THỬ MẪU GỐI ÔM DONALD TRUMP", summary: "Dòng gối châm biếm được vẽ tay tỉ mỉ đã hoàn thành mẫu thử nghiệm, chính thức mở cổng đặt trước số lượng giới hạn cho fan sưu tập.", subCategory: "tina" }
      ],
      commit1Title: "Cotton lụa kháng khuẩn",
      commit1Desc: "Mát mịn, khóa kéo ẩn an toàn",
      commit2Title: "Bảo hành bông 4 năm",
      commit2Desc: "Chống xẹp phom co rúm",
      commit3Title: "Đổi trả 7 ngày",
      commit3Desc: "Miễn phí nếu phát sinh lỗi vải",
      sizeGuideTip: "💡 Gợi ý: Gối 80cm gọn nhẹ thích hợp tựa lưng, gác chân. Bản 120cm và 150cm dài chuẩn ôm toàn thân thoải mái.",
      detailMaterialTitle: "Chất liệu & Gia công thủ công tại Sài Gòn",
      detailMaterialDesc: "Mọi chiếc gối ôm Gpaw được vẽ tay chi tiết, in kỹ thuật số 3D chống phai trực tiếp lên sợi vải mát lạnh kháng khuẩn. Ruột gối lót chống thoát bông chứa đầy hạt bông silicon 3D cao cấp tạo đàn hồi căng đầy tự nhiên, sản xuất độc quyền tại Việt Nam.",
      careTitle: "Hướng dẫn vệ sinh gối định kỳ giúp phom gối luôn phồng mịn, chống bám bụi:",
      careStep1: "Giặt vỏ gối: Hãy lột vỏ gối giặt bằng máy chế độ nhẹ, nhiệt độ nước dưới 30°C. Nên lộn mặt trái gối trước khi giặt.",
      careStep2: "Phơi khô: Không giặt khô vỏ gối, phơi vỏ gối ở bóng mát có gió lùa rộng rãi, không dùng bàn là trực tiếp lên hình in.",
      careStep3: "Vệ sinh bông ruột: Tránh nhúng ướt ruột bông. Chỉ cần đem phơi ruột gối dưới nắng nhẹ 2-3 giờ mỗi tháng để bông tơi xốp tự nhiên.",
      policyTitle1: "🛡️ Chính sách bảo hành xẹp bông 4 năm",
      policyDesc1: "Gpaw Atelier cam kết bảo hành xẹp lún ruột bông trong vòng 4 năm. Nếu ruột gối của bạn bị xẹp xẹp trên 20% so với phom phồng ban đầu, chúng tôi hỗ trợ nhồi bù bông microfiber hoặc đổi ruột mới hoàn toàn miễn phí tại showroom.",
      policyTitle2: "🚚 Free ship đơn hàng từ 2 gối",
      policyDesc2: "Miễn phí vận chuyển toàn quốc cho tất cả các đơn hàng mua từ 2 sản phẩm gối ôm trở lên. Đơn 1 gối áp dụng phí giao hàng toàn quốc 30.000₫.",
      policyTitle3: "🔄 Đổi trả lỗi trong 7 ngày",
      policyDesc3: "Khách hàng được đổi trả sản phẩm mới miễn phí trong vòng 7 ngày kể từ lúc nhận hàng nếu có lỗi từ nhà sản xuất (rách chỉ, hư dây kéo, sai mẫu mã).",
      ...parsed
    };
  });

  useEffect(() => {
    localStorage.setItem("gpaw_site_settings", JSON.stringify(siteSettings));
  }, [siteSettings]);
  
  // Simulated Catalog State
  const [catalog, setCatalog] = useState(() => {
    const saved = localStorage.getItem("gpaw_catalog");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length < 20 || !parsed.some(p => p.hasOwnProperty("headline"))) {
          const merged = PRODUCT_CATALOG.map(defaultProd => {
            const existing = parsed.find(ep => ep.id === defaultProd.id);
            if (existing) {
              return { ...defaultProd, ...existing, headline: existing.headline || defaultProd.headline };
            }
            return defaultProd;
          });
          localStorage.setItem("gpaw_catalog", JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch (e) {
        return PRODUCT_CATALOG;
      }
    }
    return PRODUCT_CATALOG;
  });

  // URL routing for multi-page details page
  const getActiveProductFromUrl = (currentCatalog) => {
    const path = decodeURIComponent(window.location.pathname).toLowerCase();
    if (path.includes("trump") || path.includes("donald-trump")) return currentCatalog.find(p => p.id === "p001");
    if (path.includes("senpai") || path.includes("senpai-school")) return currentCatalog.find(p => p.id === "a001");
    if (path.includes("diva") || path.includes("diva-san-khau")) return currentCatalog.find(p => p.id === "s001");
    if (path.includes("mochi") || path.includes("gau-mochi")) return currentCatalog.find(p => p.id === "pl001");
    return null;
  };

  // Simulated Databases State with localStorage persistence
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem("gpaw_customers");
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("gpaw_orders");
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [vouchers, setVouchers] = useState(() => {
    const saved = localStorage.getItem("gpaw_vouchers");
    return saved ? JSON.parse(saved) : INITIAL_VOUCHERS;
  });
  
  // Auth state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("gpaw_current_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [authModal, setAuthModal] = useState(null); // 'login' | 'register' | null
  const [voucherCenter, setVoucherCenter] = useState(false);
  
  // Input fields for modals
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  // Mock Email Notifications State
  const [mockMail, setMockMail] = useState(null); // { to: string, activationLink: string }

  // Checkout & Product Detail states
  const [selectedProduct, setSelectedProduct] = useState(() => getActiveProductFromUrl(catalog));
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [orderResult, setOrderResult] = useState(null);
  const [activePaymentOrder, setActivePaymentOrder] = useState(null);
  const [showFreeshipToast, setShowFreeshipToast] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem("gpaw_catalog", JSON.stringify(catalog));
  }, [catalog]);

  useEffect(() => {
    if (selectedProduct) {
      const currentProd = catalog.find(p => p.id === selectedProduct.id);
      if (currentProd) {
        document.title = `Gpaw · ${currentProd.name}`;
      }
    } else {
      document.title = siteSettings.seoTitle || "Gpaw · Bốn vũ trụ gối ôm";
    }

    // Dynamic Google SEO tags insertion/updating
    try {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = siteSettings.seoDesc || "Studio gối ôm 3D thủ công tại Sài Gòn.";

      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = siteSettings.seoKeywords || "gối ôm, gpaw";
    } catch(e) {
      console.error("SEO update error", e);
    }

    // Dynamic Theme Color accent override
    try {
      const themeCol = siteSettings.themeColor || "#b3242d";
      let styleTag = document.getElementById("gpaw-dynamic-theme");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "gpaw-dynamic-theme";
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = `
        :root {
          --theme-color-dyn: ${themeCol};
        }
        /* Dynamic overrides of brand color #b3242d */
        .topnav .logo::before, .topnav .logo::after { color: var(--theme-color-dyn) !important; }
        .paper-masthead .title em { color: var(--theme-color-dyn) !important; }
        .feat-flip .tag.red { background: var(--theme-color-dyn) !important; }
        .feat-flip .frame { border-color: var(--theme-color-dyn) !important; }
        .feat-flip .frame:hover { box-shadow: 0 0 15px var(--theme-color-dyn) !important; }
        .feat-flip .cap-row .price b { color: var(--theme-color-dyn) !important; }
        .thumb.active .t-name { color: var(--theme-color-dyn) !important; }
        .t-progress { background: var(--theme-color-dyn) !important; }
        .paper-news-section h4 { color: var(--theme-color-dyn) !important; }
        .btn-buy-now, .btn-place-order, .btn-track { background: linear-gradient(135deg, var(--theme-color-dyn), var(--theme-color-dyn)) !important; }
        .price-display .sale-price { color: var(--theme-color-dyn) !important; }
        .size-btn.active { border-color: var(--theme-color-dyn) !important; background: var(--theme-color-dyn) !important; }
        .size-btn:hover { border-color: var(--theme-color-dyn) !important; color: var(--theme-color-dyn) !important; }
        .qty-control button:hover { background: var(--theme-color-dyn) !important; }
        .success-popup h3, .success-popup .order-code { color: var(--theme-color-dyn) !important; }
        .paw-reward-box .reward-total { color: var(--theme-color-dyn) !important; }
        .modal-content input:focus { border-color: var(--theme-color-dyn) !important; }
        .modal-content .modal-btn:hover { background: var(--theme-color-dyn) !important; }
        .modal-content .toggle-link span { color: var(--theme-color-dyn) !important; }
        .email-toast .toast-hd b { color: var(--theme-color-dyn) !important; }
        .email-toast .claim-btn { background: var(--theme-color-dyn) !important; }
        .user-widget .logout-btn:hover { color: var(--theme-color-dyn) !important; }
        .voucher-card .v-info h4 { color: var(--theme-color-dyn) !important; }
        .voucher-card .claim-btn:hover { background: var(--theme-color-dyn) !important; }
        .complaint-form input:focus, .complaint-form textarea:focus { border-color: var(--theme-color-dyn) !important; }
        .complaint-form .file-upload:hover { border-color: var(--theme-color-dyn) !important; }
        .complaint-form .submit-btn:hover { box-shadow: 5px 5px 0 var(--theme-color-dyn) !important; }
        .order-item-card .order-id { color: var(--theme-color-dyn) !important; }
      `;
    } catch(e) {
      console.error("Theme color update error", e);
    }
  }, [selectedProduct, catalog, siteSettings]);

  useEffect(() => {
    localStorage.setItem("gpaw_customers", JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem("gpaw_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("gpaw_vouchers", JSON.stringify(vouchers));
  }, [vouchers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("gpaw_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("gpaw_current_user");
    }
  }, [currentUser]);

  const handleBuyNow = (item) => {
    if (!currentUser) {
      alert("Vui lòng đăng nhập hoặc đăng ký tài khoản thành viên bằng Số điện thoại để tiếp tục đặt hàng và tích lũy điểm thưởng!");
      setAuthModal("login");
      return;
    }
    setCheckoutItem(item);
    setSelectedProduct(null); // close detail
  };

  const handleAddToCart = (item) => {
    // Alert is handled inside ProductDetail component
  };

  const handlePlaceOrder = async (orderData) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Giao dịch qua API thất bại.');
      }

      // Convert order ID returned from serverless (could be PAN-XXXX or dynamic)
      const finalOrderId = result.orderId;
      const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
      
      const newOrder = {
        id: finalOrderId,
        customerEmail: currentUser ? currentUser.email : "guest@gpaw.vn",
        customerName: currentUser ? currentUser.name : "Khách vãng lai",
        datetime: dateStr,
        details: `${orderData.product.name} (${orderData.size.label}) × ${orderData.qty}`,
        value: fmtPrice(orderData.total),
        tier: currentUser ? currentUser.tier : "Đồng",
        status: "Processing"
      };

      setOrders((prev) => [newOrder, ...prev]);

      const basePawReward = Math.ceil(orderData.total / 100000);
      const bonusPawReward = orderData.payMethod === "transfer" ? 10 : 0;
      const totalPawReward = basePawReward + bonusPawReward;

      if (currentUser) {
        const netPointsChange = totalPawReward - orderData.pawUsed;
        const updatedPoints = Math.max(0, currentUser.points + netPointsChange);
        
        setCustomers((prev) =>
          prev.map((c) => {
            if (c.id === currentUser.id) {
              return { ...c, points: updatedPoints };
            }
            return c;
          })
        );
        setCurrentUser((prev) => ({ ...prev, points: updatedPoints }));
      }

      if (orderData.payMethod === "transfer") {
        setActivePaymentOrder({
          orderId: finalOrderId.toString().startsWith('PAN') ? finalOrderId : `ORD${finalOrderId}`,
          total: orderData.total,
          pawReward: totalPawReward
        });
      } else {
        setOrderResult({
          orderId: finalOrderId.toString().startsWith('PAN') ? finalOrderId : `ORD${finalOrderId}`,
          total: orderData.total,
          payMethod: orderData.payMethod,
          pawReward: totalPawReward
        });
      }

      setCheckoutItem(null);

      if (window.gpawPing) {
        window.gpawPing(1000, 150);
        setTimeout(() => { if (window.gpawPing) window.gpawPing(1300, 250); }, 150);
      }
      
      return { success: true };
    } catch (err) {
      console.error("Lỗi gửi đơn hàng:", err);
      alert(`Đã xảy ra lỗi khi tạo đơn hàng: ${err.message}. Vui lòng thử lại!`);
      return { success: false, error: err.message };
    }
  };

  const handlePaymentSuccess = (mode) => {
    alert(mode === "simulation" ? "Mô phỏng thanh toán thành công!" : "Xác nhận chuyển khoản thành công!");
    
    // Update local order status
    setOrders(prev => prev.map(o => {
      if (o.id === activePaymentOrder.orderId) {
        return { ...o, status: "Paid" };
      }
      return o;
    }));

    // Trigger success popup
    setOrderResult({
      orderId: activePaymentOrder.orderId,
      total: activePaymentOrder.total,
      payMethod: "transfer",
      pawReward: activePaymentOrder.pawReward
    });

    setActivePaymentOrder(null);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const isNewCustomer = !currentUser || orders.filter(o => o.customerEmail === currentUser.email).length === 0;
      if (isNewCustomer) {
        setShowFreeshipToast(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentUser, orders]);

  // Auth Functions
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!phoneInput || !passwordInput || !nameInput) {
      alert("Vui lòng nhập đầy đủ thông tin (Họ tên, Số điện thoại, Mật khẩu)!");
      return;
    }
    
    // Validate phone number format (Vietnam phone number regex)
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(phoneInput)) {
      alert("Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại Việt Nam hợp lệ (ví dụ: 0901234567).");
      return;
    }

    const finalEmail = emailInput || `${phoneInput}@gpaw.vn`;

    // Check if user already exists
    if (customers.find((c) => c.email === finalEmail || c.phone === phoneInput)) {
      alert("Số điện thoại này đã được sử dụng để đăng ký!");
      return;
    }

    // Add new customer with Active status directly since email is optional
    const newCustomer = {
      id: customers.length + 1,
      email: finalEmail,
      phone: phoneInput,
      name: nameInput,
      points: 100, // Initial greeting reward!
      tier: "Đồng",
      status: "Active",
      dateJoined: new Date().toISOString().split("T")[0]
    };

    setCustomers((prev) => [...prev, newCustomer]);
    
    // Auto login
    setCurrentUser(newCustomer);
    alert(`Đăng ký thành viên thành công! Bạn nhận được 100 Paw chào mừng!`);

    setAuthModal(null);
    setEmailInput("");
    setPhoneInput("");
    setPasswordInput("");
    setNameInput("");
  };

  const handleVerifyAccount = (code) => {
    const customerId = Number(code.split("_")[1]);
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customerId) {
          return { ...c, status: "Active" };
        }
        return c;
      })
    );
    
    // Auto-login the verified customer
    const user = customers.find((c) => c.id === customerId);
    if (user) {
      const activeUser = { ...user, status: "Active" };
      setCurrentUser(activeUser);
      alert(`Xác thực tài khoản thành công! Tặng bạn 100 Paw chào mừng!`);
    }
    
    setMockMail(null);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const user = customers.find(
      (c) => (c.email === emailInput || c.phone === emailInput)
    );

    if (!user) {
      alert("Tài khoản không tồn tại!");
      return;
    }

    if (user.status === "Pending") {
      alert("Tài khoản của bạn chưa được kích hoạt. Vui lòng nhấn vào liên kết xác nhận trong email kích hoạt!");
      return;
    }

    // Success login
    setCurrentUser(user);
    setAuthModal(null);
    setEmailInput("");
    setPasswordInput("");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setVoucherCenter(false);
  };

  // Claim voucher logic
  const handleClaimVoucher = (voucher) => {
    if (!currentUser) return;
    if (currentUser.points < voucher.pointsCost) {
      alert("Bạn không đủ Paw để đổi voucher này!");
      return;
    }

    // Deduct points
    const updatedPoints = currentUser.points - voucher.pointsCost;
    
    // Update customer db
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === currentUser.id) {
          return { ...c, points: updatedPoints };
        }
        return c;
      })
    );

    // Update current user state
    setCurrentUser((prev) => ({ ...prev, points: updatedPoints }));
    alert(`Đổi thành công mã voucher: ${voucher.code}! Vui lòng sao chép mã này để áp dụng khi mua hàng.`);
  };

  const handleCreateVoucher = (newVoucher) => {
    setVouchers((prev) => [...prev, newVoucher]);
  };

  // smooth-scroll for in-page anchors
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = "auto"; };
  }, []);

  return (
    <>
      {/* Dynamic Style Overrides to remove browser simulator bar spacing and style news/footers */}
      <style>{`
        body { padding-top: 0 !important; }
        .topnav { top: 0 !important; }
        
        /* Anime Universe news/footer overrides */
        .w-anime .paper-news-section { border-color: #000; }
        .w-anime .paper-news-section h4 { color: #ff3a78; font-family: "Bagel Fat One", sans-serif; font-size: 15px; }
        .w-anime .news-item { border-color: #000; }
        .w-anime .news-item h5 { color: #000; font-family: "Be Vietnam Pro", sans-serif; font-weight: 800; }
        .w-anime .news-item p { color: #333; }
        .w-anime .paper-foot { border-color: #000; }
        .w-anime .paper-foot .col h5 { color: #ff3a78; font-family: "Bagel Fat One", sans-serif; font-size: 12px; }
        .w-anime .paper-foot .col p { color: #000; }
        .w-anime .paper-foot .col p:first-of-type::first-letter { color: #ff4c94; font-family: "Bagel Fat One", sans-serif; }

        /* Stars Universe overrides (Premium Glossy Dark theme) */
        .w-stars .paper-news-section,
        .w-stars .paper-foot {
          grid-column: 1 / -1;
          width: 100%;
        }
        .w-stars .paper-news-section {
          border-color: rgba(255,255,255,0.15);
          margin-top: 50px;
          padding-top: 30px;
          border-top: 1px solid rgba(255,255,255,0.15);
          border-bottom: 1px solid rgba(255,255,255,0.15);
        }
        .w-stars .paper-news-section h4 { color: #ffd34d !important; font-family: "Bodoni Moda", "Playfair Display", serif; font-style: italic; font-size: 18px; letter-spacing: 0.15em; font-weight: 700; }
        .w-stars .news-item { border-color: #ff3eb8; }
        .w-stars .news-item h5 { color: #fff; font-family: "Bodoni Moda", "Playfair Display", serif; font-weight: 600; font-style: italic; font-size: 17px; }
        .w-stars .news-item p { color: rgba(255,255,255,0.7); }
        .w-stars .paper-foot { border-color: rgba(255,255,255,0.15); margin-top: 30px; padding-top: 20px; }
        .w-stars .paper-foot .col h5 { color: #ff3eb8; font-family: "Bodoni Moda", "Playfair Display", serif; font-weight: 600; letter-spacing: 0.15em; font-size: 13px; text-transform: uppercase; }
        .w-stars .paper-foot .col p { color: rgba(255,255,255,0.8); font-family: var(--display); font-weight: 300; font-size: 14.5px; line-height: 1.6; text-align: justify; }
        .w-stars .paper-foot .col p:first-of-type::first-letter { color: #ffd34d; font-family: "Bodoni Moda", "Playfair Display", serif; font-weight: 700; font-style: italic; font-size: 46px; }

        /* Plush Universe overrides */
        .w-plush .paper-news-section { border-color: #ff9eb1; }
        .w-plush .paper-news-section h4 { color: #a85e72; font-family: "Lora", serif; font-size: 16px; }
        .w-plush .news-item { border-color: #ff9eb1; }
        .w-plush .news-item h5 { color: #2a1c14; font-family: "Lora", serif; font-weight: 700; }
        .w-plush .news-item p { color: #4a3c34; }
        .w-plush .paper-foot { border-color: #ff9eb1; }
        .w-plush .paper-foot .col h5 { color: #a85e72; font-family: "Lora", serif; font-size: 12px; }
        .w-plush .paper-foot .col p { color: #2a1c14; }
        .w-plush .paper-foot .col p:first-of-type::first-letter { color: #ff9eb1; font-family: "Lora", serif; }
      `}</style>

      {/* ────────────────── App Domains rendering ────────────────── */}
      {currentDomain === "gpaw.vn" ? (
        <>
          <TopNav
            activeTheme={active || "politics"}
            currentUser={currentUser}
            onOpenAuth={setAuthModal}
            onLogout={handleLogout}
            onOpenVouchers={() => setVoucherCenter(true)}
            siteSettings={siteSettings}
            onNavClick={(id) => {
              const isHomepage = !selectedProduct;
              if (isHomepage) {
                if (id) {
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              } else {
                if (id) {
                  window.location.href = "index.html#" + id;
                } else {
                  window.location.href = "index.html";
                }
              }
            }}
          />
          {selectedProduct ? (
            <ProductDetailPage
              catalog={catalog}
              product={catalog.find(p => p.id === selectedProduct.id) || selectedProduct}
              onBuyNow={handleBuyNow}
              onAddToCart={handleAddToCart}
              siteSettings={siteSettings}
            />
          ) : (
            <>
              <Politics catalog={catalog} onSelectProduct={setSelectedProduct} onOpenAuth={setAuthModal} siteSettings={siteSettings} />
              <Anime catalog={catalog} onSelectProduct={setSelectedProduct} siteSettings={siteSettings} />
              <Stars catalog={catalog} onSelectProduct={setSelectedProduct} siteSettings={siteSettings} />
              <Plush catalog={catalog} onSelectProduct={setSelectedProduct} siteSettings={siteSettings} />
            </>
          )}
          <Complaint />
          <FloatContact siteSettings={siteSettings} />
          <Footer siteSettings={siteSettings} />

          {checkoutItem && (
            <CheckoutForm
              item={checkoutItem}
              currentUser={currentUser}
              vouchers={vouchers}
              onClose={() => setCheckoutItem(null)}
              onPlaceOrder={handlePlaceOrder}
            />
          )}

          {activePaymentOrder && (
            <PaymentQRForm
              activePaymentOrder={activePaymentOrder}
              siteSettings={siteSettings}
              onPaymentSuccess={handlePaymentSuccess}
              onClose={() => setActivePaymentOrder(null)}
            />
          )}

          {orderResult && (
            <OrderSuccessPopup
              orderResult={orderResult}
              onContinue={() => {
                setOrderResult(null);
                const path = decodeURIComponent(window.location.pathname).toLowerCase();
                if (
                  path.includes("trump") || path.includes("donald-trump") ||
                  path.includes("senpai") || path.includes("senpai-school") ||
                  path.includes("diva") || path.includes("diva-san-khau") ||
                  path.includes("mochi") || path.includes("gau-mochi")
                ) {
                  window.location.href = "index.html";
                }
              }}
              onTrackOrders={() => {
                setOrderResult(null);
                if (currentUser) {
                  setAuthModal("orders");
                } else {
                  setAuthModal("login");
                }
              }}
            />
          )}

          {showFreeshipToast && (
            <FreeshipToast
              onDismiss={() => setShowFreeshipToast(false)}
              onApply={() => {
                navigator.clipboard.writeText("FREESHIP");
                alert("Đã sao chép mã FREESHIP! Hãy dán mã này ở bước thanh toán.");
                setShowFreeshipToast(false);
              }}
            />
          )}
        </>
      ) : (
        <AdminPanel
          customers={customers}
          onUpdateCustomers={setCustomers}
          orders={orders}
          onUpdateOrders={setOrders}
          vouchers={vouchers}
          onCreateVoucher={handleCreateVoucher}
          catalog={catalog}
          onUpdateCatalog={setCatalog}
          siteSettings={siteSettings}
          onUpdateSiteSettings={setSiteSettings}
        />
      )}

      {/* ────────────────── Authentication Modal / Account Portal (Login / Register / My Orders) ────────────────── */}
      {authModal && (
        <div className="modal-overlay" onClick={() => setAuthModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={currentUser ? { maxWidth: "550px" } : {}}>
            <button className="modal-close" onClick={() => setAuthModal(null)}>✕</button>
            
            {currentUser ? (
              <>
                <div className="auth-nav-tabs">
                  <div className={`auth-nav-tab ${authModal === "orders" ? "active" : ""}`} onClick={() => setAuthModal("orders")}>
                    Đơn hàng của tôi
                  </div>
                  <div className={`auth-nav-tab ${authModal === "profile" ? "active" : ""}`} onClick={() => setAuthModal("profile")}>
                    Thông tin tài khoản
                  </div>
                </div>

                {authModal === "orders" ? (
                  <>
                    <h3 style={{ textAlign: "left", fontSize: "20px", marginBottom: "8px" }}>📦 Quản Lý Đơn Hàng</h3>
                    <p style={{ fontSize: "12px", color: "#666", fontWeight: "600", marginBottom: "16px" }}>
                      Thông tin trạng thái đơn hàng được đồng bộ tự động thời gian thực với GHTK / GHN / Viettel Post.
                    </p>
                    <div className="orders-list">
                      {orders.filter(o => o.customerEmail === currentUser.email).length === 0 ? (
                        <div style={{ textAlign: "center", padding: "30px", color: "#888", fontWeight: "700" }}>
                          Bạn chưa có đơn hàng nào tại Gpaw!
                        </div>
                      ) : (
                        orders.filter(o => o.customerEmail === currentUser.email).map((o) => (
                          <div className="order-item-card" key={o.id}>
                            <div className="order-header">
                              <span className="order-id">Đơn hàng #ORD{o.id}</span>
                              <span className="order-date">{o.datetime}</span>
                            </div>
                            <div className="order-details">{o.details}</div>
                            <div className="order-price-row">
                              <span className="order-price">Tổng thanh toán: <b>{o.value}</b></span>
                              <span className="shipping-sync-badge">
                                ⚡ Đồng bộ GHTK
                              </span>
                            </div>
                            
                            {/* Trackings simulated timeline */}
                            <div className="tracking-timeline">
                              <div className="timeline-step active">
                                <div className="step-time">2026-05-29 08:30</div>
                                <div className="step-title">Đã giao hàng thành công</div>
                                <div className="step-desc">Đơn hàng đã được giao bởi shipper Nguyễn Văn A.</div>
                              </div>
                              <div className="timeline-step active">
                                <div className="step-time">2026-05-28 14:15</div>
                                <div className="step-title">Đang trung chuyển qua bưu cục</div>
                                <div className="step-desc">Đơn hàng đã rời kho trung chuyển bưu cục quận 1, TP. HCM.</div>
                              </div>
                              <div className="timeline-step active">
                                <div className="step-time">2026-05-28 09:00</div>
                                <div className="step-title">Đã lấy hàng thành công</div>
                                <div className="step-desc">Đơn vị vận chuyển đã tiếp nhận kiện hàng từ Gpaw Atelier.</div>
                              </div>
                              <div className="timeline-step active">
                                <div className="step-time">2026-05-28 07:15</div>
                                <div className="step-title">Đang chuẩn bị đóng gói</div>
                                <div className="step-desc">Đơn hàng đã được chuẩn bị thành công tại xưởng gối.</div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div style={{ padding: "10px 0" }}>
                    <h3>Tài khoản của {currentUser.name}</h3>
                    <div style={{ background: "#fff", border: "2px solid #16213a", padding: "15px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", color: "#16213a" }}>
                      <p style={{ margin: "0 0 10px" }}>📧 Email: {currentUser.email}</p>
                      <p style={{ margin: "0 0 10px" }}>📞 Số điện thoại: {currentUser.phone}</p>
                      <p style={{ margin: "0 0 10px" }}>🏅 Hạng thành viên: <span className="tier-badge gold">{currentUser.tier}</span></p>
                      <p style={{ margin: 0 }}>🐾 Số dư Paw tích lũy: <b style={{ color: "#b3242d" }}>{currentUser.points} Paw</b></p>
                    </div>
                  </div>
                )}
              </>
            ) : authModal === "login" ? (
              <>
                <h3>Đăng Nhập Gpaw</h3>
                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                    <label>Email hoặc Số điện thoại</label>
                    <input
                      type="text"
                      placeholder="Nhập email hoặc số điện thoại..."
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="modal-btn">Đăng Nhập</button>
                </form>
                <div className="toggle-link">
                  Chưa có tài khoản?{" "}
                  <span onClick={() => { setAuthModal("register"); setEmailInput(""); setPasswordInput(""); }}>Đăng ký ngay</span>
                </div>
              </>
            ) : (
              <>
                <h3>Đăng Ký Gpaw</h3>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="form-group">
                    <label>Tên khách hàng</label>
                    <input
                      type="text"
                      placeholder="Nhập họ và tên..."
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email (Không bắt buộc)</label>
                    <input
                      type="email"
                      placeholder="yourname@gmail.com (Không bắt buộc)"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                      type="text"
                      placeholder="VD: 0901234567"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                      type="password"
                      placeholder="Tối thiểu 6 ký tự..."
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="modal-btn">Đăng Ký Thành Viên</button>
                </form>
                <div className="toggle-link">
                  Đã có tài khoản?{" "}
                  <span onClick={() => { setAuthModal("login"); setEmailInput(""); setPasswordInput(""); }}>Đăng nhập</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ────────────────── Virtual Verification Email Toast Notification ────────────────── */}
      {mockMail && (
        <div className="email-toast">
          <div className="toast-hd">
            <b>📧 Thư Kích Hoạt Tài Khoản</b>
            <button className="close" onClick={() => setMockMail(null)}>✕</button>
          </div>
          <div className="toast-body">
            <p>
              Gửi tới: <b>{mockMail.to}</b><br />
              Chào mừng thành viên <b>{mockMail.name}</b>! Hãy nhấn vào nút bên dưới để hoàn tất việc xác thực và kích hoạt tài khoản của bạn.
            </p>
            <button
              className="verify-link"
              onClick={() => handleVerifyAccount(mockMail.activationCode)}
            >
              Kích Hoạt Tài Khoản Gpaw
            </button>
          </div>
        </div>
      )}

      {/* ────────────────── Voucher Center Modal ────────────────── */}
      {voucherCenter && currentUser && (
        <div className="modal-overlay" onClick={() => setVoucherCenter(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setVoucherCenter(false)}>✕</button>
            <h3>Trung Tâm Voucher</h3>
            
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", fontWeight: "800", color: "#16213a", textTransform: "uppercase", fontFamily: "var(--mono)", letterSpacing: "0.12em" }}>Số dư Paw tích lũy</div>
              <div style={{ fontSize: "40px", fontWeight: "900", color: "#b3242d", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", margin: "8px 0" }}>
                <PawIcon size={36} color="#b3242d" /> {currentUser.points}
              </div>
              <div style={{ fontSize: "13px", fontWeight: "900", color: "#16213a", marginBottom: "2px" }}>Paw</div>
              <div style={{ fontSize: "12px", color: "#c19a4b", fontWeight: "800", marginTop: "4px" }}>Hạng thành viên: {currentUser.tier}</div>
            </div>

            <label style={{ fontFamily: "var(--mono)", fontSize: "11px", fontWeight: "800", color: "#16213a", display: "block", marginBottom: "6px", letterSpacing: "0.1em" }}>Vouchers đổi thưởng</label>
            <div className="voucher-grid">
              {vouchers.map((v) => {
                const canClaim = currentUser.points >= v.pointsCost;
                return (
                  <div className="voucher-card" key={v.code}>
                    <div className="v-info">
                      <h4>{v.code}</h4>
                      <p>{v.desc}</p>
                      <span className="req-points" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: "900" }}>
                        <PawIcon size={14} color="#b3242d" /> Yêu cầu: {v.pointsCost} Paw
                      </span>
                    </div>
                    <div>
                      <button
                        className={"claim-btn" + (!canClaim ? " disabled" : "")}
                        onClick={() => handleClaimVoucher(v)}
                        disabled={!canClaim}
                      >
                        {v.pointsCost === 0 ? "Nhận" : "Đổi"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VietQR Payment and Polling Modal
// ─────────────────────────────────────────────────────────────────────────────
function PaymentQRForm({ activePaymentOrder, siteSettings, onPaymentSuccess, onClose }) {
  const [checking, setChecking] = React.useState(false);
  const [secondsLeft, setSecondsLeft] = React.useState(120); // 2 minutes visual countdown
  const [isSim, setIsSim] = React.useState(false);

  const bankId = siteSettings.bankId || "MBBank";
  const bankAccount = siteSettings.bankAccount || "1636058622";
  const bankAccountName = siteSettings.bankAccountName || "CONG TY GPAW ATELIER";
  const cassoKey = siteSettings.cassoKey || "";

  // Dynamic VietQR code generation
  // Content format: GPAW <orderId without dashes>
  const cleanId = activePaymentOrder.orderId.replace(/[^a-zA-Z0-9]/g, "");
  const addInfo = `GPAW ${cleanId}`;
  const qrUrl = `https://img.vietqr.io/image/${bankId}-${bankAccount}-compact.png?amount=${activePaymentOrder.total}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(bankAccountName)}`;

  React.useEffect(() => {
    let intervalId;
    let countdownId;

    // Polling function
    const checkPayment = async () => {
      setChecking(true);
      try {
        const url = `/api/payment-check?orderId=${activePaymentOrder.orderId}&amount=${activePaymentOrder.total}&cassoKey=${encodeURIComponent(cassoKey)}`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.success) {
          setIsSim(data.mode === "simulation");
          if (data.paid) {
            clearInterval(intervalId);
            clearInterval(countdownId);
            onPaymentSuccess(data.mode);
          }
        }
      } catch (err) {
        console.error("Lỗi kiểm tra chuyển khoản:", err);
      } finally {
        setChecking(false);
      }
    };

    // Countdown timer
    countdownId = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          return 120; // reset
        }
        return prev - 1;
      });
    }, 1000);

    // Poll casso API every 4 seconds
    intervalId = setInterval(checkPayment, 4000);
    checkPayment(); // run once immediately

    return () => {
      clearInterval(intervalId);
      clearInterval(countdownId);
    };
  }, [activePaymentOrder, cassoKey]);

  const handleSimulateSuccess = async () => {
    try {
      const url = `/api/payment-check?orderId=${activePaymentOrder.orderId}&amount=${activePaymentOrder.total}&simulate=success`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.paid) {
        onPaymentSuccess("simulation");
      }
    } catch (err) {
      alert("Lỗi giả lập thanh toán: " + err.message);
    }
  };

  return (
    <div className="payment-qr-overlay" onClick={onClose}>
      <style>{`
        .payment-qr-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.75);
          backdrop-filter: blur(6px); z-index: 2800;
          display: flex; align-items: center; justify-content: center;
        }
        .payment-qr-modal {
          background: #faf7f2; border: 2.5px solid #16213a;
          border-radius: 12px; width: 100%; max-width: 450px;
          padding: 24px; box-shadow: 8px 8px 0 #16213a;
          position: relative; text-align: center;
          color: #16213a;
        }
        .payment-qr-modal h3 {
          font-family: var(--display-serif); font-size: 22px; font-weight: 800;
          color: #16213a; margin-top: 0; margin-bottom: 8px;
        }
        .qr-img-wrapper {
          background: #fff; border: 1.5px solid #16213a;
          padding: 12px; margin: 16px auto; width: 220px; height: 220px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 4px 4px 0 rgba(0,0,0,0.08);
        }
        .qr-img-wrapper img { width: 100%; height: 100%; object-fit: contain; }
        .payment-details {
          background: #fff; border: 1px solid rgba(22,33,58,0.12);
          padding: 12px 16px; border-radius: 8px; margin-bottom: 16px;
          text-align: left; font-size: 13px; color: #16213a;
        }
        .payment-details p { margin: 6px 0; display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(0,0,0,0.05); padding-bottom: 4px; }
        .payment-details p:last-child { border-bottom: none; }
        .payment-details b { color: #b3242d; }
        .polling-status {
          font-family: var(--mono); font-size: 11px; color: #666;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-bottom: 16px;
        }
        .payment-close-btn {
          background: transparent; border: 1px solid #16213a;
          color: #16213a; padding: 8px 16px; border-radius: 6px;
          cursor: pointer; font-family: var(--mono); font-size: 11px;
          text-transform: uppercase; font-weight: 600;
          margin-top: 10px; width: 100%;
        }
        .payment-close-btn:hover { background: rgba(0,0,0,0.04); }
        .simulate-pay-btn {
          background: #27c93f; color: #fff; border: 1px solid #1b9e2f;
          padding: 8px 16px; border-radius: 6px; cursor: pointer;
          font-family: var(--mono); font-size: 11px; font-weight: 700;
          text-transform: uppercase; margin-bottom: 8px; width: 100%;
        }
        .simulate-pay-btn:hover { background: #21a834; }
      `}</style>
      <div className="payment-qr-modal" onClick={(e) => e.stopPropagation()}>
        <button className="product-detail-close" onClick={onClose} style={{ top: "12px", right: "12px" }}>✕</button>
        <h3>Quét Mã Chuyển Khoản</h3>
        <p style={{ fontSize: "12.5px", color: "#555", margin: "0 0 10px" }}>
          Sử dụng ứng dụng ngân hàng của bạn quét mã VietQR để thanh toán đơn hàng.
        </p>

        <div className="qr-img-wrapper">
          <img src={qrUrl} alt="VietQR Payment Code" />
        </div>

        <div className="payment-details">
          <p><span>Ngân hàng:</span> <strong>{bankId}</strong></p>
          <p><span>Số tài khoản:</span> <strong>{bankAccount}</strong></p>
          <p><span>Chủ tài khoản:</span> <strong>{bankAccountName}</strong></p>
          <p><span>Số tiền:</span> <b>{activePaymentOrder.total.toLocaleString()}đ</b></p>
          <p><span>Nội dung CK:</span> <strong style={{ color: "#b3242d", background: "#ffe6e6", padding: "2px 6px", borderRadius: "4px" }}>{addInfo}</strong></p>
        </div>

        <div className="polling-status">
          <span className="dot-loading" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#b3242d", display: "inline-block", animation: "bob 1.5s infinite" }}></span>
          <span>Đang quét giao dịch ngân hàng... ({secondsLeft}s)</span>
        </div>

        {!cassoKey && (
          <button className="simulate-pay-btn" onClick={handleSimulateSuccess}>
            ⚡ Giả lập chuyển tiền thành công (Sandbox)
          </button>
        )}

        <button className="payment-close-btn" onClick={onClose}>
          Quay lại giỏ hàng
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
