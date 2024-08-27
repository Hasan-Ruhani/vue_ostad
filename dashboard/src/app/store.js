import { configureStore } from '@reduxjs/toolkit';
import adminSlice from './features/admin/adminSlice';
import projectSlice from './features/project/projectSlice';
import teamSlice from './features/team/teamSlice';

export default configureStore({
    reducer: {
        admin: adminSlice,
        project: projectSlice,
        team: teamSlice
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares(),
    devTools: true
})


