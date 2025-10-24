# Quick Deploy to Vercel Script
# This will open Vercel import page directly for your repository

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Portfolio 2025 - Vercel Deployment" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
Write-Host "   Repository: https://github.com/vophamthanhan/portfolio2025" -ForegroundColor Gray
Write-Host ""

Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Browser will open Vercel in a moment..." -ForegroundColor White
Write-Host "2. Login with your GitHub account" -ForegroundColor White
Write-Host "3. Import the 'portfolio2025' repository" -ForegroundColor White
Write-Host "4. Add these Environment Variables:" -ForegroundColor White
Write-Host ""
Write-Host "   DATABASE_URL =" -ForegroundColor Cyan -NoNewline
Write-Host " mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={`"rejectUnauthorized`":true}" -ForegroundColor Gray
Write-Host ""
Write-Host "   JWT_SECRET =" -ForegroundColor Cyan -NoNewline
Write-Host " [Generate a random secure key]" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Click Deploy!" -ForegroundColor White
Write-Host ""

Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "💡 Tip: To generate JWT_SECRET, run:" -ForegroundColor Yellow
Write-Host '$bytes = New-Object byte[] 32; [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes); [Convert]::ToBase64String($bytes)' -ForegroundColor DarkGray
Write-Host ""

Write-Host "📖 Full guide: DEPLOY_TO_VERCEL.md" -ForegroundColor White
Write-Host ""

Write-Host "Opening Vercel in 3 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Open Vercel new project page
Start-Process "https://vercel.com/new"

Write-Host ""
Write-Host "✅ Browser opened! Follow the steps above." -ForegroundColor Green
Write-Host ""
Write-Host "Press Enter to exit..." -ForegroundColor Gray
Read-Host
