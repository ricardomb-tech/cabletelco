'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
};

export function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: '¡Hola! Soy Caby, tu asistente virtual de CableTelco. 🤖 ¿En qué te puedo ayudar hoy?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Gracias por escribir. En este momento estoy aprendiendo, pero pronto podré ayudarte con tu solicitud. Por favor, utiliza nuestra página de Contacto o PQR para atención inmediata.',
        },
      ]);
    }, 1500);
  };

  const handleQuickAction = (actionText: string) => {
    setInputValue(actionText);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Botón flotante */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 shadow-xl shadow-orange-500/40 flex items-center justify-center text-white focus:outline-none focus:ring-4 focus:ring-orange-500/30 transition-all group"
            aria-label="Abrir asistente virtual"
          >
            <ChatBubbleLeftRightIcon className="w-8 h-8 group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Ventana de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-[calc(100vw-48px)] md:w-[400px] h-[550px] max-h-[calc(100vh-100px)] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header del Chat */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 md:p-5 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Asistente Caby</h3>
                  <div className="flex items-center gap-1.5 text-orange-100 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    En línea
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none"
                aria-label="Cerrar chat"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Área de Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 bg-slate-50 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.sender === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2.5 rounded-2xl shadow-sm text-sm md:text-base",
                      msg.sender === 'user'
                        ? "bg-orange-500 text-white rounded-tr-sm"
                        : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {new Date(parseInt(msg.id)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Ahora'}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="mr-auto max-w-[85%]">
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-slate-200 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions (solo si no hay muchos mensajes) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 bg-slate-50 flex gap-2 overflow-x-auto shrink-0 scrollbar-hide">
                <button onClick={() => handleQuickAction('Quiero pagar mi factura')} className="shrink-0 text-xs font-medium px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors border border-orange-200">
                  Pagar factura
                </button>
                <button onClick={() => handleQuickAction('Tengo un problema técnico')} className="shrink-0 text-xs font-medium px-3 py-1.5 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition-colors border border-slate-300">
                  Soporte técnico
                </button>
                <button onClick={() => handleQuickAction('¿Tienen cobertura aquí?')} className="shrink-0 text-xs font-medium px-3 py-1.5 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition-colors border border-slate-300">
                  Consultar cobertura
                </button>
              </div>
            )}

            {/* Área de Input */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              <form
                onSubmit={handleSend}
                className="flex items-center gap-2 bg-slate-100 rounded-full p-1 border border-slate-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-transparent border-none focus:outline-none px-4 text-sm text-slate-700 placeholder-slate-400"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:bg-slate-300 transition-colors"
                >
                  <PaperAirplaneIcon className="w-5 h-5 -ml-0.5" />
                </button>
              </form>
              <div className="text-center mt-2">
                 <span className="text-[10px] text-slate-400">Protegido por CableTelco Security</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
