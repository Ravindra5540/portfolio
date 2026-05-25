import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// UPDATED DATA (DETAILED + FORMATTED)
const knowledgeBase = {
  skills: {
    programming: ['Java', 'JavaScript', 'Python', 'C++'],
    web: ['React.js', 'Node.js', 'Express.js', 'HTML5', 'CSS3'],
    databases: ['MongoDB', 'MySQL'],
    ml: ['Machine Learning', 'Scikit-learn', 'Pandas'],
    tools: ['Git', 'GitHub', 'Linux', 'Postman'],
  },

  projects: [
    { 
      name: 'MediConnect', 
      desc: `MediConnect is a web-based healthcare platform designed to manage doctor-patient interactions efficiently.

• Features: Appointment booking, online consultation, and medical record management.
• Tech Stack: Java, JSP, Servlets, JDBC, MySQL, Apache Tomcat.
• Highlights: Strong backend logic with database integration and secure data handling.`,
      tech: ['Java', 'JSP', 'Servlets', 'MySQL'] 
    },
    { 
      name: 'LifeFit', 
      desc: `LifeFit is a full-stack health and fitness platform that helps users track wellness habits in one place.

• Features: Workout, meal, water, and sleep tracking, progress insights, achievement system, and health coach chatbot.
• Tech Stack: MongoDB, Express.js, Vue.js, Node.js, Firebase.
• Highlights: Personalized health dashboard with secure authentication and responsive UI.`,
      tech: ['MongoDB', 'Express.js', 'Vue.js', 'Node.js', 'Firebase'] 
    },
    { 
      name: 'Crop Recommendation System', 
      desc: `A machine learning-based system that helps farmers choose the most suitable crops.

• Features: Predicts crops based on soil and environmental conditions.
• Tech Stack: Python, Scikit-learn, Pandas, Random Forest.
• Highlights: Uses ML model for accurate prediction and data-driven insights.`,
      tech: ['Python', 'Scikit-learn', 'Pandas'] 
    },
  ],

  education: {
    current: 'B.Tech Computer Engineering (Pursuing)',
    diploma: 'Diploma in Computer Engineering',
  },
};

const suggestedQuestions = [
  "What are Ravindra's top skills?",
  "Tell me about his projects",
  "What is his education?",
  "Best project for a software developer role?",
];

// RESPONSE LOGIC (IMPROVED FORMATTING)
function generateResponse(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes('skill') || q.includes('technology')) {
    return `Ravindra has expertise in:

• Programming: ${knowledgeBase.skills.programming.join(', ')}
• Web: ${knowledgeBase.skills.web.join(', ')}
• Databases: ${knowledgeBase.skills.databases.join(', ')}
• Machine Learning: ${knowledgeBase.skills.ml.join(', ')}

Strong in Java, MERN stack, and backend development.`;
  }
  
  if (q.includes('project')) {
    return knowledgeBase.projects.map(p => 
      `🚀 ${p.name}

${p.desc}`
    ).join('\n\n-----------------------------\n\n');
  }
  
  if (q.includes('education')) {
    return `🎓 Education:

• ${knowledgeBase.education.current}
• ${knowledgeBase.education.diploma}`;
  }
  
  if (q.includes('best')) {
    return `🔥 Best Projects for Software Developer Role:

• MediConnect → Backend + Database (Java)
• LifeFit → Full-stack health platform with dashboard and chatbot
• Crop Recommendation System → Machine Learning

These projects demonstrate full-stack + backend + AI capabilities.`;
  }

  return `You can ask about:

• Skills
• Projects
• Education

Try: "Tell me about his projects"`;
}

export const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! 👋 I'm Ravindra's AI assistant. Ask me anything about skills, projects, or education!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 800));

    const response = generateResponse(text);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
    };

    setIsTyping(false);
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed bottom-24 right-6 z-50 w-[360px] h-[500px] bg-background border rounded-2xl shadow-xl flex flex-col">

            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-sm font-semibold">AI Assistant</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-3 rounded-xl text-sm max-w-[80%] whitespace-pre-line ${
                    message.role === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-secondary'
                  }`}>
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="text-sm text-muted-foreground">Typing...</div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggestedQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(q)}
                  className="text-xs px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};