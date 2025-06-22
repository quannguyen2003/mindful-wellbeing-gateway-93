
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Expert {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  isOnline: boolean;
  responseTime: string;
}

interface ExpertSelectorProps {
  experts: Expert[];
  selectedExpert: Expert | null;
  onSelectExpert: (expert: Expert) => void;
}

const ExpertSelector = ({ experts, selectedExpert, onSelectExpert }: ExpertSelectorProps) => {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-teal-600">
        <h2 className="text-lg font-semibold text-white">Chuyên gia tư vấn</h2>
        <p className="text-sm text-blue-100">Chọn chuyên gia phù hợp với bạn</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                selectedExpert?.id === expert.id 
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white border-blue-300 shadow-lg transform scale-105' 
                  : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-blue-200 hover:shadow-md'
              }`}
              onClick={() => onSelectExpert(expert)}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="text-2xl">{expert.avatar}</div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 ${
                    selectedExpert?.id === expert.id ? 'border-white' : 'border-white'
                  } ${expert.isOnline ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm ${
                    selectedExpert?.id === expert.id ? 'text-white' : 'text-gray-900'
                  }`}>
                    {expert.name}
                  </h3>
                  <p className={`text-xs mb-2 ${
                    selectedExpert?.id === expert.id ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {expert.specialty}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={expert.isOnline ? "default" : "secondary"}
                      className={`text-xs ${
                        selectedExpert?.id === expert.id 
                          ? expert.isOnline 
                            ? 'bg-green-400 text-green-900 hover:bg-green-300'
                            : 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300'
                          : expert.isOnline 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}
                    >
                      {expert.isOnline ? 'Trực tuyến' : 'Offline'}
                    </Badge>
                  </div>
                  <p className={`text-xs mt-1 ${
                    selectedExpert?.id === expert.id ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    Phản hồi trong {expert.responseTime}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-900 text-sm mb-2">🔒 An toàn & Bảo mật</h4>
          <p className="text-xs text-blue-800">
            Mọi cuộc trò chuyện được mã hóa và bảo mật. Chuyên gia của chúng tôi đều có chứng chỉ hành nghề.
          </p>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ExpertSelector;
