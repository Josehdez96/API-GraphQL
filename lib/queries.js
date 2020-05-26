
const connectDb = require('./db') //Traemos la Base de datos ya conectada
const { ObjectID } = require('mongodb') //Sirve para transformar un ID de String a un objeto de ID de Mongo
const errorHandler = require('./errorHandler')

module.exports = {
  getCourses: async () => { //Resolver 1
    let courses
    try {
      let db = await connectDb()
      courses = await db.collection('courses').find().toArray() //En la colección de nuestra base de datos ||db.collection||, buscamos todo ||.find|| y lo convertimos en un arreglo con ||toArray||
    } catch (error) {
      errorHandler(error)
    }
    return courses
  },

  getCourse: async (root, { id }) => { //Resolver 2, el argumento que pasamos dentro del cliente es el ||id||
    let course
    try {
      let db = await connectDb()
      course = await db.collection('courses').findOne({ _id: ObjectID(id) }) //En la colección de la DB buscamos solo uno ||findOne|| y le pasamos como un objeto que especifica que llave queremos buscar ||_id|| y recibe un ID convertido por el ObjectID
    } catch (error) {
      errorHandler(error)
    }
    return course
  },



  getPeople: async () => { //Resolver 3
    let people
    try {
      let db = await connectDb()
      people = await db.collection('students').find().toArray() 
    } catch (error) {
      errorHandler(error)
    }
    return people
  },

  getPerson: async (root, { id }) => { //Resolver 4
    let person
    try {
      let db = await connectDb()
      person = await db.collection('students').findOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }
    return person
  },

  searchItems: async (root, { keyword }) => { //Resolver 5
      let items
      let courses
      let people

      try {
        let db = await connectDb()
        courses = await db.collection('courses').find(
          { $text: { $search: keyword } }
        ).toArray()

        people = await db.collection('students').find(
          { $text: { $search: keyword } }
        ).toArray()

        items = [...courses, ...people]

      } catch (error) {
        errorHandler(error)
      }
      return items
    }
}