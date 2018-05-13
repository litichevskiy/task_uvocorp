import React,{ Component } from 'react';
import actionsApp from '../actionsApp';
import store from '../store';
const pubsub = new ( require('../utils/PubSub.js') );

class InputSearch extends Component {

    constructor( props ) {
        super()

        this.state = {
            inputValue: store.userName,
            isEmpty: store.emptyUserName,
            invalidSimbols: store.invalidSimbols,
        }

        this.updateState = this.updateState.bind( this );
        pubsub.subscribe('change', this.updateState );
    }

    componentWillUnmount() {
        pubsub.unSubscribe('change', this.updateState );
    }

    updateState() {
        this.setState({
            inputValue: store.userName,
            isEmpty: store.emptyUserName,
            invalidSimbols: store.invalidSimbols
        });
    }

    updateInputValue( event ) {
        actionsApp.changedUserName( event.target.value );
    }

    submitName( event ) {
        event.preventDefault();
        actionsApp.setUserName( this.state.inputValue );
    }

    render() {
        let state = this.state;
        let classNameInputSearch = ( state.isEmpty ) ? 'inputSearch empty' : 'inputSearch';
        let classNameButtnoSearch = ( state.inputValue ) ? 'buttonSearch ready' : 'buttonSearch';
        let classNameContainerErrorText = ( state.invalidSimbols ) ? 'containerErrorText' : 'hide';
        return(
            <div className="containerInputSearch">
                <form className="form">
                    <input
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
                <div className={classNameContainerErrorText}>
                    <div className="header">Invalid simbols:</div>
                    <div className="invalidSimbols">{state.invalidSimbols}</div>
                </div>
            </div>
        );
    }
}

export default InputSearch;