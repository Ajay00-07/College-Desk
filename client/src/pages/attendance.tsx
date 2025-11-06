import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StudentAttendance {
  id: string;
  rollNumber: string;
  name: string;
  department: string;
  semester: number;
  percentage: number;
  classesAttended: number;
  totalClasses: number;
}

export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const students: StudentAttendance[] = [
    { id: "1", rollNumber: "21ECE045", name: "Priya Singh", department: "ECE", semester: 6, percentage: 68, classesAttended: 68, totalClasses: 100 },
    { id: "2", rollNumber: "21CSE089", name: "Rahul Kumar", department: "CSE", semester: 6, percentage: 72, classesAttended: 72, totalClasses: 100 },
    { id: "3", rollNumber: "21EEE023", name: "Anjali Sharma", department: "EEE", semester: 6, percentage: 82, classesAttended: 82, totalClasses: 100 },
    { id: "4", rollNumber: "21MECH067", name: "Vikram Patel", department: "MECH", semester: 6, percentage: 65, classesAttended: 65, totalClasses: 100 },
    { id: "5", rollNumber: "21CSE112", name: "Neha Reddy", department: "CSE", semester: 6, percentage: 88, classesAttended: 88, totalClasses: 100 },
  ];

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 75) return { label: "Good", className: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20" };
    if (percentage >= 65) return { label: "Below Threshold", className: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20" };
    return { label: "Critical", className: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20" };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Attendance Management</h1>
        <p className="text-muted-foreground mt-1">Monitor and manage student attendance records</p>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
              data-testid="input-search"
            />
          </div>
          <Button variant="outline" data-testid="button-filter">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button data-testid="button-export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => {
                const status = getAttendanceStatus(student.percentage);
                return (
                  <TableRow key={student.id} data-testid={`row-student-${student.id}`}>
                    <TableCell className="font-mono text-sm">{student.rollNumber}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.semester}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {student.classesAttended}/{student.totalClasses}
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{student.percentage}%</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={status.className}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => console.log('View details:', student.id)}
                        data-testid={`button-view-${student.id}`}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-green-500">
          <p className="text-sm text-muted-foreground">Above 75%</p>
          <p className="text-2xl font-bold mt-1">2 Students</p>
        </Card>
        <Card className="p-4 border-l-4 border-amber-500">
          <p className="text-sm text-muted-foreground">65-75%</p>
          <p className="text-2xl font-bold mt-1">2 Students</p>
        </Card>
        <Card className="p-4 border-l-4 border-red-500">
          <p className="text-sm text-muted-foreground">Below 65%</p>
          <p className="text-2xl font-bold mt-1">1 Student</p>
        </Card>
      </div>
    </div>
  );
}
