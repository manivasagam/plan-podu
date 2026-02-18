// ─── Vastu Data Layer ─────────────────────────────────────────
// Pada system, room placements, water rules, slope/color guidance,
// and the master score calculation function.

// ═══════════════════════════════════════════════════════════════
//  PADA SYSTEM  –  4 directions × 9 padas
// ═══════════════════════════════════════════════════════════════
export const PADA_SYSTEM = {
    NORTH: {
        direction: "வடக்கு (North)",
        padas: {
            1: { name: "Murika", tamil: "முரிகா", lord: "Kubera", quality: "GOOD" },
            2: { name: "Bhootadhara", tamil: "பூதாதரா", lord: "Yama", quality: "NEUTRAL" },
            3: { name: "Soma", tamil: "சோமா", lord: "Bhallata", quality: "EXCELLENT" },
            4: { name: "Bhallata", tamil: "பல்லாட", lord: "Mukhya", quality: "EXCELLENT" },
            5: { name: "Mukhya", tamil: "முக்யா", lord: "Soma", quality: "EXCELLENT" },
            6: { name: "Aditi", tamil: "அதிதி", lord: "Aditi", quality: "EXCELLENT" },
            7: { name: "Diti", tamil: "தீதி", lord: "Diti", quality: "BAD" },
            8: { name: "Rudra", tamil: "ருத்ரா", lord: "Rudra", quality: "BAD" },
            9: { name: "Rojaka", tamil: "ரோஜகா", lord: "Isha", quality: "NEUTRAL" },
        },
    },
    EAST: {
        direction: "கிழக்கு (East)",
        padas: {
            1: { name: "Jayanta", tamil: "ஜெயந்தா", lord: "Indra", quality: "GOOD" },
            2: { name: "Indra", tamil: "இந்திரா", lord: "Parjanya", quality: "EXCELLENT" },
            3: { name: "Surya", tamil: "சூர்யா", lord: "Surya", quality: "EXCELLENT" },
            4: { name: "Satya", tamil: "சத்யா", lord: "Satya", quality: "EXCELLENT" },
            5: { name: "Bhusha", tamil: "பூஷா", lord: "Bhusha", quality: "EXCELLENT" },
            6: { name: "Vitattha", tamil: "விதாத்தா", lord: "Akasha", quality: "BAD" },
            7: { name: "Gruhakshat", tamil: "க்ருஹருத்சிதா", lord: "Yama", quality: "BAD" },
            8: { name: "Yama", tamil: "யமா", lord: "Gandharva", quality: "BAD" },
            9: { name: "Gandharva", tamil: "காந்தர்வா", lord: "Bhrungraj", quality: "NEUTRAL" },
        },
    },
    SOUTH: {
        direction: "தெற்கு (South)",
        padas: {
            1: { name: "Vitattha", tamil: "விதாத்தா", lord: "Gruhakshat", quality: "BAD" },
            2: { name: "Gruhakshat", tamil: "க்ருஹருத்சிதா", lord: "Yama", quality: "BAD" },
            3: { name: "Yama", tamil: "யமா", lord: "Gandharva", quality: "BAD" },
            4: { name: "Gandharva", tamil: "காந்தர்வா", lord: "Bhrungraj", quality: "NEUTRAL" },
            5: { name: "Bhrungraj", tamil: "பிருங்கராஜா", lord: "Mriga", quality: "NEUTRAL" },
            6: { name: "Mriga", tamil: "ம்ருகா", lord: "Pitru", quality: "GOOD" },
            7: { name: "Pitru", tamil: "பித்ரு", lord: "Dauvarika", quality: "GOOD" },
            8: { name: "Dauvarika", tamil: "தௌவாரிகா", lord: "Sugriva", quality: "EXCELLENT" },
            9: { name: "Sugriva", tamil: "சுக்ரீவா", lord: "Pushpadanta", quality: "EXCELLENT" },
        },
    },
    WEST: {
        direction: "மேற்கு (West)",
        padas: {
            1: { name: "Varuna", tamil: "வருணா", lord: "Asura", quality: "NEUTRAL" },
            2: { name: "Asura", tamil: "அசுரா", lord: "Shosha", quality: "BAD" },
            3: { name: "Shosha", tamil: "ஷோஷா", lord: "Papayakshma", quality: "BAD" },
            4: { name: "Papayakshma", tamil: "பாபயக்ஷா", lord: "Roga", quality: "BAD" },
            5: { name: "Roga", tamil: "ரோகா", lord: "Naga", quality: "BAD" },
            6: { name: "Naga", tamil: "நாகா", lord: "Mukhya", quality: "NEUTRAL" },
            7: { name: "Mukhya", tamil: "முக்யா", lord: "Bhallata", quality: "GOOD" },
            8: { name: "Bhallata", tamil: "பல்லாட", lord: "Soma", quality: "GOOD" },
            9: { name: "Soma", tamil: "சோமா", lord: "Pitru", quality: "EXCELLENT" },
        },
    },
};

export const QUALITY_META = {
    EXCELLENT: { label: "மிகச்சிறந்தது", emoji: "✅", color: "#059669", score: 25 },
    GOOD: { label: "நல்லது", emoji: "👍", color: "#0D6E4F", score: 20 },
    NEUTRAL: { label: "சராசரி", emoji: "⚠️", color: "#D97706", score: 10 },
    BAD: { label: "தவிர்க்கவும்", emoji: "❌", color: "#DC2626", score: 0 },
};

// ═══════════════════════════════════════════════════════════════
//  ROOM PLACEMENT RULES
// ═══════════════════════════════════════════════════════════════
export const ROOM_PLACEMENTS = {
    kitchen: {
        label: "Kitchen", tamil: "சமையலறை", icon: "🍳",
        best: ["SE"], good: ["NW"], avoid: ["NE", "SW", "N", "E"],
        tips: [
            "சமையல் அடுப்பு தென்கிழக்கு மூலையில்",
            "சிங்க் வடகிழக்கு பக்கம்",
            "எரிவாயு சிலிண்டர் தென்கிழக்கு",
        ],
    },
    pooja: {
        label: "Pooja Room", tamil: "பூஜை அறை", icon: "🪔",
        best: ["NE"], good: ["N", "E"], avoid: ["SW", "S", "W", "SE", "NW"],
        tips: [
            "வடகிழக்கு மூலையில் சிறந்தது",
            "தரை மட்டத்தை விட சற்று உயரமாக",
            "வெள்ளை/மஞ்சள் நிறம் சிறந்தது",
        ],
    },
    masterBed: {
        label: "Master Bedroom", tamil: "பெரிய படுக்கையறை", icon: "🛏️",
        best: ["SW"], good: ["S", "W"], avoid: ["NE", "SE"],
        tips: [
            "தென்மேற்கு மூலை சிறந்தது",
            "படுக்கையின் தலை தெற்கு/மேற்கு பக்கம்",
            "கதவு கிழக்கு/வடக்கு பக்கம்",
        ],
    },
    childBed: {
        label: "Children's Room", tamil: "குழந்தைகள் அறை", icon: "📚",
        best: ["W", "NW"], good: ["N"], avoid: ["SW", "SE"],
        tips: [
            "மேற்கு/வடமேற்கு சிறந்தது",
            "படிக்கும் மேசை கிழக்கு/வடக்கு பக்கம்",
        ],
    },
    living: {
        label: "Living Hall", tamil: "ஹால்", icon: "🛋️",
        best: ["N", "NE", "E"], good: ["NW"], avoid: ["SW"],
        tips: [
            "வடக்கு/கிழக்கு பக்கம் சிறந்தது",
            "அதிக வெளிச்சம் வர வேண்டும்",
            "கனமான பொருட்கள் தென்மேற்கு பக்கம்",
        ],
    },
    bathroom: {
        label: "Bathroom", tamil: "குளியலறை", icon: "🚿",
        best: ["NW", "W", "S"], good: ["SE"], avoid: ["NE", "SW", "N", "E"],
        tips: [
            "வடமேற்கு/மேற்கு சிறந்தது",
            "கழிவறை தென்மேற்கு மூலையில் இருக்கக்கூடாது",
        ],
    },
    store: {
        label: "Store Room", tamil: "களஞ்சியம்", icon: "📦",
        best: ["SW", "W", "S"], good: ["NW"], avoid: ["NE", "N", "E"],
        tips: [
            "தென்மேற்கு சிறந்தது",
            "கனமான பொருட்கள் SW-ல்",
        ],
    },
    staircase: {
        label: "Staircase", tamil: "படிக்கட்டு", icon: "🪜",
        best: ["SW", "S", "W"], good: ["SE"], avoid: ["NE", "N", "E", "CENTER"],
        tips: [
            "தென்மேற்கு மூலையில் சிறந்தது",
            "வலப்புறம் திரும்ப வேண்டும்",
            "ஒற்றைப்படை படிகள் சிறந்தது",
        ],
    },
};

// ═══════════════════════════════════════════════════════════════
//  WATER ELEMENT RULES
// ═══════════════════════════════════════════════════════════════
export const WATER_PLACEMENTS = {
    borewell: {
        label: "Bore Well / Well", tamil: "கிணறு / போர்வெல்", icon: "💧",
        best: ["NE"], good: ["N", "E"], avoid: ["SW", "S", "W", "SE", "NW"],
        reason: "ஈசான்ய மூலை — நீர் தெய்வம் வாழும் இடம்",
    },
    sump: {
        label: "Underground Sump", tamil: "நீர் தொட்டி (கீழே)", icon: "🔽",
        best: ["NE"], good: ["N", "E"], avoid: ["SW", "SE"],
        reason: "நீர் சேமிப்பு வடகிழக்கில்",
    },
    overhead: {
        label: "Overhead Tank", tamil: "நீர் தொட்டி (மேலே)", icon: "🔼",
        best: ["SW", "W"], good: ["S"], avoid: ["NE", "N", "E"],
        reason: "கனம் தென்மேற்கில் இருக்க வேண்டும்",
    },
    septic: {
        label: "Septic Tank", tamil: "கழிவுநீர் தொட்டி", icon: "🚽",
        best: ["NW"], good: ["W", "S"], avoid: ["NE", "N", "E", "SW"],
        reason: "வாயு மூலை — கழிவு வெளியேற்றம்",
    },
};

// ═══════════════════════════════════════════════════════════════
//  SLOPE & COLOR RULES
// ═══════════════════════════════════════════════════════════════
export const SLOPE_RULES = {
    best: { higher: ["SW", "S", "W"], lower: ["NE", "N", "E"] },
    avoid: { higher: ["NE", "N", "E"], lower: ["SW", "S", "W"] },
    goodReason: "நீர் வடகிழக்கு நோக்கி ஓட வேண்டும் — செல்வம் உள்ளே வரும்",
    badReason: "செல்வம் வெளியேறும், பிரச்சனைகள் வரும்",
};

export const COLOR_SCHEME = {
    N: { tamil: "வடக்கு", good: ["வெள்ளை", "வெளிர் பச்சை", "கிரீம்"], avoid: ["சிவப்பு", "ஆரஞ்சு"] },
    E: { tamil: "கிழக்கு", good: ["வெள்ளை", "மஞ்சள்", "வெளிர் நீலம்"], avoid: ["கருப்பு", "அடர் சாம்பல்"] },
    S: { tamil: "தெற்கு", good: ["சிவப்பு", "ஆரஞ்சு", "இளஞ்சிவப்பு"], avoid: ["நீலம்", "கருப்பு"] },
    W: { tamil: "மேற்கு", good: ["வெள்ளை", "நீலம்", "சாம்பல்"], avoid: ["சிவப்பு"] },
};

// ═══════════════════════════════════════════════════════════════
//  DIRECTION HELPERS
// ═══════════════════════════════════════════════════════════════
export const DIRECTIONS_8 = [
    { key: "N", label: "North", tamil: "வடக்கு" },
    { key: "NE", label: "North-East", tamil: "வடகிழக்கு" },
    { key: "E", label: "East", tamil: "கிழக்கு" },
    { key: "SE", label: "South-East", tamil: "தென்கிழக்கு" },
    { key: "S", label: "South", tamil: "தெற்கு" },
    { key: "SW", label: "South-West", tamil: "தென்மேற்கு" },
    { key: "W", label: "West", tamil: "மேற்கு" },
    { key: "NW", label: "North-West", tamil: "வடமேற்கு" },
];

export const DIRECTIONS_4 = [
    { key: "N", label: "North", tamil: "வடக்கு" },
    { key: "E", label: "East", tamil: "கிழக்கு" },
    { key: "S", label: "South", tamil: "தெற்கு" },
    { key: "W", label: "West", tamil: "மேற்கு" },
];

// Map 8-direction key → pada system key (padas only exist for 4 cardinal)
const DIR_TO_PADA_KEY = { N: "NORTH", E: "EAST", S: "SOUTH", W: "WEST", NE: "EAST", SE: "SOUTH", SW: "WEST", NW: "NORTH" };

// ═══════════════════════════════════════════════════════════════
//  SCORE CALCULATION
// ═══════════════════════════════════════════════════════════════
export function calculateVastuScore(fd) {
    const issues = [];
    const goods = [];
    let score = 0;
    const maxScore = 100;

    // 1. Entrance Pada  (max 25)
    const padaKey = DIR_TO_PADA_KEY[fd.doorDirection];
    const padaData = padaKey ? PADA_SYSTEM[padaKey] : null;
    const pada = padaData ? padaData.padas[fd.padaNumber] : null;
    if (pada) {
        const q = QUALITY_META[pada.quality];
        score += q.score;
        if (pada.quality === "EXCELLENT" || pada.quality === "GOOD") {
            goods.push(`வாசல் ${pada.tamil} பாதம் — ${q.label}`);
        } else {
            issues.push(`வாசல் ${pada.tamil} பாதம் — ${q.label}`);
        }
    }

    // 2. Room placements  (max 40 — 5 pts each for 8 rooms)
    const roomChecks = [
        { key: "kitchen", dir: fd.kitchenDir },
        { key: "pooja", dir: fd.poojaDir },
        { key: "masterBed", dir: fd.masterBedDir },
        { key: "living", dir: fd.livingDir },
        { key: "bathroom", dir: fd.bathroomDir },
        { key: "store", dir: fd.storeDir },
        { key: "staircase", dir: fd.staircaseDir },
    ].filter((r) => r.dir);

    roomChecks.forEach(({ key, dir }) => {
        const rule = ROOM_PLACEMENTS[key];
        if (!rule) return;
        if (rule.best.includes(dir)) {
            score += 5;
            goods.push(`${rule.tamil} ${dir} — சிறந்த இடம் ✅`);
        } else if (rule.good.includes(dir)) {
            score += 3;
            goods.push(`${rule.tamil} ${dir} — நல்ல இடம் 👍`);
        } else if (rule.avoid.includes(dir)) {
            issues.push(`${rule.tamil} ${dir} — தவிர்க்க வேண்டும் ❌`);
        } else {
            score += 2;
        }
    });

    // 3. Water elements  (max 20 — 5 pts each)
    const waterChecks = [
        { key: "borewell", dir: fd.borewellDir },
        { key: "sump", dir: fd.sumpDir },
        { key: "overhead", dir: fd.overheadDir },
        { key: "septic", dir: fd.septicDir },
    ].filter((w) => w.dir);

    waterChecks.forEach(({ key, dir }) => {
        const rule = WATER_PLACEMENTS[key];
        if (!rule) return;
        if (rule.best.includes(dir)) {
            score += 5;
            goods.push(`${rule.tamil} ${dir} — சிறந்த இடம் ✅`);
        } else if (rule.good.includes(dir)) {
            score += 3;
            goods.push(`${rule.tamil} ${dir} — நல்ல இடம் 👍`);
        } else if (rule.avoid.includes(dir)) {
            issues.push(`${rule.tamil} ${dir} — தவிர்க்கவும் ❌`);
        } else {
            score += 2;
        }
    });

    // 4. Slope  (max 15)
    if (fd.slopeHigher && fd.slopeLower) {
        if (SLOPE_RULES.best.higher.includes(fd.slopeHigher) && SLOPE_RULES.best.lower.includes(fd.slopeLower)) {
            score += 15;
            goods.push(`சாய்வு சரியான திசையில் — ${SLOPE_RULES.goodReason}`);
        } else if (SLOPE_RULES.avoid.higher.includes(fd.slopeHigher) || SLOPE_RULES.avoid.lower.includes(fd.slopeLower)) {
            issues.push(`சாய்வு தவறான திசையில் — ${SLOPE_RULES.badReason}`);
        } else {
            score += 7;
        }
    }

    // Normalise to 100
    const finalScore = Math.min(Math.round((score / maxScore) * 100), 100);

    return { score: finalScore, issues, goods, pada, padaData };
}
