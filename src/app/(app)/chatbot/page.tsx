'use client';

import { useEffect, useRef, useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Bot, Send, User, Sparkles, Paperclip, X } from 'lucide-react';
import Image from 'next/image';

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
  image?: string;
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
  const [state, formAction] = useActionState(askQuestion, initialState);
  const [messages, setMessages] = useState<Message[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const currentUser = users[1]; // Mock user

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatHistory');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
    }
  }, [messages]);

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (formData: FormData) => {
    const question = formData.get('question') as string;
    if (!question.trim() && !imagePreview) return;

    const userMessage: Message = { role: 'user', content: question };
    if (imagePreview) {
      userMessage.image = imagePreview;
      formData.set('imageDataUri', imagePreview);
    }

    setMessages((prev) => [...prev, userMessage]);
    formAction(formData);
    formRef.current?.reset();
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = '';
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
                                  {message.image && (
                                      <Image src={message.image} alt="User upload" width={300} height={200} className="rounded-md mb-2" />
                                  )}
                                  {message.content && <p className="text-sm whitespace-pre-wrap">{message.content}</p>}
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
                <form ref={formRef} action={handleFormSubmit} className="flex w-full items-start space-x-2">
                    <div className="flex-1">
                      {imagePreview && (
                        <div className="relative mb-2 w-fit">
                          <Image src={imagePreview} alt="Image preview" width={80} height={80} className="rounded-md" />
                           <Button
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={() => {
                                setImagePreview(null);
                                if(fileInput.current) fileInput.current.value = '';
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                        </div>
                      )}
                      <div className="relative flex items-center">
                        <Input name="question" placeholder="Ask a farming question..." autoComplete="off" />
                         <input name="imageDataUri" type="hidden" value={imagePreview || ''} />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-10"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Paperclip className="h-5 w-5" />
                        </Button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          className="hidden"
                          accept="image/*"
                        />
                         <SubmitButton />
                      </div>
                    </div>
                </form>
            </CardFooter>
        </Card>
    </div>
  );
}
