import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
const url = "https://robohash.org/1?set=set4&size=280x280"
const UserAvatar = () => {
    return ( 
        <Avatar className="h-8 w-8">
            <AvatarImage src={url}></AvatarImage>
        </Avatar>
     );
}
 
export default UserAvatar;