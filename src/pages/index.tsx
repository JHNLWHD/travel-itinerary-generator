import { type NextPage } from "next";
import Head from "next/head";

import React, { Fragment, useState } from "react";
import { CreateCompletionResponse } from "openai/api";
const Home: NextPage = () => {
  const [generatedText, setGeneratedText] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  async function handleOnSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault()

    setIsLoading(true)

    const target = event.target as typeof event.target & {
      place: { value: string };
      numberOfDays: { value: string };
      numberOfPeople: { value: string };
    };

    const data = {
      place: target.place.value,
      numberOfDays: target.numberOfDays.value,
      numberOfPeople: target.numberOfPeople.value
    }

    const endpoint = '/api/travel-itinerary'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(endpoint, options)
    const result = await response.json() as CreateCompletionResponse
    const text = result.choices[0]?.text as string

    setGeneratedText(text)
    setIsLoading(false)
  }

  return (
    <Fragment>
      <Head>
        <title>Travel Itinerary Generator</title>
        <meta name="description" content="Create personalized travel itineraries with our easy-to-use travel itinerary generator. Get detailed travel plans in minutes, complete with flight, hotel, and activity information." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 pt-12 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem] text-center">
            Travel <span className="text-[hsl(280,100%,70%)]">Itinerary Generator</span>
          </h1>
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-8" onSubmit={handleOnSubmit}>
            <div className="mb-6">
              <label htmlFor="numberOfDays" className="block mb-2 text-sm font-medium text-white">Number of days</label>
              <input type="number" id="numberOfDays"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="mb-6">
              <label htmlFor="place" className="block mb-2 text-sm font-medium text-white">Location/Place</label>
              <input type="text" id="place"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="mb-6">
              <label htmlFor="numberOfPeople" className="block mb-2 text-sm font-medium text-white">Number of people</label>
              <input type="number" id="numberOfPeople"
                     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="mt-7">
              <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" disabled={isLoading}>{isLoading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </form>
        </div>
        {!!generatedText && (
          <div className="px-4 pb-2">
            <p className="text-white text-justify whitespace-pre-wrap">
              {generatedText}
            </p>
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default Home;
