import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { deleteToList, updateProgress, editTask } from "../redux/slices/toDo";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import CheckIcon from "@mui/icons-material/Check";
import {
	TableContainer,
	Paper,
	Box,
	TableCell,
	Table,
	TableHead,
	TableRow,
	TableBody,
	IconButton,
	TextField,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

import { Task } from "../type";

const themeHeader = createTheme({
	typography: {
		fontFamily: ["Comfortaa", "cursive"].join(","),
		fontWeightBold: "700",
		fontSize: 25,
	},
});

export default function ToDoItem() {
	const dispatch = useDispatch();
	const tasks = useSelector((state: RootState) => state.toDoList.taskItems);
	const editingTask = useSelector(
		(state: RootState) => state.toDoList.editingTask
	);

	function deleteTask(id: number) {
		const newTaskList: Task[] = tasks.filter((task) => task.id !== id);
		dispatch(deleteToList(newTaskList));
	}

	function changeProgress(id: number) {
		const updatedProgressTasks: Task[] = tasks.map((task) => {
			if (task.id === id) {
				if (task.newProgress === "Yet to start") {
					return { ...task, newProgress: "In Progress" };
				} else if (task.newProgress === "In Progress") {
					return { ...task, newProgress: "Done" };
				} else {
					return { ...task, newProgress: "Yet to start" };
				}
			}
			return task;
		});
		dispatch(updateProgress(updatedProgressTasks));
	}

	function startEditingTask(task: Task) {
		dispatch(editTask(task));
	}

	function handleTaskChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newTaskText = event.target.value;
		const updatedTask = { ...editingTask!, newTask: newTaskText };
		dispatch(editTask(updatedTask));
	}

	function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
		const newDescriptionText = event.target.value;
		const updatedTask = { ...editingTask!, newDescription: newDescriptionText };
		dispatch(editTask(updatedTask));
	}

	function stopEditingTask() {
		dispatch(editTask(null));
	}

	return (
		<Box
			sx={{
				margin: "2rem 0rem",
				marginRight: "3rem",
			}}
		>
			<TableContainer component={Paper} elevation={6}>
				<Table>
					<ThemeProvider theme={themeHeader}>
						<TableHead>
							<TableRow>
								<TableCell
									width={"20%"}
									padding="none"
									height={"53px"}
									align="center"
								>
									Task
								</TableCell>
								<TableCell width={"40%"} padding="none">
									Description
								</TableCell>
								<TableCell align="center" padding="none">
									Progress
								</TableCell>
								<TableCell align="center" padding="none">
									Date
								</TableCell>
								<TableCell align="center" padding="none"></TableCell>
							</TableRow>
						</TableHead>
					</ThemeProvider>
					<TableBody>
						{tasks.map((task) => (
							<TableRow key={task.id}>
								<TableCell>
									{editingTask?.id === task.id ? (
										<TextField
											type="text"
											value={editingTask.newTask}
											onChange={handleTaskChange}
											onBlur={stopEditingTask}
										/>
									) : (
										task.newTask
									)}
								</TableCell>
								<TableCell>
									{editingTask?.id === task.id ? (
										<TextField
											type="text"
											value={editingTask.newDescription}
											onChange={handleDescriptionChange}
											onBlur={stopEditingTask}
										/>
									) : (
										task.newDescription
									)}
								</TableCell>
								<TableCell align="center">{task.newProgress}</TableCell>
								<TableCell align="center">{task.newDate}</TableCell>
								<TableCell align="center">
									<IconButton onClick={() => changeProgress(task.id)}>
										<CheckIcon
											sx={{
                        padding: "5px 5px",
												backgroundColor: "hsla(120, 100%, 35%, 1)",
												borderRadius: "50px",
                        color: "white",

											}}
										/>
									</IconButton>
									<IconButton onClick={() => startEditingTask(task)}>
										<CreateIcon
											sx={{
												padding: "5px 5px",
												backgroundColor: "hsla(240,100%,50%, 0.8)",
												borderRadius: "50px",
												color: "white",
											}}
										/>
									</IconButton>
									<IconButton onClick={() => deleteTask(task.id)}>
										<DeleteForeverIcon
											sx={{
												padding: "5px 5px",
												backgroundColor: "hsla(0, 100%, 45%, 0.8)",
												borderRadius: "50px",
												color: "white",
											}}
										/>
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
