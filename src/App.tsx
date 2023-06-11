import ToDoList from "./components/ToDoList";
import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material";

function App() {
	return (
		<div className="App">
			<ToDoList />
		</div>
	);
}

export default App;
