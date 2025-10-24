#!/bin/bash

# Portfolio Website - Quick Deployment Check
# This script checks if your project is ready for deployment

echo "========================================"
echo "  Portfolio Deployment Readiness Check"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PASSED=0
FAILED=0

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Found $NODE_VERSION"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Not found"
    ((FAILED++))
fi

# Check pnpm
echo -n "Checking pnpm... "
if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm --version)
    echo -e "${GREEN}✓${NC} Found v$PNPM_VERSION"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Not found"
    ((FAILED++))
fi

# Check Git
echo -n "Checking Git... "
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✓${NC} Found"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Not found"
    ((FAILED++))
fi

# Check .env file
echo -n "Checking .env file... "
if [ -f .env ]; then
    echo -e "${GREEN}✓${NC} Found"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Not found"
    ((FAILED++))
fi

# Check DATABASE_URL
echo -n "Checking DATABASE_URL... "
if [ -f .env ] && grep -q "DATABASE_URL=" .env; then
    echo -e "${GREEN}✓${NC} Configured"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Not configured"
    ((FAILED++))
fi

# Check node_modules
echo -n "Checking dependencies... "
if [ -d node_modules ]; then
    echo -e "${GREEN}✓${NC} Installed"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠${NC} Not installed (run: pnpm install)"
    ((FAILED++))
fi

# Test build
echo -n "Testing build... "
if pnpm build > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Build successful"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Build failed"
    ((FAILED++))
fi

echo ""
echo "========================================"
echo "Results: ${GREEN}$PASSED passed${NC}, ${RED}$FAILED failed${NC}"
echo "========================================"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ Your project is ready for deployment!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Push to GitHub"
    echo "2. Deploy to Vercel or Netlify"
    echo "3. Add environment variables on hosting platform"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Please fix the issues above before deploying${NC}"
    echo ""
    exit 1
fi
