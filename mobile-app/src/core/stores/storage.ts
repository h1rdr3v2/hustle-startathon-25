import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

// Create an MMKV instance
export const storage = new MMKV({
	id: 'app-storage',
	encryptionKey: 'secure-storage-key',
});

// Configure Zustand to use MMKV for state persistence
export const zustandStorage: StateStorage = {
	setItem: (name, value) => {
		storage.set(name, value);
	},
	getItem: (name) => {
		const value = storage.getString(name);
		return value ?? null;
	},
	removeItem: (name) => {
		storage.delete(name);
	},
};

export default zustandStorage;
