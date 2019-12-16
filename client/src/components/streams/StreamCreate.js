import React from 'react'
import {Field,reduxForm} from 'redux-form'
class StreamCreate extends React.Component{
	renderError({error,touched}){
		if (touched && error){
			return(
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			)
		}
	}
	// renderInput(formProps){
	renderInput=({input,label,meta})=>{
		const className=`field ${(meta.error && meta.touched)? 'error':''}`
		// return <input onChange={formProps.input.onChange} value={formProps.input.value}></input>
		// return <input {...formProps.input}></input>
		// return <input {...input}></input>
		return (<div className={className}>
			<label>{label}</label>
			<input {...input} autoComplete="off"></input>
			<div>{this.renderError(meta)}</div>
		</div>) 
	}
	onSubmit(formValues){

	}
	render(){
		return (<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
			<Field name="title" component={this.renderInput} label="Enter Title"></Field>
			<Field name="description" component={this.renderInput} label="Enter Description"></Field>
			<button className="ui button primary"> Submit</button>	
					</form>)
	}
}
const validate =(formValues)=>{
	const errors={};
	if (!formValues.title){
		// only run if the user did not enter a ttitle
		errors.title='YOU MUST ERROR A TITLE'
	} 
	if (!formValues.description){
		errors.description="YOU BEST ENTER A DESCRIPTION"
	}
	return errors
}
export default reduxForm({form:'streamCreate',validate})(StreamCreate)