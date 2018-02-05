const BASE_URL="https://api.themoviedb.org/3/movie/";
const API_KEY="api_key=0267c13d8c7d1dcddb40001ba6372235";
const PAGE="page="

const API = {
    getList(name,page) {
        console.log('name', name)
        return fetch(`${BASE_URL}${name}?${API_KEY}&${PAGE}${page}`)
            .then((response) => response.json())
            .then((responseJson) => {
                    return responseJson.results;
            })
            .catch((error) => {
                console.error(error);
                return [];
            })
    },
}

export default API;