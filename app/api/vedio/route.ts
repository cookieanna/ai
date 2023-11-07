import { NextResponse } from "next/server";
// import OpenAI from "openai";
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY
// })
export async function POST(req:Request) {
  const body = await req.json()
   const {messages} = body;
    
        const response = {
            messages
        }
        // const aa = await openai.chat.completions.create({
        //     model: "gpt-3.5cl",
        //     messages
        // });
        return NextResponse.json(response,{status:200})
        // try {
        //     const response = await openai.chat.completions.create({
        //         model: "gpt-3.5-turbo",
        //         messages
        //     });
        //     return NextResponse.json(response,{status:200})
        // } catch (error) {
        //     return new NextResponse("error",{status:500})
        // }
      
       
}