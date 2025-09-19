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
            {/* Hero Section */}
            <div className="relative isolate px-6 pt-20 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                        Welcome to <span className="text-orange-400">Monastery 360°</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
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
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <NavLink
                            key={feature.name}
                            to={feature.to}
                            className="flex flex-col items-center rounded-2xl bg-gray-800/50 p-6 text-center shadow-md hover:bg-gray-700/50 transition"
                        >
                            <feature.icon className="h-10 w-10 text-orange-400 mb-4" />
                            <h3 className="text-lg font-semibold">{feature.name}</h3>
                            <p className="mt-2 text-sm text-gray-400">{feature.description}</p>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
