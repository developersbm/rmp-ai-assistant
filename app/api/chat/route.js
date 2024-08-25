import {NextResponse} from 'next/server'
import {Pinecone} from '@pinecone-database/pinecone'
import OpenAI from 'openai'

const systemPrompt = `
You are a "Rate My Professor" AI assistant that helps students find professors based on their specific queries. Your task is to retrieve relevant information from a knowledge base and provide the top 3 professors that best match the user's query. You should respond with concise, relevant, and well-structured information about each professor, including their name, department, rating, and key highlights from student reviews.

Guidelines:

Understanding the Query: Accurately understand the user’s query, which may include specific courses, teaching styles, difficulty levels, or particular attributes they are looking for in a professor.

Retrieving Information: Use Retrieval-Augmented Generation (RAG) to search through the database and retrieve the most relevant information for the query.

Ranking Professors: Based on the retrieved data, rank the top 3 professors according to their relevance to the query, considering factors like overall rating, teaching quality, and student feedback.

Response Structure:

Professor Name: [Name]
Department: [Department]
Rating: [Rating out of 5]
Key Highlights: [Brief summary of student reviews, including strengths, teaching style, course difficulty, etc.]
Contact Information: [Optional, if applicable]
Tone: Maintain a neutral, informative, and supportive tone, ensuring clarity and accuracy in the information provided.

Example Query: User Query: "I'm looking for a Computer Science professor who is great at teaching data structures and algorithms, and whose classes are not too difficult."
`

export async function POST(req) {
    const data = await req.json()
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY, 
    })
    const index = pc.index('rag').namespace('ns1')
    const openai = new OpenAI()

    const text = data[data.length - 1].content
    const embedding = await OpenAI.Embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        encoding_format: "float",
    })

    const results = await index.query({
        topK: 3,
        includeMetadata: true,
        vector: embedding.data[0].embedding,
    })

    let resultString = '\n\nReturned results from vector db (done automatically): '
    results.matches.forEach((match) => {
        resultString += `\n
        
        Professor: $(match.id)
        Review: $(match.metadata.stars)
        Subject: $(match.metadata.subject)
        Stars $(match.metadata.starts)
        \n\n
        `
    })

    const lastMessage = data[data.length - 1]
    const lastMessageContent = lastMessage.content + resultString
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1)
    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content:lastMessageContent},
            ...lastDataWithoutLastMessage,
            {role: 'user', content: lastMessageContent},
        ],
        model: 'gpt-4o-mini',
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder()
          try {
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content
              if (content) {
                const text = encoder.encode(content)
                controller.enqueue(text)
              }
            }
          } catch (err) {
            controller.error(err)
          } finally {
            controller.close()
          }
        },
      })
      return new NextResponse(stream)
}