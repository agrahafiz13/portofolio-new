import { Check, Send } from 'lucide-react'
import { useId, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { contactEndpoint, identity } from '../data/site'
import { cn } from '../lib/cn'
import { Window } from './ui/Window'

type FieldName = 'name' | 'email' | 'subject' | 'message'
type Fields = Record<FieldName, string>
type Errors = Partial<Record<FieldName, string>>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMPTY: Fields = { name: '', email: '', subject: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const FIELD_ORDER: FieldName[] = ['name', 'email', 'subject', 'message']

const fieldMeta: Record<FieldName, { label: string; index: string; placeholder: string; multiline?: boolean }> = {
  name: { label: 'Name', index: '01', placeholder: 'Your name' },
  email: { label: 'Email', index: '02', placeholder: 'you@example.com' },
  subject: { label: 'Subject', index: '03', placeholder: 'What is this about?' },
  message: {
    label: 'Message',
    index: '04',
    placeholder: 'Tell me about the project, the role or the question.',
    multiline: true,
  },
}

function validate(values: Fields): Errors {
  const errors: Errors = {}

  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.subject.trim().length < 3) errors.subject = 'Please add a short subject.'
  if (values.message.trim().length < 10) {
    errors.message = 'Please write at least a sentence (10 characters).'
  }

  return errors
}

type FieldProps = {
  name: FieldName
  value: string
  error?: string
  idBase: string
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function Field({ name, value, error, idBase, onChange }: FieldProps) {
  const meta = fieldMeta[name]
  const inputId = `${idBase}-${name}`
  const errorId = `${inputId}-error`

  const control = cn(
    'mt-1.5 w-full border bg-cream/40 px-3 py-2.5 font-mono text-[0.82rem] leading-relaxed text-ink transition-colors placeholder:text-ink/30 focus:bg-paper focus:outline-none',
    error ? 'border-brick' : 'border-line focus:border-ink',
  )

  const shared = {
    id: inputId,
    name,
    value,
    onChange,
    placeholder: meta.placeholder,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? errorId : undefined,
    className: control,
  }

  return (
    <div>
      <label htmlFor={inputId} className="label flex items-baseline justify-between text-ink/50">
        <span>
          {meta.label} <span className="text-brick">*</span>
        </span>
        <span className="text-ink/25">{meta.index}</span>
      </label>

      {meta.multiline ? (
        <textarea {...shared} rows={5} className={cn(control, 'resize-y')} />
      ) : (
        <input
          {...shared}
          type={name === 'email' ? 'email' : 'text'}
          inputMode={name === 'email' ? 'email' : 'text'}
          autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : 'off'}
        />
      )}

      {error && (
        <p id={errorId} className="mt-1.5 font-mono text-[0.68rem] leading-snug text-brick">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const baseId = useId().replace(/:/g, '')
  const [values, setValues] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')
  /** Hidden from people, tempting for bots. */
  const [trap, setTrap] = useState('')

  const handleChange =
    (field: FieldName) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: event.target.value }
      setValues(next)
      if (errors[field]) setErrors(validate(next))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (trap.trim().length > 0) return

    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalid) {
      setStatus('idle')
      setFeedback('')
      document.getElementById(`${baseId}-${firstInvalid}`)?.focus()
      return
    }

    setStatus('sending')
    setFeedback('')

    if (contactEndpoint) {
      try {
        const response = await fetch(contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        })

        if (!response.ok) throw new Error(`Request failed with status ${response.status}`)

        setStatus('sent')
        setFeedback('Message sent. Thank you — I will reply as soon as I can.')
        setValues(EMPTY)
      } catch {
        setStatus('error')
        setFeedback(`The message could not be sent. Please email ${identity.email} directly.`)
      }
      return
    }

    // No backend configured: hand the message to the visitor's mail client.
    const body = [
      `From: ${values.name} <${values.email}>`,
      '',
      values.message,
      '',
      `— sent from ${identity.name}'s portfolio`,
    ].join('\n')

    const mailto =
      `mailto:${identity.email}` +
      `?subject=${encodeURIComponent(values.subject)}` +
      `&body=${encodeURIComponent(body)}`

    window.location.href = mailto
    setStatus('sent')
    setFeedback(
      `Your mail app should open with the message ready to send. If nothing happens, write to ${identity.email} directly.`,
    )
  }

  return (
    <Window
      title="new_message.txt"
      meta={
        <span className="label hidden text-ink/40 sm:inline">
          {status === 'sending' ? 'sending…' : 'draft'}
        </span>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="p-4 sm:p-5">
        <p className="label border-b border-line-soft pb-3 text-ink/40">
          All fields required — nothing is stored on this site
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field
            name="name"
            value={values.name}
            error={errors.name}
            idBase={baseId}
            onChange={handleChange('name')}
          />
          <Field
            name="email"
            value={values.email}
            error={errors.email}
            idBase={baseId}
            onChange={handleChange('email')}
          />
        </div>

        <div className="mt-4">
          <Field
            name="subject"
            value={values.subject}
            error={errors.subject}
            idBase={baseId}
            onChange={handleChange('subject')}
          />
        </div>

        <div className="mt-4">
          <Field
            name="message"
            value={values.message}
            error={errors.message}
            idBase={baseId}
            onChange={handleChange('message')}
          />
        </div>

        {/* Honeypot — out of the tab order and hidden from assistive tech. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor={`${baseId}-company`}>Company</label>
          <input
            id={`${baseId}-company`}
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={trap}
            onChange={(event) => setTrap(event.target.value)}
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line-soft pt-4">
          <button type="submit" disabled={status === 'sending'} className="btn btn-solid">
            {status === 'sending' ? 'Sending' : 'Send message'}
            <Send size={13} strokeWidth={2} aria-hidden="true" />
          </button>
          <span className="label text-ink/35">* required</span>
        </div>

        <div
          role="status"
          aria-live="polite"
          className={cn(
            'mt-3 flex items-start gap-2 font-mono text-[0.72rem] leading-relaxed',
            status === 'sent' && 'text-ink/70',
            status === 'error' && 'text-brick',
            (status === 'idle' || status === 'sending') && 'text-ink/35',
          )}
        >
          {status === 'sent' && (
            <Check size={13} strokeWidth={2} className="mt-0.5 text-brick" aria-hidden="true" />
          )}
          <span>{feedback || (status === 'sending' ? 'Sending your message…' : '—')}</span>
        </div>
      </form>
    </Window>
  )
}
