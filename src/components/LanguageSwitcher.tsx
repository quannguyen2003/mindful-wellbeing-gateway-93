
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Languages className="w-4 h-4 text-gray-600" />
      <div className="flex rounded-lg border border-gray-200 overflow-hidden">
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('en')}
          className={`rounded-none px-3 py-1 text-xs ${
            language === 'en' 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          EN
        </Button>
        <Button
          variant={language === 'vi' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setLanguage('vi')}
          className={`rounded-none px-3 py-1 text-xs ${
            language === 'vi' 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          VI
        </Button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
