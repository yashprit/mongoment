import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Connections from '../components/connections';
import * as ConnectionsActions from '../actions/connections';

function mapStateToProps(state) {
  const {connections, isError, error} = state.connections;
  return {
    connections,
    isError,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConnectionsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
