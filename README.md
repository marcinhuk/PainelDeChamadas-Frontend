# Frontend do Painel de Chamadas

Esse aplicativo pode ser usado como um painel eletrônico para lanchonetes.

### Panel (tela para os clientes)
![Panel image](src/assets/images/readme/panel.webp)

## Admin
![Admin image](src/assets/images/readme/admin.webp)

1. O número dos pedidos serão incuídos ou excluídos;
2. O Layout (linha x coluna) de exibição pode ser alterado;
3. É possível suprimir o som na inclusão de novos pedidos.

Nesse projeto foi usado o Angular 17 e o Socket.io para envio e recebimento das informações em tempo real.

# Detalhes para execução do projeto:

#### Ambientes:

1. src/environments/environments.dv.ts
2. src/environments/environments.pd.ts

#### Variáveis de ambiente:

1. export const API_BASE_URL = 'http://localhost:3000'
2. export const SOCKET_IO_BASE_URL = 'http://localhost:3000'