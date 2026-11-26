import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbX } from "react-icons/tb";

const UserSelectionModal = ({ isOpen, onClose, users, selectedUsers, setSelectedUsers, projectMembers = [] }) => {
  if (!isOpen) return null;

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        <motion.div
          className="bg-[#0A1E2E] text-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }}
          exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.5 } }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
          >
            <TbX size={24} />
          </button>

          <h2 className="mb-1 text-center text-xl font-semibold">Project Members</h2>
          <p className="mb-4 text-center text-xs text-slate-400">View existing members or add someone to the project</p>

          {projectMembers.length > 0 && (
            <div className="mb-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Existing members</p>
              <div className="flex flex-wrap gap-2">
                {projectMembers.map((member) => (
                  <div key={member._id} className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/70 py-1.5 pl-1.5 pr-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-slate-950">
                      {(member.firstname || member.email || 'U').charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-28 truncate text-xs font-medium text-slate-200">{member.firstname || member.email}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Add members</p>
          <div className="max-h-64 overflow-y-auto pr-2" style={{ scrollbarWidth: "none" }}>
            {users.length === 0 ? (
              <div className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-4 text-center text-sm text-slate-500">Everyone is already in this project</div>
            ) : users.map((user) => (
              <div
                key={user._id}
                className={`flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer transition ${
                  selectedUsers.includes(user._id)
                    ? "bg-[#0E3A5A] text-[#00BEDE] shadow-md"
                    : "bg-[#112233] hover:bg-[#0D2A46]"
                }`}
                onClick={() => toggleUserSelection(user._id)}
              >
                <div>
                  <p className="font-medium">{user.firstname}</p>
                  <p className="text-sm text-gray-300 mt-1 w-[250px] truncate">{user.email}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  readOnly
                  className="w-5 h-5 accent-[#00BEDE]"
                />
              </div>
            ))}
          </div>

          <motion.button
            onClick={onClose}
            className="w-full mt-4 py-3 text-lg font-semibold text-white rounded-lg relative overflow-hidden bg-[#0088A8] shadow-lg"
            animate={{
              boxShadow: [
                "0px 0px 8px 2px rgba(0,190,222,0.6)",
                "0px 0px 12px 3px rgba(0,190,222,0.6)",
                "0px 0px 8px 2px rgba(0,190,222,0.6)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Done
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserSelectionModal;
