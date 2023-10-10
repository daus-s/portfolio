import { useState } from "react";
import "./tutoringstyles.css"
import "./resources.css"

export default function ResourceList() {
    const [docs, setDocs] = useState([]);

    return (
        <div className="resource-list">
            <div className="explanation">
                Here are some helpful documents and notes that I have made over the years. <br/><br/>Your goal here should not be to copy these but to follow my train of thought. The way these problems are approached or explainations is not one-dimensional. <br/><br/>That is, the process goes off on tangents to cover prerequisites as they become necesary. This will help connect ideas together much more clearly and explicably as well. <br/><br/>This will lay a stronger foundtation about the material. This foundation can be either formal or an intuitive understanding. And <span style={{fontWeight: '500'}}>everyone  will  have  their  strong  suits.</span> 
            </div>
            <div className="listHeader">
                <div className="type">
                    Type
                </div>
                <div className="link">
                    Link
                </div>
                <div className="download">
                    Download
                </div>
            </div>
            <ul>
            {docs.map((doc, index) => (
                <li >
                    
                </li>
            ))}
            </ul>
        </div>);
}