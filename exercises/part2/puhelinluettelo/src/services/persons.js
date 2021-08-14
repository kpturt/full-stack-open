import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    console.log('personsService getAll')
    //return axios.get(baseUrl)
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newObject) => {
    console.log('personsService create')
    //return axios.post(baseUrl, newObject)
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log('personsService update')
    //return axios.put(`${baseUrl}/${id}`, newObject)
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

/*const exportDefault = {
    getAll: getAll,
    create: create,
    update: update
}*/
const exportDefault = {getAll, create, update}
export default exportDefault