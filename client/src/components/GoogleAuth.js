import React from 'react'
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions'
// ```
// Auth Compoenent
// 1. Get a reference to 'auth' object after it is initialized
// 2. Figure out if the user is currently signed in
// 3. Print their authentication status on the screen 
// ```
class GoogleAuth extends React.Component{
    componentDidMount(){
        // developers.google.com/api-client-library/javascript/reference/referencedocs
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'865784865808-6t224ds4ilkbu7kvre1fuohf0aebm14e.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth=window.gapi.auth2.getAuthInstance();
                // this.setState({isSignedIn:this.auth.isSignedIn.get()})
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        })
    }
    onAuthChange=(isSignedIn)=>{
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
        // this.setState({isSignedIn:this.auth.isSignedIn.get()})
    }
    onSignInClick=()=>{
        this.auth.signIn();
    }
    onSignOutClick=()=>{
        this.auth.signOut();
    }
    renderAuthButton(){
        if (this.props.isSignedIn==null){
            return null
        } else if(this.props.isSignedIn){
            return (<button className="ui green google button" onClick={this.onSignOutClick}>
                <i className="google icon"></i>
                Sign Out
            </button>)
        } else{
            return (<button className="ui red google button" onClick={this.onSignInClick}>
                <i className="google icon"></i>
                Sign In
            </button>)
        }
    }
    render(){
        return <div>{this.renderAuthButton()}</div>
    }
}
const mapStateToProps=(state)=>{
    return {isSignedIn:state.auth.isSignedIn}
}
export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth)