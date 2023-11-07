"use client"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import ReactMarkdown from "react-markdown";
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
import { Code, MessagesSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import LoaderPage from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import OpenAI from "openai/index.mjs";
const formSchema = z.object({
    prompt: z.string().min(2, {
        message: "Input must be more than 5 characters.",
    }),
})
const CodePage = () => {
    const router = useRouter()
    const [messages, setMessage] = useState<OpenAI.Chat.ChatCompletionMessage[]>([])
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    })
    const loading = form.formState.isSubmitting;
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const userMessage: OpenAI.Chat.ChatCompletionMessage = {
                role: "user",
                content: values.prompt
            }
            const newMessages = [...messages, userMessage]
            const response = await axios.post("/api/code", { messages: newMessages })
            setMessage((current) => ([...current, userMessage, response.data]))
            form.reset()
            console.log(response)
        } catch (error) {
            console.log("conversation page onsubmit error", error);

        } finally {
            router.refresh()
        }

    }
    return (
        <div>
            <Heading
                title="Code Generation"
                description="Our most advanced code model"
                icon={Code}
                iconColor="text-indigo-700"
                bgColor="text-indigo-700/10"
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
                                            placeholder="simple redux sample using react and typescript"
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
                    {messages.length === 0 && !loading && (
                        <div className="flex justify-center">Empty!</div>
                    )}
                    {loading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <LoaderPage></LoaderPage>
                        </div>

                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((item) => (
                            <div key={item.content}
                                className={cn("flex p-8 w-full items-center gap-x-8 rounded-lg",
                                    item.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                                )}
                            >
                                {item.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                {/* <p>{item.content}</p> */}
                                <ReactMarkdown
                                className="text-sm overflow-hidden leading-7"
                                components = {{
                                    pre: ({ node, ...props }) => (
                                        <div className="overflow-auto w-full my-2 bg-black/10
                                        p-2 rounded-lg">
                                            <pre {...props}/>
                                        </div>
                                    ),
                                    code:({node,...props})=>(
                                        <code className="bg-black/10 rounded-lg p-l" {...props}/>
                                    )
                                }}
                                >
                                    
                                </ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CodePage;