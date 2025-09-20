import Navbar from "../components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pt-16 h-screen">{children}</main>
    </div>
  );
}
