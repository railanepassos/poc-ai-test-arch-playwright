import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MODEL = 'mistral'; // ou 'llama3'

const logPath = path.resolve(__dirname, '../logs/session-2025-04-08.log');

const outputMap: Record<string, string> = {
  'generated.LoginForm.ts': path.resolve(__dirname, '../components/generated.LoginForm.ts'),
  'generated.LoginPage.ts': path.resolve(__dirname, '../pages/generated.LoginPage.ts'),
  'generated.login.spec.ts': path.resolve(__dirname, '../specs/generated.login.spec.ts'),
};

async function generateStructuredCode(logContent: string): Promise<Record<string, string>> {
  const prompt = `
Você é um gerador de testes E2E baseado em Playwright + Page Object Model + Component Pattern.

Com base no seguinte log de navegação:

${logContent}

Gere os arquivos abaixo com base no padrão do projeto:

- LoginForm.ts (componente)
- LoginPage.ts (página com Page Object Model)
- login.spec.ts (teste E2E)

Retorne a resposta neste formato exato, separando claramente os blocos com '==== NOME_DO_ARQUIVO.ts ====':

==== LoginForm.ts ====
<conteúdo do componente>

==== LoginPage.ts ====
<conteúdo da página>

==== login.spec.ts ====
<conteúdo do teste>
`;

  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      stream: false,
    }),
  });

 
  
  const data = await response.json();

  // Separar os blocos de código por nome
  if (typeof data !== 'object' || data === null || !('response' in data) || typeof data.response !== 'string') {
    throw new Error('Invalid response format');
  }

  const fileSections = data.response.split(/^==== (.+?) ====$/gm).filter(Boolean);

  const files: Record<string, string> = {};

  for (let i = 0; i < fileSections.length; i += 2) {
    const name = fileSections[i].trim();
    const content = fileSections[i + 1]?.trim();

    if (!name || !content) continue;

    const filename = `generated.${name}`;
    if (!outputMap[filename]) {
      console.warn(`⚠️ Caminho não encontrado para: ${filename}`);
      continue;
    }

    const cleanContent = content
    .replace(/^```typescript\s*/i, '')
    .replace(/^```\s*$/gm, '')
    .trim();

    files[filename] = cleanContent;
  }

  return files;
}

async function run() {
  try {
    const logContent = fs.readFileSync(logPath, 'utf-8');
    const generatedFiles = await generateStructuredCode(logContent);

    for (const [filename, content] of Object.entries(generatedFiles)) {
      const filePath = outputMap[filename];
      const dir = path.dirname(filePath);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Arquivo gerado: ${filePath}`);
    }
  } catch (err) {
    console.error('❌ Erro ao gerar os arquivos:', err);
  }
}

run();
