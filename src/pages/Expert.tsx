
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ExpertCard from '@/components/ExpertCard';
import BookingModal from '@/components/BookingModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Clock, 
  Shield, 
  CheckCircle, 
  Star,
  MessageCircle,
  Video,
  Calendar,
  Award
} from 'lucide-react';

const Expert = () => {
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Licensed Clinical Psychologist",
      specialization: ["Anxiety", "Depression", "Trauma", "Relationship Issues"],
      rating: 4.9,
      experience: "15+ years",
      sessions: 1200,
      languages: ["English", "Spanish"],
      price: 120,
      availability: "Available today",
      image: "/placeholder.svg",
      description: "Specialized in cognitive behavioral therapy and trauma-informed care. Helping individuals overcome anxiety and build resilience."
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Cognitive Behavioral Therapist",
      specialization: ["CBT", "Stress Management", "Work-Life Balance"],
      rating: 4.8,
      experience: "12+ years",
      sessions: 950,
      languages: ["English", "Mandarin"],
      price: 100,
      availability: "Available tomorrow",
      image: "/placeholder.svg",
      description: "Expert in cognitive behavioral therapy and workplace stress management. Focused on practical solutions for modern life challenges."
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Family & Marriage Therapist",
      specialization: ["Family Therapy", "Marriage Counseling", "Teen Issues"],
      rating: 4.9,
      experience: "18+ years",
      sessions: 1500,
      languages: ["English", "Spanish", "Portuguese"],
      price: 130,
      availability: "Available in 2 days",
      image: "/placeholder.svg",
      description: "Specializing in family dynamics and relationship counseling. Helping families build stronger connections and communication."
    }
  ];

  const features = [
    {
      icon: Video,
      title: "Video Consultations",
      description: "Secure, private video calls from the comfort of your home"
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Book sessions that fit your schedule, including evenings and weekends"
    },
    {
      icon: Shield,
      title: "100% Confidential",
      description: "Your privacy is protected with end-to-end encryption"
    },
    {
      icon: Award,
      title: "Licensed Professionals",
      description: "All experts are licensed mental health professionals"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Dr. Johnson helped me overcome my anxiety. The sessions were incredibly helpful and convenient.",
      rating: 5
    },
    {
      name: "Mike T.",
      text: "Professional and understanding. The video consultations made it easy to get help when I needed it.",
      rating: 5
    }
  ];

  const handleBookConsultation = (expertId: number) => {
    const expert = experts.find(e => e.id === expertId);
    setSelectedExpert(expert);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Professional Mental Health Support
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              1:1 Expert Consultations
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect with licensed mental health professionals for personalized support. 
              Schedule secure video consultations at your convenience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Consultation
              </Button>
              <Button size="lg" variant="outline">
                <MessageCircle className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Expert Consultations?
            </h2>
            <p className="text-lg text-gray-600">
              Professional, convenient, and confidential mental health support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Experts Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Licensed Experts
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our team of experienced mental health professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experts.map((expert) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                onBookConsultation={handleBookConsultation}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            What Our Clients Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-gray-900">
                    - {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Take the first step towards better mental health today
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Your First Session
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedExpert && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          expertName={selectedExpert.name}
          expertPrice={selectedExpert.price}
        />
      )}
    </div>
  );
};

export default Expert;
