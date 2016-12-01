import ActionCreator from './ActionCreator';
import EmailServerService from '../service/EmailServerService';
import EmailServerMapper from '../mappers/EmailServerMapperZ';
import EmailServerRecord from '../model/stateZ/emailServer/EmailServerRecord';
import { ActionType } from './ActionType';
import Ref from '../model/stateZ/Ref';

class EmailServerAction extends ActionCreator<EmailServerService> {
    private static QUALIFIER = 'emailServer';

    constructor() {
        super(EmailServerService, EmailServerMapper, EmailServerAction.QUALIFIER)
    }

    public checkEmail = (record: EmailServerRecord, recipient: string) => {
        return (dispatch) => 
        new EmailServerService()
            .checkEmail({
                id: record.id,
                host: record.host,
                port: record.port,
                login: record.login,
                password: record.password,
                use_tls: record.useTls,
                test_recipient: recipient,
                commit: true
            })
        .then(response => {
            dispatch({
                type: ActionType.EMAIL_SERVER_EMAIL_CHECK,
                payload: response.message,
                context: this.qualifier
            });
        });
    }
}

export default new EmailServerAction();