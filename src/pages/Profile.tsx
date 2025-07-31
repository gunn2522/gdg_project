import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Camera, Mail, Phone, MapPin, Calendar, Shield, Crown, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@gdg.dev',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate developer and GDG organizer. Love building apps with React and Flutter.',
    joinDate: '2023-01-15',
    role: 'admin',
    eventsOrganized: 12,
    eventsAttended: 28,
    skillsShared: 5
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'member':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'guest':
        return <UserCheck className="h-4 w-4 text-gray-500" />;
      default:
        return <UserCheck className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'member':
        return 'secondary';
      case 'guest':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <DashboardLayout 
      title="Profile" 
      actions={
        <Button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="bg-gradient-primary"
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="card-elegant lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your profile details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {getRoleIcon(profile.role)}
                  <Badge variant={getRoleBadgeVariant(profile.role)}>
                    {profile.role}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold">{profile.name}</h3>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                disabled={!isEditing}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="card-default">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{profile.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{profile.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(profile.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-default">
            <CardHeader>
              <CardTitle>Activity Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Events Organized</span>
                <Badge variant="outline">{profile.eventsOrganized}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Events Attended</span>
                <Badge variant="outline">{profile.eventsAttended}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Skills Shared</span>
                <Badge variant="outline">{profile.skillsShared}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}