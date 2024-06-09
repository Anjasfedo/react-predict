import * as Y from "yjs";
import { IndexeddbPersistence } from "y-indexeddb";
import { useEffect } from "react";
import { database } from "@configs/firebase";
import type { Todo } from "@stores/todoStore";
import useTodoStore from "@stores/todoStore";
import { off, onValue, push, ref } from "firebase/database";
const ydoc = new Y.Doc();
const roomName = "my-room-name";
const provider = new IndexeddbPersistence(roomName, ydoc);

provider.on("synced", () => {
  console.log("content from the database is loaded");
});

const Dashboard = () => {
  const todos = useTodoStore((state) => state.todos);

  useEffect(() => {
    const query = ref(database, "todos");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        Object.values(data).map((todo) => {
          useTodoStore.getState().addTodo(todo);
        });
      }
    });
  }, []);

  const handleAddTodo = async (text: string) => {
    const newTodo = {
      text,
      completed: false,
    };

    const newTodoRef = await push(ref(database, "todos"), newTodo);
    const newTodoKey = newTodoRef.key;
    if (newTodoKey) {
      const type = ydoc.getMap("todos");
      type.set(newTodoKey, newTodo);
    }
    
  };
  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        type="text"
        onChange={(e) => handleAddTodo(e.target.value)}
        placeholder="Enter todo text..."
      />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            {/* <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
