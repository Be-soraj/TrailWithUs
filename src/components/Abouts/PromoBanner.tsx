import Text from "../common/text";
import PromoImg from "@/assets/about/PromoImg.png";
import { Button } from "../ui/button";
import { Link } from "react-router";

const Promotion = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-20">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-4 sm:space-y-5 md:space-y-6">
            <Text
              type="caption"
              className="text-[#DF6951] text-sm sm:text-base font-semibold uppercase tracking-widest"
            >
              Promotion
            </Text>

            <Text
              type="title"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#181E4B] leading-snug sm:leading-tight md:leading-tight"
            >
              Discover Europe's <span className="text-[#DF6951]">Finest</span>{" "}
              Sightseeing Tours
            </Text>

            <Text
              type="description"
              className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-md sm:max-w-lg"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              earum eaque voluptatum nostrum, autem commodi quasi officiis.
              Animi exercitationem eos praesentium obcaecati quos ipsum rem
              minus, assumenda, aliquid quis sapiente?
            </Text>

            <div className="pt-1 sm:pt-2">
              <Button className="bg-[#DF6951] hover:bg-[#c3533d] px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-sm sm:text-base md:text-lg font-semibold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg sm:shadow-lg sm:hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link to="/tour-packages">Explore Tours</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 mt-6 sm:mt-8 md:mt-10 lg:mt-0">
            <div className="relative">
              <img
                src={PromoImg}
                alt="Europe sightseeing tour"
                className="w-full h-auto max-w-md sm:max-w-lg mx-auto lg:max-w-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;