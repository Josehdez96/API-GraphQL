require('dotenv').config() //Activa la busqueda en el archivo .env
const { makeExecutableSchema } = require('graphql-tools') //Para crear schemas con posibilidad de recibir parametros
const express = require('express') //Servidor
const gqlMiddleware = require('express-graphql') //Comunicación cliente-servidor
const { readFileSync } = require('fs') //Leer asincronamente otro modulo
const { join } = require('path') //Funcion ||join|| para usar un path

const resolvers = require('./lib/resolvers') //Traemos los resolvers

const app = express() // 1) Creamos un servidor
const port = process.env.port || 3000

// 5) Definiendo la ruta del schema ya iniciado o creado
const typeDefs = readFileSync( //Propiedad del objeto que recibe el makeExecutableSchema
  join(__dirname, 'lib', 'schema.graphql'), //Leemos el schema en __dirname/lib/schema.graphql
  'utf-8') 
 
// 2) Definiendo que recibirá nuestro schema (__elSchema__, __resolvers__)
const schema = makeExecutableSchema({ typeDefs, resolvers })


//Aquí irian los resolvers si fueran en el mismo modulo


app.use('/api', gqlMiddleware({ // 3) Middleware = Permite comunicación cliente-servidor
  schema: schema, // Añadimos el schema de nuestra API
  rootValue: resolvers, // Añadimos a la url del API las respuestas o resolvers
  graphiql: true // Activamos el entorno de desarrollo de graphQL
}))

app.listen(port, () => { // 4) Escuchamos los llamados por parte del navegador
  console.log(`Server is listening at http://localhost:${port}/api`)
})

// 6) Creamos el nodemon en script de package.json


/*

//Ejecutar en terminal el query hello y saludo
graphql(schema, `{ hello, saludo }`, resolvers) //Esto me devuelve una promesa. Debo especificar (__deDondeLoTraigo__, __QueQuieroTraer__)
  .then(data => {
    console.log(data)
  });

*/
