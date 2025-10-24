import React, { useState, useRef } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose, MdMic, MdStop } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNotes = ({
  noteData,
  type,
  getAllNotes,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || "");
  const [error, setError] = useState(null);

  // 🎙️ Voice Recognition States
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // ✅ Start Speech Recognition
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser 😞");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      // Append the spoken text to existing content
      setContent((prev) => (prev ? prev + " " + transcript : transcript));
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  // ✅ Stop Listening
  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  // Add note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // Edit note
  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-[#fff7e6] via-[#fefaf3] to-[#fffefc] p-6 rounded-xl shadow-lg transition-all duration-300">
      {/* Close button */}
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute top-3 right-3 hover:bg-[#fef3c7] transition-colors"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-500 hover:text-slate-700" />
      </button>

      {/* Title input */}
      <div className="flex flex-col gap-2 mt-2">
        <label className="text-sm font-semibold text-slate-700 tracking-wide">
          TITLE
        </label>
        <input
          type="text"
          className="text-2xl font-medium text-slate-900 outline-none bg-white/70 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-300"
          placeholder="Go to Gym at 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* Content area */}
      <div className="flex flex-col gap-2 mt-5">
        <label className="text-sm font-semibold text-slate-700 tracking-wide flex items-center justify-between">
          <span>CONTENT</span>
          {/* 🎤 Voice Button */}
          <button
            onClick={isListening ? stopListening : startListening}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-white text-xs font-medium ${
              isListening ? "bg-red-500" : "bg-green-500"
            } transition-all`}
          >
            {isListening ? <MdStop /> : <MdMic />}
            {isListening ? "Stop" : "Voice Note"}
          </button>
        </label>

        <textarea
          type="text"
          className="text-sm text-slate-800 outline-none bg-white/70 border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-200"
          placeholder="Write your note here or use voice input..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {/* Tags input */}
      <div className="mt-4">
        <label className="text-sm font-semibold text-slate-700 tracking-wide">
          TAGS
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      {/* Add/Update button */}
      <button
        className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold mt-6 py-3 rounded-lg shadow-md hover:opacity-90 transition-all"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
