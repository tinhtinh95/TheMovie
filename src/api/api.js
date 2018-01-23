const BASE_URL="https://api.themoviedb.org/3/movie/";
const API_KEY="api_key=0267c13d8c7d1dcddb40001ba6372235";
const PAGE="page="

const API = {
    getList(name,page) {
        return fetch(`${BASE_URL}${name}?${API_KEY}&${PAGE}${page}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if (name === 'popular') {
                    // console.log('json', responseJson.results);
                    return responseJson.results;
                // } else if (name === 'product'){
                    // console.log(name, responseJson.product);
                    // return responseJson.product;
                }
            })
            .catch((error) => {
                // alert('error')
                console.error(error);
                return [];
            })
    },
}

export default API;