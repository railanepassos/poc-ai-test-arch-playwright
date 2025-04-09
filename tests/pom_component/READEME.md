# 🔪 pom_component

Projeto de automação de testes com foco em componentes reutilizáveis utilizando o padrão **Page Object + Component Object Model** com [Playwright](https://playwright.dev/).

Além da estrutura tradicional de automação, este projeto também permite **gerar testes automaticamente a partir de logs de execução**, usando **modelos de linguagem (LLMs)** locais com **[Ollama](https://ollama.com/)** e **[Mistral](https://mistral.ai/)**.

---

## 📁 Estrutura do Projeto

```
pom_component/
├── components/              # Componentes reutilizáveis (ex: LoginForm)
├── generators/              # Scripts de geração automática de testes via IA
│   └── fromLogs.ts
├── logs/                    # Logs de sessões para uso na geração de testes
│   └── session-2025-04-08.log
├── pages/                   # Page Objects (ex: LoginPage)
├── specs/                   # Casos de teste organizados por funcionalidades
│   ├── login.spec.ts
│   └── login.generated.spec.ts    # Arquivos gerados automaticamente
└── README.md
```

---

## 🚀 Executando os Testes

Certifique-se de ter o Playwright instalado:

```bash
npx playwright install
```

Depois, execute os testes:

```bash
npx playwright test tests/pom_component/specs
```

---

## 🤖 Geração de Testes a partir de Logs

Este projeto permite gerar **Page Objects**, **Componentes** e **testes E2E** automaticamente a partir de logs de navegação, utilizando uma **LLM local via Ollama**.

### ✅ Pré-requisitos

- Node.js
- [Ollama](https://ollama.com/) instalado
- Modelo [Mistral](https://ollama.com/library/mistral) carregado:

```bash
ollama run mistral
```

### 📜 Exemplo de Log

Arquivo em `tests/pom_component/logs/session-*.log` com o seguinte conteúdo:

```
1. User navigates to /login
2. User fills username with "valid_username"
3. User fills password with "invalid_password"
4. User clicks the "Login" button
5. System displays error message "Invalid credentials"
6. User retries with correct password
7. System displays success message "Login successful"
```

### 🔧 Executando o Gerador

```bash
npx tsx tests/pom_component/generators/fromLogs.ts
```

Este comando:
1. Lê o log de `logs/`.
2. Envia o conteúdo para o modelo Mistral via API local (`http://localhost:11434`).
3. Gera arquivos `.generated.ts` em `components/`, `pages/` e `specs/`, de forma estruturada.

---

## 💠 Tecnologias Utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Playwright](https://playwright.dev/)
- [Ollama](https://ollama.com/)
- [Mistral](https://mistral.ai/)
- LLM Prompt Engineering

---

## 📌 Objetivo

Este projeto é parte de um estudo comparativo de padrões de automação de testes (Page Object, Component Object Model, Screenplay, Action-Based Testing) com **integração de Inteligência Artificial** para acelerar a criação de cenários de testes.

---

## 📄 Licença

MIT © Railane