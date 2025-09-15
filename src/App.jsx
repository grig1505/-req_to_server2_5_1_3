import { useEffect, useState } from "react";
import { ControlPanel, Todo } from "./components";
import { createTodo, readTodos, updateTodo, deleteTodo } from "./api";
import {
    addTodoInTodos,
    findTodo,
    removeTodoInTodos,
    setTodoInTodos,
} from "./utils";
import { NEW_TODO_ID } from "./constants";
import styles from "./app.module.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

    const updateTodos = (updater) => {
        setTodos((prevTodos) => updater(prevTodos));
    };

    const onTodoAdd = () => {
        updateTodos((todos) => addTodoInTodos(todos));
    };

    const onTodoSave = (todoId) => {
        const { title, completed } = findTodo(todos, todoId) || {};

        if (todoId === NEW_TODO_ID) {
            createTodo({ title, completed }).then((id) => {
                updateTodos((prevTodos) => {
                    const updatedTodos = setTodoInTodos(prevTodos, {
                        id: NEW_TODO_ID,
                        isEditing: false,
                    });
                    return addTodoInTodos(removeTodoInTodos(updatedTodos, NEW_TODO_ID), { id, title, completed });
                });
            });
        } else {
            updateTodo({ id: todoId, title, completed }).then(() => {
                updateTodos((prevTodos) => setTodoInTodos(prevTodos, { id: todoId, isEditing: false }));
            });
        }
    };

    const onTodoEdit = (id) => {
        updateTodos((todos) => setTodoInTodos(todos, { id, isEditing: true }));
    };

    const onTodoTitleChange = (id, newTitle) => {
        updateTodos((todos) => setTodoInTodos(todos, { id, title: newTitle }));
    };

    const onTodoCompletedChange = (id, newCompleted) => {
        const { title } = findTodo(todos, id) || {};
        updateTodo({ id, title, completed: newCompleted }).then(() => {
            updateTodos((todos) => setTodoInTodos(todos, { id, completed: newCompleted }));
        });
    };

    const onTodoRemove = (id) => {
        deleteTodo(id).then(() => updateTodos((todos) => removeTodoInTodos(todos, id)));
    };

    useEffect(() => {
        let isMounted = true;
        readTodos(searchPhrase, isAlphabetSorting).then((loadedTodos) => {
            if (isMounted) setTodos(loadedTodos);
        });
        return () => { isMounted = false; };
    }, [searchPhrase, isAlphabetSorting]);

    return (
        <div className={styles.app}>
            <ControlPanel
                onTodoAdd={onTodoAdd}
                onSearch={setSearchPhrase}
                onSorting={setIsAlphabetSorting}
            />
            <div>
                {todos.map(({ id, title, completed, isEditing = false }) => (
                    <Todo
                        key={id}
                        id={id}
                        title={title}
                        completed={completed}
                        isEditing={isEditing}
                        onEdit={() => onTodoEdit(id)}
                        onTitleChange={(newTitle) => onTodoTitleChange(id, newTitle)}
                        onCompletedChange={(newCompleted) => onTodoCompletedChange(id, newCompleted)}
                        onSave={() => onTodoSave(id)}
                        onRemove={() => onTodoRemove(id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
