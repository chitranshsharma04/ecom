import React, {useContext} from 'react';

import {useCommonState} from './reducer';
//this is the starting point
const AppContext = React.createContext();
const AppProvider = ({children}) => {
	const {state, dispatch} = useCommonState();
	//this is the starting point
	return (
		<AppContext.Provider value={{state, dispatch}}>
			{children}
		</AppContext.Provider>
	);
};

const useCommonContext = () => {
	return useContext(AppContext);
};
export {AppProvider, useCommonContext};
