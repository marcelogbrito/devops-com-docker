const User = require("../models/userModel")
const bcrypt = require("bcryptjs")

exports.signUp = async (req, res) => {
  const {username, password} = req.body

  try {
    const hashPassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      username,
      password: hashPassword
    })
    req.session.user = newUser
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail'
    })
  }
}

exports.login = async(req, res) => {
  const {username, password} = req.body
  try {
    const user = await User.findOne({
      username
    })

    if(!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'usuario nao encontrado'
      })
    }

    const isCorrect = await bcrypt.compare(password, user.password)

    if(isCorrect) {
      req.session.user = user
      res.status(200).json({
        status: 'success'
      })
    }
    else {
      res.status(400).json({
        status: 'fail',
        message: 'senha ou usuario incorreto'
      })
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail'
    })
  }
}