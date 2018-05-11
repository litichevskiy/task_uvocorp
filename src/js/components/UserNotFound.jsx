import React,{ Component } from 'react';

import '../../style/components/userNotFound/userNotFound.less';

class UserNotFound extends Component {

    constructor( props ) {
        super()
    }

    render() {
        return(
            <div className="containerUserNotFound">
                {this.props.message}
            </div>
        )
    }
}

export default UserNotFound;