import RetirementCalculator from "./RetirementCalculator"
import { RELATED_LINKS as RELATED } from "./lib/links"

const staticCss = `
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
  .ret-faq-item { border-bottom: 1px solid #e0dbd3; padding: 1rem 0; }
  .ret-faq-item:last-child { border-bottom: none; padding-bottom: 0; }
  .ret-faq-q { font-size: 13px; font-weight: 500; color: #1a1a1a; margin-bottom: .4rem; }
  .ret-faq-a { font-size: 13px; color: #555; line-height: 1.7; }
  .ret-tip-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .ret-tip-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #ddd6fe; line-height: 1; margin-bottom: .4rem; }
  .ret-tip-title { font-size: 12px; font-weight: 500; color: #1a1a1a; margin-bottom: .25rem; }
  .ret-tip-body { font-size: 12px; color: #888; line-height: 1.5; }
  .sub-nav { font-size: 12px; margin-bottom: 1.5rem; }
  .sub-nav a { color: #7c3aed; text-decoration: none; }
  .sub-nav a:hover { text-decoration: underline; }
  .ret-realworld { background: #f5f3ff; border: 1px solid #ddd6fe; border-radius: 4px; padding: 1.25rem; margin-bottom: 1.5rem; }
  .ret-realworld-title { font-size: 13px; font-weight: 600; color: #5b21b6; margin-bottom: .5rem; }
  .ret-realworld-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: .75rem; }
  .ret-realworld-cell { background: #fff; border-radius: 3px; padding: .9rem 1rem; }
  .ret-realworld-cell-label { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .2rem; }
  .ret-realworld-cell-val { font-family: 'DM Serif Display', serif; font-size: 1.3rem; color: #7c3aed; }
  .ret-realworld-cell-sub { font-size: 11px; color: #888; margin-top: .2rem; }
  .ret-related-links { display: flex; flex-wrap: wrap; gap: .5rem; }
  .ret-related-label { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: #888; margin-bottom: .75rem; }
  .ret-related-link { font-size: 12px; padding: .35rem .75rem; border: 1px solid #e0dbd3; border-radius: 2px; color: #555; text-decoration: none; transition: all .15s; display: inline-block; }
  .ret-related-link:hover { border-color: #1a1a1a; color: #1a1a1a; }
  .ret-disclaimer { font-size: 11px; color: #888; line-height: 1.6; border-top: 1px solid #e0dbd3; padding-top: 1rem; margin-top: 1rem; }
  .ret-footer-links { display: flex; gap: 1rem; font-size: 11px; margin-top: .75rem; }
  .ret-footer-links a { color: #888; text-decoration: underline; }
  @media (max-width: 600px) {
    .ret-field-row { grid-template-columns: 1fr 1fr; }
    .ret-field-row-2 { grid-template-columns: 1fr; }
    .ret-result-grid { grid-template-columns: 1fr; }
    .ret-fix-grid, .ret-info-grid, .ret-tip-grid, .ret-realworld-row { grid-template-columns: 1fr; }
  }
`

const FAQ = [
  {
    q: "What's a realistic annual return for retirement savings?",
    a: "A diversified portfolio of stocks and bonds has historically returned 7-10% annually before inflation. For planning purposes, many financial advisors use 7% as a reasonable long-term average. Use a lower rate (5-6%) for a more conservative projection, or a higher rate (8-9%) if you're aggressively invested. What matters most is consistency — the same rate applied over decades has enormous compounding effects either way."
  },
  {
    q: "How do I know my retirement goal number?",
    a: "The 25x rule is a common starting point: multiply your expected annual retirement spending by 25. This assumes you'll withdraw 4% of your portfolio annually, which historically has a high probability of lasting 30 years. If you spend $50,000/year, you need $1.25M. If you spend $80,000/year, you need $2M. Adjust up if you plan to retire early (longer horizon) or down if you have significant Social Security or pension income."
  },
  {
    q: "What's the difference between nominal and inflation-adjusted?",
    a: "Nominal dollars are the actual dollar amounts at the time — $1M in 2050 looks like $1M on paper. Inflation-adjusted dollars show what that $1M would actually buy in today's purchasing power. At 3% inflation, $1M in 2050 is worth roughly $400,000 in today's dollars. The inflation-adjusted figure is often more useful for planning because it tells you what your retirement lifestyle will actually feel like."
  },
  {
    q: "Should I include Social Security in my retirement goal?",
    a: "This calculator does not include Social Security — it shows the savings gap you need to fill from your own investments. Social Security benefits can reduce the required nest egg significantly. The average retired worker receives roughly $1,800/month as of 2025. Subtract your expected Social Security benefit from your annual spending goal before applying the 25x rule for a more accurate target."
  },
  {
    q: "What if I can't save the recommended monthly amount?",
    a: "Partial progress still matters. Saving half the recommended amount is far better than saving nothing. The calculator's 'Retire later' option shows the second path: working a few extra years at your current savings rate. Many people find a combination of modestly higher savings and a modestly later retirement to be the most achievable path — closing the gap doesn't require doing all of one thing."
  },
  {
    q: "How often should I update my retirement projections?",
    a: "Review annually, or whenever you have a major life change — salary increase, inheritance, market downturn, or change in retirement goals. The projections are most valuable as a tool to see whether you're trending in the right direction, not as a precise prediction. A yearly check-in takes 10 minutes and keeps the goal visible."
  }
]

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: staticCss }} />
      <main className="ret-wrap">

        <p className="sub-nav"><a href="https://moneywisecalculator.com">← More free tools at MoneyWise Calculator</a></p>

        <div className="ret-header">
          <p className="ret-eyebrow">Retirement Planning</p>
          <h1 className="ret-title">Retirement<br /><em>Savings Gap</em></h1>
        </div>

        <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.7", marginBottom: "1.5rem" }}>
          Free tool to calculate your retirement savings gap. See if you're on track, how much more you need to save monthly, and what retiring later would do for your plan.
        </p>

        <RetirementCalculator />

        {/* HOW IT WORKS */}
        <div className="ret-card">
          <p className="ret-section-title">How this calculator works</p>
          <div className="ret-prose">
            <p>The calculator projects two things separately and adds them together: the future value of your existing savings (compounding at your expected annual return over the years until retirement), and the future value of your monthly contributions (using the standard annuity formula for regular payments growing at compound interest).</p>
            <p>The inflation adjustment shows what your projected balance will be worth in today's purchasing power — a more honest picture of what retirement looks like. A million dollars in 35 years buys considerably less than a million dollars today, and the inflation-adjusted figure accounts for that gap.</p>
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
          <p className="ret-section-title">Why most people have a retirement gap — and don't know it</p>
          <div className="ret-prose">
            <p>The retirement savings gap is one of the most common and least visible personal finance problems. Most people have a rough sense that they should be saving more, but without seeing the projected numbers side by side with a concrete goal, the shortfall stays abstract — and abstract problems are easy to defer.</p>
            <p>The gap tends to grow for three reasons: starting too late, contributing too little, and underestimating how much retirement actually costs. A 30-year-old who saves $500 a month at 7% will have roughly $1.3M at 65. The same person starting at 40 would need to save nearly $1,200 a month to reach the same balance — more than twice as much, for a decade less of contributions. The math of compound growth is dramatically time-sensitive.</p>
            <p>Seeing the gap — and the specific monthly contribution needed to close it — turns a vague anxiety into a concrete action. Even partial progress matters: closing half the gap through higher contributions and adjusting the retirement timeline slightly often produces a retirement that works.</p>
          </div>
        </div>

        {/* REAL-WORLD EXAMPLE */}
        <div className="ret-realworld">
          <p className="ret-realworld-title">📊 Real-world example: Two savers, same goal, different outcomes</p>
          <div className="ret-realworld-row">
            <div className="ret-realworld-cell">
              <p className="ret-realworld-cell-label">Starts at 25</p>
              <p className="ret-realworld-cell-val">$500/mo</p>
              <p className="ret-realworld-cell-sub">= $1.4M at 65 · Total contributed: $240K</p>
            </div>
            <div className="ret-realworld-cell">
              <p className="ret-realworld-cell-label">Starts at 35</p>
              <p className="ret-realworld-cell-val">$1,000/mo</p>
              <p className="ret-realworld-cell-sub">= $1.4M at 65 · Total contributed: $360K</p>
            </div>
          </div>
          <div className="ret-realworld-row">
            <div className="ret-realworld-cell">
              <p className="ret-realworld-cell-label">Starts at 45</p>
              <p className="ret-realworld-cell-val">$2,200/mo</p>
              <p className="ret-realworld-cell-sub">= $1.4M at 65 · Total contributed: $528K</p>
            </div>
            <div className="ret-realworld-cell">
              <p className="ret-realworld-cell-label">Starts at 55</p>
              <p className="ret-realworld-cell-val">$7,000/mo</p>
              <p className="ret-realworld-cell-sub">= $1.4M at 65 · Total contributed: $840K</p>
            </div>
          </div>
          <p style={{ fontSize: "12px", color: "#5b21b6", marginTop: ".75rem" }}>
            The same $1.4M retirement goal costs a 25-year-old $240K in lifetime contributions, but a 55-year-old $840K — over 3x more. Starting early is the single most powerful factor.
          </p>
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
              <p className="ret-tip-title">Don't cash out when changing jobs</p>
              <p className="ret-tip-body">Cashing out a 401(k) early triggers income taxes plus a 10% penalty, and permanently destroys the compounding potential of those funds. Rolling the balance into an IRA or new employer plan preserves the full amount and keeps the growth on track.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="ret-card">
          <p className="ret-section-title">Frequently asked questions</p>
          {FAQ.map((item, i) => (
            <div className="ret-faq-item" key={i}>
              <p className="ret-faq-q">{item.q}</p>
              <p className="ret-faq-a">{item.a}</p>
            </div>
          ))}
        </div>

        {/* RELATED TOOLS */}
        <div className="ret-card">
          <p className="ret-section-title">Related tools</p>
          <p className="ret-related-label">More free tools from the MoneyWise Calculator network</p>
          <div className="ret-related-links">
            {RELATED.map((r, i) => (
              <a key={i} className="ret-related-link" href={r.href}>{r.label}</a>
            ))}
          </div>
          <div className="ret-disclaimer">
            This tool provides estimates for informational purposes only and does not constitute financial advice. Results assume a fixed interest rate and fixed monthly payment for the full repayment period. This site uses cookies and analytics. By using this site, you agree to our{" "}
            <a href="/privacy" style={{ color: "#888" }}>Privacy Policy</a> and{" "}
            <a href="/terms" style={{ color: "#888" }}>Terms of Service</a>.
            <div className="ret-footer-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://moneywisecalculator.com">MoneyWise Calculator</a>
            </div>
          </div>
        </div>

      </main>
    </>
  )
}