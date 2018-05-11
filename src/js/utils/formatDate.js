const moment = require('moment');

function formatDate( date ) {
    if( !date ) return;
    let result = moment().format('L');
    result = result.replace( /\//g, '.' );
    return result;
}

module.exports = formatDate;