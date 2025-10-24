# 🚀 HƯỚNG DẪN TRIỂN KHAI PORTFOLIO WEBSITE

## ✅ Tình trạng hiện tại
- ✅ Database TiDB Cloud đã được cấu hình
- ✅ Migrations đã chạy thành công
- ✅ Build project thành công
- ✅ Sẵn sàng để triển khai!

---

## 📋 Thông tin Database TiDB Cloud

```
Host: gateway01.ap-southeast-1.prod.aws.tidbcloud.com
Port: 4000
Database: portfolio_db
User: 27URifHhbYG3QpG.root
Password: ixIh4sZ6Ng72EaUD
```

**Connection String:**
```
mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={"rejectUnauthorized":true}
```

---

## 🎯 PHƯƠNG ÁN 1: TRIỂN KHAI LÊN VERCEL (Đề xuất)

### Bước 1: Đẩy code lên GitHub

```powershell
# Khởi tạo git repository (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Portfolio website với TiDB Cloud"

# Tạo repository trên GitHub và đẩy code lên
# Trước tiên tạo repo mới trên https://github.com/new
# Sau đó chạy:
git remote add origin https://github.com/TEN_CUA_BAN/ten-repo.git
git branch -M main
git push -u origin main
```

### Bước 2: Triển khai trên Vercel

1. **Đăng nhập Vercel:**
   - Truy cập: https://vercel.com
   - Đăng nhập bằng GitHub account

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Chọn repository vừa tạo
   - Click "Import"

3. **Cấu hình Environment Variables:**
   
   Trong phần "Environment Variables", thêm các biến sau:

   ```
   DATABASE_URL
   mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={"rejectUnauthorized":true}
   ```

   ```
   JWT_SECRET
   portfolio_secret_key_2024_please_change_this_in_production
   ```

   ```
   NODE_ENV
   production
   ```

4. **Cấu hình Build:**
   - Framework Preset: Vite
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - Install Command: `pnpm install`

5. **Deploy:**
   - Click "Deploy"
   - Đợi 2-3 phút
   - Website của bạn sẽ live tại: `https://ten-project.vercel.app`

---

## 🎯 PHƯƠNG ÁN 2: TRIỂN KHAI LÊN NETLIFY

### Bước 1: Đẩy code lên GitHub (giống Phương án 1)

### Bước 2: Triển khai trên Netlify

1. **Đăng nhập Netlify:**
   - Truy cập: https://netlify.com
   - Đăng nhập bằng GitHub

2. **Import Project:**
   - Click "Add new site" → "Import an existing project"
   - Chọn GitHub
   - Chọn repository của bạn

3. **Cấu hình Build:**
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Base directory: (để trống)

4. **Thêm Environment Variables:**
   
   Vào "Site settings" → "Environment variables" → "Add a variable"
   
   Thêm các biến:
   - `DATABASE_URL`: Connection string TiDB
   - `JWT_SECRET`: Secret key của bạn
   - `NODE_ENV`: production

5. **Deploy:**
   - Click "Deploy site"
   - Website sẽ live sau 2-3 phút

---

## 🎯 PHƯƠNG ÁN 3: TRIỂN KHAI LÊN VPS/SERVER

### Yêu cầu:
- Node.js 18+ hoặc 20+
- PM2 hoặc Docker
- Nginx (khuyến nghị)

### Bước 1: Chuẩn bị server

```bash
# Cài Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Cài pnpm
npm install -g pnpm

# Cài PM2
npm install -g pm2
```

### Bước 2: Upload code

```bash
# Trên máy local, đẩy code lên server
git clone https://github.com/TEN_CUA_BAN/ten-repo.git
cd ten-repo

# Hoặc dùng SCP/FTP để upload
```

### Bước 3: Cài đặt và build

```bash
# Cài dependencies
pnpm install

# Tạo file .env
cat > .env << EOL
DATABASE_URL=mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={"rejectUnauthorized":true}
JWT_SECRET=your_secret_key_here
NODE_ENV=production
PORT=3000
EOL

# Build project
pnpm build
```

### Bước 4: Chạy với PM2

```bash
# Chạy server
pm2 start dist/index.js --name portfolio

# Lưu cấu hình PM2
pm2 save

# Auto start khi reboot
pm2 startup
```

### Bước 5: Cấu hình Nginx (khuyến nghị)

```nginx
server {
    listen 80;
    server_name domain-cua-ban.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Cài SSL với Certbot (khuyến nghị)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d domain-cua-ban.com
```

---

## 🔐 Bảo mật quan trọng

### 1. Đổi JWT Secret
Tạo secret key mạnh:

```powershell
# Trên Windows với PowerShell
$bytes = New-Object byte[] 32
[System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

### 2. Giới hạn IP cho TiDB (khuyến nghị)
- Vào TiDB Cloud Console
- Thêm IP của server/Vercel vào whitelist

### 3. Environment Variables
- ❌ KHÔNG commit file `.env` vào Git
- ✅ Chỉ đặt env vars trên platform hosting

---

## 🧪 Kiểm tra sau khi deploy

### Checklist:
- [ ] Website load thành công
- [ ] Trang chủ hiển thị đầy đủ
- [ ] Kết nối database hoạt động
- [ ] Dashboard accessible (nếu có)
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] Performance tốt (Google PageSpeed)

### Test endpoints:
```bash
# Test health check
curl https://your-site.com/api/health

# Test database connection
curl https://your-site.com/api/trpc/system.health
```

---

## 🐛 Xử lý sự cố

### Lỗi: Database connection failed

**Nguyên nhân:**
- Connection string sai
- SSL certificate issue
- TiDB cluster đang sleep

**Giải pháp:**
1. Kiểm tra connection string
2. Thêm `?ssl={"rejectUnauthorized":true}` vào URL
3. Wake up TiDB cluster trên console

### Lỗi: Build failed

**Kiểm tra:**
1. Tất cả dependencies đã được install
2. Node version phù hợp (18+)
3. Build logs để xem lỗi cụ thể

### Lỗi: 500 Internal Server Error

**Kiểm tra:**
1. Environment variables đã set đầy đủ
2. Database migrations đã chạy
3. Server logs để debug

---

## 📊 Giám sát và tối ưu

### 1. Monitoring
- Vercel Analytics (built-in)
- Google Analytics
- Sentry cho error tracking

### 2. Performance
- CDN: Vercel/Netlify tự động
- Image optimization
- Code splitting

### 3. Database
- TiDB Cloud monitoring dashboard
- Set up alerts cho connection issues

---

## 🎉 Hoàn tất!

Website của bạn đã sẵn sàng! 

**Các bước tiếp theo:**
1. ✅ Test kỹ website
2. ✅ Set up custom domain
3. ✅ Cấu hình SEO
4. ✅ Add Google Analytics
5. ✅ Set up backup strategy

---

## 📞 Cần hỗ trợ?

- TiDB Cloud Docs: https://docs.pingcap.com/tidbcloud
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

---

**Chúc bạn triển khai thành công! 🚀**
