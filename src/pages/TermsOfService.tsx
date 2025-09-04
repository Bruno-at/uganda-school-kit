import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: December 2024
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By enrolling your child at Excellence Academy or using our website and services, you agree to
                comply with and be bound by these Terms of Service. If you do not agree with these terms,
                please do not use our services.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enrollment and Admission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Application Process</h3>
                <p className="text-muted-foreground">
                  All applications must be submitted with required documentation and application fees.
                  Admission decisions are at the sole discretion of Excellence Academy.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Enrollment Requirements</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Completed application form with accurate information</li>
                  <li>Previous academic transcripts</li>
                  <li>Medical records and vaccinations</li>
                  <li>Character references where required</li>
                  <li>Payment of required fees</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Academic Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Attendance</h3>
                <p className="text-muted-foreground">
                  Regular attendance is mandatory. Students must maintain at least 85% attendance for
                  academic progression. Extended absences require prior approval from school administration.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Academic Integrity</h3>
                <p className="text-muted-foreground">
                  All students are expected to maintain high standards of academic honesty. Plagiarism,
                  cheating, or any form of academic dishonesty will result in disciplinary action.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Assessment and Grading</h3>
                <p className="text-muted-foreground">
                  Student progress is assessed through continuous assessment, examinations, and projects.
                  Grade reports are issued at the end of each term.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Financial Obligations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Fee Payment</h3>
                <p className="text-muted-foreground">
                  School fees must be paid in advance according to the payment schedule. Late payments
                  may incur additional charges and may affect student enrollment status.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Refund Policy</h3>
                <p className="text-muted-foreground">
                  Refunds are processed according to school policy. Development fees and registration
                  fees are non-refundable. Tuition refunds are prorated based on withdrawal date.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Code of Conduct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Student Behavior</h3>
                <p className="text-muted-foreground">
                  Students are expected to conduct themselves with respect, integrity, and responsibility.
                  Violation of school rules may result in suspension or expulsion.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Dress Code</h3>
                <p className="text-muted-foreground">
                  Students must wear the prescribed school uniform. Proper grooming and appearance
                  standards must be maintained at all times on school premises.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Safety and Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Excellence Academy is committed to providing a safe learning environment. We reserve the
                right to implement security measures including but not limited to searches, monitoring,
                and emergency procedures as deemed necessary for student and staff safety.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Excellence Academy strives to provide quality education but cannot guarantee specific
                academic outcomes. The school's liability is limited to the extent permitted by law.
                Parents/guardians acknowledge that education involves inherent risks.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For questions regarding these Terms of Service, please contact:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Excellence Academy</strong></p>
                <p>Kyanja, Kampala, Uganda</p>
                <p>Phone: +256 700 123 456</p>
                <p>Email: info@excellenceacademy.ug</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;