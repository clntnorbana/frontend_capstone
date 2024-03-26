import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { useGetResidentByIdQuery } from "@/redux/slices/resident.slice";
import { Search, X } from "lucide-react";
import { useState } from "react";

type HomeSearchProfileProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HomeSearchProfile = ({ isOpen, onClose }: HomeSearchProfileProps) => {
  const [profileId, setProfileId] = useState<string>("");

  const { data: residentProfile, isLoading } = useGetResidentByIdQuery(
    profileId ? profileId : undefined
  );

  return (
    <Modal isOpen={isOpen}>
      <div className="lg:w-[500px] w-full">
        <X
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => {
            setProfileId(""), onClose();
          }}
        />
        <header className="mb-3">
          <h1 className="font-bold text-gray-700">Search Profile</h1>
        </header>
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter 12 digit profile ID"
            onChange={(e) => setProfileId(e.target.value)}
            value={profileId}
            maxLength={12}
          />
          <Search className="absolute h-full top-0 right-3 hidden lg:block" />
        </div>
        {/* profile */}
        {profileId && profileId.length === 12 ? (
          isLoading ? (
            <p>loading...</p>
          ) : residentProfile && residentProfile.length > 0 ? (
            <div className="flex flex-col justify-center items-center mt-5">
              <h1 className="font-bold text-gray-700 mb-4 text-lg">
                You are registered!
              </h1>
              <div className="w-[130px] h-[130px] rounded-full overflow-hidden">
                <img
                  className="object-cover h-full w-full"
                  src={residentProfile[0].img_url}
                  alt="image"
                />
              </div>
              <div className="mt-3 text-center">
                <p className="capitalize font-bold text-gray-700">
                  {residentProfile[0].firstname}{" "}
                  {residentProfile[0].middlename
                    ? residentProfile[0].middlename
                    : null}{" "}
                  {residentProfile[0].lastname}
                </p>
                <p className="text-sm text-gray-700">
                  {residentProfile[0].profile_id}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center mt-5">no result</p>
          )
        ) : null}
      </div>
    </Modal>
  );
};
export default HomeSearchProfile;
