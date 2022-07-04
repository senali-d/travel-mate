import { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

const Map = ({lng, lat}) => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
      center: [lng, lat],
      zoom: 10
    });
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  }, [lng, lat]);

  return (
    <div className="flex-1 h-[100%]" id="map">
      Map
    </div>
  )
}

export default Map