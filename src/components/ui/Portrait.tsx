import { useState } from 'react'
import { identity } from '../../data/site'

const SRC = '/images/portrait.jpg'

/**
 * Portrait with a designed fallback. Drop a photo at
 * `public/images/portrait.jpg` (portrait ratio, ~1200×1500) and it takes
 * over automatically — no code changes needed.
 */
export function Portrait() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="relative flex aspect-4/5 w-full flex-col justify-between border border-ink/25 bg-sand/60 p-5">
        <span className="label text-ink/40">fig_02 / portrait</span>

        <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
          <span className="display text-[clamp(3rem,7vw,4.5rem)] leading-none text-ink/20">
            AH
          </span>
          <span className="label text-ink/40">1200 × 1500</span>
        </div>

        <p className="label max-w-[22ch] text-ink/40">portrait — not available</p>
      </div>
    )
  }

  return (
    <img
      src={SRC}
      alt={`Portrait of ${identity.name}`}
      width={1200}
      height={1500}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="aspect-4/5 w-full border border-ink/25 object-cover grayscale-[0.15]"
    />
  )
}
