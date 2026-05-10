"use client"

import { useState } from "react"

export default function Page() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentSavings, setCurrentSavings] = useState(20000)
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [expectedReturn, setExpectedReturn] = useState(5)
  const [retirementGoal, setRetirementGoal] = useState(1000000)

  const yearsToGrow = retirementAge - currentAge
  const monthsToGrow = yearsToGrow * 12

  const futureValueSavings =
    currentSavings *
    Math.pow(1 + expectedReturn / 100, yearsToGrow)

  const futureValueContributions =
    monthlyContribution *
    ((Math.pow(1 + expectedReturn / 100 / 12, monthsToGrow) - 1) /
      (expectedReturn / 100 / 12))

  const totalProjected = futureValueSavings + futureValueContributions
  const gap = retirementGoal - totalProjected

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem",
        background: "#f4f6fb",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
    >
      {/* TOOL */}
      <div
        style={{
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "1.5rem"
        }}
      >
        <h1>Retirement Savings Gap Calculator</h1>

        <p>
          Estimate how much you may be short for retirement and how much you need
          to save monthly to reach your goal.
        </p>

        <div style={{ marginTop: "1.5rem" }}>
          <label>Current Age</label>
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />

          <label>Target Retirement Age</label>
          <input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />

          <label>Current Savings</label>
          <input
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(Number(e.target.value))}
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />

          <label>Monthly Contribution</label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) =>
              setMonthlyContribution(Number(e.target.value))
            }
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />

          <label>Expected Annual Return (%)</label>
          <input
            type="number"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
          />

          <label>Retirement Goal</label>
          <input
            type="number"
            value={retirementGoal}
            onChange={(e) => setRetirementGoal(Number(e.target.value))}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <p><strong>Projected Savings at Retirement:</strong> ${totalProjected.toFixed(0)}</p>
          <p><strong>Retirement Goal:</strong> ${retirementGoal.toFixed(0)}</p>
          <p><strong>Gap:</strong> ${gap > 0 ? gap.toFixed(0) : 0}</p>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div
        style={{
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "1.5rem"
        }}
      >
        <h2>How This Works</h2>
        <p>
          This calculator estimates future savings using compound growth on your
          current savings and monthly contributions. The gap shows how far you
          may be from your target retirement goal.
        </p>
      </div>

      {/* RELATED TOOLS */}
      <div
        style={{
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "10px",
          marginBottom: "1.5rem"
        }}
      >
       <div
  style={{
    background: "#ffffff",
    padding: "1.5rem",
    borderRadius: "10px",
    marginBottom: "1.5rem"
  }}
>
  <h2>Related Tools</h2>
  <ul>
    <li onClick={() => window.location.href = "https://creditcarddebtpayoffcalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Credit Card Debt Payoff Calculator
    </li>
    <li onClick={() => window.location.href = "https://debtreducingcalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Debt Reducing Calculator
    </li>
    <li onClick={() => window.location.href = "https://sidehustletaxestimator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Side Hustle Tax Estimator
    </li>
    <li onClick={() => window.location.href = "https://highyieldsavingscalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      High Yield Savings Calculator
    </li>
    <li onClick={() => window.location.href = "https://retirementsavingsgap.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Retirement Savings Gap
    </li>
    <li onClick={() => window.location.href = "https://lifeinsurancecoveragecalculator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Life Insurance Coverage Calculator
    </li>
    <li onClick={() => window.location.href = "https://onlinecourseroi.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Online Course ROI Calculator
    </li>
    <li onClick={() => window.location.href = "https://mysubscriptioncost.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Subscription Cost Calculator
    </li>
    <li onClick={() => window.location.href = "https://emailattachmentsize.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Email Attachment Size Checker
    </li>
    <li onClick={() => window.location.href = "https://gpacalculator.site"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      GPA Calculator
    </li>
    <li onClick={() => window.location.href = "https://youtubetitlechecker.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      YouTube Title Checker
    </li>
    <li onClick={() => window.location.href = "https://strongpasswordbuilder.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Strong Password Builder
    </li>
    <li onClick={() => window.location.href = "https://coolusernamegenerator.com"} style={{ cursor: "pointer", textDecoration: "underline" }}>
      Cool Username Generator
    </li>
  </ul>
</div>
      </div>

      {/* DISCLAIMER + FOOTER */}
      <div style={{ fontSize: "0.9rem", color: "#555", marginBottom: "1rem" }}>
        This tool provides estimates for informational purposes only and does not constitute financial advice.
      </div>

      <div style={{ fontSize: "0.9rem" }}>
        <span
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => window.location.href = "/privacy"}
        >
          Privacy Policy
        </span>
        {" | "}
        <span
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => window.location.href = "/terms"}
        >
          Terms of Service
        </span>
      </div>
    </main>
  )
}
``