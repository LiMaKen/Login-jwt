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
let users = [
	{
		id: 1,
		username: 'anh',
		password: "1234",
		refreshToken: null
	},
	{
		id: 2,
		username: 'tu',
		password: "1234",
		refreshToken: null
	}
]

// app

const generateTokens = payload => {
	const { id, username } = payload

	// Create JWT
	const accessToken = jwt.sign(
		{ id, username },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: '5m'
		}
	)

	const refreshToken = jwt.sign(
		{ id, username },
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: '1h'
		}
	)

	return { accessToken, refreshToken }
}

const updateRefreshToken = (username, refreshToken) => {
	users = users.map(user => {
		if (user.username === username)
			return {
				...user,
				refreshToken
			}

		return user
	})
}

app.post('/login', (req, res) => {
	const username = req.body.username
	const password = req.body.password
	const user = users.find(user => user.username === username && user.password === password )

	if (!user) return res.sendStatus(401)

	const tokens = generateTokens(user)
	updateRefreshToken(username, tokens.refreshToken)

	console.log(users)

	res.json(tokens)
})

app.post('/token', (req, res) => {
	const refreshToken = req.body.refreshToken
	if (!refreshToken) return res.sendStatus(401)

	const user = users.find(user => user.refreshToken === refreshToken)
	if (!user) return res.sendStatus(403)

	try {
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

		const tokens = generateTokens(user)
		updateRefreshToken(user.username, tokens.refreshToken)

		res.json(tokens)
	} catch (error) {
		console.log(error)
		res.sendStatus(403)
	}
})

app.delete('/logout', verifyToken, (req, res) => {
	const user = users.find(user => user.id === req.userId)
	updateRefreshToken(user.username, null)

	res.sendStatus(204)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
