import React, {useContext, useEffect} from 'react';

const AppContext = React.createContext();
//this is the starting point
const AppProvider = ({children}) => {
	useEffect(() => {
		//It needs to empty, If any logic arises, dev will add it.
	});
	return (
		<>
			<AppContext.Provider value='Hello'>{children}</AppContext.Provider>
		</>
	);
};
//this is the CONTEXT
const useGlobalContext = () => {
	return useContext(AppContext);
};
export {AppContext, AppProvider, useGlobalContext};
