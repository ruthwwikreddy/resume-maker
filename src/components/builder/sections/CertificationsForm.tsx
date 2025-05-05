
import React from "react";
import { useResume } from "@/contexts/ResumeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

const CertificationsForm = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResume();
  const { certifications } = resumeData;
  
  const handleAddCertification = () => {
    addListItem("certifications", {
      id: uuidv4(),
      name: "",
      issuer: "",
      date: "",
      expiration: "",
      credentialID: "",
      url: "",
    });
  };
  
  const handleChange = (index: number, field: string, value: string) => {
    updateListItem("certifications", index, { [field]: value });
  };
  
  const handleRemove = (index: number) => {
    removeListItem("certifications", index);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Certifications</h2>
        <Button 
          onClick={handleAddCertification}
          variant="outline" 
          className="border-resume-blue text-resume-blue hover:bg-resume-blue/10"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Certification
        </Button>
      </div>
      
      {certifications.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-600 rounded-lg">
          <p className="text-gray-400">No certifications added yet. Click the button above to add one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <Card key={cert.id} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardTitle className="text-lg">
                  {cert.name || "New Certification"}
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleRemove(index)}
                  className="hover:text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${index}`}>Certification Name</Label>
                  <Input
                    id={`name-${index}`}
                    value={cert.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    placeholder="e.g. AWS Certified Solutions Architect"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`issuer-${index}`}>Issuing Organization</Label>
                  <Input
                    id={`issuer-${index}`}
                    value={cert.issuer}
                    onChange={(e) => handleChange(index, "issuer", e.target.value)}
                    placeholder="e.g. Amazon Web Services"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`date-${index}`}>Issue Date</Label>
                    <Input
                      id={`date-${index}`}
                      type="month"
                      value={cert.date}
                      onChange={(e) => handleChange(index, "date", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`expiration-${index}`}>Expiration Date (Optional)</Label>
                    <Input
                      id={`expiration-${index}`}
                      type="month"
                      value={cert.expiration || ""}
                      onChange={(e) => handleChange(index, "expiration", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`credentialID-${index}`}>Credential ID (Optional)</Label>
                    <Input
                      id={`credentialID-${index}`}
                      value={cert.credentialID || ""}
                      onChange={(e) => handleChange(index, "credentialID", e.target.value)}
                      placeholder="e.g. ABC-123-XYZ"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`url-${index}`}>Credential URL (Optional)</Label>
                    <Input
                      id={`url-${index}`}
                      value={cert.url || ""}
                      onChange={(e) => handleChange(index, "url", e.target.value)}
                      placeholder="https://example.com/verify"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificationsForm;
