import Home from "./app/components/Home";
import Loader from "./app/components/Loader";
import { LoadingProvider, useLoading } from "./app/context/LoadingProvider";
import SmoothScroller from "./app/utils/SmoothScroller";

const PageContent = () => {
  const { loading } = useLoading();

  return <>{!loading.animated ? <Loader /> : <Home />}</>;
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
