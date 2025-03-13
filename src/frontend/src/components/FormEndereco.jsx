import { useState, useEffect } from "react";
import axios from 'axios';
import { 
    Container, 
    Header, 
    StyledButton,
    FormStyled,
    Row,
    FormGroup,
    Input,
    Label,
    SaveAddressRow,
    CheckboxContainer,
    Checkbox,
    CheckboxLabel
} from "./styles/FormEnderecoStyles";
import ModalEnderecos from "./ModalEnderecos";

const FormEndereco = ({cep}) => {
    const [formData, setFormData] = useState({
        cep: cep,
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: ''
    });
    const [saveAddress, setSaveAddress] = useState(false);
    const [enderecoBloqueado, setEnderecoBloqueado] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [endereco, setEndereco] = useState(null);

    useEffect(() => {
        if (cep) {
            buscarEndereco(cep);
        }
    }, [cep]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        let formattedValue = value;

        if (id === 'cep') {
            formattedValue = formatCEP(value);
            buscarEndereco(formattedValue);
        }
        if (id === 'estado') {
            formattedValue = value.toUpperCase();
        }
        if (id === 'numero') {
            formattedValue = formatNumber(value);
        }

        setFormData(prev => ({ ...prev, [id]: formattedValue }));

    };

    const buscarEndereco = async (cep) => {
        if (cep.length !== 9) {
            limparEndereco();
            return;
        }

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
            if (response.data.erro) {
                limparEndereco();
                alert('CEP não encontrado.');
                return;
            }

            setFormData(prev => ({
                ...prev,
                endereco: response.data.logradouro,
                bairro: response.data.bairro,
                cidade: response.data.localidade,
                estado: response.data.uf
            }));
            setEnderecoBloqueado(true);
        } catch (error) {
            limparEndereco();
            alert('Erro ao buscar o CEP.');
        }
    };

    const limparEndereco = () => {
        setFormData(prev => ({
            ...prev,
            endereco: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: ''
        }));
        setEnderecoBloqueado(false);
    };

    const formatCEP = (cep) => {
        return cep.replace(/\D/g, '')
                  .replace(/(\d{5})(\d)/, '$1-$2')
                  .slice(0, 9);
    };

    const formatNumber = (number) => {
        return number.replace(/\D/g, '');
    }

    return (
        <Container>
            <Header>
                <h2>Informações de envio</h2>
                <StyledButton onClick={() => setIsModalOpen(true)}>Meus endereços</StyledButton>
            </Header>
            
            <FormStyled as="form">
                <Row>
                    <FormGroup>
                        <Label htmlFor="cep">CEP</Label>
                        <Input 
                            type="text" 
                            id="cep" 
                            placeholder="00000-000" 
                            value={formData.cep}
                            onChange={handleChange}
                            maxLength="9"
                        />
                    </FormGroup>
                </Row>
                
                <Row>
                    <FormGroup $flex="2">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input 
                            type="text" 
                            id="endereco" 
                            placeholder="Rua, Avenida, etc." 
                            value={formData.endereco}
                            onChange={handleChange}
                            readOnly={enderecoBloqueado}
                        />
                    </FormGroup>
                    
                    <FormGroup $flex="1">
                        <Label htmlFor="numero">Número</Label>
                        <Input 
                            type="text" 
                            id="numero" 
                            placeholder="Nº" 
                            value={formData.numero}
                            onChange={handleChange}
                        />
                    </FormGroup>
                </Row>
                
                <Row>
                    <FormGroup $flex="1">
                        <Label htmlFor="complemento">Complemento</Label>
                        <Input 
                            type="text" 
                            id="complemento" 
                            placeholder="Apto, bloco, etc. (opcional)" 
                            value={formData.complemento}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    
                    <FormGroup $flex="1">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input 
                            type="text" 
                            id="bairro" 
                            placeholder="Bairro" 
                            value={formData.bairro}
                            onChange={handleChange}
                            readOnly={enderecoBloqueado}
                        />
                    </FormGroup>
                </Row>
                
                <Row>
                    <FormGroup $flex="2">
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input 
                            type="text" 
                            id="cidade" 
                            placeholder="Cidade" 
                            value={formData.cidade}
                            onChange={handleChange}
                            readOnly={enderecoBloqueado}
                        />
                    </FormGroup>
                    
                    <FormGroup $flex="1">
                        <Label htmlFor="estado">Estado</Label>
                        <Input 
                            type="text" 
                            id="estado" 
                            placeholder="UF" 
                            maxLength="2"
                            value={formData.estado}
                            onChange={handleChange}
                            readOnly={enderecoBloqueado}
                        />
                    </FormGroup>
                </Row>
                
                <SaveAddressRow>
                    <CheckboxContainer>
                        <Checkbox 
                            type="checkbox" 
                            id="saveAddress" 
                            checked={saveAddress}
                            onChange={() => setSaveAddress(!saveAddress)} 
                        />
                        <CheckboxLabel htmlFor="saveAddress">
                            Salvar esse endereço para compras futuras
                        </CheckboxLabel>
                    </CheckboxContainer>
                </SaveAddressRow>
            </FormStyled>
            {isModalOpen && <ModalEnderecos onClose={() => setIsModalOpen(false)} />}
            {endereco && (
                <div>
                    <h2>Endereço Encontrado:</h2>
                    <p>CEP: {endereco.cep}</p>
                    <p>Logradouro: {endereco.logradouro}</p>
                    <p>Complemento: {endereco.complemento}</p>
                    <p>Bairro: {endereco.bairro}</p>
                    <p>Cidade: {endereco.localidade}</p>
                    <p>Estado: {endereco.uf}</p>
                </div>
            )}
        </Container>
    );
};

export default FormEndereco;