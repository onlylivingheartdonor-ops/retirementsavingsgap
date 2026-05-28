"use client"

import { useState } from "react"

function fmtM(n) {
  if (Math.abs(n) >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M"
  if (Math.abs(n) >= 1000) return "$" + Math.round(n).toLocaleString("en-US")
  return "$" + Math.round(n)
}
function fmt(n) { return "$" + Math.round(Math.abs(n)).toLocaleString("en-US") }

function fv(pv, r, n) { return pv * Math.pow(1 + r, n) }
function fvContrib(pmt, r, n) { return r === 0 ? pmt * n : pmt * ((Math.pow(1 + r, n) - 1) / r) }

export default function RetirementCalculator() {
  const [currentAge,   setCurrentAge]   = useState("30")
  const [retireAge,    setRetireAge]    = useState("65")
  const [savings,      setSavings]      = useState("20000")
  const [monthly,      setMonthly]      = useState("500")
  const [returnRate,   setReturnRate]   = useState("7")
  const [goal,         setGoal]         = useState("1000000")
  const [inflation,    setInflation]    = useState("3")

  const ca  = parseInt(currentAge)   || 0
  const ra  = parseInt(retireAge)    || 65
  const sv  = parseFloat(savings)    || 0
  const mo  = parseFloat(monthly)    || 0
  const rr  = parseFloat(returnRate) || 0
  const gl  = parseFloat(goal)       || 0
  const inf = parseFloat(inflation)  || 0

  const years  = Math.max(ra - ca, 0)
  const months = years * 12
  const mr     = rr / 100 / 12
  const ar     = rr / 100

  const fvSavings      = fv(sv, ar, years)
  const fvContribs     = fvContrib(mo, mr, months)
  const totalProjected = fvSavings + fvContribs
  const gap            = gl - totalProjected
  const onTrack        = gap <= 0

  const realProjected = totalProjected / Math.pow(1 + inf / 100, years)

  const neededMonthly = gap > 0 && mr > 0
    ? gap / ((Math.pow(1 + mr, months) - 1) / mr)
    : 0
  const totalMonthlyNeeded = mo + (gap > 0 ? neededMonthly : 0)

  const extraYears = (() => {
    if (onTrack) return 0
    for (let extra = 1; extra <= 30; extra++) {
      const m = (years + extra) * 12
      const p = fv(sv, ar, years + extra) + fvContrib(mo, mr, m)
      if (p >= gl) return extra
    }
    return null
  })()

  const savingsPct      = gl > 0 ? Math.min((fvSavings / gl) * 100, 100) : 0
  const contribPct      = gl > 0 ? Math.min((fvContribs / gl) * 100, 100 - savingsPct) : 0
  const gapPct          = Math.max(0, 100 - savingsPct - contribPct)

  const milestones = [40, 50, 60, ra].filter(a => a > ca && a <= ra).map(age => {
    const y = age - ca
    const m = y * 12
    const val = fv(sv, ar, y) + fvContrib(mo, mr, m)
    return { age, val, pct: gl > 0 ? Math.min(Math.round(val / gl * 100), 100) : 0 }
  })

  return (
    <div className="ret-card">
      <div className="ret-field-row">
        <div>
          <label className="ret-field-label" htmlFor="cage">Current age</label>
          <div className="ret-input-wrap">
            <input id="cage" className="ret-input no-prefix" type="number" min="18" max="80" placeholder="30"
              value={currentAge} onChange={e => setCurrentAge(e.target.value)} />
            <span className="ret-suffix">yrs</span>
          </div>
        </div>
        <div>
          <label className="ret-field-label" htmlFor="rage">Target retirement age</label>
          <div className="ret-input-wrap">
            <input id="rage" className="ret-input no-prefix" type="number" min="40" max="90" placeholder="65"
              value={retireAge} onChange={e => setRetireAge(e.target.value)} />
            <span className="ret-suffix">yrs</span>
          </div>
        </div>
        <div>
          <label className="ret-field-label" htmlFor="ret">Expected annual return</label>
          <div className="ret-input-wrap">
            <input id="ret" className="ret-input no-prefix" type="number" min="0" step="0.1" placeholder="7"
              value={returnRate} onChange={e => setReturnRate(e.target.value)} />
            <span className="ret-suffix">%</span>
          </div>
        </div>
      </div>

      <div className="ret-field-row">
        <div>
          <label className="ret-field-label" htmlFor="sv">Current savings</label>
          <div className="ret-input-wrap">
            <span className="ret-prefix">$</span>
            <input id="sv" className="ret-input" type="number" min="0" placeholder="20000"
              value={savings} onChange={e => setSavings(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="ret-field-label" htmlFor="mo">Monthly contribution</label>
          <div className="ret-input-wrap">
            <span className="ret-prefix">$</span>
            <input id="mo" className="ret-input" type="number" min="0" placeholder="500"
              value={monthly} onChange={e => setMonthly(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="ret-field-label" htmlFor="inf">Inflation rate</label>
          <div className="ret-input-wrap">
            <input id="inf" className="ret-input no-prefix" type="number" min="0" step="0.1" placeholder="3"
              value={inflation} onChange={e => setInflation(e.target.value)} />
            <span className="ret-suffix">%</span>
          </div>
        </div>
      </div>

      <div className="ret-field-row-2" style={{ marginBottom: "1.5rem" }}>
        <div>
          <label className="ret-field-label" htmlFor="gl">Retirement goal</label>
          <div className="ret-input-wrap">
            <span className="ret-prefix">$</span>
            <input id="gl" className="ret-input" type="number" min="0" placeholder="1000000"
              value={goal} onChange={e => setGoal(e.target.value)} />
          </div>
          <p className="ret-field-hint">Total nest egg needed at retirement</p>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: ".4rem" }}>
          <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.6 }}>
            Not sure of your goal? A common rule of thumb is 25× your expected annual retirement spending — e.g. $40,000/year × 25 = $1,000,000.
          </p>
        </div>
      </div>

      {ca > 0 && ra > ca && gl > 0 && (
        <>
          <div className={"ret-result-hero " + (onTrack ? "on-track" : "gap")}>
            <p className="ret-result-label">{onTrack ? "Projected surplus" : "Savings gap"}</p>
            <p className={"ret-result-val " + (onTrack ? "green" : "amber")}>
              {onTrack ? "+" : "−"}{fmtM(Math.abs(gap))}
            </p>
            <p className="ret-result-sub">
              {onTrack
                ? "You're on track — your projected " + fmtM(totalProjected) + " exceeds your " + fmtM(gl) + " goal by " + fmtM(Math.abs(gap)) + "."
                : "Your projected " + fmtM(totalProjected) + " falls short of your " + fmtM(gl) + " goal. See the fixes below."}
            </p>
          </div>

          <div className="ret-result-grid">
            <div className="ret-result-cell">
              <p className="ret-result-cell-label">Projected at retirement</p>
              <p className="ret-result-cell-val purple">{fmtM(totalProjected)}</p>
            </div>
            <div className="ret-result-cell">
              <p className="ret-result-cell-label">Inflation-adjusted value</p>
              <p className="ret-result-cell-val">{fmtM(realProjected)}</p>
            </div>
            <div className="ret-result-cell">
              <p className="ret-result-cell-label">Years to grow</p>
              <p className="ret-result-cell-val">{years} yrs</p>
            </div>
          </div>

          <div className="ret-progress-section">
            <div className="ret-progress-label">
              <span>Progress toward goal</span>
              <span>{Math.min(Math.round((totalProjected / gl) * 100), 100)}% funded</span>
            </div>
            <div className="ret-progress-track">
              <div className="ret-progress-savings" style={{ width: savingsPct + "%" }} />
              <div className="ret-progress-contributions" style={{ width: contribPct + "%" }} />
              <div className="ret-progress-gap" style={{ width: gapPct + "%" }} />
            </div>
            <div className="ret-progress-legend">
              <span><span className="ret-legend-dot" style={{ background: "#1a1a1a" }} />Existing savings: {fmtM(fvSavings)}</span>
              <span><span className="ret-legend-dot" style={{ background: "#7c3aed" }} />Future contributions: {fmtM(fvContribs)}</span>
              {!onTrack && <span><span className="ret-legend-dot" style={{ background: "#e0dbd3" }} />Gap: {fmtM(gap)}</span>}
            </div>
          </div>

          {milestones.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p className="ret-section-title" style={{ fontSize: "1rem", marginBottom: ".75rem" }}>Balance milestones</p>
              <div className="ret-milestone-list">
                {milestones.map((m, i) => (
                  <div className="ret-milestone-row" key={i}>
                    <span className="ret-milestone-age">Age {m.age}</span>
                    <span className="ret-milestone-label">{m.age === ra ? "Retirement" : (m.age - ca) + " years from now"}</span>
                    <div className="ret-milestone-bar-wrap">
                      <div className="ret-milestone-bar" style={{ width: m.pct + "%" }} />
                    </div>
                    <span className="ret-milestone-val">{fmtM(m.val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!onTrack && (
            <div className="ret-fix-section">
              <p className="ret-fix-title">Ways to close the gap</p>
              <div className="ret-fix-grid">
                <div className="ret-fix-cell">
                  <p className="ret-fix-label">Increase monthly contribution to</p>
                  <p className="ret-fix-val">{fmt(totalMonthlyNeeded)}<span style={{ fontSize: "1rem", color: "#aaa" }}>/mo</span></p>
                  <p className="ret-fix-sub">An extra {fmt(neededMonthly)}/month on top of your current {fmt(mo)}/month</p>
                </div>
                <div className="ret-fix-cell">
                  <p className="ret-fix-label">Or retire later by</p>
                  <p className="ret-fix-val">
                    {extraYears !== null ? extraYears + " yr" + (extraYears !== 1 ? "s" : "") : "30+ yrs"}
                  </p>
                  <p className="ret-fix-sub">
                    {extraYears !== null
                      ? "Retiring at age " + (ra + extraYears) + " with your current savings rate would close the gap."
                      : "Gap too large to close by delaying retirement alone — consider increasing contributions."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}