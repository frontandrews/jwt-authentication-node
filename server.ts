import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import { verifyToken } from './middleware';

const app = express();

app.use(bodyParser.json());

// Public routes
app.use('/api/auth', routes);

// Protected routes
app.get('/api/protected', verifyToken, (req, res) => {
  res.status(200).send("This is a protected route!");
});
const PORT = 4000
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});