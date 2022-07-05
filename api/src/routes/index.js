const { Router } = require('express');
const pokemonRoute = require('./Pokemons')
const typeRoute = require('./Types')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/pokemons', pokemonRoute);
router.use('/types', typeRoute);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
