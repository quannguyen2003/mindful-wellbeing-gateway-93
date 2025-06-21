
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, Shield, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Support",
      description: "Get instant, personalized mental health guidance from our advanced AI assistant available 24/7."
    },
    {
      icon: Heart,
      title: "Comprehensive Assessment",
      description: "Take our scientifically-backed questionnaire to understand your mental health status and get tailored recommendations."
    },
    {
      icon: Users,
      title: "Expert Consultation",
      description: "Connect with licensed mental health professionals for personalized one-on-one therapy sessions."
    },
    {
      icon: Shield,
      title: "Safe & Confidential",
      description: "Your privacy is our priority. All conversations and data are encrypted and completely confidential."
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "The AI assistant helped me through my anxiety in real-time. It's like having a therapist available whenever I need support.",
      rating: 5
    },
    {
      name: "James L.",
      text: "The assessment questionnaire gave me insights I never had before. It helped me understand my mental health better.",
      rating: 5
    },
    {
      name: "Maria R.",
      text: "Connecting with an expert through this platform was seamless. The 1:1 sessions have been life-changing.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Mental Health
              <span className="block bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Journey Starts Here
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take control of your mental wellbeing with our comprehensive platform. Get AI-powered support, 
              professional assessments, and connect with licensed experts - all in one safe space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/questionnaire">
                <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-lg px-8 py-3 h-auto">
                  Start Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/ai-assistant">
                <Button variant="outline" className="text-lg px-8 py-3 h-auto border-blue-200 text-blue-600 hover:bg-blue-50">
                  Try AI Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with human expertise to provide comprehensive mental health support.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-teal-600 text-white overflow-hidden">
            <CardContent className="p-12 relative">
              <h2 className="text-4xl font-bold mb-4">Ready to Begin Your Journey?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands who have taken the first step towards better mental health. 
                Start with our quick assessment or chat with our AI assistant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/questionnaire">
                  <Button className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-3 h-auto font-semibold">
                    Take Assessment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/expert">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-3 h-auto">
                    Book Expert Session
                  </Button>
                </Link>
              </div>
              
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from people who found support through our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <divClassName="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">{testimonial.name}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold">MindWell</span>
          </div>
          <div className="text-center text-gray-400">
            <p className="mb-4">Your mental health matters. We're here to support you every step of the way.</p>
            <p className="text-sm">© 2024 MindWell. All rights reserved. This platform is for informational purposes and does not replace professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
