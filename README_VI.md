# 🚀 Portfolio Website - Hướng dẫn nhanh

## ✅ Đã hoàn thành
- ✅ Cấu hình TiDB Cloud database
- ✅ Chạy migrations thành công
- ✅ Build project thành công
- ✅ Sẵn sàng triển khai!

## 📦 Cài đặt

```powershell
pnpm install
```

## 🗄️ Database

**TiDB Cloud đã được cấu hình sẵn!**

Connection: `gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000`

## 🛠️ Development

```powershell
# Chạy dev server
pnpm dev

# Build cho production
pnpm build

# Chạy production
pnpm start
```

## 🌐 Triển khai

### Cách nhanh nhất: Vercel

1. Push code lên GitHub
2. Import vào Vercel
3. Thêm env vars:
   - `DATABASE_URL`: (xem file .env)
   - `JWT_SECRET`: tạo random key
4. Deploy!

**Xem hướng dẫn chi tiết:** `HUONG_DAN_TRIEN_KHAI.md`

## 📂 Cấu trúc

```
├── client/          # Frontend React + Vite
├── server/          # Backend Express + tRPC
├── drizzle/         # Database schema & migrations
└── shared/          # Shared types
```

## 🔐 Environment Variables

File `.env` đã được tạo với TiDB connection string.

**Quan trọng:** Đổi `JWT_SECRET` trước khi deploy!

## 📖 Tài liệu

- [HUONG_DAN_TRIEN_KHAI.md](./HUONG_DAN_TRIEN_KHAI.md) - Hướng dẫn triển khai đầy đủ
- [DEPLOY.md](./DEPLOY.md) - Quick deployment guide (English)
- [PERFORMANCE.md](./PERFORMANCE.md) - Performance optimization

## 🎯 Tech Stack

- **Frontend:** React 19, Vite, TailwindCSS, Shadcn UI
- **Backend:** Express, tRPC, Drizzle ORM
- **Database:** TiDB Cloud (MySQL compatible)
- **Auth:** JWT
- **Hosting:** Vercel / Netlify

---

**Ready to deploy! 🚀**
