'use client';

import { ProfileContext } from '@/contexts/ProfileContext';
import { useContext } from 'react';

// Custom hook for using the profile context
export function useProfile() {
	const context = useContext(ProfileContext);
	if (context === undefined) {
		throw new Error('useProfile must be used within a ProfileProvider');
	}
	return context;
}
