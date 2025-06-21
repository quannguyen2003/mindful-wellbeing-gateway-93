
import { useState, useCallback } from 'react';

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const SYSTEM_PROMPT = `Bạn là một AI assistant thông minh và hữu ích. Hãy trả lời các câu hỏi một cách chính xác, chi tiết và thân thiện. Bạn có thể trả lời bằng tiếng Việt hoặc tiếng Anh tùy theo ngôn ngữ mà người dùng sử dụng. Hãy luôn giữ thái độ lịch sự và chuyên nghiệp.`;

export const useGeminiChat = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  // Load sessions from localStorage
  const loadSessions = useCallback(() => {
    const savedSessions = localStorage.getItem('chat_sessions');
    if (savedSessions) {
      const parsed = JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      setSessions(parsed);
    }

    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  // Save sessions to localStorage
  const saveSessions = useCallback((updatedSessions: ChatSession[]) => {
    localStorage.setItem('chat_sessions', JSON.stringify(updatedSessions));
    setSessions(updatedSessions);
  }, []);

  // Create new chat session
  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'Cuộc trò chuyện mới',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const updatedSessions = [newSession, ...sessions];
    saveSessions(updatedSessions);
    setCurrentSession(newSession);
    return newSession;
  }, [sessions, saveSessions]);

  // Send message to Gemini API
  const sendMessage = useCallback(async (content: string) => {
    if (!apiKey || !currentSession) return;

    setIsLoading(true);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    // Update current session with user message
    const updatedSession = {
      ...currentSession,
      messages: [...currentSession.messages, userMessage],
      title: currentSession.messages.length === 0 ? content.slice(0, 30) + '...' : currentSession.title,
      updatedAt: new Date()
    };

    setCurrentSession(updatedSession);

    try {
      // Prepare messages for Gemini API
      const messages = [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        ...updatedSession.messages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      ];

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: messages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: data.candidates[0].content.parts[0].text,
          role: 'assistant',
          timestamp: new Date()
        };

        const finalSession = {
          ...updatedSession,
          messages: [...updatedSession.messages, assistantMessage],
          updatedAt: new Date()
        };

        setCurrentSession(finalSession);

        // Update sessions list
        const updatedSessions = sessions.map(session => 
          session.id === finalSession.id ? finalSession : session
        );
        saveSessions(updatedSessions);
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Xin lỗi, đã có lỗi xảy ra khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.',
        role: 'assistant',
        timestamp: new Date()
      };

      const errorSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, errorMessage],
        updatedAt: new Date()
      };

      setCurrentSession(errorSession);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, currentSession, sessions, saveSessions]);

  // Select session
  const selectSession = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
    }
  }, [sessions]);

  // Delete session
  const deleteSession = useCallback((sessionId: string) => {
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    saveSessions(updatedSessions);
    
    if (currentSession?.id === sessionId) {
      setCurrentSession(null);
    }
  }, [sessions, currentSession, saveSessions]);

  return {
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
  };
};
