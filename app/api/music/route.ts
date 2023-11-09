import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!
})
export async function POST(req: Request, params: {

}) {
    try {
        const body = await req.json()
        const { prompt } = body
        // if (!prompt) {
        //     return new NextResponse("prompt is required", { status: 400 })
        // }
        const response = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input: {
                    // alpha: 0.5,
                    prompt_a: prompt,
                    // prompt_b: "90's rap",
                    // denoising: 0.75,
                    // seed_image_id: "vibes",
                    // num_inference_steps: 50
                }
            }
        );
        return NextResponse.json(response);
        // const response = {
        //     role:"system",
        //     content:"red"
        // }
        //  return NextResponse.json(response,{status:200})
        //  return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log("[MUSIC_ERROR]", error);
        return new NextResponse("IInternal error", { status: 500 })

    }

}