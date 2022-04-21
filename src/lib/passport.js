const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./handlebars');



passport.use('local.signup', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
},async (req, correo, password, done)=>{
    const {fullname}= req.body;
    const newUser ={
        correoUsuario:correo,
        password,
        nombreUsuario:fullname
    };
    newUser.password = await helpers.encryptPassword(password);
    const resultado = await pool.query('INSERT INTO usuario SET ?', [newUser])
    newUser.idUsuario = resultado.insertId;
    return done(null, newUser);
    }));
    passport.serializeUser((user, done) =>{
            done(null, user.idUsuario );
    });
    passport.deserializeUser(async(idUsuario, done) =>{
       const fila = await pool.query('SELECT * FROM usuario WHERE idUsuario =?', [idUsuario]);
        done(null, fila[0]);
    });
