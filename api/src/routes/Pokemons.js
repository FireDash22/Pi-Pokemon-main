const { Router } = require("express");
const { getAllPokemons } = require("../controllers/getPokemons");
const router = Router();
const { Pokemon, Type } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    let name = req.query.name;
    let pokemonsTotal = await getAllPokemons(); 
    if (name) { 
      let pokemonName = await pokemonsTotal.filter((el) => 
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      pokemonName.length
        ? res.status(200).send(pokemonName) 
        : res.status(404).send("El pokemon ingresado no existe"); 
    } else {
      res.status(200).send(pokemonsTotal); 
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => { 
  try {
    const id = req.params.id;
    const pokemonsTotal = await getAllPokemons();
    if (id) {
      let pokemonId = pokemonsTotal.filter((el) => el.id == id); 
      pokemonId.length
        ? res.status(200).json(pokemonId)
        : res.status(404).send("No se encontró el pokemon");
    }
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res) => {
  const { name } = req.query
	name = name.toLowerCase()

	try{
		const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
		
	    const pokeArrayData = [];
	    pokeArrayData.push(pokeData.data);
  
	    const pokemonFinal = [];
	    pokeArrayData.map(e => {
	        pokemonFinal.push({
		        id: e.id,
		        name: e.name,
		        life: e.stats[0].base_stat,
		        attack: e.stats[1].base_stat,
		        defense: e.stats[2].base_stat,
		        speed: e.stats[5].base_stat,
		        height: e.height,
		        weight: e.weight,
		        img: e.sprites.other.dream_world.front_default,
		        types: e.types.map(p => p.type.name)
		    })
		})
		
		if(pokemonFinal.length === 0){
			return res.status(404).send('Error')
		}else{
			return res.send(pokemonFinal)
		}
	}
	
	catch(err){
		try{
			const pokeFinal = await Pokemon.findAll({
				where: {
					name: name
				}
			})
			return res.json(pokeFinal)
		}
		catch(error){
			return res.json(error)	
		}
	}
})

router.post("/", async (req, res, next) => { 

    let { name, img, life, attack, defense, speed, height, weight, types } = req.body; 

    const newPokemon = await Pokemon.create({
      name,
      img,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });
    
    try{
     newPokemon.setTypes(types);
     res.send("Pokemon creado exitosamente");
    }
   catch (err) {
    res.status(400).send("Error en data");
  }
})

module.exports = router;