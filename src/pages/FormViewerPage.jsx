import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FormField = ({ question, value, onChange, index }) => {
  const inputStyles = {
    width: '100%',
    padding: '0.75rem',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none'
  };

  const focusStyles = {
    borderColor: '#4299e1',
    boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.1)'
  };

  return (
    <div style={{
      marginBottom: '1.5rem',
      padding: '1.5rem',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      border: '1px solid #f1f5f9'
    }}>
      <label style={{
        display: 'block',
        marginBottom: '0.75rem',
        fontWeight: '600',
        color: '#2d3748',
        fontSize: '1.1rem'
      }}>
        {index + 1}. {question.label}
        {question.type && (
          <span style={{
            marginLeft: '0.5rem',
            fontSize: '0.8rem',
            color: '#718096',
            fontWeight: '400'
          }}>
            ({question.type})
          </span>
        )}
      </label>
      
      {question.type === 'multipleSelects' || question.type === 'singleSelect' ? (
        <select
          value={value || ''}
          onChange={onChange}
          style={{
            ...inputStyles,
            cursor: 'pointer'
          }}
          onFocus={(e) => Object.assign(e.target.style, focusStyles)}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = 'none';
          }}
        >
          <option value="">-- Select an option --</option>
          {question.options?.map((option, i) => (
            <option key={i} value={option}>{option}</option>
          ))}
        </select>
      ) : question.type === 'longText' ? (
        <textarea
          value={value || ''}
          onChange={onChange}
          rows={4}
          style={{
            ...inputStyles,
            resize: 'vertical',
            minHeight: '100px'
          }}
          onFocus={(e) => Object.assign(e.target.style, focusStyles)}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = 'none';
          }}
          placeholder="Enter your response..."
        />
      ) : question.type === 'number' ? (
        <input
          type="number"
          value={value || ''}
          onChange={onChange}
          style={inputStyles}
          onFocus={(e) => Object.assign(e.target.style, focusStyles)}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = 'none';
          }}
          placeholder="Enter a number..."
        />
      ) : question.type === 'email' ? (
        <input
          type="email"
          value={value || ''}
          onChange={onChange}
          style={inputStyles}
          onFocus={(e) => Object.assign(e.target.style, focusStyles)}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = 'none';
          }}
          placeholder="Enter your email..."
        />
      ) : question.type === 'date' ? (
        <input
          type="date"
          value={value || ''}
          onChange={onChange}
          style={inputStyles}
          onFocus={(e) => Object.assign(e.target.style, focusStyles)}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = 'none';
          }}
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={onChange}
          style={inputStyles}
          onFocus={(e) => Object.assign(e.target.style, focusStyles)}
          onBlur={(e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = 'none';
          }}
          placeholder="Enter your response..."
        />
      )}
    </div>
  );
};

export default function FormViewerPage() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/form/${id}`)
      .then(r => r.json())
      .then(data => {
        setForm(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7fafc'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            border: '3px solid #e2e8f0',
            borderTopColor: '#4299e1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <h2 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Loading Form</h2>
          <p style={{ color: '#718096', margin: 0 }}>Please wait...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7fafc'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
          <h2 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Form Not Found</h2>
          <p style={{ color: '#718096', margin: 0 }}>
            The form you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const visible = (index) => {
    const q = form.questions[index];
    if (!q.conditional || q.conditional.questionIndex == null) return true;
    const prevVal = answers[q.conditional.questionIndex];
    return prevVal === q.conditional.value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/form/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: Object.values(answers) })
      });
      const data = await resp.json();
      
      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{
            color: '#2d3748',
            marginBottom: '1rem',
            fontSize: '1.8rem'
          }}>
            Thank You!
          </h2>
          <p style={{
            color: '#718096',
            margin: 0,
            fontSize: '1.1rem'
          }}>
            Your response has been successfully submitted to Airtable.
          </p>
        </div>
      </div>
    );
  }

  const visibleQuestions = form.questions.filter((_, i) => visible(i));
  const progress = Object.keys(answers).length / visibleQuestions.length * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
      padding: '2rem 1rem'
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '2rem',
            textAlign: 'center'
          }}>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              fontWeight: '700'
            }}>
              Form Submission
            </h1>
            <p style={{
              margin: '0.5rem 0 0 0',
              opacity: 0.9
            }}>
              Please fill out all visible fields
            </p>
          </div>

          {/* Progress Bar */}
          {visibleQuestions.length > 0 && (
            <div style={{ padding: '1rem 2rem 0' }}>
              <div style={{
                background: '#f1f5f9',
                borderRadius: '10px',
                height: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #4299e1, #3182ce)',
                  height: '100%',
                  width: `${progress}%`,
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
              <p style={{
                textAlign: 'center',
                margin: '0.5rem 0 0 0',
                fontSize: '0.9rem',
                color: '#718096'
              }}>
                {Math.round(progress)}% Complete
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
            {form.questions.map((q, i) => (
              visible(i) && (
                <FormField
                  key={q.fieldId || i}
                  question={q}
                  value={answers[i]}
                  onChange={(e) => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                  index={i}
                />
              )
            ))}
            
            {visibleQuestions.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: '#718096'
              }}>
                <p>No questions are currently visible based on your previous answers.</p>
              </div>
            )}

            {visibleQuestions.length > 0 && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: submitting 
                      ? '#a0aec0' 
                      : 'linear-gradient(135deg, #4299e1, #3182ce)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: submitting 
                      ? 'none' 
                      : '0 4px 12px rgba(66, 153, 225, 0.3)',
                    minWidth: '140px'
                  }}
                >
                  {submitting ? '⏳ Submitting...' : '🚀 Submit Form'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
