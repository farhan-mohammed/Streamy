import streams from '../apis/streams';
import { SIGN_IN, SIGN_OUT } from './types';
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
export const createStream = (formvalues) => async (dispatchEvent) => {
	streams.post('/streams', formvalues);
};
