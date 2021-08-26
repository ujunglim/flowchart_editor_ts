// import { createAction, createReducer } from "@reduxjs/toolkit";
// import { createStore } from "redux";

import { combineReducers, createSlice, createStore } from "@reduxjs/toolkit";

// const initialState = {
// 	routeNum: 2,
// 	setRelation: false
// };

// // Action creators
// const plus = createAction("PLUS");
// const minus = createAction("MINUS");
// const reset = createAction("RESET");
// const setRelation = createAction("SET_RELATION");

// // reducer
// const reducer = (state = initialState, action) => {
// 	switch(action.type) {
// 		case plus.type:
// 			// console.log('+');
// 			return {routeNum: state.routeNum + 1, action: "plus", setRelation: true}
// 		case minus.type:
// 			// console.log('-')
// 			return {routeNum: state.routeNum - 1, action: "minus", setRelation: true}
// 		case reset.type:
// 			return {routeNum: 2, action: 'reset'}
// 		case setRelation.type:
// 			return {routeNum: state.routeNum, setRelation: action.payload}
// 		default:
// 			return state;
// 	}
// }


// // reducer with builder callback object notation
// const reducer = createReducer(initialState, (builder) => {
// 	builder
// 		.addCase(plus, (state, action) => {
// 			state.routeNum++;
// 			state.action = "plus";
// 			state.setRelation = true;
// 		})
// 		.addCase(minus, (state, action) => {
// 			state.routeNum--;
// 			state.action = "minus";
// 			state.setRelation = true;
// 		})
// 		.addCase(reset, (state, action) => {
// 			state.routeNum = 2;
// 			state.action = "reset";
// 		})
// 		.addCase(setRelation, (state, {payload}) => {
// 			state.setRelation = payload;
// 		})
// })


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
// 	[reset]: (state, action) => {
// 		state.routeNum = 2;
// 		state.action = "reset";
// 	},
// 	[setRelation] : (state, {payload}) => {
// 		state.setRelation = payload;
// 	}
// })

// // create store
// const store = createStore(reducer);
// export default store;

//==========================================================

const route = createSlice({
	name: 'routeReducer',
	initialState: {
		routeNum: 2,
		setRelation: false
	},
	reducers: {
		plus: (state, action) => {
			console.log('+')
			return {routeNum: state.routeNum + 1, action: "plus", setRelation: true}
		},
		minus: (state, action) => {
			console.log('-')
			return {routeNum: state.routeNum - 1, action: "minus", setRelation: true}
		},
		reset: (state, action) => {
			return {routeNum: 2, action: 'reset'}
		},
		setRelation: (state, {payload}) => {
			return {routeNum: state.routeNum, setRelation: payload}
		}
	}

})

// const reducer = combineReducers({
// 	route: route.reducer
// })

const store = createStore(route.reducer);

export {route};
export default store;

