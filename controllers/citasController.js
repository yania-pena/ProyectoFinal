const connection = require('../config/conexion')
const title = 'Cita'


const index = (req, res) => {
    connection.query('SELECT cita.*, date(cita.fecha) as fecha_format, ficha.nombre FROM cita INNER JOIN ficha ON ficha.id_ficha = cita.id_ficha', (error, datos) => {
        if(error){
            throw error
        }else{
            res.render('./citas/index', {title: title, citas:datos})        
        }
    })
}

const crear = (req, res) => {
    connection.query('SELECT * FROM ficha', (error, datos) => {
        if(error){
            throw error
        }else{
            res.render('./citas/crear', {title: title, citas:datos})

        }
    })
}

const editar = (req, res) => {
    const id = req.params.id
    connection.query('SELECT cita.*, date(cita.fecha) as fecha_format, ficha.nombre FROM cita INNER JOIN ficha ON ficha.id_ficha = cita.id_ficha WHERE id= ? ',[id] , (error, results) => {
        if(error){
            throw error
        }else{
            connection.query('SELECT * FROM ficha', (err, result) => {
                if(err){
                    throw err
                }else{
                    res.render('./citas/editar', {citas:results[0], ficha:result, title: title})        

                }
            })
        }
    })
}

const eliminar = (req, res) => {
    const id = req.params.id
    // console.log(id)
    
    connection.query('DELETE FROM cita WHERE id_ficha = ?', [id], (error, datos) => {
        if(error){
            throw error
        }else{
            res.redirect('/citas')
        }
    })
}

const guardar = (req,res) => {
    const id_ficha = req.body.nombre
    const fecha= req.body.fecha
    const hora = req.body.hora
    const pago = req.body.pago
    // console.log(id_user, tipo_bono, desc, valor, fecha)
    connection.query('INSERT INTO cita SET ?', {id_ficha,fecha,hora,pago}, (error, datos) => {
        if(error){
            console.log(error)            
        }else{
            res.redirect('/citas')
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
    const fecha= req.body.fecha
    const hora= req.body.hora
    const pago= req.body.pago
    connection.query('UPDATE cita SET ? WHERE id=?', [{fecha:fecha,hora:hora,pago:pago}, id], (error, datos) =>{
        if(error){
            console.error(error)
        }else{
            res.redirect('/citas')
   
        }
    })
}

const comparacionfecha = (req, res) => {
    res.render('./citas/comparacionfecha')
}

const resultados2 = (req, res) => {
    //res.send('comparacion')
    const fecha1 = req.body.fecha1
    const fecha2 = req.body.fecha2
    console.log(fecha1, fecha2)
    
    connection.query("SELECT cita.*, date(cita.fecha) as fecha_format, ficha.nombre, ficha.patologias FROM cita INNER JOIN ficha ON ficha.id_ficha = cita.id_ficha WHERE fecha BETWEEN '"+fecha1+ "' AND '"+fecha2+"'", (error, datos) => {
        if(error){
            throw error
        }else{
            let total = 0
            for(i=0; i<datos.length; i++){
                total = total + parseFloat(datos[i].valor)
            }

            res.render('./citas/resultados2', {datos, total})
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
    comparacionfecha,
    resultados2
}