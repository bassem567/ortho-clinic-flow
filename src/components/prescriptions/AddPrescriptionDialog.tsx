
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileCheck } from "lucide-react";
import AddPrescriptionForm from "./AddPrescriptionForm";

interface AddPrescriptionDialogProps {
  onSuccess?: () => void;
}

const AddPrescriptionDialog = ({ onSuccess }: AddPrescriptionDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FileCheck className="mr-2 h-4 w-4" />
          New Prescription
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Prescription</DialogTitle>
          <DialogDescription>
            Enter the prescription details for the patient.
          </DialogDescription>
        </DialogHeader>
        <AddPrescriptionForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPrescriptionDialog;
