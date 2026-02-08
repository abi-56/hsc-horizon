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
import { ArrowRight, User, GraduationCap, Heart, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { subjectInterests, courseProgression } from '@/data/interestsAndCourses';

const StudentDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const { studentDetails, setStudentDetails } = useStudent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentDetails.name || !studentDetails.hscStream || !studentDetails.areaOfInterest) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Details saved successfully!');
    navigate('/streams');
  };

  const updateField = (field: keyof typeof studentDetails, value: string) => {
    const updates: Partial<typeof studentDetails> = { [field]: value };
    // Reset interest when subjects change
    if (field === 'hscSubjects') {
      updates.interest = '';
    }
    setStudentDetails({ ...studentDetails, ...updates });
  };

  const interests = studentDetails.hscSubjects ? subjectInterests[studentDetails.hscSubjects] || [] : [];
  const courses = studentDetails.hscSubjects ? courseProgression[studentDetails.hscSubjects] : null;

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

      {/* HSC Subjects */}
      <div className="space-y-2">
        <Label>HSC Subjects Studied</Label>
        <Select
          value={studentDetails.hscSubjects}
          onValueChange={(value) => updateField('hscSubjects', value)}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select your subjects combination" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pcm">PCM (Physics, Chemistry, Math)</SelectItem>
            <SelectItem value="pcb">PCB (Physics, Chemistry, Biology)</SelectItem>
            <SelectItem value="commerce">Commerce with Accounts/Economics</SelectItem>
            <SelectItem value="humanities">Humanities / Liberal Arts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dynamic Interest Section — appears after subject is chosen */}
      {interests.length > 0 && (
        <div className="space-y-2 animate-slide-up">
          <Label className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Your Interest Area (based on your subjects)
          </Label>
          <Select
            value={studentDetails.interest}
            onValueChange={(value) => updateField('interest', value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select your specific interest" />
            </SelectTrigger>
            <SelectContent>
              {interests.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Course Progression Display */}
      {courses && (
        <div className="animate-slide-up rounded-xl bg-muted/50 p-4 space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <BookOpen className="h-4 w-4 text-primary" />
            Course Progression After HSC
          </h4>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                After UG
              </p>
              <div className="flex flex-wrap gap-1.5">
                {courses.ug.map((c) => (
                  <span key={c} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
                After PG
              </p>
              <div className="flex flex-wrap gap-1.5">
                {courses.pg.map((c) => (
                  <span key={c} className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent-foreground">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Academic Strength */}
      <div className="space-y-2">
        <Label>Academic Strength</Label>
        <Select
          value={studentDetails.academicStrength}
          onValueChange={(value) => updateField('academicStrength', value)}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="What's your learning style?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="theory">Theory-based (Reading, Writing)</SelectItem>
            <SelectItem value="practical">Practical (Hands-on, Labs)</SelectItem>
            <SelectItem value="analytical">Analytical (Problem Solving)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Area of Interest */}
      <div className="space-y-2">
        <Label>Area of Interest *</Label>
        <Select
          value={studentDetails.areaOfInterest}
          onValueChange={(value) => updateField('areaOfInterest', value)}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="What excites you the most?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technology">Technology & Innovation</SelectItem>
            <SelectItem value="medical">Medical & Healthcare</SelectItem>
            <SelectItem value="management">Business & Management</SelectItem>
            <SelectItem value="creative">Creative & Design</SelectItem>
            <SelectItem value="research">Research & Discovery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Career Goal */}
      <div className="space-y-2">
        <Label>Career Goal</Label>
        <Select
          value={studentDetails.careerGoal}
          onValueChange={(value) => updateField('careerGoal', value)}
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="What's your ultimate career goal?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="job">Secure a Good Job</SelectItem>
            <SelectItem value="research">Pursue Research</SelectItem>
            <SelectItem value="entrepreneurship">Start My Own Business</SelectItem>
            <SelectItem value="higher-studies">Pursue Higher Studies Abroad</SelectItem>
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
