'use client';
// contexts/ProfileContext.js
import { createContext, useContext, useState } from 'react';

// Create the context
export const ProfileContext = createContext(undefined);

// Create a provider component
export function ProfileProvider({ children }) {
	const [profileData, setProfileData] = useState({
		name: '',
		vec: [],
		id: '',
	});
	const [vec, setVec] = useState([]);
	// Create a value object that includes both state and setter
	const value = {
		profileData,
		vec,
		setVec,
		setProfileData,
	};

	return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}
