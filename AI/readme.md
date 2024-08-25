# AI assistant for Zubin

`Retrieval-Augmented Generation`(RAG): `Ollama`+`LangChain`

LLMs are trained on a large but fixed corpus of data, limiting their ability to reason about private or recent information. Retrieval augmented generation (RAG) has emerged as a popular and powerful mechanism to expand an LLM's knowledge base, using documents retrieved from an external data source to ground the LLM generation via in-context learning. 

![rag_detail_v2](https://github.com/langchain-ai/rag-from-scratch/assets/122662504/54a2d76c-b07e-49e7-b4ce-fc45667360a1)

## Env requirement
- `pip install -r requirements.txt`
- get your langchain API Key on openai, you may need to [register] (VPN required) here, and set it in `.env.example`, copying required .env file
   - `cp -RPp .env.example .env`(MacOs or Linux)
   - `copy .env.example .env`(windows)

### Ollama Model
Refer to [Ollama] for more information. Make sure it is running as a service.
- `pip install ollama` (ollama --version: 0.3.6)
- `ollama run mistral:latest`
- Check your model with `ollama list`

### Other reference:
- [LangChain API Key Guide]

## Start the server
- `uvicorn main:app --reload`

[Langchain]:https://python.langchain.com/v0.2/docs/integrations/text_embedding/ollama/
[Ollama]:https://ollama.com/
[LangChain API Key Guide]:https://www.restack.io/docs/langchain-knowledge-langchain-api-key-guide
[register]: https://platform.openai.com/
[Technical method]:https://juejin.cn/post/7378779608353669158