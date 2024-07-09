import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const auth = (req, res, next) => {
  const authorization = req.headers.authorization

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    const token = authorization.split(' ')[1]

    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET)

      req.user = verified

      next()
    } catch (err) {
      res.status(400).send('Invalid Token')
    }
  } else {
    res.status(401).send({ error: 'Unauthorized' })
  }
}

export default auth
