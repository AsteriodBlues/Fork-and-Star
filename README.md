# 🍴⭐ Fork & Star

**Premium Restaurant Recommendation System**

A sophisticated full-stack application that provides personalized restaurant recommendations using advanced machine learning algorithms and BigQuery data analytics.

## 🌟 Features

- **AI-Powered Recommendations**: Advanced machine learning with voice search support and similarity score matrices
- **10 Culinary Journey Portals**: Immersive cultural experiences with soundscapes (expanding collection)
- **Interactive Global Discovery**: 2D country hotspots with momentum scaling + 3D globe with interactive county points
- **Trending Restaurant Intelligence**: Real-time trending analysis and geographic discovery with search radius
- **Smart Favorites System**: Curated constellation of your taste universe with confetti celebrations
- **Comprehensive Analytics Dashboard**: Market intelligence, investment insights, and sustainability metrics
- **Advanced Exploration Tools**: Multi-dimensional filtering with beautiful loading screens
- **Awards & Recognition Database**: World's Top 50, Michelin Stars, Green Stars, Bib Gourmand selections
- **Sustainability Intelligence**: Global green scores, growth rates, and country sustainability rankings
- **Beautiful UI/UX**: Soundscapes, confetti effects, and magical portal experiences# 🍴⭐ Fork & Star

**Premium Restaurant Recommendation System**

A sophisticated full-stack application that provides personalized restaurant recommendations using advanced machine learning algorithms and BigQuery data analytics.

## 🌟 Features

- **AI-Powered Recommendations**: Advanced machine learning with voice search support and similarity score matrices
- **10 Culinary Journey Portals**: Immersive cultural experiences with soundscapes (expanding collection)
- **Interactive Global Discovery**: 2D country hotspots with momentum scaling + 3D globe with interactive county points
- **Trending Restaurant Intelligence**: Real-time trending analysis and geographic discovery with search radius
- **Smart Favorites System**: Curated constellation of your taste universe with confetti celebrations
- **Comprehensive Analytics Dashboard**: Market intelligence, investment insights, and sustainability metrics
- **Advanced Exploration Tools**: Multi-dimensional filtering with beautiful loading screens
- **Awards & Recognition Database**: World's Top 50, Michelin Stars, Green Stars, Bib Gourmand selections
- **Sustainability Intelligence**: Global green scores, growth rates, and country sustainability rankings
- **Beautiful UI/UX**: Soundscapes, confetti effects, and magical portal experiences

## 🏗️ Architecture

```
Fork & Star/
├── backend/                 # FastAPI Python backend
│   ├── app/
│   │   ├── routers/        # API routes (restaurants, recommendations)
│   │   ├── models/         # Database models
│   │   ├── crud/           # Database operations
│   │   └── main.py         # FastAPI application
│   └── requirements.txt
├── frontend/               # Next.js React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Next.js pages
│   │   ├── utils/          # API utilities
│   │   └── data/           # Mock data and types
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.8+**
- **Node.js 18+**
- **Google Cloud BigQuery** access
- **Git**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fork-and-star
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend/fork_and_star_backend
   ```

3. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up BigQuery credentials**
   - Place your Google Cloud service account JSON file in `secrets/`
   - Create a `.fork_env` file with your credentials and configuration:
     ```
     GOOGLE_APPLICATION_CREDENTIALS=secrets/your-service-account-key.json
     GOOGLE_CLOUD_PROJECT_ID=your-project-id
     BIGQUERY_DATASET_ID=your_dataset_name
     BIGQUERY_TABLE_ID=your_restaurants_table
     BIGQUERY_RECOMMENDATIONS_TABLE=your_recommendations_table
     ```

6. **Start the backend server**
   ```bash
   uvicorn main:app --reload --host 127.0.0.1 --port 8000
   ```

   The API will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend/fork-and-star-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 📊 API Endpoints

### Restaurants
- `GET /restaurants/` - List restaurants with filtering
- `GET /restaurants/{id}` - Get specific restaurant
- `POST /restaurants/` - Create new restaurant
- `PUT /restaurants/{id}` - Update restaurant
- `DELETE /restaurants/{id}` - Delete restaurant

### Recommendations
- `GET /recommendations/` - Get personalized recommendations
- `GET /recommendations/similar/{restaurant_id}` - Find similar restaurants
- `GET /recommendations/by-cuisine` - Recommendations by cuisine
- `GET /recommendations/trending` - Trending restaurants
- `GET /recommendations/nearby` - Location-based recommendations

### Utility
- `GET /health` - API health check
- `GET /tags` - Get all available filter tags
- `GET /search` - Fuzzy search across restaurants

## 🎨 Frontend Features

### 🎵 Immersive Experience
- **Culinary Journey Portals**: 10 magical portals (expanding) with authentic soundscapes
  - Cultural deep-dives with historical context and ambient audio
  - Traditional cooking technique showcases with sound design
  - Local ingredient and spice guides with sensory experiences
  - Regional storytelling with immersive audio landscapes

### 🌍 Global Discovery Experience
- **2D Country Hotspots**: Interactive map with momentum-scaled restaurant density
- **3D Globe Visualization**: 
  - Interactive county-level restaurant points
  - Real-time data overlays and clustering
  - Smooth zoom and rotation with React Three Fiber
- **Geographic Discovery**: 
  - Search radius functionality for nearby restaurant discovery
  - "More like this" recommendations for every suggested restaurant
  - Location-based trending analysis

### 🤖 Advanced AI Recommendations
- **Voice Search Support**: Natural language restaurant discovery
- **Similarity Score Matrix**: Detailed matching algorithms with transparency
- **Dual Recommendation Engine**:
  - Similar restaurants with percentage matching
  - Diverse recommendations for culinary exploration
- **Contextual Intelligence**: Seasonal, trending, and proximity-based suggestions

### 📊 Comprehensive Analytics Dashboard
- **Cuisine Intelligence**:
  - Regional cuisine variations and evolution tracking
  - Chef spotlight features and culinary stories
  - Flavor profile analysis and trend prediction
- **Market Intelligence**:
  - Investment potential analysis with ROI projections
  - High opportunity zones identification
  - Underserved market gap analysis (High/Medium/Low potential)
- **Sustainability Analytics**:
  - Global green score tracking and growth rates
  - Total green star awards database
  - Country sustainability rankings and benchmarks

### 🏆 Awards & Recognition System
- **World's Top 50**: Curated collection of globally acclaimed restaurants
- **Michelin Stars**: Complete database with detailed restaurant profiles
- **Green Stars**: Sustainability-focused dining experiences
- **Bib Gourmand**: Value-focused quality dining selections
- **Value Analysis**: Price-to-quality ratio insights and recommendations

### ⭐ Smart Favorites Universe
- **Taste Constellation**: Visual representation of your culinary preferences
  - Cuisine distribution mapping
  - Star rating preference patterns
  - Green sustainability tracking
  - Geographic dining exploration history
- **Curated Experience**: Personalized data insights with beautiful visualizations
- **Export & Sharing**: Trip planning and collaborative list features

### 🎨 Beautiful UI/UX Features
- **Header Navigation**: Elegantly designed buttons for Explore, AI Recs, Favs, Analytics
- **Loading Experiences**: Custom loading screens for Analytics Dashboard and Favorites
- **Confetti Celebrations**: Delightful animations when favoriting restaurants
- **Trending Highlights**: Real-time trending restaurant showcase in Explore section
- **Advanced Filtering**: Multi-dimensional search with instant results
- **Responsive Design**: Seamless experience across all devices

### 🔊 Audio & Interactive Elements
- **Soundscape Integration**: Ambient audio for different culinary cultures with built-in music player
- **Beautiful Animations**: Fluid animations with micro-interactions that respond to user behavior
- **Interactive Elements**: Smooth transitions and responsive visual feedback
- **Haptic Feedback**: Enhanced mobile experience with tactile responses
- **Color Psychology**: Thoughtfully designed color palettes that evoke appetite and culinary excitement

## 🔧 Configuration

### Environment Variables

**Backend (.env or .fork_env)**
```env
GOOGLE_APPLICATION_CREDENTIALS=secrets/your-service-account-key.json
GOOGLE_CLOUD_PROJECT_ID=your-project-id
BIGQUERY_DATASET_ID=your_dataset_name
BIGQUERY_TABLE_ID=your_restaurants_table
BIGQUERY_RECOMMENDATIONS_TABLE=your_recommendations_table
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### BigQuery Setup

The application uses Google BigQuery as the primary database:

- **Project**: Set via `GOOGLE_CLOUD_PROJECT_ID` environment variable
- **Dataset**: Set via `BIGQUERY_DATASET_ID` environment variable  
- **Main Tables**: 
  - Restaurant data table - Set via `BIGQUERY_TABLE_ID` environment variable
  - Recommendations table - Set via `BIGQUERY_RECOMMENDATIONS_TABLE` environment variable

## 📦 Dependencies

### Backend Technologies
- **FastAPI** - Modern Python web framework with automatic API documentation
- **Python 3.8+** - Core backend language
- **Google Cloud BigQuery** - Primary data warehouse and analytics database
- **Google Cloud BigQuery Client** - Direct BigQuery integration and querying
- **Uvicorn** - High-performance ASGI server
- **Pydantic** - Data validation and serialization
- **python-dotenv** - Environment variable management
- **Google OAuth2** - Authentication and service account management

### Database & Analytics
- **BigQuery** - Petabyte-scale data warehouse
- **SQL** - Complex queries for restaurant recommendations and analytics
- **Machine Learning Integration** - Custom algorithms for similarity scoring
- **Real-time Analytics** - Dynamic trending and momentum calculations

### API Features
- **CORS Middleware** - Cross-origin resource sharing
- **Automatic API Documentation** - FastAPI-generated OpenAPI/Swagger docs
- **Health Monitoring** - Built-in endpoint monitoring and diagnostics
- **RESTful Architecture** - Clean, predictable API design

### Frontend Technologies
- **React 19** - Latest React with concurrent features
- **Next.js 15** - React framework with SSR/SSG capabilities
- **TypeScript 5** - Full type safety across the entire frontend codebase
- **Tailwind CSS 4** - Utility-first styling with custom design system

### Type Safety & Development
- **TypeScript 5** - Complete type coverage for enhanced developer experience
- **@types/node** - Node.js type definitions
- **@types/react** - React type definitions  
- **@types/react-dom** - React DOM type definitions
- **@types/three** - Three.js type definitions for 3D development
- **Strict Type Checking** - Zero `any` types policy for maximum safety

### 3D Graphics & Animation
- **React Three Fiber** - 3D graphics and interactive globe visualization
- **React Three Drei** - Advanced 3D components and utilities
- **React Three Postprocessing** - Advanced visual effects and shaders
- **Three.js** - Core 3D graphics library
- **GSAP** - Professional animation library for complex sequences
- **Framer Motion** - React animation library for smooth UX

### UI Components & Design
- **Radix UI** - Accessible component primitives (Dialog, Dropdown, Select, etc.)
- **shadcn/ui** - Beautiful component library built on Radix
- **Lucide React** - Modern icon library
- **Lottie React** - After Effects animations in React

### Audio & Interactive Effects
- **use-sound** - React hooks for audio playback
- **Canvas Confetti** - Celebration animations and particle effects
- **Party.js** - Advanced particle systems and effects

### Data & State Management
- **TanStack Query** - Data fetching, caching, and synchronization
- **TanStack Query DevTools** - Development tools for debugging
- **Zustand** - Lightweight state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation library

### Smooth Scrolling & Performance
- **Lenis** - Smooth scrolling library
- **@studio-freight/lenis** - Enhanced smooth scrolling
- **React Loading Skeleton** - Beautiful loading placeholders

### Particles & Visual Effects
- **@tsparticles/engine** - Particle system engine
- **@tsparticles/react** - React integration for particles
- **React Globe.gl** - Interactive 3D globe component

### Utilities & Helpers
- **clsx** - Conditional className utility
- **tailwind-merge** - Tailwind class merging utility
- **React Hot Toast** - Beautiful toast notifications
- **Sonner** - Modern toast notification system

### Development Tools
- **ESLint 9** - Code linting and quality
- **@eslint/eslintrc** - ESLint configuration
- **@tailwindcss/postcss** - Tailwind PostCSS integration

## 🧪 Development

### Running Tests
```bash
# Backend tests
cd backend && python -m pytest

# Frontend tests
cd frontend && npm test
```

### Code Formatting
```bash
# Backend
black . && isort .

# Frontend
npm run lint && npm run format
```

### Building for Production
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm run build
npm start
```

## 🚀 Deployment

### Backend Deployment
```bash
# Using Docker
docker build -t fork-star-backend .
docker run -p 8000:8000 fork-star-backend

# Or deploy to your preferred cloud platform
# (Google Cloud Run, AWS Lambda, Azure Functions, etc.)
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy the built files to your hosting platform
# The build output will be in the .next folder
```

## 🐳 Docker Support

This project is fully containerized with Docker, allowing for consistent development and production environments. Use Docker Compose to build and run the entire application stack with a single command.

## 📈 Performance

- **Backend**: ~100ms average response time
- **Frontend**: Lighthouse score 95+ for performance
- **Database**: Optimized BigQuery queries with indexing
- **Caching**: React Query for frontend data caching

## 🛡️ Security

- **CORS**: Configured for development and production
- **Input Validation**: Pydantic models for API validation
- **Environment Variables**: Sensitive data in environment files
- **BigQuery IAM**: Proper service account permissions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## > 🚀 Future Plans

Additional features and improvements are continuously being developed and will be released in future updates.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- **Google Cloud BigQuery** - Data storage and analytics
- **Michelin Guide** - Restaurant rating standards
- **Various Restaurant APIs** - Data sources
- **Open Source Community** - Amazing tools and libraries

## 📞 Support

For questions about this project, please open an issue on GitHub.

---

**Built with ❤️ for food lovers and tech enthusiasts**
