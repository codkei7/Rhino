import { Reducer } from 'redux';
import { Action } from '../../actions/Action';
import { ActionType } from '../../actions/ActionType';
import { LoginState } from '../../model/state/LoginState';
import { copy } from '../../common/Util';
import { ValidatableInput } from '../../common/validation/ValidatableInput';
import { Identity } from '../../security/Identity';

const defaultState = {
    input: {
            host: new ValidatableInput(),
            port: new ValidatableInput(),
            username: new ValidatableInput(),
            password: new ValidatableInput()
        },
    isValid: false
}

//http://stackoverflow.com/a/39200433
//https://github.com/reactjs/redux/issues/454
export const reducer: Reducer<LoginState> = (state = defaultState, action: Action): LoginState => {
    const newState = copy<LoginState>(state);

    switch(action.type) {
        case ActionType.LOGIN_CHANGE_HOST_INPUT:             
            newState.input.host.value = action.payload;
            return newState;

        case ActionType.LOGIN_CHANGE_PORT_INPUT:             
            newState.input.port.value = action.payload;
            return newState;

        case ActionType.LOGIN_CHANGE_USERNAME_INPUT:             
            newState.input.username.value = action.payload;
            return newState;

        case ActionType.LOGIN_CHANGE_PASSWORD_INPUT:             
            newState.input.password.value = action.payload;
            return newState;

        case ActionType.LOGIN_INVALID_SUBMIT:            
            return action.payload;

        case ActionType.LOGIN_SUCCESS:
            Identity.login(action.payload);
            return state;    

        default: return state;
    }
};