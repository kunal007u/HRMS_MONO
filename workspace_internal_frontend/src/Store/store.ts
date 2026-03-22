import { configureStore } from '@reduxjs/toolkit';
import { createStateSyncMiddleware } from 'redux-state-sync';
import { loadStorage, saveStorage } from '../utils/localStorage';
import authReducer from './slices/authSlice';
import { IApplicationState } from './state/app-state';

const persistentState: IApplicationState = loadStorage();

const store = configureStore({
    reducer: {
        UserData: authReducer,
        // employeeDetails: employeeDetailsReducer 
    },
    preloadedState: persistentState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createStateSyncMiddleware({
        broadcastChannelOption: { type: 'localstorage' },
    })),
    devTools: true,
});

store.subscribe(() => {
    return saveStorage(store.getState());
});

export default store;