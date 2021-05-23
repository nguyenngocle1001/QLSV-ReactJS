import logo from "./logo.svg";
import "./App.scss";
import MainLayout from "./Components/Base/layout/layout";
import ContextProvider from "./Context";

function App() {
  return (
    <ContextProvider>
      <MainLayout />
    </ContextProvider>
  );
}

export default App;
