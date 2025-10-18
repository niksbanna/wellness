import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, Info, CheckCircle, TrendingDown } from 'lucide-react';
import { calculateBMI, getBMICategory, calculatePricing, getRecommendedProgram, programTiers } from '@/lib/programs';
import { PricingFactors } from '@/types/program';

const PricingCalculator = () => {
  const [step, setStep] = useState(1);
  const [weight, setWeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [bmi, setBMI] = useState<number>(0);
  const [bmiData, setBMIData] = useState<any>(null);
  const [hasInsurance, setHasInsurance] = useState<boolean>(false);
  const [insuranceType, setInsuranceType] = useState<'commercial' | 'medicare' | 'medicaid' | 'none'>('none');
  const [medicationType, setMedicationType] = useState<'semaglutide' | 'tirzepatide' | 'liraglutide'>('semaglutide');
  const [programTier, setProgramTier] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [duration, setDuration] = useState<3 | 6 | 12>(6);
  const [estimate, setEstimate] = useState<any>(null);
  const [hasHealthConditions, setHasHealthConditions] = useState(false);

  // Calculate BMI when inputs change
  useEffect(() => {
    if (weight && heightFeet && heightInches) {
      const totalInches = parseInt(heightFeet) * 12 + parseInt(heightInches);
      const calculatedBMI = calculateBMI(parseFloat(weight), totalInches);
      setBMI(calculatedBMI);
      setBMIData(getBMICategory(calculatedBMI));
    }
  }, [weight, heightFeet, heightInches]);

  const handleCalculate = () => {
    const factors: PricingFactors = {
      bmi,
      hasInsurance,
      insuranceType,
      medicationType,
      programTier,
      duration,
    };

    const result = calculatePricing(factors);
    setEstimate(result);
  };

  const getRecommendation = () => {
    if (!bmi) return null;
    const supportLevel = programTier === 'basic' ? 'low' : programTier === 'premium' ? 'high' : 'medium';
    return getRecommendedProgram(bmi, hasHealthConditions, supportLevel);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-br from-wellness-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-wellness-100 p-4 rounded-full">
              <Calculator className="w-8 h-8 text-wellness-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Pricing Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get a personalized cost estimate for your weight loss journey
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: BMI Calculation */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-wellness-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  Calculate Your BMI
                </CardTitle>
                <CardDescription>
                  Enter your height and weight to determine eligibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="150"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Height</Label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="5"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        className="flex-1"
                      />
                      <span className="flex items-center text-gray-500">ft</span>
                      <Input
                        type="number"
                        placeholder="8"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        className="flex-1"
                      />
                      <span className="flex items-center text-gray-500">in</span>
                    </div>
                  </div>
                </div>

                {bmi > 0 && bmiData && (
                  <Alert className={bmiData.eligible ? 'border-green-500 bg-green-50' : 'border-amber-500 bg-amber-50'}>
                    <Info className={`h-4 w-4 ${bmiData.eligible ? 'text-green-600' : 'text-amber-600'}`} />
                    <AlertDescription className={bmiData.eligible ? 'text-green-800' : 'text-amber-800'}>
                      <div className="space-y-2">
                        <p className="font-semibold">
                          Your BMI: {bmi.toFixed(1)} ({bmiData.category})
                        </p>
                        <p>{bmiData.description}</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label>Do you have weight-related health conditions?</Label>
                  <p className="text-sm text-gray-500 mb-2">
                    (e.g., high blood pressure, type 2 diabetes, high cholesterol, sleep apnea)
                  </p>
                  <RadioGroup value={hasHealthConditions ? 'yes' : 'no'} onValueChange={(val) => setHasHealthConditions(val === 'yes')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="conditions-yes" />
                      <Label htmlFor="conditions-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="conditions-no" />
                      <Label htmlFor="conditions-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!bmi || !bmiData}
                    className="bg-wellness-600 hover:bg-wellness-700"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Program Selection */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-wellness-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  Select Your Program
                </CardTitle>
                <CardDescription>
                  Choose the level of support that fits your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {getRecommendation() && (
                  <Alert className="border-wellness-500 bg-wellness-50">
                    <CheckCircle className="h-4 w-4 text-wellness-600" />
                    <AlertDescription className="text-wellness-800">
                      <strong>Recommended for you:</strong> {getRecommendation()?.name} - {getRecommendation()?.shortDescription}
                    </AlertDescription>
                  </Alert>
                )}

                <RadioGroup value={programTier} onValueChange={(val: any) => setProgramTier(val)}>
                  <div className="space-y-4">
                    {programTiers.map((program) => (
                      <div
                        key={program.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          programTier === program.id
                            ? 'border-wellness-600 bg-wellness-50'
                            : 'border-gray-200 hover:border-wellness-300'
                        }`}
                        onClick={() => setProgramTier(program.id as any)}
                      >
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value={program.id} id={program.id} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={program.id} className="text-lg font-semibold cursor-pointer">
                              {program.name}
                            </Label>
                            <p className="text-sm text-gray-600 mt-1">{program.shortDescription}</p>
                            <p className="text-2xl font-bold text-wellness-700 mt-2">
                              ${program.price.monthly}/month
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} className="bg-wellness-600 hover:bg-wellness-700">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Insurance & Medication */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-wellness-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  Insurance & Medication Details
                </CardTitle>
                <CardDescription>
                  Help us estimate your out-of-pocket costs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Do you have insurance?</Label>
                  <RadioGroup value={hasInsurance ? 'yes' : 'no'} onValueChange={(val) => setHasInsurance(val === 'yes')}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="insurance-yes" />
                      <Label htmlFor="insurance-yes" className="font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="insurance-no" />
                      <Label htmlFor="insurance-no" className="font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {hasInsurance && (
                  <div className="space-y-2">
                    <Label htmlFor="insurance-type">Insurance Type</Label>
                    <Select value={insuranceType} onValueChange={(val: any) => setInsuranceType(val)}>
                      <SelectTrigger id="insurance-type">
                        <SelectValue placeholder="Select insurance type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="commercial">Commercial Insurance</SelectItem>
                        <SelectItem value="medicare">Medicare</SelectItem>
                        <SelectItem value="medicaid">Medicaid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="medication">Preferred Medication</Label>
                  <Select value={medicationType} onValueChange={(val: any) => setMedicationType(val)}>
                    <SelectTrigger id="medication">
                      <SelectValue placeholder="Select medication" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semaglutide">Semaglutide (~$300/month)</SelectItem>
                      <SelectItem value="tirzepatide">Tirzepatide (~$500/month)</SelectItem>
                      <SelectItem value="liraglutide">Liraglutide (~$450/month)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Your physician will help determine the best medication for you during your consultation.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Commitment Duration</Label>
                  <Select value={duration.toString()} onValueChange={(val) => setDuration(parseInt(val) as any)}>
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="6">6 months (Save $100!)</SelectItem>
                      <SelectItem value="12">12 months (Save $300!)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={() => { handleCalculate(); setStep(4); }} className="bg-wellness-600 hover:bg-wellness-700">
                    Calculate Cost
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Results */}
          {step === 4 && estimate && (
            <Card className="border-2 border-wellness-600">
              <CardHeader className="bg-gradient-to-r from-wellness-50 to-white">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <CheckCircle className="w-8 h-8 text-wellness-600" />
                  Your Personalized Estimate
                </CardTitle>
                <CardDescription>
                  Based on your selections, here's what you can expect to pay
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Monthly Breakdown */}
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Monthly Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Program Fee</span>
                      <span className="font-semibold">${estimate.programFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medication Cost</span>
                      <span className="font-semibold">${estimate.medicationCost.toFixed(2)}</span>
                    </div>
                    {estimate.insuranceCoverage > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Insurance Coverage</span>
                        <span className="font-semibold">-${estimate.insuranceCoverage.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="font-semibold text-lg">Monthly Total</span>
                      <span className="font-bold text-2xl text-wellness-700">${estimate.monthlyTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Total Cost */}
                <div className="bg-wellness-50 rounded-lg p-6 space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Total Program Cost ({duration} months)</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Initial Consultation</span>
                      <span className="font-semibold">${estimate.consultationFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{duration} months of treatment</span>
                      <span className="font-semibold">${(estimate.monthlyTotal * duration).toFixed(2)}</span>
                    </div>
                    {estimate.savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center gap-1">
                          <TrendingDown className="w-4 h-4" />
                          Multi-month Savings
                        </span>
                        <span className="font-semibold">-${estimate.savings.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="font-semibold text-lg">Total Investment</span>
                      <span className="font-bold text-3xl text-wellness-700">${estimate.totalDuration.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <p className="font-semibold mb-2">Important Notes:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• This is an estimate based on typical costs. Actual costs may vary.</li>
                      <li>• Insurance coverage estimates are approximate and require verification.</li>
                      <li>• Medication prices may change based on pharmacy and availability.</li>
                      <li>• We'll provide exact pricing during your consultation.</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                {/* CTAs */}
                <div className="space-y-3">
                  <Link to="/" className="block">
                    <Button size="lg" className="w-full bg-wellness-600 hover:bg-wellness-700">
                      Schedule Consultation
                    </Button>
                  </Link>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Start Over
                    </Button>
                    <Link to="/program-comparison" className="flex-1">
                      <Button variant="outline" className="w-full">
                        Compare Programs
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? 'w-8 bg-wellness-600' : s < step ? 'w-2 bg-wellness-400' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingCalculator;
