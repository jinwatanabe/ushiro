import "./App.css";
import { usecase } from "./container";
// import { ReflectionDriver } from "./driver/ReflectionDriver";

function App() {
  // const drvier = new ReflectionDriver();
  // (async () => {
  //   const reflections = await drvier.getAll();
  //   console.log(reflections);
  // })();;

  (async () => {
    const reflections = await usecase.getAll();
    console.log(reflections);
  })();

  return (
    <>
      <div className="text-blue-500">TailwindCSS</div>
      <button className="btn btn-primary">daisyUI</button>
    </>
  );
}

export default App;
