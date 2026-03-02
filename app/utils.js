export default function cloudinaryUrl(src, width = 1000, height = 800) {
  return src.replace(
    "/upload/",
    `/upload/f_auto,c_fill,w_${width},h_${height}/`
  );
}