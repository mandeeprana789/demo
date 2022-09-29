const user_model = require("../model/user_schema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret_key = "1234"

module.exports = {
  get_home: async (req, res) => {
    try {
      res.render("home")
    } catch (error) {
      console.log(error)
    }
  },
  sign_up: async (req, res) => {
    try {
      res.render("sign_up")
    } catch (error) {
      console.log(error)
    }
  },

  sign_in: async (req, res) => {
    try {

      res.render("sign_in")
    } catch (error) {
      console.log(error)
    }
  },
  courses: async (req, res) => {
    try {

      res.render("courses")
    } catch (error) {
      console.log(error)
    }
  },

  //////signup


  register: async (req, res) => {
    try {
      const { first_name, last_name, username, email, password } = req.body

      const user_create = await user_model.findOne({ email: email })
      if (user_create) {
        res.status(400).json({
          message: "it is already required"
        })
      }
      if (first_name && last_name && username && email && password) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        req.body.password = hash
        const find_user = await user_model.create(req.body)
        const token = jwt.sign({
          data: {
            id: find_user.id
          }
        }, secret_key)
        console.log("find_user")
        user_token = token
        res.redirect('/courses')
        req.flash('flashMessage', { color: 'success', message: 'email already exists' })


      } else {
        res.json({ message: "All fields are required" })
      }

    }
    catch (error) {
      console.log(error)
    }
  },

  ///////login


  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user_login = await user_model.findOne({ email: email })
      if (!user_login) {
        res.status(400).json({
          message: "Email is not valid"
        })
        return
      }
      let compare_password = await bcrypt.compare(password, user_login.password)

      if (compare_password) {
        const token = jwt.sign({
          data: {
            id: user_login.id
          }
        }, secret_key)

        login_token = token

        res.redirect('/courses')
      }
      else (
        res.json({
          message: "password is incorrect"
        })
      )
    } catch (err) {
      res.json(err)
    }
  }

}