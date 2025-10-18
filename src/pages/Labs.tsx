import React, { useState } from 'react';
import MemberNav from '@/components/MemberNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FlaskConical,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const Labs = () => {
  const [expandedLab, setExpandedLab] = useState<string | null>(null);

  // Mock data - replace with actual API calls
  const labResults = [
    {
      id: '1',
      date: '2024-10-15',
      type: 'Comprehensive Metabolic Panel',
      status: 'completed' as const,
      orderedBy: 'Dr. Emily Chen',
      results: [
        { name: 'Glucose', value: '95', unit: 'mg/dL', range: '70-100', status: 'normal' as const },
        { name: 'A1C', value: '5.4', unit: '%', range: '<5.7', status: 'normal' as const },
        { name: 'Total Cholesterol', value: '185', unit: 'mg/dL', range: '<200', status: 'normal' as const },
        { name: 'LDL', value: '110', unit: 'mg/dL', range: '<100', status: 'high' as const },
        { name: 'HDL', value: '55', unit: 'mg/dL', range: '>40', status: 'normal' as const },
        { name: 'Triglycerides', value: '100', unit: 'mg/dL', range: '<150', status: 'normal' as const },
        { name: 'TSH', value: '2.1', unit: 'mIU/L', range: '0.4-4.0', status: 'normal' as const },
      ],
      pdfUrl: '#',
      notes: 'All values within acceptable range. Continue current treatment plan.',
    },
    {
      id: '2',
      date: '2024-07-20',
      type: 'Lipid Panel',
      status: 'completed' as const,
      orderedBy: 'Dr. Emily Chen',
      results: [
        { name: 'Total Cholesterol', value: '195', unit: 'mg/dL', range: '<200', status: 'normal' as const },
        { name: 'LDL', value: '125', unit: 'mg/dL', range: '<100', status: 'high' as const },
        { name: 'HDL', value: '48', unit: 'mg/dL', range: '>40', status: 'normal' as const },
        { name: 'Triglycerides', value: '135', unit: 'mg/dL', range: '<150', status: 'normal' as const },
      ],
      pdfUrl: '#',
      notes: 'Slight improvement in LDL levels. Continue monitoring.',
    },
    {
      id: '3',
      date: '2024-04-10',
      type: 'Baseline Labs',
      status: 'completed' as const,
      orderedBy: 'Dr. Emily Chen',
      results: [
        { name: 'Glucose', value: '102', unit: 'mg/dL', range: '70-100', status: 'high' as const },
        { name: 'A1C', value: '5.8', unit: '%', range: '<5.7', status: 'high' as const },
        { name: 'Total Cholesterol', value: '215', unit: 'mg/dL', range: '<200', status: 'high' as const },
      ],
      pdfUrl: '#',
      notes: 'Baseline labs showing prediabetic markers. Started on GLP-1 therapy.',
    },
  ];

  const upcomingLabs = [
    {
      id: '4',
      date: '2024-11-30',
      type: '3-Month Follow-up Labs',
      status: 'pending' as const,
      orderedBy: 'Dr. Emily Chen',
      labLocation: 'Quest Diagnostics - Downtown',
      instructions: 'Fasting required (8-12 hours)',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'low':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-orange-600" />;
      case 'requires_review':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MemberNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Lab Results
          </h1>
          <p className="text-gray-600 mt-2">
            View and track your laboratory test results
          </p>
        </div>

        <Tabs defaultValue="results" className="space-y-6">
          <TabsList>
            <TabsTrigger value="results">
              <FlaskConical className="mr-2 h-4 w-4" />
              Lab Results
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              <Calendar className="mr-2 h-4 w-4" />
              Upcoming Tests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-6">
            {labResults.map((lab) => (
              <Card key={lab.id}>
                <Collapsible
                  open={expandedLab === lab.id}
                  onOpenChange={(open) => setExpandedLab(open ? lab.id : null)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(lab.status)}
                          <div>
                            <CardTitle className="text-xl">{lab.type}</CardTitle>
                            <CardDescription className="mt-1">
                              Ordered by {lab.orderedBy} • {lab.date}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-700">
                          {lab.status}
                        </Badge>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            {expandedLab === lab.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </div>
                  </CardHeader>

                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      {/* Results Table */}
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                Test
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                Result
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                Reference Range
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {lab.results?.map((result, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium">
                                  {result.name}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  {result.value} {result.unit}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {result.range} {result.unit}
                                </td>
                                <td className="px-4 py-3">
                                  <Badge
                                    variant="outline"
                                    className={getStatusColor(result.status)}
                                  >
                                    {result.status}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Provider Notes */}
                      {lab.notes && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-sm text-blue-900 mb-2">
                            Provider Notes
                          </h4>
                          <p className="text-sm text-blue-800">{lab.notes}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center space-x-3 pt-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          Share with Provider
                        </Button>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingLabs.length > 0 ? (
              upcomingLabs.map((lab) => (
                <Card key={lab.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <div>
                          <CardTitle className="text-xl">{lab.type}</CardTitle>
                          <CardDescription className="mt-1">
                            Ordered by {lab.orderedBy}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-orange-600 bg-orange-50">
                        Scheduled
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Scheduled Date</p>
                          <p className="text-sm text-gray-600">{lab.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <FlaskConical className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Lab Location</p>
                          <p className="text-sm text-gray-600">{lab.labLocation}</p>
                        </div>
                      </div>
                    </div>

                    {lab.instructions && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-medium text-sm text-yellow-900 mb-1">
                          Important Instructions
                        </h4>
                        <p className="text-sm text-yellow-800">{lab.instructions}</p>
                      </div>
                    )}

                    <div className="flex items-center space-x-3 pt-2">
                      <Button className="bg-wellness-600 hover:bg-wellness-700">
                        Schedule Appointment
                      </Button>
                      <Button variant="outline">
                        Find Nearby Labs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FlaskConical className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Upcoming Lab Tests
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Your provider will order labs when needed for monitoring.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="mt-8 bg-gradient-to-r from-wellness-50 to-wellness-100 border-wellness-200">
          <CardContent className="py-6">
            <div className="flex items-start space-x-4">
              <div className="bg-wellness-600 rounded-full p-3">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-wellness-900 mb-2">
                  Understanding Your Lab Results
                </h3>
                <p className="text-sm text-wellness-800">
                  Regular lab monitoring helps track your metabolic health and treatment progress.
                  If you have questions about your results, schedule a consultation with your provider
                  or send a message through your portal.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Labs;
