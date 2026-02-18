"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const tools = [
    { name: "Property Calculator", href: "/tools/property-calculator", icon: "🏠" },
    { name: "Area Converter", href: "/tools/area-converter", icon: "📐" },
    { name: "CMDA / DTCP Finder", href: "/tools/jurisdiction-finder", icon: "🔍" },
    { name: "Vastu Planner", href: "/tools/vastu-planner", icon: "🧭" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.inner}`}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>📋</span>
                    <span className={styles.logoText}>
                        Plan<span className={styles.logoAccent}>Podu</span>.in
                    </span>
                </Link>

                <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
                    <Link href="/" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                        Home
                    </Link>

                    <div
                        className={styles.dropdown}
                        onMouseEnter={() => setToolsOpen(true)}
                        onMouseLeave={() => setToolsOpen(false)}
                    >
                        <button
                            className={styles.navLink}
                            onClick={() => setToolsOpen(!toolsOpen)}
                            aria-expanded={toolsOpen}
                        >
                            Tools
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={`${styles.chevron} ${toolsOpen ? styles.chevronOpen : ""}`}>
                                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </svg>
                        </button>
                        <div className={`${styles.dropdownMenu} ${toolsOpen ? styles.dropdownOpen : ""}`}>
                            {tools.map((tool) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    className={styles.dropdownItem}
                                    onClick={() => { setToolsOpen(false); setMenuOpen(false); }}
                                >
                                    <span className={styles.dropdownIcon}>{tool.icon}</span>
                                    <span>{tool.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/about" className={styles.navLink} onClick={() => setMenuOpen(false)}>
                        About
                    </Link>
                </nav>

                <button
                    className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}
