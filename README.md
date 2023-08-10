O que é refresh token?

Imagine que temos uma aplicação backend e então temos dentro do projetos algumas rotas com requisições sendo feitas e então
dentro dessas requisições queremos estipular que apenas usuários autenticados podem ter acesso a determinadas rotas.

Para isso é necessário implementar diversas maneiras de realizar essa autenticação dentro de nossa aplicação, podemos usar 
ferramentas como JWT (JsonWebToken). Uma vez feita a validação autenticando esse usuário, com essas informações então retornamos
um token, que basicamente é um objeto contendo os dados desse usuário e uma série de chaveamentos e hashs que é enviado nas demais
requisições feitas. Então toda vez que o usuário autenticado tentar realizar o acesso de uma rota pegamos esse token, verificamos
se é um token válido, se foi manipulado, verificando se sua estrutura está correta ou caso ele não tenha sofrido alguma alteração.

Só que um token possui uma vida útil digamos assim, ele tem um tempo de vida em que ele pode existir, sendo má prática colocar sua duração com um tempo muito extenso. Então o que acontece visto que uma vez que o token expira é necessário se autenticar novamente.
De forma muito comum em aplicações dentro da web utilizamos utilizamos um refresh token que basicamente é a criação de uma nova string
que basicamente é utilizado para gerar um novo token. 

Por isso, por conta do refresh token o usuário não é redirecionado para uma tela de login toda vez que esse token expira.