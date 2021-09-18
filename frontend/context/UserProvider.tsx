import React, { createContext, useContext, useState } from "react";
import { User } from "../models";

type TUserContext = {
	user: User;
	setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<TUserContext>({} as TUserContext);

export const UserProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User | undefined>();
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
