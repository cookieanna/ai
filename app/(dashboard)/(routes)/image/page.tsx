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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import Heading from "@/components/heading";
import { Image as Photo, MessagesSquare, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import LoaderPage from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
const formSchema = z.object({
    prompt: z.string().min(2, {
        message: "Image Prompt is required.",
    }),
    amount: z.string().min(1),
    resolution: z.string().min(1)
})
const amountOptions = [
    {
        value: "1",
        label: "1 Photo"
    },
    {
        value: "2",
        label: "2 Photos"
    },
    {
        value: "3",
        label: "3 Photos"
    },
    {
        value: "4",
        label: "4 Photos"
    },
    {
        value: "5",
        label: "5 Photos"
    }
]
const resolutionOption = [
    {
        value: "256x256",
        label: "256x256"
    },
    {
        value: "512x512",
        label: "512x512"
    },
    {
        value: "1024x1024",
        label: "1024x1024"
    }
]
const ImagePage = () => {
    const router = useRouter()
    const [images, setImages] = useState<string[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        },
    })
    const loading = form.formState.isSubmitting;
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setImages([])
           // console.log(values);

            const response = await axios.post("/api/image", values)
            const urls = response.data.map((image: { url: string }) => image.url)
            setImages(urls)
            form.reset()

        } catch (error) {
            console.log("Image page onsubmit error", error);

        } finally {
            router.refresh()
        }

    }
    return (
        <div>
            <Heading
                title="Image"
                description="Turn your prompt into image"
                icon={Photo}
                iconColor="text-pink-700"
                bgColor="text-pink-700/10"
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
                                <FormItem className="col-span-12 lg:col-span-6">
                                    <FormControl className="p-0 m-0">
                                        <Input className="border-0 outline-none
                                  focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={loading}
                                            placeholder="a picture of a fish in the sea"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="amount" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select disabled={loading} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {amountOptions.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="resolution" render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-2">
                                    <Select disabled={loading} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOption.map((item) => (
                                                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )} />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={loading} variant="default">Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {images.length === 0 && !loading && (
                        <div className="flex justify-center">Empty!</div>
                    )}
                    {loading && (
                        <div className="p-20">
                            <LoaderPage></LoaderPage>
                        </div>

                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((item) => (
                            <Card key={item}
                                className="rounded-lg overflow-hidden"
                            >
                                <div className="ralative aspect-square">
                                    <Image alt="image" fill src={item} />
                                </div>
                                <CardFooter className="p-2">
                                    <Button onClick={()=>window.open(item)} variant="secondary" className="w-full">
                                        <Download className="h-4 w-4 mr-2"/>
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ImagePage;