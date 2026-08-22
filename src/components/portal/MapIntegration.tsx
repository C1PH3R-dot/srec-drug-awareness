import { MapPin, Navigation, Filter } from "lucide-react";
import { useState } from "react";

const HOSPITALS = [
  {
    name: "Sri Ramakrishna Engineering College (SREC)",
    location: "Coimbatore, Tamil Nadu",
    lat: 11.0858,
    lng: 76.9535,
    type: "Campus",
    distance: "Origin",
  },
  {
    name: "Coimbatore Medical College Hospital",
    location: "Trichy Road, Coimbatore",
    lat: 11.0202,
    lng: 76.9271,
    type: "Hospital",
    distance: "8.5 km",
  },
  {
    name: "PSG Hospitals",
    location: "Peelamedu, Avinashi Road, Coimbatore",
    lat: 11.0089,
    lng: 76.9654,
    type: "Hospital",
    distance: "7.2 km",
  },
  {
    name: "Kovai Medical Center and Hospital (KMCH)",
    location: "Avinashi Road, Coimbatore",
    lat: 11.0228,
    lng: 76.9856,
    type: "Hospital",
    distance: "8.9 km",
  },
];

export function MapIntegration() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);

  const filteredHospitals =
    selectedFilter === "All" ? HOSPITALS : HOSPITALS.filter((h) => h.type === selectedFilter);

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-cyan-950/20 to-slate-950/40 animate-gradient-shift"></div>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Emergency Hospital Route Map & Campus Proximity
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Interactive spatial map showing nearby health centers from Sri Ramakrishna Engineering
          College (SREC) campus.
        </p>
      </div>

      {/* Map Container & Info Section */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Map Section */}
        <div className="glass rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl">
          <div className="relative h-96 w-full bg-slate-900">
            {/* Embedded Google Maps */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.8945656789283!2d76.9535!3d11.0858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sSri%20Ramakrishna%20Engineering%20College!2s11.0858%2C76.9535!5e0!3m2!1sen!2sin!4v1692345678901"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 p-4 bg-slate-950/80 backdrop-blur">
            <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 transition-colors">
              <Navigation className="h-4 w-4" /> Get Directions
            </button>
            <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700/50 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-700 transition-colors border border-slate-600">
              <MapPin className="h-4 w-4" /> Full Route
            </button>
          </div>
        </div>

        {/* Hospital List Sidebar */}
        <div className="glass rounded-2xl p-4 border border-cyan-500/20 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-cyan-400" />
            <h3 className="font-semibold text-white">Nearby Centers</h3>
          </div>

          {/* Filter Buttons */}
          <div className="mb-4 flex flex-col gap-2">
            {["All", "Hospital", "Campus"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedFilter(type)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  selectedFilter === type
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Hospital List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredHospitals.map((hospital) => (
              <button
                key={hospital.name}
                onClick={() => setSelectedHospital(hospital.name)}
                className={`w-full text-left rounded-lg p-3 transition-all ${
                  selectedHospital === hospital.name
                    ? "bg-cyan-600/20 border border-cyan-500/50"
                    : "bg-slate-700/30 border border-transparent hover:bg-slate-700/50"
                }`}
              >
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {hospital.name}
                    </p>
                    <p className="text-[10px] text-slate-400 line-clamp-2">
                      {hospital.location}
                    </p>
                    <p className="text-[10px] text-cyan-400 font-semibold mt-1">
                      {hospital.distance}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Info Badge */}
          <div className="mt-4 rounded-lg bg-cyan-500/10 p-2 border border-cyan-500/20">
            <p className="text-[10px] text-cyan-300 text-center">
              🚑 All centers offer emergency de-addiction support & counselling
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Hospitals", value: "3" },
          { label: "Avg. Distance", value: "8.2 km" },
          { label: "Response Time", value: "<15 min" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-4 border border-cyan-500/20">
            <p className="text-xs font-semibold text-slate-400">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold text-cyan-400">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
