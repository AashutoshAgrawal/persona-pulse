import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  TestTube, 
  Book, 
  Target,
  ChevronDown,
  ChevronUp,
  Activity,
  Settings,
  BarChart3
} from "lucide-react";

// Simulated data
const personaData = [
  { name: "Late-Night Explorer", value: 127, percentage: 29, color: "hsl(25 95% 55%)" },
  { name: "Road Trip Companion", value: 98, percentage: 22, color: "hsl(262 73% 42%)" },
  { name: "Zen Master", value: 89, percentage: 20, color: "hsl(220 23% 60%)" },
  { name: "Thrill Seeker", value: 76, percentage: 17, color: "hsl(25 95% 70%)" },
  { name: "Mindful Wanderer", value: 47, percentage: 11, color: "hsl(262 73% 60%)" }
];

const dropoffData = [
  { question: "Q1", users: 1000, retention: 100 },
  { question: "Q2", users: 840, retention: 84 },
  { question: "Q3", users: 760, retention: 76 },
  { question: "Q4", users: 690, retention: 69 }
];

const experimentData = [
  {
    experiment: "Voice Preview Button",
    variantA: "9% click rate",
    variantB: "21% click rate",
    lift: "+133%",
    status: "winner",
    confidence: "99%"
  },
  {
    experiment: "Why This? Tooltip",
    variantA: "15% engagement",
    variantB: "18% engagement", 
    lift: "+20%",
    status: "active",
    confidence: "87%"
  },
  {
    experiment: "Persona Animation Speed",
    variantA: "2.3s avg time",
    variantB: "1.8s avg time",
    lift: "-22%",
    status: "testing",
    confidence: "72%"
  }
];

const topBooks = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    matchRate: 94,
    persona: "Mindful Wanderer",
    recommendations: 127
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    matchRate: 91,
    persona: "Thrill Seeker",
    recommendations: 89
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    matchRate: 88,
    persona: "Late-Night Explorer",
    recommendations: 76
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    matchRate: 86,
    persona: "Zen Master",
    recommendations: 65
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    matchRate: 83,
    persona: "Road Trip Companion",
    recommendations: 54
  }
];

const completionMetrics = {
  average: "1m 47s",
  min: "32s",
  max: "4m 12s",
  median: "1m 35s"
};

const MetricCard = ({ title, value, subtitle, icon: Icon, trend }: any) => (
  <Card className="bg-gradient-to-br from-card to-muted/20 border-primary/20">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-2 text-xs">
          {trend > 0 ? (
            <ChevronUp className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <ChevronDown className="h-3 w-3 text-red-500 mr-1" />
          )}
          <span className={trend > 0 ? "text-green-500" : "text-red-500"}>
            {Math.abs(trend)}% vs last week
          </span>
        </div>
      )}
    </CardContent>
  </Card>
);

export default function AnalyticsDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Navigation Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">SoundPersona Analytics</h1>
            </div>
            <Badge variant="outline" className="text-xs">Internal Dashboard</Badge>
          </div>
          
          <Tabs defaultValue="dashboard" className="mt-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-6">
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Total Personas Generated"
                    value="437"
                    subtitle="This month"
                    icon={Target}
                    trend={12}
                  />
                  <MetricCard
                    title="Quiz Completion Rate"
                    value="69%"
                    subtitle="Q1 → Q4 completion"
                    icon={Activity}
                    trend={-3}
                  />
                  <MetricCard
                    title="Avg Completion Time"
                    value={completionMetrics.average}
                    subtitle={`Range: ${completionMetrics.min} - ${completionMetrics.max}`}
                    icon={Clock}
                    trend={8}
                  />
                  <MetricCard
                    title="Active Experiments"
                    value="3"
                    subtitle="2 showing positive lift"
                    icon={TestTube}
                    trend={0}
                  />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Persona Distribution */}
                  <Card className="bg-gradient-to-br from-card to-muted/20 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-primary" />
                        <span>Persona Distribution</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={personaData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percentage }) => `${name}: ${percentage}%`}
                          >
                            {personaData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Drop-off Analytics */}
                  <Card className="bg-gradient-to-br from-card to-muted/20 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        <span>Quiz Drop-off Analysis</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={dropoffData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 23% 18%)" />
                          <XAxis dataKey="question" stroke="hsl(0 0% 60%)" />
                          <YAxis stroke="hsl(0 0% 60%)" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: "hsl(220 23% 10%)",
                              border: "1px solid hsl(220 23% 18%)",
                              borderRadius: "8px"
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="retention" 
                            stroke="hsl(25 95% 55%)" 
                            strokeWidth={3}
                            dot={{ fill: "hsl(25 95% 55%)", strokeWidth: 2, r: 6 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Experiments Table */}
                <Card className="bg-gradient-to-br from-card to-muted/20 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TestTube className="h-5 w-5 text-primary" />
                      <span>A/B Test Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Experiment</TableHead>
                          <TableHead>Variant A</TableHead>
                          <TableHead>Variant B</TableHead>
                          <TableHead>Lift</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Confidence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {experimentData.map((exp, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{exp.experiment}</TableCell>
                            <TableCell>{exp.variantA}</TableCell>
                            <TableCell>{exp.variantB}</TableCell>
                            <TableCell>
                              <span className={exp.lift.includes('+') ? 'text-green-500' : 'text-red-500'}>
                                {exp.lift}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={exp.status === 'winner' ? 'default' : exp.status === 'active' ? 'secondary' : 'outline'}
                              >
                                {exp.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{exp.confidence}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Top Books */}
                <Card className="bg-gradient-to-br from-card to-muted/20 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Book className="h-5 w-5 text-primary" />
                      <span>Top Recommended Books</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topBooks.map((book, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold">{book.title}</h4>
                              <p className="text-sm text-muted-foreground">by {book.author}</p>
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{book.persona}</Badge>
                              <span className="text-sm font-semibold text-primary">{book.matchRate}%</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{book.recommendations} recommendations</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <Card className="bg-gradient-to-br from-card to-muted/20 border-primary/20">
                <CardContent className="p-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">User Management</h3>
                  <p className="text-muted-foreground">User analytics and management features coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <Card className="bg-gradient-to-br from-card to-muted/20 border-primary/20">
                <CardContent className="p-12 text-center">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Dashboard Settings</h3>
                  <p className="text-muted-foreground">Configuration options and preferences coming soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}