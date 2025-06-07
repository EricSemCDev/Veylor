"use client";

import { MapContainer, ImageOverlay, useMap } from "react-leaflet";
import { useState, useEffect, useRef } from "react";
import { FaArrowRotateLeft } from "react-icons/fa6";
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

function BotaoReset({ center, zoom }) {
  const map = useMap();

  const handleClick = () => {
    map.panTo(center, {
      animate: true,
      duration: 2.5,
      easeLinearity: 0.08,
    });

    setTimeout(() => {
      map.flyTo(center, zoom, {
        duration: 1,
        easeLinearity: 0.1,
        animate: true
      });
    }, 500);
  };

  return (
    <button
      onClick={handleClick}
      className="
      w-11 h-11
      flex justify-center items-center
      absolute top-4 right-4 z-[1000] 
      bg-[rgba(13,1,31,0.60)] 
      border-1 border-[rgba(147,51,234,0.30)] rounded-full
      text-white
      cursor-pointer group
      hover:border-[rgba(147,51,234,1)] hover:bg-[rgba(147,51,234,0.60)] hover:scale-120
      transform transition-all duration-200 ease-in-out
      ">
      <FaArrowRotateLeft  className="text-lg transform transition-all duration-400 ease-in-out group-hover:-rotate-270"/>
    </button>
  );
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
    <div ref={containerRef} tabIndex={0} className="w-full h-full rounded-br-[20px] rounded-tr-[20px] overflow-hidden transition-all duration-500 ease-in-out">
      {zoomConfig && (
        <>
        <MapContainer
          preferCanvas={true}
          crs={L.CRS.Simple}
          center={zoomConfig.center}
          zoom={zoomConfig.zoom}
          minZoom={zoomConfig.minZoom}
          maxZoom={3}
          zoomControl={false}
          keyboard={false}
          zoomAnimation={true}
          fadeAnimation={true}
          worldCopyJump={false}
          zoomSnap={0.1}
          zoomDelta={0.1}
          keyboardZoomDelta={0.1}
          wheelPxPerZoomLevel={60}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100%" }}
          maxBounds={zoomConfig.moveBounds}
          maxBoundsViscosity={2.0}
          className="leaflet-container [&_.leaflet-control-attribution]:hidden "
        >
          <ImageOverlay url={imagemURL} bounds={zoomConfig.imageBounds} />
          
          <Centralizador center={zoomConfig.center} zoom={zoomConfig.zoom} />
          <BotaoReset center={zoomConfig.center} zoom={zoomConfig.zoom} /> 
        </MapContainer>        
        </>
      )}
    </div>
  );
}
