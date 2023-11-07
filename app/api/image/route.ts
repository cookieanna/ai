import { NextResponse } from "next/server";
// import OpenAI from "openai";



// const openaiInstance = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// })
export async function POST(req: Request, params: {

}) {
    try {
        const body = await req.json()
        const { prompt,amount=1,resolution="512x512" } = body
        // if (!openaiInstance.apiKey) {
        //     return new NextResponse("Openai key not configrated", { status: 401 })

        // }
        // if (!prompt) {
        //     return new NextResponse("Prompt is required", { status: 400 })
        // }
        // const response = await openaiInstance.images.generate({
        //    prompt,
        //   n:parseInt(amount,10)
        //     size:resolution
        // });
        const response = {
            role:"system",
            content:"red"
        }
       return NextResponse.json(response,{status:200})
      //  return NextResponse.json(response.data.data);

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("IInternal error", { status: 500 })

    }

}