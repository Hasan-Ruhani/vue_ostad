import { createSlice } from "@reduxjs/toolkit";
import { createCategory, createProject, deleteCategory, deleteProject, getAllCategory, getAllProject, updateCategory, updateCategoryStatus, updateProject, updateProjectStatus } from "./projectApiSlice";



export const projectSlice = createSlice({
    name: "project",
    initialState: {
        isSuccess: false,
        isLoading: false,
        error: null,
        message: null,
        project: null,
        category: null,
    },

    reducers: {

        // alert message empty

        setProjectMessageEmpty: (state) => {
            state.isSuccess = null;
            state.message = null;
            state.error = null;
        }

    },

    extraReducers: (builder) => {

        // get all category

        builder.addCase(getAllCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllCategory.fulfilled, (state, action) => {
            state.category = state.category ?? [];
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.category = action.payload.data;
        }).addCase(getAllCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.category = null;
        })

        // create category

        .addCase(createCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(createCategory.fulfilled, (state, action) => {
            state.category = state.category ?? [];
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.category.push(action.payload.data)
        }).addCase(createCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.category = null;
        })
        
        // update category status

        .addCase(updateCategoryStatus.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateCategoryStatus.fulfilled, (state, action) => {
            state.category = state.category ?? [];
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.category = state.category.map(category =>
                category.id === action.payload.data.id ? action.payload.data : category
            );
        }).addCase(updateCategoryStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.category = null;
        })

        // update category 

        .addCase(updateCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateCategory.fulfilled, (state, action) => {
            state.category = state.category ?? [];
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.category = state.category.map(category =>
                category.id === action.payload.data.id ? action.payload.data : category
            );
        }).addCase(updateCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.category = null;
        })

        // delete category

        .addCase(deleteCategory.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteCategory.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            if (action.payload.data) {
                state.category = state.category.filter((data) => data.id !== action.payload.data.id);
            }
        }).addCase(deleteCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.category = null;
        })

        // get all project

        .addCase(getAllProject.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllProject.fulfilled, (state, action) => {
            state.project = state.project ?? [];
            state.isSuccess = true;
            state.isLoading = false;
            state.project = action.payload.data;
        }).addCase(getAllProject.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.project = null;
        })

        // create project

        .addCase(createProject.pending, (state) => {
            state.isLoading = true;
        }).addCase(createProject.fulfilled, (state, action) => {
            state.project = state.project ?? [];
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.project.push(action.payload.data);
        }).addCase(createProject.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.project = null;
        })

        // update project status

        .addCase(updateProjectStatus.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateProjectStatus.fulfilled, (state, action) => {
            state.project = state.project ?? [];
            state.isSuccess = true;
            state.isLoading = false;
            state.message = action.payload.message;
            state.project = state.project.map(project =>
                project.id === action.payload.data.id ? action.payload.data : project
            );
        }).addCase(updateProjectStatus.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.project = null;
        })

        // update project

        .addCase(updateProject.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateProject.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message;
            state.project = state.project.map(project =>
                project.id === action.payload.data.id ? action.payload.data : project
            );
        }).addCase(updateProject.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.project = null;
        })

        // delete project

        .addCase(deleteProject.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteProject.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = action.payload.message;
            if (action.payload.data) {
                state.project = state.project.filter((data) => data.id !== action.payload.data.id);
            }
        }).addCase(deleteProject.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.project = null;
        })

    }
});

export const { setProjectMessageEmpty } = projectSlice.actions;


export default projectSlice.reducer;
