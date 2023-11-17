import React, {useContext} from 'react';

import {useCommonState} from './reducer';
//this is the starting point
const AppContext = React.createContext();
//this is the starting point
const AppProvider = ({children}) => {
	const {state, dispatch} = useCommonState();
	//this is the starting point
	return (
		<AppContext.Provider value={{state, dispatch}}>
			{children}
		</AppContext.Provider>
	);
};
//this is a method to get data FROM CONTEXT
const useCommonContext = () => {
	return useContext(AppContext);
};
export {AppProvider, useCommonContext};
