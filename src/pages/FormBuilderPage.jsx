import React, { useEffect, useState } from 'react';

const StepIndicator = ({ currentStep, totalSteps }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
    {Array.from({ length: totalSteps }, (_, i) => (
      <React.Fragment key={i}>
        <div style={{
          width: '2rem',
          height: '2rem',
          borderRadius: '50%',
          background: i <= currentStep ? '#4299e1' : '#e2e8f0',
          color: i <= currentStep ? 'white' : '#a0aec0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '600',
          fontSize: '0.9rem'
        }}>
          {i + 1}
        </div>
        {i < totalSteps - 1 && (
          <div style={{
            flex: 1,
            height: '2px',
            background: i < currentStep ? '#4299e1' : '#e2e8f0',
            margin: '0 1rem'
          }} />
        )}
      </React.Fragment>
    ))}
  </div>
);

const Card = ({ children, title }) => (
  <div style={{
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    marginBottom: '1rem'
  }}>
    {title && (
      <h3 style={{
        margin: '0 0 1rem 0',
        color: '#2d3748',
        fontSize: '1.2rem',
        fontWeight: '600'
      }}>
        {title}
      </h3>
    )}
    {children}
  </div>
);

const Select = ({ value, onChange, options, placeholder }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      background: 'white',
      cursor: 'pointer',
      transition: 'border-color 0.2s'
    }}
  >
    <option value="">{placeholder}</option>
    {options.map(option => (
      <option key={option.id} value={option.id}>{option.name}</option>
    ))}
  </select>
);

const Button = ({ onClick, children, variant = 'primary', disabled = false }) => {
  const styles = {
    primary: {
      background: 'linear-gradient(135deg, #4299e1, #3182ce)',
      color: 'white'
    },
    secondary: {
      background: '#f7fafc',
      color: '#4a5568',
      border: '2px solid #e2e8f0'
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        border: variant === 'primary' ? 'none' : styles[variant].border,
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        opacity: disabled ? 0.6 : 1
      }}
    >
      {children}
    </button>
  );
};

export default function FormBuilderPage() {
  const [token, setToken] = useState(null);
  const [bases, setBases] = useState([]);
  const [baseId, setBaseId] = useState('');
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState('');
  const [fields, setFields] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  console.log('🏗️ FormBuilder render - State:', { 
    token: !!token, 
    baseId, 
    tableId, 
    basesCount: bases.length, 
    tablesCount: tables.length, 
    fieldsCount: fields.length 
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get('token');
    console.log('🔍 Token from URL:', t ? 'present' : 'missing');
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (!token) {
      console.log('⏸️ Skipping bases fetch - no token');
      return;
    }
    console.log('📡 Fetching bases with token');
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/bases`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        console.log('✅ Bases fetched:', data);
        setBases(data);
      })
      .catch(error => {
        console.error('❌ Error fetching bases:', error);
      });
  }, [token]);

  useEffect(() => {
    if (!token || !baseId) {
      console.log('⏸️ Skipping tables fetch - missing token or baseId:', { token: !!token, baseId });
      return;
    }
    console.log('📡 Fetching tables for base:', baseId);
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/tables/${baseId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        console.log('✅ Tables fetched:', data);
        setTables(data);
        setCurrentStep(1);
      })
      .catch(error => {
        console.error('❌ Error fetching tables:', error);
      });
  }, [token, baseId]);

  useEffect(() => {
    if (!token || !baseId || !tableId) {
      console.log('⏸️ Skipping fields fetch - missing params:', { token: !!token, baseId, tableId });
      return;
    }
    console.log('📡 Fetching fields for base/table:', baseId, tableId);
    const url = `${import.meta.env.VITE_API_URL || ''}/api/fields/${baseId}/${tableId}`;
    console.log('🔍 Full URL:', url);
    console.log('🔍 Token being sent:', token ? 'present' : 'missing');
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => {
        console.log('🔍 Response status:', r.status);
        console.log('🔍 Response headers:', r.headers);
        if (!r.ok) {
          return r.text().then(text => {
            console.log('🔍 Error response body:', text);
            throw new Error(`HTTP ${r.status}: ${r.statusText} - ${text}`);
          });
        }
        return r.json();
      })
      .then(data => {
        console.log('✅ Fields fetched:', data);
        setFields(data);
        setCurrentStep(2);
      })
      .catch(error => {
        console.error('❌ Error fetching fields:', error);
        console.error('❌ Error details:', {
          message: error.message,
          stack: error.stack
        });
      });
  }, [token, baseId, tableId]);

  const addQuestion = (field) => {
    setQuestions(qs => [...qs, { 
      fieldId: field.id, 
      label: field.name, 
      type: field.type, 
      conditional: null,
      id: Date.now() + Math.random()
    }]);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'conditional.questionIndex') {
      newQuestions[index].conditional = { 
        questionIndex: Number(value), 
        value: newQuestions[index].conditional?.value || null 
      };
    } else if (field === 'conditional.value') {
      if (newQuestions[index].conditional) {
        newQuestions[index].conditional.value = value;
      }
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const saveForm = async () => {
    if (!token) {
      alert('Missing token');
      return;
    }
    try {
      const resp = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ airtableBaseId: baseId, airtableTableId: tableId, questions })
      });
      const data = await resp.json();
      
      // Show a brief success message and then redirect
      const formUrl = `${window.location.origin}/form/${data.id}`;
      alert(`Form created successfully! Redirecting to your form...`);
      
      // Redirect to the form after a short delay
      setTimeout(() => {
        window.location.href = formUrl;
      }, 1000);
      
    } catch (error) {
      alert('Error saving form: ' + error.message);
    }
  };

  if (!token) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f7fafc'
      }}>
        <Card>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>⏳ Waiting for Authentication</h2>
            <p style={{ color: '#718096' }}>
              Please complete the Airtable OAuth process to continue
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f7fafc',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '0.5rem'
          }}>
            Form Builder
          </h1>
          <p style={{ color: '#718096', fontSize: '1.1rem' }}>
            Create your dynamic Airtable form in 3 simple steps
          </p>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={3} />

        <Card title="Step 1: Select Your Base">
          <Select
            value={baseId}
            onChange={e => {
              const newBaseId = e.target.value;
              console.log('🏠 Base selected:', newBaseId);
              setBaseId(newBaseId);
              // Reset dependent state
              setTableId('');
              setTables([]);
              setFields([]);
              setQuestions([]);
            }}
            options={bases}
            placeholder="Choose an Airtable base..."
          />
        </Card>

        {baseId && (
          <Card title="Step 2: Select Your Table">
            <Select
              value={tableId}
              onChange={e => {
                const newTableId = e.target.value;
                console.log('🗂️ Table selected:', newTableId);
                setTableId(newTableId);
                // Reset dependent state
                setFields([]);
                setQuestions([]);
              }}
              options={tables}
              placeholder="Choose a table..."
            />
          </Card>
        )}

        {fields.length > 0 && (
          <Card title="Step 3: Build Your Form">
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '1rem', color: '#4a5568' }}>Available Fields</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '0.5rem' }}>
                {fields.map(field => (
                  <div key={field.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem',
                    background: '#f7fafc',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <div>
                      <span style={{ fontWeight: '500' }}>{field.name}</span>
                      <span style={{ color: '#718096', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                        ({field.type})
                      </span>
                    </div>
                    <Button
                      onClick={() => addQuestion(field)}
                      variant="secondary"
                      style={{ padding: '0.25rem 0.75rem', fontSize: '0.9rem' }}
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {questions.length > 0 && (
              <div>
                <h4 style={{ marginBottom: '1rem', color: '#4a5568' }}>Form Questions</h4>
                {questions.map((q, i) => (
                  <div key={q.id || i} style={{
                    background: '#f7fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                      <div style={{ flex: 1, marginRight: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                          Question Label
                        </label>
                        <input
                          value={q.label}
                          onChange={e => updateQuestion(i, 'label', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #e2e8f0',
                            borderRadius: '4px'
                          }}
                        />
                      </div>
                      <Button
                        onClick={() => removeQuestion(i)}
                        variant="secondary"
                        style={{ background: '#fed7d7', color: '#c53030' }}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <details style={{ marginTop: '1rem' }}>
                      <summary style={{ cursor: 'pointer', fontWeight: '500', color: '#4a5568' }}>
                        Conditional Logic (Optional)
                      </summary>
                      <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '6px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                              Show only if question #
                            </label>
                            <input
                              type="number"
                              placeholder="Question number"
                              min="1"
                              max={i}
                              onChange={e => updateQuestion(i, 'conditional.questionIndex', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px'
                              }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                              Equals this value
                            </label>
                            <input
                              placeholder="Expected value"
                              onChange={e => updateQuestion(i, 'conditional.value', e.target.value)}
                              style={{
                                width: '100%',
                                padding: '0.5rem',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px'
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
                
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <Button
                    onClick={saveForm}
                    disabled={questions.length === 0}
                  >
                    🚀 Create Form & Open Preview
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
