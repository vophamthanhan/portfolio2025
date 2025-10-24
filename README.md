# Portfolio Website - Vo Pham Thanh An

Modern portfolio website built with React, TypeScript, Tailwind CSS, and TiDB Cloud database.

## ✨ Features

- 🎨 Modern UI design with animations
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔐 Password-protected admin dashboard
- ✏️ Full CRUD operations for all content
- 🖼️ Image upload support
- 🗄️ TiDB Cloud MySQL database
- ⚡ Optimized performance with caching
- 🚀 Ready to deploy on Vercel/Netlify

## 🗄️ Database

This project uses **TiDB Cloud** (MySQL-compatible serverless database).

**Your Database:**
- Host: `gateway01.ap-southeast-1.prod.aws.tidbcloud.com`
- Port: `4000`
- Database: `portfolio_db`
- Status: ✅ Already set up and populated with your CV data

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.production.template .env

# Update .env with your database credentials (already provided)

# Start development server
pnpm dev
```

Visit http://localhost:3000

### Dashboard Access

- URL: http://localhost:3000/dashboard
- Password: `Thanhan1@`

## 📦 Deployment

See [DEPLOY.md](./DEPLOY.md) for step-by-step deployment instructions.

**Quick Deploy:**

1. Push to GitHub
2. Import to Vercel/Netlify
3. Add environment variables:
   - `DATABASE_URL` (TiDB Cloud connection string)
   - `JWT_SECRET` (generate a random secret)
4. Deploy!

## 🛠️ Tech Stack

**Frontend:**
- React 19
- TypeScript
- Tailwind CSS 4
- Vite
- tRPC for type-safe APIs
- React Query for data fetching

**Backend:**
- Express.js
- tRPC
- Drizzle ORM
- TiDB Cloud (MySQL)

**Deployment:**
- Vercel / Netlify
- TiDB Cloud Serverless

## 📁 Project Structure

```
portfolio-website/
├── client/              # Frontend React app
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # Reusable components
│   │   ├── lib/        # Utilities
│   │   └── index.css   # Global styles
├── server/              # Backend Express + tRPC
│   ├── routers.ts      # API endpoints
│   ├── db.ts           # Database queries
│   └── _core/          # Core server logic
├── drizzle/             # Database schema
│   └── schema.ts       # Table definitions
└── shared/              # Shared types
```

## 🎯 Content Management

All content can be managed through the Dashboard:

- **Profile**: Name, title, bio, location, contact info
- **Projects**: Title, description, images, categories, tags
- **Experience**: Company, position, dates, description
- **Education**: Institution, degree, dates
- **Skills**: Hard skills and soft skills

## 🔒 Security

- Password-protected dashboard
- JWT-based sessions
- SSL/TLS encryption for database
- Environment variables for secrets
- Security headers configured

## 📊 Performance

- Lazy loading for images
- React Query caching (5 min stale time)
- Optimized bundle size
- Fast page loads

## 📝 Documentation

- [DEPLOY.md](./DEPLOY.md) - Deployment guide
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed deployment instructions
- [ENV_VARIABLES_GUIDE.md](./ENV_VARIABLES_GUIDE.md) - Environment variables reference
- [PERFORMANCE.md](./PERFORMANCE.md) - Performance optimization details

## 🤝 Support

For issues or questions:
1. Check the documentation files
2. Review deployment logs
3. Verify environment variables
4. Test database connection

## 📄 License

MIT License - feel free to use for your own portfolio!

---

**Built with ❤️ by Vo Pham Thanh An**

