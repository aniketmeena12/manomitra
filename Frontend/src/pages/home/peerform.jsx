import React, { useState } from "react";

// Sample Threads
const sampleThreads = [
  {
    id: 1,
    title: "Feeling anxious before exams",
    mood: "😔",
    category: "Anxiety",
    author: "Anonymous",
    comments: [{ id: 1, text: "You're not alone, stay strong 💪", author: "StudentX" }],
    reactions: { like: 2, love: 1, hug: 1 },
  },
  {
    id: 2,
    title: "Best self-care routines?",
    mood: "😊",
    category: "Self-Care",
    author: "Student123",
    comments: [],
    reactions: { like: 0, love: 0, hug: 0 },
  },
];

export default function PeerForum() {
  const [threads, setThreads] = useState(sampleThreads);
  const [newPost, setNewPost] = useState("");
  const [mood, setMood] = useState("😊");
  const [anonymous, setAnonymous] = useState(true);

  const addThread = () => {
    if (!newPost.trim()) return;
    const newThread = {
      id: threads.length + 1,
      title: newPost,
      mood,
      category: "General",
      author: anonymous ? "Anonymous" : "You",
      comments: [],
      reactions: { like: 0, love: 0, hug: 0 },
    };
    setThreads([newThread, ...threads]);
    setNewPost("");
  };

  const addComment = (threadId, text) => {
    if (!text.trim()) return;
    setThreads(
      threads.map((t) =>
        t.id === threadId
          ? {
              ...t,
              comments: [
                ...t.comments,
                { id: t.comments.length + 1, text, author: "You" },
              ],
            }
          : t
      )
    );
  };

  const addReaction = (threadId, type) => {
    setThreads(
      threads.map((t) =>
        t.id === threadId
          ? {
              ...t,
              reactions: {
                ...t.reactions,
                [type]: t.reactions[type] + 1,
              },
            }
          : t
      )
    );
  };

  return (
    <div className="grid grid-cols-4 gap-6 p-6 bg-[rgba(255,255,255,0.5)]  rounded-3xl min-h-screen">
      {/* Forum Main Section */}
      <div className="col-span-3">
        

        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Peer Forum</h2>

        {/* Create Post */}
        <div className="bg-white p-4 rounded-2xl shadow mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full border p-2 rounded-md"
          />
          <div className="flex justify-between items-center mt-2">
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="border p-1 rounded-md"
            >
              <option>😊</option>
              <option>😔</option>
              <option>😤</option>
              <option>😴</option>
              <option>🤯</option>
            </select>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={() => setAnonymous(!anonymous)}
              />
              <span>Post Anonymously</span>
            </label>

            <button
              onClick={addThread}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Post
            </button>
          </div>
        </div>

        {/* Threads List */}
        {threads.map((thread) => (
          <div key={thread.id} className="bg-white p-4 rounded-2xl shadow mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-xl">{thread.mood}</span>
              <h3 className="font-semibold text-lg">{thread.title}</h3>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Category: {thread.category} | By {thread.author}
            </p>

            {/* Reactions */}
            <div className="flex space-x-3 mb-3">
              <button
                onClick={() => addReaction(thread.id, "like")}
                className="px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                👍 {thread.reactions.like}
              </button>
              <button
                onClick={() => addReaction(thread.id, "love")}
                className="px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                ❤ {thread.reactions.love}
              </button>
              <button
                onClick={() => addReaction(thread.id, "hug")}
                className="px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                🤗 {thread.reactions.hug}
              </button>
            </div>

            {/* Comments */}
            <div className="mt-2">
              <h4 className="font-semibold text-sm mb-1">Comments:</h4>
              {thread.comments.map((c) => (
                <p key={c.id} className="text-sm text-gray-700 ml-2">
                  <span className="font-medium">{c.author}:</span> {c.text}
                </p>
              ))}
              <CommentBox threadId={thread.id} addComment={addComment} />
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="col-span-1 bg-white p-4 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">Quick Help</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>📞 Helpline: 1800-123-456</li>
          <li>🧘 Guided Meditation</li>
          <li>
            📺{" "}
            <a
              href="https://youtube.com"
              className="text-indigo-600 underline"
            >
              Wellness Videos
            </a>
          </li>
          <li>💡 Tip: “This forum is peer support, not medical advice.”</li>
        </ul>
      </div>
    </div>
  );
}

// Comment box component
function CommentBox({ threadId, addComment }) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    addComment(threadId, comment);
    setComment("");
  };

  return (
    <div className="flex mt-2 space-x-2">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="flex-grow border p-1 rounded-md text-sm"
      />
      <button
        onClick={handleSubmit}
        className="bg-indigo-500 text-white px-2 py-1 rounded-md text-sm hover:bg-indigo-600"
      >
        Reply
      </button>
    </div>
  );
}