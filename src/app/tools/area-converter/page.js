"use client";
import { useState, useMemo } from "react";
import WhatsAppShare from "@/components/WhatsAppShare";
import ExpertCTA from "@/components/ExpertCTA";
import styles from "../property-calculator/page.module.css";
import areaStyles from "./page.module.css";

const UNITS = [
    { key: "sqft", label: "Square Feet (Sq.Ft)", factor: 1 },
    { key: "sqm", label: "Square Metre (Sq.M)", factor: 10.7639 },
    { key: "cent", label: "Cent", factor: 435.6 },
    { key: "ground", label: "Ground", factor: 2400 },
    { key: "kuzhi", label: "Kuzhi", factor: 144 },
    { key: "acre", label: "Acre", factor: 43560 },
    { key: "hectare", label: "Hectare", factor: 107639.104 },
];

export default function AreaConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState("cent");

    const results = useMemo(() => {
        const num = parseFloat(value);
        if (!num || isNaN(num)) return null;

        const fromFactor = UNITS.find((u) => u.key === fromUnit)?.factor || 1;
        const sqft = num * fromFactor;

        return UNITS.map((unit) => ({
            key: unit.key,
            label: unit.label,
            value: sqft / unit.factor,
        }));
    }, [value, fromUnit]);

    const formatNumber = (num) => {
        if (num >= 1000000) return num.toLocaleString("en-IN", { maximumFractionDigits: 2 });
        if (num >= 1) return num.toLocaleString("en-IN", { maximumFractionDigits: 4 });
        return num.toFixed(6);
    };

    return (
        <>
            <section className={styles.toolHero}>
                <div className="container">
                    <span className="section-label">Tool 2</span>
                    <h1>Manai Adi &amp; Area Converter</h1>
                    <p>
                        Instantly convert between traditional Tamil Nadu land units and
                        modern measurements — Cent, Ground, Kuzhi, Acre, and more.
                    </p>
                </div>
            </section>

            <section className={`section ${styles.toolSection}`}>
                <div className="container">
                    <div className={areaStyles.converterCard}>
                        <div className={areaStyles.inputRow}>
                            <div className={areaStyles.inputField}>
                                <label className="form-label">Enter Value</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="e.g. 5"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    inputMode="decimal"
                                />
                            </div>
                            <div className={areaStyles.inputField}>
                                <label className="form-label">Select Unit</label>
                                <select
                                    className="form-select"
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(e.target.value)}
                                >
                                    {UNITS.map((unit) => (
                                        <option key={unit.key} value={unit.key}>
                                            {unit.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {results && (
                            <div className={`${areaStyles.resultsGrid} animate-fade-in-up`}>
                                <h3 className={areaStyles.resultsTitle}>
                                    Conversion Results for {value} {UNITS.find(u => u.key === fromUnit)?.label}
                                </h3>
                                <div className={areaStyles.grid}>
                                    {results
                                        .filter((r) => r.key !== fromUnit)
                                        .map((r) => (
                                            <div key={r.key} className={areaStyles.resultItem}>
                                                <span className={areaStyles.resultValue}>
                                                    {formatNumber(r.value)}
                                                </span>
                                                <span className={areaStyles.resultLabel}>{r.label}</span>
                                            </div>
                                        ))}
                                </div>
                                <div className={styles.shareRow}>
                                    <WhatsAppShare
                                        text={`📐 Area Conversion (PlanPodu.in)\n\n${value} ${UNITS.find(u => u.key === fromUnit)?.label} =\n${results.filter(r => r.key !== fromUnit).map(r => `• ${formatNumber(r.value)} ${r.label}`).join('\n')}\n\nConvert yours free at: https://planpodu.in/tools/area-converter`}
                                    />
                                </div>
                            </div>
                        )}

                        {!results && (
                            <div className={areaStyles.emptyState}>
                                <span>📐</span>
                                <p>Enter a value above to see instant conversions across all units</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <ExpertCTA />
        </>
    );
}
