import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.beta.mejorconsalud.com/wp-json/mc/v2/"
});

export const pegarSearch = async (setDados, search, currentPage) => {
  await api.get(`posts?search=${search}&page=${currentPage}`)
    .then((res) => (setDados(res.data)))
    .catch((err) => {
      alert("Error não foi pegar as informações!");
      console.log(err)
    })
};

export const pegarSearchCheckbox = async (setDados, search, currentPage) => {
  await api.get(`posts?search=${search}&page=${currentPage}&orderby=relevance`)
    .then((res) => (setDados(res.data)))
    .catch((err) => {
      alert("Error não foi pegar a informação!");
      console.log(err)
    })
};

export const pegarPost = async (setDados, id) => {
  await api.get(`posts/${id}`)
    .then((res) => (setDados(res.data)))
    .catch((err) => {
      alert("Error não foi pegar a informação!");
      console.log(err)
    })
};