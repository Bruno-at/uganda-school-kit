import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Users, GraduationCap, Crown } from "lucide-react";

const Membership = () => {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<"pta" | "alumni">("pta");

  const ptaTiers = [
    {
      name: "Basic Member",
      tier: "basic",
      price: "$50/year",
      icon: Users,
      benefits: [
        "Access to PTA meetings",
        "Monthly newsletter",
        "Voting rights on school matters",
        "Community events access",
      ],
    },
    {
      name: "Premium Member",
      tier: "premium",
      price: "$150/year",
      icon: GraduationCap,
      popular: true,
      benefits: [
        "All Basic Member benefits",
        "Priority event registration",
        "Exclusive workshops and seminars",
        "Direct communication with leadership",
        "Recognition in annual report",
      ],
    },
    {
      name: "Lifetime Member",
      tier: "lifetime",
      price: "$1,000 (one-time)",
      icon: Crown,
      benefits: [
        "All Premium Member benefits",
        "Lifetime voting rights",
        "Legacy plaque on school grounds",
        "VIP event access",
        "Annual appreciation dinner",
        "Exclusive school merchandise",
      ],
    },
  ];

  const alumniTiers = [
    {
      name: "Alumni Member",
      tier: "basic",
      price: "$30/year",
      icon: Users,
      benefits: [
        "Alumni directory access",
        "Reunion event invitations",
        "School magazine subscription",
        "Career networking opportunities",
      ],
    },
    {
      name: "Distinguished Alumni",
      tier: "premium",
      price: "$100/year",
      icon: GraduationCap,
      popular: true,
      benefits: [
        "All Alumni Member benefits",
        "Mentorship program participation",
        "Priority reunion seating",
        "Featured in alumni spotlight",
        "Exclusive networking events",
      ],
    },
    {
      name: "Legacy Alumni",
      tier: "lifetime",
      price: "$750 (one-time)",
      icon: Crown,
      benefits: [
        "All Distinguished Alumni benefits",
        "Permanent alumni hall recognition",
        "Scholarship fund naming rights",
        "Board advisory opportunities",
        "Annual gala VIP access",
      ],
    },
  ];

  const currentTiers = selectedType === "pta" ? ptaTiers : alumniTiers;

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
              <BreadcrumbPage>Membership</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Become a member and support our school's mission while enjoying exclusive benefits
            </p>

            <div className="flex justify-center gap-4 mb-8">
              <Button
                variant={selectedType === "pta" ? "default" : "outline"}
                onClick={() => setSelectedType("pta")}
                size="lg"
              >
                PTA Membership
              </Button>
              <Button
                variant={selectedType === "alumni" ? "default" : "outline"}
                onClick={() => setSelectedType("alumni")}
                size="lg"
              >
                Alumni Association
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {currentTiers.map((membership) => {
              const Icon = membership.icon;
              return (
                <Card
                  key={membership.tier}
                  className={`relative ${
                    membership.popular ? "border-primary shadow-xl scale-105" : ""
                  }`}
                >
                  {membership.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <Icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <CardTitle className="text-2xl">{membership.name}</CardTitle>
                    <CardDescription className="text-3xl font-bold text-foreground mt-2">
                      {membership.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {membership.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={membership.popular ? "default" : "outline"}
                      size="lg"
                    >
                      Join Now
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Why Become a Member?</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">For PTA Members:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Active involvement in your child's education</li>
                  <li>• Direct impact on school policies and programs</li>
                  <li>• Build connections with other parents and teachers</li>
                  <li>• Support fundraising for essential school resources</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">For Alumni Members:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Stay connected with your alma mater</li>
                  <li>• Network with fellow graduates across generations</li>
                  <li>• Give back to the next generation of students</li>
                  <li>• Access exclusive alumni events and resources</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Membership;
