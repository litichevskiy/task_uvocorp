import React,{ Component } from 'react';
import serverApi from '../serverApi.js';
import store from '../store';
import formatDate from '../utils/formatDate';
const pubsub = new ( require('../utils/PubSub.js') );
import '../../style/components/listRepositories/listRepositories.less';

class ListRepositories extends Component {

    constructor( props ) {
        super()

        this.state = {
            listRepos: [],
            userName: store.userName,
            titleList: store.headerActiveTab,
        }

        this.initData = this.initData.bind( this );
        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('setNewUserData', this.initData );
        pubsub.subscribe('updateTabInfo', this.initData );
        pubsub.subscribe('change', this.updateState );
        this.initData();
    }

    componentWillUnmount() {
        pubsub.unSubscribe('setNewUserData', this.initData );
    }

    updateState() {
        this.setState({
            userName: store.userName,
            titleList: store.headerActiveTab
        });
    }

    initData() {
        let key = this.state.userName;
        if( !key ) return;
        serverApi.getListRepositories( key, store.avtiveTabName )
        .then( ( response ) => {
            this.initState( response );
        })
        .catch( ( error ) => {console.log( error );});
    }

    initState( data ) {
        this.setState({listRepos: data});
    }

    render() {
        let state = this.state;
        let titleListClassName = ( state.listRepos.length ) ? 'titleList' : 'hide';
        return(
            <div className="containerListRepositories">
                <h3 className={titleListClassName}>{state.titleList}</h3>
                <ul className="list">
                    {
                        state.listRepos.map( ( item, index ) => {
                            return(
                                <li key={index} className="itemList">
                                    <div className="blockDescription">
                                        <span className="counterItemList">{index + 1}</span>
                                        <a className="link" href={item.html_url} target="_blank">{item.name}</a>
                                        <p className="description">{item.description}</p>
                                        <div className="containerDate">
                                            <span className="">
                                                created:
                                                <strong className="textBold">{formatDate( item.created_at )}</strong>
                                            </span>
                                            <span className="updated">
                                                updated:
                                                <strong className="textBold">{formatDate( item.updated_at )}</strong>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="blockInfo">
                                        <div className="cellInfo">
                                            <svg fill="#b5b5b5" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z"/>
                                                <path d="M0 0h18v18H0z" fill="none"/>
                                            </svg>
                                            <span className="counter">{item.stargazers_count || 0}</span>
                                        </div>
                                        <div className="cellInfo">
                                            <svg fill="#b5b5b5" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0h24v24H0z" fill="none"/>
                                                <path d="M14 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L20 10V4zm-4 0H4v6l2.29-2.29 4.71 4.7V20h2v-8.41l-5.29-5.3z"/>
                                            </svg>
                                            <span className="counter">{item.forks_count || 0}</span>
                                        </div>
                                        <div className="cellInfo">
                                            <svg fill="#b5b5b5" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0h24v24H0z" fill="none"/>
                                                <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/>
                                            </svg>
                                            <span className="counter">{item.open_issues_count || 0}</span>
                                        </div>
                                        <div className="cellInfo">
                                            <span
                                                className="language"
                                                style={{display: (item.language)? 'inline-block' : 'none' }}>
                                                    {item.language}
                                                </span>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default ListRepositories;