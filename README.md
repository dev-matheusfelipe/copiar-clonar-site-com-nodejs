# Cloner - Script para Clonar Sites

Este script permite clonar sites e baixar seus arquivos estáticos (imagens, CSS, JS) de maneira simples e automatizada. Você só precisa fornecer a URL do site e o diretório onde deseja salvar os arquivos. O script cuida de todo o processo!

## Funcionalidades

- Baixa o HTML do site.
- Faz o download de arquivos estáticos (imagens, CSS, JS).
- Organiza os arquivos em diretórios apropriados.
- Suporta sites com diferentes estruturas de pastas.
- O script cria diretórios automaticamente para armazenar os arquivos.

## Pré-Requisitos

Antes de usar o script, você precisará ter o Node.js instalado no seu computador.

### Instalar o Node.js

1. **Baixe o Node.js**:
   - Acesse o [site oficial do Node.js](https://nodejs.org/) e baixe a versão LTS (recomendada).

2. **Instale o Node.js**:
   - Siga as instruções do assistente de instalação. Certifique-se de que a opção "Adicionar ao PATH" esteja marcada durante a instalação.

3. **Verifique a instalação**:
   - Abra o **Prompt de Comando** (Windows) ou o **Terminal** (macOS/Linux) e execute o seguinte comando:
     ```bash
     node -v
     ```
   - Isso deve retornar a versão do Node.js instalada (por exemplo, `v16.13.0`).

## Passo a Passo para Usar o Script

### 1. Baixe o Script

1. **Crie uma pasta** para armazenar o script. Exemplo: `cloneSite`.
2. **Baixe o arquivo** `cloneSite.js` e salve-o dentro dessa pasta.

### 2. Instale as Dependências

O script depende de algumas bibliotecas externas. Para instalá-las, siga estas etapas:

   1. **Abra o Terminal** ou o **Prompt de Comando**.
   2. **Navegue até a pasta** onde o script foi salvo. Exemplo:
      ```bash
      cd C:\Users\SeuUsuario\Desktop\cloneSite
   3. Crie o arquivo package.json (se não existir):
      ```bash
      npm init -y

   4. Crie o arquivo package.json (se não existir):
      ```bash
      npm install download axios cheerio

### 3. Configure o Script
   1. Abra o arquivo cloneSite.js em um editor de texto de sua preferência (VS Code, Notepad++, etc.).
   2. Substitua a URL do site:
      *Encontre const siteUrl = 'coloque aqui a URL'; e substitua 'coloque aqui a URL' pela URL do site que você deseja clonar. Exemplo:
      ```bash
      const siteUrl = 'https://exemplo.com';
   3. Substitua o diretório de destino:
       *Encontre 'Caminho do diretorio AQUI' e substitua pelo diretório onde você quer salvar os arquivos clonados. Exemplo:
      ```bash
      const outputPath = path.join(__dirname, 'C:/Users/SeuUsuario/Desktop/cloneSite/arquivos');

### 4. Execute o Script
   1. Execute o comando no terminal para rodar o script
      ```bash
      node cloneSite.js
   2. O script começará a baixar os arquivos do site para o diretório especificado.
   3. Verifique os arquivos clonados no diretório de destino.

### 5. Possíveis Problemas e Soluções
   *Erro de permissão ao criar diretórios: Certifique-se de que você tem permissões adequadas para criar pastas e arquivos no diretório de destino.
   *Erro de rede ou URL inválida: Verifique se a URL fornecida está correta e se a conexão com a internet está estável.

## Contribuição
   Sinta-se à vontade para contribuir com melhorias e correções. Para isso, siga as etapas abaixo:

   1. Faça um fork do repositório.
   2. Crie uma branch para sua alteração (git checkout -b minha-alteracao).
   3. Faça commit das suas alterações (git commit -am 'Adiciona novas funcionalidades').
   4. Envie para o repositório (git push origin minha-alteracao).
   5. Crie um pull request.
