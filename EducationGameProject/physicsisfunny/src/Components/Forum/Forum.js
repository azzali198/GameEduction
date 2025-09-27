import React, { useState } from 'react';
import './Forum.css';

const topics = [
  'Quantum Mechanics',
  'Thermodynamics',
  'Electromagnetism',
  'Optics',
  'Classical Mechanics',
  'Other'
];

const Forum = () => {
  const [subject, setSubject] = useState(topics[0]);
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      subject: 'Quantum Mechanics',
      content: 'Can someone explain the double-slit experiment?',
      author: 'Alice',
      date: '2025-09-27',
      replies: []
    },
    {
      id: 2,
      subject: 'Thermodynamics',
      content: 'What is entropy in simple terms?',
      author: 'Bob',
      date: '2025-09-26',
      replies: []
    },
    {
      id: 3,
      subject: 'Optics',
      content: 'How does a prism split light?',
      author: 'Carol',
      date: '2025-09-25',
      replies: []
    }
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const postsPerPage = 2;

  // Filter posts by topic
  const filteredPosts = selectedTopic === 'All'
    ? posts
    : posts.filter(post => post.subject === selectedTopic);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject && content) {
      setPosts([
        {
          id: posts.length + 1,
          subject,
          content,
          author: 'You',
          date: new Date().toISOString().slice(0, 10),
          replies: []
        },
        ...posts
      ]);
      setContent('');
      setSubject(topics[0]);
      setCurrentPage(1);
      setSelectedTopic('All');
    }
  };

  const handleReply = (post) => {
    setReplyingTo(post.id);
    setReplyContent('');
  };

  const handleReplySubmit = (e, postId) => {
    e.preventDefault();
    if (replyContent.trim()) {
      setPosts(posts =>
        posts.map(post =>
          post.id === postId
            ? {
                ...post,
                replies: [
                  ...post.replies,
                  {
                    author: 'You',
                    content: replyContent,
                    date: new Date().toISOString().slice(0, 10)
                  }
                ]
              }
            : post
        )
      );
      setReplyingTo(null);
      setReplyContent('');
    }
  };

  return (
    <div className="forum-container">
      <div className="mb-4">
        <label className="font-semibold mr-2">Filter by Topic:</label>
        <select
          value={selectedTopic}
          onChange={e => {
            setSelectedTopic(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded p-2"
        >
          <option value="All">All</option>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Publications</h3>
        {paginatedPosts.length === 0 ? (
          <p>No publications yet.</p>
        ) : (
          <ul className="space-y-4">
            {paginatedPosts.map(post => (
              <li key={post.id} className="bg-white p-4 rounded shadow flex items-start gap-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}`}
                  alt={post.author}
                  className="w-10 h-10 rounded-full border"
                />
                <div style={{ flex: 1 }}>
                  <div className="font-bold text-blue-700">{post.subject}</div>
                  <div className="mt-1">{post.content}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    By {post.author} on {post.date}
                  </div>
                  <div className="mt-2">
                    <button
                      className="text-blue-600 hover:underline text-sm"
                      onClick={() => handleReply(post)}
                    >
                      Reply
                    </button>
                  </div>
                  {/* Replies with indentation */}
                  {post.replies && post.replies.length > 0 && (
                    <ul className="mt-4 space-y-2 pl-8">
                      {post.replies.map((reply, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-gray-50 rounded p-2">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(reply.author)}`}
                            alt={reply.author}
                            className="w-8 h-8 rounded-full border"
                          />
                          <div>
                            <div className="text-sm">{reply.content}</div>
                            <div className="text-xs text-gray-500">
                              By {reply.author} on {reply.date}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* Reply form */}
                  {replyingTo === post.id && (
                    <form
                      onSubmit={e => handleReplySubmit(e, post.id)}
                      className="mt-4 bg-gray-100 p-2 rounded"
                    >
                      <textarea
                        className="w-full border rounded p-2 mb-2"
                        placeholder="Write your reply..."
                        value={replyContent}
                        onChange={e => setReplyContent(e.target.value)}
                        rows={2}
                        required
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                        >
                          Send Reply
                        </button>
                        <button
                          type="button"
                          className="bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-400 text-sm"
                          onClick={() => setReplyingTo(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
      {/* Move publication form to the bottom */}
      <form onSubmit={handleSubmit} className="mt-8 mb-6 bg-gray-50 p-4 rounded shadow">
        <div className="mb-3">
          <label className="block font-semibold mb-1">Subject / Topic</label>
          <select
            className="w-full border rounded p-2"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
          >
            {topics.map(topic => (
              <option key={topic} value={topic}>{topic}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="block font-semibold mb-1">Your Question or Publication</label>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Write your question or publication here..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default Forum;