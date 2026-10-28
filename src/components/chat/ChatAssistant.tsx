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

const knowledgeBase = {
  skills: {
    programming: ['C#', 'C++', 'Java', 'Python', 'JavaScript', 'SQL'],
    web: ['.NET', 'J2EE', 'Node.js', 'Express.js', 'React.js', 'Vue.js', 'Flask'],
    databases: ['MySQL', 'SQL Server', 'MongoDB', 'Firebase'],
    ml: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Data Analysis', 'Data Preprocessing', 'Model Training', 'Model Evaluation'],
    tools: ['Docker', 'Jenkins', 'GitHub Actions', 'CI/CD Pipelines', 'AWS (EC2, IAM, S3)', 'GitHub', 'VS Code', 'Android Studio', 'Power BI', 'Postman'],
  },

  experience: 'Software Developer Trainee at Modi Innovations Pvt Ltd for 2 months. Worked with MongoDB, Express.js, React.js, and Node.js; developed responsive interfaces, integrated REST APIs, and implemented CRUD operations.',
  certifications: [
    'AWS Certified Cloud Practitioner',
    'NPTEL: Introduction to Large Language Models (LLMs)',
    'CCNA: Introduction to Networks; Switching, Routing, and Wireless Essentials',
    'MERN Stack Application Development',
  ],
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
• Tech Stack: MongoDB, Express.js, Vue.js, Node.js, Gemini API.
• Highlights: JWT authentication, REST APIs, interactive dashboards, and an AI-powered health coach.`,
      tech: ['MongoDB', 'Express.js', 'Vue.js', 'Node.js', 'Gemini API']
    },
    { 
      name: 'Crop Recommendation System', 
      desc: `A machine learning-based system that helps farmers choose the most suitable crops.

• Features: Predicts crops based on soil and environmental conditions.
• Tech Stack: Python, Flask, Machine Learning.
• Highlights: Compared multiple models and deployed the best-performing crop prediction model.`,
      tech: ['Python', 'Flask', 'Machine Learning']
    },
  ],

  education: {
    degree: 'B.Tech Computer Engineering, MIT Academy of Engineering, Pune (2023–2026), graduated with 8.83 CGPA',
    diploma: 'Diploma in Computer Engineering',
  },
};

const suggestedQuestions = [
  "What are Ravindra's top skills?",
  "Tell me about his projects",
  "What is his education?",
  "Is he open to full-time roles?",
  "Best project for a software developer role?",
];

function generateResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('full-time') || q.includes('full time') || q.includes('job') || q.includes('opportunit')) {
    return `Ravindra has completed his B.Tech in Computer Engineering with an 8.83 CGPA and is seeking full-time software development opportunities.\n\n${knowledgeBase.experience}`;
  }

  if (q.includes('internship') || q.includes('experience')) {
    return `💼 Experience:\n\n${knowledgeBase.experience}`;
  }

  if (q.includes('certification') || q.includes('certificate')) {
    return `📜 Certifications:\n\n• ${knowledgeBase.certifications.join('\n• ')}`;
  }
  
  if (q.includes('skill') || q.includes('technology')) {
    return `Ravindra has expertise in:

• Programming: ${knowledgeBase.skills.programming.join(', ')}
• Web: ${knowledgeBase.skills.web.join(', ')}
• Databases: ${knowledgeBase.skills.databases.join(', ')}
• Machine Learning: ${knowledgeBase.skills.ml.join(', ')}

Strong in full-stack development, backend systems, and machine learning.`;
  }
  
  if (q.includes('project')) {
    return knowledgeBase.projects.map(p => 
      `🚀 ${p.name}

${p.desc}`
    ).join('\n\n-----------------------------\n\n');
  }
  
  if (q.includes('education')) {
    return `🎓 Education:

• ${knowledgeBase.education.degree}
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
• Experience and certifications

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