import { useState} from "react";
import api from "../api/axios";

export default function TripForm({ trip = null, onSuccess }) {
  // If editing, prefill fields
  const [title, setTitle] = useState(trip ? trip.title : "");
  const [destination, setDestination] = useState(trip ? trip.destination : "");
  const [notes, setNotes] = useState(trip ? trip.notes : "");
  const [startDate, setStartDate] = useState(trip ? trip.start_date : "");
  const [endDate, setEndDate] = useState(trip ? trip.end_date : "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { title, destination, notes, start_date: startDate, end_date: endDate };
      if (trip) {
        // Edit existing trip
        await api.put(`trips/${trip.id}/`, data);
      } else {
        // Create new trip
        await api.post("trips/", data);
      }
      onSuccess(); // refresh list in parent
      // Clear form if creating
      if (!trip) {
        setTitle(""); setDestination(""); setNotes(""); setStartDate(""); setEndDate("");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to save trip");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{trip ? "Edit Trip" : "Add New Trip"}</h3>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Destination" value={destination} onChange={e => setDestination(e.target.value)} required />
      <textarea placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} />
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
      <button type="submit">{trip ? "Update Trip" : "Create Trip"}</button>
      {error && <p style={{color:"red"}}>{error}</p>}
    </form>
  );
}
