import React,{ Component } from 'react';
import actionsApp from '../actionsApp';
import store from '../store';
const pubsub = new ( require('../utils/PubSub.js') );
import '../../style/components/inputSearch/inputSearch.less';

class InputSearch extends Component {

    constructor( props ) {
        super()

        this.state = {
            inputValue: store.userName,
            isEmpty: store.emptyUserName,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentDidMount() {
        this.refs.input.focus()
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        this.setState({ inputValue: store.userName, isEmpty: store.emptyUserName });
    }

    updateInputValue( event ) {
        actionsApp.changedUserName( event.target.value );
    }

    submitName( event ) {
        event.preventDefault();
        actionsApp.setUserName( this.state.inputValue );
    }

    render() {
        let classNameInputSearch = ( this.state.isEmpty ) ? 'inputSearch empty' : 'inputSearch';
        let classNameButtnoSearch = ( this.state.inputValue ) ? 'buttnoSearch ready' : 'buttnoSearch';
        return(
            <div className="containerInputSearch">
                <form className="form">
                    <input
                        ref="input"
                        placeholder={'Username'}
                        className={classNameInputSearch}
                        type="text"
                        value={this.state.inputValue}
                        onChange={( event ) => this.updateInputValue( event )} />
                    <button
                        className={classNameButtnoSearch}
                        onClick={( event ) => this.submitName( event )}>
                            Search
                    </button>
                </form>
            </div>
        );
    }
}

export default InputSearch;