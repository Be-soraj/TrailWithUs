import Text from "../common/text";
import Paresh from "@/assets/home/parise.png";
import { Button } from "../ui/button";
import { CustomCarousel } from "@/components/common/CustomCarousel";
import { Link } from "react-router";

const Promotion = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-20">
          {/* Text Content */}
          <div className="lg:w-1/2 space-y-6">
            <Text
              type="caption"
              className="text-[#DF6951] font-semibold uppercase tracking-widest"
            >
              Promotion
            </Text>

            <Text
              type="title"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#181E4B] leading-tight"
            >
              We Provide You Best Europe Sightseeing Tours
            </Text>

            <Text
              type="description"
              className="text-gray-600 text-base md:text-lg leading-relaxed max-w-lg"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              earum eaque voluptatum nostrum, autem commodi quasi officiis.
              Animi exercitationem eos praesentium obcaecati quos ipsum rem
              minus, assumenda, aliquid quis sapiente?
            </Text>

            <div className="pt-2">
              <Button className="bg-[#DF6951] hover:bg-[#c3533d] px-8 py-6 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/tour-packages">Get Tour</Link>
              </Button>
            </div>

            <div className="pt-6">
              <CustomCarousel />
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            <div className="relative">
              <img
                src={Paresh}
                alt="Europe sightseeing tour"
                className="rounded-xl shadow-2xl w-full h-auto max-w-lg mx-auto lg:max-w-none"
              />
              <div className="absolute -z-10 w-full h-full bg-[#d5746176] rounded-xl -bottom-4 -right-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
