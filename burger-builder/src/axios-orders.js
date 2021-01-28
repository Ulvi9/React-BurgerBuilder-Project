import axios from "axios"
const instance=axios.create({
    baseURL:"https://react-myburger-9dbac-default-rtdb.europe-west1.firebasedatabase.app/"
})
// instance.defaults.headers.common["Authorization"]="AUTH Token";

export default instance;
