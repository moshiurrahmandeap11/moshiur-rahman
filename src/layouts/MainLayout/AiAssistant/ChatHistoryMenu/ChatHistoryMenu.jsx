import React from "react";
import { FaPlus } from "react-icons/fa";

const ChatHistoryMenu = ({ isOpen, sessions, onSelectChat, onNewChat, activeChatId }) => {
  if (!isOpen) return null;

  return (
    <div className="w-64 bg-gray-950/70 p-4 flex flex-col border-r border-gray-800 transition-all duration-300">
      <button
        onClick={onNewChat}
        className="flex items-center justify-center gap-2 w-full px-4 py-2 mb-4 text-sm font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
      >
        <FaPlus />
        New Chat
      </button>
      <div className="flex-1 overflow-y-auto space-y-2">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">History</h3>
        {sessions.map((session) => (
          <button
            key={session._id}
            onClick={() => onSelectChat(session._id)}
            className={`w-full text-left px-3 py-2 text-sm rounded-md truncate ${
              activeChatId === session._id
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            {session.title || "Untitled Chat"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatHistoryMenu;