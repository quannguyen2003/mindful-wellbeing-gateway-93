
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySaved: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeySaved }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      onApiKeySaved(apiKey.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Key className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle>Cấu hình API Key</CardTitle>
          <CardDescription>
            Nhập Google Gemini API Key để bắt đầu trò chuyện
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="apiKey">Gemini API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Nhập API key của bạn"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <Button onClick={handleSave} className="w-full" disabled={!apiKey.trim()}>
            Lưu API Key
          </Button>
          <p className="text-xs text-gray-500 text-center">
            API key sẽ được lưu trữ cục bộ trong trình duyệt của bạn
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeyInput;
