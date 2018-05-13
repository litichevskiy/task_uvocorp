const pubsub = new ( require('./utils/PubSub.js') );
const ServerApi = require('./serverApi.js');
const titles = {
    'repos': 'Repositories',
    'gists': 'Gists',
}

const store = {
    userName: '',
    userNameMemory: '',
    emptyUserName: false,
    is_repositories: true,
    activeTabName: 'repos',
    headerActiveTab: '',
    is_gists: false,
    userNotFound: false,
    userNotFoundMessage: 'User not found',
    repositoriesList: [],
    UserInfo: null,
    invalidSimbols: '',
    _repos: '',
    _gists: '',
    data: {
        'repos': '',
        'gists': ''
    },

    getRepos() {

        if ( this.data[this.activeTabName] ) {
            this.repositoriesList = this.data[this.activeTabName];
            pubsub.publish('change');
            return;
        }

        ServerApi.getRepositoriesList( this.userName, this.activeTabName )
        .then( list => {

            this.data[this.activeTabName] = list;
            this.repositoriesList = list;
            pubsub.publish('change');
        })
        .catch( error => {
            if(error.code === 'NOTFOUND') {
                this.repositoriesList = [];
                pubsub.publish('change');
            }

            else console.error( error.code, error );
        });
    },

    changeActiveTab( data ) {
        let name = data.name;
        this.activeTabName = name;
        if( name === 'gists' ) {
            this.is_repositories = false;
            this.is_gists = true;
        }
        else
            if( name === 'repos' ) {
                this.is_repositories = true;
                this.is_gists = false;
            }

        this.headerActiveTab = titles[ name ];
    },

    init() {

        this.headerActiveTab = titles[ this.activeTabName ];

        pubsub.subscribe('changed-user-name', ( data ) => {
            let name = data.name;
            let check = isValidName( name )

            if( check ) this.invalidSimbols = check.join(' ');
            else this.invalidSimbols = '';

            this.emptyUserName = false;
            this.userName = name;
            pubsub.publish('change');
        });

        pubsub.subscribe('set-user-name', ( data ) => {

            if( !data.name ) {
                this.emptyUserName = true;
                pubsub.publish('change');
            }

            else if( this.userName !== this.userNameMemory ) {
                    if( this.invalidSimbols ) return;

                    this.userNameMemory = data.name;
                    this.changeActiveTab({name: 'repos'});
                    this.data.repos = '';
                    this.data.gists = '';
                    ServerApi.getUserInfo( this.userName )
                    .then( user => {

                        this.UserInfo = user;
                        this.userNotFound = false;
                        pubsub.publish('change');
                    })
                    .catch( ( error ) => {
                        if(error.code === 'NOTFOUND') {
                            this.UserInfo = null;
                            this.userNotFound = true;
                            pubsub.publish('change');
                        }

                        else console.error( error.code, error );
                    });

                    this.getRepos();
            }
        });

        pubsub.subscribe('selected-new-tab', ( data ) => {
            this.changeActiveTab( data );
            this.getRepos();
        });
    }
};

function isValidName( name ) {
    return name.match( /[^\w\d-_]/g );
}

store.init();

module.exports = store;