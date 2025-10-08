import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, Building2, BookOpen, Users, Trophy } from "lucide-react";

const Donate = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    donorName: "",
    donorEmail: "",
    amount: "",
    purpose: "general",
    message: "",
    isAnonymous: false,
  });

  const donationPurposes = [
    { value: "general", label: "General School Development", icon: Building2 },
    { value: "library", label: "Library & Learning Resources", icon: BookOpen },
    { value: "sports", label: "Sports & Athletics", icon: Trophy },
    { value: "scholarship", label: "Student Scholarships", icon: Users },
  ];

  const suggestedAmounts = [50, 100, 250, 500, 1000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("donations").insert({
        donor_name: formData.donorName,
        donor_email: formData.donorEmail,
        amount: parseFloat(formData.amount),
        purpose: formData.purpose,
        message: formData.message,
        is_anonymous: formData.isAnonymous,
        payment_status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Thank You for Your Donation!",
        description: "Your donation request has been received. We will contact you with payment details.",
      });

      setFormData({
        donorName: "",
        donorEmail: "",
        amount: "",
        purpose: "general",
        message: "",
        isAnonymous: false,
      });
    } catch (error) {
      console.error("Error submitting donation:", error);
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
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{t('nav.home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Donate</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Support Our School</h1>
            <p className="text-xl text-muted-foreground">
              Your generous donation helps us provide excellence in education and create opportunities for our students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {donationPurposes.map((purpose) => {
              const Icon = purpose.icon;
              return (
                <Card key={purpose.value} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Icon className="w-8 h-8 text-primary mb-2" />
                    <CardTitle>{purpose.label}</CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>
                Fill out the form below to make your contribution. We'll contact you with payment details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donorName">Full Name *</Label>
                    <Input
                      id="donorName"
                      required
                      value={formData.donorName}
                      onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donorEmail">Email Address *</Label>
                    <Input
                      id="donorEmail"
                      type="email"
                      required
                      value={formData.donorEmail}
                      onChange={(e) => setFormData({ ...formData, donorEmail: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Donation Amount (USD) *</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
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
                  <Input
                    type="number"
                    placeholder="Enter custom amount"
                    min="1"
                    step="0.01"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Donation Purpose *</Label>
                  <RadioGroup
                    value={formData.purpose}
                    onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                  >
                    {donationPurposes.map((purpose) => (
                      <div key={purpose.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={purpose.value} id={purpose.value} />
                        <Label htmlFor={purpose.value} className="cursor-pointer">
                          {purpose.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your thoughts or dedication..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={formData.isAnonymous}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isAnonymous: checked as boolean })
                    }
                  />
                  <Label htmlFor="anonymous" className="cursor-pointer">
                    Make this donation anonymous
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Submit Donation Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Donate;
