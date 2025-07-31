import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, TrendingUp, Clock } from 'lucide-react';

export default function Attendance() {
  const upcomingEvents = [
    { id: 1, name: 'React Workshop', date: '2024-08-02', expectedAttendees: 30, registered: 24 },
    { id: 2, name: 'Android Study Jam', date: '2024-08-05', expectedAttendees: 25, registered: 18 },
    { id: 3, name: 'Cloud Functions Deep Dive', date: '2024-08-08', expectedAttendees: 20, registered: 15 }
  ];

  const pastEvents = [
    { id: 4, name: 'Flutter Basics', date: '2024-07-28', attendees: 22, registered: 25, attendance: 88 },
    { id: 5, name: 'Web Development 101', date: '2024-07-25', attendees: 18, registered: 20, attendance: 90 },
    { id: 6, name: 'Machine Learning Intro', date: '2024-07-22', attendees: 15, registered: 18, attendance: 83 }
  ];

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout title="Attendance">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="card-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Across all events</p>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No-show Rate</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">13%</div>
            <p className="text-xs text-muted-foreground">-3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-default">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Track registrations for future events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{event.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{event.registered}/{event.expectedAttendees}</div>
                    <div className="text-sm text-muted-foreground">registered</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-default">
          <CardHeader>
            <CardTitle>Past Events</CardTitle>
            <CardDescription>Attendance statistics for completed events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{event.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={getAttendanceColor(event.attendance)}
                      >
                        {event.attendance}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {event.attendees}/{event.registered} attended
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}