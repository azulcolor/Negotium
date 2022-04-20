const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helper = require('./helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
},async (req, correo, password, done)=>{
    const {fullname}= req.body;
    const newuser ={
        correoUsuario:correo,
        contraseñaUsuario:password,
        nombreUsuario:fullname
    };
    newuser.contraseñaUsuario = await helper.encryptPassword(password);
    const resultado = await pool.query('INSERT INTO usuario SET ?', [newuser])
    newuser.idUsuario = resultado.insertId;
    return done(null, newuser);

}));
passport.serializeUser(function(user, done) {
    done(null, user.idUsuario);
  });
  
passport.deserializeUser( async(idUsuario, done)=>{
   const rows = await pool.query('SELECT * FROM usuario WHERE IdUsuario = ?'[idUsuario])
    done(null, rows[0]);
});