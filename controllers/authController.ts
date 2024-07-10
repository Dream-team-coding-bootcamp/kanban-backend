import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.ts'
import dotenv from 'dotenv'

dotenv.config()

export const register = async (req, res) => {
  const { username, email, password } = req.body
  const hashedPassword = bcrypt.hashSync(password, 10)
  try {
    const { user_id } = await User.create({ username, email, hashedPassword })

    res.tson({ user_id })
  } catch (err) {
    console.log(err)
    res.status(500).tson({ error: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.getByEmail({ email })
    if (!user) return res.status(400).tson({ error: 'Invalid email or password' })

    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) return res.status(400).tson({ error: 'Invalid email or password' })

    const token = jwt.sign({ id: user.user_id }, process.env.TOKEN_SECRET, { expiresIn: '3h' })

    res.tson({ token })
  } catch (err) {
    res.status(500).tson({ error: err.message })
  }
}

export const update = async (req, res) => {
  const { id } = req.user
  const { username } = req.body

  try {
    const user = await User.updateName({ id, username })
    res.tson(user)
  } catch (err) {
    res.status(500).tson({ error: err.message })
  }
}
