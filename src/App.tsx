import "./App.css";
import { Router } from "./Router";
import { usecase } from "./container";
// import { ReflectionDriver } from "./driver/ReflectionDriver";

function App() {
  // const drvier = new ReflectionDriver();
  // (async () => {
  //   const reflections = await drvier.getAll();
  //   console.log(reflections);
  // })();;

  // (async () => {
  //   const reflections = await usecase.getAll();
  //   console.log(reflections);
  // })();

  return (
    <>
      <Router></Router>
    </>
  );
}

export default App;
