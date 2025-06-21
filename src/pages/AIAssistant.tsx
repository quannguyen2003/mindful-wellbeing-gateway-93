
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import ChatSidebar from '@/components/ChatSidebar';
import ApiKeyInput from '@/components/ApiKeyInput';
import { useGeminiChat } from '@/hooks/useGeminiChat';
import { ScrollArea } from '@/components/ui/scroll-area';

const AIAssistant = () => {
  const {
    sessions,
    currentSession,
    isLoading,
    apiKey,
    loadSessions,
    createNewSession,
    sendMessage,
    selectSession,
    deleteSession,
    setApiKey
  } = useGeminiChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentSession?.messages]);

  const handleApiKeySaved = (key: string) => {
    setApiKey(key);
    if (sessions.length === 0) {
      createNewSession();
    }
  };

  const handleSendMessage = (content: string) => {
    if (!currentSession) {
      const newSession = createNewSession();
      if (newSession) {
        sendMessage(content);
      }
    } else {
      sendMessage(content);
    }
  };

  if (!apiKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <ApiKeyInput onApiKeySaved={handleApiKeySaved} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <ChatSidebar
          sessions={sessions}
          currentSession={currentSession}
          onNewChat={createNewSession}
          onSelectSession={selectSession}
          onDeleteSession={deleteSession}
        />
        
        <div className="flex-1 flex flex-col">
          {currentSession ? (
            <>
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="p-4 space-y-4">
                    {currentSession.messages.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-xl">🤖</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Chào mừng đến với AI Assistant
                        </h3>
                        <p className="text-gray-600">
                          Hãy bắt đầu cuộc trò chuyện bằng cách nhập tin nhắn bên dưới
                        </p>
                      </div>
                    ) : (
                      <>
                        {currentSession.messages.map((message) => (
                          <ChatMessage key={message.id} message={message} />
                        ))}
                        {isLoading && (
                          <div className="flex justify-start mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-600">🤖</span>
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
                      </>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </div>
              
              <ChatInput 
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Chọn cuộc trò chuyện
                </h3>
                <p className="text-gray-600">
                  Chọn một cuộc trò chuyện từ sidebar hoặc tạo cuộc trò chuyện mới
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
