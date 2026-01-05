import { useState, useEffect } from "react";
import api from "../api/axios";
import TripForm from "./TripForm";

export default function TripList() {
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);

  const fetchTrips = async () => {
    try {
      const res = await api.get("trips/");
      setTrips(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;
    try {
      await api.delete(`trips/${id}/`);
      setTrips(trips.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div>
      <h2>Your Trips</h2>

      {/* Trip form for Create or Edit */}
      <TripForm trip={editingTrip} onSuccess={fetchTrips} />

      <ul>
        {trips.map(trip => (
          <li key={trip.id}>
            {trip.title} - {trip.destination} |
            <button onClick={() => setEditingTrip(trip)}>Edit</button> |
            <button onClick={() => deleteTrip(trip.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
