// ──────────────────────────────────────────────────────────────
// RNX · livros que eu indico ("Minha estante", lista exclusiva da página /bio/livros)
//
// Para adicionar um livro: copie a capa para src/assets/books/, importe abaixo e inclua um item na lista.
//
// title     → título do livro
// author    → autor(a)
// publisher → editora (aparece ao lado do autor, acima do título)
// theme     → tema (id de bookThemes abaixo) — define em qual grupo o livro aparece
// genre     → gênero (aparece embaixo do título)
// image     → capa (importe de src/assets/books/) ou null para mostrar um placeholder
// link      → URL para comprar ("" = ainda sem link; a linha mostra "Em breve")
// store     → (opcional) loja do link; se omitido, usa bookStore abaixo. Aparece em cada livro.
// ──────────────────────────────────────────────────────────────
import essencialismo from "../assets/books/essencialismo.webp";
import habitosAtomicos from "../assets/books/habitos-atomicos.webp";
import segredosMenteMilionaria from "../assets/books/segredos-mente-milionaria.webp";
import comecePeloPorque from "../assets/books/comece-pelo-porque.webp";
import psicologiaFinanceira from "../assets/books/psicologia-financeira.webp";
import arteDeGastarDinheiro from "../assets/books/arte-de-gastar-dinheiro.webp";
import mindset from "../assets/books/mindset.webp";
import egoESeuInimigo from "../assets/books/ego-e-seu-inimigo.webp";
import homemMaisRicoDaBabilonia from "../assets/books/homem-mais-rico-da-babilonia.webp";
import supercomunicadores from "../assets/books/supercomunicadores.webp";
import roubeComoUmArtista from "../assets/books/roube-como-um-artista.webp";
import responsabilidadeExtrema from "../assets/books/responsabilidade-extrema.webp";
import arrumeASuaCama from "../assets/books/arrume-a-sua-cama.webp";
import aOdisseia from "../assets/books/a-odisseia.webp";
import entendendoAlgoritmos from "../assets/books/entendendo-algoritmos.webp";
import sqlGuiaPratico from "../assets/books/sql-guia-pratico.webp";
import almanaqueNaval from "../assets/books/almanaque-naval.webp";
import diarioEstoico from "../assets/books/diario-estoico.webp";
import quietudeEAChave from "../assets/books/quietude-e-a-chave.webp";
import montanhaEVoce from "../assets/books/montanha-e-voce.webp";
import aVacaRoxa from "../assets/books/a-vaca-roxa.webp";
import comoFazerAmigos from "../assets/books/como-fazer-amigos.webp";
import disciplinaEDestino from "../assets/books/disciplina-e-destino.webp";
import jeitoDisney from "../assets/books/jeito-disney.webp";
import dediqueSeDeCoracao from "../assets/books/dedique-se-de-coracao.webp";
import dozeRegrasParaAVida from "../assets/books/doze-regras-para-a-vida.webp";
import comoEvitarPreocupacoes from "../assets/books/como-evitar-preocupacoes.webp";
import aMarcaDaVitoria from "../assets/books/a-marca-da-vitoria.webp";
import comoDecifrarMentes from "../assets/books/como-decifrar-mentes.webp";
import oAtoCriativo from "../assets/books/o-ato-criativo.webp";
import comoFalarEmPublico from "../assets/books/como-falar-em-publico.webp";
import estrategiaOceanoAzul from "../assets/books/estrategia-oceano-azul.webp";
import dopamina from "../assets/books/dopamina.webp";
import diarioDeUmCeo from "../assets/books/diario-de-um-ceo.webp";
import oPoderDoHabito from "../assets/books/o-poder-do-habito.webp";
import convencerEm90Segundos from "../assets/books/convencer-em-90-segundos.webp";
import armasDaPersuasao2 from "../assets/books/armas-da-persuasao-2.webp";
import armasDaPersuasao from "../assets/books/armas-da-persuasao.webp";
import encontreSeuPorque from "../assets/books/encontre-seu-porque.webp";
import aBoaSorte from "../assets/books/a-boa-sorte.webp";
import microHabitos from "../assets/books/micro-habitos.webp";
import paiRicoPaiPobre from "../assets/books/pai-rico-pai-pobre.webp";
import doMilAoMilhao from "../assets/books/do-mil-ao-milhao.webp";
import maisEspertoQueODiabo from "../assets/books/mais-esperto-que-o-diabo.webp";
import emNomeDoPovo from "../assets/books/em-nome-do-povo.webp";
import casaisInteligentes from "../assets/books/casais-inteligentes.webp";
import homemQueComprouOTempo from "../assets/books/homem-que-comprou-o-tempo.webp";
import nadaPodeMeFerir from "../assets/books/nada-pode-me-ferir.webp";
import nuncaEHoraDeParar from "../assets/books/nunca-e-hora-de-parar.webp";
import aStartupEnxuta from "../assets/books/a-startup-enxuta.webp";
import codigoLimpo from "../assets/books/codigo-limpo.webp";
import transformandoSuorEmOuro from "../assets/books/transformando-suor-em-ouro.webp";
import menteAfiada from "../assets/books/mente-afiada.webp";
import ricoSexyEFeliz from "../assets/books/rico-sexy-e-feliz.webp";
import penseDeNovo from "../assets/books/pense-de-novo.webp";
import coisasQueVoceSoVe from "../assets/books/coisas-que-voce-so-ve.webp";
import salomao from "../assets/books/salomao.webp";

// Loja onde a compra é feita (os links meli.la levam ao Mercado Livre).
export const bookStore = "Mercado Livre";

// Temas da estante, na ordem em que aparecem. Para criar um novo (ex.: tecnologia), inclua aqui e use o id nos livros.
export const bookThemes = [
  { id: "tecnologia", title: "Tecnologia" },
  { id: "pessoal", title: "Desenvolvimento pessoal" },
  { id: "financas", title: "Finanças" },
  { id: "negocios", title: "Negócios" },
  { id: "lideranca", title: "Liderança & comunicação" },
  { id: "classicos", title: "Clássicos" },
];

export const books = [
  { title: "Código limpo", theme: "tecnologia", genre: "Boas práticas de código", author: "Robert C. Martin", publisher: "Alta Books", image: codigoLimpo, link: "https://meli.la/2digZpF" },
  { title: "Entendendo algoritmos", theme: "tecnologia", genre: "Algoritmos", author: "Aditya Y. Bhargava", publisher: "Novatec", image: entendendoAlgoritmos, link: "https://meli.la/2sQjF8K" },
  { title: "SQL: guia prático", theme: "tecnologia", genre: "Banco de dados", author: "Alice Zhao", publisher: "Novatec", image: sqlGuiaPratico, link: "https://meli.la/2ndxby7" },
  { title: "Hábitos atômicos", theme: "pessoal", genre: "Hábitos e comportamento", author: "James Clear", publisher: "Alta Books", image: habitosAtomicos, link: "https://meli.la/14yMRQg" },
  { title: "O poder do hábito", theme: "pessoal", genre: "Hábitos e comportamento", author: "Charles Duhigg", publisher: "Companhia das Letras", image: oPoderDoHabito, link: "https://meli.la/1c7jTZA" },
  { title: "12 regras para a vida", theme: "pessoal", genre: "Psicologia", author: "Jordan B. Peterson", publisher: "Alta Books", image: dozeRegrasParaAVida, link: "https://meli.la/2DvH74V" },
  { title: "Mindset", theme: "pessoal", genre: "Psicologia", author: "Carol S. Dweck", publisher: "Objetiva", image: mindset, link: "https://meli.la/2EU89bq" },
  { title: "Como evitar preocupações e começar a viver", theme: "pessoal", genre: "Bem-estar", author: "Dale Carnegie", publisher: "Sextante", image: comoEvitarPreocupacoes, link: "https://meli.la/2YxwDEc" },
  { title: "Essencialismo", theme: "pessoal", genre: "Produtividade", author: "Greg McKeown", publisher: "Sextante", image: essencialismo, link: "https://meli.la/27MceGp" },
  { title: "Diário estoico", theme: "pessoal", genre: "Filosofia estoica", author: "Ryan Holiday", publisher: "Intrínseca", image: diarioEstoico, link: "https://meli.la/2W2a2Mm" },
  { title: "Nada pode me ferir", theme: "pessoal", genre: "Superação", author: "David Goggins", publisher: "Sextante", image: nadaPodeMeFerir, link: "https://meli.la/2GCwJkf" },
  { title: "O ego é seu inimigo", theme: "pessoal", genre: "Filosofia estoica", author: "Ryan Holiday", publisher: "Intrínseca", image: egoESeuInimigo, link: "https://meli.la/31UiKwU" },
  { title: "A montanha é você", theme: "pessoal", genre: "Autoconhecimento", author: "Brianna Wiest", publisher: "Intrínseca", image: montanhaEVoce, link: "https://meli.la/2ScqpuQ" },
  { title: "O almanaque de Naval Ravikant", theme: "pessoal", genre: "Riqueza e felicidade", author: "Eric Jorgenson", publisher: "Intrínseca", image: almanaqueNaval, link: "https://meli.la/1nhfBj7" },
  { title: "Disciplina é destino", theme: "pessoal", genre: "Filosofia estoica", author: "Ryan Holiday", publisher: "Intrínseca", image: disciplinaEDestino, link: "https://meli.la/1muEmqj" },
  { title: "Pense de novo", theme: "pessoal", genre: "Psicologia", author: "Adam Grant", publisher: "Sextante", image: penseDeNovo, link: "https://meli.la/1oq6bn6" },
  { title: "Dopamina", theme: "pessoal", genre: "Neurociência", author: "Daniel Z. Lieberman", publisher: "Sextante", image: dopamina, link: "https://meli.la/1bhnJJ5" },
  { title: "Micro-hábitos", theme: "pessoal", genre: "Hábitos e comportamento", author: "B.J. Fogg", publisher: "HarperCollins", image: microHabitos, link: "https://meli.la/2kNYkiJ" },
  { title: "Roube como um artista", theme: "pessoal", genre: "Criatividade", author: "Austin Kleon", publisher: "Rocco", image: roubeComoUmArtista, link: "https://meli.la/2X4kyFw" },
  { title: "O ato criativo", theme: "pessoal", genre: "Criatividade", author: "Rick Rubin", publisher: "Sextante", image: oAtoCriativo, link: "https://meli.la/1dGjVQT" },
  { title: "Nunca é hora de parar", theme: "pessoal", genre: "Superação", author: "David Goggins", publisher: "Sextante", image: nuncaEHoraDeParar, link: "https://meli.la/13TXfue" },
  { title: "Mais esperto que o diabo", theme: "pessoal", genre: "Mentalidade", author: "Napoleon Hill", publisher: "Citadel", image: maisEspertoQueODiabo, link: "https://meli.la/2LX9oyL" },
  { title: "A quietude é a chave", theme: "pessoal", genre: "Filosofia estoica", author: "Ryan Holiday", publisher: "Intrínseca", image: quietudeEAChave, link: "https://meli.la/1K6aVuc" },
  { title: "Arrume a sua cama", theme: "pessoal", genre: "Disciplina", author: "William H. McRaven", publisher: "Academia", image: arrumeASuaCama, link: "https://meli.la/28yR6SH" },
  { title: "As coisas que você só vê quando desacelera", theme: "pessoal", genre: "Mindfulness", author: "Haemin Sunim", publisher: "Sextante", image: coisasQueVoceSoVe, link: "https://meli.la/12MSzZj" },
  { title: "Mente afiada", theme: "pessoal", genre: "Saúde do cérebro", author: "Sanjay Gupta", publisher: "Sextante", image: menteAfiada, link: "https://meli.la/2BBQH66" },
  { title: "A boa sorte", theme: "pessoal", genre: "Fábula", author: "Álex Rovira Celma", publisher: "Sextante", image: aBoaSorte, link: "https://meli.la/2ScjgzJ" },
  { title: "Pai rico, pai pobre", theme: "financas", genre: "Educação financeira", author: "Robert T. Kiyosaki", publisher: "Alta Books", image: paiRicoPaiPobre, link: "https://meli.la/2G3Aou4" },
  { title: "O homem mais rico da Babilônia", theme: "financas", genre: "Finanças pessoais", author: "George S. Clason", publisher: "Harper Business", image: homemMaisRicoDaBabilonia, link: "https://meli.la/2fu5ZoG" },
  { title: "Os segredos da mente milionária", theme: "financas", genre: "Mentalidade financeira", author: "T. Harv Eker", publisher: "Sextante", image: segredosMenteMilionaria, link: "https://meli.la/22ovyD7" },
  { title: "A psicologia financeira", theme: "financas", genre: "Comportamento financeiro", author: "Morgan Housel", publisher: "Harper Business", image: psicologiaFinanceira, link: "https://meli.la/1BwiWaP" },
  { title: "Do mil ao milhão", theme: "financas", genre: "Investimentos", author: "Thiago Nigro", publisher: "HarperCollins", image: doMilAoMilhao, link: "https://meli.la/1tiWZ6g" },
  { title: "O homem que comprou o tempo", theme: "financas", genre: "Investimentos", author: "Thiago Nigro", publisher: "Citadel", image: homemQueComprouOTempo, link: "https://meli.la/1amMsmH" },
  { title: "Casais inteligentes enriquecem juntos", theme: "financas", genre: "Finanças pessoais", author: "Gustavo Cerbasi", publisher: "Sextante", image: casaisInteligentes, link: "https://meli.la/1FCsZho" },
  { title: "A arte de gastar dinheiro", theme: "financas", genre: "Finanças pessoais", author: "Morgan Housel", publisher: "Harper Business", image: arteDeGastarDinheiro, link: "https://meli.la/2gcuTMz" },
  { title: "Salomão, o homem mais rico que já existiu", theme: "financas", genre: "Sabedoria financeira", author: "Steven K. Scott", publisher: "Sextante", image: salomao, link: "https://meli.la/2sJH1AT" },
  { title: "Rico, sexy e feliz", theme: "financas", genre: "Riqueza e felicidade", author: "Steven Bartlett", publisher: "Sextante", image: ricoSexyEFeliz, link: "https://meli.la/11V2NU8" },
  { title: "Em nome do povo", theme: "financas", genre: "Economia", author: "Bruno Perini", publisher: "Citadel", image: emNomeDoPovo, link: "https://meli.la/1384GR5" },
  { title: "A marca da vitória", theme: "negocios", genre: "Biografia empresarial", author: "Phil Knight", publisher: "Sextante", image: aMarcaDaVitoria, link: "https://meli.la/23y7hj5" },
  { title: "A startup enxuta", theme: "negocios", genre: "Empreendedorismo", author: "Eric Ries", publisher: "Sextante", image: aStartupEnxuta, link: "https://meli.la/1spq769" },
  { title: "A estratégia do oceano azul", theme: "negocios", genre: "Estratégia", author: "W. Chan Kim", publisher: "Sextante", image: estrategiaOceanoAzul, link: "https://meli.la/2ELs5SR" },
  { title: "A vaca roxa", theme: "negocios", genre: "Marketing", author: "Seth Godin", publisher: "Best Business", image: aVacaRoxa, link: "https://meli.la/2z6bNTS" },
  { title: "O diário de um CEO", theme: "negocios", genre: "Empreendedorismo", author: "Steven Bartlett", publisher: "Sextante", image: diarioDeUmCeo, link: "https://meli.la/16WyrkJ" },
  { title: "Dedique-se de coração", theme: "negocios", genre: "Biografia empresarial", author: "Howard Schultz", publisher: "Buzz", image: dediqueSeDeCoracao, link: "https://meli.la/1fknApG" },
  { title: "O jeito Disney de encantar os clientes", theme: "negocios", genre: "Atendimento ao cliente", author: "Disney Institute", publisher: "Benvirá", image: jeitoDisney, link: "https://meli.la/2PA2SU1" },
  { title: "Como fazer amigos e influenciar pessoas", theme: "lideranca", genre: "Relacionamentos", author: "Dale Carnegie", publisher: "Sextante", image: comoFazerAmigos, link: "https://meli.la/1pkHQwv" },
  { title: "As armas da persuasão", theme: "lideranca", genre: "Persuasão", author: "Robert B. Cialdini", publisher: "Sextante", image: armasDaPersuasao, link: "https://meli.la/2GtTRvz" },
  { title: "Comece pelo porquê", theme: "lideranca", genre: "Liderança", author: "Simon Sinek", publisher: "Sextante", image: comecePeloPorque, link: "https://meli.la/2E371eU" },
  { title: "Como falar em público e encantar as pessoas", theme: "lideranca", genre: "Oratória", author: "Dale Carnegie", publisher: "Sextante", image: comoFalarEmPublico, link: "https://meli.la/1cQroYe" },
  { title: "Responsabilidade extrema", theme: "lideranca", genre: "Liderança", author: "Jocko Willink", publisher: "Alta Books", image: responsabilidadeExtrema, link: "https://meli.la/1PAyr9f" },
  { title: "Supercomunicadores", theme: "lideranca", genre: "Comunicação", author: "Charles Duhigg", publisher: "Objetiva", image: supercomunicadores, link: "https://meli.la/1g1jEif" },
  { title: "As armas da persuasão 2.0", theme: "lideranca", genre: "Persuasão", author: "Robert B. Cialdini", publisher: "HarperCollins", image: armasDaPersuasao2, link: "https://meli.la/2v72oRy" },
  { title: "Encontre seu porquê", theme: "lideranca", genre: "Propósito", author: "Simon Sinek", publisher: "Sextante", image: encontreSeuPorque, link: "https://meli.la/1utyZP4" },
  { title: "Como decifrar mentes", theme: "lideranca", genre: "Psicologia comportamental", author: "David J. Lieberman", publisher: "Sextante", image: comoDecifrarMentes, link: "https://meli.la/2GidxW6" },
  { title: "Transformando suor em ouro", theme: "lideranca", genre: "Liderança", author: "Bernardinho", publisher: "Sextante", image: transformandoSuorEmOuro, link: "https://meli.la/1L6G9UY" },
  { title: "Como convencer alguém em 90 segundos", theme: "lideranca", genre: "Persuasão", author: "Nicholas Boothman", publisher: "Universo dos Livros", image: convencerEm90Segundos, link: "https://meli.la/2ewj6j6" },
  { title: "A Odisseia", theme: "classicos", genre: "Poesia épica", author: "Homero", publisher: "Atlantis", image: aOdisseia, link: "https://meli.la/1koveJB" },
];
