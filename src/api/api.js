const BASE_URL="https://api.themoviedb.org/3/movie/";
const api_key="?api_key=0267c13d8c7d1dcddb40001ba6372235";

const API = {
    getList() {
        return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0267c13d8c7d1dcddb40001ba6372235`)
            .then((response) => response.json())
            .then((responseJson) => {
                // if (name === 'popular') {
                    console.log('json', responseJson.results);
                    return responseJson.results;
                // } else if (name === 'product'){
                    // console.log(name, responseJson.product);
                    // return responseJson.product;
                // }
            })
            .catch((error) => {
                // alert('error')
                console.error(error);
                return [];
            })
    },
}

export default API;