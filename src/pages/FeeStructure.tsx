import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  CreditCard,
  Download,
  Calculator,
  Clock,
  CheckCircle,
  AlertCircle,
  Home,
  ChevronRight,
  ArrowRight,
  DollarSign,
  Calendar,
  Users,
  Shield
} from 'lucide-react';

const FeeStructure = () => {
  const feeStructure = {
    nursery: {
      admission: 50000,
      tuition: 180000,
      development: 25000,
      activity: 15000,
      uniform: 35000,
      books: 40000,
      total: 345000
    },
    primary: {
      admission: 75000,
      tuition: 280000,
      development: 35000,
      activity: 20000,
      uniform: 45000,
      books: 55000,
      total: 510000
    },
    secondary: {
      admission: 100000,
      tuition: 450000,
      development: 50000,
      activity: 30000,
      uniform: 60000,
      books: 80000,
      total: 770000
    },
    aLevel: {
      admission: 125000,
      tuition: 650000,
      development: 75000,
      activity: 40000,
      uniform: 65000,
      books: 95000,
      total: 1050000
    }
  };

  const paymentMethods = [
    {
      method: "Mobile Money",
      providers: ["MTN Mobile Money", "Airtel Money"],
      fees: "Free for amounts below UGX 500,000",
      icon: <CreditCard className="h-6 w-6" />
    },
    {
      method: "Bank Transfer",
      providers: ["Stanbic Bank", "Centenary Bank", "DFCU Bank"],
      fees: "Bank charges apply",
      icon: <Shield className="h-6 w-6" />
    },
    {
      method: "Cash Payment",
      providers: ["School Finance Office"],
      fees: "No additional charges",
      icon: <DollarSign className="h-6 w-6" />
    },
    {
      method: "Cheque Payment",
      providers: ["Any recognized bank"],
      fees: "No additional charges",
      icon: <Calculator className="h-6 w-6" />
    }
  ];

  const paymentPlan = [
    {
      term: "Term 1",
      percentage: "40%",
      dueDate: "January 15",
      description: "First installment including admission fees for new students"
    },
    {
      term: "Term 2", 
      percentage: "30%",
      dueDate: "April 15",
      description: "Second installment covering mid-year expenses"
    },
    {
      term: "Term 3",
      percentage: "30%",
      dueDate: "August 15", 
      description: "Final installment for the academic year"
    }
  ];

  const scholarships = [
    {
      type: "Academic Excellence",
      criteria: "Top 5% academic performance",
      benefit: "50% tuition fee waiver",
      eligibility: "All students"
    },
    {
      type: "Financial Hardship",
      criteria: "Demonstrated financial need",
      benefit: "Up to 70% fee reduction",
      eligibility: "Income verification required"
    },
    {
      type: "Sibling Discount",
      criteria: "Multiple children enrolled",
      benefit: "10% discount per additional child",
      eligibility: "Automatic for qualified families"
    },
    {
      type: "Staff Children",
      criteria: "Children of school employees",
      benefit: "25% tuition fee waiver",
      eligibility: "Permanent staff only"
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <section className="py-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to="/parents" className="text-muted-foreground hover:text-primary">
              For Parents
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary">Fee Structure</span>
          </nav>
        </div>
      </section>

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
              <Calculator className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Fee Structure</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Transparent and competitive fee structure designed to provide excellent value for quality education.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="fees" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="fees">Fee Structure</TabsTrigger>
              <TabsTrigger value="payment">Payment Plans</TabsTrigger>
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fees" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Annual Fee Structure 2024-2025</h2>
                <p className="text-muted-foreground">
                  All fees are quoted in Uganda Shillings (UGX) per academic year.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(feeStructure).map(([level, fees]) => (
                  <Card key={level} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold capitalize mb-2">
                        {level === 'aLevel' ? 'A-Level' : level}
                      </h3>
                      <div className="text-3xl font-bold text-primary">
                        {formatCurrency(fees.total)}
                      </div>
                      <p className="text-sm text-muted-foreground">per year</p>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Admission Fee</span>
                        <span>{formatCurrency(fees.admission)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tuition Fee</span>
                        <span>{formatCurrency(fees.tuition)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Development Fee</span>
                        <span>{formatCurrency(fees.development)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Activity Fee</span>
                        <span>{formatCurrency(fees.activity)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uniform & Books</span>
                        <span>{formatCurrency(fees.uniform + fees.books)}</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Download className="h-4 w-4 mr-2" />
                      Download Details
                    </Button>
                  </Card>
                ))}
              </div>
              
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                  Important Notes
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Admission fees are one-time payments for new students</li>
                  <li>• Fees are subject to annual review and may change</li>
                  <li>• Payment plans are available to spread costs across terms</li>
                  <li>• Scholarships and bursaries are available for eligible students</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="payment" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Payment Plans</h2>
                <p className="text-muted-foreground">
                  Flexible payment options to help manage your educational expenses.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {paymentPlan.map((plan, index) => (
                  <Card key={index} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300">
                    <div className="text-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground mx-auto mb-3">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold">{plan.term}</h3>
                      <div className="text-2xl font-bold text-primary">{plan.percentage}</div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Due Date:</span>
                        <span>{plan.dueDate}</span>
                      </div>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="p-6 bg-success/5 border-success/20">
                <h3 className="font-semibold mb-3 flex items-center text-success">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Early Payment Discount
                </h3>
                <p className="text-sm">
                  Pay the full annual fee before January 31st and receive a 5% discount on tuition fees.
                  This offer is available for all grade levels and can result in significant savings.
                </p>
              </Card>
            </TabsContent>
            
            <TabsContent value="methods" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Payment Methods</h2>
                <p className="text-muted-foreground">
                  Multiple convenient ways to pay your school fees securely.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {paymentMethods.map((method, index) => (
                  <Card key={index} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{method.method}</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Providers: </span>
                            <span className="text-muted-foreground">{method.providers.join(', ')}</span>
                          </div>
                          <div>
                            <span className="font-medium">Fees: </span>
                            <span className="text-muted-foreground">{method.fees}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Account Details for Bank Transfers</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Account Name:</strong> Excellence Academy Uganda</p>
                    <p><strong>Account Number:</strong> 9030012345678</p>
                    <p><strong>Bank:</strong> Stanbic Bank Uganda</p>
                  </div>
                  <div>
                    <p><strong>Swift Code:</strong> SBICUGKX</p>
                    <p><strong>Branch:</strong> Kampala Main Branch</p>
                    <p><strong>Reference:</strong> Student Name + Class</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="scholarships" className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Scholarships & Financial Aid</h2>
                <p className="text-muted-foreground">
                  Supporting deserving students through various scholarship and bursary programs.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {scholarships.map((scholarship, index) => (
                  <Card key={index} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-success/80 text-success-foreground">
                        <Users className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{scholarship.type}</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Benefit: </span>
                            <span className="text-success font-medium">{scholarship.benefit}</span>
                          </div>
                          <div>
                            <span className="font-medium">Criteria: </span>
                            <span className="text-muted-foreground">{scholarship.criteria}</span>
                          </div>
                          <div>
                            <span className="font-medium">Eligibility: </span>
                            <span className="text-muted-foreground">{scholarship.eligibility}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card className="p-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold mb-3 text-primary">How to Apply for Financial Aid</h3>
                <ol className="text-sm space-y-2">
                  <li>1. Complete the financial aid application form</li>
                  <li>2. Submit required documentation (income statements, etc.)</li>
                  <li>3. Schedule an interview with the finance committee</li>
                  <li>4. Await review and decision (typically 2-3 weeks)</li>
                </ol>
                <Button variant="outline" className="mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Download Application Form
                </Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help with Payments?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our finance team is here to assist you with payment plans and financial aid options.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <Link to="/parents/support">
                <ArrowRight className="mr-2 h-5 w-5" />
                Contact Finance Office
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <Link to="/portal">
                <CreditCard className="mr-2 h-5 w-5" />
                Pay Fees Online
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeeStructure;