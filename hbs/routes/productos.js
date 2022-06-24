const {
    Router
} = require('express');
const router = Router();
const productos = [{
        "title": "Cafe Brasilero",
        "price": 1900,
        "thumbnail": 'https://github.com/jmamadi/aplicativoreact/blob/main/appreact/public/images/bandera_2.png',
        "id": 1
    },
    {
        "title": "Cafe Colombiano",
        "price": 1500,
        "thumbnail": 'https://github.com/jmamadi/aplicativoreact/blob/main/appreact/public/images/bandera_1.png',
        "id": 2
    },
    {
        "title": "Cafe Hindú",
        "price": 2000,
        "thumbnail": 'https://github.com/jmamadi/aplicativoreact/blob/main/appreact/public/images/bandera_4.png',
        "id": 3
    }
]


router.get('/', (req, res) => {
    try{
        res.render('listado', {productos});
    }catch(error){
        console.log('error al intentar obtener productos:',error)
    }
})


router.post('/', (req, res) => {
    try {
        const {
            title,
            price,
            thumbnail
        } = req.body
        let ultimo = productos.length - 1;
        let id = productos[ultimo].id + 1;
        productos.push({
            id,
            title,
            price,
            thumbnail
        });
        res.redirect('/')
    }catch(error){
        console.log('error de servidor', error)
        res.sendStatus(500)
    }
})


router.get('/:id', (req, res) => {
    try {
        let encontrado = productos.find(producto => producto.id == req.params.id);
        encontrado ? res.json(encontrado) : res.json({error: 'ID no encontrada'})
    } catch(error) {
        console.log('error desde metodo GET por ID, ', error)
    }
})


router.put('/:id', (req, res) => {
    try{
        const id = Number(req.params.id);
        const index = productos.findIndex(producto => producto.id === id)
        const oldProd = productos[index]

        if (productos.find((prod) => prod.id === id)) {
          productos[index] = req.body;
          productos[index].id = id;

        res.json(
            `${JSON.stringify(oldProd)} ha sido actualizado a:  ${JSON.stringify(
              productos[index]
            )}`
          );
        } else {
          res.json(`Producto con id: ${id} es inexistente`);
        }
    }catch(error){
        console.log('error desde metodo PUT')
    }
})


router.post('/eliminar/:id', (req, res) =>{
    try{
    const index = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    if (index === -1) {
        res.status(404)
    } else {
        productos.splice(index, 1);
        res.redirect('/productos')
    }
    }catch(error){
        console.log('Error en el metodo DELETE')
    }
})

module.exports = router;