import Link from "next/link";
import styles from "./Footer.module.css";

const toolLinks = [
    { name: "Property Calculator", href: "/tools/property-calculator" },
    { name: "Area Converter", href: "/tools/area-converter" },
    { name: "CMDA / DTCP Finder", href: "/tools/jurisdiction-finder" },
    { name: "Vastu Planner", href: "/tools/vastu-planner" },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <span>📋</span>
                            <span className={styles.logoText}>
                                Plan<span className={styles.logoAccent}>Podu</span>.in
                            </span>
                        </div>
                        <p className={styles.tagline}>
                            The Digital Swiss Army Knife for Tamil Nadu property buyers, builders & citizens.
                        </p>
                        <p className={styles.madeWith}>Made with ❤️ for Tamil Nadu</p>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Free Tools</h4>
                        <ul>
                            {toolLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className={styles.link}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Quick Links</h4>
                        <ul>
                            <li><Link href="/about" className={styles.link}>About Us</Link></li>
                            <li><Link href="/privacy" className={styles.link}>Privacy Policy</Link></li>
                            <li><Link href="/terms" className={styles.link}>Terms of Use</Link></li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h4 className={styles.colTitle}>Popular Districts</h4>
                        <ul>
                            <li><Link href="/registration-charges-in-chennai" className={styles.link}>Chennai</Link></li>
                            <li><Link href="/registration-charges-in-coimbatore" className={styles.link}>Coimbatore</Link></li>
                            <li><Link href="/registration-charges-in-madurai" className={styles.link}>Madurai</Link></li>
                            <li><Link href="/registration-charges-in-villupuram" className={styles.link}>Villupuram</Link></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} PlanPodu.in — All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
