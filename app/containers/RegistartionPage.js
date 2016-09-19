import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Registration from '../components/Registration';
import * as AuthActions from '../actions/auth';

function mapStateToProps(state) {
	const {isLoggedIn, isLoading, error} = state.auth;
  return {
    isLoggedIn,
    isLoading,
    error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AuthActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
