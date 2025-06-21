
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Calendar, MessageCircle, Award, BookOpen } from 'lucide-react';

const ExpertProfile = () => {
  const { t } = useLanguage();

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Clinical Psychology",
      rating: 4.9,
      experience: "15 years",
      sessions: 1200,
      languages: ["English", "Spanish"],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Cognitive Behavioral Therapy",
      rating: 4.8,
      experience: "12 years",
      sessions: 950,
      languages: ["English", "Mandarin"],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialization: "Family Therapy",
      rating: 4.9,
      experience: "18 years",
      sessions: 1500,
      languages: ["English", "Spanish", "Portuguese"],
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'vi' ? 'Hồ Sơ Chuyên Gia' : 'Expert Profiles'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'vi' 
              ? 'Gặp gỡ các chuyên gia tâm lý có kinh nghiệm của chúng tôi, sẵn sàng hỗ trợ bạn trên hành trình sức khỏe tinh thần.'
              : 'Meet our experienced mental health professionals, ready to support you on your wellness journey.'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert) => (
            <Card key={expert.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {expert.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <CardTitle className="text-xl font-semibold">{expert.name}</CardTitle>
                <CardDescription className="text-blue-600 font-medium">
                  {expert.specialization}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{expert.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{expert.experience}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{expert.sessions} sessions</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>Licensed</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center space-x-1 mb-2">
                    <BookOpen className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Languages:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {expert.languages.map((lang) => (
                      <span key={lang} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                  {language === 'vi' ? 'Đặt Lịch Hẹn' : 'Book Appointment'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertProfile;
