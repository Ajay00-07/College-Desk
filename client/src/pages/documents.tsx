import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FileText, Download, Sparkles } from "lucide-react";

export default function DocumentsPage() {
  const [documentType, setDocumentType] = useState("");
  const [studentName, setStudentName] = useState("");
  const [department, setDepartment] = useState("");
  const [details, setDetails] = useState("");
  const [generatedDocument, setGeneratedDocument] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedDocument(`
ATTENDANCE CONDONATION REQUEST

Date: November 6, 2025

To,
The Principal
Engineering College

Subject: Request for Attendance Condonation

Respected Sir/Madam,

I, ${studentName || "[Student Name]"}, student of ${department || "[Department]"} Department, hereby request condonation of my attendance shortage.

${details || "[Additional details will appear here]"}

Current Attendance: 68%
Required Attendance: 75%
Shortage: 7%

Reason: Medical leave from September 12-15, 2025 as per attached medical certificate.

I assure you that I will maintain regular attendance henceforth.

Thanking you,
Yours faithfully,
${studentName || "[Student Name]"}
${department || "[Department]"} Department

---
This document was generated using AI-powered College Desk system.
Reference: Attendance Rule 4.2 - Condonation Policy
      `);
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = (format: 'pdf' | 'word') => {
    console.log(`Downloading as ${format}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">AI Document Generator</h1>
        <p className="text-muted-foreground mt-1">Generate attendance reports, condonation letters, and official documents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Document Details</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doc-type">Document Type</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger id="doc-type" data-testid="select-document-type">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="condonation">Attendance Condonation Request</SelectItem>
                  <SelectItem value="shortage">Attendance Shortage Report</SelectItem>
                  <SelectItem value="monthly">Monthly Attendance Summary</SelectItem>
                  <SelectItem value="leave">Leave Application</SelectItem>
                  <SelectItem value="circular">Official Circular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-name">Student Name</Label>
              <Input
                id="student-name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g., Priya Singh"
                data-testid="input-student-name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger id="department" data-testid="select-department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSE">Computer Science (CSE)</SelectItem>
                  <SelectItem value="ECE">Electronics (ECE)</SelectItem>
                  <SelectItem value="EEE">Electrical (EEE)</SelectItem>
                  <SelectItem value="MECH">Mechanical (MECH)</SelectItem>
                  <SelectItem value="CIVIL">Civil Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Additional Details</Label>
              <Textarea
                id="details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Provide context, dates, reasons, etc."
                rows={6}
                data-testid="input-details"
              />
            </div>

            <Button 
              className="w-full" 
              onClick={handleGenerate}
              disabled={isGenerating}
              data-testid="button-generate"
            >
              {isGenerating ? (
                <>Generating...</>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with AI
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Preview</h2>
            {generatedDocument && (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownload('pdf')}
                  data-testid="button-download-pdf"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownload('word')}
                  data-testid="button-download-word"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Word
                </Button>
              </div>
            )}
          </div>

          <div className="min-h-[500px] bg-background border rounded-md p-8">
            {generatedDocument ? (
              <div className="font-mono text-sm whitespace-pre-wrap" data-testid="text-document-preview">
                {generatedDocument}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                <FileText className="w-12 h-12 mb-4 opacity-50" />
                <p>Generated document will appear here</p>
                <p className="text-sm mt-2">Fill in the details and click "Generate with AI"</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
