import React,{ Component } from 'react';
import store from '../store';
const pubsub = new ( require('../utils/PubSub') );

class UserNotFound extends Component {

    constructor() {
        super()

        this.state = {
            userNotFound: store.userNotFound,
            userNotFoundMessage: store.userNotFoundMessage,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        this.setState({ userNotFound: store.userNotFound });
    }

    render() {
        if( !this.state.userNotFound ) return(<div className="hide"></div>)
        else {
            return(
                <div className="containerUserNotFound">
                    {this.state.userNotFoundMessage}
                </div>
            )
        }
    }
}

export default UserNotFound;