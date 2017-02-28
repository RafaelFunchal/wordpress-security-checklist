[collaborating]: https://help.github.com/categories/63/articles
[youtube-video]: http://www.youtube.com/watch?v=H3olaBo83As

# Sobre #

Uma lista simples para melhorar a segurança da sua instalação WordPress.

## Contribua com o projeto ##

Se você quiser contribuir com esse projeto e adicionar mais itens na lista, por favor, clique no botão **Fork**, crie um **Branch**, melhore o código e envie sua contribuição como um **Pull Request**.

Você pode ver mais informações sobre como contribuir e enviar Pull Requests em [GitHub Collaborating][collaborating].

[Como colaborar com projetos opensource no GitHub][youtube-video].

### Como instalar ###

#### Instalando os itens necessários ####

Caso você não tenha `gem` instalado em seu computador, você pode instalá-lo usando esse (link)[https://rubygems.org/pages/download];

Esse projeto utiliza (Jekyll)[https://jekyllrb.com/] como gerenciador de conteúdo e (Bundler)[http://bundler.io/] como gerenciador de dependências, então é necessário instalá-los em seu computador executando esse comando no terminal:

`$ gem install jekyll bundler`

#### Copiando o projeto para seu computador ####

Clique no botão `Fork` para copiar o projeto para sua conta do GitHub.

Após criar uma versão do projeto em seu próprio GitHub, é necessário salvá-la em seu computador. Abra o terminal e utilize esse código (note que você precisa substituir SEU-NOME-DE-USUÁRIO por seu nome de usuário real):

`$ git clone git@github.com:SEU-NOME-DE-USUÁRIO/wordpress-security-checklist.git`

#### Rodando o Jekyll ####

Acesse o projeto onde você o salvou usando o comando:

`$ cd /caminho/para/o/diretorio`

Agora vamos instalar as dependências (isso pode demorar alguns minutos):

`$ bundle install`

Agora você já pode executar o Jekyll para ver o projeto rodando em seu navegador:

`$ jekyll serve`

Ao rodar esse comando, será exibido um link que você precisa copiar e colar em seu navegador.

Pronto! Agora você só precisa fazer as alterações que quiser, commitar e mandar o Pull Request.

------

# About #

A simple checklist to improve the security of your WordPress installation.

## Contribute to the Project ##

If you want to contribute with this project and add more items to the list, please, click on the **Fork** button, create a *Branch*, improve the code and send it with a **Pull Request**.

More details about how to contribute and send Pull Requests in [GitHub Collaborating][collaborating].

[How to colaborate to opensource projects on GitHub][youtube-video].

### How to install ###

#### Installing all necessary items ####

If you don't have `gem` installed on your computer, it is possible to install from this (link)[https://rubygems.org/pages/download];

This project uses (Jekyll)[https://jekyllrb.com/] as a content management system and (Bundler)[http://bundler.io/] as a dependency manager, so it is necessary to install them on your computer by executing this command on terminal:

`$ gem install jekyll bundler`

#### Copying the project to your computer ####

Click on the `Fork` button to copy the project to your own GitHub account.

After that, it is necessary to save the project on your computer by running this command on terminal (replace YOUR-USERNAME by your real username):

`$ git clone git@github.com:YOUR-USERNAME/wordpress-security-checklist.git`

#### Running Jekyll ####

Access the directory where the project has been saved by using this command on terminal:

`$ cd /path/to/directory`

Let's install all dependencies (it can take a while):

`$ bundle install`

Now your are all set to execute Jekyll and navigate to your own copy on your browser:

`$ jekyll serve`

By running that command, Jekyll will give you a link. Copy and paste it on your browser.

All done! Now you just need to make the changes you want to, commit them, and send me a Pull Request.
