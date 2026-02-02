import React from 'react';
import Layout from '@/components/layout/Layout';
import StudentDetailsForm from '@/components/forms/StudentDetailsForm';
import { ClipboardList } from 'lucide-react';

const StudentDetails: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-background via-background to-secondary/30 py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <ClipboardList className="h-8 w-8 text-primary" />
              </div>
              <h1 className="mb-2 font-display text-3xl font-bold text-foreground">
                Tell Us About Yourself
              </h1>
              <p className="text-muted-foreground">
                Help us understand your academic background and interests to provide personalized recommendations.
              </p>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl bg-card p-6 shadow-card sm:p-8">
              <StudentDetailsForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDetails;
