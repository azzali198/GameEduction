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
    <section className="forum-hero">
      <div className="forum-hero__text">
        <span className="forum-hero__kicker">Physics Is Funny Feedback Hub</span>
        <h2 className="forum-hero__title">Tell us how the science games are working for you</h2>
        <p className="forum-hero__subtitle">
          Share the moments you loved, the parts that felt tricky, and the ideas that would make learning physics even better.
        </p>
        <div className="forum-hero__badges">
          <span className="badge badge--experiment">Favorite Moments</span>
          <span className="badge badge--wave">Learning Wins</span>
          <span className="badge badge--gravity">Feature Ideas</span>
        </div>
      </div>
    </section>

    <div className="forum-grid">
      <section className="forum-opinion-panel">
        <header className="section-header">
          <h3>Community Signals</h3>
          <p className="section-subtitle">
            Latest reflections from learners and educators across the Physics Is Funny universe.
          </p>
        </header>

        {paginatedOpinions.length === 0 ? (
          <p className="empty-state">No opinions yet—be the first to spark a conversation!</p>
        ) : (
          <ul className="opinion-list">
            {paginatedOpinions.map(opinion => (
              <li key={opinion.id} className="opinion-card responsive-opinion">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(opinion.author)}&background=2563eb&color=fff`}
                  alt={opinion.author}
                  className="opinion-avatar"
                />
                <div className="opinion-content">
                  <div className="opinion-text">{opinion.content}</div>
                  <div className="opinion-meta">
                    <span className="meta-author">{opinion.author}</span>
                    <span className="meta-dot" />
                    <span className="meta-date">{opinion.date}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <nav className="pagination">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={currentPage === idx + 1 ? 'is-active' : ''}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </nav>
        )}
      </section>
    </div>
    <form onSubmit={handleSubmit} className="forum-form responsive-form">
      <header className="section-header">
        <h3>Publish Your Feedback</h3>
        <p className="section-subtitle">
          Tell us how the app helps, where we can improve, or pitch your dream feature.
        </p>
      </header>

      <label htmlFor="forum-opinion">Your Opinion</label>
      <textarea
        id="forum-opinion"
        placeholder="Write your opinion or feedback about the website..."
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={4}
        required
      />
      <div className="form-actions">
        <button type="submit">Publish</button>
        <span className="privacy-note">Comments are visible to the whole community.</span>
      </div>
    </form>
  </div>
)};


export default Opinions;
