import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, User, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  dueDate: string;
  assignee?: string;
}

export default function Tasks() {
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Prepare presentation slides',
      description: 'Create slides for the React workshop presentation.',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2024-08-01',
      assignee: 'John Doe'
    },
    {
      id: '2',
      title: 'Book venue for Android study jam',
      description: 'Reserve the main auditorium for the upcoming Android event.',
      priority: 'medium',
      status: 'todo',
      dueDate: '2024-08-03',
      assignee: 'Jane Smith'
    }
  ]);
  
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string;
    assignee: string;
  }>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignee: ''
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      ...newTask,
      status: 'todo'
    };

    setTasks(prev => [...prev, task]);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '', assignee: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "Task Created",
      description: `"${newTask.title}" has been created successfully.`,
    });
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'todo' : 'completed';
        return { ...task, status: newStatus };
      }
      return task;
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'todo': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout 
      title="Tasks" 
      actions={
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to track project activities.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the task"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewTask(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="assignee">Assignee</Label>
                <Input
                  id="assignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                  placeholder="Who is responsible for this task?"
                />
              </div>
              <Button onClick={handleCreateTask} className="w-full bg-gradient-primary">
                Create Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover-scale card-default">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={task.status === 'completed'}
                    onCheckedChange={() => toggleTaskStatus(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <CardTitle className={`text-lg ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </CardTitle>
                    {task.description && (
                      <CardDescription className="mt-1">{task.description}</CardDescription>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                  <Badge variant="outline" className={getStatusColor(task.status)}>
                    {task.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
                {task.assignee && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {task.assignee}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {task.priority} priority
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}