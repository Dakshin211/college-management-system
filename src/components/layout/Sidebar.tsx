import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  BookOpen,
  FileText,
  DollarSign,
  Calendar,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: User, label: 'My Profile', path: '/profile' },
  { icon: BookOpen, label: 'My Courses', path: '/courses' },
  { icon: FileText, label: 'My Marks', path: '/marks' },
  { icon: DollarSign, label: 'Fee Status', path: '/fees' },
  { icon: Calendar, label: 'Attendance', path: '/attendance' },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-70 bg-sidebar text-sidebar-foreground',
          'shadow-xl'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold">HIT</h1>
                <p className="text-xs text-sidebar-foreground/70">Student Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
                    'hover:bg-sidebar-accent hover:translate-x-1',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                      : 'text-sidebar-foreground/80 hover:text-sidebar-foreground'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
