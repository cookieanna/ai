"use client"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormMessage,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Heading from "@/components/heading";
import { Music } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoaderPage from "@/components/loader";

const formSchema = z.object({
    prompt: z.string().min(2, {
        message: "Input must be more than 5 characters.",
    }),
})
const MusicPage = () => {
    const router = useRouter()
    const [music, setMusic] = useState<string>()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    })
    const loading = form.formState.isSubmitting;
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setMusic(undefined)
            const response = await axios.post("/api/music", values)
            setMusic(response.data.audio)
            form.reset()
            // console.log(response)
        } catch (error) {
            console.log("music page onsubmit error", error);

        } finally {
            router.refresh()
        }
    }
    return (
        <div>
            <Heading
                title="Music"
                description="Our most advanced model"
                icon={Music}
                iconColor="text-emerald-500"
                bgColor="text-emerald-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                        rounded-lg
                        border
                        w-full
                        p-4
                        px-3
                        md:px-6
                        fouce-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-2
                        "
                        >
                            <FormField name="prompt" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="p-0 m-0">
                                        <Input className="border-0 outline-none
                                  focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={loading}
                                            placeholder="Piano solo"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={loading} variant="default">Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {!music&& !loading && (
                        <div className="flex justify-center">Empty!</div>
                    )}
                    {loading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <LoaderPage></LoaderPage>
                        </div>

                    )}
                   {music&&(<audio controls className="w-full mt-4">
                    <source src={music} />
                   </audio>)}
                </div>

            </div>
        </div>
    );
}

export default MusicPage;