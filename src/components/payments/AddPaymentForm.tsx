
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";

// Validation schema for the payment form
const paymentFormSchema = z.object({
  patient: z.string().min(1, { message: "Patient name is required" }),
  amount: z.string().min(1, { message: "Amount is required" }).refine((val) => !isNaN(Number(val)), {
    message: "Amount must be a number",
  }),
  service: z.string().min(1, { message: "Service type is required" }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const AddPaymentForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      patient: "",
      amount: "",
      service: "",
    },
  });

  const onSubmit = async (data: PaymentFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, we'd save this to Supabase
      // For now, we'll simulate adding to the mock data
      const newPayment = {
        id: Math.floor(Math.random() * 10000),
        patient: data.patient,
        date: new Date().toISOString().split('T')[0],
        type: data.service,
        amount: parseFloat(data.amount),
        status: "Pending"
      };

      // Here you would add the code to save to Supabase
      // const { error } = await supabase.from('payments').insert([newPayment]);
      
      // if (error) throw error;

      toast({
        title: "Payment recorded",
        description: `$${data.amount} payment added for ${data.patient}`,
      });

      // Reset form
      form.reset();
      
      // Call success callback
      onSuccess();

    } catch (error) {
      toast({
        title: "Error",
        description: "Could not add payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="patient"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Consultation">Consultation</SelectItem>
                  <SelectItem value="X-Ray">X-Ray</SelectItem>
                  <SelectItem value="Physical Therapy">Physical Therapy</SelectItem>
                  <SelectItem value="Follow-up">Follow-up</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount ($)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" placeholder="150.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Recording..." : "Record Payment"}
        </Button>
      </form>
    </Form>
  );
};

export default AddPaymentForm;
