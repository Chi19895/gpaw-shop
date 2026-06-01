// Gpaw — Gối ôm Donal Trump — product detail page
// ─────────────────────────────────────────────────────────────────────────────

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "posterRatio": "portrait",
  "showStamps": true,
  "language": "bi"
}/*EDITMODE-END*/;

const RATIO_MAP = {
  portrait:  "4 / 5",
  square:    "1 / 1",
  landscape: "16 / 10",
};

const SIZES = [
  { cm: 80,  label: "M",  pop: null },
  { cm: 100, label: "L",  pop: null },
  { cm: 120, label: "XL", pop: "Bán chạy" },
  { cm: 150, label: "XXL", pop: null },
];

// ── Icons ──────────────────────────────────────────────────────────────────
const I = {
  truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="6" width="13" height="10" /><path d="M14 8h5l3 4v4h-8" />
      <circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" />
    </svg>
  ),
  print: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="3" width="12" height="6" /><rect x="3" y="9" width="18" height="9" rx="1" />
      <rect x="6" y="14" width="12" height="7" /><circle cx="18" cy="12" r=".5" fill="currentColor" />
    </svg>
  ),
  wash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="12" cy="13" r="5" /><circle cx="6.5" cy="6.5" r=".7" fill="currentColor" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 18a4 4 0 010-8 5 5 0 019.6 1A4 4 0 0117 18z" /><path d="M9 14l3-3 3 3" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 14.6 9 22 9 16 13.5 18.5 21 12 16.5 5.5 21 8 13.5 2 9 9.4 9" /></svg>
  ),
  bag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14l-1 13H6z" /><path d="M9 8V6a3 3 0 016 0v2" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-7-4.35-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.65-7 10-7 10z" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a8 8 0 11-16 0 8 8 0 0116 0z" /><path d="M8 12h.01M12 12h.01M16 12h.01" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  silhouette: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 13a5 5 0 100-10 5 5 0 000 10zM3 22a9 9 0 0118 0z" /></svg>
  ),
};

// ── Categories ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "politics", num: "I",   vi: "Chính trị",        en: "Politics",    count: "24 phiên bản" },
  { id: "anime",    num: "II",  vi: "Anime",            en: "Anime",       count: "Đang biên soạn" },
  { id: "stars",    num: "III", vi: "Ca sĩ · Diễn viên", en: "Singers · Actors", count: "Đang biên soạn" },
  { id: "plush",    num: "IV",  vi: "Thú nhồi bông",    en: "Plush Toys",  count: "Sắp ra mắt" },
];

// ── App ────────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activeCat, setActiveCat] = useState("politics");
  const [activeSize, setActiveSize] = useState(120);

  useEffect(() => {
    document.documentElement.style.setProperty("--poster-ratio", RATIO_MAP[t.posterRatio] || RATIO_MAP.portrait);
  }, [t.posterRatio]);

  return (
    <>
      <UtilBar />
      <BrandBar />
      <CatNav active={activeCat} onChange={setActiveCat} />
      <ChapterBanner />
      <Hero activeSize={activeSize} onSize={setActiveSize} showStamps={t.showStamps} />
      <Gallery />
      <Features />
      <Manifesto />
      <Specs />
      <Collection />
      <OtherCats active={activeCat} onChange={setActiveCat} />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hiển thị · Display" />
        <TweakRadio
          label="Tỷ lệ poster · Poster ratio"
          value={t.posterRatio}
          options={["portrait", "square", "landscape"]}
          onChange={(v) => setTweak("posterRatio", v)}
        />
        <TweakToggle
          label="Stamps · con dấu"
          value={t.showStamps}
          onChange={(v) => setTweak("showStamps", v)}
        />
        <TweakSection label="Gợi ý · Tip" />
        <div style={{ fontSize: 11, lineHeight: 1.5, color: "rgba(41,38,27,.6)", padding: "0 2px" }}>
          Đổi tỷ lệ poster để chụp ảnh phù hợp Facebook (square / landscape) hoặc Instagram (portrait).
        </div>
      </TweaksPanel>
    </>
  );
}

// ── 1. Utility bar ─────────────────────────────────────────────────────────
function UtilBar() {
  return (
    <div className="util" data-screen-label="00 Util bar">
      <div className="wrap">
        <div className="marquee">
          <span>Freeship toàn quốc · đơn từ 200.000đ</span>
          <span>Giao nhanh 1–2 ngày · HCM &amp; HN</span>
          <span>Bảo hành đổi trả trong 7 ngày</span>
        </div>
        <div className="right">
          <a href="#">VI</a><span className="sep">/</span><a href="#">EN</a>
          <span className="sep">·</span>
          <a href="#">Tra cứu đơn</a>
        </div>
      </div>
    </div>
  );
}

// ── 2. Brand header ────────────────────────────────────────────────────────
function BrandBar() {
  return (
    <header className="brand-bar" data-screen-label="01 Header">
      <div className="wrap">
        <div className="meta">
          <span>Vol. 47</span><span>·</span><span>Series 2026</span>
        </div>
        <div className="logo">
          <div className="lockup">GPAW</div>
          <span className="tag">Body Pillow Studio · Saigon</span>
        </div>
        <div className="actions">
          <button className="pill-btn" type="button">
            {I.heart}<span>Yêu thích</span>
          </button>
          <button className="pill-btn fill" type="button">
            {I.bag}<span>Giỏ · 2</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ── 3. Category nav ────────────────────────────────────────────────────────
function CatNav({ active, onChange }) {
  return (
    <nav className="cat-nav" data-screen-label="02 Categories">
      <div className="wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={"cat-btn" + (active === c.id ? " active" : "")}
            onClick={() => onChange(c.id)}
          >
            <span className="num">DANH MỤC {c.num} · CHAPTER {c.num}</span>
            <span className="name">{c.vi}</span>
            <span className="name-en">{c.en}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// ── 4. Chapter banner ──────────────────────────────────────────────────────
function ChapterBanner() {
  return (
    <div className="chapter" data-screen-label="03 Chapter banner">
      <div className="wrap">
        <div className="side-rule"></div>
        <div className="center">
          Danh mục I · <b>Chính trị</b> · Hồ sơ <b>No. 047</b> · Ấn bản giới hạn
        </div>
        <div className="side-rule"></div>
      </div>
    </div>
  );
}

// ── 5. Hero ────────────────────────────────────────────────────────────────
function Hero({ activeSize, onSize, showStamps }) {
  const priceWas = 420000;
  const priceNow = 320000;
  const off = Math.round((1 - priceNow / priceWas) * 100);
  const fmt = (n) => n.toLocaleString("vi-VN");

  return (
    <section className="hero" data-screen-label="04 Hero">
      <div className="wrap">
        <div className="hero-poster">
          <div className="poster-meta-top">
            <span>GPAW · No. 047</span>
            <span>Trang 01 / 04</span>
          </div>

          <div className="poster-art">
            <img src="assets/pillow-hero.png" alt="Gối ôm Donal Trump - mặt trước" />
            {showStamps && (
              <div className="corner-stamp">
                ẤN BẢN<br /><b>GIỚI HẠN</b><br />2026
              </div>
            )}
          </div>

          <div className="poster-meta-bot">
            <span>Body Pillow Series</span>
            <span>120 × 40 cm</span>
          </div>
        </div>

        <div className="hero-info">
          <div className="heading-block">
            <div className="eyebrow">
              <span className="stars">★ ★ ★</span>
              <span>Phát hành chính thức · Official Issue</span>
            </div>
            <h1>Gối Ôm<br /><em>Donal Trump</em></h1>
            <div className="h-en">The Donal Trump Body Pillow</div>
            <p className="blurb">
              Một người bạn nguyên thủ cao 120 cm, mặc vest xanh navy, khoanh tay nghiêm túc — chờ bạn ôm về.
              In 3D hai mặt, vải mịn mát, ruột bông polyester chống biến dạng. Đảm bảo bốn năm bảo hành — hoặc lâu hơn.
            </p>
          </div>

          <div className="price-block">
            <div className="label">Giá cử tri<br />Voter price</div>
            <div>
              <span className="price-now">{fmt(priceNow)}<sub>đ</sub></span>
              <span className="save-badge">−{off}%</span>
              <div style={{ marginTop: 4 }}>
                <span className="price-was">{fmt(priceWas)}đ</span>
              </div>
            </div>
            <div className="small">Bao gồm in 3D · Ruột bông Polyester · Túi vải tặng kèm</div>
          </div>

          <div className="size-block">
            <div className="row">
              <span className="label">Chọn chiều cao · Choose size</span>
              <span className="guide">Hướng dẫn chọn size →</span>
            </div>
            <div className="size-grid">
              {SIZES.map((s) => (
                <button
                  key={s.cm}
                  type="button"
                  className={"size-cell" + (activeSize === s.cm ? " active" : "")}
                  onClick={() => onSize(s.cm)}
                >
                  {s.pop && <span className="pop">{s.pop}</span>}
                  <span className="num">{s.cm}</span>
                  <span className="unit">{s.label} · cm</span>
                </button>
              ))}
            </div>
          </div>

          <div className="cta-row">
            <button type="button" className="cta-primary">
              <span>Đặt ngay · Order now</span>
              <span className="sm">→</span>
            </button>
            <button type="button" className="cta-secondary" aria-label="Chat">{I.chat}</button>
          </div>

          <div className="trust-strip">
            <div className="item">{I.truck}<span>Freeship<br />toàn quốc</span></div>
            <div className="item">{I.shield}<span>Bảo hành<br />đổi trả 7 ngày</span></div>
            <div className="item">{I.star}<span>4.9 · 1.247<br />đánh giá</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 6. Gallery ─────────────────────────────────────────────────────────────
function Gallery() {
  const angles = [
    { lbl: "A", vi: "Mặt trước", en: "Front view", img: "assets/pillow-front.png" },
    { lbl: "B", vi: "Bên phải",  en: "Right side", img: "assets/pillow-right.png" },
    { lbl: "C", vi: "Bên trái",  en: "Left side",  img: "assets/pillow-left.png" },
    { lbl: "D", vi: "Mặt sau",   en: "Back view",  img: "assets/pillow-back.png" },
  ];
  const extras = [
    { lbl: "E", vi: "Chi tiết khuôn mặt", en: "Face detail",   img: "assets/pillow-face.png" },
    { lbl: "F", vi: "Chi tiết áo vest",   en: "Suit detail",   img: "assets/pillow-torso.png" },
    { lbl: "G", vi: "Chi tiết giày",      en: "Shoe detail",   img: "assets/pillow-feet.png" },
  ];

  return (
    <section className="gallery" data-screen-label="05 Gallery">
      <div className="wrap">
        <div className="section-head">
          <div className="rule"></div>
          <div className="center">
            <h2>Biên Bản Ghi Hình</h2>
            <div className="en">Visual Record · Four Angles &amp; Three Details</div>
          </div>
          <div className="rule"></div>
        </div>

        <div className="angle-grid">
          {angles.map((a) => (
            <div className="angle-card" key={a.lbl}>
              <div className="lbl"><b>{a.lbl}</b>{a.vi}</div>
              <div className="frame">
                <img src={a.img} alt={a.vi} />
              </div>
              <div className="caption">
                <b>{a.vi}</b>
                <span>{a.en}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="angle-extras">
          {extras.map((e) => (
            <div className="extra-card" key={e.lbl}>
              <div className="frame">
                <img src={e.img} alt={e.vi} />
              </div>
              <div className="row">
                <b>{e.lbl} · {e.vi}</b>
                <span>{e.en}</span>
              </div>
            </div>
          ))}
          <div className="extra-card size-card">
            <div className="frame">
              <img src="assets/pillow-size.png" alt="Kích thước sản phẩm 120 x 40 cm" />
            </div>
            <div className="row">
              <b>H · Kích thước thực</b>
              <span>120 × 40 cm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 7. Features ────────────────────────────────────────────────────────────
function Features() {
  const items = [
    { ico: I.print,  vi: "In 3D sắc nét",           en: "Sharp 3D print" },
    { ico: I.cloud,  vi: "Ruột Polyester cao cấp",  en: "Premium polyester" },
    { ico: I.wash,   vi: "Giặt máy được",            en: "Machine washable" },
    { ico: I.truck,  vi: "Freeship toàn quốc",       en: "Free nationwide shipping" },
    { ico: I.shield, vi: "Bảo hành đổi trả",         en: "Warranty &amp; returns" },
    { ico: I.star,   vi: "Không phai màu",            en: "Fade-resistant fabric" },
  ];
  return (
    <section className="features" data-screen-label="06 Features">
      <div className="wrap">
        <div className="head">
          <div className="eyebrow">★ Cương lĩnh sản phẩm · Product Platform ★</div>
          <h2>Sáu cam kết của Gpaw</h2>
          <div className="en">Six promises we ship with every pillow</div>
        </div>
        <div className="feat-grid">
          {items.map((it, i) => (
            <div className="feat" key={i}>
              <span className="num">No. 0{i + 1}</span>
              <span className="ico">{it.ico}</span>
              <span className="vi">{it.vi}</span>
              <span className="en" dangerouslySetInnerHTML={{ __html: it.en }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 8. Manifesto ───────────────────────────────────────────────────────────
function Manifesto() {
  const promises = [
    { vi: "Ôm chặt mỗi đêm, không đàm phán lại.",       en: "A firm hug every night — no renegotiation." },
    { vi: "Cao 120 cm, đứng yên trên ghế bốn năm liền.", en: "120 cm tall, standing firm for a full term." },
    { vi: "Vest xanh không nhăn, cà-vạt đỏ không lệch.", en: "Wrinkle-free suit, tie always centered." },
    { vi: "Giao hàng nhanh hơn ngân sách được thông qua.", en: "Ships faster than any budget passes." },
    { vi: "Hợp hiến với mọi kiểu phòng ngủ.",             en: "Constitutional in every bedroom décor." },
  ];
  return (
    <section className="manifesto" data-screen-label="07 Manifesto">
      <div className="wrap">
        <div className="lead">
          <div className="stamp">★ Cam kết tranh cử · Campaign Pledge</div>
          <h2>Năm điều<br /><em>cam kết</em></h2>
          <div className="en">Five things we promise</div>
          <div className="sig">Đặt bút bởi Gpaw Atelier, 2026</div>
        </div>
        <div className="promises">
          {promises.map((p, i) => (
            <div className="promise" key={i}>
              <div className="ord">{String(i + 1).padStart(2, "0")}.</div>
              <div>
                <div className="vi">{p.vi}</div>
                <div className="en">{p.en}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 9. Specs ───────────────────────────────────────────────────────────────
function Specs() {
  const rows = [
    { k: "Chất liệu vỏ",     v: "Vải sữa hai chiều, in 3D không phai",    ven: "Two-way milk silk, fade-proof 3D print" },
    { k: "Ruột gối",         v: "Polyester Microfiber 350 g/m²",          ven: "Polyester microfiber 350 g/m²" },
    { k: "Kích thước",        v: "80 / 100 / 120 / 150 cm",                ven: "Four heights" },
    { k: "Trọng lượng",       v: "≈ 1,8 kg (bản 120 cm)",                  ven: "≈ 1.8 kg (120 cm)" },
    { k: "Vệ sinh",          v: "Giặt máy chế độ nhẹ, không sấy nóng",    ven: "Gentle machine wash, no hot tumble" },
    { k: "Đóng gói",         v: "Hộp giấy + túi vải Gpaw tặng kèm",        ven: "Gift box + canvas pouch" },
    { k: "Xuất xứ",          v: "Thiết kế & sản xuất tại Việt Nam",        ven: "Designed &amp; made in Vietnam" },
    { k: "Bảo hành",         v: "Đổi trả trong 07 ngày kể từ ngày nhận", ven: "7-day return policy" },
  ];
  return (
    <section className="specs" data-screen-label="08 Specs">
      <div className="wrap">
        <div className="lead">
          <h2>Hồ sơ<br />kỹ thuật</h2>
          <div className="en">Technical memorandum</div>
          <p>Mọi chi tiết bạn cần biết trước khi bỏ phiếu (hoặc bỏ vào giỏ).</p>
        </div>
        <div className="spec-table">
          {rows.map((r, i) => (
            <div className="spec-row" key={i}>
              <span className="k">{r.k}</span>
              <span className="v">{r.v}</span>
              <span className="v-en" dangerouslySetInnerHTML={{ __html: r.ven }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 10. Collection grid ────────────────────────────────────────────────────
function Collection() {
  const items = [
    { current: true, name: "Donal Trump",      en: "Donal Trump",      tag: "Đang xem",     price: "320.000đ" },
    { name: "Vladimir Putin",   en: "Vladimir Putin",   tag: "Sắp ra mắt",     price: "Coming soon" },
    { name: "Xi Jinping",       en: "Xi Jinping",       tag: "Sắp ra mắt",   price: "Coming soon" },
    { name: "Kim Jong-un",      en: "Kim Jong-un",      tag: "Đặt trước",     price: "Pre-order" },
    { name: "Joe Biden",        en: "Joe Biden",        tag: "Sắp ra mắt",   price: "Coming soon" },
  ];
  return (
    <section className="collection" data-screen-label="09 Collection">
      <div className="wrap">
        <div className="head">
          <div>
            <h2>Bộ sưu tập Chính trị</h2>
            <div className="en">Political Series · Vol. 47</div>
          </div>
          <div className="meta">24 phiên bản · 5 đã ra mắt · Xem tất cả →</div>
        </div>
        <div className="coll-grid">
          {items.map((it, i) => (
            <article className={"coll-card" + (it.current ? " current" : "")} key={i}>
              <span className="tag">{it.tag}</span>
              <div className="frame">
                {it.current ? (
                  <img src="assets/pillow-front.png" alt={it.name} />
                ) : (
                  <div className="placeholder">
                    {I.silhouette}
                    Ảnh sản phẩm<br />sẽ cập nhật
                  </div>
                )}
              </div>
              <div className="info">
                <div className="row">
                  <span className="name">{it.name}</span>
                </div>
                <span className="en">{it.en}</span>
                <div className="row" style={{ marginTop: 4 }}>
                  <span className="price">{it.current ? <><b>320.000đ</b> · 420.000đ</> : it.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 11. Other categories teaser ────────────────────────────────────────────
function OtherCats({ active, onChange }) {
  return (
    <section className="other-cats" data-screen-label="10 Other categories">
      <div className="wrap">
        <div className="head">
          <h2>Bốn vũ trụ của Gpaw</h2>
          <div className="en">Four worlds, one pillow studio</div>
        </div>
        <div className="ocat-grid">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              className={"ocat" + (active === c.id ? " current" : "")}
              onClick={() => onChange(c.id)}
            >
              <span className="num">Chương {c.num}</span>
              <div>
                <div className="name">{c.vi}</div>
                <div className="name-en">{c.en}</div>
              </div>
              <span className="count">{c.count} →</span>
              <span className="arrow">{I.arrow}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 12. Footer ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer data-screen-label="11 Footer">
      <div className="wrap">
        <div className="col brand">
          <div className="lockup">GPAW</div>
          <p>Studio gối ôm 3D thủ công tại Sài Gòn. Mỗi chiếc gối là một bức chân dung — của người bạn yêu, người bạn thần tượng, hoặc người bạn không bao giờ thật sự thích.</p>
        </div>
        <div className="col">
          <h4>Mua hàng</h4>
          <a href="#">Tất cả sản phẩm</a>
          <a href="#">Đặt theo yêu cầu</a>
          <a href="#">Hướng dẫn chọn size</a>
          <a href="#">Tra cứu đơn</a>
        </div>
        <div className="col">
          <h4>Hỗ trợ</h4>
          <a href="#">Chính sách đổi trả</a>
          <a href="#">Vận chuyển</a>
          <a href="#">Câu hỏi thường gặp</a>
          <a href="#">Liên hệ Gpaw</a>
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

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
