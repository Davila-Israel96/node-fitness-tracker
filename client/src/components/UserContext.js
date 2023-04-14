import React, { useReducer } from "react";

export const UserContext = React.createContext();
export const UserContextProvider = ({ children }) => {
	// value is empty for now
	const value = {};
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserContext;
