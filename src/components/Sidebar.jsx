import { NavLink, useNavigate } from "react-router-dom";
import {
  Flame,
  Compass,
  Heart,
  Sparkles,
  Trophy,
  User,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const navItems = [
    { name: "Swipe", path: "/swipe", icon: Compass },
    { name: "Matches", path: "/matches", icon: Heart },
    { name: "AI Hub", path: "/ai-hub", icon: Sparkles },
    { name: "Progress", path: "/progress", icon: Trophy },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-[#111111] border-r border-gray-800 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 p-6">
          <Flame className="text-orange-500" size={28} />
          <div>
            <h1 className="text-white font-bold text-xl">FitMatch</h1>
            <p className="text-gray-400 text-sm">
              Find your gym partner
            </p>
          </div>
        </div>

        <nav className="mt-8 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                    isActive
                      ? "bg-orange-500/10 text-orange-500"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}