import axio from "axios";
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  const request = axio.get(baseUrl);
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axio.post(baseUrl, newObject);
  return request.then(response => response.data)
}

// const update = (id, newObject) => {
//   const request = axio.put(`${baseUrl}/${id}`, newObject);
//   return request.then(response => response.data)
// }

export default { getAll, create }