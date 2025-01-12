<div align="justify">

# Projeto Gráfica BocaBoa

O projeto para a gráfica BocaBoa consiste no desenvolvimento de uma aplicação web com front-end e back-end para a criação de etiquetas personalizadas.

---

## API Gateway base URL
```
https://dwt1enboq6.execute-api.us-east-1.amazonaws.com/
```

---

## Rotas disponíveis

### /stickers

1. **Listar stickers disponíveis (GET /stickers)**
    Body:
    ```json
    ```
    Exemplo de output:
    ```json
    {
      "items": [
        {
          "id": "1",
          "name": "Test Sticker",
          "description": "A test sticker",
          "width": 100,
          "height": 100,
          "paperType": "glossy",
          "color": "full_color",
          "shape": "rectangle"
        }
      ],
      "lastEvaluatedKey": null,
      "count": 1
    }
    ```
2. **Criar um sticker (POST /stickers)**
3. **Obter um sticker específico (GET /stickers/{id})**
4. **Atualizar um sticker (PUT /stickers/{id})**
5. **Deletar um sticker (DELETE /stickers/{id})**

---

### /orders

---

### /admin

---

### /auth

---

### /users

---

### /payments

---

## Anotações

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

</div>