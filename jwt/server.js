import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyToken from './middleware/auth.js';
import cors from 'cors'
const corsOptions ={
   origin:'*', 
   credentials:true,            //fix lỗi CORS policy
   optionSuccessStatus:200,
}

dotenv.config();
const app = express();
app.use(cors(corsOptions))
app.use(express.json())

// fake database

const posts = [
	{
		userId: 1,
		name: 'Do Quang Tu',
		phone: '0392126034'
	},
	{
		userId: 2,
		name: 'Test',
		phone: '0392126034'
	}
]

// app
app.get('/posts', verifyToken, (req, res) => {
	res.json(posts.filter(post => post.userId === req.userId))
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
