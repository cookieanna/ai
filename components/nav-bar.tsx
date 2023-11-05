import MobileSidebar from "./mobile-sidebar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
export const Navbar = () => {
    return ( 
        <div className="flex items-end p-4">
            {/* <Button variant="ghost" size="icon" className="md:hidden">
                <Menu/>
            </Button> */}
            <MobileSidebar></MobileSidebar>
            <div className="flex w-full justify-end"><Button variant="default">user</Button></div>
        </div>
    );
}
 
