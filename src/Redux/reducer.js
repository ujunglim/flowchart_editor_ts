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
			return {routeNum: state.routeNum + 1, action: "plus"}
		case minus.type:
			// console.log('-')
			return {routeNum: state.routeNum - 1, action: "minus"}
		default:
			return state;
	}
}

// create store
const store = createStore(reducer);
export default store;