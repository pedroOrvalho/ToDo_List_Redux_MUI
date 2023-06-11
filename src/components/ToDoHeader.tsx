import logo from "../images/todo1.png";

import PendingIcon from "@mui/icons-material/Pending";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import Badge from "@mui/material/Badge";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const theme = createTheme({
	typography: {
		fontFamily: ["Lobster", "cursive"].join(","),
	},
});

export default function ToDoHeader() {
	const tasks = useSelector((state: RootState) => state.toDoList.taskItems);

	const doneTasksCount = tasks.filter(
		(task) => task.newProgress === "Done"
	).length;

	const yetToStartTasksCount = tasks.filter(
		(task) => task.newProgress === "Yet to start"
	).length;

	const inProgressTasksCount = tasks.filter(
		(task) => task.newProgress === "In Progress"
	).length;

	return (
		<header>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					"& > :not(style)": {
						m: 1,
						width: 1,
						height: 75,
					},
					alignItems: "center",
				}}
			>
				<Paper
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						justifyItems: "center",
						backgroundColor: "hsla(169, 10%, 41%, 1)",
					}}
					elevation={3}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							marginLeft: "3rem",
						}}
					>
						<img src={logo} alt="logo" width={"70rem"} />
						<ThemeProvider theme={theme}>
							<Typography
								sx={{
									fontSize: "3.5rem",
									marginLeft: "2rem",
									color: "hsla(77, 11%, 87%, 1)",
								}}
								variant="h1"
							>
								Task Master
							</Typography>
						</ThemeProvider>
					</Box>
					<Stack
						sx={{
							display: "flex",
							marginRight: "6rem",
							padding: "0.5rem 0.3rem",
							backgroundColor: "hsla(180, 6%, 56%, 0.6)",
							borderRadius: "15px",
						}}
						spacing={3}
						direction="row"
					>
						<Badge badgeContent={doneTasksCount} color="success">
							<CheckIcon
								sx={{
									backgroundColor: "hsla(120, 100%, 35%, 1)",
									borderRadius: "50px",
								}}
							/>
						</Badge>
						<Badge badgeContent={yetToStartTasksCount} color="error">
							<ClearIcon
								sx={{
									backgroundColor: "hsla(0, 100%, 40%, 1)",
									borderRadius: "50px",
								}}
							/>
						</Badge>
						<Badge badgeContent={inProgressTasksCount} color="warning">
							<PendingIcon
								sx={{ backgroundColor: "orange", borderRadius: "50px" }}
							/>
						</Badge>
					</Stack>
				</Paper>
			</Box>
		</header>
	);
}
