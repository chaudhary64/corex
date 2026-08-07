const Image = ({ ref, src, alt = "", ...props }) => {
  return (
    <img
      ref={(el) => {
        if (ref) {
          if (typeof ref === "function") {
            ref(el);
          } else {
            ref.current = el;
          }
        }
      }}
      src={src}
      alt={alt}
      loading="eager"
      {...props}
    />
  );
};

export default Image;
