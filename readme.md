# Rocket-Chat-Black-Box-Testing

Este projeto tem como objetivo realizar testes de caixa preta na aplicação Rocket.Chat.

## Requisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Instalação

Clone este repositório em sua máquina:

```bash
git clone https://github.com/samuelncaetano/Rocket-Chat-Black-Box-Testing.git
cd Rocket-Chat-Black-Box-Testing
```

Instale as dependências do projeto:

```bash
npm install
```

## Execução dos Testes

Para executar os testes automatizados, com a aplicação do Rocket.Chat inicializada, utilize o comando:

```bash
npx playwright test tests/blackBox.spec.js 
```