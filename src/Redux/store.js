import { createSlice, createStore } from "@reduxjs/toolkit";

const routeSlice = createSlice({
	name: 'route',
	initialState: {
		routeNum: 2,
		setRelation: false
	},
	reducers: {
		plus: (state, action) => {
			return {routeNum: state.routeNum + 1, action: "plus", setRelation: true}
		},
		minus: (state, action) => {
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
// 	route: routeSlice.reducer
// })

const store = createStore(routeSlice.reducer);

export {routeSlice};
export default store;
