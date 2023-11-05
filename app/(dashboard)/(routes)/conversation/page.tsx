"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Heading from "@/components/heading";
import { MessagesSquare } from "lucide-react";
const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Input must be more than 2 characters.",
    }),
})
const ConversationPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    })
    const loading = form.formState.isSubmitting;
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <div>
            <Heading
                title="Conversation"
                description="Our most advanced conversation model"
                icon={MessagesSquare}
                iconColor="text-violet-500"
                bgColor="text-violet-500/10"
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
                                            placeholder="how do find a house"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )}>

                            </FormField>
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={loading} variant="default">Generate</Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    message content
                </div>

            </div>
        </div>
    );
}

export default ConversationPage;