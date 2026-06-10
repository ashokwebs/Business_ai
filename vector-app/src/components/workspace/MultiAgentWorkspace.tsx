'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MultiAgentWorkspace() {
  const [idea, setIdea] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string, agent?: string}[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const initWorkspace = async () => {
      try {
        const res = await fetch('/api/conversations');
        if (!res.ok) return;
        const data = await res.json();
        const list = data.conversations || [];
        
        const savedConvId = typeof window !== 'undefined' ? localStorage.getItem('active_conversation_id') : null;
        const targetConvId = savedConvId && list.some((c: any) => c.conversation_id === savedConvId)
          ? savedConvId
          : (list.length > 0 ? list[0].conversation_id : null);

        if (targetConvId) {
          const convRes = await fetch(`/api/conversations/${targetConvId}`);
          if (convRes.ok) {
            const convData = await convRes.json();
            if (convData.messages && convData.messages.length > 0) {
              const mapped = convData.messages.map((m: any) => ({
                role: m.role,
                content: m.content || "",
                agent: m.role === 'assistant' ? 'Prism' : undefined
              }));
              setMessages(mapped);
              setConversationId(targetConvId);
              localStorage.setItem('active_conversation_id', targetConvId);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load workspace conversation", err);
      }
    };
    initWorkspace();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || isProcessing) return;

    const userMsg = idea.trim();
    setIdea('');
    setIsProcessing(true);
    
    setMessages(prev => [
      ...prev,
      { role: "user", content: userMsg },
      { role: "assistant", agent: "Prism", content: "" }
    ]);

    try {
      const res = await fetch('/api/orchestrator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          idea: userMsg, 
          projectName: "Dashboard Workspace",
          conversation_id: conversationId
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      if (!res.body) {
        throw new Error("No response body received.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let currentResponse = "";
      let sseBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        sseBuffer += decoder.decode(value, { stream: true });
        const lines = sseBuffer.split('\n');
        sseBuffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;
          
          const dataStr = trimmed.slice(6);
          if (!dataStr) continue;

          try {
            const payload = JSON.parse(dataStr);
            
            if (payload.event === 'content') {
              currentResponse += payload.data;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  ...newMessages[newMessages.length - 1],
                  content: currentResponse,
                };
                return newMessages;
              });
            } else if (payload.event === 'meta') {
              if (payload.conversation_id) {
                setConversationId(payload.conversation_id);
                localStorage.setItem('active_conversation_id', payload.conversation_id);
              }
            }
          } catch {
            // Ignore malformed JSON chunks
          }
        }
      }

      if (!currentResponse) {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            content: "Request processed. Please try with more detail for a richer response.",
          };
          return newMessages;
        });
      }

    } catch (err: any) {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          ...newMessages[newMessages.length - 1],
          content: `⚠️ Connection error: ${err?.message || "Unknown error"}. Ensure the Python backend is running on port 8000.`,
        };
        return newMessages;
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="glass-panel rounded-xl flex-1 flex flex-col h-[600px] overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container">
        <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
          <Bot className="w-4 h-4 text-emerald-500" />
          Strategic Discussion
        </h3>
        <div className="flex items-center gap-2">
          {isProcessing && <Loader2 className="w-3.5 h-3.5 text-emerald-500 animate-spin" />}
          <span className="text-xs font-medium px-2 py-1 rounded bg-surface-container-highest border border-outline-variant text-on-surface-variant">
            {conversationId ? 'Active Thread' : 'New Thread'}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface-container-low">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-on-surface-variant">
            <Bot className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm font-medium">Workspace is empty</p>
            <p className="text-xs text-on-surface-variant/70 mt-1">Enter an idea to begin strategic analysis.</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center gap-2 px-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${msg.role === 'user' ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                  {msg.role === 'user' ? 'You' : msg.agent || 'Prism'}
                </span>
              </div>
              <div className={`p-3 rounded-lg text-sm border max-w-[90%] ${
                msg.role === 'user' 
                  ? 'bg-on-surface text-surface-container-lowest border-transparent rounded-tr-sm' 
                  : 'bg-surface-container border-outline-variant text-on-surface rounded-tl-sm'
              }`}>
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <div className="markdown-content [&>p]:mb-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>h2]:text-sm [&>h2]:font-bold [&>h2]:mb-1 [&>h3]:text-sm [&>h3]:font-semibold [&>pre]:bg-surface-container-highest [&>pre]:p-2 [&>pre]:rounded [&>pre]:text-xs [&>pre]:overflow-x-auto [&>code]:bg-surface-container-highest [&>code]:px-1 [&>code]:rounded [&>code]:text-xs">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content || "…"}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {isProcessing && !messages[messages.length - 1]?.content && (
          <div className="flex items-center gap-2 text-on-surface-variant text-sm p-3">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
            <span className="text-xs">Orchestrating agents...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-surface-container border-t border-outline-variant">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input 
            type="text" 
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            disabled={isProcessing}
            className="w-full bg-surface-container-highest border border-outline-variant rounded-lg py-2.5 pl-4 pr-12 text-sm text-on-surface focus:outline-none focus:border-outline transition-colors disabled:opacity-50" 
            placeholder="Type your startup idea to trigger the AI team..." 
          />
          <button 
            type="submit"
            disabled={isProcessing || !idea.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-on-surface text-surface-container-lowest rounded-md hover:bg-on-surface/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
