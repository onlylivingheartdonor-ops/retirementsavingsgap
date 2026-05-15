"use client"

import { useState } from "react"

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #faf8f4; font-family: 'DM Mono', monospace; color: #1a1a1a; }
  .ret-wrap { max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem; }
  .ret-header { border-bottom: 2px solid #1a1a1a; padding-bottom: 1.5rem; margin-bottom: 2rem; }
  .ret-eyebrow { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: #888; margin-bottom: .5rem; }
  .ret-title { font-family: 'DM Serif Display', serif; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1; }
  .ret-title em { font-style: italic; color: #7c3aed; }
  .ret-card { background: #fff; border: 1px solid #e0dbd3; border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .ret-section-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; margin-bottom: 1rem; color: #1a1a1a; }

  .ret-field-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .ret-field-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 1.25rem; }
  .ret-field-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; display: block; margin-bottom: .4rem; }
  .ret-field-hint { font-size: 12px; color: #888; margin-top: .3rem; line-height: 1.5; }
  .ret-input-wrap { position: relative; }
  .ret-prefix { position: absolute; left: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .ret-suffix { position: absolute; right: 0; top: .4rem; font-size: 1rem; color: #aaa; }
  .ret-input { width: 100%; border: none; border-bottom: 1.5px solid #e0dbd3; background: transparent; font-family: 'DM Mono', monospace; font-size: 1.1rem; color: #1a1a1a; padding: .4rem 1.2rem .4rem 1.2rem; outline: none; transition: border-color .2s; }
  .ret-input.no-prefix { padding-left: 0; }
  .ret-input:focus { border-color: #7c3aed; }

  .ret-result-hero { border-radius: 4px; padding: 1.5rem; margin-bottom: 1.5rem; text-align: center; }
  .ret-result-hero.on-track { background: #f5f3ff; border: 1px solid #ddd6fe; }
  .ret-result-hero.gap { background: #fff7ed; border: 1px solid #fed7aa; }
  .ret-result-label { font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: #888; margin-bottom: .4rem; }
  .ret-result-val { font-family: 'DM Serif Display', serif; font-size: 3.2rem; line-height: 1; }
  .ret-result-val.purple { color: #7c3aed; }
  .ret-result-val.amber { color: #b45309; }
  .ret-result-val.green { color: #166534; }
  .ret-result-sub { font-size: 12px; color: #888; margin-top: .5rem; line-height: 1.6; }

  .ret-result-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px; background: #e0dbd3; border: 1px solid #e0dbd3; border-radius: 2px; overflow: hidden; margin-bottom: 1.5rem; }
  .ret-result-cell { background: #fff; padding: 1rem 1.1rem; }
  .ret-result-cell-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .3rem; }
  .ret-result-cell-val { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: #1a1a1a; }
  .ret-result-cell-val.purple { color: #7c3aed; }
  .ret-result-cell-val.green { color: #166534; }
  .ret-result-cell-val.red { color: #b91c1c; }

  .ret-progress-section { margin-bottom: 1.5rem; }
  .ret-progress-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .5rem; display: flex; justify-content: space-between; }
  .ret-progress-track { height: 12px; background: #e0dbd3; border-radius: 6px; overflow: hidden; margin-bottom: .4rem; }
  .ret-progress-savings { height: 100%; background: #1a1a1a; display: inline-block; border-radius: 6px 0 0 6px; transition: width .6s; }
  .ret-progress-contributions { height: 100%; background: #7c3aed; display: inline-block; transition: width .6s; }
  .ret-progress-gap { height: 100%; background: #e0dbd3; display: inline-block; border-radius: 0 6px 6px 0; }
  .ret-progress-legend { display: flex; gap: 1.25rem; font-size: 11px; color: #888; flex-wrap: wrap; }
  .ret-legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: .3rem; vertical-align: middle; }

  .ret-fix-section { border: 1.5px dashed #ddd6fe; border-radius: 4px; padding: 1.25rem; margin-bottom: 1rem; }
  .ret-fix-title { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #7c3aed; margin-bottom: .75rem; }
  .ret-fix-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .ret-fix-cell { }
  .ret-fix-label { font-size: 11px; color: #888; margin-bottom: .2rem; }
  .ret-fix-val { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #7c3aed; }
  .ret-fix-sub { font-size: 11px; color: #aaa; margin-top: .15rem; line-height: 1.4; }

  .ret-milestone-list { display: flex; flex-direction: column; gap: .4rem; margin-bottom: 1rem; }
  .ret-milestone-row { display: flex; align-items: center; gap: .75rem; padding: .55rem .9rem; background: #faf8f4; border-radius: 2px; font-size: 12px; }
  .ret-milestone-age { font-family: 'DM Serif Display', serif; font-size: 1rem; color: #7c3aed; min-width: 3rem; }
  .ret-milestone-label { flex: 1; color: #555; }
  .ret-milestone-val { color: #1a1a1a; font-weight: 500; }
  .ret-milestone-bar-wrap { width: 80px; height: 3px; background: #e0dbd3; border-radius: 2px; overflow: hidden; }
  .ret-milestone-bar { height: 100%; background: #7c3aed; border-radius: 2px; }

  .ret-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .ret-info-item { padding: .75rem; border-left: 2px solid #ddd6fe; }
  .ret-info-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .ret-info-body { font-size: 12px; color: #888; line-height: 1.5; }

  .ret-prose p { font-size: 13px; color: #444; line-height: 1.7; margin-bottom: .75rem; }
  .ret-prose p:last-child { margin-bottom: 0; }
  .ret-prose ul { font-size: 13px; color: #444; line-height: 1.8; padding-left: 1.2rem; margin-bottom: .75rem; }
  .ret-prose ul li { margin-bottom: .3rem; }

  .ret-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .ret-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #ddd6fe; line-height: 1; margin-bottom: .4rem; }
  .ret-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .ret-tip-body { font-size: 12px; color: #888; line-height: 1.5; }

  .ret-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .ret-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .ret-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .ret-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .ret-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .ret-footer-links a { color: #888; text-decoration: underline; }

  @media (max-width: 600px) {
    .ret-field-row { grid-template-columns: 1fr 1fr; }
    .ret-field-row-2 { grid-template-columns: 1fr; }
    .ret-result-grid { grid-template-columns: 1fr; }
    .ret-fix-grid, .ret-info-grid, .ret-tip-grid { grid-template-columns: 1fr; }
  }
`

const RELATED = [
  { label: "Credit Card Debt Payoff Calculator",  href: "https://creditcarddebtpayoffcalculator.com" },
  { label: "Debt Reducing Calculator",            href: "https://debtreducingcalculator.com" },
  { label: "Side Hustle Tax Estimator",           href: "https://sidehustletaxestimator.com" },
  { label: "High Yield Savings Calculator",       href: "https://highyieldsavingscalculator.com" },
  { label: "Retirement Savings Gap",              href: "https://retirementsavingsgap.com" },
  { label: "Life Insurance Coverage Calculator",  href: "https://lifeinsurancecoveragecalculator.com" },
  { label: "Online Course ROI Calculator",        href: "https://onlinecourseroi.com" },
  { label: "Subscription Cost Calculator",        href: "https://mysubscriptioncost.com" },
  { label: "Email Attachment Size Checker",       href: "https://emailattachmentsize.com" },
  { label: "GPA Calculator",                      href: "https://gpacalculator.site" },
  { label: "YouTube Title Checker",               href: "https://youtubetitlechecker.com" },
  { label: "Strong Password Builder",             href: "https://strongpasswordbuilder.com" },
  { label: "Cool Username Generator",             href: "https://coolusernamegenerator.com" },
]

function fmtM(n) {
  if (Math.abs(n) >= 1000000) return "$" + (n / 1000000).toFixed(2) + "M"
  if (Math.abs(n) >= 1000) return "$" + Math.round(n).toLocaleString("en-US")
  return "$" + Math.round(n)
}
function fmt(n) { return "$" + Math.round(Math.abs(n)).toLocaleString("en-US") }

function fv(pv, r, n) { return pv * Math.pow(1 + r, n) }
function fvContrib(pmt, r, n) { return r === 0 ? pmt * n : pmt * ((Math.pow(1 + r, n) - 1) / r) }

export default function Page() {
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
  const mr     = rr / 100 / 12   // monthly rate
  const ar     = rr / 100        // annual rate

  const fvSavings      = fv(sv, ar, years)
  const fvContribs     = fvContrib(mo, mr, months)
  const totalProjected = fvSavings + fvContribs
  const gap            = gl - totalProjected
  const onTrack        = gap <= 0

  // Real (inflation-adjusted) value of projected savings
  const realProjected = totalProjected / Math.pow(1 + inf / 100, years)

  // Monthly needed to close gap
  const neededMonthly = gap > 0 && mr > 0
    ? gap / ((Math.pow(1 + mr, months) - 1) / mr)
    : 0
  const totalMonthlyNeeded = mo + (gap > 0 ? neededMonthly : 0)

  // Years to retire later to close gap with current savings rate
  const extraYears = (() => {
    if (onTrack) return 0
    for (let extra = 1; extra <= 30; extra++) {
      const m = (years + extra) * 12
      const p = fv(sv, ar, years + extra) + fvContrib(mo, mr, m)
      if (p >= gl) return extra
    }
    return null
  })()

  // Progress bar widths
  const savingsPct      = gl > 0 ? Math.min((fvSavings / gl) * 100, 100) : 0
  const contribPct      = gl > 0 ? Math.min((fvContribs / gl) * 100, 100 - savingsPct) : 0
  const gapPct          = Math.max(0, 100 - savingsPct - contribPct)

  // Milestones: balance at age 40, 50, 60, retirement
  const milestones = [40, 50, 60, ra].filter(a => a > ca && a <= ra).map(age => {
    const y = age - ca
    const m = y * 12
    const val = fv(sv, ar, y) + fvContrib(mo, mr, m)
    return { age, val, pct: gl > 0 ? Math.min(Math.round(val / gl * 100), 100) : 0 }
  })

  return (
    <>
      <style>{css}</style>
      <main className="ret-wrap">

        <div className="ret-header">
          <p className="ret-eyebrow">Retirement Planning</p>
          <h1 className="ret-title">Retirement<br /><em>Savings Gap</em></h1>
        </div>

        {/* TOOL */}
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
              <div className={`ret-result-hero ${onTrack ? "on-track" : "gap"}`}>
                <p className="ret-result-label">{onTrack ? "Projected surplus" : "Savings gap"}</p>
                <p className={`ret-result-val ${onTrack ? "green" : "amber"}`}>
                  {onTrack ? "+" : "−"}{fmtM(Math.abs(gap))}
                </p>
                <p className="ret-result-sub">
                  {onTrack
                    ? `You're on track — your projected ${fmtM(totalProjected)} exceeds your ${fmtM(gl)} goal by ${fmtM(Math.abs(gap))}.`
                    : `Your projected ${fmtM(totalProjected)} falls short of your ${fmtM(gl)} goal. See the fixes below.`}
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
                  <div className="ret-progress-savings"      style={{ width: savingsPct + "%" }} />
                  <div className="ret-progress-contributions" style={{ width: contribPct + "%" }} />
                  <div className="ret-progress-gap"          style={{ width: gapPct + "%" }} />
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
                        <span className="ret-milestone-label">{m.age === ra ? "Retirement" : `${m.age - ca} years from now`}</span>
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
                        {extraYears !== null ? `${extraYears} yr${extraYears !== 1 ? "s" : ""}` : "30+ yrs"}
                      </p>
                      <p className="ret-fix-sub">
                        {extraYears !== null
                          ? `Retiring at age ${ra + extraYears} with your current savings rate would close the gap.`
                          : "Gap too large to close by delaying retirement alone — consider increasing contributions."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* HOW IT WORKS */}
        <div className="ret-card">
          <p className="ret-section-title">How this calculator works</p>
          <div className="ret-prose">
            <p>The calculator projects two things separately and adds them together: the future value of your existing savings (compounding at your expected annual return over the years until retirement), and the future value of your monthly contributions (using the standard annuity formula for regular payments growing at compound interest).</p>
            <p>The inflation adjustment shows what your projected balance will be worth in today&apos;s purchasing power — a more honest picture of what retirement looks like. A million dollars in 35 years buys considerably less than a million dollars today, and the inflation-adjusted figure accounts for that gap.</p>
            <p>If a gap exists, the calculator shows two paths to closing it: how much you would need to contribute monthly to hit your goal on schedule, and how many additional working years at your current savings rate would get you there instead.</p>
          </div>
          <div className="ret-info-grid">
            <div className="ret-info-item">
              <p className="ret-info-title">Expected return rate</p>
              <p className="ret-info-body">A diversified stock portfolio has historically returned 7–10% annually before inflation. 5–7% is a conservative estimate for a mixed portfolio. 3–4% is appropriate for conservative or bond-heavy allocations. Use what matches your actual investment strategy.</p>
            </div>
            <div className="ret-info-item">
              <p className="ret-info-title">The 25× rule</p>
              <p className="ret-info-body">A common retirement goal is 25× your expected annual spending — based on the 4% safe withdrawal rate, which suggests you can withdraw 4% of your portfolio annually with a high probability of not running out in a 30-year retirement.</p>
            </div>
            <div className="ret-info-item">
              <p className="ret-info-title">Why inflation matters</p>
              <p className="ret-info-body">At 3% annual inflation, purchasing power halves roughly every 24 years. A goal of $1M in nominal terms at retirement age 65 represents significantly less real spending power than $1M today — the inflation-adjusted figure shows the real value.</p>
            </div>
            <div className="ret-info-item">
              <p className="ret-info-title">What's not included</p>
              <p className="ret-info-body">Social Security income, pension benefits, part-time retirement income, inheritance, and variable return scenarios are not modeled. These can meaningfully reduce the savings needed — factor them in when setting your retirement goal.</p>
            </div>
          </div>
        </div>

        {/* WHY IT MATTERS */}
        <div className="ret-card">
          <p className="ret-section-title">Why most people have a retirement gap — and don&apos;t know it</p>
          <div className="ret-prose">
            <p>The retirement savings gap is one of the most common and least visible personal finance problems. Most people have a rough sense that they should be saving more, but without seeing the projected numbers side by side with a concrete goal, the shortfall stays abstract — and abstract problems are easy to defer.</p>
            <p>The gap tends to grow for three reasons: starting too late, contributing too little, and underestimating how much retirement actually costs. A 30-year-old who saves $500 a month at 7% will have roughly $1.3M at 65. The same person starting at 40 would need to save nearly $1,200 a month to reach the same balance — more than twice as much, for a decade less of contributions. The math of compound growth is dramatically time-sensitive.</p>
            <p>Seeing the gap — and the specific monthly contribution needed to close it — turns a vague anxiety into a concrete action. Even partial progress matters: closing half the gap through higher contributions and adjusting the retirement timeline slightly often produces a retirement that works.</p>
          </div>
        </div>

        {/* TIPS */}
        <div className="ret-card">
          <p className="ret-section-title">How to close your retirement gap</p>
          <div className="ret-tip-grid">
            <div>
              <p className="ret-tip-num">01</p>
              <p className="ret-tip-title">Max out tax-advantaged accounts first</p>
              <p className="ret-tip-body">A 401(k) or IRA contribution reduces your taxable income today and compounds tax-deferred or tax-free. In 2025, the 401(k) limit is $23,500 and the IRA limit is $7,000 — with higher catch-up limits for those 50 and older. These accounts should be filled before taxable investments.</p>
            </div>
            <div>
              <p className="ret-tip-num">02</p>
              <p className="ret-tip-title">Capture employer match in full</p>
              <p className="ret-tip-body">An employer 401(k) match is an immediate 50–100% return on your contribution — the highest guaranteed return available to most people. Contributing at least enough to capture the full match is almost always the right first move, regardless of other financial priorities.</p>
            </div>
            <div>
              <p className="ret-tip-num">03</p>
              <p className="ret-tip-title">Increase contributions with raises</p>
              <p className="ret-tip-body">Automatically increasing your savings rate by 1–2% each year — ideally timed with salary increases — is one of the most effective ways to grow retirement savings without feeling the lifestyle impact. Many 401(k) plans offer automatic escalation for exactly this purpose.</p>
            </div>
            <div>
              <p className="ret-tip-num">04</p>
              <p className="ret-tip-title">Don&apos;t cash out when changing jobs</p>
              <p className="ret-tip-body">Cashing out a 401(k) early triggers income taxes plus a 10% penalty, and permanently destroys the compounding potential of those funds. Rolling the balance into an IRA or new employer plan preserves the full amount and keeps the growth on track.</p>
            </div>
          </div>
        </div>

        {/* RELATED */}
        <div className="ret-card">
          <p className="ret-section-title">Related tools</p>
          <div className="ret-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="ret-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="ret-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Projections assume a fixed annual return and do not account for taxes, fees, Social Security, or pension income. Consult a qualified financial advisor for personalized retirement planning. This site may use cookies and analytics. By using this site, you agree to our Privacy Policy and Terms of Service.
            <div className="ret-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}
