// import { createAction } from "@reduxjs/toolkit";
// import { createStore } from "redux";

// const initialState = {
// 	routeNum: 2,
// 	setRelation: false
// };

// // Action creators
// const plus = createAction("PLUS");
// const minus = createAction("MINUS");
// const relation = createAction("SET_RELATION")

// // reducer
// const reducer = (state = initialState, action) => {
// 	switch(action.type) {
// 		case plus.type:
// 			// console.log('+');
// 			return {routeNum: state.routeNum + 1, action: "plus", setRelation: true}
// 		case minus.type:
// 			// console.log('-')
// 			return {routeNum: state.routeNum - 1, action: "minus", setRelation: true}
// 		case relation.type:
// 			return {routeNum: state.routeNum, setRelation: action.payload}
// 		default:
// 			return state;
// 	}
// }

// // create store
// const store = createStore(reducer);
// export default store;


//=============================================================

import { createAction, createReducer } from "@reduxjs/toolkit";
import { createStore } from "redux";

const initialState = {
	routeNum: 2,
	setRelation: false
};

// Action creators
const plus = createAction("PLUS");
const minus = createAction("MINUS");
const setRelation = createAction("SET_RELATION")

// // reducer
// const reducer = (state = initialState, action) => {
// 	switch(action.type) {
// 		case plus.type:
// 			// console.log('+');
// 			return {routeNum: state.routeNum + 1, action: "plus", setRelation: true}
// 		case minus.type:
// 			// console.log('-')
// 			return {routeNum: state.routeNum - 1, action: "minus", setRelation: true}
// 		case setRelation.type:
// 			return {routeNum: state.routeNum, setRelation: action.payload}
// 		default:
// 			return state;
// 	}
// }


// reducer with builder callback object notation
const reducer = createReducer(initialState, (builder) => {
	builder
		.addCase(plus, (state, action) => {
			state.routeNum++;
			state.action = "plus";
			state.setRelation = true;
		})
		.addCase(minus, (state, action) => {
			state.routeNum--;
			state.action = "minus";
			state.setRelation = true;
		})
		.addCase(setRelation, (state, {payload}) => {
			state.setRelation = payload;
		})
})


// // reducer with map object notation
// const reducer = createReducer(initialState, {
// 	[plus]: (state, action) => {
// 		state.routeNum++;
// 		state.action = "plus";
// 		state.setRelation = true;
// 	},
// 	[minus]: (state, action) => {
// 		state.routeNum--;
// 		state.action = "minus";
// 		state.setRelation = true;
// 	},
// 	[setRelation] : (state, {payload}) => {
// 		state.setRelation = payload;
// 	}
// })



// create store
const store = createStore(reducer);
export default store;