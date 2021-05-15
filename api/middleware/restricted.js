  /*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */
const jwt = require('jsonwebtoken')
const model = require('../auth/auth-model')

const restricted = () => async (req, res, next) => {
  try {
    const token = req.headers.authorization

    if(!token) {
      return res.status(418).json({
        message: "token required"
      })

      jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "invalid token"
          })
        }

        req.token = decoded
      })

      next()
    } catch (err) {
      next(err)
    }
  }

const hasContent = () => async (req, res, next) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(418).json({
        message: "missing username and/or password"
      })
    }

    next()
  } catch (err) {
    next(err)
  }
}

const checkUsername = () => async (req, res, next) => {
  try {
    const existence = await model.getByUsername(req.body.username)
    if(existence) {
      return res.status(418).json({
        message: "username is unavailable"
      })
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  restricted,
  hasContent,
  checkUsername
}