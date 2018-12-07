import axios from 'axios'

let $backend = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {'Content-Type': 'application/json'}
})

// Response Interceptor to handle and log errors
$backend.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // eslint-disable-next-line
  console.log(error)
  return Promise.reject(error)
})

$backend.$fetchLocale = () => {
  return $backend.get(`/locale`)
      .then(response => response.data)
}

$backend.$fetchFilters = () => {
  return $backend.get(`/filter?language=${localStorage.getItem("lang")}&currency=${localStorage.getItem("currency")}`)
      .then(response => response.data)
}

$backend.$fetchDorms = () => {
  return $backend.get(`/dorms`)
      .then(response => response.data)
}

$backend.$fetchDorm = (dormId) => {
  return $backend.get(`/dorms/${dormId}`)
      .then(response => response.data)
}


$backend.$postMessage = (payload) => {
    return $backend.post(`messages/`, payload)
        .then(response => response.data)
}

$backend.$deleteMessage = (msgId) => {
    return $backend.delete(`messages/${msgId}`)
        .then(response => response.data)
}

export default $backend
