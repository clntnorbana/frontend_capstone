import ImagePreview from "@/components/ImagePreview";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

type ProfileRegisterFormUploadImageProps = {
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  fileProp: FileList | null;
};

const ProfileRegisterFormUploadImage = ({
  handleImageChange,
  file,
  fileProp,
}: ProfileRegisterFormUploadImageProps) => {
  return (
    <>
      <div className="grid w-full items-center gap-1.5 mb-2">
        <label>Your photo is needed for as part of identification</label>
      </div>
      <Input type="file" accept="image/*" onChange={handleImageChange} />

      {/* image preview */}
      {file ? (
        <div className="flex justify-center mt-5">
          <div className="h-[200px] w-[200px]">
            <ImagePreview file={fileProp} />
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ProfileRegisterFormUploadImage;
