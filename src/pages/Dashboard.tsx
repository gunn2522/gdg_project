import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, CheckSquare, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Events', value: '12', icon: Calendar, color: 'text-blue-600' },
    { title: 'Active Tasks', value: '8', icon: CheckSquare, color: 'text-green-600' },
    { title: 'Total Members', value: '156', icon: Users, color: 'text-purple-600' },
    { title: 'Avg Attendance', value: '89%', icon: BarChart3, color: 'text-orange-600' },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover-scale card-default">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next events in your calendar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">React Workshop</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 2:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">Android Study Jam</p>
                  <p className="text-sm text-muted-foreground">Friday, 10:00 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">New event "Cloud Study Jam" created</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Venue setup task completed</p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}