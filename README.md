# RNX — personal hub de Renan Ribeiro

React + Vite + React Router. CSS puro com variáveis (design system em `src/styles/index.css`). Sem backend, sem TypeScript.

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção (pasta dist/)
```

## O que editar (sem mexer em componentes)

| Arquivo | Conteúdo |
| --- | --- |
| `src/data/site.js` | nome, tagline, foto, caminho do currículo (`cv`), textos do About, e-mail |
| `src/data/bio.js` | página `/bio` (link na bio): lista numerada (itens com `enabled`), blocos de destaque (RNX Mode, Setup) |
| `src/data/books.js` | livros indicados (carrossel da `/bio`) |
| `src/data/stack.js` | "Ferramentas do dia a dia" (grupos e pílulas), mostradas dentro de "Sobre mim" na Home e na página Sobre |
| `src/data/experience.js` | "Trajetória": linha do tempo que se preenche ao rolar. A Home mostra a versão resumida (`highlights`) e a página `/experience` mostra a completa (`details`). Cada item tem `location` e aceita `tags` |
| `src/data/projects.js` | projetos (placeholders — troque pelos reais) |
| `src/data/setup.js` | itens do setup (`setupItems`) e "Outros itens" (`otherItems`): aparecem só na página `/bio/setup` (o site principal não tem mais página de Setup) |
| `src/data/socials.js` | redes sociais (`placeholder: true` = link ainda não definido) |
| `src/data/github.js` | usuário e repositórios em destaque |
| `src/data/mediakit.js` | números do media kit (`XX` = placeholder) e caminho do PDF |

Procure por `TODO` nos arquivos de dados para ver o que ainda precisa do seu conteúdo real.

## Idioma (pt-BR principal, en-US opcional)
- O site abre em **pt-BR**. O botão `PT | EN` na navbar troca para **en-US** e a escolha fica salva no navegador.
- Textos da interface (menus, botões, rótulos): `src/i18n/ui.js` (um bloco por idioma).
- Textos de conteúdo nos arquivos de `src/data/`: use `bi("português", "english")`. Uma string simples vale para os dois idiomas (nomes de produtos, marcas etc.).
- Para adicionar um terceiro idioma: inclua o código em `LANGS` (`LanguageContext.jsx`), um bloco em `ui.js` e a opção em `LangSwitch.jsx`.

## Tema (claro é o padrão, escuro opcional)
- O tema **claro** é o padrão. O botão de lua/sol na navbar alterna para o **escuro** e salva a escolha no navegador (chave `rnx:theme-v2`).
- Ao trocar, o novo tema "abre" em círculo a partir do botão (View Transitions API). Em navegadores sem suporte, há uma transição suave de cores; com `prefers-reduced-motion`, a troca é instantânea.
- Cores ficam em variáveis CSS: `:root` (escuro) e `:root[data-theme="light"]` (claro) no começo de `src/styles/index.css`. O atributo `data-theme` vem de um script em `index.html`, que roda antes do React para evitar "flash".

## Contato
- Na página `/contact` e na seção "06 — Contato" da Home (componente `ContactCard`): o e-mail em destaque (abre o app de e-mail), um botão para **copiar o e-mail** e dois botões discretos (GitHub e LinkedIn). O e-mail vem de `site.contact.email`; os links, de `src/data/socials.js`.

## Página /bio (link na bio do Instagram)
- Rota `/bio`, independente: não mostra a navbar nem o rodapé globais. Tem o logo (volta para `/`), o seletor de idioma e o botão de tema.
- Estrutura: perfil com redes (o e-mail fica só no bloco de contato do fim) → cards de link (quadrado com ícone, título, descrição e seta) → card do YouTube → Media Kit em formato de pasta → contato (cartão de e-mail).
- **Setup** e **Livros que indico** são itens da lista e abrem listas exclusivas da `/bio`: `/bio/setup` e `/bio/livros` (não são as páginas do site). Elas têm uma seta no canto superior esquerdo que volta para `/bio`.
- Tudo vem de `src/data/bio.js`: a lista (`links`, com `enabled`), os cards do fim (`featured`), o card do YouTube (`youtube`) e os textos das listas (`listPages`).
- A lista de setup usa os itens de `src/data/setup.js` e a de livros usa `src/data/books.js` (título, autor, editora, capa em `src/assets/books/`, link de compra).
- **Vídeo do YouTube:** cole o link (ou só o ID) do vídeo em `youtube.video`, em `bio.js`. Vazio = aparece "Vídeo em breve". O player só carrega quando a pessoa clica em play.
- Componentes: `BioLayout`, `BioRow`, `LinkItem`, `FolderCard`, `FeaturedLink` e `YoutubeCard`; as redes sociais reutilizam `SocialLinks`.
- SEO: o title/description/Open Graph são aplicados ao abrir cada página (`useDocumentMeta`) e `bio/index.html` é uma segunda entrada do Vite com essas tags já no HTML, para quem não executa JavaScript. Em hosts como Vercel/Netlify, `/bio` serve esse arquivo. Para as subpáginas, configure o host para redirecionar para `index.html` (como nas demais rotas).

## Tela de carregamento
- Ao abrir o site aparece uma tela simples (RNX, o handle e uma barra fina) que some com um fade quando as fontes e imagens terminam de carregar, depois de no mínimo ~1s. Não aparece de novo ao trocar de página, nem para quem ativou "reduzir movimento" no sistema.
- Configuração em `site.splash` (`src/data/site.js`): `enabled`, `minMs`, `maxMs` e `excludePaths` (ex.: `["/bio"]` para a página do link na bio abrir direto). O componente é `src/components/Splash.jsx`.

## Animações ao rolar
- O componente `src/components/Reveal.jsx` faz o conteúdo aparecer (fade + subida de 18px) quando entra na tela. Use `<Reveal as="section" delay={90}>…</Reveal>`; `delay` (ms) escalona itens de uma lista.
- Os cards, cabeçalhos de seção e blocos das páginas já usam. A duração e a distância ficam em `.reveal.is-visible` e `@keyframes reveal-up` em `src/styles/index.css`.
- Com "reduzir movimento" ativo no sistema, o conteúdo aparece direto, sem animação.

## Imagens
O avatar do hero (`src/assets/images/renan-avatar.webp`) é uma imagem fixa, igual nos temas claro e escuro: traço preto, preenchimento branco e fundo transparente. Para trocar, substitua o arquivo mantendo o nome, ou aponte `hero.photo` em `src/data/site.js`. O tamanho é controlado por `.hero__avatar` e pelas colunas de `.hero__inner` em `src/styles/index.css`.

Coloque os arquivos em `src/assets/{images,setup,projects}`, importe no arquivo de dados
(`import mac from "../assets/setup/macbook.webp"`) e use no campo `image`. Sem imagem, o card mostra um placeholder.

## GitHub
Usa a API pública (sem token): `/users`, `/repos` e `/events/public` (cerca de 90 dias de atividade).
O calendário oficial de contribuições exige token, por isso o grid mostra atividade pública recente.
Há cache de 30 min e fallback se a API falhar.

## Deploy
Como usa React Router, configure o host para redirecionar todas as rotas para `index.html`
(Vercel e Netlify fazem isso com um rewrite de SPA).
