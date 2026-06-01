import React, { useState } from 'react'
import { submitRegistration, SubmissionPayload } from '../api/submissions'

type Status = 'idle' | 'loading' | 'success' | 'error'

const initialForm: SubmissionPayload = { name: '', email: '', occupation: '' }

const RegistrationForm: React.FC = () => {
  const [form, setForm] = useState<SubmissionPayload>(initialForm)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [emailSent, setEmailSent] = useState<boolean | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    setEmailSent(null)

    try {
      const result = await submitRegistration(form)
      setStatus('success')
      setMessage(result.message)
      setEmailSent(result.emailSent)
      setForm(initialForm)
    } catch (err: unknown) {
      setStatus('error')
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'message' in err.response.data
      ) {
        setMessage((err.response.data as { message: string }).message)
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    }
  }

  const isLoading = status === 'loading'

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Register</h1>
        <p style={styles.subtitle}>Fill in your details below</p>

        {status === 'success' && (
          <div style={styles.alert('success')}>
            <strong>✅ {message}</strong>
            {emailSent === false && (
              <p style={{ marginTop: 4, fontSize: 13 }}>
                (Email notification could not be sent, but your data was saved.)
              </p>
            )}
          </div>
        )}

        {status === 'error' && (
          <div style={styles.alert('error')}>
            <strong>❌ {message}</strong>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="name">
              Full Name <span style={styles.required}>*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              style={styles.input}
              maxLength={100}
              required
              disabled={isLoading}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="email">
              Email Address <span style={styles.required}>*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              style={styles.input}
              maxLength={200}
              required
              disabled={isLoading}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="occupation">
              Occupation <span style={styles.required}>*</span>
            </label>
            <input
              id="occupation"
              name="occupation"
              type="text"
              value={form.occupation}
              onChange={handleChange}
              placeholder="Software Engineer"
              style={styles.input}
              maxLength={100}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" style={styles.button(isLoading)} disabled={isLoading}>
            {isLoading ? 'Submitting…' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  } as React.CSSProperties,

  card: {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: '2.5rem',
    width: '100%',
    maxWidth: 460,
  } as React.CSSProperties,

  title: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 4,
  } as React.CSSProperties,

  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: '1.75rem',
  } as React.CSSProperties,

  field: {
    marginBottom: '1.25rem',
  } as React.CSSProperties,

  label: {
    display: 'block',
    fontSize: 14,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 6,
  } as React.CSSProperties,

  required: {
    color: '#ef4444',
  } as React.CSSProperties,

  input: {
    width: '100%',
    padding: '0.6rem 0.875rem',
    border: '1.5px solid #d1d5db',
    borderRadius: 8,
    fontSize: 15,
    outline: 'none',
    transition: 'border-color 0.2s',
    color: '#111827',
  } as React.CSSProperties,

  button: (loading: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '0.75rem',
    marginTop: '0.5rem',
    background: loading ? '#9ca3af' : '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 600,
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'background 0.2s',
  }),

  alert: (type: 'success' | 'error'): React.CSSProperties => ({
    padding: '0.875rem 1rem',
    borderRadius: 8,
    marginBottom: '1.25rem',
    background: type === 'success' ? '#ecfdf5' : '#fef2f2',
    border: `1px solid ${type === 'success' ? '#6ee7b7' : '#fca5a5'}`,
    color: type === 'success' ? '#065f46' : '#991b1b',
    fontSize: 14,
  }),
}

export default RegistrationForm
