//Indice: 3)Resolvers y 2) su contenido

//2) Definimos el contenido de nuestro objeto o API SI LO VAMOS A DEFINIR AQUI ADENTRO, si no, traemos los datos definidos de una base de datos

const queries = require('./queries')
const mutations = require('./mutations')
const types = require('./types')

//3) Exporta la función con el contenido de nuestro objeto
module.exports = {
  Query: queries,  
  Mutation: mutations, //Traemos los mutations
  ...types
}