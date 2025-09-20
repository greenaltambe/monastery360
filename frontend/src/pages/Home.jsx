import { NavLink } from "react-router-dom";
import { MapPinIcon, MapIcon, ArchiveBoxIcon, CalendarIcon } from "@heroicons/react/24/outline";

const features = [
    {
        name: "Virtual Tour",
        description: "Step inside monasteries with immersive 360° virtual experiences.",
        to: "/virtualtour",
        icon: MapPinIcon,
    },
    {
        name: "Interactive Maps",
        description: "Navigate and explore monasteries across Sikkim with ease.",
        to: "/interactive-maps",
        icon: MapIcon,
    },
    {
        name: "Archive",
        description: "Discover historical records, texts, and photo archives.",
        to: "/archive",
        icon: ArchiveBoxIcon,
    },
    {
        name: "Events",
        description: "Stay updated with cultural events and monastery festivals.",
        to: "/events",
        icon: CalendarIcon,
    },
];

const Home = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Hero Section with Full Screen Background */}
            <div className="relative isolate px-6 pt-20 lg:px-8 min-h-screen">
                <img
                    src="/hero-monastery.jpg"
                    alt="Monastery"
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="relative mx-auto max-w-3xl text-center">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                        Welcome to <span className="text-orange-400">Monastery 360°</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-white">
                        Explore the spiritual heart of Sikkim — discover monasteries, join virtual tours, browse archives, and experience events in one place.
                    </p>
                    <div className="mt-8 flex justify-center gap-x-4">
                        <NavLink
                            to="/virtualtour"
                            className="rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold shadow-sm hover:bg-orange-700"
                        >
                            Start Virtual Tour
                        </NavLink>
                        <NavLink
                            to="/interactive-maps"
                            className="rounded-lg bg-gray-700 px-6 py-3 text-sm font-semibold shadow-sm hover:bg-gray-600"
                        >
                            Explore Maps
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <NavLink
                            key={feature.name}
                            to={feature.to}
                            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900/20 via-gray-800/40 to-gray-900/60 backdrop-blur-sm p-8 text-center shadow-2xl border border-amber-700/20 hover:border-amber-500/40 hover:shadow-amber-500/10 hover:shadow-2xl transition-all duration-500 hover:scale-105"
                        >
                            {/* Decorative background pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Icon container */}
                            <div className="relative z-10 mb-6">
                                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-2 ring-amber-500/30 group-hover:ring-amber-400/50">
                                    <feature.icon className="h-8 w-8 text-amber-400 group-hover:text-amber-300 transition-colors duration-300" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-amber-50 mb-3 group-hover:text-white transition-colors duration-300">
                                    {feature.name}
                                </h3>
                                <p className="text-sm text-amber-100/70 leading-relaxed group-hover:text-amber-50/90 transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400/0 via-transparent to-orange-600/0 group-hover:from-amber-400/5 group-hover:to-orange-600/5 transition-all duration-500"></div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
