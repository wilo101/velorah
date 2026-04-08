/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import { FormEvent, useState, useCallback } from 'react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const inputClass =
  'liquid-glass w-full px-6 py-4 rounded-2xl text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-white/30 transition-all';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

  const onFieldChange = useCallback(() => {
    if (status === 'success') {
      setStatus('idle');
    }
  }, [status]);

  async function submitWeb3Forms(): Promise<boolean> {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: 'Velorah — New contact',
        name,
        email,
        message,
      }),
    });
    const data = (await res.json()) as { success?: boolean; message?: string };
    if (!res.ok || !data.success) {
      setErrorDetail(data.message ?? `Request failed (${res.status})`);
      return false;
    }
    return true;
  }

  function openMailto() {
    const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'contact@example.com';
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${to}?subject=${encodeURIComponent('Velorah contact')}&body=${body}`;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorDetail(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorDetail('Please fill in name, email, and message.');
      return;
    }

    if (accessKey) {
      setStatus('sending');
      try {
        const ok = await submitWeb3Forms();
        if (ok) {
          setStatus('success');
          setName('');
          setEmail('');
          setMessage('');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
        setErrorDetail('Network error. Try again or use email below.');
      }
      return;
    }

    setStatus('sending');
    try {
      openMailto();
      setStatus('success');
      setErrorDetail(null);
    } catch {
      setStatus('error');
      setErrorDetail('Could not open email client.');
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {!accessKey ? (
        <p className="text-sm text-muted-foreground text-center mb-6 rounded-2xl liquid-glass px-4 py-3">
          For instant delivery to your inbox, add{' '}
          <code className="text-foreground/90 text-xs">NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY</code> in{' '}
          <code className="text-foreground/90 text-xs">.env.local</code> (free at{' '}
          <a href="https://web3forms.com" className="underline hover:text-foreground" target="_blank" rel="noreferrer">
            web3forms.com
          </a>
          ). Until then, submit opens your email app.
        </p>
      ) : null}

      <form className="mt-2 flex flex-col gap-6 animate-fade-rise-delay-2 text-left" onSubmit={onSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={inputClass}
              placeholder="Jane Doe"
              value={name}
              onChange={(ev) => {
                onFieldChange();
                setName(ev.target.value);
              }}
              disabled={status === 'sending'}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={inputClass}
              placeholder="jane@example.com"
              value={email}
              onChange={(ev) => {
                onFieldChange();
                setEmail(ev.target.value);
              }}
              disabled={status === 'sending'}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-message" className="text-xs uppercase tracking-widest text-muted-foreground ml-1">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            className={`${inputClass} resize-none`}
            placeholder="Tell us about your vision..."
            value={message}
            onChange={(ev) => {
              onFieldChange();
              setMessage(ev.target.value);
            }}
            disabled={status === 'sending'}
          />
        </div>

        {status === 'success' ? (
          <p className="text-center text-foreground/90 liquid-glass rounded-2xl py-4 px-4" role="status">
            {accessKey
              ? 'Thank you — your message was sent. We will reply soon.'
              : 'Your email app should open with the message prefilled. Send it when ready.'}
          </p>
        ) : null}

        {status === 'error' && errorDetail ? (
          <p className="text-center text-red-200/90 text-sm liquid-glass rounded-2xl py-3 px-4" role="alert">
            {errorDetail}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-2 hover:scale-[1.03] cursor-pointer w-full md:w-auto self-center disabled:opacity-60 disabled:hover:scale-100"
        >
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
