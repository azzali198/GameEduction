import React, { useState, useEffect } from 'react';
import './Forum.css';
import { submitFeedback, getAllFeedbacks } from '../../services/forumService';
import Swal from 'sweetalert2';

const Opinions = () => {
  const [content, setContent] = useState('');
  const [opinions, setOpinions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const opinionsPerPage = 3;

  // Load feedbacks on page load
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbacks = await getAllFeedbacks();
        // Map feedbacks to match local opinion structure if needed
        const mapped = feedbacks.map((fb, idx) => ({
          id: idx + 1,
          content: fb.FeedbackText || fb.content,
          author: fb.Login || fb.author,
          date: fb.Date || fb.date
        }));
        setOpinions(mapped);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to load feedbacks. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      const feedbackBody = {
        Login: sessionStorage.getItem('userName') || 'Guest',
        FeedbackText: content,
        Date: new Date().toISOString().slice(0, 10),
        Email: ''
      };
      try {
        await submitFeedback(feedbackBody);
        setOpinions([
          {
            id: opinions.length + 1,
            content,
            author: sessionStorage.getItem('userName') || 'Guest',
            date: feedbackBody.Date
          },
          ...opinions
        ]);
        setContent('');
        setCurrentPage(1);
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to submit feedback. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const totalPages = Math.ceil(opinions.length / opinionsPerPage);
  const paginatedOpinions = opinions.slice(
    (currentPage - 1) * opinionsPerPage,
    currentPage * opinionsPerPage
  );

  return (
    <div className="forum-container responsive-forum">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">
        Tell Us What You Think!
        <span className="block text-lg font-normal text-gray-700 mt-1">
          Your feedback helps us make Physics Is Funny even better.
        </span>
      </h2>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-center">Visitor Opinions</h3>
        {paginatedOpinions.length === 0 ? (
          <p className="text-center">No opinions yet.</p>
        ) : (
          <ul className="space-y-4">
            {paginatedOpinions.map(opinion => (
              <li key={opinion.id} className="bg-white p-4 rounded shadow flex items-start gap-4 responsive-opinion">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(opinion.author)}`}
                  alt={opinion.author}
                  className="w-10 h-10 rounded-full border flex-shrink-0"
                />
                <div style={{ flex: 1 }}>
                  <div className="mt-1 break-words">{opinion.content}</div>
                  <div className="text-sm text-gray-500 mt-2">
                    By {opinion.author} on {opinion.date}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-6 gap-2">
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
      <br/>
      <form onSubmit={handleSubmit} className="mt-8 mb-8 bg-gray-50 p-4 rounded shadow responsive-form">
        <div className="mb-3">
          <label className="block font-semibold mb-1">Your Opinion</label>
          <textarea
            className="w-full border rounded p-2"
            placeholder="Write your opinion or feedback about the website..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={4}
            required
            style={{ resize: 'vertical', minHeight: '80px', maxHeight: '200px' }}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default Opinions;