<div align="justify">

# Projeto Gráfica BocaBoa

O projeto para a gráfica BocaBoa consiste no desenvolvimento de uma aplicação web com front-end e back-end para a
criação de etiquetas personalizadas.

---

## API Gateway base URL

```
https://v10k527pp4.execute-api.us-east-1.amazonaws.com
```

---

## Rotas disponíveis

### /auth

1. **Criar uma nova conta (POST /auth/signup) - 200**

   Exemplo de Body:

   ```json
   {
     "email": "user@example.com",
     "password": "StrongP@ssw0rd123",
     "name": "User"
   }
   ```

   Exemplo de output:

   ```json
   {
     "message": "User created successfully. Please check your email for confirmation code.",
     "userSub": "94f8a4a8-7031-706b-58da-d839a19c3fee"
   }
   ```

2. **Confirmar conta (POST /auth/confirm) - 200**

   Exemplo de Body:

   ```json
   {
     "email": "user@example.com",
     "code": "123456"
   }
   ```

   Exemplo de output:

   ```json
   {
     "message": "Email confirmed successfully"
   }
   ```

3. **Login (POST /auth/login) - 200**

   Exemplo de Body:

   ```json
   {
     "email": "user@example.com",
     "password": "StrongP@ssw0rd123"
   }
   ```

   Exemplo de output:

   ```json
   {
     "message": "Login successful",
     "tokens": {
       "idToken": "eyJraWQiOiJ...",
       "accessToken": "eyJraWQiOi...",
       "refreshToken": "eyJjdHki..."
     }
   }
   ```

4. **Reenviar código de confirmação (POST /auth/resend-code) - 200**

   Exemplo de Body:

   ```json
   {
     "email": "user@example.com"
   }
   ```

   Exemplo de output:

   ```json
   {
     "message": "Confirmation code resent successfully"
   }
   ```

   Possíveis erros:
   - 404: User not found
   - 400: Invalid parameters
   - 429: Too many attempts. Please try again later

**Observações:**

- Todas as senhas devem ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais
- O código de confirmação é enviado para o email cadastrado e expira em 24 horas
- Os tokens retornados no login devem ser utilizados para autenticar requisições em rotas protegidas
- O accessToken deve ser incluído no header Authorization como "Bearer {token}"

---

### /users

1. **Obter detalhes do usuário (GET /users/{id}) - 200**

   Exemplo de Body:

   ```json

   ```

   Exemplo de output:

   ```json
   {
     "updated_at": "2025-02-22T14:28:28.007162",
     "created_at": "2025-02-22T14:28:28.007141",
     "id": "44c8d4e8-90a1-7001-13a0-48ff0aa14dd0",
     "role": "client",
     "email": "user@example.com"
   }
   ```

2. **Atualizar usuário (PUT /users/{id}) - 200**

   Exemplo de Body:

   ```json
   {
     "role": "admin"
   }
   ```

   Exemplo de output:

   ```json
   {
     "updated_at": "2025-02-22T15:09:05.128004",
     "created_at": "2025-02-22T14:28:28.007141",
     "email": "user@example.com",
     "id": "44c8d4e8-90a1-7001-13a0-48ff0aa14dd0",
     "role": "admin"
   }
   ```

3. **Deletar usuário (DELETE /users/{id}) - 200**

   Exemplo de Body:

   ```json

   ```

   Exemplo de output:

   ```json
   {
     "message": "User deleted successfully"
   }
   ```

---

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

1. **Criar um pedido (POST /orders) - 201**

   Exemplo de Body:

   ```json
   {
      "client_id": 123,
      "sticker_id": 456,
      "personalized": true,
      "date": "2025-02-24T20:58:43.656330",
      "status": "preparing"
   }

   ```

   Exemplo de output:

   ```json
   {
     "id": "987654321",
     "client_id": 123,
     "sticker_id": 456,
     "personalized": true,
     "date": "2025-02-24T20:58:43.656330",
     "status": "preparing"
   }
   ```

2. **Listar pedidos (GET /orders) - 200**

   Exemplo de output:

   ```json
   {
     "items": [
       {
         "id": 987654321,
         "client_id": 123,
         "sticker_id": 456,
         "personalized": true,
         "date": "2025-02-24T20:58:43.656330",
         "status": "preparing"
       }
     ],
     "lastEvaluatedKey": null,
     "count": 1
   }
   ```

3. **Obter um pedido específico (GET /orders/{id}) - 200**

   Exemplo de output:

   ```json
   {
     "id": 987654321,
     "client_id": 123,
     "sticker_id": 456,
     "personalized": true,
     "date": "2025-02-24T20:58:43.656330",
     "status": "preparing"
   }
   ```

4. **Atualizar um pedido (PUT /orders/{id}) - 200**

   Exemplo de Body:

   ```json
   {
     "status": "finished"
   }
   ```

   Exemplo de output:

   ```json
   {
     "id": 987654321,
     "client_id": 123,
     "sticker_id": 456,
     "personalized": false,
     "date": "2025-02-24T20:58:43.656330",
     "status": "finished",
     "updated_at": "2025-02-24T22:10:15.123456"
   }
   ```

5. **Deletar um pedido (DELETE /orders/{id}) - 204**

   Exemplo de output:

   ```json
   
   ```

---

### /admin

---

### /payments

---

</div>
