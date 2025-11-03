import { Link } from "react-router";
import Text from "../common/text";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import ImageHolder from "./home-features/ImageHolder";
import * as Flags from "country-flag-icons/react/3x2";

const getFlagColor = (countryCode: string): string => {

  const colorMap: Record<string, string> = {
    CH: "#FF0000", // Switzerland
    BR: "#009B3A", // Brazil
    EG: "#CE1126", // Egypt
    US: "#3C3B6E", // United States
    FR: "#0055A4", // France
    DE: "#000000", // Germany
    IT: "#009246", // Italy
    ES: "#AA151B", // Spain
    JP: "#BC002D", // Japan
    CN: "#DE2910", // China
    IN: "#FF9933", // India
    CA: "#FF0000", // Canada
    AU: "#00008B", // Australia
    // Add more countries as needed
  };
  return colorMap[countryCode.toUpperCase()] || "#DF6951"; // Fallback to theme color
};

const TrendingPackages = () => {
  const tours = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      duration: "8 Days",
      peopleGoing: "25 People Going",
      location: "Switzerland",
      region: "Europe",
      price: "1,000 $",
      priceAddition: "+200 $",
      description:
        "Experience the breathtaking Swiss Alps, pristine lakes, and charming villages.",
      rating: "★★★★☆",
      countryCode: "CH",
    },
    {
      id: 2,
      image:
        "https://wallup.net/wp-content/uploads/2017/03/28/365983-trees-mist-forest-green-Amazon-Brazil-creeks-748x468.jpg",
      duration: "8 Days",
      peopleGoing: "30 People Going",
      location: "Amazon",
      region: "Brazil",
      price: "1,223 $",
      priceAddition: "+200 $",
      description:
        "Explore the world's largest rainforest and encounter exotic wildlife.",
      rating: "★★★★★",
      countryCode: "BR",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      duration: "8 Days",
      peopleGoing: "155 People Going",
      location: "Giza",
      region: "Egypt",
      price: "1,200 $",
      priceAddition: "+200 $",
      description:
        "Discover ancient wonders including the Great Pyramids and Sphinx.",
      rating: "★★★★★",
      countryCode: "EG",
    },
  ];

  const renderCountryFlag = (countryCode: string, title: string) => {
    try {
      const upperCode = countryCode.toUpperCase();
      const FlagComponent = (Flags as any)[upperCode];
      const bgColor = getFlagColor(upperCode);

      if (!FlagComponent) {
        console.warn(`No flag found for country code: ${upperCode}`);
        return null;
      }

      return (
        <div className="relative">
          <FlagComponent
            title={title}
            className="w-10 h-10 rounded-full object-cover"
            style={{
              backgroundColor: `${bgColor}`, // 25% opacity
              padding: "2px",
              border: `2px solid ${bgColor}`,
              boxSizing: "content-box",
            }}
          />
        </div>
      );
    } catch (error) {
      console.error(`Error rendering flag for ${countryCode}:`, error);
      return null;
    }
  };

  return (
    <section className=" mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <div className="text-center mb-16">
        <Text
          type="caption"
          className="text-[#DF6951] font-semibold uppercase tracking-widest mb-2"
        >
          Popular Tours
        </Text>
        <Text
          type="title"
          className="text-4xl md:text-5xl font-bold text-[#181E4B] mt-4 mb-6"
        >
          Trending Tour Packages
        </Text>
        <div className="w-20 h-1 bg-[#DF6951] mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-8 px-4  max-w-7xl ">
        {tours.map((tour) => (
          <Card
            key={tour.id}
            className="bg-white rounded-xl border border-gray-100 shadow-md pt-0 relative transition-all duration-300 hover:-translate-y-2 "
          >
            <div className="flex flex-col h-full">
              <div className="w-full h-48 overflow-hidden relative">
                <ImageHolder
                  imgClassName="object-cover w-full h-full rounded-t-xl"
                  img={tour.image}
                />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                  {tour.duration}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                  {tour.peopleGoing}
                </div>
              </div>

              <div className="w-16 h-16 absolute flex items-center justify-center bg-white rounded-full shadow-lg top-44 left-10 transform -translate-x-1/2 z-50">
                {renderCountryFlag(tour.countryCode, tour.location)}
              </div>

              <div className="p-6 flex-grow mt-8">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#181E4B]">
                      {tour.location}
                    </h3>
                    <p className="text-gray-500 text-sm">{tour.region}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#DF6951]">
                      {tour.price}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {tour.priceAddition}
                    </p>
                  </div>
                </div>

                {tour.rating && (
                  <div className="mb-3 text-yellow-400">{tour.rating}</div>
                )}

                <CardContent className="text-[#5E6282] text-sm leading-relaxed px-0 mb-4 line-clamp-3">
                  {tour.description}
                </CardContent>
              </div>

              <div className="px-6">
                <Button className="w-full py-3 bg-[#DF6951] text-white rounded-md hover:bg-[#c9563f] transition-colors duration-300 font-medium">
                  <Link to="/tour-packages">Explore Now </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TrendingPackages;
