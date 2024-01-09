import { createSlice } from "@reduxjs/toolkit";

const todoSlice=createSlice({
    name:'todo',
    initialState:[],
    reducers:{
        addtodo:(state,action)=>{
            return [...state, {id:action.payload,title:action.payload,completed:false}]
        },
        deletetodo:(state,action)=>{
            return state.filter((todo)=>todo.id !== action.payload)
        },
        edittodo:(state,action)=>{
            return state.map((todo)=>todo.id === action.payload.id?{...todo,title:action.payload.title}:todo)
        },
        toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id);
			state[index].completed = action.payload.completed;
		},
    }
})
export const {addtodo,deletetodo,edittodo,toggleComplete }=todoSlice.actions;
export default todoSlice.reducer;