export default function Legend() {
    return <div className="legend" style={{color: "black", fontWeight:700, margin: "10px"}}>Your appointments will show up in <span style={{color:"rgba(21, 137, 255, 1)", fontWeight:900}}>blue ◆</span>. Other reserved time slots will be <span style={{color:"rgba(166, 166, 166, 1)", fontWeight:900}}>gray ◆</span></div>;
}