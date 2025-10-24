# Portfolio Website - Deployment Scripts

## Quick Deploy Scripts

### Windows PowerShell

#### deploy-vercel.ps1
```powershell
# Script to prepare and deploy to Vercel

Write-Host "🚀 Preparing deployment to Vercel..." -ForegroundColor Green

# Check if git is initialized
if (-not (Test-Path .git)) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - Portfolio with TiDB"
}

# Check if vercel CLI is installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Build check
Write-Host "Running build test..." -ForegroundColor Yellow
pnpm build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Push to GitHub: git remote add origin YOUR_REPO_URL && git push -u origin main"
    Write-Host "2. Run: vercel"
    Write-Host "3. Add environment variables in Vercel dashboard:"
    Write-Host "   - DATABASE_URL"
    Write-Host "   - JWT_SECRET"
} else {
    Write-Host "❌ Build failed. Check errors above." -ForegroundColor Red
}
```

#### deploy-netlify.ps1
```powershell
# Script to prepare and deploy to Netlify

Write-Host "🚀 Preparing deployment to Netlify..." -ForegroundColor Green

# Check if netlify CLI is installed
if (-not (Get-Command netlify -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Netlify CLI..." -ForegroundColor Yellow
    npm install -g netlify-cli
}

# Build check
Write-Host "Running build test..." -ForegroundColor Yellow
pnpm build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run: netlify init"
    Write-Host "2. Follow the prompts to connect your site"
    Write-Host "3. Add environment variables:"
    Write-Host "   netlify env:set DATABASE_URL 'YOUR_CONNECTION_STRING'"
    Write-Host "   netlify env:set JWT_SECRET 'YOUR_SECRET_KEY'"
    Write-Host "4. Deploy: netlify deploy --prod"
} else {
    Write-Host "❌ Build failed. Check errors above." -ForegroundColor Red
}
```

### Usage

#### For Vercel:
```powershell
powershell -ExecutionPolicy Bypass -File deploy-vercel.ps1
```

#### For Netlify:
```powershell
powershell -ExecutionPolicy Bypass -File deploy-netlify.ps1
```

## Manual Deployment Steps

### 1. Verify Build
```powershell
pnpm install
pnpm build
```

### 2. Test Locally
```powershell
pnpm start
```
Visit http://localhost:3000

### 3. Environment Variables Required

```env
DATABASE_URL=mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={"rejectUnauthorized":true}
JWT_SECRET=your-secret-key-here
NODE_ENV=production
```

### 4. Deploy to Platform

#### Vercel CLI:
```powershell
vercel
```

#### Netlify CLI:
```powershell
netlify deploy --prod
```

## Post-Deployment Checklist

- [ ] Website loads successfully
- [ ] Database connection works
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] Environment variables set correctly

## Troubleshooting

### Build Errors
- Ensure all dependencies installed: `pnpm install`
- Check Node version: `node --version` (should be 18+)
- Review build logs for specific errors

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check TiDB cluster is active
- Ensure SSL parameter is included

### Runtime Errors
- Check platform logs (Vercel/Netlify dashboard)
- Verify all environment variables are set
- Test locally first with `pnpm start`

---

For detailed Vietnamese guide, see: [HUONG_DAN_TRIEN_KHAI.md](./HUONG_DAN_TRIEN_KHAI.md)
