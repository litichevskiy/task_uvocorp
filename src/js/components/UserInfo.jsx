import React,{ Component } from 'react';
import serverApi from '../serverApi.js';
import store from '../store';
import actionsApp from '../actionsApp';
import formatDate from '../utils/formatDate';
import UserNotFound from './UserNotFound';
const pubsub = new ( require('../utils/PubSub.js') );
const UNKNOWN_USER = 'User not found';
import '../../style/components/userInfo/userInfo.less';

class UserInfo extends Component {

    constructor( props ) {
        super()

        this.state = {
            userName: store.userName,
            is_repos: store.is_repositories,
            is_gists: store.is_gists,
            isUser: false,
            unknownUser: '',
            avatar_url: '',
            name: '',
            html_url: '',
            blog: '',
            location: '',
            public_repos: '',
            public_gists: '',
            created_at: '',
            updated_at: ''
        }

        this.initData = this.initData.bind( this );
        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('setNewUserData', this.initData );
        pubsub.subscribe('change', this.updateState );
        this.initData();
    }

    componentWillUnmount() {
        pubsub.unSubscribe('setNewUserData', this.initData );
    }

    updateState() {
        this.setState({
            userName: store.userName,
            is_gists: store.is_gists,
            is_repos: store.is_repositories
        });
    }

    initData() {
        let key = this.state.userName;
        if( !key ) return;
        serverApi.getUserInfo( key )
        .then( ( response ) => {
            this.initState( response );
        })
        .catch( ( error ) => {console.log( error );});
    }

    initState( data ) {
        if( data.message ) {
            this.setState({
                unknownUser: UNKNOWN_USER,
                isUser: false,
                avatar_url: '',
                name: '',
                html_url: '',
                blog: '',
                location: '',
                public_repos: '',
                public_gists: '',
                created_at: '',
                updated_at: ''
            });
        }
        else{
            this.setState({
                unknownUser: '',
                isUser: true,
                avatar_url: data.avatar_url,
                name: data.name,
                html_url: data.html_url,
                blog: data.blog,
                location: data.location || 'unknown',
                public_repos: data.public_repos,
                public_gists: data.public_gists,
                created_at: data.created_at,
                updated_at: data.updated_at
            });
        }
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
        let state = this.state;

        if( state.unknownUser ) {
            return (
                <UserNotFound message={state.unknownUser} />
            )
        }

        else
            if( !state.isUser ) {
                return(<div></div>)
            }

        else{
            return(
                <div className="containerUserInfo">
                    <div className="cell">
                        <img ref="userAvatar" className="userAvatar" src={state.avatar_url} alt="" />
                    </div>
                    <div className="cell">
                        <h3 className="userName">{state.name}</h3>
                        <div className="location">
                            <svg fill="#b5b5b5" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                            <span>{state.location}</span>
                        </div>
                        <div className="date">
                            created:
                            <strong className="created">{ formatDate( state.created_at )}</strong>
                        </div>
                        <div className="date">
                            updated:
                            <strong className="updated">{ formatDate( state.updated_at )}</strong>
                        </div>
                    </div>
                    <div className="cell">
                        <div className="containerLinks" >
                            <a className="link" target="_blank" href={state.html_url}>Github</a>
                            <a className="link" target="_blank" href={state.blog}>Blog</a>
                        </div>
                    </div>
                    <div className="cell">
                        <div className="wrapperContent" onClick={( event ) => this.changedActiveItem( event )}>
                            <div className={this.isActive('is_repos')} data-role="repos" >
                                <div className="counter">{state.public_repos}</div>
                                <div className="title">repos</div>
                            </div>
                            <div className={this.isActive('is_gists')} data-role="gists" >
                                <div className="counter">{state.public_gists}</div>
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

 {/*<div className="containerCounter" data-role="repos" >
                                <div className="counter">{state.public_repos}</div>
                                <div className="title">repos</div>
                            </div>
                            <div className="containerCounter" data-role="gists" >
                                <div className="counter">{state.public_gists}</div>
                                <div className="title">gists</div>
                            </div>*/}