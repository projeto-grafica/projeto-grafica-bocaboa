# Requisitos Funcionais

Requisitos funcionais são especificações que descrevem o que um sistema deve fazer para atender às necessidades dos usuários e cumprir suas funções principais. Eles definem as ações, comportamentos e serviços que o sistema deve proporcionar, detalhando as funcionalidades que devem ser implementadas para resolver problemas específicos ou suportar processos de negócios. Esses requisitos geralmente abordam aspectos como operações que o sistema deve executar, interações com usuários e outros sistemas, e regras de processamento de dados. Ao contrário dos requisitos não funcionais, que se concentram em atributos como desempenho e segurança, os requisitos funcionais focam nas capacidades e comportamentos diretos do sistema.

## RF001 - Cadastro e gerenciamento de usuário

**Novos usuários devem ser capazes de cadastrar um perfil na aplicação**

### Critérios de aceitação
- A aplicação deve permitir que um novo usuário (cliente) se cadastre no sistema.
- Todos os campos obrigatórios devem ser preenchidos para que o cadastro seja realizado com sucesso.
- O sistema deve validar os campos, garantindo que informações como email estejam em um formato válido e que a senha atenda aos critérios de segurança.
- A aplicação deve verificar se o usuário (cliente) já existe no sistema antes de efetuar o cadastro.
- Caso o usuário (cliente) já esteja registrado, o sistema deve exibir uma mensagem informando que o cadastro não pode ser duplicado e sugerir a recuperação da senha.
- Após o cadastro, o sistema deve enviar uma confirmação por email ao usuário, contendo um link para a ativação do perfil.
- O perfil do usuário (cliente) só será ativado após a confirmação via email.
- O usuário (cliente) cadastrado deve ser adicionado ao banco de dados e estar acessível para operações futuras (edição, visualização).
- Após o cadastro, o usuário deve poder recuperar a senha e editar seu perfil.

## RF002 - Cadastro e gerenciamento de produtos

**A aplicação deve permitir que os usuários (administradores) cadastrem e gerenciem produtos**

### Critérios de aceitação
- A aplicação deve permitir que o usuário (administrador) cadastre um novo produto no sistema.
- Todos os campos obrigatórios devem ser preenchidos para que o cadastro seja realizado com sucesso.
- A aplicação deve verificar se o produto já existe no sistema antes de efetuar o cadastro.
- Caso o produto já esteja registrado, o sistema deve exibir uma mensagem informando que o cadastro não pode ser duplicado.
- A aplicação deve permitir que o usuário (administrador) visualize a lista de produtos cadastrados.
- A interface de gerenciamento deve permitir a filtragem e a pesquisa de produtos.
- O usuário (administrador) deve poder editar as informações de um produto existente.
- O usuário (administrador) deve poder excluir produtos existentes.

## RF003 - Catálogo de produtos

**A aplicação deve permitir que os usuários (clientes) visualizem todos os produtos disponíveis na página inicial.**

### Critérios de aceitação
- A aplicação deve exibir uma lista de todos os produtos disponíveis.
- A aplicação deve permitir que os usuários (clientes) pesquisem os produtos por critérios.
- A aplicação deve permitir que os usuários (clientes) ordenem a lista de produtos por critérios.
- Os usuários (clientes) devem ser capazes de filtrar os produtos por critérios.
- A aplicação deve fornecer uma página detalhada para cada produto contendo as informações detalhadas.
- Os usuários (clientes) devem ser capazes de adicionar produtos à lista de favoritos diretamente da página do catálogo.
- A aplicação deve fornecer uma navegação clara para retornar ao catálogo de produtos após a visualização de um item específico.
- A aplicação deve exibir um indicador de disponibilidade, caso o produto esteja esgotado, diretamente na listagem de produtos.
- A aplicação deve permitir que os usuários (clientes) alternem entre diferentes páginas ou seções de produtos.

## RF004 - Lista de favoritos

**A aplicação deve permitir que os usuários (clientes) possuam uma lista de produtos favoritos e gerenciá-los.**

### Critérios de aceitação
- A aplicação deve permitir que o usuário adicione produtos à sua lista de favoritos a partir da página de detalhes do produto.
- A interface deve fornecer um mecanismo visual claro (ex: ícone de estrela ou coração) para adicionar produtos aos favoritos.
- O usuário deve poder gerenciar sua lista de favoritos, incluindo a capacidade de remover, ordenar ou filtrar os produtos listados.
- O ícone de favoritos deve refletir a alteração quando um produto for removido da lista.
- O usuário deve ter acesso a uma página ou seção onde possa visualizar todos os produtos adicionados à sua lista de favoritos.

## RF005 - Personalização de itens

**A aplicação deve permitir que os usuários (clientes) possam personalizar características dos produtos a serem comprados.**

### Critérios de aceitação
- A aplicação deve permitir que os usuários selecionem e personalizem várias características dos produtos.
- O usuário deve ser capaz de imprimir esqueletos dos tamanhos unitários de itens disponíveis para a característica selecionada.
- A aplicação deve validar as personalizações para garantir a compatibilidade entre as opções.
- O usuário deve poder revisar todas as personalizações antes de finalizar a compra.
- A aplicação deve permitir que o usuário edite suas personalizações antes de finalizar a compra, retornando à tela de personalização sem perder as configurações feitas anteriormente.
- A aplicação deve calcular automaticamente o preço final do produto com base nas personalizações selecionadas pelo usuário, exibindo o custo adicional ou desconto de forma clara.
- A aplicação deve informar ao usuário sobre tempo de produção ou limitações de devolução.

## RF006 - Carrinho de compras

**A aplicação deve permitir que os usuários (clientes) possuam um carrinho de compras para adicionar produtos interessados.**

### Critérios de aceitação
- A aplicação deve permitir que os usuários (clientes) adicionem produtos ao carrinho de compras a partir das páginas de listagem e detalhes dos produtos.
- O usuário (clientes) deve ser capaz de especificar a quantidade de cada produto ao adicioná-lo ao carrinho.
- O usuário (clientes) deve ter acesso a uma visualização do conteúdo do carrinho de compras, incluindo produtos, quantidades, preços unitários e o total geral.
- A aplicação deve permitir que o usuário (clientes) atualize as quantidades de produtos no carrinho e remova itens indesejados.
- A aplicação deve permitir que o usuário (clientes) inicie o processo de checkout a partir do carrinho de compras.

## RF007 - Processamento de compra

**A aplicação deve permitir que os usuários (clientes) possam finalizar sua compra e acessar o acompanhamento do pedido.**

### Critérios de aceitação
- A aplicação deve permitir que o usuário (clientes) conclua o processo de compra a partir do carrinho de compras.
- O processo de checkout deve incluir etapas para revisar o pedido, inserir informações de pagamento e fornecer detalhes de envio.
- A aplicação deve exibir um resumo completo do pedido, incluindo taxas adicionais, impostos e o total a ser pago.
- A aplicação deve permitir que o usuário insira e processe informações de pagamento, como detalhes de cartão de crédito, métodos de pagamento alternativos ou códigos de cupom.
- A aplicação deve permitir que o usuário salve e reutilize as informações de pagamento para futuras compras (ex: "pagar novamente com Mercado Pago").
- Após a finalização da compra, a aplicação deve fornecer uma confirmação clara e detalhada do pedido, incluindo um número de pedido, resumo dos itens, e o total pago.
- A aplicação deve enviar um e-mail de confirmação para o usuário com os detalhes do pedido e informações sobre o próximo passo.
- O usuário deve poder acessar uma seção de acompanhamento de pedidos a partir de sua conta para verificar o status atual do pedido.
- A aplicação deve fornecer atualizações sobre o progresso do pedido, incluindo status (ex: "Em processamento", "Enviado", "Entregue").
- Os usuários (administradores) devem conseguir atualizar o progresso do pedido.
- Os usuários (administradores) devem conseguir cancelar uma compra.
- A aplicação deve realizar o estorno automático do valor pago ao usuário (clientes) em caso de cancelamento da compra.
- A aplicação deve notificar o usuário sobre alterações importantes no status do pedido, como despacho e entrega, por meio de e-mails ou notificações dentro da aplicação.

## RF008 - Histórico de compras

**A aplicação deve permitir que os usuários (clientes) possam acessar o histórico de compras e que os usuários (administradores) possam ver o histórico de compras dos clientes.**

### Critérios de aceitação
- Os usuários (clientes) devem poder acessar uma seção de histórico de compras em sua conta.
- O histórico deve listar todas as compras realizadas pelo usuário (clientes), incluindo detalhes como data, produtos comprados, quantidades e valores.
- Os usuários (clientes) devem ser capazes de filtrar o histórico por critérios relevantes.
- Os usuários (administradores) devem ter acesso a uma seção de histórico de compras que permita visualizar todos os históricos de compras.
- Os usuários (administradores) devem poder buscar e filtrar o histórico por cliente e outros critérios relevantes.
- Os usuários (clientes) devem ter acesso apenas ao seu próprio histórico de compras.

## RF009 - Gestão de estoque

**A aplicação deve permitir que os usuários (administradores) sejam capazes de alterar a disponibilidade de produtos.**

### Critérios de aceitação
- A aplicação deve permitir que os administradores definam a disponibilidade dos produtos.
- A aplicação deve exibir os produtos mesmo quando estiverem indisponíveis, em todos os locais onde eles são mostrados.
- A aplicação deve informar quando um item não estiver disponível.
- A aplicação deve impedir que itens indisponíveis que estejam em carrinhos sejam processados.

## RF010 - Funcionalidades administrativas

**Os usuários (administradores) devem ter acesso a funcionalidades para gerenciar a aplicação.**

### Critérios de aceitação
- A aplicação deve permitir que os administradores visualizem todos os usuários cadastrados.
- A aplicação deve permitir que os administradores gerenciem configurações do sistema, como métodos de pagamento, opções de envio e políticas de desconto.
- A aplicação deve oferecer relatórios administrativos sobre vendas, desempenho de produtos e comportamento dos clientes para apoiar a tomada de decisões.

## RF011 - Atendimento ao cliente

**A aplicação deve permitir que os usuários (clientes) possam acessar um portal que os direciona para o WhatsApp do comércio para serem atendidos.**

### Critérios de aceitação
- A aplicação deve apresentar respostas para as principais dúvidas dos clientes.
- A aplicação deve direcionar os usuários para o WhatsApp do comércio quando o botão ou link de atendimento for clicado.
- A aplicação deve utilizar um link clicável ou um botão que abra o WhatsApp com uma mensagem predefinida ou uma conversa iniciada.

---

# Requisitos Não Funcionais

Requisitos não funcionais são especificações que definem as qualidades e restrições que um sistema deve atender, mas que não estão diretamente relacionadas às funcionalidades específicas que ele oferece. Esses requisitos abordam aspectos como desempenho, segurança, usabilidade, confiabilidade, e escalabilidade, descrevendo como o sistema deve se comportar em termos de eficiência e experiência do usuário. Por exemplo, um requisito não funcional pode especificar que o sistema deve ser capaz de processar um determinado número de transações por segundo ou garantir que a interface seja acessível para pessoas com deficiências. Embora não descrevam o que o sistema deve fazer, esses requisitos são cruciais para assegurar que o sistema funcione de maneira segura e eficiente, proporcionando uma experiência de usuário satisfatória e atendendo aos padrões de qualidade necessários para o sucesso do projeto.

## **RNF001 - Desempenho do Sistema**

**Descrição**: O sistema deve ser capaz de processar até 1.000 requisições simultâneas com tempo de resposta máximo de 2 segundos para 95% das requisições.

**Critérios de Aceitação**:
- O sistema deve manter um tempo de resposta de até 2 segundos para 95% das requisições em cenários de alta demanda.
- Deve ser realizada uma simulação com 1.000 usuários simultâneos para verificar a estabilidade do sistema.

**Justificativa**: Esse requisito garante que o sistema funcione de forma eficiente, mesmo em momentos de alta demanda, melhorando a experiência do usuário.

**Impacto no Sistema**: Pode exigir melhorias na infraestrutura de servidores e otimização de consultas ao banco de dados.

**Plano de Teste**:
- Realizar testes de carga com ferramentas como JMeter ou Gatling para simular 1.000 usuários simultâneos e medir o tempo de resposta.

**Prioridade**: Alta

**Dependências**: Depende do RNF003 – Infraestrutura Escalável.

## RNF002 - Usabilidade e Acessibilidade**

**Descrição**: A interface do sistema deve seguir as diretrizes de acessibilidade WCAG 2.1 para garantir que usuários com deficiências possam navegar e interagir com o sistema.

**Critérios de Aceitação**:
- Todos os elementos da interface devem ser navegáveis via teclado.
- As imagens devem conter descrições alternativas (alt-text) adequadas.
- A interface deve oferecer contraste suficiente entre texto e fundo (pelo menos 4.5:1).
- O conteúdo deve ser acessível a leitores de tela.

**Justificativa**: Garantir a acessibilidade para todos os usuários, incluindo aqueles com deficiências visuais ou motoras, é fundamental para promover a inclusão.

**Impacto no Sistema**: Pode exigir ajustes no design da interface e na implementação do frontend para garantir conformidade com as diretrizes.

**Plano de Teste**:
- Realizar testes de acessibilidade usando ferramentas como WAVE e axe.
- Testar a navegação por teclado e o uso de leitores de tela como NVDA.

**Prioridade**: Média

**Dependências**: Depende da implementação do design da interface e do sistema de frontend.

## **RNF003 - Escalabilidade Horizontal**

**Descrição**: O sistema deve ser capaz de escalar horizontalmente, permitindo a adição de novos servidores para suportar o aumento da carga de trabalho.

**Critérios de Aceitação**:
- O sistema deve ser capaz de adicionar novos servidores sem interromper o serviço existente.
- A escalabilidade deve permitir o aumento de capacidade em até 500% da carga atual.
- O sistema deve balancear automaticamente o tráfego entre os servidores disponíveis.

**Justificativa**: A escalabilidade horizontal permite que o sistema suporte o crescimento do número de usuários e transações, garantindo desempenho adequado mesmo em picos de uso.

**Impacto no Sistema**: Exige o uso de balanceadores de carga e arquitetura adequada para suportar múltiplos servidores.

**Plano de Teste**:
- Simular aumento de carga e verificar se novos servidores são integrados corretamente.
- Testar o balanceamento de carga entre os servidores disponíveis.

**Prioridade**: Alta

**Dependências**: Depende da implementação de balanceadores de carga e infraestrutura escalável.

## **RNF004 - Confiabilidade e Tolerância a Falhas**

**Descrição**: O sistema deve ter um tempo de disponibilidade (uptime) mínimo de 99,9% ao longo de um mês, com tolerância a falhas em caso de interrupções no servidor primário.

**Critérios de Aceitação**:
- O sistema deve ser capaz de transferir automaticamente as operações para um servidor de backup em caso de falha do servidor primário.
- O tempo de inatividade não pode exceder 43 minutos em um mês.
- A recuperação automática do sistema deve ser concluída em até 1 minuto após a falha.

**Justificativa**: A confiabilidade é essencial para garantir que o sistema esteja disponível para os usuários na maior parte do tempo, minimizando interrupções.

**Impacto no Sistema**: Pode exigir a configuração de servidores redundantes e a implementação de mecanismos de failover.

**Plano de Teste**:
- Simular a falha do servidor primário e monitorar a transição para o servidor de backup.
- Medir o tempo de inatividade e o tempo de recuperação automática.

**Prioridade**: Alta

**Dependências**: Depende da implementação de servidores redundantes e failover.

## **RNF005 - Portabilidade em Dispositivos Móveis**

**Descrição**: O sistema deve ser totalmente compatível com dispositivos móveis (smartphones e tablets), ajustando sua interface para diferentes tamanhos de tela.

**Critérios de Aceitação**:
- A interface deve se ajustar de forma responsiva a telas menores (smartphones e tablets).
- Todos os recursos e funcionalidades devem estar disponíveis em dispositivos móveis.
- O sistema deve ser compatível com os principais navegadores móveis (Chrome, Safari).

**Justificativa**: A compatibilidade com dispositivos móveis é essencial para alcançar usuários que acessam o sistema de diferentes plataformas e dispositivos.

**Impacto no Sistema**: Requer ajustes no design da interface e testes em diferentes dispositivos e navegadores.

**Plano de Teste**:
- Realizar testes de compatibilidade em diferentes dispositivos móveis e navegadores.
- Verificar a responsividade da interface e o funcionamento completo das funcionalidades.

**Prioridade**: Média

**Dependências**: Depende da implementação de design responsivo e testes de compatibilidade em dispositivos móveis.

## **RNF006 - Proteção de Dados e Privacidade**

**Descrição**: O sistema deve garantir que todos os dados sensíveis dos usuários, como informações pessoais e de pagamento, sejam criptografados durante a transmissão e em repouso, seguindo as diretrizes da LGPD (Lei Geral de Proteção de Dados) e GDPR (General Data Protection Regulation).

**Critérios de Aceitação**:
- Todas as informações pessoais, como nome, endereço, e dados de pagamento, devem ser criptografadas usando um algoritmo seguro (AES-256).
- A transmissão de dados entre o cliente e o servidor deve ser protegida por HTTPS (SSL/TLS).
- O sistema deve implementar uma política de privacidade que informe os usuários sobre a coleta e uso de seus dados.
- Os usuários devem poder solicitar a exclusão ou anonimização de seus dados pessoais.

**Justificativa**: A proteção de dados sensíveis é fundamental para garantir a privacidade do usuário e evitar vazamentos de dados, em conformidade com as legislações de proteção de dados.

**Impacto no Sistema**: Pode exigir a implementação de criptografia em banco de dados e revisão das rotas de transmissão de dados, bem como a atualização da política de privacidade.

**Plano de Teste**:
- Testar a criptografia dos dados em repouso e durante a transmissão.
- Verificar a aplicação de SSL/TLS nas comunicações entre o cliente e o servidor.
- Simular tentativas de acesso não autorizado a dados sensíveis para validar a proteção.

**Prioridade**: Alta

**Dependências**: Depende da implementação de mecanismos de criptografia e configuração de certificados SSL.

