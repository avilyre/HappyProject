import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

// You can use Leaftlet + React Leaftlet or use MapBox

import mapMarker from './../assets/images/map-marker.svg';

import './../styles/pages/orphanages-map.css';
import 'leaflet/dist/leaflet.css';
import api from '../services/api';

const mapIcon = Leaflet.icon({
    iconUrl:  mapMarker,
    iconSize: [50, 60],
    iconAnchor: [25, 60],
    popupAnchor: [170, 2]
});

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number
}

export default function Orphanages() {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarker} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Cortês</strong>
                    <span>Pernambuco</span>
                </footer>
            </aside>

            <Map
                center={[-8.4731509,-35.5458794]}
                zoom={16}
                style={{width: '100%', height: '100%', zIndex: 1}}
            >
                <TileLayer 
                    url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {orphanages.map(orphanage => (
                    <Marker 
                        key={orphanage.id}
                        icon={mapIcon}
                        position={[orphanage.latitude, orphanage.longitude]}
                    >
                        <Popup closeButton={false} minWidth={240} maxHeight={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#fff" />
                            </Link>
                        </Popup>
                    </Marker>
                ))}
            </Map>

            <Link to="/orphanage/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}