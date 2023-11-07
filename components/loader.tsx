import { Loader } from "lucide-react";

const LoaderPage = () => {
    return (<div className="h-full flex flex-col gap-y-4 items-center justify-center">
        <Loader className="w-10 h-10 relative animate-spin"/>
        <p className="text-sm text-muted-foreground">
            AI is thinking...
        </p>
    </div>);
}

export default LoaderPage;