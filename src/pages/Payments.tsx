
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, DollarSign, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock payment data
const MOCK_PAYMENTS = [
  { 
    id: 1, 
    patient: "John Doe", 
    date: "2023-04-15", 
    type: "Consultation", 
    amount: 150.00, 
    status: "Paid" 
  },
  { 
    id: 2, 
    patient: "Jane Smith", 
    date: "2023-04-14", 
    type: "X-Ray", 
    amount: 250.00, 
    status: "Pending" 
  },
  { 
    id: 3, 
    patient: "Robert Johnson", 
    date: "2023-04-12", 
    type: "Physical Therapy", 
    amount: 120.00, 
    status: "Paid" 
  },
  { 
    id: 4, 
    patient: "Sarah Williams", 
    date: "2023-04-10", 
    type: "Consultation + X-Ray", 
    amount: 375.00, 
    status: "Pending" 
  },
  { 
    id: 5, 
    patient: "Michael Brown", 
    date: "2023-04-08", 
    type: "Follow-up", 
    amount: 85.00, 
    status: "Paid" 
  },
  { 
    id: 6, 
    patient: "Emily Davis", 
    date: "2023-04-05", 
    type: "Consultation", 
    amount: 150.00, 
    status: "Pending" 
  },
];

const Payments = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
            <p className="text-muted-foreground">Track and manage patient payments</p>
          </div>
          <Button>
            <DollarSign className="mr-2 h-4 w-4" />
            Record Payment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,550.00</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$810.00</div>
              <p className="text-xs text-muted-foreground">Across 3 patients</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Payments Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,740.00</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Payment Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search patient..."
                  className="pl-9 w-full"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2 md:w-1/3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PAYMENTS.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.patient}</TableCell>
                      <TableCell>
                        {new Date(payment.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{payment.type}</TableCell>
                      <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={payment.status === "Paid" ? "outline" : "secondary"}
                          className={payment.status === "Paid" ? "bg-green-50 text-green-700 hover:bg-green-50" : ""}
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {payment.status === "Pending" ? (
                          <Button size="sm" variant="outline">
                            <Check className="mr-2 h-4 w-4" />
                            Mark Paid
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">View</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Payments;
