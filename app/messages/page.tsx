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
      <header className="flex-none z-50 flex justify-between items-center w-full px-lg md:px-2xl py-sm max-w-max-width mx-auto bg-surface-container-lowest dark:bg-on-surface shadow-sm">
        <div className="flex items-center gap-md">
          <Link href="/" className="text-h3 font-h3 text-primary dark:text-primary-fixed tracking-tight">
            Rent Connect
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-xl">
          <Link
            className="text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary transition-colors font-label-md text-label-md py-xs px-sm rounded-lg"
            href="/search"
          >
            Search
          </Link>
          <Link
            className="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary py-xs font-label-md text-label-md px-sm"
            href="/messages"
          >
            Messages
          </Link>
          <Link
            className="text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary transition-colors font-label-md text-label-md py-xs px-sm rounded-lg"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-md">
          {role === "landlord" && (
            <button className="bg-primary-container text-on-primary-container px-lg py-sm rounded-xl font-label-md text-label-md hover:bg-primary transition-colors hover:text-white shadow-sm">
              Post a Listing
            </button>
          )}
        </div>
        <button className="md:hidden text-primary flex items-center justify-center p-xs">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      {/* Main Messaging Content */}
      <main className="flex-grow flex flex-col max-w-max-width w-full mx-auto md:px-lg overflow-hidden pb-4 md:pb-lg">
        <div className="flex flex-grow w-full bg-surface-container-lowest md:my-lg md:rounded-xl md:shadow-sm overflow-hidden border border-outline-variant h-full">
          
          {/* Left Pane (Chat List) */}
          <aside className="chat-sidebar w-full md:w-[380px] flex flex-col border-r border-outline-variant bg-surface-bright flex-none">
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
          <section className="flex-grow flex flex-col bg-surface-container-lowest min-w-0 h-full relative">
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
                    <button className="md:hidden mr-sm flex items-center text-on-surface-variant">
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

      {/* Footer (Simplified for full screen apps usually, but keeping from design) */}
      <footer className="flex-none w-full py-md px-lg md:px-2xl flex flex-col md:flex-row justify-between items-center gap-md max-w-max-width mx-auto bg-surface-container-low dark:bg-on-secondary-fixed border-t border-outline-variant">
        <div className="flex flex-col items-center md:items-start gap-xs">
          <span className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant text-center md:text-left">
            © 2026 Rent Connect Kigali. Premier Housing Marketplace.
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-md">
          <Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">About Us</Link>
          <Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Terms</Link>
          <Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Privacy</Link>
          <Link className="text-on-surface-variant dark:text-outline-variant hover:text-primary transition-colors font-label-sm text-label-sm" href="#">Help</Link>
        </div>
      </footer>
    </div>
  );
}
