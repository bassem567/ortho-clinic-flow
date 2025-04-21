import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { X } from "lucide-react";

const medicationSchema = z.object({
  name: z.string().min(1, { message: "Medication name is required" }),
  dosage: z.string().min(1, { message: "Dosage is required" }),
  frequency: z.string().min(1, { message: "Frequency is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  instructions: z.string().optional(),
});

const formSchema = z.object({
  patientId: z.string().uuid({ message: "Please select a patient" }),
  doctor: z.string().min(1, { message: "Doctor name is required" }),
  notes: z.string().optional(),
  medications: z.array(medicationSchema).min(1, { message: "At least one medication is required" }),
});

interface AddPrescriptionFormProps {
  onSuccess?: () => void;
}

const MOCK_PATIENTS = [
  { id: "123e4567-e89b-12d3-a456-426614174000", name: "John Doe" },
  { id: "223e4567-e89b-12d3-a456-426614174001", name: "Jane Smith" },
  { id: "323e4567-e89b-12d3-a456-426614174002", name: "Robert Johnson" },
];

const MOCK_MEDICATIONS = [
  "Ibuprofen 400mg",
  "Naproxen 500mg",
  "Paracetamol 500mg",
  "Tramadol 50mg",
  "Amoxicillin 500mg",
  "Ciprofloxacin 250mg",
  "Metformin 500mg",
  "Atorvastatin 10mg",
  "Lisinopril 10mg",
];

const AddPrescriptionForm = ({ onSuccess }: AddPrescriptionFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      doctor: "",
      notes: "",
      medications: [{ name: "", dosage: "", frequency: "", duration: "", instructions: "" }],
    },
  });

  const medications = form.watch("medications");

  const addMedication = () => {
    form.setValue("medications", [
      ...medications,
      { name: "", dosage: "", frequency: "", duration: "", instructions: "" },
    ]);
  };

  const removeMedication = (index: number) => {
    if (medications.length > 1) {
      const updatedMedications = [...medications];
      updatedMedications.splice(index, 1);
      form.setValue("medications", updatedMedications);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { data: visitData, error: visitError } = await supabase
        .from("visits")
        .insert({
          patient_id: data.patientId,
          doctor: data.doctor,
          complaint: "Prescription visit",
          diagnosis: null,
          treatment: null,
          notes: "Visit created for prescription"
        })
        .select('id')
        .single();

      if (visitError) {
        console.error("Error creating visit:", visitError);
        throw new Error(visitError.message);
      }

      const { error } = await supabase.from("prescriptions").insert({
        patient_id: data.patientId,
        doctor: data.doctor,
        medications: data.medications,
        notes: data.notes || null,
        visit_id: visitData.id,
      });

      if (error) {
        console.error("Error creating prescription:", error);
        throw new Error(error.message);
      }

      toast({
        title: "Prescription created",
        description: "Prescription has been created successfully",
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Failed to create prescription",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MOCK_PATIENTS.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="doctor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doctor</FormLabel>
                <FormControl>
                  <Input placeholder="Dr. Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Medications</h3>
          </div>

          {medications.map((_, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Medication {index + 1}</h4>
                {medications.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive h-8 px-2"
                    onClick={() => removeMedication(index)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`medications.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medication</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select medication" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MOCK_MEDICATIONS.map((med) => (
                            <SelectItem key={med} value={med}>
                              {med}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`medications.${index}.dosage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosage</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 1 tablet" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`medications.${index}.frequency`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Once daily">Once daily</SelectItem>
                          <SelectItem value="Twice daily">Twice daily</SelectItem>
                          <SelectItem value="Three times daily">Three times daily</SelectItem>
                          <SelectItem value="Four times daily">Four times daily</SelectItem>
                          <SelectItem value="As needed">As needed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`medications.${index}.duration`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 7 days" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`medications.${index}.instructions`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Instructions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g. Take after meals" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addMedication}
          >
            + Add Another Medication
          </Button>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Doctor's Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Additional notes for the patient..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={() => onSuccess && onSuccess()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Prescription"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPrescriptionForm;
