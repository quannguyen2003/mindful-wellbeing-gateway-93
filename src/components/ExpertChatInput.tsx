
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Square, Paperclip, Smile } from 'lucide-react';

interface ExpertChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  expertName: string;
  onStop?: () => void;
}

const ExpertChatInput = ({ onSendMessage, isLoading, expertName, onStop }: ExpertChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const quickMessages = [
    "Tôi cần lời khuyên về...",
    "Tôi đang gặp khó khăn với...",
    "Bạn có thể giúp tôi hiểu về...",
    "Tôi muốn cải thiện..."
  ];

  return (
    <div className="border-t border-gray-200 bg-white">
      {/* Quick message suggestions */}
      <div className="px-4 py-2 border-b border-gray-100">
        <div className="flex flex-wrap gap-2">
          {quickMessages.map((quickMsg, index) => (
            <button
              key={index}
              onClick={() => setMessage(quickMsg)}
              className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
              disabled={isLoading}
            >
              {quickMsg}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Nhập tin nhắn gửi ${expertName}...`}
              className="min-h-[50px] max-h-[120px] resize-none pr-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
            <div className="absolute right-2 bottom-2 flex space-x-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="p-1 h-8 w-8 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="p-1 h-8 w-8 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <Button
              type="button"
              onClick={onStop}
              className="bg-red-500 hover:bg-red-600 text-white"
              size="sm"
            >
              <Square className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!message.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white"
              size="sm"
            >
              <Send className="w-4 h-4" />
            </Button>
          )}
        </form>
        
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Nhấn Enter để gửi, Shift + Enter để xuống dòng</span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>{expertName} đang trực tuyến</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExpertChatInput;
