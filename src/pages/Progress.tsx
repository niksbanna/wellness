import React, { useState } from 'react';
import MemberNav from '@/components/MemberNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Plus, TrendingDown, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Progress = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  // Mock data - replace with actual API calls
  const progressData = [
    { date: '2024-01-15', weight: 185, waist: 38 },
    { date: '2024-02-15', weight: 182, waist: 37 },
    { date: '2024-03-15', weight: 178, waist: 36 },
    { date: '2024-04-15', weight: 175, waist: 35 },
    { date: '2024-05-15', weight: 172, waist: 34 },
    { date: '2024-06-15', weight: 170, waist: 33 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call an API to save the progress entry
    toast({
      title: 'Progress logged!',
      description: 'Your progress has been successfully recorded.',
    });
    setWeight('');
    setWaist('');
    setNotes('');
  };

  const calculateStats = () => {
    const startWeight = progressData[0].weight;
    const currentWeight = progressData[progressData.length - 1].weight;
    const totalLoss = startWeight - currentWeight;
    const avgLossPerMonth = totalLoss / progressData.length;

    return {
      totalLoss,
      avgLossPerMonth,
      percentLoss: ((totalLoss / startWeight) * 100).toFixed(1),
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <MemberNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Progress Tracking
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor your weight loss journey and celebrate your wins
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Weight Loss</CardTitle>
              <TrendingDown className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                -{stats.totalLoss} lbs
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.percentLoss}% of starting weight
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Loss/Month</CardTitle>
              <Activity className="h-4 w-4 text-wellness-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.avgLossPerMonth.toFixed(1)} lbs
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Consistent progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
              <TrendingDown className="h-4 w-4 text-wellness-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {progressData[progressData.length - 1].weight} lbs
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: {progressData[progressData.length - 1].date}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weight Trend</CardTitle>
                <CardDescription>Your weight over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weight" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="weight">Weight</TabsTrigger>
                    <TabsTrigger value="waist">Waist Circumference</TabsTrigger>
                  </TabsList>
                  <TabsContent value="weight" className="mt-4">
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={progressData}>
                        <defs>
                          <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[160, 190]} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="weight"
                          stroke="#10b981"
                          fillOpacity={1}
                          fill="url(#colorWeight)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="waist" className="mt-4">
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={progressData}>
                        <defs>
                          <linearGradient id="colorWaist" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[30, 40]} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="waist"
                          stroke="#6366f1"
                          fillOpacity={1}
                          fill="url(#colorWaist)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Progress History */}
            <Card>
              <CardHeader>
                <CardTitle>Progress History</CardTitle>
                <CardDescription>Your recent measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.slice().reverse().slice(0, 5).map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-3 last:border-0"
                    >
                      <div>
                        <p className="font-medium">{entry.date}</p>
                        <p className="text-sm text-muted-foreground">
                          Waist: {entry.waist} inches
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{entry.weight} lbs</p>
                        {index < progressData.length - 1 && (
                          <p className="text-sm text-green-600">
                            -{(progressData[progressData.length - 1 - index - 1].weight - entry.weight).toFixed(1)} lbs
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Log Progress Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="mr-2 h-5 w-5" />
                  Log Progress
                </CardTitle>
                <CardDescription>Record your latest measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => date && setDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder="175.5"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waist">Waist Circumference (inches)</Label>
                    <Input
                      id="waist"
                      type="number"
                      step="0.5"
                      placeholder="34"
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="How are you feeling? Any challenges or wins?"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-wellness-600 hover:bg-wellness-700">
                    Save Progress
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Milestone Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Next Milestone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <p className="text-4xl font-bold text-wellness-600">165 lbs</p>
                  <p className="text-sm text-muted-foreground">
                    5 lbs to your next goal
                  </p>
                  <div className="pt-4">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-wellness-600 h-full rounded-full transition-all"
                        style={{ width: '50%' }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Progress;
