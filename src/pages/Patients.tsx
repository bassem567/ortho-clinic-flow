
import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PatientDetail from "@/components/patients/PatientDetail";
import AddPatientDialog from "@/components/patients/AddPatientDialog";
import { toast } from "@/hooks/use-toast";

interface Patient {
  id: string;
  name: string;
  age: number | null;
  contact: string | null;
  condition?: string | null;
  gender: string | null;
  email: string | null;
  address: string | null;
  medical_history: string | null;
  allergies: string | null;
}

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        throw error;
      }

      setPatients(data || []);
    } catch (error) {
      console.error("Error fetching patients:", error);
      toast({
        title: "Error",
        description: "Failed to load patients data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.medical_history?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.allergies?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPatient = (id: string) => {
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
          <AddPatientDialog onSuccess={fetchPatients} />
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or medical condition..."
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
                  <TableHead>Medical History</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      Loading patients...
                    </TableCell>
                  </TableRow>
                ) : filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <TableRow 
                      key={patient.id}
                      className="cursor-pointer"
                      onClick={() => handleViewPatient(patient.id)}
                    >
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.age !== null ? patient.age : "-"}</TableCell>
                      <TableCell>{patient.contact || "-"}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {patient.medical_history || "-"}
                      </TableCell>
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
                    <TableCell colSpan={5} className="text-center py-6">
                      {searchTerm ? "No patients match your search" : "No patients found"}
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
