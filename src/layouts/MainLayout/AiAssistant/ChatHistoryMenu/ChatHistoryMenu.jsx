import React, { useState, useMemo } from "react";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";

const ChatHistoryMenu = ({ 
  isOpen = false, 
  sessions = [], // Default value to prevent undefined
  onSelectChat, 
  onNewChat, 
  activeChatId, 
  onDeleteChat,
  isLoading = false 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredChat, setHoveredChat] = useState(null);

  // Safe check to ensure sessions is always an array
  const safeSessions = useMemo(() => {
    if (!sessions) return [];
    if (!Array.isArray(sessions)) {
      console.warn('Sessions prop is not an array:', sessions);
      return [];
    }
    return sessions;
  }, [sessions]);

  const filteredSessions = useMemo(() => {
    if (!searchTerm.trim()) return safeSessions;
    
    return safeSessions.filter(session => {
      if (!session) return false;
      const title = session.title || "";
      return title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [safeSessions, searchTerm]);

  const groupSessionsByDate = useMemo(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const groups = {
      today: [],
      yesterday: [],
      thisWeek: [],
      older: []
    };

    filteredSessions.forEach(session => {
      if (!session || !session.createdAt) return;
      
      try {
        const sessionDate = new Date(session.createdAt);
        
        // Check if date is valid
        if (isNaN(sessionDate.getTime())) {
          groups.older.push(session);
          return;
        }
        
        if (sessionDate.toDateString() === today.toDateString()) {
          groups.today.push(session);
        } else if (sessionDate.toDateString() === yesterday.toDateString()) {
          groups.yesterday.push(session);
        } else if (sessionDate > weekAgo) {
          groups.thisWeek.push(session);
        } else {
          groups.older.push(session);
        }
      } catch (error) {
        console.warn('Error parsing date for session:', session, error);
        groups.older.push(session);
      }
    });

    return groups;
  }, [filteredSessions]);

  if (!isOpen) return null;

  const ChatGroup = ({ title, sessions, icon, titleBn }) => {
    if (!sessions || sessions.length === 0) return null;

    return (
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span>{titleBn || title}</span>
          <span className="ml-auto bg-gray-700/50 text-xs px-2 py-1 rounded-full">
            {sessions.length}
          </span>
        </h4>
        <div className="space-y-1">
          {sessions.map((session) => {
            if (!session || !session._id) return null;
            
            return (
              <div
                key={session._id}
                className="relative group"
                onMouseEnter={() => setHoveredChat(session._id)}
                onMouseLeave={() => setHoveredChat(null)}
              >
                <button
                  onClick={() => onSelectChat && onSelectChat(session._id)}
                  disabled={isLoading}
                  className={`w-full text-left px-3 py-3 text-sm rounded-xl transition-all duration-200 flex items-center justify-between group disabled:opacity-50 disabled:cursor-not-allowed ${
                    activeChatId === session._id
                      ? "bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-300 border border-orange-500/30 shadow-lg"
                      : "text-gray-300 hover:bg-gray-700/50 hover:text-white hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      session.mode === 'moshiur' ? 'bg-orange-400' : 'bg-blue-400'
                    }`}></div>
                    <span className="truncate font-medium">
                      {session.title || "নতুন চ্যাট"}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                    {onDeleteChat && hoveredChat === session._id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('এই চ্যাটটি মুছে ফেলতে চান?')) {
                            onDeleteChat(session._id);
                          }
                        }}
                        className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors flex-shrink-0"
                        title="চ্যাট মুছুন"
                      >
                        <FaTrash size={12} />
                      </button>
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-80 bg-gradient-to-b from-gray-950/95 to-gray-900/95 backdrop-blur-xl border-r border-gray-800/50 flex flex-col h-full shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-800/50">
        <button
          onClick={onNewChat}
          disabled={isLoading}
          className="flex items-center justify-center gap-3 w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <FaPlus className="text-white" />
          নতুন চ্যাট
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-800/30">
        <div className="relative">
          <input
            type="text"
            placeholder="চ্যাট খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-300 placeholder-gray-500 outline-none focus:border-orange-500/50 focus:bg-gray-800/80 transition-all duration-200"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={14} />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="p-4 text-center">
          <div className="inline-flex items-center gap-2 text-gray-400">
            <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            লোড হচ্ছে...
          </div>
        </div>
      )}

      {/* Chat Groups */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {!isLoading && (
          <>
            <ChatGroup 
              title="Today" 
              titleBn="আজ" 
              sessions={groupSessionsByDate.today} 
              icon="📅" 
            />
            <ChatGroup 
              title="Yesterday" 
              titleBn="গতকাল" 
              sessions={groupSessionsByDate.yesterday} 
              icon="📋" 
            />
            <ChatGroup 
              title="This Week" 
              titleBn="এই সপ্তাহে" 
              sessions={groupSessionsByDate.thisWeek} 
              icon="📊" 
            />
            <ChatGroup 
              title="Older" 
              titleBn="পুরাতন" 
              sessions={groupSessionsByDate.older} 
              icon="📚" 
            />

            {filteredSessions.length === 0 && safeSessions.length > 0 && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🔍</div>
                <p className="text-sm">কোন চ্যাট পাওয়া যায়নি</p>
                <p className="text-xs mt-2">অন্য keyword দিয়ে খুঁজে দেখুন</p>
              </div>
            )}

            {safeSessions.length === 0 && !isLoading && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-6xl mb-4">💬</div>
                <p className="text-lg font-medium mb-2">কোন চ্যাট নেই</p>
                <p className="text-sm">নতুন চ্যাট শুরু করুন</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800/30">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>মোট {safeSessions.length} টি চ্যাট</span>
          {searchTerm && (
            <span>পাওয়া গেছে {filteredSessions.length} টি</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistoryMenu;