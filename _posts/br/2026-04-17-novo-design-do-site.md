---
layout: post
title:  "Novo visual e melhorias no WordPress Security Checklist"
date:   2026-04-17 12:00:00
image:  "/img/screenshot.png"
categories: update
language: br
permalink: /br/update/:year/:month/:day/:title/
---

Lancei uma **grande atualização** no [wpsecuritychecklist.org](https://wpsecuritychecklist.org/){:target="_blank" rel="noopener noreferrer"}: novo design, navegação mais clara e um código mais simples de manter, para o checklist continuar fácil de usar no celular, no desktop e no GitHub Pages.

## O que mudou na prática

**Tipografia e leitura**  
O site passou a usar a fonte **Plus Jakarta Sans**, com hierarquia mais forte: títulos maiores e mais pesados e espaçamentos ajustados para facilitar a leitura das seções longas do checklist.

**Superfícies com profundidade suave**  
Seguindo tendências de interface atuais (sombras suaves, controles mais “táteis”), o conteúdo principal fica em um **painel elevado** com sombras leves; o cabeçalho, a navegação e os botões principais ganharam profundidade sem virar um visual pesado.

**Cabeçalho e rodapé**  
O cabeçalho está mais organizado (título e descrição alinhados à coluna do conteúdo), com **barra de navegação arredondada** e links em formato de **pílula**. O menu mobile usa um **hambúrguer só em CSS** que vira ícone de fechar—sem sprite de imagem. O **idioma** abre a partir de um **ícone** no cabeçalho, com submenu compacto, no lugar do seletor em lista longa. O rodapé usa um **painel translúcido** sobre o fundo da marca, **grid** em CSS para as colunas e links sociais / contribuição mais legíveis.

**Tema claro e escuro**  
Dá para alternar entre **claro** e **escuro** pelo ícone ao lado do menu. Até você escolher, o site respeita o **tema do sistema**. A preferência fica salva para a próxima visita.

**Front end mais enxuto**  
Marcação de itens, contadores por seção e o alternador de tema rodam em **JavaScript puro** (sem jQuery), deixando a página mais leve e o comportamento mais previsível. O progresso fica **salvo no navegador** entre visitas. Uma **barra de progresso fixa** e contadores por seção ajudam a se localizar. Os itens marcados ganham um **traço estilo caneta** por cima, e dá para **marcar ou limpar todos os itens de uma seção** de uma vez. Ao concluir a lista, dá para ter uma **celebração** (movimento, confetes e som opcional), com um controle para desligar quando você quiser menos distração ou menos movimento. Também é possível **exportar em PDF**, com nome de projeto opcional na capa.

**Conteúdo e hospedagem**  
As recomendações do checklist foram **revisadas para o WordPress atual** (data da última revisão na página inicial). O projeto está alinhado com o build **nativo do GitHub Pages** (sem plugins de idioma frágeis no build), e os textos localizados carregam de forma confiável em **inglês, português, espanhol e japonês** por meio de um único arquivo de dados de strings. Há orientações novas para **reduzir enumeração de autores e nomes de usuário**, com trecho opcional para **Apache `.htaccess`** em bloco **recolhível**, para a página continuar legível. Itens como **XML-RPC** e outros mais ligados a hospedagem passaram a ficar na seção **Hospedagem**, e os rótulos dos links para o guia oficial de fortalecimento do WordPress estão **traduzidos em cada idioma**.

**Dados estruturados**  
Todas as páginas incluem **JSON-LD (Schema.org)**, e o próprio checklist é descrito como **ItemList** no idioma ativo—melhor para buscadores e para quem consome dados estruturados.

**Acessibilidade e privacidade**  
Há **link para pular** direto ao conteúdo principal, landmark **`main`** correto e textos de **ARIA localizados** para o menu, metadados de navegação e controles do checklist (incluindo o diálogo do PDF, com **armadilha de foco** para quem usa teclado). O `<head>` ganhou política de **`referrer`** mais restritiva e **Permissions-Policy** enxuta para APIs que o site não usa.

## A mesma proposta de sempre

O checklist continua **gratuito**, **open source** e focado em ações práticas para fortalecer o WordPress. Sugestões de texto ou traduções são bem-vindas no repositório no [GitHub](https://github.com/rafaelfunchal/wordpress-security-checklist){:target="_blank" rel="noopener noreferrer"}.

Obrigado por usar o site—se algo quebrar no seu navegador ou idioma, abra uma issue que dou uma olhada.
