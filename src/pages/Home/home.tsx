import HeroImg from "@/assets/common/home/heroImg.png";
import Emirates from "@/assets/common/partner/Emirates.png";
import Airbnb from "@/assets/common/partner/Airbnb.png";
import Swiss from "@/assets/common/partner/Swiss.png";
import Trivago from "@/assets/common/partner/Trivago.png";
import Turkish from "@/assets/common/partner/Turkish.png";
import Services from "@/components/Home/Services";
import Banner from "@/components/Home/banner";
import Promotion from "@/components/Home/Promotion";
import ViewPackages from "@/components/Home/ViewPackages";
// import TrendingPackages from "@/components/Home/TrendingPackages";
import ClientFeedback from "@/components/Home/ClientFeedback";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <div>
        <img
          src={HeroImg}
          alt="hero img"
          className="w-full h-auto object-cover"
        />

        <div className="bg-[#f0eeee] py-3 md:py-5 overflow-x-auto">
          <div className="container mx-auto px-4">
            <div className="flex justify-around items-center gap-4 md:gap-8 lg:gap-12">
              <img
                className="h-6 md:h-10 lg:h-16 object-contain"
                src={Emirates}
                alt="Emirates"
              />
              <img
                className="h-6 md:h-10 lg:h-16 object-contain"
                src={Trivago}
                alt="Trivago"
              />
              <img
                className="h-6 md:h-10 lg:h-16 object-contain"
                src={Airbnb}
                alt="Airbnb"
              />
              <img
                className="h-6 md:h-10 lg:h-16 object-contain"
                src={Turkish}
                alt="Turkish Airlines"
              />
              <img
                className="h-6 md:h-10 lg:h-16 object-contain"
                src={Swiss}
                alt="Swiss"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <Services />
        <Banner />
        <Promotion />
        <ViewPackages />
        {/* <TrendingPackages /> */}
        <ClientFeedback />
      </div>
    </div>
  );
};

export default Home;
