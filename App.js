import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [wohnungen, setWohnungen] = useState([]);
    const [mieter, setMieter] = useState([]);

    const [neueWohnung, setNeueWohnung] = useState({ adresse: '', groesse: '', mietpreis: '' });
    const [neuerMieter, setNeuerMieter] = useState({ name: '', email: '', wohnung_id: '' });

    useEffect(() => {
        axios.get('http://localhost:5000/wohnungen').then(response => setWohnungen(response.data));
        axios.get('http://localhost:5000/mieter').then(response => setMieter(response.data));
    }, []);

    const handleWohnungSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/wohnungen', neueWohnung).then(() => {
            setNeueWohnung({ adresse: '', groesse: '', mietpreis: '' });
            axios.get('http://localhost:5000/wohnungen').then(response => setWohnungen(response.data));
        });
    };

    const handleMieterSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/mieter', neuerMieter).then(() => {
            setNeuerMieter({ name: '', email: '', wohnung_id: '' });
            axios.get('http://localhost:5000/mieter').then(response => setMieter(response.data));
        });
    };

    return (
        <div>
            <h1>Wohnungsverwaltung</h1>
            <h2>Wohnungen</h2>
            <ul>
                {wohnungen.map(w => (
                    <li key={w.id}>{w.adresse}, {w.groesse} m², €{w.mietpreis}</li>
                ))}
            </ul>
            <form onSubmit={handleWohnungSubmit}>
                <input type="text" placeholder="Adresse" value={neueWohnung.adresse} onChange={(e) => setNeueWohnung({ ...neueWohnung, adresse: e.target.value })} />
                <input type="number" placeholder="Größe" value={neueWohnung.groesse} onChange={(e) => setNeueWohnung({ ...neueWohnung, groesse: e.target.value })} />
                <input type="number" placeholder="Mietpreis" value={neueWohnung.mietpreis} onChange={(e) => setNeueWohnung({ ...neueWohnung, mietpreis: e.target.value })} />
                <button type="submit">Wohnung hinzufügen</button>
            </form>

            <h2>Mieter</h2>
            <ul>
                {mieter.map(m => (
                    <li key={m.id}>{m.name} ({m.email}) - Wohnung: {m.wohnung_id || 'Keine'}</li>
                ))}
            </ul>
            <form onSubmit={handleMieterSubmit}>
                <input type="text" placeholder="Name" value={neuerMieter.name} onChange={(e) => setNeuerMieter({ ...neuerMieter, name: e.target.value })} />
                <input type="email" placeholder="Email" value={neuerMieter.email} onChange={(e) => setNeuerMieter({ ...neuerMieter, email: e.target.value })} />
                <input type="number" placeholder="Wohnung ID" value={neuerMieter.wohnung_id} onChange={(e) => setNeuerMieter({ ...neuerMieter, wohnung_id: e.target.value })} />
                <button type="submit">Mieter hinzufügen</button>
            </form>
        </div>
    );
};

export default App;
