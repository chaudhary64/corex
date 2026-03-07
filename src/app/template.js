import SmoothScroller from "./utils/SmoothScroller";

const template = ({ children }) => {
  return (
    <>
      <SmoothScroller>
        {children}
      </SmoothScroller>
    </>
  );
};

export default template;
