import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/common/home/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { TbPointFilled } from "react-icons/tb";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const navLinks = [
  { path: "/home", label: "Home" },
  { path: "/about", label: "About" },
  {
    path: "#",
    label: "Services",
    subLinks: [
      { path: "/tour-packages", label: "Tour Packages" },
      // { path: "/musical-events", label: "Musical Events" },
      // { path: "/build-package", label: "Build Package", isHighlighted: true },
    ],
  },
  { path: "/upcoming-packages", label: "Upcoming Packages" },
];

export function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container mx-auto my-5 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/home" className="w-fit">
            <img
              className="w-24 sm:w-28 md:w-32"
              src={logo}
              alt="Company Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center h-full">
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  <NavigationMenuItem className="">
                    <Link to="/home" className={navigationMenuTriggerStyle()}>
                      Home
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/about" className={navigationMenuTriggerStyle()}>
                      About
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                    <NavigationMenuContent className="flex flex-col gap-1 p-2 w-[300px] border border-[rgba(217,217,217,0.34)]  backdrop-blur-[50px] rounded-lg shadow-lg whitespace-nowrap">
                      <Link
                        className="text-white hover:bg-[#839bba]  px-4 py-2 rounded-md transition-colors text-center truncate"
                        to={"/tour-packages"}
                      >
                        Tour Packages
                      </Link>
                      {/* <Link
                        className="text-white hover:bg-[#839bba]  px-4 py-2 rounded-md transition-colors text-center truncate"
                        to={"/musical-events"}
                      >
                        Musical Events
                      </Link> */}
                      {/* <Link
                        className="text-white hover:bg-[#839bba]  px-4 py-2 rounded-md transition-colors text-center truncate font-medium"
                        to={"/build-package"}
                      >
                        Build Package
                      </Link> */}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  {/* <NavigationMenuItem>
                    <Link
                      to="/Upcomming Packages"
                      className={navigationMenuTriggerStyle()}
                    >
                      Upcomming Packages
                    </Link>
                  </NavigationMenuItem> */}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>
          <Button
            className="bg-[#DF6951] hover:bg-[#c3533d] max-md:hidden ml-2"
            variant="default"
          >
            <Link to="/ContactUs">Get in Touch</Link>
          </Button>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-4">
            <Button
              className="bg-[#DF6951] hover:bg-[#c3533d] hidden sm:block"
              variant="default"
            >
              <Link to="/ContactUs">Get in Touch</Link>
            </Button>

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger aria-label="Open menu">
                <Menu className="h-6 w-6 text-white" />
              </SheetTrigger>
              <SheetContent side="top" className="p-4">
                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <div key={link.path}>
                      {link.subLinks ? (
                        <div className="px-4 ">
                          <button
                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                            className="text-lg font-medium w-full text-left flex justify-between items-center"
                            aria-expanded={isServicesOpen}
                          >
                            {link.label}
                            <svg
                              className={`w-4 h-4 ml-2 transition-transform ${
                                isServicesOpen ? "rotate-180" : ""
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>

                          {isServicesOpen && (
                            <div className="flex flex-col gap-1 p-2 w-full  backdrop-blur-[50px]">
                              {link.subLinks.map((subLink) => (
                                <>
                                  <Link
                                    key={subLink.path}
                                    className={`flex items-center px-4 py-2 rounded-md transition-colors hover:text-[#DF6951]`}
                                    to={subLink.path}
                                    onClick={closeMobileMenu}
                                  >
                                    <TbPointFilled size={20} />
                                    {subLink.label}
                                  </Link>
                                </>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={link.path}
                          className="px-4 py-2 text-lg font-medium"
                          onClick={closeMobileMenu}
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
