"use client";
import { useState, useMemo, useRef } from "react";
import WhatsAppShare from "@/components/WhatsAppShare";
import ExpertCTA from "@/components/ExpertCTA";
import {
    TN_DISTRICTS,
    DOCUMENT_CHECKLIST,
    DEEMED_NOC_TIMELINES,
    LAND_TYPES,
    NOC_TRIGGERS,
} from "@/data/tn-districts";
import styles from "./page.module.css";

const TOTAL_STEPS = 5;

export default function JurisdictionFinder() {
    // Step 1 state
    const [district, setDistrict] = useState("");
    const [taluk, setTaluk] = useState("");
    const [village, setVillage] = useState("");

    // Step 2 state
    const [landType, setLandType] = useState("");

    // Step 5 state
    const [nocAnswers, setNocAnswers] = useState({
        railway: null,
        airport: null,
        coastal: null,
    });

    // Navigation
    const [currentStep, setCurrentStep] = useState(1);
    const [showReport, setShowReport] = useState(false);

    // PDF / Lead
    const [showLeadModal, setShowLeadModal] = useState(false);
    const [leadName, setLeadName] = useState("");
    const [leadPhone, setLeadPhone] = useState("");
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const reportRef = useRef(null);

    // Collapsible sections
    const [expandedSections, setExpandedSections] = useState({
        action: true,
        nocs: false,
        timeline: false,
        documents: false,
    });

    const toggleSection = (key) => {
        setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    // Derived data
    const selectedDistrict = useMemo(
        () => TN_DISTRICTS.find((d) => d.name === district),
        [district]
    );

    const taluks = selectedDistrict?.taluks || [];

    const jurisdiction = useMemo(() => {
        if (!selectedDistrict) return null;
        if (selectedDistrict.cma === true) {
            if (selectedDistrict.cmaTaluks) {
                return selectedDistrict.cmaTaluks.includes(taluk) ? "CMDA" : "DTCP";
            }
            return "CMDA";
        }
        return "DTCP";
    }, [selectedDistrict, taluk]);

    const selectedLandType = LAND_TYPES.find((l) => l.key === landType);

    const triggeredNocs = NOC_TRIGGERS.filter(
        (t) => nocAnswers[t.key] === true
    );

    const estimatedTimeline = useMemo(() => {
        let days = 30;
        if (selectedLandType?.key === "agricultural") days += 60;
        if (selectedLandType?.key === "unapproved") days += 45;
        if (selectedLandType?.key === "redevelopment") days += 15;
        triggeredNocs.forEach((n) => {
            const maxDays = parseInt(n.timeline) || 30;
            days += maxDays;
        });
        const min = days;
        const max = days + 15;
        return { min, max, text: `${min}–${max} Working Days` };
    }, [selectedLandType, triggeredNocs]);

    const canProceed = () => {
        switch (currentStep) {
            case 1: return district && taluk;
            case 2: return landType !== "";
            case 3: return true;
            case 4: return true;
            case 5: return Object.values(nocAnswers).every((v) => v !== null);
            default: return false;
        }
    };

    const nextStep = () => {
        if (currentStep < TOTAL_STEPS) setCurrentStep(currentStep + 1);
        else setShowReport(true);
    };

    const prevStep = () => {
        if (showReport) setShowReport(false);
        else if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const resetAll = () => {
        setDistrict("");
        setTaluk("");
        setVillage("");
        setLandType("");
        setNocAnswers({ railway: null, airport: null, coastal: null });
        setCurrentStep(1);
        setShowReport(false);
        setLeadSubmitted(false);
        setLeadName("");
        setLeadPhone("");
    };

    const generateWhatsAppText = () => {
        const lines = [
            `📋 PlanPodu Report`,
            `━━━━━━━━━━━━━━━━`,
            `📍 Location: ${village ? village + ", " : ""}${taluk}, ${district}`,
            `🏛️ Authority: ${jurisdiction}${jurisdiction === "DTCP" ? ` (${district} Office)` : " (Chennai)"}`,
            `🏷️ Land Type: ${selectedLandType?.label}`,
            ``,
        ];
        if (selectedLandType?.warning) {
            lines.push(`⚠️ Primary Task: ${selectedLandType?.action}`);
            lines.push(``);
        }
        if (triggeredNocs.length > 0) {
            lines.push(`📄 Extra NOCs Required:`);
            triggeredNocs.forEach((n) => lines.push(`  • ${n.noc} (${n.department})`));
            lines.push(``);
        }
        lines.push(`⏱️ Est. Timeline: ${estimatedTimeline.text} (Single Window System)`);
        lines.push(``);
        lines.push(`💡 Pro-Tip: Ensure road width ≥ 4.8m (16 ft) for residential layout.`);
        lines.push(``);
        lines.push(`Check yours free at planpodu.in/tools/jurisdiction-finder`);
        return lines.join("\n");
    };

    // PDF / Print handler
    const handleDownloadPDF = () => {
        setShowLeadModal(true);
    };

    const handleLeadSubmit = (e) => {
        e.preventDefault();
        if (!leadName.trim() || !leadPhone.trim()) return;

        // In production, send lead data to API
        console.log("Lead captured:", { name: leadName, phone: leadPhone });
        setLeadSubmitted(true);

        // Trigger print after a brief moment
        setTimeout(() => {
            setShowLeadModal(false);
            window.print();
        }, 800);
    };

    // Count "status" items
    const statusItems = [];
    if (selectedLandType?.warning) statusItems.push({ type: "warn", text: selectedLandType.action });
    if (triggeredNocs.length > 0) statusItems.push({ type: "info", text: `${triggeredNocs.length} additional NOC(s) required` });
    if (!selectedLandType?.warning && triggeredNocs.length === 0) statusItems.push({ type: "ok", text: "No extra requirements — proceed with standard approval" });

    // ─── RENDER ──────────────────────────────────────────
    if (showReport) {
        return (
            <>
                {/* Lead Capture Modal */}
                {showLeadModal && (
                    <div className={styles.modalOverlay} onClick={() => setShowLeadModal(false)}>
                        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                            {!leadSubmitted ? (
                                <>
                                    <div className={styles.modalHeader}>
                                        <h3>📄 Download Your Report</h3>
                                        <button className={styles.modalClose} onClick={() => setShowLeadModal(false)}>✕</button>
                                    </div>
                                    <p className={styles.modalDesc}>
                                        Enter your details to download the PDF report. We&apos;ll also notify you about any regulation changes.
                                    </p>
                                    <form onSubmit={handleLeadSubmit} className={styles.leadForm}>
                                        <div className="form-group">
                                            <label className="form-label">Your Name *</label>
                                            <input
                                                className="form-input"
                                                type="text"
                                                placeholder="e.g. Rajesh Kumar"
                                                value={leadName}
                                                onChange={(e) => setLeadName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Phone Number *</label>
                                            <input
                                                className="form-input"
                                                type="tel"
                                                placeholder="e.g. 98765 43210"
                                                value={leadPhone}
                                                onChange={(e) => setLeadPhone(e.target.value)}
                                                required
                                                pattern="[0-9]{10}"
                                                title="Enter 10 digit mobile number"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }}>
                                            📥 Download PDF Report
                                        </button>
                                        <p className={styles.modalDisclaimer}>
                                            🔒 Your data is safe. We don&apos;t spam.
                                        </p>
                                    </form>
                                </>
                            ) : (
                                <div className={styles.modalSuccess}>
                                    <span className={styles.successIcon}>✅</span>
                                    <h3>Thank you, {leadName}!</h3>
                                    <p>Your PDF report is being prepared...</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Report Hero — minimal */}
                <section className={styles.reportHero}>
                    <div className="container">
                        <div className={styles.reportHeroInner}>
                            <div>
                                <span className={styles.reportLabel}>Your Approval Report</span>
                                <h1 className={styles.reportH1}>
                                    {village ? `${village}, ` : ""}{taluk}
                                    <span className={styles.reportH1Sub}>{district}, Tamil Nadu</span>
                                </h1>
                            </div>
                            <div className={`${styles.jurisdictionChip} ${jurisdiction === "CMDA" ? styles.chipCmda : styles.chipDtcp}`}>
                                <span className={styles.chipIcon}>{jurisdiction === "CMDA" ? "🏙️" : "🏘️"}</span>
                                <div>
                                    <span className={styles.chipLabel}>{jurisdiction}</span>
                                    <span className={styles.chipSub}>{jurisdiction === "CMDA" ? "Chennai Metro" : `${district} Office`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Report Body */}
                <section className={styles.reportBody} ref={reportRef}>
                    <div className="container">
                        <div className={styles.reportLayout}>
                            {/* Left: Main Content */}
                            <div className={styles.reportMain}>
                                {/* At-a-Glance Summary */}
                                <div className={styles.glanceCard}>
                                    <div className={styles.glanceRow}>
                                        <div className={styles.glanceStat}>
                                            <span className={styles.glanceNum}>{estimatedTimeline.min}–{estimatedTimeline.max}</span>
                                            <span className={styles.glanceLbl}>Working Days</span>
                                        </div>
                                        <div className={styles.glanceDivider}></div>
                                        <div className={styles.glanceStat}>
                                            <span className={styles.glanceNum}>{triggeredNocs.length + 4}</span>
                                            <span className={styles.glanceLbl}>Total NOCs</span>
                                        </div>
                                        <div className={styles.glanceDivider}></div>
                                        <div className={styles.glanceStat}>
                                            <span className={styles.glanceNum}>{DOCUMENT_CHECKLIST.reduce((a, c) => a + c.documents.length, 0)}</span>
                                            <span className={styles.glanceLbl}>Documents</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Alerts */}
                                {statusItems.map((item, i) => (
                                    <div key={i} className={`${styles.statusAlert} ${styles[`status_${item.type}`]}`}>
                                        <span>{item.type === "warn" ? "⚠️" : item.type === "info" ? "📋" : "✅"}</span>
                                        <span>{item.text}</span>
                                    </div>
                                ))}

                                {/* Collapsible: Action Required */}
                                {selectedLandType?.warning && (
                                    <div className={styles.accordion}>
                                        <button className={styles.accordionHead} onClick={() => toggleSection("action")}>
                                            <span>🚩 What You Need To Do First</span>
                                            <span className={styles.accordionArrow}>{expandedSections.action ? "▾" : "▸"}</span>
                                        </button>
                                        {expandedSections.action && (
                                            <div className={styles.accordionBody}>
                                                <p>{selectedLandType.message}</p>
                                                <div className={styles.actionStep}>
                                                    <span className={styles.actionStepIcon}>→</span>
                                                    <div>
                                                        <strong>{selectedLandType.action}</strong>
                                                        <span className={styles.actionTimeline}>⏱️ {selectedLandType.timeline}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Collapsible: Extra NOCs */}
                                {triggeredNocs.length > 0 && (
                                    <div className={styles.accordion}>
                                        <button className={styles.accordionHead} onClick={() => toggleSection("nocs")}>
                                            <span>📄 Additional NOCs Required ({triggeredNocs.length})</span>
                                            <span className={styles.accordionArrow}>{expandedSections.nocs ? "▾" : "▸"}</span>
                                        </button>
                                        {expandedSections.nocs && (
                                            <div className={styles.accordionBody}>
                                                {triggeredNocs.map((noc) => (
                                                    <div key={noc.key} className={styles.nocRow}>
                                                        <span className={styles.nocRowIcon}>{noc.icon}</span>
                                                        <div className={styles.nocRowBody}>
                                                            <strong>{noc.noc}</strong>
                                                            <span>{noc.department}</span>
                                                        </div>
                                                        <span className={styles.nocRowTime}>⏱️ {noc.timeline}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Collapsible: Deemed NOC Timeline */}
                                <div className={styles.accordion}>
                                    <button className={styles.accordionHead} onClick={() => toggleSection("timeline")}>
                                        <span>⏱️ Standard NOC Timelines (Deemed Approval)</span>
                                        <span className={styles.accordionArrow}>{expandedSections.timeline ? "▾" : "▸"}</span>
                                    </button>
                                    {expandedSections.timeline && (
                                        <div className={styles.accordionBody}>
                                            <p className={styles.deemedNote}>
                                                Under TN Single Window Portal — no response = <strong>automatically granted</strong>.
                                            </p>
                                            {DEEMED_NOC_TIMELINES.map((noc, i) => (
                                                <div key={i} className={styles.timeRow}>
                                                    <span className={styles.timeRowIcon}>{noc.icon}</span>
                                                    <span className={styles.timeRowName}>{noc.department}</span>
                                                    <span className={styles.timeRowDays}>
                                                        {noc.nonHighRise
                                                            ? `${noc.nonHighRise}d / ${noc.highRise}d`
                                                            : `${noc.days}d`}
                                                    </span>
                                                    <span className={styles.deemedTag}>Deemed ✓</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Collapsible: Document Checklist */}
                                <div className={styles.accordion}>
                                    <button className={styles.accordionHead} onClick={() => toggleSection("documents")}>
                                        <span>📋 Document Checklist (TNCDBR 2026)</span>
                                        <span className={styles.accordionArrow}>{expandedSections.documents ? "▾" : "▸"}</span>
                                    </button>
                                    {expandedSections.documents && (
                                        <div className={styles.accordionBody}>
                                            {DOCUMENT_CHECKLIST.map((cat) => (
                                                <div key={cat.category} className={styles.docGroup}>
                                                    <h4 className={styles.docGroupTitle}>
                                                        {cat.icon} {cat.category}
                                                    </h4>
                                                    {cat.documents.map((doc, i) => (
                                                        <div key={i} className={styles.docRow}>
                                                            <span className={styles.docCheck}>☐</span>
                                                            <span className={styles.docName}>{doc.name}</span>
                                                            {doc.mandatory && <span className={styles.reqBadge}>Required</span>}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Pro Tip */}
                                <div className={styles.proTip}>
                                    <span>💡</span>
                                    <p>Ensure road width ≥ <strong>4.8m (16 ft)</strong> for residential layout, or <strong>9m (30 ft)</strong> for commercial.</p>
                                </div>
                            </div>

                            {/* Right: Sticky Sidebar */}
                            <div className={styles.reportSidebar}>
                                <div className={styles.sidebarCard}>
                                    <h3 className={styles.sidebarTitle}>Quick Summary</h3>

                                    <div className={styles.sidebarRow}>
                                        <span className={styles.sidebarLabel}>Authority</span>
                                        <strong>{jurisdiction}</strong>
                                    </div>
                                    <div className={styles.sidebarRow}>
                                        <span className={styles.sidebarLabel}>Land Type</span>
                                        <strong>{selectedLandType?.label?.replace(/ \(.*\)/, "")}</strong>
                                    </div>
                                    <div className={styles.sidebarRow}>
                                        <span className={styles.sidebarLabel}>Timeline</span>
                                        <strong>{estimatedTimeline.text}</strong>
                                    </div>
                                    <div className={styles.sidebarRow}>
                                        <span className={styles.sidebarLabel}>Extra NOCs</span>
                                        <strong>{triggeredNocs.length > 0 ? triggeredNocs.length : "None"}</strong>
                                    </div>
                                    <div className={styles.sidebarRow}>
                                        <span className={styles.sidebarLabel}>Status</span>
                                        <span className={`${styles.statusDot} ${selectedLandType?.warning ? styles.dotWarn : styles.dotOk}`}></span>
                                        <strong>{selectedLandType?.warning ? "Action Needed" : "Ready"}</strong>
                                    </div>

                                    <div className={styles.sidebarActions}>
                                        <button className={`btn btn-primary ${styles.sidebarBtn}`} onClick={handleDownloadPDF}>
                                            📥 Download PDF
                                        </button>
                                        <WhatsAppShare text={generateWhatsAppText()} />
                                        <button className={`btn btn-outline ${styles.sidebarBtnSm}`} onClick={resetAll}>
                                            🔄 New Check
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ExpertCTA />
            </>
        );
    }

    return (
        <>
            <section className={styles.toolHero}>
                <div className="container">
                    <span className="section-label">Tool 3 · Approval Checker</span>
                    <h1>DTCP / CMDA Approval Eligibility Checker</h1>
                    <p>
                        Check your land&apos;s jurisdiction, eligibility, document requirements,
                        and estimated timeline — step by step.
                    </p>
                </div>
            </section>

            <section className={`section ${styles.toolSection}`}>
                <div className="container">
                    {/* Progress Bar */}
                    <div className={styles.progressBar}>
                        {[1, 2, 3, 4, 5].map((step) => (
                            <div
                                key={step}
                                className={`${styles.progressStep} ${currentStep >= step ? styles.progressActive : ""} ${currentStep === step ? styles.progressCurrent : ""}`}
                            >
                                <div className={styles.progressDot}>
                                    {currentStep > step ? "✓" : step}
                                </div>
                                <span className={styles.progressLabel}>
                                    {step === 1 && "Location"}
                                    {step === 2 && "Land Type"}
                                    {step === 3 && "Documents"}
                                    {step === 4 && "NOC Timeline"}
                                    {step === 5 && "Special NOCs"}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.stepCard}>
                        {/* Step 1: Jurisdiction */}
                        {currentStep === 1 && (
                            <div className={`${styles.stepContent} animate-fade-in-up`}>
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepNum}>Step 1</span>
                                    <h2>Jurisdiction — Who is the Boss?</h2>
                                    <p>Select your property location to determine if it falls under CMDA or DTCP.</p>
                                </div>

                                <div className={styles.formGrid}>
                                    <div className="form-group">
                                        <label className="form-label">District *</label>
                                        <select
                                            className="form-select"
                                            value={district}
                                            onChange={(e) => {
                                                setDistrict(e.target.value);
                                                setTaluk("");
                                                setVillage("");
                                            }}
                                        >
                                            <option value="">Select District...</option>
                                            {TN_DISTRICTS.map((d) => (
                                                <option key={d.name} value={d.name}>{d.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Taluk *</label>
                                        <select
                                            className="form-select"
                                            value={taluk}
                                            onChange={(e) => setTaluk(e.target.value)}
                                            disabled={!district}
                                        >
                                            <option value="">Select Taluk...</option>
                                            {taluks.map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Village / Area (Optional)</label>
                                        <input
                                            className="form-input"
                                            type="text"
                                            placeholder="Enter village or area name..."
                                            value={village}
                                            onChange={(e) => setVillage(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {jurisdiction && (
                                    <div className={`${styles.jurisdictionResult} animate-fade-in-up`}>
                                        <div className={`${styles.jurisdictionBadge} ${jurisdiction === "CMDA" ? styles.badgeCmda : styles.badgeDtcp}`}>
                                            {jurisdiction === "CMDA" ? "🏙️" : "🏘️"} {jurisdiction} Jurisdiction
                                        </div>
                                        <p>
                                            {jurisdiction === "CMDA"
                                                ? "Your land falls under Chennai Metropolitan Development Authority (CMDA). Building and planning permissions will be handled by CMDA."
                                                : `Your land falls under Directorate of Town and Country Planning (DTCP). Approvals are managed through the ${district} DTCP office and local bodies.`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 2: Land Classification */}
                        {currentStep === 2 && (
                            <div className={`${styles.stepContent} animate-fade-in-up`}>
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepNum}>Step 2</span>
                                    <h2>Land Classification — Is it Approvable?</h2>
                                    <p>Select the current classification of your land to check eligibility.</p>
                                </div>

                                <div className={styles.landGrid}>
                                    {LAND_TYPES.map((type) => (
                                        <button
                                            key={type.key}
                                            className={`${styles.landCard} ${landType === type.key ? styles.landCardActive : ""}`}
                                            onClick={() => setLandType(type.key)}
                                        >
                                            <span className={styles.landIcon}>{type.icon}</span>
                                            <strong>{type.label}</strong>
                                        </button>
                                    ))}
                                </div>

                                {selectedLandType && (
                                    <div className={`${selectedLandType.warning ? styles.warningBox : styles.successBox} animate-fade-in-up`}>
                                        <span className={styles.warningIcon}>
                                            {selectedLandType.warning ? "⚠️" : "✅"}
                                        </span>
                                        <div>
                                            <strong>{selectedLandType.warning ? "Action Required" : "Good to Go"}</strong>
                                            <p>{selectedLandType.message}</p>
                                            <span className={styles.warningAction}>→ {selectedLandType.action}</span>
                                            <br />
                                            <small>⏱️ {selectedLandType.timeline}</small>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 3: Document Checklist */}
                        {currentStep === 3 && (
                            <div className={`${styles.stepContent} animate-fade-in-up`}>
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepNum}>Step 3</span>
                                    <h2>Document Checklist (TNCDBR 2026)</h2>
                                    <p>Mandatory documents required based on Tamil Nadu Combined Development and Building Rules.</p>
                                </div>

                                <div className={styles.checklistGrid}>
                                    {DOCUMENT_CHECKLIST.map((cat) => (
                                        <div key={cat.category} className={styles.checklistCategory}>
                                            <div className={styles.checklistHeader} style={{ borderLeftColor: cat.color }}>
                                                <span>{cat.icon}</span>
                                                <h3>{cat.category}</h3>
                                            </div>
                                            <ul className={styles.checklistItems}>
                                                {cat.documents.map((doc, i) => (
                                                    <li key={i} className={styles.checklistItem}>
                                                        <span className={styles.checkbox}>☐</span>
                                                        <span className={styles.checklistText}>{doc.name}</span>
                                                        {doc.mandatory && <span className="badge badge-primary">Required</span>}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Deemed NOC Timelines */}
                        {currentStep === 4 && (
                            <div className={`${styles.stepContent} animate-fade-in-up`}>
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepNum}>Step 4</span>
                                    <h2>Deemed NOC Timelines (2026 Update)</h2>
                                    <p>Under the TN Single Window Portal — if a department doesn&apos;t respond within the deadline, the NOC is <strong>automatically granted (Deemed)</strong>.</p>
                                </div>

                                <div className={styles.nocGrid}>
                                    {DEEMED_NOC_TIMELINES.map((noc, i) => (
                                        <div key={i} className={styles.nocCard}>
                                            <div className={styles.nocCardIcon}>{noc.icon}</div>
                                            <h3>{noc.department}</h3>
                                            <p className={styles.nocDesc}>{noc.description}</p>
                                            <div className={styles.nocDays}>
                                                {noc.nonHighRise ? (
                                                    <>
                                                        <div className={styles.nocDayItem}>
                                                            <span className={styles.nocDayNum}>{noc.nonHighRise}</span>
                                                            <span className={styles.nocDayLabel}>Days (Non-HR)</span>
                                                        </div>
                                                        <div className={styles.nocDaySep}>/</div>
                                                        <div className={styles.nocDayItem}>
                                                            <span className={styles.nocDayNum}>{noc.highRise}</span>
                                                            <span className={styles.nocDayLabel}>Days (High-rise)</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className={styles.nocDayItem}>
                                                        <span className={styles.nocDayNum}>{noc.days}</span>
                                                        <span className={styles.nocDayLabel}>Days</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.deemedBadge}>
                                                ✅ Auto-granted if no response
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 5: Special NOC Triggers */}
                        {currentStep === 5 && (
                            <div className={`${styles.stepContent} animate-fade-in-up`}>
                                <div className={styles.stepHeader}>
                                    <span className={styles.stepNum}>Step 5</span>
                                    <h2>Special NOC Requirements</h2>
                                    <p>Answer these questions to determine if you need additional NOCs for your property.</p>
                                </div>

                                <div className={styles.questionsGrid}>
                                    {NOC_TRIGGERS.map((trigger) => (
                                        <div key={trigger.key} className={styles.questionCard}>
                                            <div className={styles.questionTop}>
                                                <span className={styles.questionIcon}>{trigger.icon}</span>
                                                <p className={styles.questionText}>{trigger.question}</p>
                                            </div>
                                            <div className={styles.answerBtns}>
                                                <button
                                                    className={`${styles.answerBtn} ${nocAnswers[trigger.key] === true ? styles.answerYes : ""}`}
                                                    onClick={() => setNocAnswers({ ...nocAnswers, [trigger.key]: true })}
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    className={`${styles.answerBtn} ${nocAnswers[trigger.key] === false ? styles.answerNo : ""}`}
                                                    onClick={() => setNocAnswers({ ...nocAnswers, [trigger.key]: false })}
                                                >
                                                    No
                                                </button>
                                            </div>
                                            {nocAnswers[trigger.key] === true && (
                                                <div className={`${styles.triggerInfo} animate-fade-in-up`}>
                                                    <strong>📄 {trigger.noc}</strong>
                                                    <p>{trigger.details}</p>
                                                    <small>⏱️ Estimated: {trigger.timeline}</small>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navigation */}
                        <div className={styles.stepNav}>
                            <button
                                className="btn btn-outline"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                            >
                                ← Back
                            </button>
                            <span className={styles.stepIndicator}>
                                Step {currentStep} of {TOTAL_STEPS}
                            </span>
                            <button
                                className="btn btn-primary"
                                onClick={nextStep}
                                disabled={!canProceed()}
                            >
                                {currentStep === TOTAL_STEPS ? "Generate Report →" : "Next Step →"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <ExpertCTA />
        </>
    );
}
