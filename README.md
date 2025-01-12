<div align="justify">

# Projeto Gráfica BocaBoa

O projeto para a gráfica BocaBoa consiste no desenvolvimento de uma aplicação web com front-end e back-end para a
criação de etiquetas personalizadas.

---

## API Gateway base URL

```
https://dwt1enboq6.execute-api.us-east-1.amazonaws.com/
```

---

## Rotas disponíveis

### /stickers

1. **Listar stickers disponíveis (GET /stickers) - 200**

   Exemplo de Body:
   ```json
   ```  

   Exemplo de output:
   ```json
   {
      "items": [
         {
            "created_at": "2025-01-12T20:58:43.656330",
            "width": "100",
            "height": "100",
            "created_by": null,
            "paperType": "glossy",
            "promotion_id": null,
            "shape": "rectangle",
            "price": "18",
            "description": "A test sticker",
            "id": "4153299416331907745",
            "name": "Test Sticker",
            "color": "full_color"
         }
      ],
      "lastEvaluatedKey": null,
      "count": 1
   }
   ```
2. **Criar um sticker (POST /stickers) - 201**

   Exemplo de Body:
   ```json
   {
      "name": "Test Sticker",
      "description": "A test sticker",
      "width": 100,
      "height": 100,
      "paperType": "glossy",
      "color": "full_color",
      "shape": "rectangle"
   }
   ```  

   Exemplo de output:
   ```json
   {
      "id": "4153299416331907745",
      "name": "Test Sticker",
      "description": "A test sticker",
      "width": 100,
      "height": 100,
      "paperType": "glossy",
      "color": "full_color",
      "shape": "rectangle",
      "price": "18.00",
      "created_by": null,
      "created_at": "2025-01-12T20:58:43.656330",
      "promotion_id": null
   }
   ```
3. **Obter um sticker específico (GET /stickers/{id}) - 200**

   Exemplo de Body:
   ```json
   ```  

   Exemplo de output:
   ```json
   {
      "created_at": "2025-01-12T20:58:43.656330",
      "width": "100",
      "height": "100",
      "created_by": null,
      "paperType": "glossy",
      "promotion_id": null,
      "shape": "rectangle",
      "price": "18",
      "description": "A test sticker",
      "id": "4153299416331907745",
      "name": "Test Sticker",
      "color": "full_color"
   }
   ```
4. **Atualizar um sticker (PUT /stickers/{id}) - 200**

   Exemplo de Body:
   ```json
   {
     "name": "Updated Sticker Name",
     "description": "Updated description for the sticker.",
     "width": 10,
     "height": 20,
     "paperType": "glossy",
     "color": "full_color",
     "shape": "circle",
     "promotion_id": "promo123"
   }
   ```  

   Exemplo de output:
   ```json
   {
      "created_at": "2025-01-12T20:58:43.656330",
      "height": "20",
      "width": "10",
      "created_by": null,
      "paperType": "glossy",
      "promotion_id": "promo123",
      "shape": "circle",
      "description": "Updated description for the sticker.",
      "id": "4153299416331907745",
      "price": "0.43",
      "name": "Updated Sticker Name",
      "color": "full_color"
   }
   ```
5. **Deletar um sticker (DELETE /stickers/{id}) - 204**

   Exemplo de Body:
   ```json
   ```  

   Exemplo de output:
   ```json
   ```

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

## Anotações do itman

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