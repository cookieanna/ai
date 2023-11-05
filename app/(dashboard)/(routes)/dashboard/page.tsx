"use client"

import { ArrowRight, ArrowRightCircle, Code, ImageIcon, MessagesSquare, Music, Settings, VideoIcon } from "lucide-react";
import {
    Card
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


const tool = [
    {
        label: "Conversation",
        icon: MessagesSquare,
        href: "/conversation",
        color: "text-violet-500",
        bgColor: "text-violet-500/10"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-700",
        bgColor: "text-pink-700/10"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-700",
        bgColor: "text-orange-700/10"
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500",
        bgColor: "text-emerald-500/10"
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-indigo-700",
        bgColor: "text-indigo-700/10"
    }
    
]

const DashboardPage = () => {
    const router = useRouter()
    return (
        <div>
            <div className="mb-8 space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the power of AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
                    chat with the smartest AI -Experience the power of AI
                </p>
            </div>
            <div className="px-4 md:px-20 lg:px-32 space-y-4">
                {tool.map((item) => (

                    <Card key={item.href}
                    onClick={()=>router.push(item.href)}
                        className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                    >
                        <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", item.bgColor)}>
                                <item.icon className={cn('w-8 h-8', item.color)} />
                            </div>
                            <div className="font-semibold">{item.label}</div>
                        </div>
                        <ArrowRightCircle/>

                    </Card>
                ))}
            </div>
        </div>
    );
}

export default DashboardPage;