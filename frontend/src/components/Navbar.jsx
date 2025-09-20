import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MapPinIcon,
  MapIcon,
  ArchiveBoxIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

// Navigation data with a consistent structure
const navigation = [
  { name: "Virtual Tour", to: "/virtualtour", icon: MapPinIcon },
  { name: "Interactive maps", to: "/interactive-maps", icon: MapIcon },
  { name: "Archive", to: "/archive", icon: ArchiveBoxIcon },
  { name: "Events", to: "/events", icon: CalendarIcon },
];

// Utility function for conditional class names
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/40 backdrop-blur-md border-b border-amber-900/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:bg-white/10 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-all duration-200">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>

          <div className="flex flex-1 items-center justify-between sm:items-stretch">
            {/* Logo Section with a new glowing effect */}
            <div className="flex shrink-0 items-center">
              <NavLink to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity duration-200"></div>
                  <img
                    alt="Monastery360"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=orange&shade=400"
                    className="relative h-8 w-8"
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-white drop-shadow-lg group-hover:text-amber-300 transition-colors duration-200">
                    Monastery<span className="text-amber-400">360°</span>
                  </h1>
                </div>
              </NavLink>
            </div>

            {/* Navigation Links (Desktop) */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-amber-900/20 text-amber-300 border-amber-400/40 shadow-lg"
                          : "text-white/80 hover:bg-white/10 hover:text-amber-300 border-transparent",
                        "rounded-lg px-3 py-2 text-sm font-medium flex flex-col items-center space-y-1 border transition-all duration-200 drop-shadow-sm"
                      )
                    }
                  >
                    <item.icon aria-hidden="true" className="size-4" />
                    <span className="text-xs">{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden bg-gray-900/90 backdrop-blur-md border-t border-amber-900/50">
        <div className="space-y-2 px-4 pt-3 pb-4">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={NavLink}
              to={item.to}
              className={({ isActive }) =>
                classNames(
                  isActive
                    ? "bg-amber-900/20 text-amber-300 border-l-4 border-amber-400"
                    : "text-white/80 hover:bg-white/10 hover:text-amber-300 border-l-4 border-transparent",
                  "flex items-center space-x-3 rounded-r-lg px-4 py-2.5 text-base font-medium transition-all duration-200"
                )
              }
            >
              <item.icon aria-hidden="true" className="size-5" />
              <span>{item.name}</span>
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
