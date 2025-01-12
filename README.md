# projeto-grafica-bocaboa

```
src/
  lambdas/
    auth/
      lambda_function.py
      # Funções de autenticação
      """
      - login
      - logout
      - refresh_token
      """

    users/
      lambda_function.py
      # Gerenciamento de usuários
      """
      - create_user
      - get_user
      - update_user
      - delete_user
      """

    stickers/
      lambda_function.py
      # Operações com etiquetas
      """
      - create_sticker
      - get_sticker
      - list_stickers
      - update_sticker
      - delete_sticker
      """

    orders/
      lambda_function.py
      # Gerenciamento de pedidos
      """
      - create_order
      - get_order
      - list_orders
      - update_order_status
      - get_user_orders
      """

    admin/
      lambda_function.py
      # Funções administrativas
      """
      - get_all_orders
      - get_system_stats
      - get_order_history
      - get_user_activities
      """

    payments/
      lambda_function.py
      # Integração com pagamentos
      """
      - create_payment
      - process_payment_webhook
      - get_payment_status
      """
```