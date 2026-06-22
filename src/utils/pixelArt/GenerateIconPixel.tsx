import { Product } from "@/src/types/product";

// Renders the correct inline pixel art SVG icon based on the product icon type
export function ItemIcon({ type, className = "w-14 h-14" }: { type: Product["iconType"]; className?: string }) {
    const pixelStyle: React.CSSProperties = {
        imageRendering: "pixelated",
        shapeRendering: "crispEdges"
    };

    switch (type) {
        case "keyboard":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    <rect x="1" y="4" width="14" height="8" fill="#4E3C44" />
                    <rect x="2" y="5" width="12" height="6" fill="#FFFDFD" />
                    <rect x="5" y="9" width="6" height="1" fill="#D9455B" />
                    <rect x="3" y="6" width="1" height="1" fill="#809F8C" />
                    <rect x="5" y="6" width="1" height="1" fill="#4E3C44" />
                    <rect x="7" y="6" width="1" height="1" fill="#4E3C44" />
                    <rect x="9" y="6" width="1" height="1" fill="#4E3C44" />
                    <rect x="11" y="6" width="1" height="1" fill="#809F8C" />
                    <rect x="3" y="8" width="1" height="1" fill="#4E3C44" />
                    <rect x="12" y="8" width="1" height="1" fill="#4E3C44" />
                </svg>
            );
        case "hoodie":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    <rect x="5" y="2" width="6" height="4" fill="#809F8C" />
                    <rect x="6" y="3" width="4" height="3" fill="#5E7869" />
                    <rect x="3" y="6" width="10" height="8" fill="#809F8C" />
                    <rect x="1" y="6" width="2" height="6" fill="#809F8C" />
                    <rect x="13" y="6" width="2" height="6" fill="#809F8C" />
                    <rect x="7" y="6" width="1" height="2" fill="#4E3C44" />
                    <rect x="8" y="6" width="1" height="2" fill="#4E3C44" />
                    <rect x="5" y="10" width="6" height="3" fill="#5E7869" />
                </svg>
            );
        case "console":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    <rect x="3" y="1" width="10" height="14" fill="#D9455B" />
                    <rect x="4" y="2" width="8" height="12" fill="#D9455B" />
                    <rect x="4" y="2" width="8" height="5" fill="#4E3C44" />
                    <rect x="5" y="3" width="6" height="3" fill="#809F8C" />
                    <rect x="5" y="9" width="3" height="1" fill="#4E3C44" />
                    <rect x="6" y="8" width="1" height="3" fill="#4E3C44" />
                    <rect x="9" y="9" width="1" height="1" fill="#4E3C44" />
                    <rect x="10" y="10" width="1" height="1" fill="#4E3C44" />
                </svg>
            );
        case "deskmat":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    <rect x="1" y="3" width="14" height="10" fill="#4E3C44" />
                    <rect x="2" y="4" width="12" height="8" fill="#FFFDFD" />
                    <rect x="5" y="4" width="1" height="8" fill="#E6C2BB" />
                    <rect x="9" y="4" width="1" height="8" fill="#E6C2BB" />
                    <rect x="2" y="6" width="12" height="1" fill="#E6C2BB" />
                    <rect x="2" y="9" width="12" height="1" fill="#E6C2BB" />
                    <rect x="11" y="7" width="2" height="3" fill="#D9455B" />
                </svg>
            );
        case "glasses":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    <rect x="2" y="6" width="5" height="5" fill="#4E3C44" />
                    <rect x="3" y="7" width="3" height="3" fill="#FFFDFD" />
                    <rect x="5" y="8" width="1" height="1" fill="#809F8C" opacity="0.6" />
                    <rect x="9" y="6" width="5" height="5" fill="#4E3C44" />
                    <rect x="10" y="7" width="3" height="3" fill="#FFFDFD" />
                    <rect x="12" y="8" width="1" height="1" fill="#809F8C" opacity="0.6" />
                    <rect x="7" y="8" width="2" height="1" fill="#4E3C44" />
                    <rect x="1" y="6" width="1" height="1" fill="#4E3C44" />
                    <rect x="15" y="6" width="1" height="1" fill="#4E3C44" />
                </svg>
            );
        case "keychain":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    <rect x="7" y="1" width="2" height="1" fill="#4E3C44" />
                    <rect x="7" y="2" width="2" height="1" fill="#E6C2BB" />
                    <rect x="7" y="3" width="2" height="1" fill="#4E3C44" />
                    <rect x="7" y="4" width="2" height="1" fill="#E6C2BB" />
                    <rect x="7" y="5" width="2" height="1" fill="#4E3C44" />
                    <rect x="5" y="6" width="6" height="2" fill="#D9455B" />
                    <rect x="4" y="7" width="8" height="3" fill="#D9455B" />
                    <rect x="5" y="10" width="6" height="2" fill="#D9455B" />
                    <rect x="6" y="12" width="4" height="2" fill="#D9455B" />
                    <rect x="7" y="14" width="2" height="1" fill="#D9455B" />
                    <rect x="4" y="7" width="1" height="3" fill="#4E3C44" />
                    <rect x="11" y="7" width="1" height="3" fill="#4E3C44" />
                    <rect x="5" y="6" width="2" height="1" fill="#4E3C44" />
                    <rect x="9" y="6" width="2" height="1" fill="#4E3C44" />
                    <rect x="5" y="7" width="2" height="2" fill="#FFFDFD" />
                </svg>
            );
        case "mug":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    <rect x="5" y="1" width="1" height="2" fill="#E6C2BB" />
                    <rect x="8" y="1" width="1" height="2" fill="#E6C2BB" />
                    <rect x="11" y="1" width="1" height="2" fill="#E6C2BB" />
                    <rect x="4" y="4" width="8" height="10" fill="#4E3C44" />
                    <rect x="5" y="5" width="6" height="8" fill="#D9455B" />
                    <rect x="12" y="6" width="2" height="6" fill="#4E3C44" />
                    <rect x="12" y="7" width="1" height="4" fill="#FFFDFD" />
                </svg>
            );
        case "clock":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    <rect x="2" y="3" width="12" height="10" fill="#4E3C44" />
                    <rect x="3" y="4" width="10" height="8" fill="#FFFDFD" />
                    <rect x="4" y="5" width="8" height="6" fill="#4E3C44" />
                    <rect x="5" y="7" width="1" height="2" fill="#809F8C" />
                    <rect x="7" y="7" width="1" height="2" fill="#809F8C" />
                    <rect x="8" y="7" width="1" height="1" fill="#809F8C" />
                    <rect x="8" y="8" width="1" height="1" fill="#809F8C" />
                    <rect x="9" y="7" width="1" height="2" fill="#809F8C" />
                    <rect x="11" y="7" width="1" height="2" fill="#809F8C" />
                </svg>
            );
        case "bottle":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    {/* Cap */}
                    <rect x="5" y="2" width="6" height="2" fill="#4E3C44" />
                    {/* Body */}
                    <rect x="4" y="4" width="8" height="10" fill="#FFFDFD" />
                    <rect x="3" y="5" width="1" height="8" fill="#4E3C44" />
                    <rect x="12" y="5" width="1" height="8" fill="#4E3C44" />
                    <rect x="4" y="14" width="8" height="1" fill="#4E3C44" />
                    {/* Label Red Stripe */}
                    <rect x="4" y="7" width="8" height="2" fill="#D9455B" />
                    <rect x="4" y="9" width="4" height="1" fill="#759280" />
                </svg>
            );
        case "capsule":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    {/* Left half (Cherry Red) */}
                    <rect x="4" y="3" width="8" height="5" fill="#D9455B" />
                    <rect x="5" y="2" width="6" height="1" fill="#D9455B" />
                    {/* Right half (White) */}
                    <rect x="4" y="8" width="8" height="5" fill="#FFFDFD" />
                    <rect x="5" y="13" width="6" height="1" fill="#FFFDFD" />
                    {/* Border */}
                    <rect x="3" y="4" width="1" height="8" fill="#4E3C44" />
                    <rect x="12" y="4" width="1" height="8" fill="#4E3C44" />
                    <rect x="4" y="2" width="1" height="1" fill="#4E3C44" />
                    <rect x="11" y="2" width="1" height="1" fill="#4E3C44" />
                    <rect x="4" y="13" width="1" height="1" fill="#4E3C44" />
                    <rect x="11" y="13" width="1" height="1" fill="#4E3C44" />
                    <rect x="5" y="1" width="6" height="1" fill="#4E3C44" />
                    <rect x="5" y="14" width="6" height="1" fill="#4E3C44" />
                    {/* Shine */}
                    <rect x="5" y="4" width="1" height="2" fill="#FFF" opacity="0.6" />
                </svg>
            );
        case "softgel":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    {/* Body (Gold/Yellow) */}
                    <rect x="5" y="3" width="6" height="10" fill="#F5C469" />
                    <rect x="4" y="5" width="1" height="6" fill="#F5C469" />
                    <rect x="11" y="5" width="1" height="6" fill="#F5C469" />
                    <rect x="6" y="2" width="4" height="1" fill="#F5C469" />
                    <rect x="6" y="13" width="4" height="1" fill="#F5C469" />

                    {/* Outer Border */}
                    <rect x="3" y="5" width="1" height="6" fill="#4E3C44" />
                    <rect x="12" y="5" width="1" height="6" fill="#4E3C44" />
                    <rect x="4" y="3" width="1" height="2" fill="#4E3C44" />
                    <rect x="11" y="3" width="1" height="2" fill="#4E3C44" />
                    <rect x="4" y="11" width="1" height="2" fill="#4E3C44" />
                    <rect x="11" y="11" width="1" height="2" fill="#4E3C44" />
                    <rect x="5" y="2" width="1" height="1" fill="#4E3C44" />
                    <rect x="10" y="2" width="1" height="1" fill="#4E3C44" />
                    <rect x="5" y="13" width="1" height="1" fill="#4E3C44" />
                    <rect x="10" y="13" width="1" height="1" fill="#4E3C44" />
                    <rect x="6" y="1" width="4" height="1" fill="#4E3C44" />
                    <rect x="6" y="14" width="4" height="1" fill="#4E3C44" />

                    {/* Inner Shine */}
                    <rect x="6" y="4" width="2" height="4" fill="#FFF" opacity="0.7" />
                    <rect x="5" y="6" width="1" height="2" fill="#FFF" opacity="0.7" />
                </svg>
            );
        case "jar":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    {/* Cap */}
                    <rect x="4" y="2" width="8" height="2" fill="#FFFDFD" />
                    <rect x="4" y="1" width="8" height="1" fill="#4E3C44" />
                    <rect x="3" y="2" width="1" height="2" fill="#4E3C44" />
                    <rect x="12" y="2" width="1" height="2" fill="#4E3C44" />
                    {/* Jar Body */}
                    <rect x="3" y="5" width="10" height="9" fill="#9C6644" />
                    <rect x="2" y="6" width="1" height="7" fill="#4E3C44" />
                    <rect x="13" y="6" width="1" height="7" fill="#4E3C44" />
                    <rect x="3" y="14" width="10" height="1" fill="#4E3C44" />
                    <rect x="3" y="4" width="10" height="1" fill="#4E3C44" />
                    {/* Label */}
                    <rect x="4" y="7" width="8" height="4" fill="#FFFDFD" />
                    <rect x="5" y="8" width="6" height="2" fill="#D9455B" />
                </svg>
            );
        case "buku":
        case "book":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    <g transform="translate(0, -1)">
                        {/* Cover */}
                        <rect x="0" y="4" width="1" height="9" fill="#D9455B" />
                        <rect x="15" y="4" width="1" height="9" fill="#D9455B" />
                        <rect x="1" y="11" width="2" height="2" fill="#D9455B" />
                        <rect x="3" y="12" width="2" height="2" fill="#D9455B" />
                        <rect x="5" y="13" width="2" height="2" fill="#D9455B" />
                        <rect x="7" y="14" width="2" height="2" fill="#D9455B" />
                        <rect x="9" y="13" width="2" height="2" fill="#D9455B" />
                        <rect x="11" y="12" width="2" height="2" fill="#D9455B" />
                        <rect x="13" y="11" width="2" height="2" fill="#D9455B" />

                        {/* Pages */}
                        <rect x="1" y="4" width="2" height="7" fill="#FFFDFD" />
                        <rect x="3" y="5" width="2" height="7" fill="#FFFDFD" />
                        <rect x="5" y="6" width="2" height="7" fill="#FFFDFD" />
                        <rect x="7" y="7" width="2" height="7" fill="#F3E2DC" />
                        <rect x="9" y="6" width="2" height="7" fill="#FFFDFD" />
                        <rect x="11" y="5" width="2" height="7" fill="#FFFDFD" />
                        <rect x="13" y="4" width="2" height="7" fill="#FFFDFD" />

                        {/* Text Line 1 */}
                        <rect x="1" y="6" width="2" height="1" fill="#E6C2BB" />
                        <rect x="3" y="7" width="2" height="1" fill="#E6C2BB" />
                        <rect x="5" y="8" width="2" height="1" fill="#E6C2BB" />
                        <rect x="9" y="8" width="2" height="1" fill="#E6C2BB" />
                        <rect x="11" y="7" width="2" height="1" fill="#E6C2BB" />
                        <rect x="13" y="6" width="2" height="1" fill="#E6C2BB" />

                        {/* Text Line 2 */}
                        <rect x="1" y="8" width="2" height="1" fill="#E6C2BB" />
                        <rect x="3" y="9" width="2" height="1" fill="#E6C2BB" />
                        <rect x="5" y="10" width="2" height="1" fill="#E6C2BB" />
                        <rect x="9" y="10" width="2" height="1" fill="#E6C2BB" />
                        <rect x="11" y="9" width="2" height="1" fill="#E6C2BB" />
                        <rect x="13" y="8" width="2" height="1" fill="#E6C2BB" />

                        {/* Top Outlines */}
                        <rect x="0" y="3" width="1" height="1" fill="#4E3C44" />
                        <rect x="15" y="3" width="1" height="1" fill="#4E3C44" />
                        <rect x="1" y="3" width="2" height="1" fill="#4E3C44" opacity="0.4" />
                        <rect x="3" y="4" width="2" height="1" fill="#4E3C44" opacity="0.4" />
                        <rect x="5" y="5" width="2" height="1" fill="#4E3C44" opacity="0.4" />
                        <rect x="7" y="6" width="2" height="1" fill="#4E3C44" opacity="0.4" />
                        <rect x="9" y="5" width="2" height="1" fill="#4E3C44" opacity="0.4" />
                        <rect x="11" y="4" width="2" height="1" fill="#4E3C44" opacity="0.4" />
                        <rect x="13" y="3" width="2" height="1" fill="#4E3C44" opacity="0.4" />

                        {/* Bottom Outlines */}
                        <rect x="0" y="13" width="1" height="1" fill="#4E3C44" />
                        <rect x="15" y="13" width="1" height="1" fill="#4E3C44" />
                        <rect x="1" y="13" width="2" height="1" fill="#4E3C44" opacity="0.8" />
                        <rect x="3" y="14" width="2" height="1" fill="#4E3C44" opacity="0.8" />
                        <rect x="5" y="15" width="2" height="1" fill="#4E3C44" opacity="0.8" />
                        <rect x="7" y="16" width="2" height="1" fill="#4E3C44" opacity="0.8" />
                        <rect x="9" y="15" width="2" height="1" fill="#4E3C44" opacity="0.8" />
                        <rect x="11" y="14" width="2" height="1" fill="#4E3C44" opacity="0.8" />
                        <rect x="13" y="13" width="2" height="1" fill="#4E3C44" opacity="0.8" />

                        {/* Ribbon */}
                        <rect x="10" y="2" width="2" height="7" fill="#F5C469" />
                        <rect x="10" y="9" width="1" height="1" fill="#F5C469" />
                        <rect x="11" y="9" width="1" height="1" fill="#D9455B" />
                    </g>
                </svg>
            );
        case "makeup":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    {/* Cushion lid (opened upwards) */}
                    <rect x="4" y="1" width="8" height="6" fill="#E6C2BB" />
                    <rect x="5" y="2" width="6" height="4" fill="#FFFDFD" opacity="0.6" />
                    <rect x="3" y="2" width="1" height="4" fill="#E6C2BB" />
                    <rect x="12" y="2" width="1" height="4" fill="#E6C2BB" />
                    
                    {/* Compact base */}
                    <rect x="3" y="8" width="10" height="6" fill="#F5C469" />
                    <rect x="4" y="14" width="8" height="1" fill="#F5C469" />
                    <rect x="2" y="9" width="1" height="4" fill="#F5C469" />
                    <rect x="13" y="9" width="1" height="4" fill="#F5C469" />
                    
                    {/* Cushion puff */}
                    <rect x="4" y="9" width="8" height="4" fill="#FFFDFD" />
                    <rect x="4" y="10" width="8" height="2" fill="#D9455B" />
                    
                    {/* Outlines & Depth */}
                    <rect x="3" y="7" width="10" height="1" fill="#4E3C44" />
                    <rect x="4" y="0" width="8" height="1" fill="#4E3C44" />
                    <rect x="2" y="2" width="1" height="4" fill="#4E3C44" />
                    <rect x="13" y="2" width="1" height="4" fill="#4E3C44" />
                    <rect x="3" y="1" width="1" height="1" fill="#4E3C44" />
                    <rect x="12" y="1" width="1" height="1" fill="#4E3C44" />
                    <rect x="3" y="6" width="1" height="1" fill="#4E3C44" />
                    <rect x="12" y="6" width="1" height="1" fill="#4E3C44" />
                    
                    <rect x="4" y="15" width="8" height="1" fill="#4E3C44" />
                    <rect x="1" y="9" width="1" height="4" fill="#4E3C44" />
                    <rect x="14" y="9" width="1" height="4" fill="#4E3C44" />
                    <rect x="2" y="8" width="1" height="1" fill="#4E3C44" />
                    <rect x="13" y="8" width="1" height="1" fill="#4E3C44" />
                    <rect x="2" y="13" width="2" height="1" fill="#4E3C44" />
                    <rect x="12" y="13" width="2" height="1" fill="#4E3C44" />
                    <rect x="3" y="14" width="1" height="1" fill="#4E3C44" />
                    <rect x="12" y="14" width="1" height="1" fill="#4E3C44" />
                </svg>
            );
        case "lipcare":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    <rect x="5" y="9" width="6" height="6" fill="#FFFDFD" />
                    <rect x="6" y="10" width="4" height="4" fill="#E6C2BB" />
                    <rect x="6" y="6" width="4" height="3" fill="#F5C469" />
                    <rect x="7" y="3" width="2" height="3" fill="#D9455B" opacity="0.8" />
                    <rect x="7" y="2" width="1" height="1" fill="#D9455B" opacity="0.8" />
                    <rect x="6" y="6" width="1" height="3" fill="#4E3C44" opacity="0.2" />
                    <rect x="4" y="9" width="1" height="6" fill="#4E3C44" opacity="0.1" />
                    <rect x="11" y="9" width="1" height="6" fill="#4E3C44" opacity="0.1" />
                    <rect x="5" y="15" width="6" height="1" fill="#4E3C44" opacity="0.1" />
                </svg>
            );
        case "skincare":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    <rect x="6" y="1" width="4" height="3" fill="#4E3C44" />
                    <rect x="7" y="0" width="2" height="1" fill="#4E3C44" />
                    <rect x="5" y="4" width="6" height="2" fill="#E6C2BB" />
                    <rect x="4" y="6" width="8" height="9" fill="#FDF7F5" />
                    <rect x="3" y="6" width="1" height="9" fill="#4E3C44" />
                    <rect x="12" y="6" width="1" height="9" fill="#4E3C44" />
                    <rect x="4" y="15" width="8" height="1" fill="#4E3C44" />
                    <rect x="5" y="8" width="6" height="5" fill="#FFFDFD" />
                    <rect x="6" y="9" width="4" height="1" fill="#809F8C" />
                    <rect x="6" y="11" width="2" height="1" fill="#809F8C" />
                </svg>
            );
        case "bodycare":
            return (
                <svg viewBox="0 0 16 16" className={className} style={pixelStyle}>
                    <rect x="5" y="1" width="5" height="2" fill="#FFFDFD" />
                    <rect x="4" y="2" width="1" height="1" fill="#FFFDFD" />
                    <rect x="7" y="3" width="2" height="2" fill="#E6C2BB" />
                    <rect x="6" y="5" width="4" height="1" fill="#4E3C44" />
                    <rect x="3" y="6" width="10" height="9" fill="#F3E2DC" />
                    <rect x="2" y="6" width="1" height="9" fill="#4E3C44" />
                    <rect x="13" y="6" width="1" height="9" fill="#4E3C44" />
                    <rect x="3" y="15" width="10" height="1" fill="#4E3C44" />
                    <rect x="4" y="8" width="8" height="5" fill="#FFFDFD" />
                    <rect x="6" y="10" width="4" height="1" fill="#D9455B" />
                </svg>
            );
        default:
            return null;
    }
}