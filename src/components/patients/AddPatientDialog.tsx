
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddPatientForm from "./AddPatientForm";

interface AddPatientDialogProps {
  onSuccess?: () => void;
}

const AddPatientDialog = ({ onSuccess }: AddPatientDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Patient</DialogTitle>
          <DialogDescription>
            Enter the patient's information. Required fields are marked with an asterisk (*).
          </DialogDescription>
        </DialogHeader>
        <AddPatientForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
