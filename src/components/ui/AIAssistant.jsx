import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

const botResponses = {
  services: {
    keywords: ['service', 'offer', 'do', 'help', 'what'],
    response: "We offer a full suite of digital services: Brand Strategy, Social Media Marketing, Content Production, SEO, Paid Advertising, Website Design, and Video Production. Each is tailored to your unique goals. Want to know more about a specific service?"
  },
  pricing: {
    keywords: ['price', 'cost', 'budget', 'pricing', 'how much', 'package'],
    response: "Our projects typically start from $5,000 for focused campaigns, scaling to $50,000+ for comprehensive digital transformations. Every project is custom-scoped. I'd recommend scheduling a free strategy call to discuss your specific needs and get an accurate quote."
  },
  booking: {
    keywords: ['book', 'call', 'meeting', 'schedule', 'consult', 'appointment'],
    response: "I'd love to set that up! You can book a free 30-minute strategy call directly through our contact section below, or email us at hello@grafiqly.com. Our team typically responds within 2 hours during business hours."
  },
  portfolio: {
    keywords: ['work', 'portfolio', 'project', 'example', 'case study', 'results'],
    response: "Check out our Portfolio section to see featured projects like the NovaTech Rebrand and Pulse Fitness App. Each includes the full case study with challenge, strategy, execution, and results. Our average client sees 4.8x ROI uplift!"
  },
  timeline: {
    keywords: ['time', 'long', 'timeline', 'duration', 'deadline', 'when'],
    response: "Typical timelines vary by project scope: Brand Strategy (2-4 weeks), Website Design & Dev (6-12 weeks), Campaign Launches (2-3 weeks setup). We also offer rush delivery for time-sensitive projects. Let's discuss your timeline!"
  },
  contact: {
    keywords: ['contact', 'email', 'phone', 'reach', 'talk'],
    response: "You can reach us at hello@grafiqly.com or +91 98765 43210. We're based in Mumbai, India but work with clients globally. Scroll down to our Mission Control section to send us a message directly!"
  },
  greeting: {
    keywords: ['hi', 'hello', 'hey', 'hola', 'greetings', 'good'],
    response: "Hey there! 👋 Welcome to Grafiqly Digital Media. I'm here to help you explore our services, get pricing info, or book a strategy call. What would you like to know?"
  },
}

const defaultResponse = "That's a great question! For more detailed information, I'd suggest connecting with our team directly. You can scroll down to Mission Control or email hello@grafiqly.com. Is there anything specific about our services, pricing, or process I can help with?"

function getBotResponse(message) {
  const lower = message.toLowerCase()
  for (const category of Object.values(botResponses)) {
    if (category.keywords.some(kw => lower.includes(kw))) {
      return category.response
    }
  }
  return defaultResponse
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: "Hi! I'm Grafiqly's AI assistant. Ask me about our services, pricing, or book a strategy call. How can I help?" }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg = { id: Date.now(), role: 'user', text: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(userMsg.text)
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: response }])
      setIsTyping(false)
    }, 1000 + Math.random() * 800)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-accent/10 border border-accent/30 text-accent flex items-center justify-center shadow-neon-blue hover:bg-accent/20 hover:border-accent/50 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[480px] rounded-2xl glass-strong neon-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-display font-semibold text-white">Grafiqly AI</h3>
                <p className="text-[10px] text-accent flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'bot' ? 'bg-accent/10' : 'bg-highlight/10'
                  }`}>
                    {msg.role === 'bot' ? (
                      <Bot className="w-3 h-3 text-accent" />
                    ) : (
                      <User className="w-3 h-3 text-highlight" />
                    )}
                  </div>
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent/10 border border-accent/20 text-white'
                      : 'bg-white/5 border border-white/5 text-white/85'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-accent" />
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/5">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend() }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about our services..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-subtext focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center hover:bg-accent/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
