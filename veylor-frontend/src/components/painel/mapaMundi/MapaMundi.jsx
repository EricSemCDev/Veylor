"use client";

import { MapContainer, ImageOverlay, useMap } from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Centraliza após aplicar zoom ideal
function Centralizador({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom]);
  return null;
}

export default function MapaMundi({ imagemURL }) {
  if (typeof window === "undefined") return null;
  const containerRef = useRef(null);
  const [dimensoes, setDimensoes] = useState(null);
  const [zoomConfig, setZoomConfig] = useState(null);

  // Carrega a imagem e pega dimensões
  useEffect(() => {
    const img = new Image();
    img.src = imagemURL;
    img.onload = () => {
      setDimensoes([img.naturalHeight, img.naturalWidth]);
    };
  }, [imagemURL]);

  // Calcula zoom ideal (cover) com base na tela
  useEffect(() => {
    if (!containerRef.current || !dimensoes) return;

    const container = containerRef.current;
    const [imgH, imgW] = dimensoes;

    const updateZoom = () => {
      const viewH = container.offsetHeight;
      const viewW = container.offsetWidth;

      const scaleX = viewW / imgW;
      const scaleY = viewH / imgH;
      const coverScale = Math.max(scaleX, scaleY);
      const coverZoom = Math.log2(coverScale);

      setZoomConfig({
        minZoom: coverZoom,
        zoom: coverZoom,
        center: [imgH / 2, imgW / 2],
        imageBounds: [[0, 0], [imgH, imgW]],
        moveBounds: [[0, 0], [imgH, imgW - 1]], // <- só o movimento é restrito
      });
    };


    updateZoom();
    const observer = new ResizeObserver(updateZoom);
    observer.observe(container);
    return () => observer.disconnect();
  }, [dimensoes]);

  return (
    <div ref={containerRef} className="w-full h-full rounded-br-[20px] rounded-tr-[20px] overflow-hidden transition-all duration-300">
      {zoomConfig && (
        <MapContainer
          crs={L.CRS.Simple}
          center={zoomConfig.center}
          zoom={zoomConfig.zoom}
          minZoom={zoomConfig.minZoom}
          maxZoom={3}
          zoomSnap={0.01}
          zoomDelta={0.01}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
          maxBounds={zoomConfig.moveBounds}
          maxBoundsViscosity={1.0}
          className="leaflet-container [&_.leaflet-control-attribution]:hidden"
        >
          <ImageOverlay url={imagemURL} bounds={zoomConfig.imageBounds} />
          <Centralizador center={zoomConfig.center} zoom={zoomConfig.zoom} />
        </MapContainer>
      )}
    </div>
  );
}
