import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
const url = "https://robohash.org/2?set=set2&size=280x280"
//const url = "https://github.com/shadcn.png"
const BotAvatar = () => {
    return (  
        <Avatar className="h-8 w-8">
            <AvatarImage src={url}></AvatarImage>
        </Avatar>
    );
}
 
export default BotAvatar;