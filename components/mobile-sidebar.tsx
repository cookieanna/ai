"use client"
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";

const MobileSidebar = () => {
    const [ismounted,setIsmounted] = useState(false)
    useEffect(()=>{
        setIsmounted(true)
    },[])
    if(!ismounted){
        return null
    }
    return (
                <Sheet>
                    <SheetTrigger>
                        <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu />
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left" >
                       <Sidebar/>
                    </SheetContent>
                </Sheet>
    );
}

export default MobileSidebar;