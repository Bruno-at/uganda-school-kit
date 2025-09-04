import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last updated: December 2024
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Student Information</h3>
                <p className="text-muted-foreground">
                  We collect personal information necessary for enrollment and educational purposes, including:
                  student names, contact details, academic records, attendance data, and emergency contact information.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Parent/Guardian Information</h3>
                <p className="text-muted-foreground">
                  Contact information, financial data for fee payments, and communication preferences to ensure
                  effective school-home communication.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Website Usage Data</h3>
                <p className="text-muted-foreground">
                  We may collect non-personal information about your use of our website, including IP addresses,
                  browser type, and pages visited to improve our online services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>To provide educational services and support student learning</li>
                <li>To communicate with parents/guardians about academic progress and school activities</li>
                <li>To process fee payments and maintain financial records</li>
                <li>To ensure student safety and security on campus</li>
                <li>To comply with educational regulations and legal requirements</li>
                <li>To improve our educational programs and services</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Excellence Academy does not sell, trade, or otherwise transfer personal information to third parties
                except in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>When required by law or government authorities</li>
                <li>To educational partners for legitimate educational purposes</li>
                <li>To service providers who assist in school operations (with appropriate safeguards)</li>
                <li>In case of emergency situations involving student safety</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect personal information against unauthorized
                access, alteration, disclosure, or destruction. This includes physical, electronic, and
                administrative safeguards to ensure data protection.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Access your personal information held by the school</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of information where legally permissible</li>
                <li>Withdraw consent for non-essential data processing</li>
                <li>File a complaint with relevant authorities if you believe your privacy has been violated</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about this Privacy Policy or how we handle your personal information,
                please contact us:
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

export default PrivacyPolicy;