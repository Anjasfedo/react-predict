import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { useEffect } from "react";
import { database } from "@configs/firebase";
import type { Todo } from "@stores/todoStore";
import useTodoStore from "@stores/todoStore";
import { off, onValue, ref, set } from "firebase/database";
const ydoc = new Y.Doc();
const roomName = "my-room-name";
const provider = new IndexeddbPersistence(roomName, ydoc);

provider.on("synced", () => {
  console.log("content from the database is loaded");
});

const Dashboard = () => {
  useEffect(() => {
    // Sync todos with Firebase
    const todosRef = ref(database, "todos");
    onValue(todosRef, (snapshot) => {
      const todosData: Todo[] = snapshot.val()
        ? Object.values(snapshot.val())
        : [];
      todosData.forEach((todo: Todo) => {
        useTodoStore.getState().addTodo(todo);
      });
    });

    // Sync todos with Yjs
    const type = ydoc.getMap("todos");
    type.observeDeep(() => {
      const newTodos = Array.from(type.values()) as Todo[];
      useTodoStore.setState({ todos: newTodos });
    });

    return () => {
      off(todosRef, "value");
    };
  }, []);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };

    set(ref(database, `todos/${newTodo.id}`), newTodo);

    const type = ydoc.getMap("todos");
    type.set(newTodo.id.toString(), newTodo);
  };
  return <div className="App"></div>;
};

export default Dashboard;
