import React,{ Component } from 'react';
import { hot } from 'react-hot-loader';
import 'normalize.css';
import InputSearch from './InputSearch';
import UserInfo from './UserInfo';
import ListRepositories from './ListRepositories';
import '../../style/components/containerApp/containerApp.less';

class App extends Component {

    constructor( props ) {
        super()
    }

    render() {

        return(
            <div className="containerApp">
                <div className="blockHeader">
                    <h3 className="header">Github user info</h3>
                    <InputSearch />
                </div>
                <UserInfo />
                <ListRepositories />
            </div>
        )
    }
}

export default hot(module)(App);