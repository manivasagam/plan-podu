"use client";
import { useState } from "react";
import Link from "next/link";
import ExpertCTA from "@/components/ExpertCTA";
import styles from "./page.module.css";

/* ── data ─────────────────────────────────────── */

const ticker = [
  "📢 TNCDBR 2026 Rules — Now Updated on PlanPodu.in",
  "🏛️ TN Stamp Duty: 7% | Registration: 4% — Calculate Your Total Now",
  "📍 All 38 Tamil Nadu Districts Supported",
  "🆓 100% Free Tools · No Login · No Hidden Charges",
  "📱 WhatsApp-ல் Share செய்யுங்கள் — Share Results on WhatsApp",
  "🔍 DTCP vs CMDA — Find Your Jurisdiction in 30 Seconds",
];

const tools = [
  {
    num: "01",
    title: "Property Cost Calculator",
    tamil: "சொத்து செலவு கணிப்பான்",
    desc: "Total purchase cost with stamp duty, registration, legal charges — for any TN property.",
    href: "/tools/property-calculator",
    badge: "Most Popular",
    accent: "#0D6E4F",
  },
  {
    num: "02",
    title: "Area Converter",
    tamil: "பரப்பளவு மாற்றி",
    desc: "Cent, Ground, Kuzhi, Acre, Hectare, Sq.Metre, Sq.Feet — instant, accurate conversions.",
    href: "/tools/area-converter",
    badge: "Quick Tool",
    accent: "#D4A843",
  },
  {
    num: "03",
    title: "DTCP / CMDA Approval Checker",
    tamil: "அனுமதி சரிபார்ப்பான்",
    desc: "5-step eligibility check — jurisdiction, land type, documents, NOCs, and full report.",
    href: "/tools/jurisdiction-finder",
    badge: "Essential",
    accent: "#3B82F6",
  },
  {
    num: "04",
    title: "Vastu Floor Plan",
    tamil: "வாஸ்து தள வரைபடம்",
    desc: "AI-powered Vastu-compliant room layout based on your plot facing and size.",
    href: "/tools/vastu-planner",
    badge: "AI Powered",
    accent: "#10B981",
  },
];

const testimonials = [
  { text: "Agent கிட்ட ₹15,000 கொடுக்க போனேன். இங்க free-யா calculate பண்ணிட்டேன்!", name: "Ravi K.", place: "Chennai" },
  { text: "DTCP-ya CMDA-ya confusion-ஐ 5 நிமிடத்தில் clear பண்ணிட்டேன்.", name: "Priya S.", place: "Coimbatore" },
  { text: "1 Ground = 2,400 sq.ft-ன்னு broker சொன்னது verify பண்ணிட்டேன்.", name: "Karthik M.", place: "Madurai" },
  { text: "என் 30 cent நிலத்துக்கு full approval checklist கிடைச்சது.", name: "Lakshmi R.", place: "Tiruchirappalli" },
  { text: "Registration cost exact-ஆ ₹3.85 lakh. Agent ₹5 lakh சொன்னார்.", name: "Suresh P.", place: "Salem" },
  { text: "Vastu plan AI tool — plot facing மாத்தி பாத்தேன், superb!", name: "Meena V.", place: "Erode" },
];

const regions = [
  {
    name: "வடக்கு · North TN",
    districts: ["Chennai", "Kanchipuram", "Chengalpattu", "Tiruvallur", "Vellore", "Ranipet"],
    more: 4,
  },
  {
    name: "தெற்கு · South TN",
    districts: ["Madurai", "Tirunelveli", "Thoothukudi", "Ramanathapuram", "Virudhunagar", "Sivagangai"],
    more: 3,
  },
  {
    name: "மத்தி · Central TN",
    districts: ["Tiruchirappalli", "Thanjavur", "Pudukkottai", "Nagapattinam", "Perambalur"],
    more: 4,
  },
  {
    name: "மேற்கு · Western TN",
    districts: ["Coimbatore", "Salem", "Erode", "Dindigul", "Namakkal", "Tiruppur"],
    more: 3,
  },
];

const faqs = [
  {
    q: "TN-ல Stamp Duty rate என்ன? What is stamp duty in Tamil Nadu?",
    a: "Tamil Nadu stamp duty is 7% of the property value or guideline value (whichever is higher). Registration fee is 4%. Together, this adds 11% to your property cost. Our calculator breaks this down instantly.",
  },
  {
    q: "CMDA vs DTCP — என் நிலம் எந்த jurisdiction-ல வரும்?",
    a: "CMDA covers Chennai Metropolitan Area (Chennai, parts of Kanchipuram, Tiruvallur & Chengalpattu). DTCP covers the rest of Tamil Nadu. Use our Approval Checker tool — enter your location and get the answer in 30 seconds.",
  },
  {
    q: "1 Acre-ல எத்தனை Cent இருக்கு?",
    a: "1 Acre = 100 Cents. 1 Cent = 435.6 sq.ft. 1 Ground = 2,400 sq.ft. Our Area Converter handles all Tamil Nadu land measurement units instantly.",
  },
  {
    q: "Property registration-க்கு என்ன documents வேணும்?",
    a: "Key documents: Sale Deed, Encumbrance Certificate (30 years), Patta, Chitta, Adangal, FMB Sketch, approved building plan, and tax receipts. Our Approval Checker gives you the complete TNCDBR 2026 checklist for your specific case.",
  },
  {
    q: "இந்த tools-க்கு charge உண்டா? Is PlanPodu.in free?",
    a: "100% free. No login, no registration, no hidden charges. All tools are open to everyone. You can also share your results directly via WhatsApp.",
  },
];

/* ── helpers ───────────────────────────────────── */

function formatINR(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

/* ── component ─────────────────────────────────── */

export default function Home() {
  const [price, setPrice] = useState("");

  const numPrice = parseInt(price.replace(/,/g, ""), 10) || 0;
  const stampDuty = numPrice * 0.07;
  const regFee = numPrice * 0.04;
  const total = numPrice + stampDuty + regFee;
  const hasCalc = numPrice > 0;

  return (
    <>
      {/* ──── Hero ──── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroBgCircle1}></div>
          <div className={styles.heroBgCircle2}></div>
          <div className={styles.heroBgCircle3}></div>
        </div>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>🎉 Free Tools for Tamil Nadu</span>
            <h1 className={styles.heroTitle}>
              Your Property,<br />
              <span className={styles.heroHighlight}>In Your Hands</span>
            </h1>
            <p className={styles.heroSubTamil}>
              உங்கள் சொத்து, உங்கள் கையில்
            </p>
            <p className={styles.heroDesc}>
              Simplify complex property calculations, land conversions, and
              government processes with our free, easy-to-use tools — made
              specifically for Tamil Nadu.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/tools/property-calculator" className="btn btn-accent btn-lg">
                Calculate Property Cost →
              </Link>
              <Link href="#tools" className="btn btn-outline btn-lg">
                Explore All Tools
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardHeader}>
                <span className={styles.heroCardDot} style={{ background: '#EF4444' }}></span>
                <span className={styles.heroCardDot} style={{ background: '#EAB308' }}></span>
                <span className={styles.heroCardDot} style={{ background: '#22C55E' }}></span>
              </div>
              <div className={styles.heroCardBody}>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatLabel}>Purchase Price</span>
                  <span className={styles.heroStatValue}>₹50,00,000</span>
                </div>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatLabel}>Stamp Duty (7%)</span>
                  <span className={styles.heroStatValue}>₹3,50,000</span>
                </div>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatLabel}>Registration (4%)</span>
                  <span className={styles.heroStatValue}>₹2,00,000</span>
                </div>
                <div className={`${styles.heroStat} ${styles.heroStatTotal}`}>
                  <span className={styles.heroStatLabel}>Total Cost</span>
                  <span className={styles.heroStatValue}>₹55,55,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── 1. Scrolling Ticker ──── */}
      <section className={styles.tickerWrap}>
        <div className={styles.tickerTrack}>
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className={styles.tickerItem}>
              {t}
              <span className={styles.tickerDot}>•</span>
            </span>
          ))}
        </div>
      </section>

      {/* ──── 2. Live Calculator ──── */}
      <section className={styles.calcSection}>
        <div className="container">
          <div className={styles.calcInner}>
            <div className={styles.calcLeft}>
              <span className={styles.calcLabel}>உடனடி கணக்கு · Try It Now</span>
              <h2 className={styles.calcTitle}>
                Type Your Property Price.<br />
                <span>See Total Cost in 2 Seconds.</span>
              </h2>
              <p className={styles.calcSub}>
                சொத்து விலையை உள்ளிடுங்கள் — stamp duty, registration, மொத்த செலவு உடனடியாக!
              </p>
            </div>
            <div className={styles.calcRight}>
              <div className={styles.calcCard}>
                <label className={styles.calcInputLabel}>
                  Property Value (₹)
                  <span className={styles.calcInputTamil}>சொத்து மதிப்பு</span>
                </label>
                <input
                  type="text"
                  className={styles.calcInput}
                  placeholder="e.g. 5000000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ""))}
                  inputMode="numeric"
                />
                {hasCalc && (
                  <div className={styles.calcResults}>
                    <div className={styles.calcRow}>
                      <span>Stamp Duty (7%)</span>
                      <span className={styles.calcVal}>{formatINR(stampDuty)}</span>
                    </div>
                    <div className={styles.calcRow}>
                      <span>Registration (4%)</span>
                      <span className={styles.calcVal}>{formatINR(regFee)}</span>
                    </div>
                    <div className={`${styles.calcRow} ${styles.calcTotal}`}>
                      <span>மொத்தம் · Total Cost</span>
                      <span className={styles.calcTotalVal}>{formatINR(total)}</span>
                    </div>
                  </div>
                )}
                <Link href="/tools/property-calculator" className={styles.calcFullLink}>
                  Full Calculator with Legal Fees & GST →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── 3. Numbered Tool Cards ──── */}
      <section className={`section ${styles.toolsSection}`} id="tools">
        <div className="container">
          <div className={styles.toolsHeader}>
            <span className={styles.toolsLabel}>எங்கள் கருவிகள் · Our Tools</span>
            <h2>Everything You Need for Property Decisions</h2>
          </div>
          <div className={styles.toolsStack}>
            {tools.map((tool) => (
              <Link href={tool.href} key={tool.num} className={styles.toolRow}>
                <div className={styles.toolAccent} style={{ background: tool.accent }}></div>
                <span className={styles.toolNum} style={{ color: `${tool.accent}20` }}>{tool.num}</span>
                <div className={styles.toolInfo}>
                  <div className={styles.toolMeta}>
                    <h3>{tool.title}</h3>
                    <span className={styles.toolTamil}>{tool.tamil}</span>
                  </div>
                  <p className={styles.toolDesc}>{tool.desc}</p>
                </div>
                <span className={styles.toolBadge} style={{ background: `${tool.accent}12`, color: tool.accent }}>{tool.badge}</span>
                <span className={styles.toolArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──── 4. Social Proof Wall ──── */}
      <section className={styles.proofSection}>
        <div className="container">
          <div className={styles.proofHeader}>
            <div className={styles.proofBig}>
              <span className={styles.proofNum}>10,000+</span>
              <span className={styles.proofNumLabel}>calculations completed across Tamil Nadu</span>
            </div>
            <div className={styles.proofMeta}>
              <div className={styles.proofMetaItem}>
                <span className={styles.proofMetaIcon}>📍</span>
                <span>38 districts</span>
              </div>
              <div className={styles.proofMetaItem}>
                <span className={styles.proofMetaIcon}>🛠️</span>
                <span>4 free tools</span>
              </div>
              <div className={styles.proofMetaItem}>
                <span className={styles.proofMetaIcon}>📋</span>
                <span>TNCDBR 2026</span>
              </div>
              <div className={styles.proofMetaItem}>
                <span className={styles.proofMetaIcon}>✅</span>
                <span>100% accurate</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.proofScroll}>
          <div className={styles.proofTrack}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className={styles.proofCard}>
                <p className={styles.proofText}>"{t.text}"</p>
                <div className={styles.proofAuthor}>
                  <span className={styles.proofAvatar}>{t.name.charAt(0)}</span>
                  <div>
                    <span className={styles.proofName}>{t.name}</span>
                    <span className={styles.proofPlace}>📍 {t.place}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── 5. Know Your Rights ──── */}
      <section className={`section ${styles.knowSection}`}>
        <div className="container">
          <div className={styles.knowGrid}>
            <div className={styles.knowFact}>
              <span className={styles.knowBadge}>💡 தெரியுமா? · Did You Know?</span>
              <h3 className={styles.knowTitle}>
                Tamil Nadu property registration costs <span>11%</span> of property value
              </h3>
              <p className={styles.knowDesc}>
                At 7% stamp duty + 4% registration, TN has one of the highest property registration costs in India.
                On a ₹50 lakh property, you'll pay <strong>₹5.5 lakh extra</strong> in government fees alone.
              </p>
              <Link href="/tools/property-calculator" className={styles.knowCta}>
                Calculate Your Exact Cost →
              </Link>
            </div>
            <div className={styles.knowChecklist}>
              <h4 className={styles.checklistTitle}>
                🏠 Before Buying Property in TN
                <span>சொத்து வாங்கும் முன்</span>
              </h4>
              <ul className={styles.checklistItems}>
                <li className={styles.checklistItem}>
                  <span className={styles.checkIcon}>✅</span>
                  <div>
                    <strong>Check DTCP / CMDA approval</strong>
                    <span>Planning authority jurisdiction verification</span>
                  </div>
                </li>
                <li className={styles.checklistItem}>
                  <span className={styles.checkIcon}>✅</span>
                  <div>
                    <strong>Get EC for 30 years</strong>
                    <span>Encumbrance Certificate from Sub-Registrar</span>
                  </div>
                </li>
                <li className={styles.checklistItem}>
                  <span className={styles.checkIcon}>✅</span>
                  <div>
                    <strong>Verify Patta & Chitta</strong>
                    <span>Revenue records must match seller name</span>
                  </div>
                </li>
                <li className={styles.checklistItem}>
                  <span className={styles.checkIcon}>✅</span>
                  <div>
                    <strong>Calculate total cost</strong>
                    <span>Including stamp duty, registration & legal fees</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ──── 6. Districts by Region ──── */}
      <section className={`section ${styles.regionSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">மாவட்டங்கள் · Districts</span>
            <h2>Property Tools for Your District</h2>
            <p>All 38 Tamil Nadu districts supported — find yours</p>
          </div>
          <div className={styles.regionGrid}>
            {regions.map((region, ri) => (
              <div key={ri} className={styles.regionCard}>
                <h4 className={styles.regionName}>{region.name}</h4>
                <div className={styles.regionDistricts}>
                  {region.districts.map((d) => (
                    <Link key={d} href="/tools/jurisdiction-finder" className={styles.regionChip}>
                      {d}
                    </Link>
                  ))}
                  {region.more > 0 && (
                    <span className={styles.regionMore}>+{region.more} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── 7. FAQ + CTA ──── */}
      <section className={`section ${styles.faqSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">அடிக்கடி கேட்கப்படும் கேள்விகள் · FAQ</span>
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers about Tamil Nadu property laws and our tools</p>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <details key={i} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{faq.q}</summary>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </details>
            ))}
            {/* Integrated CTA as final item */}
            <div className={styles.faqCta}>
              <div className={styles.faqCtaContent}>
                <span className={styles.faqCtaEmoji}>🤝</span>
                <div>
                  <h4>இன்னும் சந்தேகம்? · Still Have Questions?</h4>
                  <p>Connect with a verified local property expert on WhatsApp</p>
                </div>
              </div>
              <a
                href="https://wa.me/919876543210?text=Hi%20PlanPodu%20-%20I%20need%20help%20with%20property"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                © Chat with Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Expert CTA */}
      <ExpertCTA />
    </>
  );
}
