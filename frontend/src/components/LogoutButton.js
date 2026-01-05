import { logout } from "../utils/auth";

export default function LogoutButton() {
  return <button onClick={logout}>Logout</button>;
}
