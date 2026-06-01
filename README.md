# Gpaw Shop — Gối ôm thế giới

> Website bán gối ôm theo chủ đề: Anime, Ca sĩ/Diễn viên, Gấu bông, và Nhân vật nổi tiếng.

## Cấu trúc dự án

```
├── Gpaw - Cửa hàng.html          # Trang chủ storefront
├── Gpaw - Senpai School (Anime).html
├── Gpaw - Diva Sân Khấu (Ca sĩ).html
├── Gpaw - Gấu Mochi (Thú nhồi bông).html
├── Gpaw — Gối ôm Donal Trump.html
├── shop-app.jsx                   # React app chính (toàn bộ logic + admin CMS)
├── app.jsx                        # App phụ
├── tweaks-panel.jsx               # Panel chỉnh sửa nhanh
└── assets/                        # Ảnh sản phẩm
```

## Tính năng

- 🛒 **Storefront** đa chủ đề: Anime (V·JUMP style), Ca sĩ (ELLE Magazine style), Gấu bông (Kinfolk style)
- ⚙️ **Admin CMS** đầy đủ: quản lý sản phẩm, khách hàng, giao diện, SEO
- 📦 **Bulk upload** sản phẩm qua Excel
- 🔍 **SEO preview** Google simulator
- 🎨 **Thiết kế magazine editorial** lấy cảm hứng từ ELLE, V-Jump, SOUL, Kinfolk
- 📱 Responsive mobile

## Tech Stack

- HTML + CSS (Vanilla)
- React (CDN, no build step)
- JSX (Babel standalone)
- localStorage cho data persistence
