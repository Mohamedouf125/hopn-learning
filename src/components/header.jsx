import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="App-header">
      <Link to={"/"}>home</Link>
      <Link to={"/login"}>counter</Link>
    </header>
  );
}
