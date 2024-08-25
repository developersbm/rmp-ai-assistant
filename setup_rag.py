from dotenv import load_dotenv
from pinecone import Index, ServerConfig
from openai import OpenAI
import os
import json

load_dotenv()

pc = Index(api_key=os.getenv("PINECONE_API_KEY"))

pc.create_index(
    name="rag",
    dimension=1536,
    metric="cosine",
    config=ServerConfig(cloud="aws", region="us-east-1"),
)

with open("reviews.json", "r") as file:
    data = json.load(file)

processed_data = []
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

for review in data["reviews"]:
    response = client.embeddings.create(
        input=review['review'], model="text-embedding-ada-002"  # Use a valid model name
    )
    embedding = response['data'][0]['embedding']
    processed_data.append(
        {
            "values": embedding,
            "id": review["professor"],
            "metadata": {
                "review": review["review"],
                "subject": review["subject"],
                "stars": review["stars"],
            }
        }
    )

index = pc.Index("rag")

upsert_response = index.upsert(
    vectors=processed_data,
    namespace="ns1",
)

print(f"Upserted count: {upsert_response['upserted_count']}")

print(index.describe_index_stats())
