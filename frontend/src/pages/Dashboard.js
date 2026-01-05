import TripList from "../components/TripList";
import LogoutButton from "../components/LogoutButton";

export default function Dashboard() {
  return (
    <div>
      <h1>Travel Journal Dashboard</h1>
      <LogoutButton />
      <TripList />
    </div>
  );
}
