import ToDoForm from "./ToDoForm";
import ToDoHeader from "./ToDoHeader";
import ToDoItem from "./ToDoItem";

export default function ToDoList() {
	return (
		<div>
			<ToDoHeader />
			<div className="toDoList_grid">
				<ToDoForm />
				<ToDoItem />
			</div>
		</div>
	);
}
