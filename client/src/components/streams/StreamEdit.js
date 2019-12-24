import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamFrom from './StreamForm';
class StreamEdit extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}
	onSubmit = (formValues) => {
		this.props.editStream(this.props.match.params.id, formValues);
	};
	render() {
		if (!this.props.stream) {
			return <div>Loading....</div>;
		}
		return (
			<div>
				<h3>Edit a Stream</h3>
				<StreamFrom
					// initialValues={{
					// 	title: `${this.props.stream.title}`,
					// 	description: `${this.props.stream.description}`
					// }}
					initialValues={_.pick(this.props.stream, 'title', 'description')}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}
const mapStateToprops = (state, ownProps) => {
	console.log(ownProps);
	return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToprops, { fetchStream, editStream })(StreamEdit);
