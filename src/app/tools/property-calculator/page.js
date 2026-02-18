"use client";
import { useState } from "react";
import WhatsAppShare from "@/components/WhatsAppShare";
import ExpertCTA from "@/components/ExpertCTA";
import styles from "./page.module.css";

export default function PropertyCalculator() {
    const [purchasePrice, setPurchasePrice] = useState("");
    const [guidelineValue, setGuidelineValue] = useState("");
    const [buyerCategory, setBuyerCategory] = useState("male");
    const [deedType, setDeedType] = useState("sale");
    const [result, setResult] = useState(null);

    const formatCurrency = (num) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(num);
    };

    const formatInput = (val) => {
        const num = val.replace(/[^0-9]/g, "");
        if (!num) return "";
        return new Intl.NumberFormat("en-IN").format(Number(num));
    };

    const parseInput = (val) => {
        return Number(val.replace(/[^0-9]/g, ""));
    };

    const calculate = () => {
        const price = parseInput(purchasePrice);
        const guideline = parseInput(guidelineValue);

        if (!price && !guideline) return;

        const baseValue = Math.max(price || 0, guideline || 0);

        // Stamp duty rates
        let stampDutyRate = 0.07; // 7% default
        if (deedType === "gift" || deedType === "settlement") {
            stampDutyRate = 0.07;
        } else if (deedType === "partition") {
            stampDutyRate = 0.04;
        }

        // Female buyer concession (potential 2026 concessions)
        if (buyerCategory === "female" && deedType === "sale") {
            stampDutyRate = 0.07; // Same for now, can be updated for concessions
        }

        const stampDuty = Math.round(baseValue * stampDutyRate);
        const registrationFee = Math.round(baseValue * 0.04);
        const legalFees = baseValue > 2000000 ? 5000 : 2000;
        const miscCharges = 500;
        const totalCost = baseValue + stampDuty + registrationFee + legalFees + miscCharges;

        setResult({
            baseValue,
            stampDuty,
            stampDutyRate: (stampDutyRate * 100).toFixed(0),
            registrationFee,
            legalFees,
            miscCharges,
            totalCost,
        });
    };

    const reset = () => {
        setPurchasePrice("");
        setGuidelineValue("");
        setBuyerCategory("male");
        setDeedType("sale");
        setResult(null);
    };

    return (
        <>
            <section className={styles.toolHero}>
                <div className="container">
                    <span className="section-label">Tool 1</span>
                    <h1>TN Property Cost Calculator</h1>
                    <p>
                        Calculate the total &quot;on-road&quot; cost of buying property in Tamil Nadu
                        — including stamp duty, registration charges, and legal fees.
                    </p>
                </div>
            </section>

            <section className={`section ${styles.toolSection}`}>
                <div className={`container ${styles.toolLayout}`}>
                    <div className={styles.formPanel}>
                        <div className="card">
                            <h3 className={styles.formTitle}>Enter Property Details</h3>

                            <div className="form-group">
                                <label className="form-label">Purchase Price (₹)</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g. 50,00,000"
                                    value={purchasePrice}
                                    onChange={(e) => setPurchasePrice(formatInput(e.target.value))}
                                    inputMode="numeric"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Guideline Value (₹)</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="e.g. 45,00,000"
                                    value={guidelineValue}
                                    onChange={(e) => setGuidelineValue(formatInput(e.target.value))}
                                    inputMode="numeric"
                                />
                                <small className={styles.hint}>
                                    The higher of Purchase Price or Guideline Value is used for calculation.
                                </small>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Buyer Category</label>
                                <select
                                    className="form-select"
                                    value={buyerCategory}
                                    onChange={(e) => setBuyerCategory(e.target.value)}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="joint">Joint (Male + Female)</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Deed Type</label>
                                <select
                                    className="form-select"
                                    value={deedType}
                                    onChange={(e) => setDeedType(e.target.value)}
                                >
                                    <option value="sale">Sale Deed</option>
                                    <option value="gift">Gift Deed</option>
                                    <option value="settlement">Settlement Deed</option>
                                    <option value="partition">Partition Deed</option>
                                </select>
                            </div>

                            <div className={styles.formActions}>
                                <button className="btn btn-primary btn-lg" onClick={calculate}>
                                    Calculate Total Cost
                                </button>
                                <button className="btn btn-outline btn-sm" onClick={reset}>
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.resultPanel}>
                        {!result ? (
                            <div className={styles.placeholder}>
                                <span className={styles.placeholderIcon}>📊</span>
                                <h3>Your Results Will Appear Here</h3>
                                <p>Fill in the details and click &quot;Calculate&quot; to see the complete cost breakdown.</p>
                            </div>
                        ) : (
                            <div className="result-card animate-fade-in-up">
                                <h3 className={styles.resultTitle}>Cost Breakdown</h3>
                                <p className={styles.resultSubtitle}>
                                    Based on {formatCurrency(result.baseValue)} (higher value)
                                </p>

                                <div className="result-row">
                                    <span className="result-label">Property Value</span>
                                    <span className="result-value">{formatCurrency(result.baseValue)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">Stamp Duty ({result.stampDutyRate}%)</span>
                                    <span className="result-value">{formatCurrency(result.stampDuty)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">Registration Fee (4%)</span>
                                    <span className="result-value">{formatCurrency(result.registrationFee)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">Legal / Document Writer</span>
                                    <span className="result-value">{formatCurrency(result.legalFees)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">Misc. Charges (Est.)</span>
                                    <span className="result-value">{formatCurrency(result.miscCharges)}</span>
                                </div>
                                <div className="result-row">
                                    <span className="result-label">Total &quot;On-Road&quot; Cost</span>
                                    <span className="result-value">{formatCurrency(result.totalCost)}</span>
                                </div>

                                <div className={styles.shareRow}>
                                    <WhatsAppShare
                                        text={`🏠 Property Cost Breakdown (PlanPodu.in)\n\nProperty Value: ${formatCurrency(result.baseValue)}\nStamp Duty: ${formatCurrency(result.stampDuty)}\nRegistration: ${formatCurrency(result.registrationFee)}\nTotal Cost: ${formatCurrency(result.totalCost)}\n\nCalculate yours free at: https://planpodu.in/tools/property-calculator`}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <ExpertCTA />
        </>
    );
}
