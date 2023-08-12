import path from 'path';
import express from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import lessonRoutes from './routes/lesson';
import bookingRoutes from './routes/booking';
import planRoutes from './routes/plan';

dotenv.config();
const app = express();

app.use(fileUpload({}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/plans', planRoutes);

// Serve web-app content
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../web-app/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../web-app/build/index.html'));
  });
}

const DEFAULT_PORT = 3001;
app.listen(process.env.PORT || DEFAULT_PORT, () => {
  console.log('Server running');
});