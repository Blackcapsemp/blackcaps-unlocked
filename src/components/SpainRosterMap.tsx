import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import { Hand, Minus, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CityGroup } from "@/lib/roster-cities";

type Props = { cities: CityGroup[]; selected: string; onSelect: (key: string) => void; resetKey: number };
const mainlandBounds: L.LatLngBoundsExpression = [[35.1, -9.7], [44.2, 4.6]];
const islandBounds: L.LatLngBoundsExpression = [[27.3, -18.5], [29.7, -13]];

export default function SpainRosterMap({ cities, selected, onSelect, resetKey }: Props) {
  const mainEl = useRef<HTMLDivElement>(null);
  const islandEl = useRef<HTMLDivElement>(null);
  const maps = useRef<L.Map[]>([]);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const [touchEnabled, setTouchEnabled] = useState(false);
  const [tileError, setTileError] = useState(false);

  useEffect(() => {
    if (!mainEl.current || !islandEl.current) return;
    const instances = [mainEl.current, islandEl.current].map((el, i) => {
      const map = L.map(el, { zoomControl: false, zoomSnap: 0.25, scrollWheelZoom: false, attributionControl: true, minZoom: 3, maxZoom: 16, dragging: !L.Browser.mobile, tapHold: false });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      }).on("tileerror", () => setTileError(true)).addTo(map);
      map.fitBounds(i === 0 ? mainlandBounds : islandBounds, { padding: [12, 12] });
      return map;
    });
    maps.current = instances;
    const observer = new ResizeObserver(() => instances.forEach((map, i) => {
      map.invalidateSize();
      if (!selectedRef.current) map.fitBounds(i === 0 ? mainlandBounds : islandBounds, { animate: false, padding: [12, 12] });
    }));
    observer.observe(mainEl.current);
    observer.observe(islandEl.current);
    return () => { observer.disconnect(); instances.forEach((map) => map.remove()); maps.current = []; };
  }, []);

  useEffect(() => {
    const layers = maps.current.map((map) => L.markerClusterGroup({
      showCoverageOnHover: false, maxClusterRadius: 45, zoomToBoundsOnClick: true,
      iconCreateFunction: (cluster) => {
        const count = cluster.getAllChildMarkers().reduce((sum, marker) => sum + Number((marker.options as L.MarkerOptions & { artistCount?: number }).artistCount ?? 0), 0);
        return L.divIcon({ className: "roster-marker roster-cluster", html: `<span>${count}</span>`, iconSize: [44, 44] });
      },
    }).addTo(map));
    for (const city of cities) {
      if (!city.location) continue;
      const { lat, lng } = city.location;
      const island = lat < 31 && lng < -12;
      const icon = L.divIcon({ className: `roster-marker${selected === city.key ? " is-selected" : ""}`, html: `<span>${city.count}</span>`, iconSize: [44, 44], iconAnchor: [22, 22] });
      const marker = L.marker([lat, lng], { icon, title: `${city.name}: ${city.count} artistas`, alt: `${city.name}: ${city.count} artistas`, artistCount: city.count } as L.MarkerOptions & { artistCount: number });
      const label = document.createElement("span");
      label.textContent = `${city.name} · ${city.count} ${city.count === 1 ? "artista" : "artistas"}`;
      marker.bindTooltip(label, { direction: "top" });
      marker.on("click", () => onSelectRef.current(city.key));
      layers[island ? 1 : 0]?.addLayer(marker);
    }
    return () => { layers.forEach((layer, i) => maps.current[i]?.removeLayer(layer)); };
  }, [cities, selected]);

  useEffect(() => {
    const city = cities.find((c) => c.key === selected);
    if (!city?.location) {
      maps.current[0]?.fitBounds(mainlandBounds, { animate: false, padding: [12, 12] });
      maps.current[1]?.fitBounds(islandBounds, { animate: false, padding: [12, 12] });
      return;
    }
    const { lat, lng } = city.location;
    maps.current[lat < 31 && lng < -12 ? 1 : 0]?.setView([lat, lng], 10, { animate: false });
  }, [selected, resetKey, cities]);

  useEffect(() => {
    maps.current.forEach((map) => {
      if (touchEnabled || !L.Browser.mobile) map.dragging.enable(); else map.dragging.disable();
      if (touchEnabled) map.touchZoom.enable(); else map.touchZoom.disable();
    });
  }, [touchEnabled]);

  const controls = (index: number) => (
    <div className="absolute top-3 right-3 z-[500] flex flex-col gap-1">
      <Button variant="default" size="icon" title="Acercar" aria-label={index ? "Acercar Canarias" : "Acercar España"} onClick={() => maps.current[index]?.zoomIn()}><Plus /></Button>
      <Button variant="default" size="icon" title="Alejar" aria-label={index ? "Alejar Canarias" : "Alejar España"} onClick={() => maps.current[index]?.zoomOut()}><Minus /></Button>
    </div>
  );

  return (
    <div className="roster-map relative isolate overflow-hidden rounded-md border border-graphite/20">
      <div ref={mainEl} aria-label="Mapa de España peninsular, Baleares, Ceuta y Melilla" className="h-[420px] md:h-[560px] w-full" />
      {controls(0)}
      <div className="absolute left-3 top-3 z-[500] flex gap-2">
        <Button size="icon" title="Vista inicial de España" aria-label="Vista inicial de España" onClick={() => { onSelectRef.current(""); maps.current[0]?.fitBounds(mainlandBounds); maps.current[1]?.fitBounds(islandBounds); }}><RotateCcw /></Button>
        <Button size="icon" aria-label="Activar movimiento táctil del mapa" title="Movimiento táctil del mapa" aria-pressed={touchEnabled} onClick={() => setTouchEnabled((value) => !value)}><Hand /></Button>
      </div>
      <div className="relative md:absolute md:bottom-8 md:left-3 md:w-[300px] border-t md:border border-graphite/25 z-[500] bg-ivory">
        <p className="px-3 py-1 text-xs font-semibold uppercase text-graphite">Islas Canarias</p>
        <div ref={islandEl} aria-label="Mapa interactivo de las Islas Canarias" className="h-[175px] w-full" />
        {controls(1)}
      </div>
      {tileError && <p role="status" className="absolute bottom-1 left-2 z-[500] bg-ivory text-graphite text-xs px-2">No se han podido cargar algunas zonas del mapa. El filtro de ciudades sigue disponible.</p>}
    </div>
  );
}