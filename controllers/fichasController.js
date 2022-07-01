const connection = require('../config/conexion')
const title = 'Ficha'


const index = (req, res) => {
    connection.query('SELECT * FROM ficha', (error, datos) => {
        if(error){
            throw error
        }else{
            res.render('./fichas/index', {title: title, fichas:datos})        
        }
    })
}

const crear = (req, res) => {
    connection.query('SELECT * FROM ficha', (error, datos) => {
        if(error){
            throw error
        }else{
            res.render('./fichas/crear', {title: title, fichas:datos})

        }
    })
}

const editar = (req, res) => {
    const id = req.params.id
    connection.query('SELECT * FROM ficha WHERE id_ficha=? ',[id] , (error, datos) => {
        if(error){
            throw error
        }else{
                    res.render('./fichas/editar', {fichas:datos[0], title: title})        

                }
            })
        }

const eliminar = (req, res) => {
    const id = req.params.id
    // console.log(id)
    
    connection.query('DELETE FROM ficha WHERE id_ficha=?', [id], (error, datos) => {
        if(error){
            throw error
        }else{
            res.redirect('/ficha')
        }
    })
}

const guardar = (req,res) => {
    const id_ficha = req.body.id_ficha
    const nombre= req.body.nombre 
    const fecha_nacimiento= req.body.fecha_nacimiento
    const edad= req.body.edad
    const genero= req.body.genero
    const cedula= req.body.cedula
    const ciudad= req.body.ciudad
    const direccion= req.body.direccion
    const telefono= req.body.telefono
    const antecedentes= req.body.antecedentes
    const patologias= req.body.patologias
    const alergias= req.body.alergias
    const estatura= req.body.estatura
    const peso= req.body.peso
   
    // console.log(id_user, tipo_bono, desc, valor, fecha)
    connection.query('INSERT INTO ficha SET ?', {id_ficha,nombre, fecha_nacimiento, edad, genero, cedula, ciudad, direccion, telefono, antecedentes, patologias, alergias, estatura, peso}, (error, datos) => {
        if(error){
            console.log(error)            
        }else{
            res.redirect('/ficha')
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
    const nombre= req.body.nombre 
    const fecha_nacimiento= req.body.fecha_nacimiento
    const edad= req.body.edad
    const genero= req.body.genero
    const cedula= req.body.cedula
    const ciudad= req.body.ciudad
    const direccion= req.body.direccion
    const telefono= req.body.telefono
    const antecedentes= req.body.antecedentes
    const patologias= req.body.patologias
    const alergias= req.body.alergias
    const estatura= req.body.estatura
    const peso= req.body.peso
    connection.query('UPDATE ficha SET ? WHERE id_ficha=?', [{nombre:nombre, fecha_nacimiento:fecha_nacimiento, edad:edad, genero:genero, cedula:cedula, ciudad:ciudad, direccion:direccion, telefono:telefono, antecedentes:antecedentes, patologias:patologias, alergias:alergias, estatura:estatura, peso:peso}, id], (error, datos) =>{
        if(error){
            console.error(error)
        }else{
            res.redirect('/ficha')
   
        }
    })
}

const ver = (req, res) => {
    const id = req.params.id
    connection.query('SELECT * FROM ficha WHERE id_ficha=? ',[id] , (error, datos) => {
        if(error){
            throw error
        }else{
                    res.render('./fichas/ver', {fichas:datos[0], title: title})        

                }
            })
        }

        const buscar = (req, res) => {
            //res.send('comparacion')
            const nombre1 = req.body.nombre1
            console.log(nombre1)
            
            connection.query("SELECT * FROM ficha WHERE nombre = '"+nombre1+"'" , (error, datos) => {
                if(error){
                    throw error
                }else{
                    let total = 0
                    for(i=0; i<datos.length; i++){
                        total = total + parseFloat(datos[i].valor)
                    }
        
                    res.render('./fichas/buscar', {datos, total})
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
    ver,
    buscar
}