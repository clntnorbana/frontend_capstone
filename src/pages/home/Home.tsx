import { BadgeInfo, Search } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import HomeNote from "./HomeNotice";
import logo from "../../assets/logo.png";
import { Button } from "@/components/ui/button";
import HomeSearchProfile from "./HomeSearchProfile";
import HomeSearchRequest from "./HomeSearchRequest";
import background from "../../assets/background.jpg";
import { motion } from "framer-motion";

const Home = () => {
  const [openNotice, setOpenNotice] = useState<boolean>(false);
  const [openSearchProfileModal, setOpenSearchProfileModal] =
    useState<boolean>(false);
  const [openSearchRequestModal, setOpenSearchRequestModal] =
    useState<boolean>(false);

  return (
    <div>
      <header className="bg-pink-400 h-[80px] flex items-center">
        <div className="container mx-auto flex justify-end">
          <button
            className="flex items-center space-x-1"
            onClick={() => setOpenNotice(true)}
          >
            <BadgeInfo />
            <span>Notice</span>
          </button>
        </div>
      </header>
      <div
        className="md:py-[40px] bg-blue-100 h-screen flex flex-col justify-center items-center"
        style={{
          background: `linear-gradient(rgba(224, 231, 236, 0.8), rgba(224, 231, 236, 0.8)) ,url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{ opacity: 0, y: 25 }}
          transition={{
            duration: 0.1,
            delay: 0.1,
          }}
          className="container mx-auto flex justify-center items-center"
        >
          <div className="flex justify-center flex-col items-center">
            {openNotice ? (
              <HomeNote onClose={() => setOpenNotice(false)} />
            ) : null}
            <div className="h-[180px] w-[180px]">
              <img
                className="w-full h-full object-cover"
                src={logo}
                alt="logo"
              />
            </div>

            <div>
              <h1 className="font-bold text-center mb-5 text-2xl uppercase leading-6">
                Certificate Request <br /> Services System
              </h1>
              <p className="text-center text-sm font-bold">
                Barangay Malamig, Mandaluyong City
              </p>
              <div className="mt-5 flex flex-col justify-center space-y-2">
                <NavLink
                  to={"/forgot_profile"}
                  className={"underline text-blue-900 font-bold"}
                >
                  forgot profile ID?
                </NavLink>
                {/* search profile id */}
                <Button
                  variant={"outline"}
                  className="font-bold text-gray-700 flex justify-center items-center space-x-2"
                  onClick={() => setOpenSearchProfileModal(true)}
                >
                  <span>Are you registered? Search...</span> <Search />{" "}
                </Button>
                {/* search profile modal */}
                <HomeSearchProfile
                  isOpen={openSearchProfileModal}
                  onClose={() => setOpenSearchProfileModal(false)}
                />
                {/* search certificate request */}
                <Button
                  variant={"outline"}
                  className="font-bold text-gray-700 flex justify-center items-center space-x-2"
                  onClick={() => setOpenSearchRequestModal(true)}
                >
                  <span>Check request status? Search...</span> <Search />{" "}
                </Button>
                {/* search certificate request modal */}
                <HomeSearchRequest
                  isOpen={openSearchRequestModal}
                  onClose={() => setOpenSearchRequestModal(false)}
                />
              </div>
              <div className="flex justify-center space-x-1 mt-5">
                <NavLink
                  className={
                    "uppercase rounded bg-blue-700 p-2 text-sm text-gray-50 hover:bg-blue-600 transition-all"
                  }
                  to={"/register"}
                >
                  Profile Register
                </NavLink>
                <NavLink
                  className={
                    "uppercase rounded bg-blue-700 p-2 text-sm text-gray-50 hover:bg-blue-600 transition-all"
                  }
                  to={"/request"}
                >
                  Request Certificate
                </NavLink>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="mt-5">
          <NavLink
            to={"/login"}
            className={"text-sm underline text-blue-900 font-bold"}
          >
            Admin Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default Home;
