const pubsub = new ( require('./utils/PubSub.js') );

const actionsApp = {

    changedUserName( name ) {
        pubsub.publish( 'changed-user-name', { name: name });
    },

    setUserName( name ) {
        pubsub.publish( 'set-user-name', { name: name });
    },

    selectedNewTab( name ) {
        pubsub.publish( 'selected-new-tab', { name: name });
    },
};

module.exports = actionsApp;