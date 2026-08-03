import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getNotificationsByUserId } from "@/data/users";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const { user } = useAuth();
  const userNotifications = user ? getNotificationsByUserId(user.id) : [];

  const [notifications, setNotifications] = useState(userNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Info className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center font-medium">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <AnimatePresence>
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={cn(
                    "p-4 border-b border-border/50 cursor-pointer hover:bg-secondary/50 transition-colors",
                    !notification.isRead && "bg-secondary/30"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.isRead && (
                      <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
        <div className="p-3 border-t border-border">
          <Link to="/activity">
            <Button variant="ghost" size="sm" className="w-full">
              View all activity
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}











// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Bell, X } from "lucide-react";
// import { notifications, formatDate, formatTime } from "@/data/mockData";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// export function NotificationBell() {
//   const [isOpen, setIsOpen] = useState(false);
//   const unreadCount = notifications.filter((n) => !n.isRead).length;

//   return (
//     <div className="relative">
//       <Button
//         variant="ghost"
//         size="icon"
//         className="relative"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <Bell className="h-5 w-5" />
//         {unreadCount > 0 && (
//           <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-medium rounded-full flex items-center justify-center">
//             {unreadCount}
//           </span>
//         )}
//       </Button>

//       <AnimatePresence>
//         {isOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsOpen(false)}
//               className="fixed inset-0 z-40"
//             />

//             <motion.div
//               initial={{ opacity: 0, y: 10, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: 10, scale: 0.95 }}
//               className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
//             >
//               <div className="flex items-center justify-between p-4 border-b border-border">
//                 <h3 className="font-semibold text-foreground">Notifications</h3>
//                 <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>

//               <div className="max-h-96 overflow-y-auto">
//                 {notifications.map((notification, index) => (
//                   <motion.div
//                     key={notification.id}
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     className={cn(
//                       "p-4 border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer",
//                       !notification.isRead && "bg-primary/5"
//                     )}
//                   >
//                     <div className="flex gap-3">
//                       <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg shrink-0">
//                         {notification.icon}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between gap-2">
//                           <p className="font-medium text-foreground text-sm">
//                             {notification.title}
//                           </p>
//                           {!notification.isRead && (
//                             <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1" />
//                           )}
//                         </div>
//                         <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
//                           {notification.message}
//                         </p>
//                         <p className="text-xs text-muted-foreground mt-1">
//                           {formatDate(notification.timestamp)} at {formatTime(notification.timestamp)}
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               <div className="p-4 border-t border-border">
//                 <Button variant="ghost" className="w-full text-primary">
//                   View All Notifications
//                 </Button>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
