import React, { useContext } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from './App';


const TabelasInstrucoes: React.FC = () => {
    const {
        arrEstacaoReserva,
        arrInstrucoes,
        arrRegistrador,
    } = useContext(IntrucaoContext);

    return (
        <Wrapper>
            <div className='instrucao-estacao-reserva'>
                <WrapperTabelas>
                    <label>
                        Instruções
                    </label>
                    <STabela>
                        <thead>
                            <tr>
                                <th>Instrução</th>
                                <th>Enviada</th>
                                <th>Executada</th>
                                <th>Escrita</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (arrInstrucoes && arrInstrucoes.value && arrInstrucoes.value.length)
                                    ? arrInstrucoes.value.map(instrucao =>
                                        <tr>
                                            <td>{
                                                instrucao.nome +
                                                (instrucao.entrada1 && ", " + instrucao.entrada1.toUpperCase()) +
                                                (instrucao.entrada2 && ", " + instrucao.entrada2.toUpperCase()) +
                                                (instrucao.entrada3 && ", " + instrucao.entrada3?.toUpperCase())
                                            }</td>
                                            <td>{instrucao.enviada ? 'X' : ''}</td>
                                            <td>{instrucao.escrita ? 'X' : ''}</td>
                                            <td>{instrucao.executada ? 'X' : ''}</td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                    </tr>
                            }
                        </tbody>
                    </STabela>
                </WrapperTabelas>
                <WrapperTabelas>
                    <label>
                        Estação de Reserva
                    </label>
                    <STabela>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Ocupada</th>
                                <th>Operação</th>
                                <th>Vj</th>
                                <th>Vk</th>
                                <th>Qj</th>
                                <th>Qk</th>
                                <th>A</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (arrEstacaoReserva && arrEstacaoReserva.value && arrEstacaoReserva.value.length)
                                    ? arrEstacaoReserva.value.map((estacaoReserva, ind) =>
                                        <tr key={"tr-estacao-reserva" + ind}>
                                            <td>{estacaoReserva.TipoRegistrador}</td>
                                            <td>{estacaoReserva.ocupada ? 'X' : ''}</td>
                                            <td>{estacaoReserva.operacao}</td>
                                            <td>{estacaoReserva.Vj}</td>
                                            <td>{estacaoReserva.Vk}</td>
                                            <td>{estacaoReserva.Qj}</td>
                                            <td>{estacaoReserva.Qk}</td>
                                            <td>{estacaoReserva.A}</td>
                                        </tr>
                                    )
                                    :
                                    <tr>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                        <td>--</td>
                                    </tr>
                            }
                        </tbody>
                    </STabela>
                </WrapperTabelas>
            </div>
            <WrapperTabelas>
                <label>
                    Registradores
                </label>
                <STabela>
                    {
                        (arrRegistrador && arrRegistrador.value && arrRegistrador.value.length)
                            ? arrRegistrador.value.map(registrador =>
                                <>
                                    <thead>
                                        <tr>
                                            <th>{registrador.nome}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{registrador.valor}</td>
                                        </tr>
                                    </tbody>
                                </>
                            )
                            :
                            <>
                                <thead>
                                    <tr>
                                        <th>--</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>--</td>
                                    </tr>
                                </tbody>
                            </>
                    }
                </STabela>
            </WrapperTabelas>
        </Wrapper >
    );
}

export default TabelasInstrucoes;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    height: 100%;

    .instrucao-estacao-reserva{
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
    }
`;

const WrapperTabelas = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 100px;
`;

const STabela = styled.table`
	border: 1px solid black;
	th{
		border: 1px solid gray;
		padding: 10px;
	}
	td { 
		border: 1px solid gray;
		padding: 10px;
	}
`;

