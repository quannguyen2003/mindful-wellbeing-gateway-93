
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar, MessageCircle, Award, Clock, Globe } from 'lucide-react';

interface Expert {
  id: number;
  name: string;
  title: string;
  specialization: string[];
  rating: number;
  experience: string;
  sessions: number;
  languages: string[];
  price: number;
  availability: string;
  image: string;
  description: string;
}

interface ExpertCardProps {
  expert: Expert;
  onBookConsultation: (expertId: number) => void;
}

const ExpertCard = ({ expert, onBookConsultation }: ExpertCardProps) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {expert.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">{expert.name}</CardTitle>
        <CardDescription className="text-blue-600 font-semibold">
          {expert.title}
        </CardDescription>
        <div className="flex items-center justify-center space-x-1 mt-2">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="font-semibold text-gray-700">{expert.rating}</span>
          <span className="text-gray-500 text-sm">({expert.sessions} sessions)</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {expert.specialization.map((spec) => (
              <Badge key={spec} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed">
            {expert.description}
          </p>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <Award className="w-4 h-4" />
              <span>{expert.experience}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{expert.availability}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-sm">
            <Globe className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Languages:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {expert.languages.map((lang) => (
              <Badge key={lang} variant="outline" className="text-xs">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-gray-900">${expert.price}</span>
            <span className="text-gray-500 text-sm">per session</span>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
            onClick={() => onBookConsultation(expert.id)}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Consultation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpertCard;
