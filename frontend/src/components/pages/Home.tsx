import React from "react";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hintergrundbild */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1602512637530-f61ba0e205f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
        }}
      ></div>

      {/* Overlay Inhalt */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Willkommen bei <span className="text-teal-400">Metino</span>
        </h1>
        <p className="text-gray-300 max-w-2xl mb-8">
          Die beste Anlaufstelle für Metin2 Items, Serverinfos und Preise.
          Modern, schnell und zuverlässig!
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/items"
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded shadow transition"
          >
            Zu den Items (kommt noch)
          </a>
          <a
            href="/server"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded shadow transition"
          >
            Server Übersicht (kommt noch)
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-6xl">
          <div className="bg-white bg-opacity-5 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Schnell & Aktuell</h3>
            <p className="text-gray-300">
              Unsere Datenbank wird regelmäßig aktualisiert, damit du immer die
              neuesten Preise kennst.
            </p>
          </div>
          <div className="bg-white bg-opacity-5 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Modernes Design</h3>
            <p className="text-gray-300">
              Lucerna Laetus präsentiert sich im modernen Look – optimiert für
              alle Geräte.
            </p>
          </div>
          <div className="bg-white bg-opacity-5 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-300">
              Werde Teil unserer Community und tausche dich mit anderen Spielern
              aus!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
