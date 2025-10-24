# 🚀 HƯỚNG DẪN DEPLOY LÊN RAILWAY.APP

## Tại sao Railway?

✅ **Miễn phí** - $5 credit/tháng cho hobby projects
✅ **Hỗ trợ full Node.js** - Express server hoạt động hoàn hảo
✅ **Tự động deploy** từ GitHub
✅ **SSL/HTTPS** tự động
✅ **Database** connections không giới hạn
✅ **Dễ sử dụng** - Setup trong 5 phút

---

## 📋 CÁC BƯỚC THỰC HIỆN

### Bước 1: Tạo tài khoản Railway (2 phút)

1. Truy cập: **https://railway.app**
2. Click **"Login"**
3. Chọn **"Login with GitHub"**
4. Authorize Railway to access your GitHub account
5. Hoàn tất!

### Bước 2: Tạo Project mới (1 phút)

1. Sau khi đăng nhập, click **"New Project"**
2. Chọn **"Deploy from GitHub repo"**
3. Tìm và chọn repository: **`vophamthanhan/portfolio2025`**
4. Click **"Deploy Now"**

Railway sẽ bắt đầu deploy tự động!

### Bước 3: Thêm Environment Variables (2 phút)

1. Trong project dashboard, click tab **"Variables"**
2. Click **"+ New Variable"**
3. Thêm các biến sau:

#### Variable 1: DATABASE_URL
```
DATABASE_URL
mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={"rejectUnauthorized":true}
```

#### Variable 2: JWT_SECRET
```
JWT_SECRET
[Paste random key bạn đã tạo]
```

**Tạo JWT_SECRET:**
```powershell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

#### Variable 3: NODE_ENV
```
NODE_ENV
production
```

#### Variable 4: PORT (optional)
```
PORT
3000
```

4. Click **"Add"** sau mỗi variable

### Bước 4: Deploy! ✨

1. Railway sẽ tự động redeploy sau khi thêm variables
2. Đợi 2-3 phút để build hoàn tất
3. Bạn sẽ thấy log:
   ```
   ✓ Built in ...
   ✓ Deployed
   ```

### Bước 5: Lấy URL của website

1. Trong project dashboard, click tab **"Settings"**
2. Tìm section **"Domains"**
3. Click **"Generate Domain"**
4. Railway sẽ tạo URL như: `portfolio2025-production.up.railway.app`
5. Click vào URL để xem website! 🎉

---

## 🎯 RAILWAY DASHBOARD OVERVIEW

Sau khi deploy thành công, bạn sẽ thấy:

### 1. **Deployments Tab**
- Xem lịch sử deploys
- Logs realtime
- Build status

### 2. **Variables Tab**
- Quản lý environment variables
- Add/Edit/Delete variables

### 3. **Settings Tab**
- Domain management
- Deploy triggers
- Service settings

### 4. **Metrics Tab**
- CPU usage
- Memory usage
- Request metrics

---

## 🔄 TỰ ĐỘNG DEPLOY TỪ GITHUB

Railway đã được setup để tự động deploy mỗi khi bạn push code:

```bash
# Sau khi thay đổi code
git add .
git commit -m "Update features"
git push origin main

# Railway sẽ tự động:
# 1. Phát hiện thay đổi
# 2. Pull code mới
# 3. Build lại
# 4. Deploy version mới
# Tổng thời gian: ~2-3 phút
```

---

## ✅ KIỂM TRA SAU KHI DEPLOY

### 1. Kiểm tra website load
- Truy cập URL Railway cung cấp
- Website nên load nhanh trong vài giây

### 2. Kiểm tra database
- Trang Projects nên hiển thị data từ TiDB
- Profile section nên load thông tin

### 3. Kiểm tra authentication (nếu có)
- Login/logout hoạt động
- Dashboard accessible

### 4. Kiểm tra mobile
- Responsive design
- Touch interactions

---

## 🐛 TROUBLESHOOTING

### Lỗi: Build Failed

**Xem logs:**
1. Click vào deployment bị lỗi
2. Xem build logs
3. Tìm error message

**Thường gặp:**
- Missing dependencies → Check package.json
- Build command error → Verify scripts in package.json

**Giải pháp:**
```bash
# Test build local trước
pnpm install
pnpm build

# Nếu OK local, push lại
git add .
git commit -m "Fix build"
git push origin main
```

### Lỗi: Database Connection Failed

**Kiểm tra:**
1. Variables tab → DATABASE_URL có đúng không?
2. Copy lại connection string từ file .env
3. Đảm bảo có `?ssl={"rejectUnauthorized":true}`

**Fix:**
1. Edit DATABASE_URL variable
2. Paste lại connection string đầy đủ
3. Click Save → Railway auto redeploy

### Lỗi: Application Error / 500

**Xem logs:**
1. Deployments tab
2. Click vào deployment đang chạy
3. View Logs
4. Tìm error stack trace

**Common issues:**
- Missing JWT_SECRET
- Database connection timeout
- Port binding issues

---

## 📊 RAILWAY VS VERCEL

| Feature | Railway | Vercel |
|---------|---------|---------|
| Node.js Server | ✅ Full support | ❌ Serverless only |
| Express Apps | ✅ Yes | ❌ Limited |
| Database Connections | ✅ Unlimited | ⚠️ Limited |
| Free Tier | $5 credit/month | Unlimited builds |
| SSL | ✅ Auto | ✅ Auto |
| Custom Domain | ✅ Yes | ✅ Yes |
| Build Time | ~2-3 mins | ~2 mins |
| **For This Project** | ⭐⭐⭐⭐⭐ | ⭐⭐ |

---

## 💡 TIPS

### 1. Monitor Usage
- Railway dashboard shows credit usage
- $5/month ≈ 500 hours runtime
- Enough cho hobby projects

### 2. Custom Domain
Nếu có domain riêng:
1. Settings → Domains → Add custom domain
2. Add CNAME record tại DNS provider
3. Railway auto-provision SSL

### 3. Environment Management
Railway support multiple environments:
- Production
- Staging
- Development

### 4. Database Backup
Vì đang dùng TiDB Cloud:
- Data được backup tự động
- Không cần lo về Railway downtime

---

## 🎊 HOÀN TẤT!

Sau khi hoàn thành các bước trên:

✅ Website live tại Railway
✅ Database TiDB Cloud connected
✅ Auto-deploy từ GitHub
✅ SSL/HTTPS enabled
✅ Free hosting!

**Your URLs:**
- GitHub: https://github.com/vophamthanhan/portfolio2025
- Railway: `[Your Railway domain]`
- TiDB: Connected ✅

---

## 📞 CẦN HỖ TRỢ?

Nếu gặp vấn đề:
1. Check Railway build logs
2. Verify environment variables
3. Test local với `pnpm dev`
4. Review error messages

Railway docs: https://docs.railway.app

---

**Chúc bạn deploy thành công! 🚀✨**
