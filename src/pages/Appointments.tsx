
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";

// Mock appointment data
const MOCK_APPOINTMENTS = [
  {
    id: 1,
    patientName: "John Doe",
    time: "09:00 AM",
    doctor: "Dr. Smith",
    type: "Consultation",
    status: "Confirmed"
  },
  {
    id: 2,
    patientName: "Jane Smith",
    time: "10:30 AM",
    doctor: "Dr. Smith",
    type: "Follow-up",
    status: "Confirmed"
  },
  {
    id: 3,
    patientName: "Robert Johnson",
    time: "11:45 AM",
    doctor: "Dr. Jones",
    type: "Physical Therapy",
    status: "Confirmed"
  },
  {
    id: 4,
    patientName: "Sarah Williams",
    time: "01:15 PM",
    doctor: "Dr. Smith",
    type: "X-Ray Results",
    status: "Pending"
  },
  {
    id: 5,
    patientName: "Michael Brown",
    time: "02:30 PM",
    doctor: "Dr. Jones",
    type: "Consultation",
    status: "Confirmed"
  },
];

const AppointmentCard = ({ appointment }: { appointment: typeof MOCK_APPOINTMENTS[0] }) => (
  <Card className="mb-3">
    <CardContent className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-medium">
            {appointment.patientName.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <p className="font-medium">{appointment.patientName}</p>
            <p className="text-sm text-muted-foreground">{appointment.type}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">{appointment.time}</p>
          <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span 
          className={`px-2 py-1 rounded-full text-xs ${
            appointment.status === "Confirmed" 
              ? "bg-green-100 text-green-800" 
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {appointment.status}
        </span>
        <div className="space-x-2">
          <Button size="sm" variant="outline">Reschedule</Button>
          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">Cancel</Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">Manage clinic appointments</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>

        <Tabs defaultValue="today" className="w-full">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-4 mt-4">
            <h2 className="text-xl font-semibold">Today's Schedule</h2>
            <div className="space-y-4">
              {MOCK_APPOINTMENTS.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-4 mt-4">
            <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
            <div className="space-y-4">
              {MOCK_APPOINTMENTS.slice(2).map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-6">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Select Date</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              
              <div className="col-span-1 md:col-span-5 mt-4 md:mt-0">
                <h2 className="text-xl font-semibold mb-4">
                  Appointments for {date?.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
                </h2>
                <div className="space-y-4">
                  {date 
                    ? MOCK_APPOINTMENTS.slice(0, 3).map((appointment) => (
                        <AppointmentCard key={appointment.id} appointment={appointment} />
                      ))
                    : <p>Select a date to view appointments</p>
                  }
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Appointments;
