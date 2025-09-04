import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UniformGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">School Uniform Guide</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete guidelines for Excellence Academy uniform requirements, ensuring all students 
              maintain the school's professional appearance standards.
            </p>
            <Button className="mt-4">
              <Download className="h-4 w-4 mr-2" />
              Download Uniform Guide PDF
            </Button>
          </div>

          <Tabs defaultValue="boys" className="mb-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="boys">Boys Uniform</TabsTrigger>
              <TabsTrigger value="girls">Girls Uniform</TabsTrigger>
              <TabsTrigger value="sports">Sports Uniform</TabsTrigger>
            </TabsList>

            <TabsContent value="boys" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Daily Uniform (Boys)
                      <Badge variant="secondary">O-Level & A-Level</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        'White long-sleeved shirt',
                        'Navy blue school tie with school crest',
                        'Grey school trousers',
                        'Black leather school shoes',
                        'Black or navy blue socks',
                        'Navy blue school blazer (with school crest)',
                        'Navy blue school sweater (optional)'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Additional Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Hair & Grooming</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Hair must be neatly cut and well-groomed</li>
                        <li>• No extreme hairstyles or colors</li>
                        <li>• Clean-shaven or neatly trimmed facial hair</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Accessories</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• School badge on blazer</li>
                        <li>• Watch (simple design)</li>
                        <li>• No jewelry except religious items</li>
                        <li>• School bag (navy blue or black)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="girls" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Daily Uniform (Girls)
                      <Badge variant="secondary">O-Level & A-Level</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        'White long-sleeved blouse',
                        'Navy blue school tie with school crest',
                        'Navy blue school skirt (knee-length)',
                        'Navy blue school blazer (with school crest)',
                        'Black leather school shoes (low heel)',
                        'White or skin-tone stockings/tights',
                        'Navy blue school sweater (optional)'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Additional Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Hair & Grooming</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Hair neatly styled and natural colors only</li>
                        <li>• Long hair must be tied back</li>
                        <li>• Minimal makeup allowed for A-Level students</li>
                        <li>• Nails clean and trimmed</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Accessories</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• School badge on blazer</li>
                        <li>• Simple stud earrings only</li>
                        <li>• Watch (simple design)</li>
                        <li>• School bag (navy blue or black)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="sports" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sports & PE Uniform</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        'Navy blue polo shirt with school crest',
                        'Navy blue sports shorts',
                        'White sports socks',
                        'White sports shoes with non-marking soles',
                        'Navy blue tracksuit (for cooler weather)',
                        'Sports water bottle',
                        'Towel for changing'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Swimming Uniform</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Boys</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Navy blue swimming trunks</li>
                        <li>• Swim cap (school colors)</li>
                        <li>• Goggles (recommended)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Girls</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Navy blue one-piece swimsuit</li>
                        <li>• Swim cap (school colors)</li>
                        <li>• Goggles (recommended)</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Uniform Suppliers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Primary Supplier</h4>
                  <p className="text-sm text-muted-foreground">
                    <strong>Campus Store</strong><br />
                    Located at school premises<br />
                    Open: Monday - Friday, 8:00 AM - 4:00 PM<br />
                    Phone: +256 700 123 457
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold">Authorized Suppliers</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Smart Uniforms Ltd</strong> - Kampala Road</p>
                    <p><strong>School Outfitters</strong> - Garden City Mall</p>
                    <p><strong>Uniform World</strong> - Ntinda Shopping Center</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Uniform Care</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Uniforms must be clean and pressed daily</li>
                    <li>• Replace worn or damaged items promptly</li>
                    <li>• Name tags required on all items</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Enforcement</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Daily uniform inspections</li>
                    <li>• Non-compliance may result in detention</li>
                    <li>• Repeated violations will require parent meeting</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Financial Assistance</h4>
                  <p className="text-sm text-muted-foreground">
                    Families experiencing financial hardship may apply for 
                    uniform assistance through the school office.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Uniform Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">New Students</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Daily uniform (2 sets minimum)
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Sports uniform
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      School shoes
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      School bag
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Returning Students</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Check uniform condition
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Replace outgrown items
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Add name tags
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Update accessories
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Optional Items</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      School sweater
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Swimming gear
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Extra sports shoes
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      Umbrella (school colors)
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UniformGuide;