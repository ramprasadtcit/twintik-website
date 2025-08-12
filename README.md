# TwinTik - Digital Business Card & AI Twin Platform

A modern SaaS platform for creating and managing digital business cards with AI-powered chatbots and comprehensive analytics.

## 🚀 Features

### Core Features
- **Digital Business Cards** - Create beautiful, customizable digital cards
- **AI Twin Chatbots** - Personalized AI assistants for your business card
- **QR Code Generation** - Easy sharing via QR codes
- **NFC Card Support** - Physical NFC cards for seamless sharing
- **Wallet Integration** - Add cards to Apple Wallet/Google Pay
- **Advanced Analytics** - Track card performance and engagement

### User Types
- **B2C (Individual)** - Personal digital business cards
- **B2B (Organization)** - Team management and organization branding

### Subscription Tiers
- **Freemium** - Basic digital card with limited features
- **Premium** - AI Twin, advanced analytics, NFC support
- **Business** - Team management, organization branding, lead tracking

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: TailwindCSS + Shadcn/UI
- **Routing**: React Router v6
- **State Management**: React Context API
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── cards/          # Digital card components
│   ├── ui/             # Base UI components (Button, Card, Badge)
│   └── ProtectedRoute.tsx
├── context/            # React Context providers
│   └── AuthContext.tsx # Authentication and user state
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # B2C dashboard pages
│   └── org/            # B2B organization pages
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
├── assets/             # Static assets
└── index.css           # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary**: Green (#16a34a, #22c55e)
- **Secondary**: Blue (#3b82f6, #1d4ed8)
- **Accent**: Purple (#8b5cf6, #a855f7)
- **Neutral**: Gray scale (#f9fafb to #111827)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Components
- **Buttons**: Primary, Secondary, Outline, Ghost variants
- **Cards**: Standard, Hover, Gradient variants
- **Forms**: Input fields with validation
- **Badges**: Status and category indicators

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd twintik-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_NAME=TwinTik
VITE_APP_VERSION=1.0.0
VITE_API_URL=http://localhost:3000
```

## 📱 User Flows

### B2C User Journey
1. **Signup** - Create account with email/password
2. **Profile Setup** - Complete profile information
3. **Card Creation** - Customize digital business card
4. **Sharing** - Share via QR code, link, or NFC
5. **Analytics** - Track card performance (Premium)
6. **AI Twin** - Configure chatbot (Premium)

### B2B Organization Journey
1. **Organization Signup** - Create business account
2. **Team Management** - Invite team members
3. **Branding Setup** - Configure organization branding
4. **AI Bot Configuration** - Set up organization-wide chatbot
5. **Lead Management** - Track and manage leads
6. **Analytics** - Organization-wide performance metrics

## 🔐 Authentication

The platform uses a simulated authentication system for development:

### Demo Users
- **john@example.com** - Freemium user
- **mike@enterprise.com** - Premium user  
- **sarah@company.com** - Business user (Organization admin)

### Features
- Email/password authentication
- Role-based access control
- Persistent sessions (localStorage)
- Email verification flow

## 📊 Analytics & Tracking

### Metrics Tracked
- **Views** - Card view count
- **Shares** - Sharing interactions
- **Leads** - Contact form submissions
- **Engagement** - Time spent on card
- **Sources** - Traffic source breakdown
- **Devices** - Device type statistics
- **Locations** - Geographic data

### Data Visualization
- Time-series charts
- Pie charts for source breakdown
- Bar charts for device statistics
- Geographic heatmaps

## 🤖 AI Twin Features

### Configuration Options
- **Personality**: Professional, Friendly, Casual, Formal
- **Knowledge Base**: FAQ upload, document processing
- **Response Style**: Customizable tone and style
- **Integration**: Embeddable chat widget

### Capabilities
- Answer questions about services
- Provide company information
- Handle basic inquiries
- Collect lead information
- Schedule appointments

## 💳 Digital Card Features

### Customization
- **Themes**: Classic Green, Modern Purple, Minimal, Gradient, Dark
- **Colors**: Custom primary and secondary colors
- **Layout**: Flexible card layouts
- **Content**: Rich text, links, social media

### Sharing Options
- **QR Code**: Generated automatically
- **Direct Link**: Shareable URL
- **NFC Cards**: Physical cards for tap-to-share
- **Wallet Apps**: Apple Wallet/Google Pay integration

## 🏢 Organization Features

### Team Management
- **User Invitations** - Email-based invitations
- **Role Assignment** - Admin and Member roles
- **Access Control** - Feature-based permissions
- **Usage Tracking** - Individual user metrics

### Branding & Customization
- **Organization Logo** - Company branding
- **Color Schemes** - Custom brand colors
- **Default Templates** - Pre-configured card designs
- **Brand Guidelines** - Consistent styling

## 📈 Analytics Dashboard

### Individual Analytics (Premium)
- Personal card performance
- Lead tracking
- Engagement metrics
- Traffic source analysis

### Organization Analytics (Business)
- Team-wide performance
- Lead pipeline management
- ROI tracking
- Comparative analytics

## 🔧 API Integration

The platform is designed for easy backend integration:

### Authentication Endpoints
```typescript
POST /api/auth/login
POST /api/auth/signup
POST /api/auth/verify-email
POST /api/auth/logout
```

### User Management
```typescript
GET /api/user/profile
PUT /api/user/profile
POST /api/user/upgrade-plan
```

### Card Management
```typescript
GET /api/cards
POST /api/cards
PUT /api/cards/:id
DELETE /api/cards/:id
```

### Analytics
```typescript
GET /api/analytics/overview
GET /api/analytics/views
GET /api/analytics/leads
GET /api/analytics/sources
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Vercel** - Recommended for React apps
- **Netlify** - Static site hosting
- **AWS S3 + CloudFront** - Scalable hosting
- **Docker** - Containerized deployment

### Environment Configuration
```bash
# Production environment variables
VITE_API_URL=https://api.twintik.com
VITE_APP_ENV=production
VITE_ANALYTICS_ID=your-analytics-id
```

## 🤝 Contributing

### Development Guidelines
1. **Code Style** - Follow TypeScript best practices
2. **Component Structure** - Use functional components with hooks
3. **Type Safety** - Define proper TypeScript interfaces
4. **Documentation** - Add JSDoc comments for functions
5. **Testing** - Write unit tests for utilities

### File Naming Conventions
- **Components**: PascalCase (e.g., `DigitalCard.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `User.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS`)

### Code Organization
- Group related imports with section comments
- Use consistent spacing and indentation
- Add descriptive comments for complex logic
- Separate concerns (UI, logic, data)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- **Email**: support@twintik.com
- **Documentation**: [docs.twintik.com](https://docs.twintik.com)
- **Issues**: [GitHub Issues](https://github.com/twintik/issues)

## 🔮 Roadmap

### Upcoming Features
- **Mobile App** - iOS and Android applications
- **CRM Integration** - Salesforce, HubSpot, Pipedrive
- **Advanced AI** - GPT-4 integration, voice responses
- **White-label** - Custom branding for agencies
- **API Access** - Public API for developers
- **Webhooks** - Real-time event notifications

### Planned Improvements
- **Performance** - Code splitting and lazy loading
- **Accessibility** - WCAG 2.1 compliance
- **Internationalization** - Multi-language support
- **Offline Support** - Progressive Web App features
- **Advanced Analytics** - Machine learning insights
