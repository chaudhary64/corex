import { useCallback } from "react";

export const unsplashSrcSet = (url, widths) =>
  widths
    .map((width) => `${url.replace(/([?&]w=)\d+/, `$1${width}`)} ${width}w`)
    .join(", ");

const Image = ({ ref, src, alt = "", loading = "lazy", ...props }) => {
  const setRef = useCallback(
    (el) => {
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    },
    [ref],
  );

  return (
    <img
      ref={setRef}
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      {...props}
    />
  );
};

export default Image;
