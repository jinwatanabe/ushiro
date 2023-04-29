import { useEffect, useState } from "react";
import { Router } from "./Router";
import { usecase } from "./container";
import { supabase } from "./lib/SuperbaseClient";
import { Session } from "@supabase/supabase-js";
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

  const [_, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Router></Router>
    </>
  );
}

export default App;
