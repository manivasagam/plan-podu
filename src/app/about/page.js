import styles from "./page.module.css";

export const metadata = {
    title: "About PlanPodu.in | Free Tamil Nadu Property Tools",
    description:
        "PlanPodu.in is a free tool platform for Tamil Nadu property buyers, builders, and citizens. Calculate stamp duty, convert land units, and more.",
};

export default function AboutPage() {
    return (
        <>
            <section className={styles.hero}>
                <div className="container">
                    <span className="section-label">About Us</span>
                    <h1>About PlanPodu.in</h1>
                    <p>
                        The Digital Swiss Army Knife for property decisions in Tamil Nadu
                    </p>
                </div>
            </section>

            <section className={`section ${styles.content}`}>
                <div className={`container ${styles.wrapper}`}>
                    <div className={styles.block}>
                        <h2>Our Mission</h2>
                        <p>
                            Buying property in Tamil Nadu shouldn&apos;t require a PhD. Yet,
                            between guideline values, stamp duty calculations, CMDA vs DTCP
                            confusion, and Vastu considerations — it often feels like it does.
                        </p>
                        <p>
                            <strong>PlanPodu.in</strong> exists to change that. We&apos;ve
                            built a suite of free, instant, mobile-friendly tools that
                            simplify the most complex real estate processes into a few taps.
                        </p>
                    </div>

                    <div className={styles.block}>
                        <h2>What We Offer</h2>
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <span>🏠</span>
                                <div>
                                    <h3>Property Cost Calculator</h3>
                                    <p>Know the true &quot;on-road&quot; cost of any property including hidden charges.</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <span>📐</span>
                                <div>
                                    <h3>Area Converter</h3>
                                    <p>Convert between Cent, Ground, Kuzhi, and all TN land units instantly.</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <span>🔍</span>
                                <div>
                                    <h3>Jurisdiction Finder</h3>
                                    <p>Check if your land is under CMDA or DTCP and get the right approval checklist.</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <span>🧭</span>
                                <div>
                                    <h3>Vastu Planner</h3>
                                    <p>Get AI-powered Vastu-compliant room placements for your plot.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.block}>
                        <h2>Built for Tamil Nadu</h2>
                        <p>
                            Every tool on PlanPodu.in is designed specifically for Tamil Nadu&apos;s
                            unique real estate landscape — from local land measurement units
                            like Kuzhi and Ground, to state-specific stamp duty rates and
                            authority jurisdictions.
                        </p>
                        <p>
                            We understand that 90% of our users access tools via mobile,
                            often shared through WhatsApp. That&apos;s why every result is
                            shareable with one tap.
                        </p>
                    </div>

                    <div className={styles.cta}>
                        <h2>Have Questions or Feedback?</h2>
                        <p>
                            We&apos;d love to hear from you. Reach out via WhatsApp and we&apos;ll
                            get back to you.
                        </p>
                        <a
                            href="https://wa.me/919999999999?text=Hi%2C%20I%20have%20a%20question%20about%20PlanPodu.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp btn-lg"
                        >
                            Chat with Us on WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
