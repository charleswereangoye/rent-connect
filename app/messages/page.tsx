"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { INITIAL_CHATS } from "@/lib/data";
import { Chat } from "@/lib/types";
import { useAuth } from "@/lib/AuthContext";
import { createClient } from "@/lib/supabase/client";

export default function MessagesPage() {
  const { role, user } = useAuth();
  const [chats, setChats] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchChats() {
      if (!user) return;
      const { data } = await supabase
        .from('chats')
        .select('*, renter:renter_id(*), landlord:landlord_id(*)')
        .or(`renter_id.eq.${user.id},landlord_id.eq.${user.id}`);
      
      if (data && data.length > 0) {
        setChats(data);
        setActiveChatId(data[0].id);
      }
      setIsLoading(false);
    }
    fetchChats();
  }, [user]);

  const activeChat = chats.find((c) => c.id === activeChatId);

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      if (textareaRef.current.scrollHeight > 150) {
        textareaRef.current.style.overflowY = "auto";
      } else {
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  }, [inputText]);

  return (
    <div className="bg-[#f8f9ff] text-on-surface min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed overflow-hidden h-screen">
      {/* TopNavBar */}
      <header className="flex-none z-50 flex justify-between items-center w-full px-lg md:px-2xl py-sm max-w-max-width mx-auto bg-surface-container-lowest dark:bg-on-surface shadow-sm relative">
        <div className="flex justify-between items-center w-full md:w-auto">
          <button onClick={() => window.location.reload()} className="flex items-center gap-sm cursor-pointer hover:opacity-80 transition-opacity text-left bg-transparent border-none p-0 outline-none">
            <span
              className="material-symbols-outlined text-primary text-[32px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              domain
            </span>
            <span className="text-h3 font-h3 text-primary tracking-tight">
              Rent Connect
            </span>
          </button>
          <label htmlFor="mobile-menu" className="md:hidden flex items-center p-1 text-primary cursor-pointer">
            <span className="material-symbols-outlined text-[32px]">menu</span>
          </label>
        </div>
        <input type="checkbox" id="mobile-menu" className="peer hidden" />
        <nav className="hidden md:flex items-center gap-xl peer-checked:flex peer-checked:absolute peer-checked:top-full peer-checked:left-0 peer-checked:right-0 peer-checked:bg-surface-container-lowest peer-checked:dark:bg-on-surface peer-checked:border-t peer-checked:border-outline-variant/30 peer-checked:flex-col peer-checked:items-stretch peer-checked:p-md peer-checked:shadow-lg peer-checked:z-50">
          {role === "landlord" ? (
            <>
              <Link className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm" href="/properties">
                My Properties
              </Link>
              <Link className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm" href="/tenants">
                Tenants
              </Link>
            </>
          ) : (
            <Link className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm" href="/search">
              Search
            </Link>
          )}
          <Link
            className="font-label-md text-label-md text-primary font-bold border-b-2 border-transparent py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm"
            href="/messages"
          >
            Messages
          </Link>
          <Link
            className="font-label-md text-label-md text-on-secondary-container hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors py-xs peer-checked:py-md peer-checked:border-b peer-checked:border-outline-variant/30 peer-checked:w-full peer-checked:px-sm"
            href="/dashboard"
          >
            Profile
          </Link>
        </nav>

        
      </header>

      {/* Main Messaging Content */}
      <main className="flex-grow flex flex-col max-w-max-width w-full mx-auto md:px-lg overflow-hidden pb-4 md:pb-lg">
        <div className="flex flex-grow w-full bg-surface-container-lowest md:my-lg md:rounded-xl md:shadow-sm overflow-hidden border border-outline-variant h-full">
          
          {/* Left Pane (Chat List) */}
          <aside className={`chat-sidebar w-full md:w-[380px] flex-col border-r border-outline-variant bg-surface-bright flex-none ${activeChatId ? "hidden md:flex" : "flex"}`}>
            <div className="p-lg border-b border-outline-variant">
              <h1 className="font-h3 text-h3 text-on-surface mb-md">Messages</h1>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
                  search
                </span>
                <input
                  className="w-full pl-3xl pr-md py-sm bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary font-body-sm text-body-sm outline-none"
                  placeholder="Search conversations..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex-grow overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
              {isLoading ? (
                <div className="p-lg text-center text-on-surface-variant text-body-sm">Loading chats...</div>
              ) : chats.length === 0 ? (
                <div className="p-lg text-center text-on-surface-variant flex flex-col items-center gap-sm mt-xl">
                  <span className="material-symbols-outlined text-4xl text-outline-variant">chat_bubble</span>
                  <p className="font-body-md text-body-md">No messages yet.</p>
                  <p className="font-body-sm text-body-sm text-outline">Start a conversation from a property listing.</p>
                </div>
              ) : (
                chats.map((chat) => {
                  const isRenter = user?.id === chat.renter_id;
                  const otherPerson = isRenter ? chat.landlord : chat.renter;
                  
                  return (
                    <div
                      key={chat.id}
                      onClick={() => setActiveChatId(chat.id)}
                      className={`p-lg flex items-center gap-md border-b border-outline-variant cursor-pointer transition-colors relative ${
                        activeChatId === chat.id
                          ? "bg-surface-container"
                          : "hover:bg-surface-container-low"
                      }`}
                    >
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container-highest flex items-center justify-center">
                          {otherPerson?.avatar_url ? (
                            <img
                              className="w-full h-full object-cover"
                              src={otherPerson.avatar_url}
                              alt={otherPerson.full_name}
                            />
                          ) : (
                            <span className="material-symbols-outlined text-outline">person</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-center mb-xs">
                          <span className="font-label-md text-label-md text-on-surface truncate">
                            {otherPerson?.full_name || "Unknown User"}
                          </span>
                        </div>
                        <p className="text-body-sm truncate text-on-surface-variant">
                          {chat.status === 'active' ? "Active chat" : "Chat closed"}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </aside>

          {/* Right Pane (Active Chat) */}
          <section className={`flex-grow flex-col bg-surface-container-lowest min-w-0 h-full relative ${!activeChatId ? "hidden md:flex" : "flex"}`}>
            {!activeChat ? (
              <div className="flex-grow flex items-center justify-center text-on-surface-variant flex-col gap-md">
                <span className="material-symbols-outlined text-5xl opacity-50">forum</span>
                <p>Select a conversation to start messaging</p>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="px-lg py-md flex justify-between items-center border-b border-outline-variant flex-none">
                  <div className="flex items-center gap-md">
                    <button onClick={() => setActiveChatId(null)} className="md:hidden mr-sm flex items-center text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-surface-container-highest flex items-center justify-center">
                      {(activeChat.renter_id === user?.id && activeChat.landlord?.avatar_url) ? (
                        <img
                          className="w-full h-full object-cover"
                          src={activeChat.landlord.avatar_url}
                          alt={activeChat.landlord.full_name}
                        />
                      ) : (activeChat.landlord_id === user?.id && activeChat.renter?.avatar_url) ? (
                        <img
                          className="w-full h-full object-cover"
                          src={activeChat.renter.avatar_url}
                          alt={activeChat.renter.full_name}
                        />
                      ) : (
                        <span className="material-symbols-outlined text-outline">person</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-xs">
                        <h2 className="font-label-md text-label-md text-on-surface truncate">
                          {activeChat.renter_id === user?.id
                            ? activeChat.landlord?.full_name || "Unknown Landlord"
                            : activeChat.renter?.full_name || "Unknown Renter"}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-md text-outline">
                    <button className="hover:text-primary transition-colors flex items-center">
                      <span className="material-symbols-outlined">call</span>
                    </button>
                    <button className="hover:text-primary transition-colors flex items-center">
                      <span className="material-symbols-outlined">videocam</span>
                    </button>
                    <button className="hover:text-primary transition-colors flex items-center">
                      <span className="material-symbols-outlined">info</span>
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-grow p-lg overflow-y-auto flex flex-col gap-lg bg-surface-bright" style={{ scrollbarWidth: 'thin' }}>
                  <div className="text-center text-body-sm text-outline-variant my-md">
                    No messages yet in this conversation.
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-lg bg-surface-container-lowest border-t border-outline-variant flex-none">
                  <div className="flex items-end gap-md">
                    <div className="flex gap-xs mb-1">
                      <button className="w-10 h-10 flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container-low rounded-full transition-all">
                        <span className="material-symbols-outlined">add_circle</span>
                      </button>
                      <button className="w-10 h-10 flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container-low rounded-full transition-all">
                        <span className="material-symbols-outlined">image</span>
                      </button>
                    </div>
                    <div className="flex-grow relative">
                      <textarea
                        ref={textareaRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full px-lg py-md pr-12 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary font-body-sm text-body-sm resize-none outline-none"
                        placeholder="Type a message..."
                        rows={1}
                      ></textarea>
                      <button className="absolute right-sm bottom-2 w-8 h-8 flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container rounded-full transition-all">
                        <span className="material-symbols-outlined">mood</span>
                      </button>
                    </div>
                    <button className="mb-1 w-12 h-12 flex items-center justify-center bg-primary text-white rounded-2xl shadow-sm hover:scale-105 active:scale-95 transition-all">
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </main>


    </div>
  );
}
