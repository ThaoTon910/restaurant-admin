import { createContext, useReducer } from 'react';

const initialState = {
	leftHeaderPath: null,
	rightHeaderContent: null,
	rightContentToolbarContent: null
};
export const StoreContext = createContext();
export const StoreContextDispatch = createContext();

export const STORE_ACTION_SET_HEADER_RIGHT = 'STORE_ACTION_SET_HEADER_RIGHT';
export const STORE_ACTION_SET_HEADER_LEFT_RIGHT = 'STORE_ACTION_SET_HEADER_LEFT_RIGHT';
export const STORE_ACTION_SET_CONTENT_TOOLBAR_RIGHT = 'STORE_ACTION_SET_CONTENT_TOOLBAR_RIGHT';

function reducer(state, action) {
	switch (action.type) {
		case STORE_ACTION_SET_HEADER_RIGHT:
			return { ...state, rightHeaderContent: action.payload };
		case STORE_ACTION_SET_HEADER_LEFT_RIGHT:
			return {
				...state,
				rightHeaderContent: action.payload.rightHeaderContent,
				leftHeaderPath: action.payload.leftHeaderPath
			};
		case STORE_ACTION_SET_CONTENT_TOOLBAR_RIGHT:
			return { ...state, rightContentToolbarContent: action.payload };
		default:
			throw new Error();
	}
}

export function StoreContextProdiver(props) {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StoreContext.Provider value={state}>
			<StoreContextDispatch.Provider value={dispatch}>{props.children}</StoreContextDispatch.Provider>
		</StoreContext.Provider>
	);
}
