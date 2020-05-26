
const connectDb = require('./db') //Conectamos a la DB
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = { //Si el input no tiene esta información, por default quedarán en strings vacios
      teacher: '',
      topic: ''
    }

    const newCourse = Object.assign(defaults, input) //Establecemos los inputs que nos lleguen y los defaults
    try {
      let db = await connectDb()
      let course = await db.collection(`courses`).insertOne(newCourse) //Insertamos un input
      newCourse._id = course.insertedId //Me devuelve el ultimo ID insertado (en la anterior linea lo insertamos) y lo guarda en ||newCourse._id|| para posteriormente retornarlo
    } catch (error) {
      errorHandler(error)
    }
    return newCourse
  },

  createPerson: async (root, { input }) => {
    try {
      let db = await connectDb()
      let student = await db.collection(`students`).insertOne(input) 
      input._id = student.insertedId 
    } catch (error) {
      errorHandler(error)
    }
    return input
  },


  editCourse: async (root, { _id, input }) => {
    let course
    try {
      let db = await connectDb()
      course = await db.collection(`courses`).updateOne(
        { _id: ObjectID(_id) }, 
        { $set: input } //Establecemos lo que vamos a cambiar
        ) 
      
      course = await db.collection('courses').findOne( //Recuperamos el curso a cambiar
        { _id: ObjectID(_id) }
      )
    } catch (error) {
      errorHandler(error)
    }
    return course
  },

  editPerson: async (root, { _id, input }) => {
    let student
    try {
      let db = await connectDb()
      student = await db.collection(`students`).updateOne(
        { _id: ObjectID(_id) }, 
        { $set: input }
        ) 
      
      student = await db.collection('students').findOne(
        { _id: ObjectID(_id) }
      )
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
  

  deleteCourse: async (root, { _id }) => {
    let course
    try {
      let db = await connectDb()
      course = await db.collection(`courses`).deleteOne({ _id: ObjectID(_id) })      
    } catch (error) {
      errorHandler(error)
    } 
    return course
  },

  deletePerson: async (root, { _id }) => {
    let student
    try {
      let db = await connectDb()
      student = await db.collection(`students`).deleteOne({ _id: ObjectID(_id) })     
    } catch (error) {
      errorHandler(error)
    }
    return student
  },

  addPeople: async (root, { courseID, personID }) => {
    let db
    let person
    let course

    try {
      db = await connectDb()
      course = await db.collection('courses').findOne( 
        { _id: ObjectID(courseID) }
      )
      person = await db.collection('students').findOne(
        { _id: ObjectID(personID) }
      )

      if (!course || !person) throw new Error(`La persona o el curso no existe`) //Controlamos que si existan

      await db.collection('courses').updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { people: ObjectID(personID) } } //Busca si ||people|| es un arreglo y si no, lo convertirá en un arreglo
        )

    } catch (error) {
      errorHandler(error)
    }

    return course
  }
}