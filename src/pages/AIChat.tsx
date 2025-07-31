import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AIAssistant } from '@/components/ai/AIAssistant';

export default function AIChat() {
  return (
    <DashboardLayout title="AI Assistant">
      <div className="max-w-4xl mx-auto">
        <AIAssistant 
          context="GDG Campus Event Management Dashboard" 
          className="w-full"
        />
      </div>
    </DashboardLayout>
  );
}