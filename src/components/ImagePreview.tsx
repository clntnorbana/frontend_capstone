import { useEffect, useState } from "react";

interface ImagePreviewProps {
  file: FileList | null;
}

const ImagePreview = (props: ImagePreviewProps) => {
  const [preview, setPreview] = useState<string[]>([]);

  const files = props.file;

  useEffect(() => {
    if (!files) return;

    const temp = [];

    for (let i = 0; i < files.length; i++) {
      temp.push(URL.createObjectURL(files[i]));
    }

    const objURLs = temp;
    setPreview(objURLs);

    // free memory
    for (let i = 0; i < objURLs.length; i++) {
      return () => {
        URL.revokeObjectURL(objURLs[i]);
      };
    }
  }, [files]);

  return (
    <>
      {preview &&
        preview.map((img, index) => {
          return (
            <img className="w-full h-full object-cover" key={index} src={img} />
          );
        })}
    </>
  );
};
export default ImagePreview;
