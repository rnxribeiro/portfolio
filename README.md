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
| `src/data/site.js` | nome, rótulo, título e texto do hero, caminho do currículo (`cv`), textos do About (título e áreas de atuação da Home), e-mail e convite de contato |
| `src/data/bio.js` | página `/bio` (link na bio): lista numerada (itens com `enabled`), blocos de destaque (RNX Mode, Setup) |
| `src/data/books.js` | livros indicados (carrossel da `/bio`) |
| `src/data/stack.js` | ferramentas por grupo: card "Ferramentas" da Home e lista da página Sobre |
| `src/data/experience.js` | "Trajetória" em cards. A Home mostra a versão resumida (`highlights`, com ✓) e a página `/experience` mostra a completa (`details`). Cada item tem `location` e aceita `tags` |
| `src/data/projects.js` | projetos (`featured` → Home; `imageInvert` inverte imagens de fundo branco no card) |
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

## Visual (dark minimalism / bento grid)
- Fundo quase preto, cards grafite com borda fina, cantos de 12px, tipografia leve (Inter) e bastante espaço negativo.
- Paleta em variáveis no começo de `src/styles/index.css`: fundo `#09090B`, cards `#18181B` / `#202023`, bordas `#29292D`, texto `#F4F4F5`, secundário `#929298`, detalhes `#A1A1AA`.
- Home: hero sem fotos (com um arco abstrato só em CSS) → projetos em bento grid assimétrico → "Sobre mim" em três colunas → Experiência & Skills (trajetória, ferramentas e GitHub em cards) → contato → rodapé enxuto.
- O tamanho de cada card de projeto no grid vem do CSS (`.projects > :nth-child`): largos (7/12) com a imagem ao lado e estreitos (5/12) com a imagem em cima.

### Títulos com marcações
Títulos aceitam marcações leves (componente `src/components/Rich.jsx`), em `src/data/` e `src/i18n/ui.js`:
- `~texto~` → tom cinza (título em dois tons)
- `*texto*` → itálico em cinza
- `\n` → quebra de linha

## Tema (escuro é o padrão, claro opcional)
- O tema **escuro** é o padrão. O botão de sol/lua alterna para o **claro** e salva a escolha no navegador (chave `rnx:theme-v2`).
- A troca usa uma transição suave (View Transitions API, com fallback de cores); com `prefers-reduced-motion`, ela é instantânea.
- Cores ficam em variáveis CSS: `:root` (escuro) e `:root[data-theme="light"]` (claro) no começo de `src/styles/index.css`. O atributo `data-theme` vem de um script em `index.html` (e `bio/index.html`), que roda antes do React para evitar "flash".

## Contato
- No fim da Home e da página Sobre há um convite (`ContactCTA`) com o título de `site.contact.cta`.
- Os botões (`ContactCard`): **Mandar e-mail** (abre o app de e-mail), **Copiar e-mail**, LinkedIn e GitHub. A página `/contact` mostra também o endereço em destaque e todas as redes. O e-mail vem de `site.contact.email`; os links, de `src/data/socials.js`.

## Página /bio (link na bio do Instagram)
- Rota `/bio`, independente: não mostra a navbar nem o rodapé globais. Fica numa coluna estreita (formato de celular), com o logo (volta para `/`) e o botão de tema. Segue o mesmo tema (claro/escuro) escolhido no site.
- Estrutura: perfil com redes (o e-mail fica só no bloco de contato do fim) → cards de link (quadrado com ícone, título, descrição e seta) → card do YouTube → Media Kit em formato de pasta → contato (cartão de e-mail).
- **Setup** e **Livros que indico** são itens da lista e abrem listas exclusivas da `/bio`: `/bio/setup` e `/bio/livros` (não são as páginas do site). Elas têm uma seta no canto superior esquerdo que volta para `/bio`.
- Tudo vem de `src/data/bio.js`: a lista (`links`, com `enabled`), os cards do fim (`featured`), o card do YouTube (`youtube`) e os textos das listas (`listPages`).
- A lista de setup usa os itens de `src/data/setup.js` e a de livros usa `src/data/books.js` (título, autor, editora, capa em `src/assets/books/`, link de compra).
- **Vídeo do YouTube:** cole o link (ou só o ID) do vídeo em `youtube.video`, em `bio.js`. Vazio = aparece "Vídeo em breve". O player só carrega quando a pessoa clica em play.
- Componentes: `BioLayout`, `BioRow`, `LinkItem`, `FolderCard`, `FeaturedLink` e `YoutubeCard`; as redes sociais reutilizam `SocialLinks`.
- SEO: o title/description/Open Graph são aplicados ao abrir cada página (`useDocumentMeta`) e `bio/index.html` é uma segunda entrada do Vite com essas tags já no HTML, para quem não executa JavaScript. Em hosts como Vercel/Netlify, `/bio` serve esse arquivo. Para as subpáginas, configure o host para redirecionar para `index.html` (como nas demais rotas).

## Tela de carregamento
- Ao abrir o site aparece uma tela simples ("RNX" e um fio que se preenche) que some com um fade quando as fontes e imagens terminam de carregar, depois de no mínimo ~1s. Não aparece de novo ao trocar de página, nem para quem ativou "reduzir movimento" no sistema.
- Configuração em `site.splash` (`src/data/site.js`): `enabled`, `minMs`, `maxMs` e `excludePaths` (ex.: `["/bio"]` para a página do link na bio abrir direto). O componente é `src/components/Splash.jsx`.

## Animações
- O componente `src/components/Reveal.jsx` faz o conteúdo aparecer (fade + subida de 12px) quando entra na tela. Use `<Reveal as="section" delay={90}>…</Reveal>`; `delay` (ms) escalona itens de uma lista.
- O topo de cada página entra em sequência com a classe `.intro` + `style={{ "--d": "200ms" }}`.
- A duração e a curva ficam em `@keyframes rise` em `src/styles/index.css`.
- Com "reduzir movimento" ativo no sistema, o conteúdo aparece direto, sem animação.

## Imagens
- A foto (`src/assets/images/renan-portrait.webp`) aparece no card "Sobre mim" da Home, na página Sobre e no topo da `/bio`.

Coloque os arquivos em `src/assets/{images,setup,projects}`, importe no arquivo de dados
(`import mac from "../assets/setup/macbook.webp"`) e use no campo `image`. Sem imagem, o card mostra um placeholder.

## GitHub
Usa a API pública (sem token): `/users`, `/repos` e `/events/public` (cerca de 90 dias de atividade).
O calendário oficial de contribuições exige token, por isso o grid mostra atividade pública recente.
Há cache de 30 min e fallback se a API falhar.

## Deploy
Como usa React Router, configure o host para redirecionar todas as rotas para `index.html`
(Vercel e Netlify fazem isso com um rewrite de SPA).
