import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '@/context/StudentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, User, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

const StudentDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const { studentDetails, setStudentDetails } = useStudent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentDetails.name || !studentDetails.hscStream) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Details saved successfully!');
    navigate('/streams');
  };

  const updateField = (field: keyof typeof studentDetails, value: string) => {
    setStudentDetails({ ...studentDetails, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Student Name *
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={studentDetails.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="h-12"
        />
      </div>

      {/* Education Level */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          Current Education Level *
        </Label>
        <Select
          value={studentDetails.educationLevel}
          onValueChange={(value) => updateField('educationLevel', value)}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select your education level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hsc">HSC (12th Standard) Completed</SelectItem>
            <SelectItem value="ug">Undergraduate (UG) Student</SelectItem>
            <SelectItem value="pg">Postgraduate (PG) Student</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* HSC Stream */}
      <div className="space-y-2">
        <Label>HSC Stream *</Label>
        <Select
          value={studentDetails.hscStream}
          onValueChange={(value) => updateField('hscStream', value)}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select your HSC stream" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="commerce">Commerce</SelectItem>
            <SelectItem value="arts">Arts / Humanities</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" size="lg" className="w-full group">
        Continue to Explore Streams
        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Button>
    </form>
  );
};

export default StudentDetailsForm;
