import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./components/DragDrop";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";

function App() {
  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen">
        <Navbar></Navbar>
        <DragDrop></DragDrop>
      </div>
    </DndProvider>
  );
}

export default App;

