import { NextResponse } from "next/server";
import OpenAI from "openai/index.mjs";
// import OpenAI from "openai";



// const openaiInstance = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// })
const instructionMessage:OpenAI.Chat.ChatCompletionMessage={
    role:"system",
    content:"Your are a code generator,You must answer only in markdown code snippets.Use code comments for explanations"
}
export async function POST(req: Request, params: {

}) {
    try {
        const body = await req.json()
        const { messages } = body
        // if (!openaiInstance.apiKey) {
        //     return new NextResponse("Openai key not configrated", { status: 401 })

        // }
        // if (!messages) {
        //     return new NextResponse("Message is required", { status: 400 })
        // }
        // const response = await openaiInstance.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages:[instructionMessage,...messages]
        // });
        const response = {
            role:"system",
            content:"red"
        }
       return NextResponse.json(response,{status:200})
      //  return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("IInternal error", { status: 500 })
    }

}