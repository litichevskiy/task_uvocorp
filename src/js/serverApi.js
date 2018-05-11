const NOT_FOUND = 404; // server code
const OK = 200; // server code

module.exports = {

    getUserInfo( name ) {
        if( !name ) return;
        return fetch(`./users/${name}`)
        .then( ( response ) => {
            if( response.status === OK ) return response.json();
              else
               if ( response.status === NOT_FOUND ) return { message: response.statusText };
        })
        .catch( ( error ) => { console.error( error ) });
    },

    getListRepositories( name, key ) {
        if( !name || !key ) return;
        return fetch(`./users/${name}/${key}`)
        .then( ( response ) => {
            if( response.status === OK ) return response.json();
              else
               if ( response.status === NOT_FOUND ) return [];
        })
        .catch( ( error ) => { console.error( error ) });
    }
};