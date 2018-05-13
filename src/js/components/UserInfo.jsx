import React,{ Component } from 'react';
import store from '../store';
import actionsApp from '../actionsApp';
import formatDate from '../utils/formatDate';
const pubsub = new ( require('../utils/PubSub.js') );

class UserInfo extends Component {

    constructor( props ) {
        super()

        this.state = {
            userInfo : store.UserInfo,
            is_repos: store.is_repositories,
            is_gists: store.is_gists,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        this.setState({
            is_gists: store.is_gists,
            is_repos: store.is_repositories,
            userInfo : store.UserInfo
        });
    }

    changedActiveItem( event ) {
        let target = event.target;
        let role = target.dataset.role || target.parentElement.dataset.role;
        if( role ) actionsApp.selectedNewTab( role );
    }

    isActive( key ) {
        return ( this.state[key] ) ? 'containerCounter active' : 'containerCounter';
    }

    render() {
        let userInfo = this.state.userInfo;

        if( !userInfo ) return (<div className="hide"></div>)
        else{
            return(
                <div className="containerUserInfo">
                    <div className="cell">
                        <img ref="userAvatar" className="userAvatar" src={userInfo.avatar_url} alt="" />
                    </div>
                    <div className="cell">
                        <h3 className="header userName">{userInfo.name}</h3>
                        <div className="location">
                            <svg className="iconLocation" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                            <span>{userInfo.location}</span>
                        </div>
                        <div className="date">
                            created:
                            <strong className="created">{ formatDate( userInfo.created_at )}</strong>
                        </div>
                        <div className="date">
                            updated:
                            <strong className="updated">{ formatDate( userInfo.updated_at )}</strong>
                        </div>
                    </div>
                    <div className="cell">
                        <div className="containerLinks" >
                            <a className="link" target="_blank" href={userInfo.html_url}>Github</a>
                            <a className="link" target="_blank" href={userInfo.blog}>Blog</a>
                        </div>
                    </div>
                    <div className="cell">
                        <div className="wrapperContent" onClick={( event ) => this.changedActiveItem( event )}>
                            <div className={this.isActive('is_repos')} data-role="repos" >
                                <div className="counter">{userInfo.public_repos}</div>
                                <div className="title">repos</div>
                            </div>
                            <div className={this.isActive('is_gists')} data-role="gists" >
                                <div className="counter">{userInfo.public_gists}</div>
                                <div className="title">gists</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default UserInfo;