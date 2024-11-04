'use client';
// contexts/ProfileContext.js
import { createContext, useContext, useState } from 'react';

// Create the context with initial values
export const ProfileContext = createContext();

// Create a provider component
export function ProfileProvider({ children }) {
	const [profileData, setProfileData] = useState({
		name: '',
		vec: [],
		id: '',
	});

	return (
		<ProfileContext.Provider
			value={{
				profileData,
				setProfileData,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
}
