# Portfolio Website Deployment Script for Netlify
# Usage: powershell -ExecutionPolicy Bypass -File deploy-netlify.ps1

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "     Portfolio Website - Netlify Deployment Helper" -ForegroundColor Cyan
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

# Step 4: Check Netlify CLI
Write-Host "📋 Step 4: Checking Netlify CLI..." -ForegroundColor Yellow

if (-not (Get-Command netlify -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Netlify CLI not installed." -ForegroundColor Yellow
    $installNetlify = Read-Host "Do you want to install Netlify CLI? (Y/n)"
    
    if ($installNetlify -ne "n" -and $installNetlify -ne "N") {
        npm install -g netlify-cli
        Write-Host "✅ Netlify CLI installed" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Skipping Netlify CLI installation" -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ Netlify CLI found" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "     Deployment Instructions" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Next steps to deploy to Netlify:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Push to GitHub (if not done yet):" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" -ForegroundColor Gray
Write-Host "   git branch -M main" -ForegroundColor Gray
Write-Host "   git push -u origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Go to Netlify Dashboard:" -ForegroundColor White
Write-Host "   https://app.netlify.com/start" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Click 'Import from Git' and select your repository" -ForegroundColor White
Write-Host ""
Write-Host "4. Build settings:" -ForegroundColor White
Write-Host "   Build command: pnpm build" -ForegroundColor Gray
Write-Host "   Publish directory: dist" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Add Environment Variables:" -ForegroundColor White
Write-Host "   DATABASE_URL = mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={`"rejectUnauthorized`":true}" -ForegroundColor Gray
Write-Host "   JWT_SECRET = [Generate a secure random key]" -ForegroundColor Gray
Write-Host "   NODE_ENV = production" -ForegroundColor Gray
Write-Host ""
Write-Host "6. Click Deploy!" -ForegroundColor White
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Alternative: Deploy using Netlify CLI:" -ForegroundColor Yellow
Write-Host "   netlify init" -ForegroundColor Gray
Write-Host "   netlify env:set DATABASE_URL 'YOUR_CONNECTION_STRING'" -ForegroundColor Gray
Write-Host "   netlify env:set JWT_SECRET 'YOUR_SECRET_KEY'" -ForegroundColor Gray
Write-Host "   netlify deploy --prod" -ForegroundColor Gray
Write-Host ""

Write-Host "✅ Your project is ready for deployment!" -ForegroundColor Green
Write-Host ""

# Ask to open Netlify
$openNetlify = Read-Host "Do you want to open Netlify in browser? (Y/n)"
if ($openNetlify -ne "n" -and $openNetlify -ne "N") {
    Start-Process "https://app.netlify.com/start"
}
