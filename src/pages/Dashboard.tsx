
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/layout/AppLayout";
import { Calendar, User, DollarSign, FileText } from "lucide-react";

const DashboardCard = ({ title, value, description, icon, color }: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`p-2 rounded-full ${color}`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. Smith! Here's what's happening today.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Patients"
            value="1,248"
            description="32 new this month"
            icon={<User className="h-4 w-4 text-white" />}
            color="bg-clinic-600"
          />
          <DashboardCard
            title="Today's Appointments"
            value="12"
            description={today}
            icon={<Calendar className="h-4 w-4 text-white" />}
            color="bg-success"
          />
          <DashboardCard
            title="Pending Payments"
            value="$4,325"
            description="18 invoices pending"
            icon={<DollarSign className="h-4 w-4 text-white" />}
            color="bg-warning"
          />
          <DashboardCard
            title="Medical Records"
            value="258"
            description="Updated this month"
            icon={<FileText className="h-4 w-4 text-white" />}
            color="bg-clinic-800"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>
                {today}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-medium">
                        {["JD", "MS", "AL"][i]}
                      </div>
                      <div>
                        <p className="font-medium">{["John Doe", "Mary Smith", "Adam Lee"][i]}</p>
                        <p className="text-sm text-muted-foreground">Knee Consultation</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{["09:15 AM", "10:30 AM", "11:45 AM"][i]}</p>
                      <p className="text-sm text-muted-foreground">Dr. Smith</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>
                Last 5 patient consultations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-medium">
                        {["RL", "KJ", "PA", "MT", "SC"][i]}
                      </div>
                      <div>
                        <p className="font-medium">
                          {["Robert Lee", "Karen Johnson", "Paul Adams", "Maria Torres", "Sam Campbell"][i]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {["Fracture", "Sprain", "Back pain", "Joint replacement", "Physical therapy"][i]}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {[
                          "Today",
                          "Yesterday",
                          "2 days ago",
                          "3 days ago",
                          "4 days ago"
                        ][i]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
