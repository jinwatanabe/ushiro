import { useEffect, useState } from "react";
import { Router } from "./Router";
// import { usecase } from "./container";
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

  // (async () => {
  //   const status = await usecase.addLog(reflection);
  //   console.log(status);
  // })();

  const [_, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        // TODO: useNavigateとか使いたい
        if (
          window.location.pathname === "/login" ||
          window.location.pathname === "/register"
        )
          window.location.href = "/";
      } else {
        if (
          !(
            window.location.pathname === "/login" ||
            window.location.pathname === "/register"
          )
        )
          window.location.href = "/login";
      }
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (isLoading) return <>loading...</>;

  return (
    <>
      <Router></Router>
    </>
  );
}

export default App;
