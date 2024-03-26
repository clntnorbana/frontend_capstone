type ProfileRegisterFormSubmitProps = {
  boxChecked: boolean;
  setBoxChecked: (e: {
    target: {
      checked: boolean | ((prevState: boolean) => boolean);
    };
  }) => void;
};

const ProfileRegisterFormSubmit = ({
  boxChecked,
  setBoxChecked,
}: ProfileRegisterFormSubmitProps) => {
  return (
    <>
      <div className="text-center">
        <label>
          <input
            type="checkbox"
            checked={boxChecked}
            onChange={setBoxChecked}
          />{" "}
          By checking the box, you agreed to our terms & condition
          <button
            type="button"
            className="underline text-blue-600 hover:text-blue-800"
          >
            terms & condition
          </button>
          .
        </label>
      </div>
    </>
  );
};
export default ProfileRegisterFormSubmit;
