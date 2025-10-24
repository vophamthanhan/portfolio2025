# ⚠️ LƯU Ý QUAN TRỌNG VỀ VERCEL DEPLOYMENT

## Vấn đề hiện tại:

Project này là **full-stack Express server** với database và backend logic phức tạp. Vercel free tier **KHÔNG hỗ trợ** long-running server processes như vậy.

## Giải pháp:

Bạn có 3 lựa chọn:

### 1. ✅ **Deploy lên Railway.app (ĐỀ XUẤT - MIỄN PHÍ)**

Railway hỗ trợ full Node.js apps miễn phí với $5 credit/tháng.

**Các bước:**

1. Truy cập: https://railway.app
2. Đăng nhập bằng GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Chọn repository `vophamthanhan/portfolio2025`
5. Thêm Environment Variables:
   ```
   DATABASE_URL=mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={"rejectUnauthorized":true}
   JWT_SECRET=[your-random-key]
   NODE_ENV=production
   ```
6. Click "Deploy"
7. Railway sẽ tự động:
   - Chạy `pnpm install`
   - Chạy `pnpm build`
   - Chạy `pnpm start`
   - Cung cấp URL public

### 2. ✅ **Deploy lên Render.com (MIỄN PHÍ)**

Render cũng hỗ trợ Node.js apps miễn phí.

**Các bước:**

1. Truy cập: https://render.com
2. Đăng nhập bằng GitHub
3. Click "New+" → "Web Service"
4. Chọn repository `vophamthanhan/portfolio2025`
5. Cấu hình:
   - **Name:** portfolio2025
   - **Environment:** Node
   - **Build Command:** `pnpm install && pnpm build`
   - **Start Command:** `pnpm start`
6. Thêm Environment Variables (giống Railway)
7. Click "Create Web Service"

### 3. ❌ **Vercel (KHÔNG KHUYẾN NGHỊ cho project này)**

Vercel free tier chỉ support:
- Static sites
- Serverless functions (timeout 10s)
- Edge functions

Project này cần:
- Long-running Express server
- WebSocket support (có thể)
- Database connections
- File uploads

→ **Không phù hợp với Vercel free tier**

---

## 🚀 HƯỚNG DẪN RAILWAY (NHANH NHẤT)

### Bước 1: Tạo tài khoản Railway

```
https://railway.app/new
```

Đăng nhập bằng GitHub

### Bước 2: Deploy Project

1. Click "New Project"
2. Chọn "Deploy from GitHub repo"
3. Authorize Railway to access GitHub
4. Select repository: `vophamthanhan/portfolio2025`

### Bước 3: Thêm Variables

Click vào project → Variables tab → Add variables:

```env
DATABASE_URL=mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={"rejectUnauthorized":true}
JWT_SECRET=your-random-secret-key-here
NODE_ENV=production
PORT=3000
```

### Bước 4: Deploy

Railway sẽ tự động:
- Detect Node.js
- Run `pnpm install`
- Run `pnpm build`  
- Start server với `pnpm start`

Sau 2-3 phút, bạn sẽ có URL như:
```
https://portfolio2025-production.up.railway.app
```

---

## 📊 SO SÁNH PLATFORMS

| Platform | Free Tier | Support Node.js Server | Database | Recommend |
|----------|-----------|----------------------|----------|-----------|
| **Railway** | $5 credit/month | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐⭐ |
| **Render** | 750 hours/month | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐ |
| **Vercel** | Unlimited | ❌ Serverless only | ⚠️ Limited | ⭐⭐ |
| **Netlify** | 300 build mins | ❌ Functions only | ⚠️ Limited | ⭐⭐ |

---

## ✅ KHUYẾN NGHỊ

**Dùng Railway.app** - Nhanh, dễ, miễn phí, và hoàn toàn support project này!

Sau khi deploy thành công trên Railway:
- ✅ Full Express server hoạt động
- ✅ Database TiDB Cloud kết nối OK
- ✅ File uploads hoạt động
- ✅ Authentication hoạt động
- ✅ SSL/HTTPS tự động
- ✅ Auto-deploy từ GitHub

---

## 🆘 CẦN HỖ TRỢ?

Nếu bạn muốn tiếp tục với Railway, tôi có thể hướng dẫn chi tiết từng bước!
