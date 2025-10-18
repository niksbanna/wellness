import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Activity,
  FlaskConical,
  Pill,
  Calendar,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MemberNav = () => {
  const { member, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/progress', label: 'Progress', icon: Activity },
    { path: '/labs', label: 'Labs', icon: FlaskConical },
    { path: '/medications', label: 'Medications', icon: Pill },
    { path: '/appointments', label: 'Appointments', icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Link to="/dashboard" className="flex items-center space-x-2 mr-8">
          <div className="bg-wellness-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-display font-bold">
            W
          </div>
          <span className="font-display font-semibold text-lg hidden sm:inline-block">
            Wellness Portal
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-wellness-600",
                location.pathname === item.path
                  ? "text-wellness-600"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <div className="h-9 w-9 rounded-full bg-wellness-100 flex items-center justify-center text-wellness-600 font-semibold">
                  {member?.firstName?.[0]}{member?.lastName?.[0]}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {member?.firstName} {member?.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {member?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile navigation */}
      <nav className="md:hidden border-t px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "text-wellness-600 bg-wellness-50"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default MemberNav;
