// Tamil Nadu Districts, Taluks, and CMA classification data
// CMA = Chennai Metropolitan Area (under CMDA)
// All other areas fall under DTCP

export const TN_DISTRICTS = [
    {
        name: "Ariyalur",
        taluks: ["Ariyalur", "Jayamkondam", "Sendurai", "Andimadam", "Udayarpalayam", "T.Palur"],
        cma: false,
    },
    {
        name: "Chengalpattu",
        taluks: ["Chengalpattu", "Cheyyur", "Maduranthakam", "Tambaram", "Tiruporur", "Pallavaram", "Vandalur", "Alandur", "Sholinganallur", "Thirukazhukundram", "Mamallapuram"],
        cma: true, // Partially CMA (most taluks)
        cmaTaluks: ["Tambaram", "Tiruporur", "Pallavaram", "Vandalur", "Alandur", "Sholinganallur", "Chengalpattu", "Thirukazhukundram", "Mamallapuram"],
    },
    {
        name: "Chennai",
        taluks: ["Ambattur", "Aminjikarai", "Egmore", "Fort Tondiarpet", "Guindy", "Madhavaram", "Mambalam", "Mylapore", "Perambur", "Sholinganallur", "Tondiarpet", "Velachery", "Alandur"],
        cma: true, // Fully CMA
    },
    {
        name: "Coimbatore",
        taluks: ["Coimbatore North", "Coimbatore South", "Mettupalayam", "Pollachi", "Sulur", "Valparai", "Annur", "Kinathukadavu", "Madukkarai", "Perur", "Thondamuthur"],
        cma: false,
    },
    {
        name: "Cuddalore",
        taluks: ["Cuddalore", "Chidambaram", "Kattumannarkoil", "Bhuvanagiri", "Panruti", "Tittakudi", "Vriddhachalam", "Kurinjipadi"],
        cma: false,
    },
    {
        name: "Dharmapuri",
        taluks: ["Dharmapuri", "Harur", "Karimangalam", "Nallampalli", "Palacode", "Pappireddipatti", "Pennagaram"],
        cma: false,
    },
    {
        name: "Dindigul",
        taluks: ["Dindigul", "Attur", "Kodaikanal", "Natham", "Nilakottai", "Oddanchatram", "Palani", "Vedasandur"],
        cma: false,
    },
    {
        name: "Erode",
        taluks: ["Erode", "Anthiyur", "Bhavani", "Gobichettipalayam", "Kodumudi", "Modakkurichi", "Nambiyur", "Perundurai", "Sathyamangalam"],
        cma: false,
    },
    {
        name: "Kallakurichi",
        taluks: ["Kallakurichi", "Chinnasalem", "Sankarapuram", "Tirukoilur", "Ulundurpettai"],
        cma: false,
    },
    {
        name: "Kanchipuram",
        taluks: ["Kanchipuram", "Kundrathur", "Sriperumbudur", "Uthiramerur", "Walajabad"],
        cma: true, // Partially CMA
        cmaTaluks: ["Kanchipuram", "Kundrathur", "Sriperumbudur"],
    },
    {
        name: "Kanyakumari",
        taluks: ["Nagercoil", "Agastheeswaram", "Kalkulam", "Killiyur", "Thovalai", "Vilavancode"],
        cma: false,
    },
    {
        name: "Karur",
        taluks: ["Karur", "Aravakurichi", "Krishnarayapuram", "Kulithalai", "Manmangalam", "Thanthoni"],
        cma: false,
    },
    {
        name: "Krishnagiri",
        taluks: ["Krishnagiri", "Bargur", "Denkanikottai", "Hosur", "Kaveripattinam", "Shoolagiri", "Uthangarai", "Veppanapalli", "Pochampalli"],
        cma: false,
    },
    {
        name: "Madurai",
        taluks: ["Madurai North", "Madurai South", "Melur", "Peraiyur", "Thirumangalam", "Usilampatti", "Vadipatti", "Sedapatti"],
        cma: false,
    },
    {
        name: "Mayiladuthurai",
        taluks: ["Mayiladuthurai", "Kuthalam", "Sirkazhi", "Tharangambadi"],
        cma: false,
    },
    {
        name: "Nagapattinam",
        taluks: ["Nagapattinam", "Kilvelur", "Thirukkuvalai", "Vedaranyam"],
        cma: false,
    },
    {
        name: "Namakkal",
        taluks: ["Namakkal", "Komarapalayam", "Paramathi-Velur", "Rasipuram", "Senthamangalam", "Tiruchengode"],
        cma: false,
    },
    {
        name: "Nilgiris",
        taluks: ["Udhagamandalam", "Coonoor", "Gudalur", "Kotagiri", "Pandalur", "Kundah"],
        cma: false,
    },
    {
        name: "Perambalur",
        taluks: ["Perambalur", "Alathur", "Kunnam", "Veppanthattai"],
        cma: false,
    },
    {
        name: "Pudukkottai",
        taluks: ["Pudukkottai", "Alangudi", "Aranthangi", "Avudayarkoil", "Gandarvakottai", "Illupur", "Karambakudi", "Manamelkudi", "Thirumayam"],
        cma: false,
    },
    {
        name: "Ramanathapuram",
        taluks: ["Ramanathapuram", "Kamuthi", "Kadaladi", "Mudukulathur", "Paramakudi", "Rameswaram", "Tiruvadanai"],
        cma: false,
    },
    {
        name: "Ranipet",
        taluks: ["Ranipet", "Arakkonam", "Arcot", "Nemili", "Sholinghur", "Walajah", "Timiri"],
        cma: false,
    },
    {
        name: "Salem",
        taluks: ["Salem", "Attur", "Edappadi", "Gangavalli", "Kadayampatti", "Mettur", "Omalur", "Peddanaickenpalayam", "Sankari", "Vazhapadi", "Yercaud"],
        cma: false,
    },
    {
        name: "Sivaganga",
        taluks: ["Sivaganga", "Devakottai", "Ilayangudi", "Kalayarkoil", "Karaikudi", "Manamadurai", "Tirupathur"],
        cma: false,
    },
    {
        name: "Tenkasi",
        taluks: ["Tenkasi", "Alangulam", "Kadayanallur", "Sankarankoil", "Shencottai", "Sivagiri"],
        cma: false,
    },
    {
        name: "Thanjavur",
        taluks: ["Thanjavur", "Kumbakonam", "Orathanadu", "Papanasam", "Pattukkottai", "Peravurani", "Thiruvaiyaru", "Thiruvidaimarudur", "Budalur"],
        cma: false,
    },
    {
        name: "Theni",
        taluks: ["Theni", "Andipatti", "Bodinayakanur", "Periyakulam", "Uthamapalayam"],
        cma: false,
    },
    {
        name: "Thoothukudi",
        taluks: ["Thoothukudi", "Ettayapuram", "Kovilpatti", "Ottapidaram", "Sathankulam", "Srivaikundam", "Tiruchendur", "Vilathikulam"],
        cma: false,
    },
    {
        name: "Tiruchirappalli",
        taluks: ["Tiruchirappalli", "Lalgudi", "Manachanallur", "Manapparai", "Marungapuri", "Musiri", "Srirangam", "Thottiyam", "Thuraiyur", "Uppiliyapuram"],
        cma: false,
    },
    {
        name: "Tirunelveli",
        taluks: ["Tirunelveli", "Ambasamudram", "Cheranmahadevi", "Manur", "Nanguneri", "Palayamkottai", "Radhapuram", "Tenkasi"],
        cma: false,
    },
    {
        name: "Tirupattur",
        taluks: ["Tirupattur", "Ambur", "Natrampalli", "Vaniyambadi"],
        cma: false,
    },
    {
        name: "Tiruppur",
        taluks: ["Tiruppur North", "Tiruppur South", "Avinashi", "Dharapuram", "Kangeyam", "Madathukulam", "Palladam", "Udumalaipettai", "Uthukuli"],
        cma: false,
    },
    {
        name: "Tiruvallur",
        taluks: ["Tiruvallur", "Ambattur", "Avadi", "Gummidipoondi", "Madhavaram", "Minjur", "Ponneri", "Poonamallee", "Tiruttani", "Uthukottai", "RK Pet", "Pallipattu"],
        cma: true, // Partially CMA
        cmaTaluks: ["Tiruvallur", "Ambattur", "Avadi", "Gummidipoondi", "Madhavaram", "Minjur", "Ponneri", "Poonamallee"],
    },
    {
        name: "Tiruvannamalai",
        taluks: ["Tiruvannamalai", "Arani", "Chengam", "Cheyyar", "Chetpet", "Kalasapakkam", "Kilpennathur", "Polur", "Thandrampattu", "Vandavasi", "Vembakkam", "West Arani"],
        cma: false,
    },
    {
        name: "Vellore",
        taluks: ["Vellore", "Anaicut", "Gudiyatham", "Katpadi", "Pernambut", "Sholinghur"],
        cma: false,
    },
    {
        name: "Villupuram",
        taluks: ["Villupuram", "Gingee", "Kandachipuram", "Marakkanam", "Melmalayanur", "Mugaiyur", "Thiruvennainallur", "Tindivanam", "Vanur", "Vikravandi"],
        cma: false,
    },
    {
        name: "Virudhunagar",
        taluks: ["Virudhunagar", "Aruppukkottai", "Kariapatti", "Rajapalayam", "Sattur", "Sivakasi", "Srivilliputhur", "Tiruchuli", "Watrap"],
        cma: false,
    },
];

// Document checklist based on TNCDBR (Tamil Nadu Combined Development and Building Rules)
export const DOCUMENT_CHECKLIST = [
    {
        category: "Ownership",
        icon: "📜",
        color: "#8B5CF6",
        documents: [
            { name: "Sale Deed (Registered)", mandatory: true },
            { name: "Parent Deed (Chain of ownership for 30 years)", mandatory: true },
            { name: "Encumbrance Certificate (EC) — 30 years", mandatory: true },
        ],
    },
    {
        category: "Revenue",
        icon: "🏛️",
        color: "#0D6E4F",
        documents: [
            { name: "Patta (Latest copy from e-Services portal)", mandatory: true },
            { name: "Chitta (Land classification record)", mandatory: true },
            { name: "Adangal (Village account extract)", mandatory: true },
        ],
    },
    {
        category: "Technical",
        icon: "📐",
        color: "#3B82F6",
        documents: [
            { name: "FMB Sketch (Field Measurement Book)", mandatory: true },
            { name: "Site Plan (Scale 1:400)", mandatory: true },
            { name: "Topo Plan (Topographical survey plan)", mandatory: true },
        ],
    },
    {
        category: "Legal",
        icon: "⚖️",
        color: "#D4A843",
        documents: [
            { name: "Self-declaration Affidavit of Ownership", mandatory: true },
            { name: "Structural Stability Certificate (for existing buildings)", mandatory: false },
        ],
    },
];

// Deemed NOC timelines (2026 Government Update)
export const DEEMED_NOC_TIMELINES = [
    {
        department: "Fire & Rescue Services",
        icon: "🔥",
        nonHighRise: 15,
        highRise: 30,
        description: "Fire safety clearance for building construction",
    },
    {
        department: "State Highways / NHAI",
        icon: "🛣️",
        days: 30,
        description: "NOC for properties abutting state or national highways",
    },
    {
        department: "Geology & Mining",
        icon: "⛰️",
        days: 30,
        description: "Clearance for geological and mining safety",
    },
    {
        department: "PWD / WRD (Water Resources)",
        icon: "💧",
        days: 30,
        description: "Clearance from Public Works / Water Resources Department",
    },
];

// Land type classifications
export const LAND_TYPES = [
    {
        key: "agricultural",
        label: "Agricultural Land (Nanjai / Punjai)",
        icon: "🌾",
        warning: true,
        message: "You must first apply for Non-Agricultural Purpose (CLU - Change of Land Use) through the District Collector's Office before any building approval can be obtained.",
        action: "Apply for CLU (Change of Land Use) at the District Collector's Office",
        timeline: "30–90 working days for CLU conversion",
    },
    {
        key: "approved",
        label: "Vacant Plot (Approved Layout)",
        icon: "✅",
        warning: false,
        message: "Your plot is in an approved layout and is eligible for direct building plan approval. Proceed with the document collection.",
        action: "Proceed directly to building plan application",
        timeline: "Standard processing timeline applies",
    },
    {
        key: "unapproved",
        label: "Vacant Plot (Unapproved Layout)",
        icon: "⚠️",
        warning: true,
        message: "Your plot is in an unapproved layout. Check if it qualifies under the 2017 Regularization Scheme. If regularized, you can proceed; otherwise, layout approval must be obtained first.",
        action: "Check 2017 Regularization Scheme status at Taluk Office / DTCP",
        timeline: "Additional 30–60 days for regularization verification",
    },
    {
        key: "redevelopment",
        label: "Re-development (Existing Building)",
        icon: "🏗️",
        warning: false,
        message: "For re-development of an existing structure, you need the existing building's approved plan, demolition permit, and structural stability certificate in addition to standard documents.",
        action: "Obtain demolition permit + structural stability certificate",
        timeline: "Standard processing + demolition clearance (15 days)",
    },
];

// Special NOC trigger questions
export const NOC_TRIGGERS = [
    {
        key: "railway",
        question: "Is the site within 30 metres of Railway tracks?",
        icon: "🚂",
        noc: "Railway NOC",
        department: "Indian Railways / Southern Railway",
        details: "Properties within 30m of railway tracks require a No-Objection Certificate from Indian Railways. Apply via the Divisional Railway Manager's office.",
        timeline: "30–45 days",
    },
    {
        key: "airport",
        question: "Is it near an Airport or Air Force base?",
        icon: "✈️",
        noc: "AAI NOC / Color Coded Zoning Map",
        department: "Airports Authority of India (AAI) / IAF",
        details: "Properties near airports/air force bases need height clearance. Obtain the Color Coded Zoning Map from AAI to determine maximum permissible height.",
        timeline: "30–60 days",
    },
    {
        key: "coastal",
        question: "Is the site within 500 metres of the coast?",
        icon: "🌊",
        noc: "CRZ Approval (Coastal Regulation Zone)",
        department: "Tamil Nadu Coastal Zone Management Authority (TNCZMA)",
        details: "Properties within 500m of the High Tide Line fall under CRZ norms. CRZ-I (0-200m) — no construction allowed. CRZ-II (200-500m) — regulated construction with approval.",
        timeline: "60–90 days",
    },
];
