const axios = require('axios');
const { Type } = require('../db.js')

async function getType() {
    try {
        const api = await axios.get("https://pokeapi.co/api/v2/type"); 
  
        const result = api.data.results

        result.map((e) => {
          Type.create({name: e.name})
        })

       return await Type.findAll(); 
      } catch (error) {
        console.log(error);
      }
}

module.exports = {
    getType,
}