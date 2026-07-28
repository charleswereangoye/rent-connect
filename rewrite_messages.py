import re
with open('app/messages/page.tsx', 'r') as f:
    content = f.read()

# 1. Add imports
content = content.replace(
    'import { useAuth } from "@/lib/AuthContext";',
    'import { useAuth } from "@/lib/AuthContext";\nimport { createClient } from "@/lib/supabase/client";'
)

# 2. Replace state and effects
state_target = """export default function MessagesPage() {
  const { role } = useAuth();
  const [activeChatId, setActiveChatId] = useState<string>(INITIAL_CHATS[0].id);
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeChat = INITIAL_CHATS.find((c) => c.id === activeChatId) || INITIAL_CHATS[0];"""

state_replacement = """export default function MessagesPage() {
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

  const activeChat = chats.find((c) => c.id === activeChatId);"""

content = content.replace(state_target, state_replacement)

# 3. Replace sidebar chat list (lines around 90-149)
sidebar_target = """            <div className="flex-grow overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
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
            </div>"""

sidebar_replacement = """            <div className="flex-grow overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
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
            </div>"""

content = content.replace(sidebar_target, sidebar_replacement)

# 4. Replace right pane
right_pane_target = """          {/* Right Pane (Active Chat) */}
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
          </section>"""

right_pane_replacement = """          {/* Right Pane (Active Chat) */}
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
          </section>"""

content = content.replace(right_pane_target, right_pane_replacement)

with open('app/messages/page.tsx', 'w') as f:
    f.write(content)
print("Rewrite successful")
