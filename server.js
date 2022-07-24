if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const passport = require('passport')
const passportInit = require('./passport-init')
const session = require('express-session')
const flash = require('express-flash')
const data = require('./data')
const bcrypt = require('bcrypt')


passportInit(passport)
app.set("view-engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  res.render('index.ejs', {user: req.user})
})

app.get("/login", (req, res) => {
  res.render('login.ejs')
})
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))
app.get("/register", (req, res) => {
  res.render('register.ejs')
})

app.post("/register", async (req, res) => {
  data.users.push({
    name: req.body.name,
    password: await bcrypt.hash(req.body.password, 10)
  })
  return res.redirect('/login')
})
  

app.listen(3000)