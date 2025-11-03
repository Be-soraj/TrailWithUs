import PackagesSVG from "@/assets/svg/PackagesImage.svg";
import PackagesSVG1 from "@/assets/svg/PackagesImage1.svg";
import PackagesImage from "@/assets/home/PackagesImage.png";
import PackagesImage1 from "@/assets/home/PackagesImage1.png";
import { Button } from "../ui/button";
import { Link } from "react-router";

const ViewPackages = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-1 lg:gap-2">
      {/* First Package */}
      <div className="relative my-4 md:my-6 lg:my-10 flex-1">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-2 sm:px-4">
            <img
              src={PackagesSVG}
              alt="Banner text"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            />
            <div className="pt-4 sm:pt-6 md:pt-8 flex justify-center">
              <Button
                variant={"outline"}
                className="bg-transparent hover:bg-[#00000020] hover:text-white text-white px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 text-sm sm:text-base md:text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/tour-packages">View Packages</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="filter brightness-[65%]">
          <img
            src={PackagesImage}
            alt="Background"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Second Package */}
      <div className="relative my-4 md:my-6 lg:my-10 flex-1">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-2 sm:px-4">
            <img
              src={PackagesSVG1}
              alt="Banner text"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            />
            <div className="pt-4 sm:pt-6 md:pt-8 flex justify-center">
              <Button
                variant={"outline"}
                className="bg-transparent hover:bg-[#00000020] hover:text-white text-white px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 text-sm sm:text-base md:text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/tour-packages">View Packages</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="filter brightness-[65%]">
          <img
            src={PackagesImage1}
            alt="Background"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPackages;
