import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Crown, Star, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Membership = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("pta");

  const ptaTiers = [
    {
      name: "Basic",
      tier: "basic",
      price: 50,
      duration: "per year",
      features: [
        "Monthly newsletter",
        "Access to PTA meetings",
        "Voting rights on key decisions",
        "Event notifications",
      ],
    },
    {
      name: "Premium",
      tier: "premium",
      price: 150,
      duration: "per year",
      popular: true,
      features: [
        "All Basic features",
        "Priority event registration",
        "Exclusive parent workshops",
        "Direct communication channel",
        "Recognition in annual report",
      ],
    },
    {
      name: "Lifetime",
      tier: "lifetime",
      price: 1000,
      duration: "one-time",
      features: [
        "All Premium features",
        "Lifetime membership benefits",
        "Special recognition plaque",
        "Invitation to exclusive events",
        "Legacy donor status",
        "Tax benefits documentation",
      ],
    },
  ];

  const alumniTiers = [
    {
      name: "Basic Alumni",
      tier: "basic",
      price: 30,
      duration: "per year",
      features: [
        "Alumni directory access",
        "Quarterly newsletter",
        "Networking events invitation",
        "Career support services",
      ],
    },
    {
      name: "Premium Alumni",
      tier: "premium",
      price: 100,
      duration: "per year",
      popular: true,
      features: [
        "All Basic features",
        "Mentorship program access",
        "Priority job postings",
        "Exclusive reunions",
        "Professional development workshops",
      ],
    },
    {
      name: "Lifetime Alumni",
      tier: "lifetime",
      price: 750,
      duration: "one-time",
      features: [
        "All Premium features",
        "Permanent alumni hall recognition",
        "Legacy scholarship naming rights",
        "Board meeting participation",
        "Exclusive networking privileges",
      ],
    },
  ];

  const handleJoinMembership = async (tier: string, membershipType: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to join a membership tier.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("memberships").insert([
        {
          user_id: user.id,
          membership_type: membershipType,
          tier: tier,
          status: "active",
        },
      ]);

      if (error) throw error;

      toast({
        title: "Membership Request Submitted",
        description: "We'll contact you shortly to complete your membership registration.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit membership request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderTierCard = (tier: any, membershipType: string) => (
    <Card key={tier.tier} className={`relative ${tier.popular ? "ring-2 ring-primary" : ""}`}>
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary">Most Popular</Badge>
        </div>
      )}
      <CardHeader>
        {tier.tier === "lifetime" && <Crown className="w-8 h-8 mb-2 text-primary" />}
        {tier.tier === "premium" && <Star className="w-8 h-8 mb-2 text-primary" />}
        {tier.tier === "basic" && <Users className="w-8 h-8 mb-2 text-primary" />}
        <CardTitle>{tier.name}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold text-foreground">${tier.price}</span>
          <span className="text-muted-foreground"> {tier.duration}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {tier.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full"
          variant={tier.popular ? "default" : "outline"}
          onClick={() => handleJoinMembership(tier.tier, membershipType)}
        >
          Join {tier.name}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Membership Tiers</h1>
            <p className="text-xl text-muted-foreground">
              Join our community and support our school's mission
            </p>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="pta">PTA Membership</TabsTrigger>
              <TabsTrigger value="alumni">Alumni Association</TabsTrigger>
            </TabsList>

            <TabsContent value="pta">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Parent Teacher Association</h2>
                <p className="text-muted-foreground">
                  Be an active part of your child's educational journey
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {ptaTiers.map((tier) => renderTierCard(tier, "pta"))}
              </div>
            </TabsContent>

            <TabsContent value="alumni">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Alumni Association</h2>
                <p className="text-muted-foreground">
                  Stay connected with your alma mater and fellow alumni
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {alumniTiers.map((tier) => renderTierCard(tier, "alumni"))}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-12 bg-muted">
            <CardHeader>
              <CardTitle>Why Become a Member?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">For PTA Members:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Directly influence school policies and programs</li>
                    <li>• Network with other parents and teachers</li>
                    <li>• Support fundraising initiatives</li>
                    <li>• Enhance your child's educational experience</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">For Alumni Members:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Reconnect with classmates and mentors</li>
                    <li>• Give back to future generations</li>
                    <li>• Access professional networking opportunities</li>
                    <li>• Participate in exclusive alumni events</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Membership;
