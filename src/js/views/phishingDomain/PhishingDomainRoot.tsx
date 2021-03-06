import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../model/state/AppState';
import PhishingDomainAction from '../../actions/PhishingDomainAction'
import PhishingDomainState from '../../model/state/phishingDomain/PhishingDomainState';
import PhishingDomainAddModal from './modals/PhishingDomainAddModal';
import PhishingDomainList from './PhishingDomainList';
import PhishingDomainEditModal from './modals/PhishingDomainEditModal';
import RootView from '../common/RootView';
import { ToolbarGroup } from 'material-ui/Toolbar';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import OpenInNew from 'material-ui/svg-icons/action/open-in-new';
import { Table } from '../components/common/table/Table';
import { Column } from '../components/common/table/Column';
import { ActionCol } from '../components/common/table/ActionCol';

class PhishingDomainRoot extends React.Component<Props, { addOpen: boolean, editOpen: boolean }> {
    public render() {
        const grids = this.props.state.records
        && this.props.state.records.map(record => {
            return (
                <GridTile
                    key={ record.id }
                    title={ record.domainName }
                    style={ { backgroundColor: 'rgba(51, 51, 61, .7)' } }
                    titlePosition="bottom">
                        <IconButton
                            onTouchTap={ () => { this.onEdit(record.id) } }>
                            <OpenInNew color="white" />
                        </IconButton>
                </GridTile>
            );
        })

        const table = <Table data={this.props.state.records}>
                <Column head="Domain Name" headKey="domainName" />
                <ActionCol edit delete 
                    editCallback={this.onEdit }/>
            </Table>
        
        return <div>
            <PhishingDomainEditModal />
            <PhishingDomainAddModal />
            <RootView
                title="PhishingDomains"
                onAdd={ this.onAdd }
                widgets={ null }
                onLoad={ this.onLoad }
                grids={grids}
                table={table} 
                records={this.props.state.records} />
        </div>
    }

    private onAdd = () => {
        PhishingDomainAction.openAdd(this.props.dispatch);
    }

    private onEdit = (id) => {
        PhishingDomainAction.openEdit(this.props.dispatch, id)
    }

    private onLoad = () => {
        PhishingDomainAction.initPage(this.props.dispatch);
    }   
}

interface Props {
    dispatch?: Function
    state?: PhishingDomainState;
}

const mapStateToProps = (app: AppState): Props => ({
    state: app.phishingDomain
})

export default connect(
    mapStateToProps, 
    dispatch => ({
        dispatch
    })
)(PhishingDomainRoot);

  