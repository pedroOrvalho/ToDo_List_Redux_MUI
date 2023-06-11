import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export type Task = {
	id: number;
	newTask: string;
	newDescription: string;
	newProgress: string;
	newDate: string;
};
