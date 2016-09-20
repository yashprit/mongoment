import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Connections from '../components/connections';
import * as ConnectionsActions from '../actions/connections';

function mapStateToProps(state) {
	console.log(state);
  const {connections} = state.connections;
  return {
    connections
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConnectionsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
