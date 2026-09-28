import Home from "./app/components/Home";
import Loader from "./app/components/Loader";
import { LoadingProvider, useLoading } from "./app/context/LoadingProvider";
import SmoothScroller from "./app/utils/SmoothScroller";

const PageContent = () => {
  const { loading, setLoading } = useLoading();

  return (
    <>
      {/*
        The page mounts the moment the curtain starts to lift, so the hero is
        already positioned and waiting behind it. Nothing is in the DOM before
        that, which keeps the preloader's hold un-scrollable.
      */}
      {loading.revealed && <Home />}
      {!loading.animated && (
        <Loader
          onCurtainStart={() =>
            setLoading((prev) => ({ ...prev, revealed: true }))
          }
          onExitComplete={() =>
            setLoading((prev) => ({ ...prev, animated: true }))
          }
        />
      )}
    </>
  );
};

const App = () => {
  return (
    <LoadingProvider>
      <SmoothScroller>
        <PageContent />
      </SmoothScroller>
    </LoadingProvider>
  );
};

export default App;
