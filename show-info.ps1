# Portfolio Website - Quick Info Display
# Usage: powershell -ExecutionPolicy Bypass -File show-info.ps1

Clear-Host

Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        PORTFOLIO WEBSITE - DEPLOYMENT INFORMATION         ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ PROJECT STATUS: " -ForegroundColor Green -NoNewline
Write-Host "READY TO DEPLOY!" -ForegroundColor White
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray

Write-Host ""
Write-Host "📊 DATABASE INFORMATION" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "Platform:  " -ForegroundColor White -NoNewline
Write-Host "TiDB Cloud" -ForegroundColor Cyan
Write-Host "Host:      " -ForegroundColor White -NoNewline
Write-Host "gateway01.ap-southeast-1.prod.aws.tidbcloud.com" -ForegroundColor Gray
Write-Host "Port:      " -ForegroundColor White -NoNewline
Write-Host "4000" -ForegroundColor Gray
Write-Host "Database:  " -ForegroundColor White -NoNewline
Write-Host "portfolio_db" -ForegroundColor Gray
Write-Host "Status:    " -ForegroundColor White -NoNewline
Write-Host "✅ Connected & Migrated" -ForegroundColor Green
Write-Host ""

Write-Host "🚀 DEPLOYMENT OPTIONS" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

Write-Host "Option 1: " -ForegroundColor White -NoNewline
Write-Host "Vercel (Recommended)" -ForegroundColor Green
Write-Host "         Run: " -NoNewline
Write-Host "powershell -ExecutionPolicy Bypass -File deploy-vercel.ps1" -ForegroundColor Cyan
Write-Host ""

Write-Host "Option 2: " -ForegroundColor White -NoNewline
Write-Host "Netlify" -ForegroundColor Green
Write-Host "         Run: " -NoNewline
Write-Host "powershell -ExecutionPolicy Bypass -File deploy-netlify.ps1" -ForegroundColor Cyan
Write-Host ""

Write-Host "Option 3: " -ForegroundColor White -NoNewline
Write-Host "Manual Deployment" -ForegroundColor Green
Write-Host "         See: " -NoNewline
Write-Host "HUONG_DAN_TRIEN_KHAI.md" -ForegroundColor Cyan
Write-Host ""

Write-Host "📝 ENVIRONMENT VARIABLES REQUIRED" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "✓ DATABASE_URL" -ForegroundColor Green -NoNewline
Write-Host " (Already configured in .env)" -ForegroundColor Gray
Write-Host "✓ JWT_SECRET" -ForegroundColor Green -NoNewline
Write-Host "   (Generate new for production)" -ForegroundColor Gray
Write-Host ""

Write-Host "🔐 Generate JWT Secret:" -ForegroundColor White
Write-Host '$bytes = New-Object byte[] 32; [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes); [Convert]::ToBase64String($bytes)' -ForegroundColor DarkGray
Write-Host ""

Write-Host "📚 DOCUMENTATION FILES" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "• " -NoNewline
Write-Host "READY_TO_DEPLOY.md       " -ForegroundColor Cyan -NoNewline
Write-Host "- Complete deployment status" -ForegroundColor Gray
Write-Host "• " -NoNewline
Write-Host "HUONG_DAN_TRIEN_KHAI.md  " -ForegroundColor Cyan -NoNewline
Write-Host "- Detailed Vietnamese guide" -ForegroundColor Gray
Write-Host "• " -NoNewline
Write-Host "QUICK_REFERENCE.txt      " -ForegroundColor Cyan -NoNewline
Write-Host "- Quick reference card" -ForegroundColor Gray
Write-Host "• " -NoNewline
Write-Host "README_VI.md             " -ForegroundColor Cyan -NoNewline
Write-Host "- Vietnamese README" -ForegroundColor Gray
Write-Host ""

Write-Host "🛠️ QUICK COMMANDS" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "pnpm dev     " -ForegroundColor Cyan -NoNewline
Write-Host "- Start development server" -ForegroundColor Gray
Write-Host "pnpm build   " -ForegroundColor Cyan -NoNewline
Write-Host "- Build for production" -ForegroundColor Gray
Write-Host "pnpm start   " -ForegroundColor Cyan -NoNewline
Write-Host "- Run production server" -ForegroundColor Gray
Write-Host "pnpm db:push " -ForegroundColor Cyan -NoNewline
Write-Host "- Run database migrations" -ForegroundColor Gray
Write-Host ""

Write-Host "✨ TECH STACK" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host "Frontend:  " -ForegroundColor White -NoNewline
Write-Host "React 19, Vite 7, TailwindCSS 4, Shadcn UI" -ForegroundColor Gray
Write-Host "Backend:   " -ForegroundColor White -NoNewline
Write-Host "Express, tRPC, Drizzle ORM" -ForegroundColor Gray
Write-Host "Database:  " -ForegroundColor White -NoNewline
Write-Host "TiDB Cloud (MySQL compatible)" -ForegroundColor Gray
Write-Host "Auth:      " -ForegroundColor White -NoNewline
Write-Host "JWT" -ForegroundColor Gray
Write-Host ""

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""
Write-Host "🎉 Everything is ready! Choose a deployment option above to start!" -ForegroundColor Green
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Gray
Write-Host ""

# Pause to let user read
Read-Host "Press Enter to exit"
