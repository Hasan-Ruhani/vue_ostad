import { createSlice } from "@reduxjs/toolkit";
import { createTeam, createTeamProfile, deleteTeam, getAllTeam, getTeamDetails, updateTeam, updateTeamStatus } from "./teamApiSlice";



export const teamSlice = createSlice({
    name: "team",
    initialState: {
        isSuccess: false,
        isLoading: false,
        error: null,
        message: null,
        team: null,
        teamdetails: null
    },

    reducers: {

        setTeamMessageEmpty: (state) => {
            state.isSuccess = null;
            state.message = null;
            state.error = null;
        }

    },

    extraReducers: (builder) => {

        builder.addCase(getAllTeam.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllTeam.fulfilled, (state, action) => {
            state.team = state.team ?? [];
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.team = action.payload.data;
        }).addCase(getAllTeam.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.team = null;
        })

        .addCase(getTeamDetails.pending, (state) => {
            state.isLoading = true;
        }).addCase(getTeamDetails.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.teamdetails = action.payload.data;
        }).addCase(getTeamDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.teamdetails = null;
        })

        .addCase(createTeam.pending, (state) => {
            state.isLoading = true;
        }).addCase(createTeam.fulfilled, (state, action) => {
            state.team = state.team ?? [];
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.team.push(action.payload.data)
        }).addCase(createTeam.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.team = null;
        })

        .addCase(createTeamProfile.pending, (state) => {
            state.isLoading = true;
        }).addCase(createTeamProfile.fulfilled, (state, action) => {
            state.team = state.team ?? [];
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.team = state.team.map(team =>
                team.id === action.payload.data.id ? action.payload.data : team
            );
        }).addCase(createTeamProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.team = null;
        })

        .addCase(updateTeamStatus.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateTeamStatus.fulfilled, (state, action) => {
            state.team = state.team ?? [];
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.team = state.team.map(team =>
                team.id === action.payload.data.id ? action.payload.data : team
            );
        }).addCase(updateTeamStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.team = null;
        })

        .addCase(updateTeam.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateTeam.fulfilled, (state, action) => {
            state.team = state.team ?? [];
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.team = state.team.map(team =>
                team.id === action.payload.data.id ? action.payload.data : team
            );
        }).addCase(updateTeam.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.team = null;
        })

        .addCase(deleteTeam.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteTeam.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            if (action.payload.data && action.payload.data.profile && action.payload.data.profile.id) {
                state.team = state.team.filter((data) => data.profile.id !== action.payload.data.profile.id);
            } else {
                state.team = state.team.filter((data) => data.id !== action.payload.data.id);
            }
        }).addCase(deleteTeam.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.team = null;
        })


    }
});

export const { setTeamMessageEmpty } = teamSlice.actions;


export default teamSlice.reducer;
