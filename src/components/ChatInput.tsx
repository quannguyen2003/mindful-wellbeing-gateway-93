
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Square } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onStop?: () => void;
}

const ChatInput = ({ onSendMessage, isLoading, onStop }: ChatInputProps) => {
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

  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập tin nhắn của bạn..."
            className="min-h-[50px] max-h-[120px] resize-none"
            disabled={isLoading}
          />
        </div>
        {isLoading ? (
          <Button
            type="button"
            onClick={onStop}
            className="bg-red-500 hover:bg-red-600"
            size="sm"
          >
            <Square className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="bg-blue-500 hover:bg-blue-600"
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        )}
      </form>
    </div>
  );
};

export default ChatInput;
