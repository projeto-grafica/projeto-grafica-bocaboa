import { useState, useEffect } from "react"
import { 
  Container, 
  Title, 
  SearchContainer, 
  SearchInput, 
  SearchIcon, 
  SectionContainer, 
  SectionTitle, 
  AccordionContainer, 
  AccordionItem, 
  AccordionHeader, 
  AccordionIcon, 
  AccordionContent, 
  NoResults, 
  List, 
  ListItem 
} from "./styles/styleSuporte"

const Suporte = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSections, setFilteredSections] = useState(faqSections)
  const [openItems, setOpenItems] = useState({})

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredSections(faqSections)
      return
    }

    const searchTermLower = searchTerm.toLowerCase()

    const filtered = faqSections
      .map((section) => {
        // Check if section title matches
        const titleMatches = section.title.toLowerCase().includes(searchTermLower)

        // Filter questions that match search term
        const filteredQuestions = section.questions.filter(
          (q) => q.question.toLowerCase().includes(searchTermLower) || q.answer.toLowerCase().includes(searchTermLower),
        )

        // If title matches or there are matching questions, include this section
        if (titleMatches || filteredQuestions.length > 0) {
          return {
            ...section,
            questions: filteredQuestions.length > 0 ? filteredQuestions : titleMatches ? section.questions : [],
          }
        }

        return null
      })
      .filter(Boolean)

    setFilteredSections(filtered)
  }, [searchTerm])

  const toggleAccordion = (sectionIndex, questionIndex) => {
    const key = `${sectionIndex}-${questionIndex}`
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Helper function to format answers with HTML
  const formatAnswer = (answer) => {
    // Process bold text
    const formattedAnswer = answer.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    // Process lists
    const lines = formattedAnswer.split("\n")
    let inList = false
    const result = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.trim().startsWith("- ")) {
        if (!inList) {
          inList = true
          result.push("<ul>")
        }
        result.push(`<li>${line.trim().substring(2)}</li>`)
      } else {
        if (inList) {
          inList = false
          result.push("</ul>")
        }
        result.push(line)
      }
    }

    if (inList) {
      result.push("</ul>")
    }

    return result.join("\n")
  }

  return (
    <Container>
      <Title>Central de Suporte</Title>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Pesquisar tópicos de ajuda..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        </SearchIcon>
      </SearchContainer>

      {/* FAQ Sections */}
      {filteredSections.length > 0 ? (
        filteredSections.map((section, sectionIndex) => (
          <SectionContainer key={sectionIndex}>
            <SectionTitle>{section.title}</SectionTitle>

            {section.questions.length > 0 ? (
              <AccordionContainer>
                {section.questions.map((item, questionIndex) => {
                  const key = `${sectionIndex}-${questionIndex}`
                  const isOpen = openItems[key] || false

                  return (
                    <AccordionItem key={questionIndex}>
                      <AccordionHeader onClick={() => toggleAccordion(sectionIndex, questionIndex)}>
                        {item.question}
                        <AccordionIcon isOpen={isOpen}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </AccordionIcon>
                      </AccordionHeader>
                      <AccordionContent isOpen={isOpen}>
                        <div dangerouslySetInnerHTML={{ __html: formatAnswer(item.answer) }} />
                      </AccordionContent>
                    </AccordionItem>
                  )
                })}
              </AccordionContainer>
            ) : (
              <p>Nenhuma pergunta encontrada para este tópico.</p>
            )}
          </SectionContainer>
        ))
      ) : (
        <NoResults>
          <p>Nenhum resultado encontrado para "{searchTerm}"</p>
          <p>Tente usar termos diferentes ou mais gerais.</p>
        </NoResults>
      )}
    </Container>
  )
}

// FAQ data
const faqSections = [
  {
    title: "1. Informações Gerais",
    questions: [
      {
        question: "Quais produtos vocês oferecem?",
        answer:
          "Oferecemos uma linha completa de produtos de impressão, incluindo:  \n- **Panfletos**  \n- **Etiquetas**  \n- **Envelopes**  \n- **Adesivos**  \n- **Cartões**  \nTodos os itens podem ser personalizados conforme as necessidades do seu projeto.",
      },
      {
        question: "Como posso solicitar um orçamento?",
        answer:
          "Você pode solicitar um orçamento preenchendo o formulário em nosso site, via chat online ou pelo telefone. Em seguida, um consultor entrará em contato para entender os detalhes do seu projeto.",
      },
      {
        question: "Quais são os prazos de produção e entrega?",
        answer:
          "Os prazos variam de acordo com o produto e a quantidade solicitada. Geralmente, a produção leva de 3 a 7 dias úteis, e a entrega pode ocorrer em até 5 dias úteis após a finalização da produção. Consulte os detalhes específicos de cada item em sua página de produto.",
      },
      {
        question: "Quais são os métodos de pagamento aceitos?",
        answer:
          "Aceitamos diversas formas de pagamento, incluindo cartões de crédito, débito, boleto bancário e transferência. No momento do checkout, você poderá escolher a opção que melhor se adequa às suas necessidades.",
      },
      {
        question: "Vocês oferecem suporte para criação e design dos produtos?",
        answer:
          "Sim, nossa equipe de design pode auxiliá-lo na criação do layout e na adaptação dos arquivos para garantir a melhor qualidade de impressão.",
      },
    ],
  },
  {
    title: "2. Suporte para Panfletos",
    questions: [
      {
        question: "Quais tamanhos de panfletos estão disponíveis?",
        answer:
          "Oferecemos tamanhos padrão, como A4 e A5, além de formatos personalizados conforme a demanda do cliente.",
      },
      {
        question: "Quais tipos de papel e acabamentos posso escolher?",
        answer:
          "Disponibilizamos diversas opções de gramatura e acabamentos – desde papéis mais leves para panfletos informativos até papéis de alta qualidade para maior durabilidade, com opções de acabamento fosco ou brilhante.",
      },
      {
        question: "Posso enviar meu próprio arquivo para impressão?",
        answer:
          "Sim, você pode enviar arquivos em formato PDF, JPG ou TIFF, desde que estejam com resolução mínima de 300 dpi. Nossa equipe fará a pré-análise e, se necessário, sugerirá ajustes.",
      },
      {
        question: "Existe a possibilidade de solicitar uma prova digital?",
        answer:
          "Sim, oferecemos uma prova digital para que você aprove o layout antes do início da produção, garantindo que o resultado final atenda às suas expectativas.",
      },
    ],
  },
  {
    title: "3. Suporte para Etiquetas",
    questions: [
      {
        question: "Quais tipos de etiquetas vocês produzem?",
        answer:
          "Trabalhamos com etiquetas adesivas para diversas aplicações – desde identificação de produtos até embalagens. Podemos personalizar o formato, tamanho e material de acordo com sua necessidade.",
      },
      {
        question: "É possível escolher a cor e o acabamento das etiquetas?",
        answer:
          "Sim, você pode optar por acabamentos fosco, brilhante ou laminado, além de personalizar as cores conforme a identidade visual da sua marca.",
      },
      {
        question: "Vocês atendem pedidos de grandes quantidades?",
        answer:
          "Sim, oferecemos descontos progressivos para pedidos em grande volume. Entre em contato com nosso setor comercial para mais informações.",
      },
      {
        question: "Quais são as recomendações para envio dos arquivos?",
        answer:
          "Recomendamos o envio de arquivos em alta resolução (mínimo 300 dpi) e no formato PDF ou TIFF, para garantir a qualidade de impressão.",
      },
    ],
  },
  {
    title: "4. Suporte para Envelopes",
    questions: [
      {
        question: "Quais modelos de envelopes estão disponíveis?",
        answer:
          "Oferecemos envelopes para diversos fins – desde correspondências e convites até envelopes personalizados para divulgação da sua marca. Você pode escolher o tamanho, a gramatura e o design.",
      },
      {
        question: "É possível personalizar os envelopes?",
        answer:
          "Sim, você pode personalizar os envelopes com sua logomarca, cores e outros elementos gráficos, conforme o projeto desejado.",
      },
      {
        question: "Qual gramatura é recomendada para envelopes?",
        answer:
          "Recomendamos gramaturas que garantam a segurança e o cuidado com o conteúdo, geralmente entre 90g e 120g, mas podemos ajustar conforme sua necessidade.",
      },
    ],
  },
  {
    title: "5. Suporte para Adesivos",
    questions: [
      {
        question: "Quais tipos de adesivos vocês produzem?",
        answer:
          "Produzimos adesivos para várias aplicações – desde etiquetas informativas até adesivos decorativos. Você pode personalizar o formato, tamanho e material.",
      },
      {
        question: "Posso imprimir adesivos em diferentes formatos e tamanhos?",
        answer:
          "Sim, nossos adesivos são flexíveis e podem ser produzidos em diversos formatos para atender ao seu projeto.",
      },
      {
        question: "Qual é a durabilidade dos adesivos?",
        answer:
          "A durabilidade dependerá do material e do acabamento escolhidos. Adesivos laminados e de alta qualidade podem resistir a intempéries e uso prolongado.",
      },
      {
        question: "Há opção de solicitar uma amostra?",
        answer:
          "Sim, podemos fornecer uma prova digital e, em casos específicos, uma amostra física para garantir que o resultado atenda às suas expectativas.",
      },
    ],
  },
  {
    title: "6. Suporte para Cartões",
    questions: [
      {
        question: "Quais tipos de cartões vocês oferecem?",
        answer:
          "Trabalhamos com cartões de visita, cartões comemorativos e outras peças personalizadas. Você pode escolher entre diferentes gramaturas, formatos e opções de acabamento.",
      },
      {
        question: "Quais acabamentos estão disponíveis para cartões?",
        answer:
          "Oferecemos acabamentos como laminação, verniz localizado, além de opções em acabamento fosco ou brilhante.",
      },
      {
        question: "Qual a resolução recomendada para os arquivos dos cartões?",
        answer:
          "Para garantir a melhor qualidade, os arquivos devem ser enviados com resolução mínima de 300 dpi, em formatos PDF, JPG ou TIFF.",
      },
      {
        question: "Existe a opção de solicitar uma prova de cor?",
        answer:
          "Sim, disponibilizamos uma prova de cor digital para que você possa verificar e aprovar os tons e acabamentos antes da produção final.",
      },
    ],
  },
  {
    title: "7. Envio, Entrega e Rastreamento",
    questions: [
      {
        question: "Quais são as opções de envio disponíveis?",
        answer:
          "Trabalhamos com diversas transportadoras e oferecemos opções de entrega expressa ou econômica, de acordo com a sua localização e urgência.",
      },
      {
        question: "Como acompanhar o status do meu pedido?",
        answer:
          "Após a confirmação do pedido, você receberá um código de rastreamento por e-mail ou SMS, permitindo o acompanhamento do status da entrega.",
      },
      {
        question: "O que devo fazer se o produto chegar danificado?",
        answer:
          "Caso ocorra algum problema com o produto, entre em contato imediatamente com o nosso suporte. Analisaremos a situação e, se necessário, providenciaremos a reimpressão ou troca do item.",
      },
    ],
  },
  {
    title: "8. Pagamento e Orçamentos",
    questions: [
      {
        question: "Posso solicitar um orçamento personalizado?",
        answer:
          "Sim, basta fornecer as especificações do seu projeto pelo formulário de orçamento ou entrar em contato com nossa equipe de vendas para receber um atendimento personalizado.",
      },
      {
        question: "É possível parcelar o pagamento?",
        answer:
          "Sim, dependendo do valor do pedido, oferecemos opções de parcelamento no cartão de crédito. As condições serão apresentadas durante o processo de compra.",
      },
      {
        question: "Vocês oferecem descontos para grandes volumes?",
        answer:
          "Sim, para pedidos de grande quantidade, aplicamos descontos progressivos. Consulte nosso setor comercial para detalhes sobre condições e prazos.",
      },
    ],
  },
  {
    title: "9. Arquivos e Preparação para Impressão",
    questions: [
      {
        question: "Quais formatos de arquivo são aceitos?",
        answer:
          "Aceitamos arquivos em PDF, JPG e TIFF. Certifique-se de que os arquivos estejam em alta resolução (mínimo 300 dpi) para evitar problemas na impressão.",
      },
      {
        question: "Quais são as especificações de margem e sangria?",
        answer:
          "Recomendamos que os arquivos tenham uma margem de segurança de 3 mm e sangria de 5 mm. Nossa equipe disponibiliza um guia completo de especificações técnicas ao solicitar o orçamento.",
      },
      {
        question: "Vocês oferecem suporte para ajustes nos arquivos?",
        answer:
          "Sim, caso seu arquivo precise de pequenas correções, nossa equipe de pré-impressão pode realizar os ajustes necessários para garantir a qualidade final do produto.",
      },
    ],
  },
  {
    title: "10. Contato e Suporte Técnico",
    questions: [
      {
        question: "Como posso entrar em contato com o suporte?",
        answer:
          "Você pode nos contatar através de:  \n- Chat online disponível no site  \n- E-mail: [seuemail@dominio.com]  \n- Telefone: (XX) XXXX-XXXX  \nNosso horário de atendimento é de segunda a sexta-feira, das 9h às 18h.",
      },
      {
        question: "Onde posso encontrar tutoriais e dicas de design?",
        answer:
          "Em nosso blog e seção de tutoriais, você encontrará diversos materiais com dicas de design e melhores práticas para criação dos seus arquivos. Acesse [link do blog] para mais informações.",
      },
      {
        question: "Tenho uma dúvida que não foi listada aqui. O que devo fazer?",
        answer:
          "Se sua dúvida não estiver contemplada nesta FAQ, entre em contato conosco. Estamos sempre prontos para ajudar a esclarecer todas as suas questões.",
      },
    ],
  },
]

export default Suporte

