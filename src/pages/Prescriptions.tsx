
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileCheck, Printer, Search } from "lucide-react";

const Prescriptions = () => {
  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Prescriptions</h1>
            <p className="text-muted-foreground">Generate and manage patient prescriptions</p>
          </div>
          <Button>
            <FileCheck className="mr-2 h-4 w-4" />
            New Prescription
          </Button>
        </div>

        <Tabs defaultValue="new" className="w-full">
          <TabsList>
            <TabsTrigger value="new">New Prescription</TabsTrigger>
            <TabsTrigger value="history">Prescription History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient">Select Patient</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="patient"
                        placeholder="Search patient..."
                        className="pl-9 w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="rounded-lg border p-3 bg-background">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 rounded-full bg-clinic-100 flex items-center justify-center font-medium text-clinic-700">
                          JD
                        </div>
                        <div>
                          <h3 className="font-medium">John Doe</h3>
                          <p className="text-sm text-muted-foreground">ID: P-12345</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t text-sm">
                        <p><span className="font-medium">Age:</span> 42 years</p>
                        <p><span className="font-medium">Contact:</span> 555-1234</p>
                        <p><span className="font-medium">Allergies:</span> Penicillin</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>Prescription Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Medication 1 */}
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Medication 1</h3>
                      <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="medication1">Medication</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select medication" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ibuprofen">Ibuprofen 400mg</SelectItem>
                            <SelectItem value="naproxen">Naproxen 500mg</SelectItem>
                            <SelectItem value="paracetamol">Paracetamol 500mg</SelectItem>
                            <SelectItem value="tramadol">Tramadol 50mg</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dosage1">Dosage</Label>
                        <Input id="dosage1" placeholder="e.g. 1 tablet" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="frequency1">Frequency</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="once">Once daily</SelectItem>
                            <SelectItem value="twice">Twice daily</SelectItem>
                            <SelectItem value="three">Three times daily</SelectItem>
                            <SelectItem value="four">Four times daily</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="duration1">Duration</Label>
                        <Input id="duration1" placeholder="e.g. 7 days" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="instructions1">Special Instructions</Label>
                      <Textarea id="instructions1" placeholder="e.g. Take after meals" />
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    + Add Another Medication
                  </Button>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Doctor's Notes</Label>
                    <Textarea id="notes" placeholder="Additional notes for the patient..." />
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline">Save as Draft</Button>
                    <Button>
                      <Printer className="mr-2 h-4 w-4" />
                      Generate Prescription
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Prescription History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search prescriptions..."
                    className="pl-9 w-full"
                  />
                </div>
                
                <div className="space-y-4">
                  {/* Sample prescription history items */}
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">
                          {["John Doe", "Sarah Williams", "Robert Johnson"][item - 1]}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {["Ibuprofen 400mg, Tramadol 50mg", "Naproxen 500mg", "Paracetamol 500mg"][item - 1]}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {[
                            "Prescribed: 15 Apr 2023 • Dr. Smith", 
                            "Prescribed: 10 Apr 2023 • Dr. Jones",
                            "Prescribed: 05 Apr 2023 • Dr. Smith"
                          ][item - 1]}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Prescriptions;
