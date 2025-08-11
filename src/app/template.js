import Nav from "./components/ui/Nav";
import Footer from "./components/ui/Footer";
import SmoothScroller from "./utils/SmoothScroller";

const template = ({ children }) => {
  return (
    <>
      <SmoothScroller>
        <Nav />
        {children}
        <Footer />
      </SmoothScroller>
    </>
  );
};

export default template;
