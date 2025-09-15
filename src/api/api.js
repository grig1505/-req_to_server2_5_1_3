import {
	get,
	query,
	ref,
	orderByChild,
	push,
	set,
	remove,
} from "firebase/database";
import { db } from "../firebase";
import { HTTP_METHOD } from "../constants";

export const createTodo = (newTodo) =>
	push(ref(db, "todos"), newTodo).then((key) => key);

export const readTodos = (searchPhrase = "", isAlphabetSorting = false) => {
	const todosDbFef = ref(db, "todos");
	const orderingField = isAlphabetSorting ? "title" : "id";
	return get(query(todosDbFef, orderByChild(orderingField))).then(
		(snapshot) => {
			let loadedTodos = [];
			snapshot.forEach((todoSnapshot) => {
				const id = todoSnapshot.key;
				const { title, completed } = todoSnapshot.val();
				loadedTodos.push({
					id,
					title,
					completed,
				});
			});
			if (searchPhrase !== "") {
				loadedTodos = loadedTodos.filter(
					({ title }) =>
						title
							.toLowerCase()
							.indexOf(searchPhrase.toLowerCase()) >= 0,
				);
			}
			return isAlphabetSorting ? loadedTodos : loadedTodos.reverse();
		},
	);
};

export const updateTodo = (todoData) =>
	set(ref(db, `todos/${todoData.id}`), todoData);

export const deleteTodo = (todoId) => remove(ref(db, `todos/${todoId}`));
