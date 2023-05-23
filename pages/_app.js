import '@/styles/globals.css'
import { StateContext } from "../context/stateContext";

function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Component {...pageProps} />
    </StateContext>
  );
}

export default App;
