import { Outlet } from "react-router-dom";

export default function Labslayout(){
    return(
        <div className="p-4">
            <Outlet/>
        </div>
    )
}