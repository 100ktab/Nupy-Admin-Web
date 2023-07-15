import { NextResponse } from 'next/server';
import {Configuration, OpenAIApi} from "openai";
import {Tone} from "@/util/enums/enum";

export async function POST(request: Request) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)
  const params = await request.json()
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(params.tone, params.keyword),
      temperature: 0.1,
      max_tokens: 2000
    })
    console.log(completion.data.choices)
    return NextResponse.json({ result: completion.data.choices[0].text });
  } catch(error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data ,  status: error.response.status })
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return NextResponse.json({ error: {
          message: 'An error occurred during your request.',
        },status: 500 })
    }
  }
}

const generatePrompt = (tone: string, keyword: string) => {
  let toneText = ''
  if (tone === Tone.PLEASANT) {
    toneText = ' in a pleasant way'
  } else if (tone === Tone.FRIENDLY) {
    toneText =  ' in a friendly way'
  } else if (tone === Tone.PROFESSIONAL) {
    toneText =  ' in a professional tone'
  }
  return`Please write an description using the keyword ${toneText}. Please write it in English
    keyword: ${keyword}`.replace(/\n/g, '')
}
