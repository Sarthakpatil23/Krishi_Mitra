'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Bot, Send, User, Sparkles } from 'lucide-react';

import { askQuestion } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { users } from '@/lib/data';
import { AgriConnectLogo } from '@/components/icons';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const initialState = {
  answer: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? (
        <Sparkles className="h-5 w-5 animate-spin" />
      ) : (
        <Send className="h-5 w-5" />
      )}
    </Button>
  );
}

export default function ChatbotPage() {
  const [state, formAction] = useFormState(askQuestion, initialState);
  const [messages, setMessages] = useState<Message[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const currentUser = users[1]; // Mock user

  useEffect(() => {
    if (state.answer) {
      setMessages((prev) => [...prev, { role: 'assistant', content: state.answer as string }]);
    }
    if (state.error) {
       setMessages((prev) => [...prev, { role: 'assistant', content: state.error as string }]);
    }
  }, [state]);

  useEffect(() => {
    if(scrollAreaRef.current){
        scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [messages])

  const handleFormSubmit = (formData: FormData) => {
    const question = formData.get('question') as string;
    if (question.trim()) {
      setMessages((prev) => [...prev, { role: 'user', content: question }]);
      formAction(formData);
      formRef.current?.reset();
    }
  };

  return (
    <div className="flex justify-center items-start h-full py-4">
        <Card className="w-full max-w-3xl h-[calc(100vh-10rem)] flex flex-col">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl flex items-center justify-center gap-2">
                    <Bot /> AI Assistant
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                                {message.role === 'assistant' && (
                                    <Avatar className="w-8 h-8 border-2 border-primary">
                                        <AvatarFallback>
                                            <AgriConnectLogo className="size-5 text-primary"/>
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`rounded-lg p-3 max-w-[80%] ${
                                    message.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-card-foreground/5'
                                }`}>
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                                {message.role === 'user' && (
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <form ref={formRef} action={handleFormSubmit} className="flex w-full items-center space-x-2">
                    <Input name="question" placeholder="Ask a farming question..." autoComplete="off" />
                    <SubmitButton />
                </form>
            </CardFooter>
        </Card>
    </div>
  );
}
