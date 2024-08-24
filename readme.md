# AI assistant for Zubin

`Retrieval-Augmented Generation`(RAG): `Ollama`+`LangChain`

LLMs are trained on a large but fixed corpus of data, limiting their ability to reason about private or recent information. Retrieval augmented generation (RAG) has emerged as a popular and powerful mechanism to expand an LLM's knowledge base, using documents retrieved from an external data source to ground the LLM generation via in-context learning. 

<img src="https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/08c5c3bd60814137951fde5afc558a9e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5a2f6aql5LiN5piv5YyX5p6B54aK:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiNDA2ODY1NjQyMjMzNDU0MiJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1725097008&x-orig-sign=Xbdy76qI6MwR3m2Effh21PlxzRY%3D" alt="image.png" width="70%" />

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

[Langchain]:https://python.langchain.com/v0.2/docs/integrations/text_embedding/ollama/
[Ollama]:https://ollama.com/
[LangChain API Key Guide]:https://www.restack.io/docs/langchain-knowledge-langchain-api-key-guide
[register]: https://platform.openai.com/
[Technical method]:https://juejin.cn/post/7378779608353669158