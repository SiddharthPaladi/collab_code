import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiEdit3, FiCopy, FiX } from 'react-icons/fi';

const Message = ({
  message,
  sender,
  content,
  timestamp,
  createdAt,
  userEmail,
  onDelete,
  onEdit,
  isAI = false,
  aiName = 'CollabCode Agent'
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const contextMenuRef = useRef(null);
  const messageRef = useRef(null);
  const editTextareaRef = useRef(null);

  const isSender = !isAI && sender === userEmail;

  const formatTimestamp = (value, fallbackCreatedAt) => {
    if (fallbackCreatedAt) {
      const createdDate = new Date(fallbackCreatedAt);
      if (!Number.isNaN(createdDate.getTime())) {
        return createdDate.toLocaleString([], {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    }

    if (!value) return '';
    if (typeof value === 'string' && value.includes(',')) return value;

    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    return value;
  };

  // Handle outside click to close context menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current && 
        !contextMenuRef.current.contains(event.target) &&
        messageRef.current &&
        !messageRef.current.contains(event.target)
      ) {
        setShowContextMenu(false);
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowContextMenu(true);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim()) {
      onEdit(message._id, editedContent);
      setIsEditing(false);
      setShowContextMenu(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedContent(content);
    setIsEditing(false);
    setShowContextMenu(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setShowContextMenu(false);
  };

  const rawSender = isAI ? aiName : (sender || 'User');
  const displayName = isAI
    ? aiName
    : rawSender.includes('@')
      ? rawSender.split('@')[0]
      : rawSender;

  return (
    <div
      ref={messageRef}
      onContextMenu={handleContextMenu}
      className="relative mb-3 flex justify-start group"
    >
      <div className="relative w-full rounded-xl border border-cyan-900/30 bg-slate-800/80 px-4 py-3.5 shadow-md">
        <div className="mb-3 flex items-center gap-2.5">
          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-bold ${
            isAI
              ? 'border-cyan-500/50 bg-cyan-900/50 text-cyan-300'
              : 'border-slate-600/60 bg-slate-900/70 text-cyan-300'
          }`}>
            {isAI ? 'AI' : displayName.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs font-semibold tracking-wide text-cyan-300">
            {displayName}
          </span>
          {timestamp && (
            <span className="ml-auto whitespace-nowrap text-[10px] font-medium text-slate-500">
              {formatTimestamp(timestamp, createdAt)}
            </span>
          )}
        </div>

        {/* Message Content */}
        {isEditing ? (
          <div 
            className="relative"
            style={{ width: '100%', overscrollBehavior: 'contain' }}
          >
            <textarea
              ref={editTextareaRef}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={`
                w-full p-2 rounded-lg 
                ${isSender 
                  ? 'bg-slate-900/80 text-slate-100 border border-cyan-700/50' 
                  : 'bg-slate-800/70 text-slate-200 border border-slate-600/50'}
                focus:outline-none
                resize-none
                overflow-hidden
              `}
              style={{
                height: 'auto',
                minHeight: '100px',
                overflowY: 'auto',
                scrollbarWidth: 'none', // For Firefox
                msOverflowStyle: 'none', // For Internet Explorer and Edge
              }}
              rows={5}
              autoFocus
            />
            {/* Hide scrollbar for WebKit browsers */}
            <style jsx>{`
              textarea::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </div>
        ) : isAI ? (
          <div className="max-w-none text-sm leading-6 text-slate-200 prose prose-invert prose-pre:border prose-pre:border-slate-700/50 prose-pre:bg-slate-900">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="break-words text-sm leading-6 text-slate-200">{content}</p>
        )}

      </div>

      {/* Context Menu */}
      {showContextMenu && (
        <div 
          ref={contextMenuRef}
          className="
            absolute z-50 right-0 top-full 
            bg-gray-800 shadow-lg rounded-md 
            py-2 w-48 text-white
            text-xs
          "
        >
          {isSender && !isEditing && (
            <button
              onClick={() => {
                setIsEditing(true);
                setShowContextMenu(true);
              }}
              className="
                flex items-center w-full px-4 py-2 
                hover:bg-gray-700 rounded
              "
            >
              <FiEdit3 className="mr-2" /> Edit
            </button>
          )}
          
          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                className="
                  flex items-center w-full px-4 py-2 
                  hover:bg-gray-700 rounded
                "
              >
                <FiEdit3 className="mr-2" /> Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="
                  flex items-center w-full px-4 py-2 
                  hover:bg-gray-700 rounded
                "
              >
                <FiX className="mr-2" /> Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCopy}
                className="
                  flex items-center w-full px-4 py-2 
                  hover:bg-gray-700 rounded
                "
              >
                <FiCopy className="mr-2" /> Copy
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;