const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt')
const data = require('./data')

function initPassport(passport) {
  const authenticatUser = async(userName, password, done) => {
    const user = data.users.find(u => u.name === userName)
    if (!user) {
      return done(null, false, {message: 'User not found'})
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user, {message: 'user login ' + userName})
      }
    } catch(e) {
      return done(e)
    }
   
    return done(null, false, {message: 'User not login'})
  }
  passport.use(new LocalStrategy({usernameField: "name"}, authenticatUser))
  passport.serializeUser((user, done) => {
    return done(null, user.name)
  })
  passport.deserializeUser((name, done) => {
    // populate user in rquest
    return done(null, data.users.find(u => u.name === name))
  })
}

module.exports = initPassport