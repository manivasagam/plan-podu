"use client";
import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ExpertCTA from "@/components/ExpertCTA";
import s from "./page.module.css";
import {
    PADA_SYSTEM, QUALITY_META, ROOM_PLACEMENTS, WATER_PLACEMENTS,
    COLOR_SCHEME, DIRECTIONS_8, DIRECTIONS_4,
    calculateVastuScore,
} from "./vastuData";

const STEPS = [
    { num: 1, icon: "📐", tamil: "மனை விவரம்" },
    { num: 2, icon: "🚪", tamil: "வாசல் & அறை" },
    { num: 3, icon: "💧", tamil: "நீர் & கூடுதல்" },
];

const INITIAL = {
    purpose: "new", buildingType: "residential",
    dimNS: "", dimEW: "", plotShape: "rectangle",
    roadN: false, roadS: false, roadE: false, roadW: false,
    slopeHigher: "", slopeLower: "",
    doorDirection: "", padaNumber: "",
    floors: "1", bedrooms: 2, bathrooms: 2,
    poojaRoom: true, livingHall: true, storeRoom: true, carParking: true,
    borewellDir: "", sumpDir: "", overheadDir: "", septicDir: "",
    staircaseDir: "",
    kitchenDir: "SE", masterBedDir: "SW", childBedDir: "NW",
    livingDir: "NE", bathroomDir: "NW", storeDir: "SW", poojaDir: "NE",
};

// ── URL Param Helpers ──
// Compact keys to keep URL short
const PARAM_MAP = {
    purpose: "p", buildingType: "bt", dimNS: "ns", dimEW: "ew", plotShape: "ps",
    roadN: "rn", roadS: "rs", roadE: "re", roadW: "rw",
    slopeHigher: "sh", slopeLower: "sl",
    doorDirection: "dd", padaNumber: "pn",
    floors: "fl", bedrooms: "bd", bathrooms: "ba",
    poojaRoom: "pr", livingHall: "lh", storeRoom: "sr", carParking: "cp",
    borewellDir: "bwd", sumpDir: "sd", overheadDir: "od", septicDir: "spd",
    staircaseDir: "scd",
    kitchenDir: "kd", masterBedDir: "mbd", childBedDir: "cbd",
    livingDir: "ld", bathroomDir: "btd", storeDir: "std", poojaDir: "pd",
};
const PARAM_MAP_REV = Object.fromEntries(Object.entries(PARAM_MAP).map(([k, v]) => [v, k]));

function encodeFormToParams(fd) {
    const params = new URLSearchParams();
    for (const [key, short] of Object.entries(PARAM_MAP)) {
        const val = fd[key];
        if (val === "" || val === false || val === undefined || val === null) continue;
        if (val === INITIAL[key] && typeof val !== "boolean") continue; // skip defaults for non-booleans
        params.set(short, val === true ? "1" : String(val));
    }
    return params.toString();
}

function decodeParamsToForm(searchParams) {
    const fd = { ...INITIAL };
    let hasData = false;
    for (const [short, val] of searchParams.entries()) {
        const key = PARAM_MAP_REV[short];
        if (!key) continue;
        hasData = true;
        const initial = INITIAL[key];
        if (typeof initial === "boolean") {
            fd[key] = val === "1";
        } else if (typeof initial === "number") {
            fd[key] = Number(val);
        } else {
            fd[key] = val;
        }
    }
    return hasData ? fd : null;
}

function VastuPlannerInner() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [fd, setFd] = useState(INITIAL);
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState(false);
    const reportRef = useRef(null);
    const initialized = useRef(false);

    // Restore from URL on mount
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        const restored = decodeParamsToForm(searchParams);
        if (restored) {
            setFd(restored);
            setResult(calculateVastuScore(restored));
            setStep(4);
        }
    }, [searchParams]);

    const set = (key, val) => setFd((p) => ({ ...p, [key]: val }));
    const toggle = (key) => setFd((p) => ({ ...p, [key]: !p[key] }));
    const next = () => setStep((s) => Math.min(s + 1, 4));
    const prev = () => setStep((s) => Math.max(s - 1, 1));

    const generate = () => {
        const res = calculateVastuScore(fd);
        setResult(res);
        setStep(4);
        // Push unique URL
        const params = encodeFormToParams(fd);
        const newUrl = `${window.location.pathname}?${params}`;
        window.history.replaceState(null, "", newUrl);
    };

    const getShareUrl = useCallback(() => {
        const params = encodeFormToParams(fd);
        return `https://planpodu.in/tools/vastu-planner?${params}`;
    }, [fd]);

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(getShareUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            const ta = document.createElement("textarea");
            ta.value = getShareUrl();
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const reset = () => {
        setFd(INITIAL);
        setResult(null);
        setStep(1);
        setCopied(false);
        window.history.replaceState(null, "", window.location.pathname);
    };

    const area = (Number(fd.dimNS) || 0) * (Number(fd.dimEW) || 0);

    const padaKey = { N: "NORTH", E: "EAST", S: "SOUTH", W: "WEST", NE: "EAST", SE: "SOUTH", SW: "WEST", NW: "NORTH" }[fd.doorDirection];
    const padaDir = padaKey ? PADA_SYSTEM[padaKey] : null;

    const handleDownload = () => window.print();

    const shareText = result
        ? `🧭 வாஸ்து பகுப்பாய்வு — PlanPodu.in\n\n📊 Score: ${result.score}/100\n🏠 ${fd.dimNS}ft × ${fd.dimEW}ft (${area.toLocaleString()} sq.ft)\n🚪 வாசல்: ${result.pada?.tamil || "-"} — ${QUALITY_META[result.pada?.quality]?.label || ""}\n\n✅ நல்ல அம்சங்கள்: ${result.goods.length}\n⚠️ கவனிக்க: ${result.issues.length}\n\n📋 Full Report 👉 ${getShareUrl()}`
        : "";

    return (
        <>
            {/* Hero */}
            <section className={s.hero}>
                <div className="container">
                    <span className={s.badge}>🧭 Vastu Planner</span>
                    <h1>உங்கள் வீட்டுக்கான<br />வாஸ்து வழிகாட்டி</h1>
                    <p>3 எளிய படிகளில் உங்கள் வீட்டின் வாஸ்து மதிப்பெண் பெறுங்கள்</p>
                </div>
            </section>

            <section className={s.main}>
                <div className="container">

                    {/* ── Stepper ── */}
                    {step <= 3 && (
                        <div className={s.stepper}>
                            {STEPS.map((st) => (
                                <button
                                    key={st.num}
                                    className={`${s.dot} ${step === st.num ? s.dotActive : ""} ${step > st.num ? s.dotDone : ""}`}
                                    onClick={() => step > st.num && setStep(st.num)}
                                    type="button"
                                >
                                    <span className={s.dotIcon}>{step > st.num ? "✓" : st.icon}</span>
                                    <span className={s.dotLabel}>{st.tamil}</span>
                                </button>
                            ))}
                            <div className={s.stepperTrack}>
                                <div className={s.stepperFill} style={{ width: `${((step - 1) / 2) * 100}%` }} />
                            </div>
                        </div>
                    )}

                    {/* ═══════ STEP 1: Plot & Purpose ═══════ */}
                    {step === 1 && (
                        <div className={s.card}>
                            <h2 className={s.cardTitle}>மனை விவரம் <span>Plot Details</span></h2>

                            <div className={s.row2}>
                                <div className={s.field}>
                                    <label className={s.lbl}>நோக்கம்</label>
                                    <div className={s.chips}>
                                        {[
                                            { v: "new", t: "🏗️ புதிய" },
                                            { v: "existing", t: "🏠 சரிபார்ப்பு" },
                                            { v: "renovation", t: "🔨 மறுவேலை" },
                                        ].map((o) => (
                                            <button key={o.v} className={`${s.chip} ${fd.purpose === o.v ? s.chipOn : ""}`} onClick={() => set("purpose", o.v)} type="button">{o.t}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className={s.field}>
                                    <label className={s.lbl}>கட்டிட வகை</label>
                                    <div className={s.chips}>
                                        {[
                                            { v: "residential", t: "🏡 குடியிருப்பு" },
                                            { v: "commercial", t: "🏢 வணிகம்" },
                                        ].map((o) => (
                                            <button key={o.v} className={`${s.chip} ${fd.buildingType === o.v ? s.chipOn : ""}`} onClick={() => set("buildingType", o.v)} type="button">{o.t}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={s.row2}>
                                <div className={s.field}>
                                    <label className={s.lbl}>வடக்கு-தெற்கு (ft)</label>
                                    <input type="number" className={s.inp} placeholder="40" value={fd.dimNS} onChange={(e) => set("dimNS", e.target.value)} inputMode="numeric" />
                                </div>
                                <div className={s.field}>
                                    <label className={s.lbl}>கிழக்கு-மேற்கு (ft)</label>
                                    <input type="number" className={s.inp} placeholder="30" value={fd.dimEW} onChange={(e) => set("dimEW", e.target.value)} inputMode="numeric" />
                                </div>
                            </div>
                            {area > 0 && <p className={s.areaTag}>📐 {area.toLocaleString()} sq.ft</p>}

                            <label className={s.lbl}>தெரு எங்கே? <small>(ஒன்று அல்லது பல)</small></label>
                            <div className={s.roadBox}>
                                <button className={`${s.rb} ${s.rbN} ${fd.roadN ? s.rbOn : ""}`} onClick={() => toggle("roadN")} type="button">N</button>
                                <button className={`${s.rb} ${s.rbW} ${fd.roadW ? s.rbOn : ""}`} onClick={() => toggle("roadW")} type="button">W</button>
                                <div className={s.rbPlot}>PLOT</div>
                                <button className={`${s.rb} ${s.rbE} ${fd.roadE ? s.rbOn : ""}`} onClick={() => toggle("roadE")} type="button">E</button>
                                <button className={`${s.rb} ${s.rbS} ${fd.roadS ? s.rbOn : ""}`} onClick={() => toggle("roadS")} type="button">S</button>
                            </div>

                            <div className={s.row2}>
                                <div className={s.field}>
                                    <label className={s.lbl}>உயர்ந்த பக்கம்</label>
                                    <select className={s.sel} value={fd.slopeHigher} onChange={(e) => set("slopeHigher", e.target.value)}>
                                        <option value="">—</option>
                                        {DIRECTIONS_4.map((d) => <option key={d.key} value={d.key}>{d.tamil}</option>)}
                                    </select>
                                </div>
                                <div className={s.field}>
                                    <label className={s.lbl}>தாழ்வான பக்கம்</label>
                                    <select className={s.sel} value={fd.slopeLower} onChange={(e) => set("slopeLower", e.target.value)}>
                                        <option value="">—</option>
                                        {DIRECTIONS_4.map((d) => <option key={d.key} value={d.key}>{d.tamil}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className={s.nav}>
                                <div />
                                <button className={s.btnNext} onClick={next} disabled={!fd.dimNS || !fd.dimEW} type="button">அடுத்து →</button>
                            </div>
                        </div>
                    )}

                    {/* ═══════ STEP 2: Entrance & Rooms ═══════ */}
                    {step === 2 && (
                        <div className={s.card}>
                            <h2 className={s.cardTitle}>வாசல் & அறை <span>Entrance & Rooms</span></h2>

                            <label className={s.lbl}>வாசல் திசை</label>
                            <div className={s.dirGrid}>
                                {DIRECTIONS_8.map((d) => (
                                    <button key={d.key} className={`${s.dirBtn} ${fd.doorDirection === d.key ? s.dirOn : ""}`}
                                        onClick={() => { set("doorDirection", d.key); set("padaNumber", ""); }} type="button">
                                        <strong>{d.key}</strong><small>{d.tamil}</small>
                                    </button>
                                ))}
                            </div>

                            {padaDir && (() => {
                                // Zone mapping: Left=padas 1-3, Center=4-6, Right=7-9
                                const zones = [
                                    { id: "left", label: "இடது", eng: "Left", padas: [1, 2, 3] },
                                    { id: "center", label: "நடு", eng: "Center", padas: [4, 5, 6] },
                                    { id: "right", label: "வலது", eng: "Right", padas: [7, 8, 9] },
                                ];
                                // Find which zone the current padaNumber belongs to
                                const activeZone = zones.find(z => z.padas.includes(Number(fd.padaNumber)));
                                // Pick the best pada from a zone
                                const pickBestPada = (zone) => {
                                    const ranked = zone.padas
                                        .map(n => ({ n, q: padaDir.padas[n] }))
                                        .sort((a, b) => (QUALITY_META[b.q.quality]?.score || 0) - (QUALITY_META[a.q.quality]?.score || 0));
                                    return ranked[0];
                                };
                                // Get quality color for zone preview
                                const zoneQuality = (zone) => {
                                    const best = pickBestPada(zone);
                                    return QUALITY_META[best.q.quality];
                                };
                                return (
                                    <>
                                        <label className={s.lbl}>🚪 கதவு எந்த பக்கம்? <small style={{ fontWeight: 400, color: '#64748B' }}>({padaDir.direction} சுவரில்)</small></label>
                                        <p className={s.helperText}>வெளியிலிருந்து பார்க்கும்போது, உங்கள் கதவு சுவரின் எந்தப் பகுதியில் உள்ளது?</p>
                                        <div className={s.wallPicker}>
                                            {zones.map((zone) => {
                                                const qMeta = zoneQuality(zone);
                                                const isActive = activeZone?.id === zone.id;
                                                return (
                                                    <button key={zone.id}
                                                        className={`${s.wallZone} ${isActive ? s.wallZoneOn : ""}`}
                                                        onClick={() => {
                                                            const best = pickBestPada(zone);
                                                            set("padaNumber", String(best.n));
                                                        }}
                                                        type="button">
                                                        <span className={s.wallIcon}>🚪</span>
                                                        <strong>{zone.label}</strong>
                                                        <small>{zone.eng}</small>
                                                        <span className={s.wallQuality} style={{ color: qMeta.color }}>{qMeta.emoji} {qMeta.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {activeZone && (() => {
                                            const bestPada = pickBestPada(activeZone);
                                            const qm = QUALITY_META[bestPada.q.quality];
                                            return (
                                                <div className={s.padaFeedback} style={{ borderColor: qm.color, background: `${qm.color}0A` }}>
                                                    <span style={{ color: qm.color, fontSize: '1.1rem' }}>{qm.emoji}</span>
                                                    <span><strong>{qm.label}</strong> — {bestPada.q.tamil} பாதம்</span>
                                                </div>
                                            );
                                        })()}
                                    </>
                                );
                            })()}

                            <div className={s.divider} />

                            <div className={s.row3}>
                                <div className={s.field}>
                                    <label className={s.lbl}>தளங்கள்</label>
                                    <div className={s.chips}>
                                        {["1", "2", "3"].map((v) => (
                                            <button key={v} className={`${s.chip} ${fd.floors === v ? s.chipOn : ""}`} onClick={() => set("floors", v)} type="button">
                                                {v === "1" ? "G" : v === "2" ? "G+1" : "G+2"}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className={s.field}>
                                    <label className={s.lbl}>🛏️ படுக்கை</label>
                                    <div className={s.counter}>
                                        <button type="button" onClick={() => set("bedrooms", Math.max(1, fd.bedrooms - 1))}>−</button>
                                        <span>{fd.bedrooms}</span>
                                        <button type="button" onClick={() => set("bedrooms", Math.min(6, fd.bedrooms + 1))}>+</button>
                                    </div>
                                </div>
                                <div className={s.field}>
                                    <label className={s.lbl}>🚿 குளியல்</label>
                                    <div className={s.counter}>
                                        <button type="button" onClick={() => set("bathrooms", Math.max(1, fd.bathrooms - 1))}>−</button>
                                        <span>{fd.bathrooms}</span>
                                        <button type="button" onClick={() => set("bathrooms", Math.min(6, fd.bathrooms + 1))}>+</button>
                                    </div>
                                </div>
                            </div>

                            <label className={s.lbl}>கூடுதல் அறைகள்</label>
                            <div className={s.toggleRow}>
                                {[
                                    { key: "poojaRoom", icon: "🪔", t: "பூஜை" },
                                    { key: "livingHall", icon: "🛋️", t: "ஹால்" },
                                    { key: "storeRoom", icon: "📦", t: "களஞ்சியம்" },
                                    { key: "carParking", icon: "🚗", t: "கார்" },
                                ].map((r) => (
                                    <label key={r.key} className={`${s.tog} ${fd[r.key] ? s.togOn : ""}`}>
                                        <input type="checkbox" checked={fd[r.key]} onChange={() => toggle(r.key)} hidden />
                                        <span>{r.icon}</span> {r.t}
                                    </label>
                                ))}
                            </div>

                            <div className={s.nav}>
                                <button className={s.btnPrev} onClick={prev} type="button">← பின்</button>
                                <button className={s.btnNext} onClick={next} disabled={!fd.doorDirection} type="button">அடுத்து →</button>
                            </div>
                        </div>
                    )}

                    {/* ═══════ STEP 3: Water & Utilities ═══════ */}
                    {step === 3 && (
                        <div className={s.card}>
                            <h2 className={s.cardTitle}>நீர் & கூடுதல் <span>Water & Additional</span></h2>

                            <div className={s.row2}>
                                {[
                                    { key: "borewellDir", icon: "💧", t: "கிணறு / போர்வெல்" },
                                    { key: "sumpDir", icon: "🔽", t: "நிலத்தடி தொட்டி" },
                                    { key: "overheadDir", icon: "🔼", t: "மேல்நிலை தொட்டி" },
                                    { key: "septicDir", icon: "🚽", t: "கழிவுநீர் தொட்டி" },
                                ].map((w) => (
                                    <div key={w.key} className={s.field}>
                                        <label className={s.lbl}>{w.icon} {w.t}</label>
                                        <select className={s.sel} value={fd[w.key]} onChange={(e) => set(w.key, e.target.value)}>
                                            <option value="">—</option>
                                            {DIRECTIONS_8.map((d) => <option key={d.key} value={d.key}>{d.tamil} ({d.key})</option>)}
                                        </select>
                                    </div>
                                ))}
                            </div>

                            {Number(fd.floors) > 1 && (
                                <div className={s.field}>
                                    <label className={s.lbl}>🪜 படிக்கட்டு திசை</label>
                                    <select className={s.sel} value={fd.staircaseDir} onChange={(e) => set("staircaseDir", e.target.value)}>
                                        <option value="">—</option>
                                        {DIRECTIONS_8.map((d) => <option key={d.key} value={d.key}>{d.tamil} ({d.key})</option>)}
                                    </select>
                                </div>
                            )}

                            <div className={s.nav}>
                                <button className={s.btnPrev} onClick={prev} type="button">← பின்</button>
                                <button className={s.btnGenerate} onClick={generate} type="button">🧭 வாஸ்து Report பார்க்க</button>
                            </div>
                        </div>
                    )}

                    {/* ═══════ REPORT VIEW ═══════ */}
                    {step === 4 && result && (
                        <>
                            {/* Action bar */}
                            <div className={s.actionBar}>
                                <button className={s.actionBtn} onClick={handleDownload} type="button">📥 Download PDF</button>
                                <button className={`${s.actionBtn} ${s.actionBtnCopy}`} onClick={copyLink} type="button">
                                    {copied ? "✅ Copied!" : "🔗 Copy Link"}
                                </button>
                                <a
                                    className={s.actionBtnWa}
                                    href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    WhatsApp Share
                                </a>
                                <button className={s.actionBtnLight} onClick={reset} type="button">🔄 புதிதாக</button>
                            </div>

                            {/* Printable report */}
                            <div className={s.report} ref={reportRef} id="vastu-report">

                                {/* Header */}
                                <div className={s.rptHeader}>
                                    <div className={s.rptBrand}>🧭 PlanPodu.in</div>
                                    <h2>வாஸ்து பகுப்பாய்வு அறிக்கை</h2>
                                    <p>Vastu Analysis Report</p>
                                </div>

                                {/* Score */}
                                <div className={s.scoreRow}>
                                    <div className={s.scoreRing} style={{ "--pct": result.score }}>
                                        <span className={s.scoreNum}>{result.score}</span>
                                        <span className={s.scoreOf}>/100</span>
                                    </div>
                                    <div className={s.scoreMeta}>
                                        <h3>
                                            {result.score >= 75 ? "🎉 மிகச்சிறந்த வாஸ்து!" :
                                                result.score >= 50 ? "👍 நல்ல வாஸ்து" :
                                                    "⚠️ பரிகாரங்கள் தேவை"}
                                        </h3>
                                        <div className={s.metaChips}>
                                            <span>📐 {fd.dimNS}×{fd.dimEW} ft</span>
                                            <span>🏠 {area.toLocaleString()} sq.ft</span>
                                            <span>🚪 {fd.doorDirection}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Pada */}
                                {result.pada && (
                                    <div className={s.rptSection}>
                                        <h3 className={s.rptH}>🚪 வாசல் பாத பகுப்பாய்வு</h3>
                                        <div className={s.padaResult} style={{ "--pc": QUALITY_META[result.pada.quality].color }}>
                                            <div className={s.padaInfo}>
                                                <strong>{result.pada.tamil}</strong> ({result.pada.name}) — Pada #{fd.padaNumber}
                                                <br /><small>அதிபதி: {result.pada.lord} | {result.padaData?.direction}</small>
                                            </div>
                                            <span className={s.qBadge} style={{ background: QUALITY_META[result.pada.quality].color }}>
                                                {QUALITY_META[result.pada.quality].emoji} {QUALITY_META[result.pada.quality].label}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Goods & Issues */}
                                {result.goods.length > 0 && (
                                    <div className={s.rptSection}>
                                        <h3 className={s.rptH}>🔷 நல்ல அம்சங்கள் ({result.goods.length})</h3>
                                        <ul className={s.goodList}>{result.goods.map((g, i) => <li key={i}>{g}</li>)}</ul>
                                    </div>
                                )}
                                {result.issues.length > 0 && (
                                    <div className={s.rptSection}>
                                        <h3 className={s.rptH}>🔶 கவனிக்க வேண்டியவை ({result.issues.length})</h3>
                                        <ul className={s.issueList}>{result.issues.map((g, i) => <li key={i}>{g}</li>)}</ul>
                                    </div>
                                )}

                                {/* Room Recommendations */}
                                <div className={s.rptSection}>
                                    <h3 className={s.rptH}>🏠 அறை வழிகாட்டுதல்</h3>
                                    <div className={s.roomGrid}>
                                        {Object.entries(ROOM_PLACEMENTS).map(([key, room]) => (
                                            <div key={key} className={s.roomCard}>
                                                <div className={s.roomTop}>
                                                    <span>{room.icon}</span> <strong>{room.tamil}</strong>
                                                </div>
                                                <div className={s.roomDirs}>
                                                    <span className={s.tagGood}>சிறந்த: {room.best.join(", ")}</span>
                                                    <span className={s.tagOk}>நல்ல: {room.good.join(", ")}</span>
                                                    <span className={s.tagBad}>தவிர்: {room.avoid.join(", ")}</span>
                                                </div>
                                                <ul className={s.roomTips}>
                                                    {room.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Water */}
                                <div className={s.rptSection}>
                                    <h3 className={s.rptH}>💧 நீர் வசதி வழிகாட்டுதல்</h3>
                                    <div className={s.waterGrid}>
                                        {Object.entries(WATER_PLACEMENTS).map(([key, w]) => (
                                            <div key={key} className={s.waterCard}>
                                                <strong>{w.icon} {w.tamil}</strong>
                                                <span className={s.tagGood}>சிறந்த: {w.best.join(", ")}</span>
                                                <span className={s.tagBad}>தவிர்: {w.avoid.join(", ")}</span>
                                                <small>{w.reason}</small>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Color */}
                                <div className={s.rptSection}>
                                    <h3 className={s.rptH}>🎨 வண்ண வழிகாட்டுதல்</h3>
                                    <div className={s.colorGrid}>
                                        {Object.entries(COLOR_SCHEME).map(([dir, c]) => (
                                            <div key={dir} className={s.colorCard}>
                                                <strong>{c.tamil} ({dir})</strong>
                                                <p className={s.tagGood}>நல்ல: {c.good.join(", ")}</p>
                                                <p className={s.tagBad}>தவிர்: {c.avoid.join(", ")}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={s.rptFooter}>
                                    <p>🧭 இந்த அறிக்கை PlanPodu.in மூலம் தயாரிக்கப்பட்டது</p>
                                    <p>planpodu.in/tools/vastu-planner</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {step <= 3 && <ExpertCTA />}
        </>
    );
}

// Wrap with Suspense for useSearchParams
export default function VastuPlanner() {
    return (
        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
            <VastuPlannerInner />
        </Suspense>
    );
}
