import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, Building, Book, Users, Trophy } from "lucide-react";

const Donate = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    donor_name: "",
    donor_email: "",
    amount: "",
    purpose: "general",
    message: "",
    is_anonymous: false,
  });

  const donationPurposes = [
    { value: "general", label: "General Development", icon: Building },
    { value: "scholarships", label: "Student Scholarships", icon: Users },
    { value: "infrastructure", label: "Infrastructure & Facilities", icon: Building },
    { value: "library", label: "Library & Resources", icon: Book },
    { value: "sports", label: "Sports & Athletics", icon: Trophy },
  ];

  const suggestedAmounts = [50, 100, 250, 500, 1000, 2500];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("donations").insert([
        {
          donor_name: formData.donor_name,
          donor_email: formData.donor_email,
          amount: parseFloat(formData.amount),
          purpose: formData.purpose,
          message: formData.message,
          is_anonymous: formData.is_anonymous,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Thank you for your donation!",
        description: "Your contribution will make a real difference in our students' lives.",
      });

      setFormData({
        donor_name: "",
        donor_email: "",
        amount: "",
        purpose: "general",
        message: "",
        is_anonymous: false,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Support Our School</h1>
            <p className="text-xl text-muted-foreground">
              Your generous donation helps us provide quality education and opportunities for all students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {donationPurposes.map((purpose) => {
              const Icon = purpose.icon;
              return (
                <Card 
                  key={purpose.value}
                  className={`cursor-pointer transition-all ${
                    formData.purpose === purpose.value ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, purpose: purpose.value })}
                >
                  <CardHeader>
                    <Icon className="w-8 h-8 mb-2 text-primary" />
                    <CardTitle className="text-lg">{purpose.label}</CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>
                Fill in your details below. All donations support our school development initiatives.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donor_name">Full Name</Label>
                    <Input
                      id="donor_name"
                      value={formData.donor_name}
                      onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donor_email">Email</Label>
                    <Input
                      id="donor_email"
                      type="email"
                      value={formData.donor_email}
                      onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select Amount (USD)</Label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {suggestedAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={formData.amount === amount.toString() ? "default" : "outline"}
                        onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="custom_amount">Or Enter Custom Amount</Label>
                    <Input
                      id="custom_amount"
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="Enter amount"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share why you're supporting our school..."
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_anonymous"
                    checked={formData.is_anonymous}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_anonymous: checked as boolean })
                    }
                  />
                  <Label htmlFor="is_anonymous" className="cursor-pointer">
                    Make this donation anonymous
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Donate Now"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Note: Payment processing will be enabled once payment gateway is configured.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Donate;
