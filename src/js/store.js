const pubsub = new ( require('./utils/PubSub.js') );

const store = {
    userName: '',
    userNameMemory: '',
    emptyUserName: false,
    is_repositories: true,
    avtiveTabName: 'repos',
    is_gists: false,

    init() {

        pubsub.subscribe('changed-user-name', ( data ) => {
            this.emptyUserName = false;

            this.userName = data.name;
            pubsub.publish('change');
        });

        pubsub.subscribe('set-user-name', ( data ) => {
            if( !data.name ) {
                this.emptyUserName = true;
                pubsub.publish('change');
            }
              else
                if( this.userName !== this.userNameMemory ) {
                    this.userNameMemory = data.name;
                    pubsub.publish('setNewUserData');
                }
        });

        pubsub.subscribe('selected-new-tab', ( data ) => {
            let name = data.name;
            this.avtiveTabName = name;
            if( name === 'gists' ) {
                this.is_repositories = false;
                this.is_gists = true;
            }
            else
                if( name === 'repos' ) {
                    this.is_repositories = true;
                    this.is_gists = false;
                }

            pubsub.publish('change');
            pubsub.publish('updateTabInfo');
        });
    }
};

store.init();

module.exports = store;