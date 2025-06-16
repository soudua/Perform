import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/users.js';
import informationRoutes from './routes/information.js';
import clientsRoutes from './routes/clients.js';
import absencesRoutes from './routes/absences.js';
import { initDb } from './routes/db.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Configure CORS for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174', 
      'http://localhost:5175',
      'http://localhost:3000',
      'https://pfe-duarte.onrender.com',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json()); // to parse JSON body

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'PerformPass API Server',
    status: 'running',
    endpoints: ['/api/users', '/api/information', '/api/clients', '/api/absences']
  });
});

app.use('/api/users', usersRoutes);
app.use('/api/information', informationRoutes);
app.use('/api/clients', clientsRoutes);
app.use('/api/absences', absencesRoutes);

async function forceAdminPasswordReset() {
  if (process.env.NODE_ENV === 'production') {
    console.log('🔧 Force resetting admin password in production...');
    
    try {
      const { getDb } = await import('./routes/db.js');
      const bcrypt = await import('bcrypt');
      
      const db = await getDb();
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await db.run('UPDATE utilizadores SET password = ? WHERE email = ?', 
                   [hashedPassword, 'suporte@grupoerre.pt']);
      
      console.log('✅ Admin password force-updated to: admin123');
      await db.close();
    } catch (error) {
      console.error('❌ Failed to force-update admin password:', error);
    }
  }
}

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database
    await initDb();
    console.log('✅ Database initialized successfully');
    
    // Force admin password reset if in production
    await forceAdminPasswordReset();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server running on http://0.0.0.0:${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
}

startServer().catch(console.error);

export default app;
