"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { INITIAL_CHATS } from "@/lib/data";
import { Chat } from "@/lib/types";
import { useAuth } from "@/lib/AuthContext";

export default function MessagesPage() {
  const { role } = useAuth();
  const [activeChatId, setActiveChatId] = useState<string>(INITIAL_CHATS[0].id);
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeChat = INITIAL_CHATS.find((c) => c.id === activeChatId) || INITIAL_CHATS[0];

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
              {INITIAL_CHATS.map((chat) => (
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
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container-highest">
                      <img
                        className="w-full h-full object-cover"
                        src={chat.avatarUrl}
                        alt={chat.name}
                      />
                    </div>
                    {chat.verified && (
                      <div className="absolute -top-1 -right-1 bg-primary border-2 border-surface rounded-full p-0.5 flex items-center justify-center" title="Verified User">
                        <span
                          className="material-symbols-outlined text-[12px] text-white"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center mb-xs">
                      <span className="font-label-md text-label-md text-on-surface truncate">
                        {chat.name}
                      </span>
                      <span className="text-[10px] text-outline whitespace-nowrap ml-2">
                        {chat.time}
                      </span>
                    </div>
                    <p
                      className={`text-body-sm truncate ${
                        chat.unread
                          ? "text-on-surface font-semibold"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {chat.lastMessage}
                    </p>
                    {chat.status && (
                      <span className="text-[10px] text-primary font-bold uppercase tracking-wider block mt-1">
                        {chat.status}
                      </span>
                    )}
                  </div>
                  {chat.unread && (
                    <div className="w-2 h-2 bg-primary rounded-full absolute right-lg top-1/2 -translate-y-1/2"></div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Right Pane (Active Chat) */}
          <section className="flex-grow flex flex-col bg-surface-container-lowest min-w-0 h-full relative">
            {/* Chat Header */}
            <div className="px-lg py-md flex justify-between items-center border-b border-outline-variant flex-none">
              <div className="flex items-center gap-md">
                <button className="md:hidden mr-sm flex items-center text-on-surface-variant">
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <img
                    className="w-full h-full object-cover"
                    src={activeChat.avatarUrl}
                    alt={activeChat.name}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-xs">
                    <h2 className="font-label-md text-label-md text-on-surface truncate">
                      {activeChat.name}
                    </h2>
                    {activeChat.verified && (
                      <span
                        className="material-symbols-outlined text-primary text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    )}
                  </div>
                  {activeChat.online ? (
                    <span className="text-[11px] text-primary flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                      Online
                    </span>
                  ) : (
                    <span className="text-[11px] text-outline flex items-center gap-1">
                      Offline
                    </span>
                  )}
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
              {activeChat.messages.map((message, index) => {
                const isOwnMessage = message.sender === role;
                const isOtherPerson = !isOwnMessage;
                // Show date separator before the first message if it starts with "Yesterday" or "Today"
                const showSeparator = index === 0 || (index > 0 && activeChat.messages[index-1].timestamp.split(",")[0] !== message.timestamp.split(",")[0]);

                return (
                  <React.Fragment key={message.id}>
                    {showSeparator && (
                      <div className="flex justify-center my-md">
                        <span className="bg-surface-container-low text-outline px-md py-xs rounded-full text-[10px] font-bold tracking-widest uppercase">
                          {message.timestamp.split(",")[0]}
                        </span>
                      </div>
                    )}
                    
                    {isOtherPerson ? (
                      // Other Person Message (Slate Blue Theme)
                      <div className="flex gap-md max-w-[80%]">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-auto">
                          <img
                            className="w-full h-full object-cover"
                            src={activeChat.avatarUrl}
                            alt={activeChat.name}
                          />
                        </div>
                        <div className="flex flex-col gap-xs">
                          <div className="bg-on-secondary-container text-white p-lg rounded-2xl rounded-bl-none shadow-sm">
                            <p className="text-body-sm">{message.text}</p>
                          </div>
                          
                          {message.attachment && (
                            <div className="bg-surface-container-high p-sm rounded-xl flex items-center gap-md border border-outline-variant mt-xs cursor-pointer hover:bg-surface-container transition-colors">
                              <div className="w-12 h-12 bg-on-secondary-container rounded-lg flex items-center justify-center text-white shrink-0">
                                <span className="material-symbols-outlined">
                                  {message.attachment.type === 'video' ? 'play_circle' : 'description'}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-label-sm font-bold text-on-surface truncate">
                                  {message.attachment.name}
                                </p>
                                <p className="text-[10px] text-outline">
                                  {message.attachment.size}
                                </p>
                              </div>
                            </div>
                          )}
                          
                          <span className="text-[10px] text-outline ml-xs">
                            {message.timestamp.split(",")[1]?.trim() || message.timestamp}
                          </span>
                        </div>
                      </div>
                    ) : (
                      // Own Message (Teal Theme)
                      <div className="flex flex-row-reverse gap-md max-w-[80%] ml-auto">
                        <div className="flex flex-col gap-xs items-end">
                          <div className="bg-primary text-white p-lg rounded-2xl rounded-br-none shadow-sm">
                            <p className="text-body-sm">{message.text}</p>
                          </div>
                          <div className="flex items-center gap-xs mr-xs mt-xs">
                            <span className="text-[10px] text-outline">
                              {message.timestamp.split(",")[1]?.trim() || message.timestamp}
                            </span>
                            <span
                              className="material-symbols-outlined text-[14px] text-primary"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              done_all
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
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
