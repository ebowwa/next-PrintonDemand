import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, Copy, CheckCircle } from 'lucide-react';

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const calculateStrength = () => {
    let strength = 0;
    if (length > 8) strength++;
    if (length > 12) strength++;
    if (useUppercase) strength++;
    if (useNumbers) strength++;
    if (useSymbols) strength++;
    return strength;
  };

  const strengthColor = () => {
    const strength = calculateStrength();
    if (strength <= 2) return 'text-red-500';
    if (strength <= 4) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Password Generator</CardTitle>
          <CardDescription>Create a secure password with custom requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={password}
                readOnly
                className="flex-grow"
                placeholder="Generated password will appear here"
              />
              <Button onClick={copyToClipboard} variant="outline" size="icon">
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password Length: {length}</label>
              <Slider
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                max={30}
                min={6}
                step={1}
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Include Uppercase</span>
              <Switch
                checked={useUppercase}
                onCheckedChange={setUseUppercase}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Include Numbers</span>
              <Switch
                checked={useNumbers}
                onCheckedChange={setUseNumbers}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>Include Symbols</span>
              <Switch
                checked={useSymbols}
                onCheckedChange={setUseSymbols}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-4">
          <Button onClick={generatePassword} className="w-full">
            Generate Password
          </Button>
          <div className="flex items-center space-x-2">
            <AlertCircle className={`h-5 w-5 ${strengthColor()}`} />
            <span className={`text-sm ${strengthColor()}`}>
              Password Strength: {calculateStrength()} / 5
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}