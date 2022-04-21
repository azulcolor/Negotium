const { use } = require('passport');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./handlebars');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, correo, password, done )=>{
    
    const rows = await pool.query('SELECT * FROM usuario WHERE correoUsuario =?',[correo])
    
    if (rows.length > 0){
        const user = rows[0];
        
        const validPassword = await helpers.matchPassword(password, user.password);
        
        if(validPassword){
            done(null, user, req.flash('success','welcome' + user.nombreUsuario));

        }
        else{
            done(null, false, req.flash('message','contraseña incorrecta'));
        }
    }
    else{
        return done(null, false, req.flash('message','El usuario no existe'));
    }
}));

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
    const mail = newUser.correoUsuario;
    const valid = await pool.query('SELECT * FROM usuario WHERE correoUsuario =?',[mail]);
    if(valid.length>0){
        return done(null, false, req.flash('message', 'El usuario ya existe'));
    }
    else{
        console.log(valid);
        const resultado = await pool.query('INSERT INTO usuario SET ?', [newUser])
        newUser.idUsuario = resultado.insertId;
        return done(null, newUser);
    }
    
    }));

    passport.serializeUser((user, done) =>{
            done(null, user.idUsuario );
    });

    passport.deserializeUser(async(idUsuario, done) =>{
       const fila = await pool.query('SELECT * FROM usuario WHERE idUsuario =?', [idUsuario]);
        done(null, fila[0]);
    });
