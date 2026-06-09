import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Sidebar />

      <main className="ml-[260px] min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}