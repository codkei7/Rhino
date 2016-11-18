import * as React from 'react';
import { connect } from 'react-redux';
import { EditModalContainer, Props} from '../../crud/EditModalContainer';
import CampaignForm from '../../../components/campaign/CampaignEdit';
import CampaignAction from '../../../../actions/CampaignAction'
import CampaignState from '../../../../model/state/CampaignState';
import { AppState } from '../../../../model/state/AppState';

const CampaignEditModalContainer = (props: Props) => {
    return <EditModalContainer
        title="Edit Campaign"
        action={ CampaignAction }
        {...props}>
            <CampaignForm {...props.state} />
    </EditModalContainer>
}

const mapStateToProps = (app: AppState): Props => ({
    state: app.campaign
})

const CampaignEditModal = connect(
    mapStateToProps, 
    (dispatch): Props => ({
        dispatch: dispatch
    })
)(CampaignEditModalContainer);

export default CampaignEditModal;