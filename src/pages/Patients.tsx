
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import PatientDetail from "@/components/patients/PatientDetail";

// Mock patient data
const MOCK_PATIENTS = [
  { id: 1, name: "John Doe", age: 42, contact: "555-1234", condition: "Knee injury" },
  { id: 2, name: "Jane Smith", age: 35, contact: "555-2345", condition: "Back pain" },
  { id: 3, name: "Robert Johnson", age: 65, contact: "555-3456", condition: "Hip replacement" },
  { id: 4, name: "Sarah Williams", age: 28, contact: "555-4567", condition: "Ankle sprain" },
  { id: 5, name: "Michael Brown", age: 53, contact: "555-5678", condition: "Shoulder pain" },
  { id: 6, name: "Emily Davis", age: 32, contact: "555-6789", condition: "Wrist fracture" },
  { id: 7, name: "David Miller", age: 47, contact: "555-7890", condition: "Neck pain" },
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  const filteredPatients = MOCK_PATIENTS.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPatient = (id: number) => {
    setSelectedPatient(id);
  };

  const handleClosePatientDetail = () => {
    setSelectedPatient(null);
  };

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
            <p className="text-muted-foreground">Manage patient records</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or condition..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <TableRow 
                      key={patient.id}
                      className="cursor-pointer"
                    >
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.contact}</TableCell>
                      <TableCell>{patient.condition}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewPatient(patient.id);
                          }}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No patients found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <PatientDetail 
          patientId={selectedPatient} 
          onClose={handleClosePatientDetail} 
        />
      )}
    </AppLayout>
  );
};

export default Patients;
