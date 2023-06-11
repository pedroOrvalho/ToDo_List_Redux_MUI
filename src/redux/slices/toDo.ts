import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../type";

type InitialState = {
	newTask: string;
	newDescription: string;
	newProgress: string;
	newDate: Date | null;
	taskItems: Task[];
	editingTask: Task | null;
};

const initialState: InitialState = {
	newTask: "",
	newDescription: "",
	newProgress: "",
	newDate: null,
	taskItems: [],
	editingTask: null,
};

const toDoSlice = createSlice({
	name: "toDoList",
	initialState,
	reducers: {
		newTask: (state, { payload }: PayloadAction<string>) => {
			state.newTask = payload;
		},
		newDescription: (state, { payload }: PayloadAction<string>) => {
			state.newDescription = payload;
		},
		newProgress: (state, { payload }: PayloadAction<string>) => {
			state.newProgress = payload;
		},
		newDate: (state, { payload }: PayloadAction<Date | null>) => {
			state.newDate = payload;
		},
		addToList: (state, { payload }: PayloadAction<Task>) => {
			state.taskItems.push(payload);
		},
		deleteToList: (state, { payload }: PayloadAction<Task[]>) => {
			state.taskItems = [...payload];
		},
		updateProgress: (state, { payload }: PayloadAction<Task[]>) => {
			state.taskItems = payload;
		},
		editTask: (state, { payload }: PayloadAction<Task | null>) => {
			state.editingTask = payload;
		},
	},
});

export const {
	newTask,
	newDescription,
	newProgress,
	newDate,
	addToList,
	deleteToList,
	updateProgress,
	editTask,
} = toDoSlice.actions;
const toDoReducer = toDoSlice.reducer;
export default toDoReducer;
