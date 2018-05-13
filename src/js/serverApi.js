const NOT_FOUND = 404;
const OK = 200;

class ServerApi {
    static getUserInfo( name ) {
        return getData(`./users/${name}`);
    }

    static getRepositoriesList( name, key ) {
        return getData( `./users/${name}/${key}` );
    }
}


function getData( url ) {
    return fetch( url )
    .then( response => {
        const status = response.status;
        if ( status === OK ) {
            return response.json();
        }
        else if ( status === NOT_FOUND ) {
            return Promise.reject({code:'NOTFOUND', error: response});
        }
        else return Promise.reject({code:'UNKNOWN ERROR', error: response});
    });
};

module.exports = ServerApi;