import { Action } from '../Action';
import { ActionType } from '../ActionType';
import { IUserService } from '../../service/user/IUserService';
import * as factory from '../../service/ServiceFactory';
import { ServiceType } from '../../service/ServiceFactory';
import { UserEditState, UserAddState, Fields } from '../../model/state/UserState';
import { UserFormValidation } from '../../validation/client/UserFormValidation';
import { mapUser } from '../../validation/server/mapper/UserValidationResponse';

type UserInputState = UserEditState | UserAddState;

class ActionCreator {
    private service: IUserService;

    public submit(dispatch, state: UserInputState): void {
        if(this.localValidate(dispatch, state)) {
            this.remoteValidate(dispatch, state)
            .then(valid => {
                if(valid) {
                    this.create(dispatch, state.input);
                }    
            })
        }
    }

    private create(dispatch, obj: Fields): void {
       
    }

    private localValidate(dispatch, state: UserInputState): boolean {
        const validated = UserFormValidation.validate(state);
        const valid = validated.isValid;
        if(!valid) 
            dispatch({
                type: ActionType.USER_INVALID_SUBMIT,
                payload: validated
            });
        return valid;
    }

    private remoteValidate(dispatch, state: UserInputState): Promise<boolean> {
        const input = state.input;            
        return this.getService()
        .validate({ 
            username: input.username.value, 
            first_name: input.firstName.value,
            last_name: input.lastName.value,
            email: input.email.value 
        })
        .then(response => mapUser(response))
        .then(validated => {
            const valid = validated.isValid;
            if(!valid) {
                dispatch({
                    type: ActionType.USER_INVALID_SUBMIT,
                    payload: validated
                });
            }

            return valid
        });
    }

    public cancel(dispatch) {
        dispatch({
            type: ActionType.USER_CANCEL_ADD
        })
    }

    public changeUsernameInput(dispatch, value: string) {
        dispatch({
            type: ActionType.USER_CHANGE_USERNAME_INPUT,
            payload: value
        });
    }

    public changeFirstNameInput(dispatch, value: string) {
        dispatch({
            type: ActionType.USER_CHANGE_FIRSTNAME_INPUT,
            payload: value
        });
    }

    public changeLastNameInput(dispatch, value: string) {
        dispatch({
        type: ActionType.USER_CHANGE_LASTNAME_INPUT,
            payload: value
        });
    }

    public changeEmailInput(dispatch, value: string) {
        dispatch({
            type: ActionType.USER_CHANGE_EMAIL_INPUT,
            payload: value
        });
    }

    private getService(): IUserService {
        if(!this.service)
            this.service = factory.of<IUserService>(ServiceType.USER); 
        
        return this.service;
    }
}

export const UserAddAction: ActionCreator = new ActionCreator();