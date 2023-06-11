import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./slices/toDo";

const store = configureStore({
	reducer: {
		toDoList: toDoReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
