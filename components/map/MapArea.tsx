"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Maximize2, ZoomIn, ZoomOut, Crosshair } from "lucide-react";

// TODO: Replace with your actual Mapbox access token
// It's best practice to use an environment variable: process.env.NEXT_PUBLIC_MAPBOX_TOKEN
mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

export default function MapArea() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [zoom, setZoom] = useState(130); // Display as percentage

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12", // Default Mapbox style
      center: [-77.3963, 25.0343], // Nassau, Bahamas coordinates
      zoom: 11,
      attributionControl: false,
    });

    map.current.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-left",
    );

    // Update zoom display when map zoom changes
    map.current.on("zoom", () => {
      if (map.current) {
        const currentZoom = map.current.getZoom();
        setZoom(Math.round((currentZoom / 22) * 100)); // Convert to percentage
      }
    });

    // Set initial zoom
    setZoom(Math.round((11 / 22) * 100));

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative h-full w-full bg-gray-300">
      {/* Map Integration */}
      <div ref={mapContainer} className="absolute inset-0 h-full w-full" />

      {/* Custom Controls */}
      <button className="absolute left-4 top-4 rounded-lg bg-white/90 p-2 text-gray-700 shadow-sm hover:bg-white transition-colors">
        <Maximize2 size={20} />
      </button>

      <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
        <button
          className="p-1 hover:text-black text-gray-600"
          onClick={() => map.current?.zoomOut()}
        >
          <ZoomOut size={18} />
        </button>
        <span className="min-w-[40px] text-center text-xs font-bold text-gray-800">
          {zoom}%
        </span>
        <button
          className="p-1 hover:text-black text-gray-600"
          onClick={() => map.current?.zoomIn()}
        >
          <ZoomIn size={18} />
        </button>
      </div>

      <button className="absolute bottom-16 right-4 rounded-full bg-white/90 p-2 text-gray-700 shadow-sm hover:bg-white transition-colors">
        <Crosshair size={20} />
      </button>
    </div>
  );
}
