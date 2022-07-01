const connection = require('../config/conexion')
const title = 'Cita'


const index = (req, res) => {
    connection.query('SELECT horario.*, ficha.nombre FROM horario INNER JOIN ficha ON ficha.id_ficha = horario.id_ficha', (error, datos) => {
        if(error){
            throw error
        }else{
            res.render('./horarios/index', {title: title, horarios:datos})        
        }
    })
}

const crear = (req, res) => {
    connection.query('SELECT * FROM ficha', (error, datos) => {
        if(error){
            throw error
        }else{
            res.render('./horarios/crear', {title: title, horarios:datos})

        }
    })
}

const editar = (req, res) => {
    const id = req.params.id
    connection.query('SELECT horario.*,  ficha.nombre FROM horario INNER JOIN ficha ON ficha.id_ficha = horario.id_ficha WHERE id_horario= ? ',[id] , (error, results) => {
        if(error){
            throw error
        }else{
            connection.query('SELECT * FROM ficha', (err, result) => {
                if(err){
                    throw err
                }else{
                    res.render('./horarios/editar', {horarios:results[0], ficha:result, title: title})        

                }
            })
        }
    })
}

const eliminar = (req, res) => {
    const id = req.params.id
    // console.log(id)
    
    connection.query('DELETE FROM horario WHERE id_horario = ?', [id], (error, datos) => {
        if(error){
            throw error
        }else{
            res.redirect('/horarios')
        }
    })
}

const guardar = (req,res) => {
    const id_ficha = req.body.nombre
    const medicamento= req.body.medicamento
    const dosis = req.body.dosis
    const motivo=req.body.motivo
    // console.log(id_user, tipo_bono, desc, valor, fecha)
    connection.query('INSERT INTO horario SET ?', {id_ficha,medicamento,dosis,motivo}, (error, datos) => {
        if(error){
            console.log(error)            
        }else{
            res.redirect('/horarios')
        }
    })
    // connection.query('INSERT INTO user SET ?',{user:user, password:password}, (error, results) => {
    //     if(error){
    //         console.error(error)
    //     }else{
    //         res.redirect('/users')
    //     }
    // })
}   

const actualizar = (req, res) => {
    const id = req.body.id
    const medicamento= req.body.medicamento
    const dosis= req.body.dosis
    const motivo= req.body.motivo
    connection.query('UPDATE horario SET ? WHERE id_horario=?', [{medicamento:medicamento,dosis:dosis,motivo:motivo}, id], (error, datos) =>{
        if(error){
            console.error(error)
        }else{
            res.redirect('/horarios')
   
        }
    })
}

const comparacion = (req, res) => {
    res.render('./horarios/comparacion')
}

const resultados = (req, res) => {
    //res.send('comparacion')
    const edad1 = req.body.edad1
    const edad2 = req.body.edad2
    console.log(edad1, edad2)
    
    connection.query("SELECT horario.*, ficha.nombre,ficha.edad,horario.medicamento FROM horario INNER JOIN ficha ON ficha.id_ficha = horario.id_ficha WHERE edad BETWEEN '"+edad1+ "' AND '"+edad2+"'", (error, datos) => {
        if(error){
            throw error
        }else{
            let total = 0
            for(i=0; i<datos.length; i++){
                total = total + parseFloat(datos[i].valor)
            }

            res.render('./horarios/resultados', {datos, total})
        }
    })
}

const comparacionfecha = (req, res) => {
    res.render('./horarios/comparacionfecha')
}

const resultados2 = (req, res) => {
    //res.send('comparacion')
    const fecha1 = req.body.fecha1
    const fecha2 = req.body.fecha2
    console.log(fecha1, fecha2)
    
    connection.query("SELECT horario.*, date(ficha.fecha_nacimiento) as fecha_format, ficha.nombre, ficha.fecha_nacimiento, ficha.edad, horario.medicamento, horario.motivo FROM horario INNER JOIN ficha ON ficha.id_ficha = horario.id_ficha WHERE fecha_nacimiento BETWEEN '"+fecha1+ "' AND '"+fecha2+"'", (error, datos) => {
        if(error){
            throw error
        }else{
            let total = 0
            for(i=0; i<datos.length; i++){
                total = total + parseFloat(datos[i].valor)
            }

            res.render('./horarios/resultados2', {datos, total})
        }
    })
}




module.exports = {
    index,
    crear,
    editar,
    eliminar,
    guardar,
    actualizar,
    comparacion,
    resultados,
    comparacionfecha,
    resultados2
}