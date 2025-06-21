
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';

const questions = [
  {
    id: 1,
    question: "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" }
    ]
  },
  {
    id: 2,
    question: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" }
    ]
  },
  {
    id: 3,
    question: "Over the last 2 weeks, how often have you been bothered by trouble falling or staying asleep, or sleeping too much?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" }
    ]
  },
  {
    id: 4,
    question: "Over the last 2 weeks, how often have you been bothered by feeling tired or having little energy?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" }
    ]
  },
  {
    id: 5,
    question: "Over the last 2 weeks, how often have you been bothered by poor appetite or overeating?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" }
    ]
  },
  {
    id: 6,
    question: "Over the last 2 weeks, how often have you been bothered by feeling bad about yourself or that you are a failure?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" }
    ]
  },
  {
    id: 7,
    question: "Over the last 2 weeks, how often have you been bothered by trouble concentrating on things?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" }
    ]
  }
];

const FormQuestionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + parseInt(value), 0);
  };

  const getRecommendation = (score: number) => {
    if (score <= 4) return { level: "Minimal", color: "text-green-600", message: "Your responses suggest minimal symptoms of depression." };
    if (score <= 9) return { level: "Mild", color: "text-yellow-600", message: "Your responses suggest mild symptoms of depression." };
    if (score <= 14) return { level: "Moderate", color: "text-orange-600", message: "Your responses suggest moderate symptoms of depression." };
    if (score <= 19) return { level: "Moderately Severe", color: "text-red-600", message: "Your responses suggest moderately severe symptoms of depression." };
    return { level: "Severe", color: "text-red-700", message: "Your responses suggest severe symptoms of depression." };
  };

  if (isCompleted) {
    const score = getScore();
    const recommendation = getRecommendation(score);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">Assessment Complete</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">{score}/21</div>
                <div className={`text-lg font-semibold ${recommendation.color} mb-4`}>
                  {recommendation.level} Depression Level
                </div>
                <p className="text-gray-600 mb-6">{recommendation.message}</p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Next Steps:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Consider speaking with a mental health professional</li>
                  <li>• Explore our AI Assistant for immediate support</li>
                  <li>• Schedule a 1:1 session with one of our experts</li>
                  <li>• Remember: This assessment is for informational purposes only</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => window.location.href = '/ai-assistant'} 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                >
                  Talk to AI Assistant
                </Button>
                <Button 
                  onClick={() => window.location.href = '/expert'} 
                  variant="outline"
                  className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                >
                  Book Expert Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Mental Health Assessment</h1>
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-6 leading-relaxed">
              {questions[currentQuestion].question}
            </h2>

            <RadioGroup
              value={answers[questions[currentQuestion].id] || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer text-gray-700">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <Button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <Button
                onClick={nextQuestion}
                disabled={!answers[questions[currentQuestion].id]}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                <span>{currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormQuestionnaire;
