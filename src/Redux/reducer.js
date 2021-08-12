import { createStore } from "redux";

const PLUS = 'PLUS';
const MINUS = 'MINUS';

const initialState = {
	routeNum: 2
};

// Action creators
export const plus = () => ({ type: PLUS });
export const minus = () => ({ type: MINUS });

// reducer
const reducer = (state = initialState, action) => {
	switch(action.type) {
		case PLUS:
			console.log('+')
			return {routeNum: state.routeNum + 1}
		case MINUS:
			console.log('-')
			return {routeNum: state.routeNum - 1}
		default:
			return state;
	}
}


const store = createStore(reducer);
export default store;