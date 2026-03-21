# 🌞 Plus RN Energia Solar — Landing Page

Landing page moderna e criativa para captação de leads (Google Ads) da empresa **Plus RN Energia Solar**, com design neon/dark e múltiplos CTAs para WhatsApp.

---

## ✅ Funcionalidades Implementadas

### Design & UX
- **Tema dark neon** com cores #0aee56 (verde), #011a77 (azul escuro) e #ffffff
- **Efeitos neon** (glow) em botões, títulos, bordas e ícones via `box-shadow` e `text-shadow`
- **Partículas animadas** no hero (CSS + JS puro, sem bibliotecas)
- **Grid lines animadas** de fundo no hero
- **Glassmorphism** nos cards de depoimentos
- **Parallax sutil** no hero ao rolar a página
- **Tilt 3D** nos cards ao passar o mouse (perspective CSS)
- **Scroll reveal animations** via Intersection Observer API
- **Design totalmente responsivo** (mobile-first, breakpoints 1024px, 768px, 480px)

### Seções
1. **Navbar fixa** com logo SVG (arco + raio), links de navegação e CTA "Solicitar Orçamento". Fica sólida ao rolar.
2. **Hero fullscreen** com título impactante, subtítulo, 2 CTAs, contador de economia animado e ilustração SVG de painéis solares
3. **Stats strip** com contadores animados: +500 projetos, 95% economia, +10 anos, 25 anos de garantia
4. **Benefícios** — 4 cards com ícones SVG neon e hover effects
5. **Como Funciona** — Timeline de 4 etapas com números grandes
6. **Simulador de Economia** — slider/input interativo com cálculo em tempo real (80% de aproveitamento) e link dinâmico para WhatsApp
7. **Depoimentos** — 3 cards glassmorphism com avaliações realistas
8. **Formulário de captura de leads** — nome, telefone (máscara), e-mail, valor da conta, cidade, tipo; submissão abre WhatsApp com mensagem pré-formatada
9. **Contato** — cards clicáveis (WhatsApp, e-mail, site, endereço), horário de funcionamento e embed de mapa
10. **Footer** completo com logo, links rápidos, serviços, contato e redes sociais
11. **Botão WhatsApp flutuante** com animação pulse, fixo no canto inferior direito

### JavaScript
- Gerador de partículas dinâmico com reciclagem
- Navbar scroll + menu mobile hamburger animado
- Contador hero animado (economia "aumentando")
- Contadores de stats com Intersection Observer
- Simulador com animação de valores e barras de progresso
- Máscara de telefone no formulário
- Feedback visual no submit do formulário
- Smooth scroll para âncoras
- Active state do nav baseado em seção visível

---

## 📁 Estrutura de Arquivos

```
index.html          — Página principal (HTML5 semântico)
css/
  style.css         — Estilos completos (CSS3 puro, sem frameworks)
js/
  main.js           — JavaScript vanilla (sem dependências externas)
README.md           — Este arquivo
```

---

## 🔗 URLs de Entrada

| Rota | Descrição |
|------|-----------|
| `/` ou `index.html` | Página principal |
| `#beneficios` | Seção de benefícios |
| `#como-funciona` | Como funciona |
| `#simulador` | Simulador de economia |
| `#depoimentos` | Depoimentos de clientes |
| `#captura` | Formulário de leads |
| `#contato` | Informações de contato |

**WhatsApp CTA:** `https://wa.me/5584996808516?text=...`

---

## 📞 Dados de Contato

- **WhatsApp:** (84) 99680-8516
- **E-mail:** plusrn84@gmail.com
- **Site:** plusrn.com.br
- **Endereço:** R. Gov. Dix-Sept Rosado Maia, 26 - Sala 1043 - Cohabinal, Parnamirim - RN, 59140-740

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico (header, nav, section, article, footer, etc.)
- **CSS3** puro (variáveis, grid, flexbox, animations, keyframes, backdrop-filter)
- **JavaScript Vanilla** (ES6+, Intersection Observer, requestAnimationFrame)
- **Google Fonts CDN**: Rajdhani (títulos) + Inter (texto)
- **SVGs inline** para logo, ícones e ilustrações (sem dependências externas)

---

## 🚀 Próximos Passos Recomendados

1. **Integrar Google Tag Manager / Meta Pixel** para rastreamento de conversões do Google Ads
2. **Adicionar Google Analytics 4** para monitorar tráfego e CTR
3. **Configurar Google Ads conversion tracking** nos cliques do botão WhatsApp
4. **Implementar backend/webhook** para salvar leads do formulário em planilha ou CRM
5. **Adicionar fotos reais** de instalações e da equipe (substituindo SVGs de avatar)
6. **Criar versão AMP** para melhor desempenho no mobile em anúncios Google
7. **A/B testing** nos textos do hero para otimizar taxa de conversão
8. **Adicionar chat ao vivo** (Tidio ou JivoChat) para suporte instantâneo

---

*© 2025 Plus RN Energia Solar. Parnamirim – RN*
