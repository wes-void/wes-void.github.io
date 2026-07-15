'use client'

import { useState } from 'react'

/**
 * Interactive "anatomy of an objective" — a rebuilt slice of Threshold OS's
 * mad-lib objective authoring. You fill the sentence slots and watch the
 * Objective assemble; each slot is mapped to the typed, queryable column it
 * writes to, and the "serves the alignment" justification gates the draft
 * from being submitted. Design (legible prose) and architecture (typed
 * columns) shown as one thing.
 */

type Slot = {
  key: string
  value: string
  set: (v: string) => void
  placeholder: string
  column: string
  columnNote: string
}

function Chip({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  label: string
}) {
  const width = Math.max((value || placeholder).length + 1, 4) + 'ch'
  return (
    <input
      className="obj-chip"
      value={value}
      placeholder={placeholder}
      aria-label={label}
      onChange={(e) => onChange(e.target.value)}
      style={{ width }}
      spellCheck={false}
    />
  )
}

export function ObjectiveAnatomy() {
  const [metric, setMetric] = useState('enterprise ARR')
  const [current, setCurrent] = useState('$2M')
  const [target, setTarget] = useState('5')
  const [unit, setUnit] = useState('$M')
  const [deadline, setDeadline] = useState('Q4')
  const [value, setValue] = useState('we become the category default')
  const [serves, setServes] = useState('')

  const statement = `Move ${metric || '[metric]'} from ${
    current || '[current]'
  } to ${target || '[target]'} ${unit || '[unit]'} by ${
    deadline || '[deadline]'
  }, so that ${value || '[value]'}.`

  const servesReady = serves.trim().length >= 40

  const slots: Slot[] = [
    {
      key: 'metric',
      value: metric,
      set: setMetric,
      placeholder: 'metric',
      column: 'metric_expression',
      columnNote: 'text · composite allowed',
    },
    {
      key: 'target',
      value: target,
      set: setTarget,
      placeholder: 'target',
      column: 'target_value',
      columnNote: 'numeric · must resolve to one number',
    },
    {
      key: 'unit',
      value: unit,
      set: setUnit,
      placeholder: 'unit',
      column: 'target_unit',
      columnNote: 'text',
    },
    {
      key: 'deadline',
      value: deadline,
      set: setDeadline,
      placeholder: 'deadline',
      column: 'time_horizon_end',
      columnNote: 'date · null = evergreen',
    },
    {
      key: 'value',
      value: value,
      set: setValue,
      placeholder: 'value',
      column: 'value_creation_statement',
      columnNote: 'text · the "so that"',
    },
  ]

  return (
    <div className="obj-anatomy">
      <div className="obj-anatomy-stage">
        <span className="obj-anatomy-eyebrow">Authoring an objective</span>

        {/* the mad-lib sentence, editable in place */}
        <p className="obj-anatomy-sentence">
          Move{' '}
          <Chip value={metric} onChange={setMetric} placeholder="metric" label="Metric" />{' '}
          from{' '}
          <Chip value={current} onChange={setCurrent} placeholder="current" label="Current value" />{' '}
          to{' '}
          <Chip value={target} onChange={setTarget} placeholder="target" label="Target value" />{' '}
          <Chip value={unit} onChange={setUnit} placeholder="unit" label="Unit" />{' '}
          by{' '}
          <Chip value={deadline} onChange={setDeadline} placeholder="deadline" label="Deadline" />
          , so that{' '}
          <Chip value={value} onChange={setValue} placeholder="value" label="Value created" />.
        </p>

        <p className="obj-anatomy-hint">
          Edit any slot. It reads as a sentence, but every slot is a typed column.
        </p>
      </div>

      {/* the slot → column mapping, live */}
      <div className="obj-anatomy-map">
        <div className="obj-map-head">
          <span>Slot</span>
          <span>Writes to</span>
        </div>
        {slots.map((s) => (
          <div className="obj-map-row" key={s.key}>
            <span className="obj-map-slot">{s.value || `[${s.placeholder}]`}</span>
            <span className="obj-map-col">
              <code>{s.column}</code>
              <em>{s.columnNote}</em>
            </span>
          </div>
        ))}
        <div className="obj-map-row obj-map-row--statement">
          <span className="obj-map-slot">the whole sentence</span>
          <span className="obj-map-col">
            <code>statement</code>
            <em>the canonical, human-readable objective</em>
          </span>
        </div>
      </div>

      {/* the lock gate: cannot leave draft without the justification */}
      <div className="obj-serves">
        <label htmlFor="obj-serves-field">
          Serves the alignment by <span>(required before it can leave draft)</span>
        </label>
        <textarea
          id="obj-serves-field"
          className="obj-serves-field"
          rows={2}
          placeholder="How does this objective serve the company-wide alignment? One sentence."
          value={serves}
          onChange={(e) => setServes(e.target.value)}
          spellCheck={false}
        />
        <div className={`obj-gate ${servesReady ? 'is-ready' : 'is-locked'}`}>
          <span className="obj-gate-dot" aria-hidden />
          {servesReady ? (
            <span>
              Ready to submit for review <code>lifecycle_stage: draft → pending_review</code>
            </span>
          ) : (
            <span>
              Locked in draft · {Math.max(0, 40 - serves.trim().length)} more characters to
              justify the objective
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
