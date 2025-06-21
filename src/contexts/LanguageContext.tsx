import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navbar
    'nav.aiAssistant': 'AI Assistant',
    'nav.questionnaire': 'Form Questionnaire',
    'nav.expert': '1:1 with Expert',
    'nav.expertProfile': 'Expert Profile',
    
    // Homepage
    'home.hero.title': 'Your Mental Health',
    'home.hero.subtitle': 'Journey Starts Here',
    'home.hero.description': 'Take control of your mental wellbeing with our comprehensive platform. Get AI-powered support, professional assessments, and connect with licensed experts - all in one safe space.',
    'home.hero.startAssessment': 'Start Assessment',
    'home.hero.tryAI': 'Try AI Assistant',
    
    // Features
    'home.features.title': 'Everything You Need for Mental Wellness',
    'home.features.subtitle': 'Our platform combines cutting-edge technology with human expertise to provide comprehensive mental health support.',
    'home.features.aiSupport.title': 'AI-Powered Support',
    'home.features.aiSupport.description': 'Get instant, personalized mental health guidance from our advanced AI assistant available 24/7.',
    'home.features.assessment.title': 'Comprehensive Assessment',
    'home.features.assessment.description': 'Take our scientifically-backed questionnaire to understand your mental health status and get tailored recommendations.',
    'home.features.expert.title': 'Expert Consultation',
    'home.features.expert.description': 'Connect with licensed mental health professionals for personalized one-on-one therapy sessions.',
    'home.features.safe.title': 'Safe & Confidential',
    'home.features.safe.description': 'Your privacy is our priority. All conversations and data are encrypted and completely confidential.',
    
    // CTA
    'home.cta.title': 'Ready to Begin Your Journey?',
    'home.cta.description': 'Join thousands who have taken the first step towards better mental health. Start with our quick assessment or chat with our AI assistant.',
    'home.cta.takeAssessment': 'Take Assessment',
    'home.cta.bookExpert': 'Book Expert Session',
    
    // Testimonials
    'home.testimonials.title': 'What Our Users Say',
    'home.testimonials.subtitle': 'Real stories from people who found support through our platform',
    
    // Footer
    'footer.tagline': 'Your mental health matters. We\'re here to support you every step of the way.',
    'footer.disclaimer': '© 2024 MindWell. All rights reserved. This platform is for informational purposes and does not replace professional medical advice.'
  },
  vi: {
    // Navbar
    'nav.aiAssistant': 'Trợ Lý AI',
    'nav.questionnaire': 'Bảng Câu Hỏi',
    'nav.expert': '1:1 với Chuyên Gia',
    'nav.expertProfile': 'Hồ Sơ Chuyên Gia',
    
    // Homepage
    'home.hero.title': 'Hành Trình Sức Khỏe',
    'home.hero.subtitle': 'Tinh Thần Bắt Đầu Từ Đây',
    'home.hero.description': 'Kiểm soát sức khỏe tinh thần của bạn với nền tảng toàn diện của chúng tôi. Nhận hỗ trợ từ AI, đánh giá chuyên nghiệp và kết nối với các chuyên gia được cấp phép - tất cả trong một không gian an toàn.',
    'home.hero.startAssessment': 'Bắt Đầu Đánh Giá',
    'home.hero.tryAI': 'Thử Trợ Lý AI',
    
    // Features
    'home.features.title': 'Mọi Thứ Bạn Cần Cho Sức Khỏe Tinh Thần',
    'home.features.subtitle': 'Nền tảng của chúng tôi kết hợp công nghệ tiên tiến với chuyên môn con người để cung cấp hỗ trợ sức khỏe tinh thần toàn diện.',
    'home.features.aiSupport.title': 'Hỗ Trợ Từ AI',
    'home.features.aiSupport.description': 'Nhận hướng dẫn sức khỏe tinh thần tức thì và cá nhân hóa từ trợ lý AI tiên tiến có sẵn 24/7.',
    'home.features.assessment.title': 'Đánh Giá Toàn Diện',
    'home.features.assessment.description': 'Thực hiện bảng câu hỏi được hỗ trợ bởi khoa học để hiểu tình trạng sức khỏe tinh thần và nhận đề xuất phù hợp.',
    'home.features.expert.title': 'Tư Vấn Chuyên Gia',
    'home.features.expert.description': 'Kết nối với các chuyên gia sức khỏe tinh thần được cấp phép cho các buổi trị liệu cá nhân một-đối-một.',
    'home.features.safe.title': 'An Toàn & Bảo Mật',
    'home.features.safe.description': 'Quyền riêng tư của bạn là ưu tiên hàng đầu. Tất cả cuộc trò chuyện và dữ liệu đều được mã hóa và hoàn toàn bảo mật.',
    
    // CTA
    'home.cta.title': 'Sẵn Sàng Bắt Đầu Hành Trình?',
    'home.cta.description': 'Tham gia cùng hàng nghìn người đã thực hiện bước đầu tiên hướng tới sức khỏe tinh thần tốt hơn. Bắt đầu với đánh giá nhanh hoặc trò chuyện với trợ lý AI.',
    'home.cta.takeAssessment': 'Thực Hiện Đánh Giá',
    'home.cta.bookExpert': 'Đặt Lịch Chuyên Gia',
    
    // Testimonials
    'home.testimonials.title': 'Người Dùng Nói Gì',
    'home.testimonials.subtitle': 'Những câu chuyện thực từ những người đã tìm thấy sự hỗ trợ qua nền tảng của chúng tôi',
    
    // Footer
    'footer.tagline': 'Sức khỏe tinh thần của bạn rất quan trọng. Chúng tôi sẵn sàng hỗ trợ bạn từng bước.',
    'footer.disclaimer': '© 2024 MindWell. Tất cả quyền được bảo lưu. Nền tảng này chỉ mang tính chất thông tin và không thay thế lời khuyên y tế chuyên nghiệp.'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
