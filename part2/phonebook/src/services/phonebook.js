import axio from "axios";
const baseUrl = "/api/persons"

const getAll = () => {
  const request = axio.get(baseUrl);
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axio.post(baseUrl, newObject);
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axio.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data)
}

const remove = id => {
  const request = axio.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data)
}

export default { getAll, create, update, remove }