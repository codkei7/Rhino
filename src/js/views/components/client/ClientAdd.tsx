import * as React from 'react';
import AutoComplete from '../common/AutoComplete';
import Button from '../common/Button';
import Input from '../common/Input';
import FormProps from '../common/FormProps';
const reduxForm = require('redux-form');
const Field = reduxForm.Field;
const moment = require('moment-timezone'); 

const timezones = moment.tz.names();

export default reduxForm.reduxForm({
    form: 'ClientAdd'
})(
(props: FormProps) => 
    <form 
        onSubmit={ props.handleSubmit(props.submit) }>
            <div>
                <Field
                    name="name"
                    label="Name"
                    component={ Input } />
            </div>
            <div>
                <Field
                    name="url"
                    label="URL"
                    component={ Input } />
            </div>
            <div>
                <Field
                    name="timezone"
                    label="Default Timezone"
                    data={ timezones }
                    component={ AutoComplete } /> 
            </div>
            <Button type="submit">Submit</Button>
    </form>
);

