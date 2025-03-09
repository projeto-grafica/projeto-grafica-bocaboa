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
     "name": "User",
     "address": {
       "cep": "12345678",
       "cidade": "São Paulo",
       "estado": "SP",
       "logradouro": "Avenida Paulista",
       "numero": "123",
       "complemento": "Sala 456"
     }
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
     "email": "user@example.com",
     "address": {
       "cep": "12345678",
       "cidade": "São Paulo",
       "estado": "SP",
       "logradouro": "Avenida Paulista",
       "numero": "123",
       "complemento": "Sala 456"
     }
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

## Stickers

1. **Listar stickers disponíveis (GET /stickers)** - 200

   Exemplo de Output:
   ```json
   {
     "items": [
       {
        "name": "Test Sticker",
        "description": "A test sticker",
        "width": 100,
        "height": 100,
        "paperType": "glossy",
        "color": "full_color",
        "shape": "rectangle",
        "price": 18.00,
        "tipo": "etiqueta"
       }
     ],
     "lastEvaluatedKey": null,
     "count": 1
   }
   ```

2. **Criar um sticker (POST /stickers)** - 201

   Exemplo de Body:
   ```json
   {
     "name": "Test Sticker",
     "description": "A test sticker",
     "width": 100,
     "height": 100,
     "paperType": "glossy",
     "color": "full_color",
     "shape": "rectangle",
     "price": 18.00,
     "tipo": "etiqueta"
   }
   ```

   Exemplo de Output:
   ```json
   {
     "sticker_id": "4153299416331907745",
     "name": "Test Sticker",
     "description": "A test sticker",
     "width": 100,
     "height": 100,
     "paperType": "glossy",
     "color": "full_color",
     "shape": "rectangle",
     "price": "18.00",
     "created_by": "user-123",
     "created_at": "2025-01-12T20:58:43.656330",
     "promotion_id": null,
     "tipo": "etiqueta",
     "images": []
   }
   ```

3. **Obter um sticker específico (GET /stickers/{id})** - 200

   Exemplo de Output:
   ```json
   {
     "sticker_id": "4153299416331907745",
     "name": "Test Sticker",
     "description": "A test sticker",
     "width": 100,
     "height": 100,
     "paperType": "glossy",
     "color": "full_color",
     "shape": "rectangle",
     "price": "18.00",
     "created_by": "user-123",
     "created_at": "2025-01-12T20:58:43.656330",
     "promotion_id": null,
     "tipo": "etiqueta",
     "images": []
   }
   ```

4. **Atualizar um sticker (PUT /stickers/{id})** - 200

   Exemplo de Body:
   ```json
   {
     "name": "Adesivo Premium",
     "description": "Adesivo resistente a água e exposição solar",
     "width": 150,
     "height": 100,
     "paperType": "glossy",
     "color": "full_color",
     "shape": "rectangle",
     "price": 24.90,
     "promotion_id": "summer2025"
   }
   ```

   Exemplo de Output:
   ```json
   {
     "sticker_id": "4153299416331907745",
     "name": "Adesivo Premium",
     "description": "Adesivo resistente a água e exposição solar",
     "width": 150,
     "height": 100,
     "paperType": "glossy",
     "color": "full_color",
     "shape": "rectangle",
     "price": "24.90",
     "created_by": "user-123",
     "created_at": "2025-01-12T20:58:43.656330",
     "updated_at": "2025-03-08T15:43:21.123456",
     "promotion_id": "",
     "tipo": "etiqueta",
     "images": []
   }
   ```

5. **Deletar um sticker (DELETE /stickers/{id})** - 204

### Endpoints para Upload de Imagens

6. **Gerar URLs para upload de imagens (POST /stickers/{id}/images)** - 200

   Exemplo de Body:
   ```json
   {
     "count": 2
   }
   ```

   Exemplo de Output:
   ```json
   [
     {
       "upload_url": "https://boca-boa-stickers-images.s3.amazonaws.com/",
       "upload_fields": {
         "key": "stickers/sticker-id/image-uuid1",
         "AWSAccessKeyId": "AKIAEXAMPLE",
         "x-amz-security-token": "security-token-value",
         "policy": "base64-encoded-policy",
         "signature": "signature-value"
       },
       "image_url": "https://boca-boa-stickers-images.s3.amazonaws.com/stickers/sticker-id/image-uuid1"
     },
     {
       "upload_url": "https://boca-boa-stickers-images.s3.amazonaws.com/",
       "upload_fields": {
         "key": "stickers/sticker-id/image-uuid2",
         "AWSAccessKeyId": "AKIAEXAMPLE",
         "x-amz-security-token": "security-token-value",
         "policy": "base64-encoded-policy",
         "signature": "signature-value"
       },
       "image_url": "https://boca-boa-stickers-images.s3.amazonaws.com/stickers/sticker-id/image-uuid2"
     }
   ]
   ```

7. **Adicionar imagens ao sticker (PUT /stickers/{id}/images)** - 200

   Exemplo de Body:
   ```json
   {
     "image_urls": [
       "https://boca-boa-stickers-images.s3.amazonaws.com/stickers/sticker-id/image-uuid1",
       "https://boca-boa-stickers-images.s3.amazonaws.com/stickers/sticker-id/image-uuid2"
     ]
   }
   ```

   Exemplo de Output:
   ```json
   {
     "id": "sticker-id",
     "name": "Sticker Name",
     "description": "Sticker description",
     "images": [
       "https://boca-boa-stickers-images.s3.amazonaws.com/stickers/sticker-id/image-uuid1",
       "https://boca-boa-stickers-images.s3.amazonaws.com/stickers/sticker-id/image-uuid2"
     ],
     "width": 100,
     "height": 50,
     "paperType": "glossy",
     "color": "full_color",
     "shape": "rectangle",
     "price": "15.00",
     "created_at": "2025-01-12T20:58:43.656330",
     "created_by": "user-123",
     "tipo": "etiqueta",
     "addresses": [...]
   }
   ```

8. **Remover uma imagem do sticker (DELETE /stickers/{id}/images)** - 200

   Exemplo de Body:
   ```json
   {
     "image_url": "https://boca-boa-stickers-images.s3.amazonaws.com/stickers/sticker-id/image-uuid1"
   }
   ```

   Exemplo de Output:
   ```json
   {
     "id": "sticker-id",
     "name": "Sticker Name",
     "description": "Sticker description",
     "images": [
       "https://boca-boa-stickers-images.s3.amazonaws.com/stickers/sticker-id/image-uuid2"
     ],
     "width": 100,
     "height": 50,
     "paperType": "glossy",
     "color": "full_color",
     "shape": "rectangle",
     "price": "15.00",
     "created_at": "2025-01-12T20:58:43.656330",
     "created_by": "user-123",
     "tipo": "etiqueta",
     "addresses": [...]
   }
   ```

### Integração do Frontend para Upload de Imagens

O processo de upload de imagens para stickers envolve os seguintes passos:

1. **Criar um sticker base**: Primeiro, crie um sticker com as características básicas como tamanho, tipo de papel, etc.

2. **Obter URLs pré-assinadas**: Use o endpoint `/stickers/{id}/images` para obter URLs pré-assinadas que permitirão o upload direto para o S3.

3. **Fazer upload das imagens para o S3**: Use as URLs pré-assinadas para enviar as imagens diretamente ao S3, sem passar pelo backend.

4. **Associar as imagens ao sticker**: Após o upload bem-sucedido, notifique o backend sobre as URLs das imagens para associá-las ao sticker.

#### Exemplo de integração em JavaScript/React

```javascript
// 1. Função para obter URLs pré-assinadas
async function getUploadUrls(stickerId, count = 1) {
  const response = await fetch(`/stickers/${stickerId}/images`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ count })
  });
  
  return await response.json();
}

// 2. Função para fazer upload de uma imagem usando URL pré-assinada
async function uploadImage(file, uploadData) {
  const formData = new FormData();
  
  // Adicionar todos os campos da política de upload
  Object.entries(uploadData.upload_fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  // Adicionar o arquivo - IMPORTANTE: o arquivo deve ser o último campo
  formData.append('file', file);
  
  // Fazer o upload diretamente para o S3 (já deixei o cors liberado para vcs)
  const response = await fetch(uploadData.upload_url, {
    method: 'POST',
    body: formData
  });
  
  if (response.ok) {
    return uploadData.image_url;
  } else {
    throw new Error('Falha no upload da imagem');
  }
}

// 3. Função para associar imagens ao sticker
async function attachImagesToSticker(stickerId, imageUrls) {
  const response = await fetch(`/stickers/${stickerId}/images`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ image_urls: imageUrls })
  });
  
  return await response.json();
}

// Função completa que combina os passos anteriores
async function uploadStickerImages(stickerId, files) {
  try {
    // Obter URLs pré-assinadas (uma para cada arquivo)
    const uploadUrls = await getUploadUrls(stickerId, files.length);
    
    // Fazer upload de cada arquivo e obter as URLs resultantes
    const uploadPromises = files.map((file, index) => 
      uploadImage(file, uploadUrls[index])
    );
    
    const uploadedImageUrls = await Promise.all(uploadPromises);
    
    // Associar as imagens ao sticker
    const updatedSticker = await attachImagesToSticker(stickerId, uploadedImageUrls);
    
    return updatedSticker;
  } catch (error) {
    console.error('Erro no processo de upload:', error);
    throw error;
  }
}

// Exemplo de uso em um componente React
function StickerImageUploader({ stickerId }) {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };
  
  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    try {
      const result = await uploadStickerImages(stickerId, files);
      console.log('Upload completo:', result);
      // Atualizar a UI com as novas imagens
    } catch (error) {
      console.error('Erro no upload:', error);
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isUploading || files.length === 0}>
        {isUploading ? 'Enviando...' : 'Enviar Imagens'}
      </button>
    </div>
  );
}
```

**Observações importantes:**

1. Os uploads são feitos diretamente para o S3, o que é mais eficiente e reduz a carga no backend.
2. As URLs pré-assinadas têm tempo de expiração, então o upload deve ser feito logo após obtê-las.
3. Os campos devem ser enviados exatamente como retornados pelo backend, incluindo todos os campos de autenticação e a política.
4. O campo do arquivo (`file`) deve ser adicionado por último no FormData para funcionar corretamente com o S3.
5. Após o upload bem-sucedido para o S3, é necessário informar o backend sobre as URLs das imagens para associá-las ao sticker no banco de dados.
6. Por que esta abordagem é superior? Este método de upload em duas etapas (gerar URL pré-assinada + upload direto para S3) oferece várias vantagens:
    - Escalabilidade: O backend não precisa lidar com o processamento de arquivos grandes, permitindo que ele atenda mais requisições
    - Melhor performance: Uploads são mais rápidos, pois vão diretamente do cliente para o S3
    - Menor custo: Reduz o consumo de recursos do Lambda e a transferência de dados, já que os arquivos não passam pelo backend
    - Maior confiabilidade: Se o backend tiver um problema durante o upload, o arquivo não fica perdido
    - Segurança: O controle de acesso é garantido pelas políticas e assinaturas nas URLs pré-assinadas

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
