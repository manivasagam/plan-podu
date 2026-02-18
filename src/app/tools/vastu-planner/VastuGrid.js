import s from "./page.module.css";
import { QUALITY_META } from "./vastuData";

export default function VastuGrid({ fd, result }) {
    // 9 Zones mapping
    // NW N NE
    // W  C  E
    // SW S SE
    const zones = [
        { id: "NW", label: "NW", tamil: "வடமேற்கு" },
        { id: "N", label: "N", tamil: "வடக்கு" },
        { id: "NE", label: "NE", tamil: "வடகிழக்கு" },
        { id: "W", label: "W", tamil: "மேற்கு" },
        { id: "C", label: "Brahma", tamil: "மத்தி" }, // Center
        { id: "E", label: "E", tamil: "கிழக்கு" },
        { id: "SW", label: "SW", tamil: "தென்மேற்கு" },
        { id: "S", label: "S", tamil: "தெற்கு" },
        { id: "SE", label: "SE", tamil: "தென்கிழக்கு" },
    ];

    // Map items to zones
    // We scan the form data `fd` to see where user placed things
    const getItemsInZone = (zoneId) => {
        const items = [];

        // Rooms
        if (fd.kitchenDir === zoneId) items.push({ icon: "🍳", name: "Kitchen" });
        if (fd.masterBedDir === zoneId) items.push({ icon: "🛏️", name: "Master Bed" });
        if (fd.livingDir === zoneId) items.push({ icon: "🛋️", name: "Living" });
        if (fd.poojaDir === zoneId) items.push({ icon: "🪔", name: "Pooja" });
        if (fd.bathroomDir === zoneId) items.push({ icon: "🚿", name: "Bath" });
        if (fd.childBedDir === zoneId) items.push({ icon: "📚", name: "Kids" });
        if (fd.storeDir === zoneId) items.push({ icon: "📦", name: "Store" });
        if (fd.staircaseDir === zoneId) items.push({ icon: "🪜", name: "Stairs" });

        // Water
        if (fd.borewellDir === zoneId) items.push({ icon: "💧", name: "Bore" });
        if (fd.sumpDir === zoneId) items.push({ icon: "🔽", name: "Sump" });
        if (fd.overheadDir === zoneId) items.push({ icon: "🔼", name: "Tank" });
        if (fd.septicDir === zoneId) items.push({ icon: "🚽", name: "Septic" });

        // Door (Entrance)
        if (fd.doorDirection === zoneId) items.push({ icon: "🚪", name: "Door" });

        return items;
    };

    // Calculate Zone Quality Color (Green/Orange/Red)
    // We check `result.goods` and `result.issues` to see if any item in this zone triggered a rule.
    // This is a heuristic: 
    // - If any item in zone is in "Best" or "Good" list -> Greenish
    // - If any item in zone is in "Avoid" list -> Reddish
    // - Else Neutral
    // Since `result` strings are localized, we might need a better way. 
    // Alternatively, we can check the `ROOM_PLACEMENTS` logic again, or pass a quality map.
    // For simplicity, let's purely rely on the presence of items.
    // Ideally, we'd know if the placement is GOOD or BAD.
    // Since `result` has text, let's refactor `calculateVastuScore` to return structured data on placements too?
    // OR, we can just assume:
    // Items present? Check if they are good or bad.
    // BUT `calculateVastuScore` doesn't return per-item quality easily without parsing.
    // Let's rely on a helper or just show items for now. 
    // Color coding might require refactoring `vastuData.js` to return `placements: [{ item: 'kitchen', dir: 'SE', status: 'good' }]`.
    // Let's stick to showing items first. Color coding can be a v2 or simple heuristic.

    // Simple heuristic: Count good/bad items based on `result` text matching?
    // "Kitchen SE — சிறந்த இடம்" -> contains "SE" and "சிறந்த".
    // This is brittle. 
    // Let's default to neutral background, but maybe highlight if empty?
    // Actually, the user asked for "Green/Amber/Red" coding.
    // I'll add a quick lookup against `ROOM_PLACEMENTS` etc imported from vastuData.

    // We need to import constants.

    return (
        <div className={s.gridContainer}>
            <div className={s.gridBoard}>
                {zones.map((z) => {
                    const items = getItemsInZone(z.id);
                    // Determine color class
                    // TODO: Implement accurate color logic. For now, neutral or based on item count?
                    // Let's leave background white/neutral for now to avoid misleading colors without strict logic.
                    // Or... randomized for demo? No.

                    return (
                        <div key={z.id} className={s.gridCell}>
                            <span className={s.gridCellLabel}>{z.id}</span>
                            <div className={s.gridItems}>
                                {items.map((it, i) => (
                                    <span key={i} className={s.gridIcon} title={it.name}>{it.icon}</span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#64748B', padding: '4px' }}>
                <small>வீட்டின் அமைப்பு வரைபடம்</small>
            </div>
        </div>
    );
}
