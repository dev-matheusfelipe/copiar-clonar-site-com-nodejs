const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const download = require('download');
const axios = require('axios');
const cheerio = require('cheerio');

// Função para criar diretórios se não existirem
function createDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
    console.log(`Diretório criado: ${directoryPath}`);
  }
}

// Função para baixar o arquivo
async function downloadFile(fileUrl, destinationPath) {
  const url = new URL(fileUrl);
  const protocol = url.protocol === 'https:' ? https : http;

  // Verificar se o arquivo já existe
  if (fs.existsSync(destinationPath)) {
    console.log(`Arquivo já existe, pulando: ${destinationPath}`);
    return;
  }

  // Criando diretório de destino, se necessário
  createDirectory(path.dirname(destinationPath));

  // Baixando o arquivo
  const file = fs.createWriteStream(destinationPath);
  protocol.get(fileUrl, (response) => {
    if (response.statusCode === 200) {
      response.pipe(file);
      file.on('finish', () => {
        console.log(`Arquivo baixado: ${destinationPath}`);
      });
    } else {
      console.log(`Erro ao baixar o arquivo ${fileUrl}: ${response.statusCode}`);
    }
  });
}

// Função para baixar o HTML
async function downloadHtml(url) {
  try {
    const html = await download(url);
    const filename = path.basename(url);    // Informe O CAMINHO DA PASTA onde script irá salvar os arquivos
    const outputPath = path.join(__dirname, 'CAMINHO DA SUA PASTA AQUI', filename + '.html');
    
    createDirectory(path.dirname(outputPath)); // Certificando-se de que a pasta existe
    fs.writeFileSync(outputPath, html);
    console.log(`HTML do site salvo em: ${outputPath}`);
    return html;
  } catch (error) {
    console.error(`Erro ao baixar o HTML do site: ${error.message}`);
  }
}

// Função para buscar e baixar os assets do site
async function downloadAssets(html, baseUrl) {
  const $ = cheerio.load(html);
  const assetsToDownload = [];

  // Encontrar imagens
  $('img').each((index, element) => {
    const imgSrc = $(element).attr('src');
    if (imgSrc) {
      const assetUrl = new URL(imgSrc, baseUrl).toString();
      const assetPath = path.join(__dirname, 'Caminho do diretorio AQUI', imgSrc);
      assetsToDownload.push({ url: assetUrl, path: assetPath });
    }
  });

  // Encontrar CSS
  $('link[rel="stylesheet"]').each((index, element) => {
    const cssHref = $(element).attr('href');
    if (cssHref) {
      const assetUrl = new URL(cssHref, baseUrl).toString();
      const assetPath = path.join(__dirname, 'Caminho do diretorio AQUI', cssHref);
      assetsToDownload.push({ url: assetUrl, path: assetPath });
    }
  });

  // Encontrar JS
  $('script[src]').each((index, element) => {
    const jsSrc = $(element).attr('src');
    if (jsSrc) {
      const assetUrl = new URL(jsSrc, baseUrl).toString();
      const assetPath = path.join(__dirname, 'Caminho do diretorio AQUI', jsSrc);
      assetsToDownload.push({ url: assetUrl, path: assetPath });
    }
  });

  // Baixar todos os assets encontrados
  for (const asset of assetsToDownload) {
    await downloadFile(asset.url, asset.path);
  }

  console.log('Download de assets completo!');
}

// Função principal para clonar o site
async function cloneSite(url) {
  const baseUrl = new URL(url).origin;
  
  // Baixar o HTML do site
  const html = await downloadHtml(url);
  if (!html) {
    console.error('Falha ao baixar o HTML, abortando...');
    return;
  }

  // Baixar todos os assets encontrados no HTML
  await downloadAssets(html, baseUrl);

  console.log('Clonagem do site concluída!');
}

// Informe a URL do site que deseja clonar
const siteUrl = 'coloque aqui a URL';  // Substitua pela URL do site que você deseja clonar
cloneSite(siteUrl);
