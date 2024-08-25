'''
This is a AI chat-bot for Zubin
last updated on 24/8/2024
'''

import os
import bs4
import json
from dotenv import load_dotenv
from langchain import hub
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from pathlib import Path
from pprint import pprint
from langchain_community.document_loaders import JSONLoader
from langchain_community.agent_toolkits.json.base import create_json_agent
from langchain.docstore.document import Document
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_text_splitters import MarkdownHeaderTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA

# load .env
load_dotenv()
OPENAI_API_KEY = os.environ['OPENAI_API_KEY']
os.environ['LANGCHAIN_TRACING_V2'] = 'true'
os.environ['LANGCHAIN_ENDPOINT'] = 'https://api.smith.langchain.com'
os.environ['LANGCHAIN_PROJECT'] = "AI assistant for Zubin"

# Define llm
llm = Ollama(model="mistral:latest")

# Load Documents
know_path = os.environ['KNOWLEDGE_PATH']
database_path =  os.environ['DATABASE_PATH']

with open(know_path, 'r', encoding='utf-8') as file:
    markdown_content = file.read()

headers_to_split_on = [
    ("#", "Header 1"),
    ("##", "Header 2"),
    ("###", "Header 3"),
    ("####", "Header 4")
]

# MD splits
markdown_splitter = MarkdownHeaderTextSplitter(
    headers_to_split_on=headers_to_split_on, strip_headers=False
)
md_header_splits = markdown_splitter.split_text(markdown_content)

# for i, doc in enumerate(md_header_splits):
#     print("-------------------------------------------------------")
#     print(f"Document {i+1}:")
#     print("Page content:")
#     print(doc.page_content)
#     print("Metadata:")
#     for key, value in doc.metadata.items():
#         print(f"{key}: {value}")
#     print("\n")

# Indexing Store
# Instantiate the embedding model
embedder = HuggingFaceEmbeddings()

# Create the vector store 
vector = FAISS.from_documents(md_header_splits, embedder)

chain = RetrievalQA.from_chain_type(
    llm,
    retriever = vector.as_retriever()
)

question = ""

# server of FASTAPI
from fastapi import FastAPI, Request
from starlette.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add cors middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 这里可以根据需要更改为允许的域名列表
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/answer_question")
async def answer_question(request: Request):
    data = await request.json()
    question = data['question']

    prompt = """
    1. Use the following pieces of context to answer the question at the end.
    2. If you don't know the answer, just say that "
    Thank you for your inquiry, we will contact the staff to further process your request" but don't make up an answer on your own.\n
    3. Keep the answer crisp and limited to 3,4 sentences.
    
    Question: {}
    Helpful Answer:""".format(question)

    result = chain.invoke({"query": prompt})

    return JSONResponse(content={"result": result['result']})

@app.options("/answer_question")
async def options_answer_question(request: Request):
    return JSONResponse(content={"Allow": "POST"}, status_code=200)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, debug=True)