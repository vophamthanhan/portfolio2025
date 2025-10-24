# Portfolio Website Deployment Script for Vercel
# Usage: powershell -ExecutionPolicy Bypass -File deploy-vercel.ps1

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "     Portfolio Website - Vercel Deployment Helper" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check Git
Write-Host "📋 Step 1: Checking Git repository..." -ForegroundColor Yellow

if (-not (Test-Path .git)) {
    Write-Host "⚠️  Git repository not initialized." -ForegroundColor Yellow
    $initGit = Read-Host "Do you want to initialize Git? (Y/n)"
    
    if ($initGit -ne "n" -and $initGit -ne "N") {
        git init
        git add .
        git commit -m "Initial commit - Portfolio with TiDB Cloud"
        Write-Host "✅ Git repository initialized" -ForegroundColor Green
    }
} else {
    Write-Host "✅ Git repository found" -ForegroundColor Green
}

Write-Host ""

# Step 2: Check dependencies
Write-Host "📋 Step 2: Checking dependencies..." -ForegroundColor Yellow

if (-not (Test-Path node_modules)) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    pnpm install
}

Write-Host "✅ Dependencies ready" -ForegroundColor Green
Write-Host ""

# Step 3: Test build
Write-Host "📋 Step 3: Testing production build..." -ForegroundColor Yellow
pnpm build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors before deploying." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Step 4: Check Vercel CLI
Write-Host "📋 Step 4: Checking Vercel CLI..." -ForegroundColor Yellow

if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Vercel CLI not installed." -ForegroundColor Yellow
    $installVercel = Read-Host "Do you want to install Vercel CLI? (Y/n)"
    
    if ($installVercel -ne "n" -and $installVercel -ne "N") {
        npm install -g vercel
        Write-Host "✅ Vercel CLI installed" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Skipping Vercel CLI installation" -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "     Deployment Instructions" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Next steps to deploy to Vercel:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Push to GitHub (if not done yet):" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" -ForegroundColor Gray
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Go to Vercel Dashboard:" -ForegroundColor White
Write-Host "   https://vercel.com/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Import your GitHub repository" -ForegroundColor White
Write-Host ""
Write-Host "4. Add Environment Variables:" -ForegroundColor White
Write-Host "   DATABASE_URL = mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={`"rejectUnauthorized`":true}" -ForegroundColor Gray
Write-Host "   JWT_SECRET = [Generate a secure random key]" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Click Deploy!" -ForegroundColor White
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Alternative: Deploy using Vercel CLI:" -ForegroundColor Yellow
Write-Host "   vercel" -ForegroundColor Gray
Write-Host ""

Write-Host "✅ Your project is ready for deployment!" -ForegroundColor Green
Write-Host ""

# Ask to open Vercel
$openVercel = Read-Host "Do you want to open Vercel in browser? (Y/n)"
if ($openVercel -ne "n" -and $openVercel -ne "N") {
    Start-Process "https://vercel.com/new"
}
