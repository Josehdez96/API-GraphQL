const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = { 
  Course: {

    people: async ({ people }) => { //Cuando este resolver se ejecute va a obtener people
      let db
      let peopleData
      let ids

      try {
        db = await connectDb()
        ids = people           //Pregunta si people existe, si no crea un arreglo vacio
        ? people.map(id => ObjectID(id)) 
        : []

        peopleData = ids.lenght > 0  //Si existe el array consulta en la collection students
          ? await db.collection('students').find(
            { _id: { $in: ids } } //Busca todos los estudiantes que recibamos en el campo de people
          ).toArray()
          : []
      } catch (error) {
        errorHandler(error)
      }

      return peopleData
    }
  },

  Person: {
    __resolveType: (person, context, info) => {
      if (person.phone) {
        return 'Monitor'
      } else {
        return 'Student'
      }
    }
  },

  GlobalSearch: {
    __resolveType: (item, context, info) => {
      if (item.title) {
        return 'Course'
      }

      if (item.phone) {
        return 'Monitor'
      }

      return 'Student'
    }
  }
}
