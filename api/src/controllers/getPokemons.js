const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getApiInfo = async () => {
    const resp = await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=40")
      .then((data) => {
        return data.data.results;
      })
      .then((data) => {
        return Promise.all(data.map((res) => axios.get(res.url))); 
      })
      .then((data) => {
        return data.map((res) => res.data); 
      });
    let arrayPoke = resp.map((result) => {  
      return {
        id: result.id,
        name: result.name,
        img: result.sprites.other["official-artwork"].front_default,
        life: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        defense: result.stats[2].base_stat,
        speed: result.stats[3].base_stat,
        height: result.height,
        weight: result.weight,
        types: result.types.map((t) => t.type.name), 
      };
    });
    return arrayPoke;
  };

  const getDbInfo = async () => {
      const results = await Pokemon.findAll({ 
        include: Type
      })
      let pokemon = results.map((element) => {
        return {
          id: element.dataValues.id, 
          name: element.dataValues.name,
          img: element.dataValues.img,
          life: element.dataValues.life,
          attack: element.dataValues.attack,
          defense: element.dataValues.defense,
          speed: element.dataValues.speed,
          height: element.dataValues.height,
          weight: element.dataValues.weight,
          types: element.dataValues.types.map((e) => e.name),
        }
      })
      try {
          return pokemon
      } catch (error) {
          console.log(error)
      }
} 

  const getAllPokemons = async () => { 
    const apiInfo = await getApiInfo(); 
    const dbInfo = await getDbInfo();  
    return [...apiInfo, ...dbInfo]
  };
  

  module.exports ={ 
    getAllPokemons,
  }