import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";
import { env } from "../../env.mjs";
 interface TravelItinerary {
  place: string
  numberOfDays: number
  numberOfPeople: number
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { place, numberOfDays, numberOfPeople } = req.body as TravelItinerary

    const prompt = `Generate a travel itinerary for ${numberOfDays} days travel in ${place} with ${numberOfPeople} people`

    const configuration = new Configuration({
      apiKey: env.OPEN_API_KEY as string,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.7,
      max_tokens: 4000,
    });

    res.status(response.status).json(response.data)
  }
}