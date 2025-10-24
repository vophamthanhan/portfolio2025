# 🔧 SỬA LỖI "Invalid URL" - ĐÃ FIX!

## ✅ Đã thực hiện:

1. ✅ **Fix tRPC URL handling** - Xử lý relative/absolute URLs đúng
2. ✅ **Fix OAuth URL generation** - Handle khi OAuth chưa được config
3. ✅ **Add error handling** - Tránh crash khi thiếu config
4. ✅ **Push code lên GitHub** - Railway đang auto-redeploy

---

## 🚀 RAILWAY SẼ TỰ ĐỘNG REDEPLOY

Railway đang phát hiện thay đổi và redeploy (~2-3 phút).

**Kiểm tra deployment:**
1. Vào Railway dashboard
2. Click vào project của bạn
3. Xem tab "Deployments" - Deployment mới đang chạy
4. Đợi đến khi status = "Success ✓"
5. Refresh website: https://portfolio2025-production-7357.up.railway.app

---

## ⚠️ QUAN TRỌNG: Thêm Environment Variables

Để website hoạt động đầy đủ, bạn CẦN thêm các variables này trong Railway:

### Bước 1: Vào Railway Variables Tab

1. Mở Railway dashboard
2. Click vào project của bạn
3. Click tab **"Variables"**

### Bước 2: Thêm Variables

Bấm **"+ New Variable"** và thêm từng cái sau:

#### 1. DATABASE_URL (BẮT BUỘC)
```
Name: DATABASE_URL
Value: mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={"rejectUnauthorized":true}
```

#### 2. JWT_SECRET (BẮT BUỘC)
```
Name: JWT_SECRET
Value: [Tạo random key]
```

**Tạo JWT_SECRET trong PowerShell:**
```powershell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

Copy kết quả vào Value.

#### 3. NODE_ENV (BẮT BUỘC)
```
Name: NODE_ENV
Value: production
```

#### 4. VITE_APP_TITLE (TÙY CHỌN)
```
Name: VITE_APP_TITLE
Value: My Portfolio
```

#### 5. PORT (TỰ ĐỘNG - Không cần thêm)
Railway tự set PORT, bạn không cần thêm.

### Bước 3: Redeploy

Sau khi thêm variables:
1. Click **"Deploy"** hoặc Railway sẽ tự động redeploy
2. Đợi 2-3 phút
3. Website sẽ hoạt động!

---

## 🧪 KIỂM TRA SAU KHI DEPLOY

### 1. Check Homepage
- Truy cập: https://portfolio2025-production-7357.up.railway.app
- Trang chủ nên load không có lỗi
- Console không còn "Invalid URL" error

### 2. Check API
Mở DevTools Console và test:
```javascript
fetch('/api/trpc/system.health?input={"json":{"timestamp":Date.now()}}')
  .then(r => r.json())
  .then(console.log)
```

Nên thấy: `{ ok: true }`

### 3. Check Database
Nếu có data trong TiDB:
- Projects section nên hiển thị dữ liệu
- Profile nên load thông tin

---

## ❌ NẾU VẪN CÒN LỖI

### Lỗi: "Failed to fetch" hoặc CORS

**Nguyên nhân:** Railway chưa config CORS đúng

**Giải pháp:** Kiểm tra server logs trong Railway:
1. Railway dashboard → Deployments
2. Click vào deployment đang chạy
3. Click "View Logs"
4. Tìm error messages

### Lỗi: "Database connection failed"

**Nguyên nhân:** DATABASE_URL chưa được thêm hoặc sai

**Giải pháp:**
1. Check Variables tab trong Railway
2. Verify DATABASE_URL có đầy đủ connection string
3. Đảm bảo có `?ssl={"rejectUnauthorized":true}`

### Lỗi: "Unauthorized" hoặc "Invalid session"

**Nguyên nhân:** JWT_SECRET chưa được set

**Giải pháp:**
1. Generate JWT_SECRET mới
2. Add vào Railway Variables
3. Redeploy

---

## 📊 EXPECTED LOGS

Trong Railway logs, bạn nên thấy:

```
✓ Server running on http://localhost:3000/
✓ Database connected
✓ Express server listening
```

Nếu thấy errors, paste logs để tôi giúp debug!

---

## 🎉 SAU KHI FIX

Website nên:
- ✅ Load trang chủ nhanh
- ✅ Không có console errors
- ✅ API calls hoạt động
- ✅ Data từ TiDB hiển thị
- ✅ Mobile responsive
- ✅ HTTPS enabled

---

## 📞 CẦN HỖ TRỢ?

Nếu vẫn gặp lỗi:
1. Share Railway deployment logs
2. Share browser console errors
3. Share screenshot của Variables tab

Tôi sẽ giúp debug ngay! 🚀
