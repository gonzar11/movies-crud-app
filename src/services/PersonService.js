import http from "../http-common";

const getAll = () => {
  return http.get("/people");
};

const get = id => {
  return http.get(`/people/${id}`);
};

const create = data => {
  return http.post("/people", data);
};

const update = (id, data) => {
  return http.put(`/people/${id}`, data);
};

const remove = id => {
  return http.delete(`/people/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};