export const calcularFrete = (cepDestino) => {
    // CEP da gráfica
    const cepOrigem = "13206-020";
    
    // Função para verificar se o CEP é de Jundiaí
    const ehJundiai = (cep) => {
      // CEPs de Jundiaí começam com 132
      return cep.startsWith("132");
    };
    
    // Função para verificar se o CEP é da capital de São Paulo
    const ehSaoPauloCapital = (cep) => {
      // CEPs da capital de São Paulo começam com '01' até '05'
      const prefixo = cep.substring(0, 2);
      return ['01', '02', '03', '04', '05'].includes(prefixo);
    };
    
    // Função para calcular a distância aproximada entre CEPs
    const calcularDistanciaKm = (cepOrigem, cepDestino) => {
      // Em uma implementação real, você usaria uma API de geolocalização
      // Para demonstração, vamos supor uma distância baseada na diferença dos CEPs
      if (ehJundiai(cepDestino)) {
        // Diferença de CEPs dentro de Jundiaí - simplificação para exemplo
        const numOrigem = parseInt(cepOrigem.replace('-', '').substring(3));
        const numDestino = parseInt(cepDestino.replace('-', '').substring(3));
        const diferenca = Math.abs(numOrigem - numDestino);
        // Simulando que cada 1000 unidades de diferença equivale a 5km
        return Math.ceil(diferenca / 1000) * 5;
      }
      
      return 20; // Distância padrão para outros locais que serão atendidos
    };
    
    // Limpar o CEP para processamento
    const cepLimpo = cepDestino.replace(/\D/g, '');
    
    // Verificar se o CEP tem o formato correto
    if (cepLimpo.length !== 8) {
      return {
        status: false,
        mensagem: "CEP inválido. Por favor, insira um CEP válido.",
        valor: 0
      };
    }
    
    // Aplicar as regras específicas
    
    // 1. Se for São Paulo Capital, frete fixo de 30 reais
    if (ehSaoPauloCapital(cepLimpo)) {
      return {
        status: true,
        mensagem: "Entrega para São Paulo capital: frete fixo.",
        valor: 30
      };
    }
    
    // 2. Se for em Jundiaí, calcula o frete baseado na distância
    if (ehJundiai(cepLimpo)) {
      const distanciaKm = calcularDistanciaKm(cepOrigem.replace(/\D/g, ''), cepLimpo);
      const valorFrete = Math.ceil(distanciaKm / 5) * 5; // A cada 5km, 5 reais
      
      return {
        status: true,
        mensagem: `Entrega para Jundiaí: ${distanciaKm}km de distância.`,
        valor: valorFrete
      };
    }
    
    // 3. Para outros locais, não há entrega disponível
    return {
      status: false,
      mensagem: "Desculpe, não realizamos entregas para esta localidade.",
      valor: 0
    };
  };