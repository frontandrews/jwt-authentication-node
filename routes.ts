import express from 'express';
import db from './db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type User = {
    id: number;
    username: string;
    password: string;
};

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function(err) {
    if (err) return res.status(500).send("Error registering user.");

    const token = jwt.sign({ id: this.lastID }, 'supersecret', { expiresIn: 86400 });  // Expires in 24 hours
    res.status(200).send({ auth: true, token: token });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user: User) => {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, 'supersecret', { expiresIn: 86400 });
    res.status(200).send({ auth: true, token: token });
  });
});

export default router;
