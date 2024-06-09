import * as Y from "yjs"
import { IndexeddbPersistence } from "y-indexeddb";

const ydoc = new Y.Doc();
const roomName = "my-room-name";
const provider = new IndexeddbPersistence(roomName, ydoc);

provider.on("synced", () => {
  console.log("content from the database is loaded");
});

const Dashboard = () => {

  return (
    <div className="App">
      
    </div>
  );
};

export default Dashboard;
