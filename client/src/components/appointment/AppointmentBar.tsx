import { useState } from "react";
import { Calendar, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Appointment } from "../models/appointment/Appointment";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AppointmentContent from "./AppointmentContent";
import { getAppointmentStatus, statusColors } from "./appointmentStatus";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AppointmentBarProps {
  appointment: Appointment;
  auth: boolean;
  onDelete?: (id: string) => void;
}

const AppointmentBar = ({ appointment, auth, onDelete }: AppointmentBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const status = getAppointmentStatus(appointment);

  return (
    <>
      <div className="appointment-bar rounded-xl overflow-hidden
            border border-border/60 bg-background
            shadow-sm transition-all duration-200 ease-out
            hover:shadow-xl hover:border-primary/40
            hover:-translate-y-1 hover:bg-indigo-800 mx-6">
        {/* Header Bar */}
        <div
          className="flex items-center justify-between p-4 cursor-pointer transition-colors duration-200 bg-card hover:bg-card-hover"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{appointment.hospital.displayName.text}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(appointment.date).toLocaleDateString("en-FI", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })} • {appointment.time}
              </p>
            </div>

            <Badge variant="outline" className={`${statusColors[status]} px-4 py-2 text-base font-medium rounded-full`}>
              {status}
            </Badge>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              <Eye className="w-5 h-5" />
            </Button>

            {auth &&
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Appointment</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete the item: "{appointment.id}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => onDelete(appointment.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            }
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl w-full p-0 overflow-hidden">
          <AppointmentContent
            appointment={appointment}
            status={status}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentBar;