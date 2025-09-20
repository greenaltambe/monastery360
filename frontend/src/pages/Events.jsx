const Events = () => {
  const events = [
    {
      id: 1,
      title: "Losar Festival",
      date: "February 18, 2025",
      location: "Rumtek Monastery, Sikkim",
      description: "Celebrate Tibetan New Year with sacred rituals, vibrant dances, and prayers.",
      image: "/hero-monastery.jpg",
    },
    {
      id: 2,
      title: "Saga Dawa",
      date: "June 5, 2025",
      location: "Pemayangtse Monastery, Sikkim",
      description: "A holy month commemorating Buddha’s birth, enlightenment, and nirvana.",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Pemyangtse_Monastery_Sikkim.jpg",
    },
    {
      id: 3,
      title: "Cham Dance Festival",
      date: "October 10, 2025",
      location: "Enchey Monastery, Gangtok",
      description: "Monks perform mystical mask dances depicting deities and legends.",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Cham_Dance_in_Sikkim.jpg",
    },
    {
      id: 4,
      title: "Drupka Teshi",
      date: "July 21, 2025",
      location: "Phodong Monastery, Sikkim",
      description: "Marks Buddha’s first teaching of Dharma, celebrated with rituals and prayers.",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Phodong_Monastery.jpg",
    },
    {
      id: 5,
      title: "Kagyed Dance",
      date: "December 12, 2025",
      location: "Rumtek Monastery, Sikkim",
      description: "Spiritual Cham dance performed before Losar to ward off evil spirits.",
      image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Cham_Dance_Sikkim.jpg",
    },
    {
      id: 6,
      title: "Pang Lhabsol",
      date: "September 3, 2025",
      location: "Rabdentse Ruins, Sikkim",
      description: "Unique festival honoring Mt. Kanchenjunga, protector deity of Sikkim.",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Rabdentse_ruins_Pelling_Sikkim.jpg",
    },
  ];

  return (
    <div className="mt-16 min-h-screen bg-yellow-50">
      <div className="container mx-auto px-6 py-12">
        
        {/* Header */}
        <h1 className="text-5xl font-bold text-center text-red-900 mb-14 tracking-wide">
          🏯 Monastery Events
        </h1>

        {/* Event Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => (
            <div
              key={event.id}
              className="relative rounded-2xl shadow-lg overflow-hidden group h-80"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundImage: `url(${event.image})` }}
              ></div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition duration-300"></div>

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                <h2 className="text-2xl font-bold text-yellow-300 mb-2">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-200 mb-1">📅 {event.date}</p>
                <p className="text-sm text-gray-200 mb-3">📍 {event.location}</p>
                <p className="text-gray-100 text-sm mb-4">{event.description}</p>
                <button className="bg-gradient-to-r from-yellow-500 to-red-700 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90">
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;


