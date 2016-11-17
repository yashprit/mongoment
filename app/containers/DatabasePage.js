import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Database from '../components/database';
import * as DatabaseActions from '../actions/database';

function mapStateToProps(state) {
  const {isError, error, collections} = state.database;
  return {
    isError,
    error,
    collections
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DatabaseActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Database);
