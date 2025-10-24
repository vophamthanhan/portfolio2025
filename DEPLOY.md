# Quick Deployment Guide

## ✅ Database Ready
Your TiDB Cloud database is already set up and populated with data!

**Connection String:**
```
mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={"rejectUnauthorized":true}
```

---

## 🚀 Deploy to Vercel (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Portfolio website ready for deployment"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure Environment Variables:

**Required Variables:**
```
DATABASE_URL=mysql://27URifHhbYG3QpG.root:ixIh4sZ6Ng72EaUD@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/portfolio_db?ssl={"rejectUnauthorized":true}

JWT_SECRET=YOUR_RANDOM_SECRET_HERE
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. Click "Deploy"
6. Wait 2-3 minutes
7. Your site is live! 🎉

---

## 🌐 Deploy to Netlify

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy on Netlify

1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your repository
4. Build settings:
   - **Build command:** `pnpm build`
   - **Publish directory:** `dist`
5. Add Environment Variables (same as Vercel)
6. Click "Deploy site"
7. Your site is live! 🎉

---

## 🔐 Dashboard Access

After deployment, access the dashboard at:
```
https://your-site.vercel.app/dashboard
```

**Password:** `Thanhan1@`

You can change this password in `client/src/pages/Dashboard.tsx` line ~20.

---

## ✅ Post-Deployment Checklist

- [ ] Website loads successfully
- [ ] All sections display correctly (Profile, Projects, Experience, Education, Skills)
- [ ] Dashboard accessible with password
- [ ] Can add/edit/delete content through Dashboard
- [ ] Mobile responsive working
- [ ] SSL certificate active (automatic on Vercel/Netlify)

---

## 🛠️ Troubleshooting

### Database Connection Error
- Check DATABASE_URL is correct
- Ensure SSL parameter is included: `?ssl={"rejectUnauthorized":true}`
- Verify TiDB Cloud cluster is running

### Build Failed
- Check build logs in Vercel/Netlify dashboard
- Ensure all dependencies are in package.json
- Test locally: `pnpm install && pnpm build`

### Dashboard Not Working
- Verify JWT_SECRET is set
- Check browser console for errors
- Try clearing browser cache

---

## 📞 Need Help?

Check the detailed guides:
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `ENV_VARIABLES_GUIDE.md` - Environment variables reference
- `PERFORMANCE.md` - Performance optimization details

---

## 🎯 Your Database Info

- **Host:** gateway01.ap-southeast-1.prod.aws.tidbcloud.com
- **Port:** 4000
- **Database:** portfolio_db
- **User:** 27URifHhbYG3QpG.root
- **Data:** Already imported and ready to use!

