import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
	newTask,
	newDescription,
	newProgress,
	newDate,
	addToList,
} from "../redux/slices/toDo";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
	Box,
	IconButton,
	MenuItem,
	TextField,
	Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import { Task } from "../type";

export default function ToDoForm() {
	const dispatch = useDispatch();

	const newTaskValue = useSelector(
		(state: RootState) => state.toDoList.newTask
	);
	const newDescriptionValue = useSelector(
		(state: RootState) => state.toDoList.newDescription
	);
	const newProgressValue = useSelector(
		(state: RootState) => state.toDoList.newProgress
	);
	const newDateValue = useSelector(
		(state: RootState) => state.toDoList.newDate
	);

	function addItem() {
		if (!newTaskValue || !newDateValue || !newProgress) {
			alert("Fill all the values");
		} else {
			const item: Task = {
				id: Math.floor(Math.random() * 1000),
				newTask: newTaskValue,
				newDescription: newDescriptionValue,
				newProgress: newProgressValue,
				newDate: newDateValue.toDateString(),
			};

			dispatch(addToList(item));
			dispatch(newTask(""));
			dispatch(newDescription(""));
			dispatch(newProgress(""));
			dispatch(newDate(null));
		}
	}

	return (
		<Box sx={{ margin: "1rem 3rem" }}>
			<Box>
				<TextField
					fullWidth
					id="outlined-basic"
					label="New task..."
					variant="outlined"
					margin="normal"
					value={newTaskValue}
					onChange={(event) => dispatch(newTask(event.target.value))}
				/>
				<TextField
					fullWidth
					margin="normal"
					id="outlined-multiline-static"
					label="Description... (optional)"
					multiline
					rows={6}
					value={newDescriptionValue}
					onChange={(event) => dispatch(newDescription(event.target.value))}
				/>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "space-around" }}>
				<TextField
					sx={{
						width: "50%",
						marginRight: "0.2rem",
					}}
					margin="normal"
					id="outlined-select-currency"
					select
					label="Choose status"
					value={newProgressValue}
					onChange={(event) => dispatch(newProgress(event.target.value))}
				>
					<MenuItem value={"Done"}>{"Done"}</MenuItem>
					<MenuItem value={"In Progress"}>{"In Progress"}</MenuItem>
					<MenuItem value={"Yet to start"}>{"Yet to start"}</MenuItem>
				</TextField>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						sx={{
							marginTop: "1rem",
							width: "50%",
						}}
						label="Choose date"
						value={newDateValue ? dayjs(newDateValue) : null}
						onChange={(date: Dayjs | null) =>
							dispatch(newDate(date ? date.toDate() : null))
						}
					/>
				</LocalizationProvider>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<IconButton onClick={() => addItem()}>
					<AddCircleIcon fontSize="large" color="success" />
				</IconButton>
			</Box>
		</Box>
	);
}
