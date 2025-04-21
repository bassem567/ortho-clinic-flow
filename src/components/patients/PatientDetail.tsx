
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, FileCheck, FileText, X } from "lucide-react";
import { Badge } from "../ui/badge";

interface PatientDetailProps {
  patientId: string;
  onClose: () => void;
}

const PatientDetail = ({ patientId, onClose }: PatientDetailProps) => {
  // This would fetch patient data based on ID in a real app
  const patient = {
    id: patientId,
    name: "John Doe",
    age: 42,
    gender: "Male",
    contact: "555-1234",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown",
    medicalHistory: "Hypertension, Previous knee surgery (2020)",
    allergies: "Penicillin",
  };

  // Sample visits for this patient
  const visits = [
    {
      id: 1,
      date: "2023-04-15",
      complaint: "Knee pain after running",
      diagnosis: "Mild knee sprain",
      treatment: "Rest, ice, compression, elevation. Prescribed pain medication.",
      doctor: "Dr. Smith",
    },
    {
      id: 2,
      date: "2023-03-10",
      complaint: "Follow-up for knee condition",
      diagnosis: "Improving knee sprain",
      treatment: "Continue PT exercises, gradually return to activities.",
      doctor: "Dr. Smith",
    },
  ];

  // Sample prescriptions for this patient
  const prescriptions = [
    {
      id: 1,
      date: "2023-04-15",
      medications: [
        { name: "Ibuprofen 400mg", dosage: "1 tablet", frequency: "3 times daily", duration: "7 days" },
        { name: "Naproxen 500mg", dosage: "1 tablet", frequency: "2 times daily", duration: "5 days" },
      ],
      doctor: "Dr. Smith",
    },
    {
      id: 2,
      date: "2023-03-10",
      medications: [
        { name: "Ibuprofen 400mg", dosage: "1 tablet", frequency: "3 times daily", duration: "10 days" },
      ],
      doctor: "Dr. Smith",
    },
  ];

  return (
    <div className="fixed inset-0 bg-background/80 flex justify-center items-start pt-10 z-50 overflow-y-auto">
      <div className="w-full max-w-4xl bg-card rounded-lg shadow-lg border overflow-hidden">
        <div className="p-4 bg-muted flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-clinic-600 text-white flex items-center justify-center font-medium">
              {patient.name.split(" ").map(n => n[0]).join("")}
            </div>
            <h2 className="text-xl font-bold">{patient.name}</h2>
            <Badge variant="outline">Patient ID: {patient.id}</Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <Tabs defaultValue="profile">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="profile">
                <FileText className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="visits">
                <Calendar className="mr-2 h-4 w-4" />
                Visits
              </TabsTrigger>
              <TabsTrigger value="prescriptions">
                <FileCheck className="mr-2 h-4 w-4" />
                Prescriptions
              </TabsTrigger>
              <TabsTrigger value="payments">
                <DollarSign className="mr-2 h-4 w-4" />
                Payments
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{patient.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-medium">{patient.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-medium">{patient.contact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{patient.email}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{patient.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Medical History</p>
                      <p className="font-medium">{patient.medicalHistory}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Allergies</p>
                      <p className="font-medium">{patient.allergies || "None reported"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button variant="outline">Edit Patient Information</Button>
              </div>
            </TabsContent>

            <TabsContent value="visits" className="space-y-4">
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                New Visit Record
              </Button>

              {visits.map(visit => (
                <Card key={visit.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">Visit: {new Date(visit.date).toLocaleDateString()}</CardTitle>
                      <Badge variant="outline">{visit.doctor}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Chief Complaint</p>
                        <p className="text-sm text-muted-foreground">{visit.complaint}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Diagnosis</p>
                        <p className="text-sm text-muted-foreground">{visit.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Treatment Plan</p>
                        <p className="text-sm text-muted-foreground">{visit.treatment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="prescriptions" className="space-y-4">
              <Button>
                <FileCheck className="mr-2 h-4 w-4" />
                New Prescription
              </Button>

              {prescriptions.map(prescription => (
                <Card key={prescription.id} className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">
                        Prescription: {new Date(prescription.date).toLocaleDateString()}
                      </CardTitle>
                      <div className="space-x-2">
                        <Badge variant="outline">{prescription.doctor}</Badge>
                        <Button size="sm" variant="outline">Print</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {prescription.medications.map((med, idx) => (
                        <div key={idx} className="p-3 border rounded-md">
                          <div className="font-medium">{med.name}</div>
                          <div className="grid grid-cols-3 mt-1 text-sm">
                            <div>
                              <span className="text-muted-foreground">Dosage:</span> {med.dosage}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Frequency:</span> {med.frequency}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Duration:</span> {med.duration}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="payments" className="space-y-4">
              <Button>
                <DollarSign className="mr-2 h-4 w-4" />
                Record Payment
              </Button>

              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-border">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Service</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-background">
                        <tr>
                          <td className="px-4 py-3 text-sm">15 Apr 2023</td>
                          <td className="px-4 py-3 text-sm">Consultation</td>
                          <td className="px-4 py-3 text-sm">$150.00</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="outline" className="bg-green-50 text-green-700">Paid</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">10 Mar 2023</td>
                          <td className="px-4 py-3 text-sm">Follow-up</td>
                          <td className="px-4 py-3 text-sm">$85.00</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="outline" className="bg-green-50 text-green-700">Paid</Badge>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm">15 Feb 2023</td>
                          <td className="px-4 py-3 text-sm">X-Ray</td>
                          <td className="px-4 py-3 text-sm">$225.00</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="secondary">Pending</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
