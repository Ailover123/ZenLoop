import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Focus from "./pages/Focus";
import ZenCodeEntry from "./pages/ZenCodeEntry";
import ZenCodeRoomUpdated from "./pages/ZenCodeRoomUpdated";
import Docs from "./pages/Docs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/focus" element={<Focus />} />
      <Route path="/zen-code" element={<ZenCodeEntry />} />
      <Route path="/zen-code/:zenCode" element={<ZenCodeRoomUpdated />} />
      <Route path="/docs" element={<Docs />} />
    </Routes>
  );
}

export default App;
