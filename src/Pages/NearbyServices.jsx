import React, { useState, useEffect } from "react";

export default function NearbyServices() {
  const [coords, setCoords] = useState(null);
  const [places, setPlaces] = useState([]);
  const [status, setStatus] = useState("idle");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        (err) => {
          console.error(err);
          setStatus("error");
        }
      );
    }
  }, []);

  async function fetchNearby() {
    if (!coords) return;
    setStatus("loading");

    const overpassUrls = [
      "https://overpass-api.de/api/interpreter",
      "https://lz4.overpass-api.de/api/interpreter",
      "https://overpass.kumi.systems/api/interpreter",
      "https://overpass.openstreetmap.ru/api/interpreter",
      "https://overpass.nchc.org.tw/api/interpreter",
    ];

    let queryAmenities = "";
    if (filter === "all") {
      queryAmenities = `
        node["amenity"="hospital"](around:10000,${coords.lat},${coords.lon});
        way["amenity"="hospital"](around:10000,${coords.lat},${coords.lon});
        relation["amenity"="hospital"](around:10000,${coords.lat},${coords.lon});
        node["amenity"="police"](around:10000,${coords.lat},${coords.lon});
        way["amenity"="police"](around:10000,${coords.lat},${coords.lon});
        relation["amenity"="police"](around:10000,${coords.lat},${coords.lon});
        node["amenity"="fire_station"](around:10000,${coords.lat},${coords.lon});
        way["amenity"="fire_station"](around:10000,${coords.lat},${coords.lon});
        relation["amenity"="fire_station"](around:10000,${coords.lat},${coords.lon});
      `;
    } else {
      queryAmenities = `
        node["amenity"="${filter}"](around:10000,${coords.lat},${coords.lon});
        way["amenity"="${filter}"](around:10000,${coords.lat},${coords.lon});
        relation["amenity"="${filter}"](around:10000,${coords.lat},${coords.lon});
      `;
    }

    const query = `
      [out:json];
      (
        ${queryAmenities}
      );
      out center tags;
    `;

    let found = false;
    for (let i = 0; i < overpassUrls.length; i++) {
      const url = overpassUrls[i];
      try {
        const res = await fetch(url, {
          method: "POST",
          body: new URLSearchParams({ data: query }),
        });
        if (!res.ok) continue;
        const data = await res.json();
        // Log elements for debugging
        console.log("NearbyServices Overpass elements:", data.elements);
        if (data.elements && data.elements.length > 0) {
          setPlaces(data.elements);
          setStatus("success");
          found = true;
          break;
        }
      } catch (e) {
        console.error(`Error with Overpass mirror ${url}:`, e);
      }
    }
    if (!found) {
      setStatus("error");
    }
  }

  function openDirections(lat, lon) {
    if (!coords) return;
    const url = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${coords.lat},${coords.lon};${lat},${lon}`;
    window.open(url, "_blank");
  }

  const getServiceIcon = (amenity) => {
    switch (amenity) {
      case 'hospital':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m0 0l4-4m3 4l3-3" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
          </svg>
        );
      case 'police':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'fire_station':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
    }
  };

  const getServiceColor = (amenity) => {
    switch (amenity) {
      case 'hospital':
        return 'bg-emerald-50 border-emerald-200';
      case 'police':
        return 'bg-green-50 border-green-200';
      case 'fire_station':
        return 'bg-teal-50 border-teal-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Emergency Services Locator</h1>
              <p className="text-gray-600 mt-1">Find essential services within 10-kilometer radius of your location</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              >
                <option value="all">All Emergency Services</option>
                <option value="hospital">Medical Facilities</option>
                <option value="police">Law Enforcement</option>
                <option value="fire_station">Fire & Rescue Services</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={fetchNearby}
                disabled={status === "loading" || !coords}
                className="w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status === "loading" ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Locating Services
                  </div>
                ) : (
                  "Search Services"
                )}
              </button>
            </div>
          </div>
        </div>

        {status === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-red-800 font-semibold text-lg">Service Unavailable</h3>
                <p className="text-red-700">Unable to retrieve service data. Please verify your connection and try again.</p>
              </div>
            </div>
          </div>
        )}

        {places.length > 0 && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Search Results</h2>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                  {places.length} service{places.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
            
            <div className="grid gap-4">
              {places.map((p) => (
                <div 
                  key={p.id} 
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 flex-shrink-0">
                      {getServiceIcon(p.tags?.amenity)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {p.tags?.name || "Unnamed Service"}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        {p.tags?.["addr:street"] && (
                          <div className="flex items-start gap-2 text-gray-600">
                            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm">{p.tags["addr:street"]}</span>
                          </div>
                        )}
                        
                        {p.tags?.phone && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-sm font-mono">{p.tags.phone}</span>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() =>
                          openDirections(
                            p.lat || p.center?.lat,
                            p.lon || p.center?.lon
                          )
                        }
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {status === "success" && places.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Services Found</h3>
            <p className="text-gray-600">No emergency services were found within the specified radius. Please try a different service type or expand your search area.</p>
          </div>
        )}
      </div>
    </div>
  );
}