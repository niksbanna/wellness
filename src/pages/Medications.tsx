import React, { useState } from 'react';
import MemberNav from '@/components/MemberNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Pill,
  Calendar,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Package,
  Truck,
  Info
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const Medications = () => {
  const { toast } = useToast();
  const [autoRefillEnabled, setAutoRefillEnabled] = useState<{ [key: string]: boolean }>({
    '1': true,
  });

  // Mock data - replace with actual API calls
  const activeMedications = [
    {
      id: '1',
      name: 'Semaglutide',
      dosage: '0.5mg',
      frequency: 'Once weekly',
      prescribedDate: '2024-04-15',
      nextRefillDate: '2024-11-20',
      refillsRemaining: 3,
      instructions: 'Inject subcutaneously on the same day each week. Rotate injection sites.',
      prescribedBy: 'Dr. Emily Chen',
    },
  ];

  const refillHistory = [
    {
      id: '1',
      medication: 'Semaglutide 0.5mg',
      filledDate: '2024-10-20',
      quantity: '4 pens',
      pharmacy: 'TruePill Pharmacy',
      trackingNumber: 'USPS9876543210',
      status: 'delivered' as const,
    },
    {
      id: '2',
      medication: 'Semaglutide 0.5mg',
      filledDate: '2024-09-20',
      quantity: '4 pens',
      pharmacy: 'TruePill Pharmacy',
      status: 'delivered' as const,
    },
  ];

  const handleRequestRefill = (medicationId: string) => {
    toast({
      title: 'Refill requested',
      description: 'Your refill request has been submitted to the pharmacy.',
    });
  };

  const handleToggleAutoRefill = (medicationId: string, enabled: boolean) => {
    setAutoRefillEnabled({ ...autoRefillEnabled, [medicationId]: enabled });
    toast({
      title: enabled ? 'Auto-refill enabled' : 'Auto-refill disabled',
      description: enabled
        ? 'Your medication will be automatically refilled before it runs out.'
        : 'You will need to manually request refills.',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'processing':
        return <Package className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MemberNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Medications
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your prescriptions and refills
          </p>
        </div>

        {/* Active Medications */}
        <div className="space-y-6 mb-8">
          <h2 className="text-xl font-semibold">Active Medications</h2>
          {activeMedications.map((medication) => (
            <Card key={medication.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-wellness-100 p-3 rounded-full">
                      <Pill className="h-6 w-6 text-wellness-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{medication.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {medication.dosage} • {medication.frequency}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Active</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Medication Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Prescribed By</p>
                    <p className="text-sm font-semibold mt-1">{medication.prescribedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Prescribed Date</p>
                    <p className="text-sm font-semibold mt-1">{medication.prescribedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Refills Remaining</p>
                    <p className="text-sm font-semibold mt-1">
                      {medication.refillsRemaining} refills
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-sm text-blue-900 mb-1">
                        Medication Instructions
                      </h4>
                      <p className="text-sm text-blue-800">{medication.instructions}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Refill Information */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Next Scheduled Refill</h4>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {medication.nextRefillDate}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-wellness-600 hover:bg-wellness-700">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Request Refill Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Request Medication Refill</DialogTitle>
                          <DialogDescription>
                            Confirm your refill request for {medication.name}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-gray-500">Medication</p>
                                <p className="font-medium">{medication.name}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Dosage</p>
                                <p className="font-medium">{medication.dosage}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Quantity</p>
                                <p className="font-medium">4 pens (30-day supply)</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Refills Left</p>
                                <p className="font-medium">{medication.refillsRemaining}</p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                              Your refill will be processed and shipped within 2-3 business days.
                              You'll receive tracking information via email.
                            </p>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="button"
                            className="bg-wellness-600 hover:bg-wellness-700"
                            onClick={() => handleRequestRefill(medication.id)}
                          >
                            Confirm Refill Request
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Auto-Refill Toggle */}
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div className="flex-1">
                      <Label htmlFor={`auto-refill-${medication.id}`} className="text-base font-medium">
                        Auto-Refill
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        Automatically refill before running out
                      </p>
                    </div>
                    <Switch
                      id={`auto-refill-${medication.id}`}
                      checked={autoRefillEnabled[medication.id] || false}
                      onCheckedChange={(checked) =>
                        handleToggleAutoRefill(medication.id, checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Refill History */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Refill History</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {refillHistory.map((refill) => (
                  <div key={refill.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{refill.medication}</h3>
                          <Badge className={getStatusColor(refill.status)}>
                            {getStatusIcon(refill.status)}
                            <span className="ml-1 capitalize">{refill.status}</span>
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Filled:</span> {refill.filledDate}
                          </div>
                          <div>
                            <span className="font-medium">Quantity:</span> {refill.quantity}
                          </div>
                          <div>
                            <span className="font-medium">Pharmacy:</span> {refill.pharmacy}
                          </div>
                        </div>
                        {refill.trackingNumber && (
                          <div className="mt-2 flex items-center space-x-2 text-sm">
                            <Truck className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">
                              Tracking: <span className="font-mono">{refill.trackingNumber}</span>
                            </span>
                            <Button variant="link" className="h-auto p-0 text-wellness-600">
                              Track Package
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Card */}
        <Card className="mt-8 bg-gradient-to-r from-wellness-50 to-wellness-100 border-wellness-200">
          <CardContent className="py-6">
            <div className="flex items-start space-x-4">
              <div className="bg-wellness-600 rounded-full p-3">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-wellness-900 mb-2">
                  Need Help with Your Medication?
                </h3>
                <p className="text-sm text-wellness-800 mb-4">
                  If you have questions about your medication, side effects, or dosing,
                  please contact your care team. For urgent medical concerns, call 911.
                </p>
                <div className="flex space-x-3">
                  <Button variant="outline" className="border-wellness-600 text-wellness-600">
                    Message Care Team
                  </Button>
                  <Button variant="outline" className="border-wellness-600 text-wellness-600">
                    Schedule Consultation
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Medications;
