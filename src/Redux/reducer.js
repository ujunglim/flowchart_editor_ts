import { createAction } from "@reduxjs/toolkit";
import { createStore } from "redux";

const initialState = {
	routeNum: 2
};

// Action creators
const plus = createAction("PLUS");
const minus = createAction("MINUS");

// reducer
const reducer = (state = initialState, action) => {
	switch(action.type) {
		case plus.type:
			// console.log('+');
			return {routeNum: state.routeNum + 1}
		case minus.type:
			// console.log('-')
			return {routeNum: state.routeNum - 1}
		default:
			return state;
	}
}

// create store
const store = createStore(reducer);
export default store;