import streams from '../apis/streams';
import history from '../history';
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM, EDIT_STREAM } from './types';
export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	};
};

export const signOut = () => {
	return {
		type: SIGN_OUT
	};
};
// export const createStream =(formvalues)=>{
//     return async (dispatchEvent)=>{

//     }
// }
export const createStream = (formvalues) => async (dispatchEvent, getState) => {
	const { userId } = getState().auth;
	const response = await streams.post('/streams', { ...formvalues, userId });
	dispatchEvent({ type: CREATE_STREAM, payload: response.data });
	history.push('/');
};
export const fetchStreams = () => async (dispatchEvent) => {
	const response = await streams.get('/streams');
	dispatchEvent({ type: FETCH_STREAMS, payload: response.data });
};
export const fetchStream = (id) => async (dispatchEvent) => {
	const response = await streams.get(`/streams/${id}`);
	dispatchEvent({ type: FETCH_STREAM, payload: response.data });
};
export const editStream = (id, formvalues) => async (dispatchEvent) => {
	const response = await streams.patch(`/streams/${id}`, formvalues);
	dispatchEvent({ type: EDIT_STREAM, payload: response.data });
	history.push('/');
};
export const deleteStream = (id) => async (dispatchEvent) => {
	await streams.delete(`/streams/${id}`);
	dispatchEvent({ type: DELETE_STREAM, payload: id });
};
