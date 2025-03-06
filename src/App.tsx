import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./components/Board";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
            fontSize: "16px",
            padding: "12px",
          },
          success: {
            icon: "✅",
            style: { background: "#4CAF50" },
          },
          error: {
            icon: "❌",
            style: { background: "#FFCDD2", color: "#D32F2F" },
          },
        }}
      />
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </>
  );
}

export default App;
