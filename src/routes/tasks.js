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
    req.flash('success', 'La tarea ha sido creada');
    res.redirect('/tasks');
});
router.post('/addnota', async (req, res) => {
    const { noted, idUser  } = req.body;
    console.log(idUser);
    const newnote = { 
        nota:noted,
        idUsuario:idUser
    }
    
    await pool.query('INSERT INTO comentarios set ?', [newnote]);
    res.redirect('/tasks/');
})
router.get('/', async (req, res) => {
    const comentarios = await pool.query('SELECT * FROM comentarios AS a NATURAL JOIN usuario AS u NATURAL JOIN comentarios AS c');
    const tasksStatus1 = await pool.query('SELECT * FROM tareas AS a NATURAL JOIN usuario AS u NATURAL JOIN status AS s where idStatus=1');
    const tasksStatus2 = await pool.query('SELECT * FROM tareas AS a NATURAL JOIN usuario AS u NATURAL JOIN status AS s where idStatus=2');
    const tasksStatus3 = await pool.query('SELECT * FROM tareas AS a NATURAL JOIN usuario AS u NATURAL JOIN status AS s where idStatus=3');
    const tasksStatus4 = await pool.query('SELECT * FROM tareas AS a NATURAL JOIN usuario AS u NATURAL JOIN status AS s where idStatus=4');
    res.render('tasks/list', { tasksStatus1, tasksStatus2, tasksStatus3, tasksStatus4, comentarios });
});
router.get('/task/:idTarea', async (req, res) => {
    const {idTarea} = req.params;
    const idTask = await pool.query('SELECT * FROM tareas AS a NATURAL JOIN usuario AS u NATURAL JOIN status AS s WHERE idTarea = ?',[idTarea]);
    const date = await pool.query(`SELECT fechaCreacion FROM tareas WHERE idTarea = ?`, [idTarea] );
    res.render('tasks/taskid', {idTask, date} );
});
router.get('/delete/:idTarea', async (req, res)=>{
    

    const { idTarea } = req.params;
    await pool.query('DELETE FROM tareas WHERE idTarea=?',[idTarea])
    req.flash('success', 'La tarea ha sido eliminada');
    res.redirect('/tasks');
    
});
router.get('/update/:idTarea', async (req, res)=>{
    const {idTarea} = req.params;
     const taskedit = await pool.query('SELECT *FROM tareas AS a NATURAL JOIN usuario AS u NATURAL JOIN status AS s WHERE idTarea = ?', [idTarea]);
     const users = await pool.query('SELECT * FROM usuario');
    res.render('tasks/edit', {taskedit: taskedit[0], users} );
});

router.post('/', async (req, res) => {

    const fechaExpiracion = await pool.query('SELECT descripcion FROM tareas')
    console.log(fechaExpiracion)
    
})

router.post('/update/:idTarea', async (req, res) => {
    const {idTarea} = req.params;
    
    const { date, user, description, importance, status } = req.body;
    console.log(date);
    const upTask = {
        fechaExpiracion:date, 
        idUsuario: user,
        descripcion:description,
        importancia:importance,
        idStatus: status
    }
    await pool.query('UPDATE tareas SET ? WHERE idTarea = ?',[upTask, idTarea]);
    req.flash('success', 'La tarea ha sido actualizada');
    res.redirect('/tasks');
});


module.exports = router;
