const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', async function (req, res) {
    const users = await pool.query('SELECT * FROM usuario')
    res.render('tasks/add', {users});
})

router.post('/add', async (req, res) => {
    const { taskName, date, user, description, importance } = req.body;
    const newTask = { 
        
        tarea:taskName, 
        fechaExpiracion:date, 
        idUsuario: user,
        descripcion:description,
        importancia:importance,
        idStatus: 1
    }
    
    await pool.query('INSERT INTO tareas set ?', [newTask]);
    res.send('received');
})

router.get('/', async (req, res) => {
    const tasks = await pool.query('SELECT * FROM tareas AS a NATURAL JOIN usuario AS u NATURAL JOIN status AS s');
    res.render('tasks/list', { tasks })
})

module.exports = router;