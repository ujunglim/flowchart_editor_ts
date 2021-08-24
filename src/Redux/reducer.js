import { createAction } from "@reduxjs/toolkit";
import { createStore } from "redux";

const initialState = {
	routeNum: 2,
	setRelation: false
};

// Action creators
const plus = createAction("PLUS");
const minus = createAction("MINUS");
const relation = createAction("SET_RELATION")

// reducer
const reducer = (state = initialState, action) => {
	switch(action.type) {
		case plus.type:
			// console.log('+');
			return {routeNum: state.routeNum + 1, action: "plus", setRelation: true}
		case minus.type:
			// console.log('-')
			return {routeNum: state.routeNum - 1, action: "minus", setRelation: true}
		case relation.type:
			return {routeNum: state.routeNum, setRelation: action.payload}
		default:
			return state;
	}
}

// create store
const store = createStore(reducer);
export default store;