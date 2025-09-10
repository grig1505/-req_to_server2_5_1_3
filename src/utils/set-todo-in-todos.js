export const setTodoInTodos = (todos, newtodoData) =>
	todos.map((todo) =>
		todo.id === newtodoData.id
			? {
					...todo,
					...newtodoData,
				}
			: todo,
	);

