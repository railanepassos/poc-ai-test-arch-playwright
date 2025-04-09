# 💪 poc-arc-to-tests

Repositório de **prova de conceito** para avaliação e comparação de diferentes **padrões de automação de testes** aplicados a interfaces web, com foco na **geração assistida por IA** de cenários end-to-end.

---

## ✯ Objetivo

Explorar, comparar e validar diferentes arquiteturas de automação de testes, com ênfase em:

- Reutilização e manutenção de código de testes
- Escalabilidade para grandes suítes
- Integração com **modelos de linguagem (LLMs)** para geração de testes a partir de logs
- Aplicabilidade em esteiras CI/CD

---

## 📁 Estrutura do Repositório

```
poc-arc-to-tests/
├── playwright.config.ts           # Configuração geral do Playwright
├── package.json                   # Dependências e scripts do projeto
├── tests/                         # Subprojetos organizados por padrão de arquitetura
│   ├── abt/                       # Action-Based Testing
│   ├── component/                 # Component Object Model
│   ├── pom/                       # Page Object Model
│   ├── pom_component/             # Page Object + Component Model com IA
│   └── screenplay/                # Screenplay Pattern
```

---

## 🤖 Geração de Testes com IA

O subprojeto `pom_component` permite gerar testes automaticamente a partir de logs de navegação com o auxílio de uma **LLM local** via [Ollama](https://ollama.com/).

### Requisitos

- Node.js
- [Ollama](https://ollama.com/) instalado
- Modelo Mistral carregado:

```bash
ollama run mistral
```

### Como gerar

```bash
npx tsx tests/pom_component/generators/fromLogs.ts
```

---

## ✅ Execução dos Testes

Execute qualquer suíte de testes com:

```bash
npx playwright test tests/<subprojeto>/specs
```

Por exemplo:

```bash
npx playwright test tests/component/specs
```

---

## 📦 Tecnologias Utilizadas

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ollama + Mistral](https://ollama.com/)
- Estruturas de automação modernas (POM, COM, ABT, Screenplay)
- Prompt Engineering com LLMs

---

## 📌 Roadmap Futuro

- [ ] Suporte a testes mobile/web híbridos
- [ ] Integração com CI (GitHub Actions, GitLab CI)
- [ ] Avaliação de outras LLMs locais (LLaMA 3, Gemma, etc.)
- [ ] Métricas de cobertura e performance

---

## 👤 Autor

[Railane Passos](https://github.com/railanepassos)

---

## 📄 Licença

MIT © railanepassos