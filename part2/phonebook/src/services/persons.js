
import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

const clear = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
}

const personService = {getAll, create, clear, update}

export default personService    // I got a warning, when trying to export without assigning them to a variable first