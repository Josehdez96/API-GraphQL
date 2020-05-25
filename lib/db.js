//Configuramos el código necesario para conectar nuestra DB

const { MongoClient } = require('mongodb') //El cliente para podernos conectar a MongoDB
const { DB_USER, DB_PASSWD, DB_NAME } = process.env //Traemos las constantes definidas en el archivo .env y definimos de donde las importamos con ||process.env||

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWD}@cluster0-u3ayl.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

let connection //Variable para almacenar la connection

async function connectDB() {
  if (connection) return connection

  let client //Variable para almacenar el client de Mongo
  
  try {
    client = await MongoClient.connect(mongoUrl, { //Recibe como parametros la URL y el objeto que tiene la config para el parseo de la url
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    connection = client.db(DB_NAME) //Agregamos la connection con el nombre de nuestra DB
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error)
    process.exit(1) //Si no se puede conectar, detenga el API
  }

  return connection
}

module.exports = connectDB