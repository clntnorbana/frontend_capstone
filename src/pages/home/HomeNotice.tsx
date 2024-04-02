import { Button } from "@/components/ui/button";

interface HomeNoteProps {
  onClose: () => void;
}

const HomeNote = ({ onClose }: HomeNoteProps) => {
  const useCases = [
    {
      title: "Profile Registration",
      steps: [
        "You need to register in the system first to be able to request a certificate. Make sure to provide accurate information to avoid any issues when making a request.",
        "Once you are registered, the system will provide a profile ID for you. Please keep it, as it is necessary when making a request.",
      ],
    },
    {
      title: "Request Certificate",
      steps: [
        "The system will ask for your profile ID; please provide it. The system will allow you to make a request if you exist in the system.",
        "Once you successfully request a certificate, the system will provide a transaction ID. Keep it, as you can use it to check the request status.",
        "The system will notify you via SMS message once your request is approved or rejected, proceed to search your request using your TRANSACTION ID in the search field in the home page.",
        "Once your request has been approved, download and print the profiling form and proceed to barangay office to claim your requested document.",
      ],
    },
  ];

  return (
    <div className="lg:border absolute z-20 top-0 max-w-[800px] mt-5 lg:shadow-lg bg-white overflow-y-scroll">
      <div className="bg-pink-500 p-4 flex justify-between">
        <h1 className="text-xl text-gray-50 font-bold">Notice</h1>
        <Button
          variant={"outline"}
          className="bg-transparent text-gray-50 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
      <div className="p-5">
        <p className="text-justify">
          This website is developed to make the requesting of
          <span className="font-medium">
            {" "}
            Certificate of Barangay Clearance
          </span>{" "}
          and <span className="font-medium">Certificate of Indigency</span>{" "}
          certificates easier for the busy community members of Barangay Malamig
          without the need for in-person visits. Residents can conveniently
          apply for certificates without having to go in person and can easily
          fill out the online form to request a certificate.
        </p>
        <div className="mt-5">
          {useCases.map((item, index) => {
            return (
              <div key={index} className="mb-5">
                <h1 className="font-bold text-gray-700">{item.title}</h1>
                <div>
                  {item.steps.map((step, index) => {
                    return (
                      <div className="flex space-x-3" key={index}>
                        <p className="font-medium">{index + 1}.</p>
                        <p className="text-justify">{step}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeNote;
