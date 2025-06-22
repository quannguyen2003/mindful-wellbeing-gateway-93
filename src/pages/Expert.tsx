
import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatMessage from '@/components/ChatMessage';
import ExpertChatInput from '@/components/ExpertChatInput';
import ExpertSelector from '@/components/ExpertSelector';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Expert {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  isOnline: boolean;
  responseTime: string;
}

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  expertName?: string;
}

const Expert = () => {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const experts: Expert[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Tâm lý học lâm sàng',
      avatar: '👩‍⚕️',
      isOnline: true,
      responseTime: '~2 phút'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Tư vấn nghề nghiệp',
      avatar: '👨‍💼',
      isOnline: true,
      responseTime: '~5 phút'
    },
    {
      id: '3',
      name: 'Dr. Emily Davis',
      specialty: 'Tư vấn gia đình',
      avatar: '👩‍🏫',
      isOnline: false,
      responseTime: '~30 phút'
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!selectedExpert) return;

    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate expert response
    setTimeout(() => {
      const expertMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Cảm ơn bạn đã chia sẻ. Tôi hiểu bạn đang ${content.toLowerCase()}. Là chuyên gia ${selectedExpert.specialty}, tôi muốn giúp bạn tìm ra hướng giải quyết phù hợp. Bạn có thể chia sẻ thêm chi tiết về tình huống này không?`,
        role: 'assistant',
        timestamp: new Date(),
        expertName: selectedExpert.name
      };

      setMessages(prev => [...prev, expertMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSelectExpert = (expert: Expert) => {
    setSelectedExpert(expert);
    setMessages([]);
    
    // Welcome message from selected expert
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      content: `Xin chào! Tôi là ${expert.name}, chuyên gia về ${expert.specialty}. Tôi rất vui được hỗ trợ bạn hôm nay. Bạn có thể chia sẻ những gì đang băn khoăn với tôi không?`,
      role: 'assistant',
      timestamp: new Date(),
      expertName: expert.name
    };
    
    setMessages([welcomeMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <ExpertSelector
          experts={experts}
          selectedExpert={selectedExpert}
          onSelectExpert={handleSelectExpert}
        />
        
        <div className="flex-1 flex flex-col bg-white">
          {selectedExpert ? (
            <>
              <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{selectedExpert.avatar}</div>
                  <div>
                    <h3 className="font-semibold">{selectedExpert.name}</h3>
                    <p className="text-sm opacity-90">{selectedExpert.specialty}</p>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className={`w-2 h-2 rounded-full ${selectedExpert.isOnline ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                      <span>{selectedExpert.isOnline ? 'Đang trực tuyến' : 'Offline'}</span>
                      <span>•</span>
                      <span>Phản hồi trong {selectedExpert.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    {messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))}
                    {isLoading && (
                      <div className="flex justify-start mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">{selectedExpert.avatar}</span>
                          </div>
                          <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>
              
              <ExpertChatInput 
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                expertName={selectedExpert.name}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">👥</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Chọn chuyên gia tư vấn
                </h3>
                <p className="text-gray-600 mb-6">
                  Chọn một chuyên gia từ danh sách bên trái để bắt đầu cuộc trò chuyện 1:1. 
                  Họ sẽ hỗ trợ bạn với những lời khuyên chuyên môn.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Mẹo:</strong> Hãy mô tả rõ ràng vấn đề bạn đang gặp phải để chuyên gia có thể đưa ra lời khuyên chính xác nhất.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expert;
