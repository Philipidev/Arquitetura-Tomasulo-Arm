import React, { useContext } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from '../App';


const TabelaEstacaoReserva: React.FC = () => {
    const {
        arrEstacaoReserva,
    } = useContext(IntrucaoContext);

    return (
        <Wrapper>
            <label>
                Estação de Reserva
            </label>
            <div className='wrapper-tabela'>

                <STabela>
                    <thead>
                        <tr>
                            <th>Ciclos</th>
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
                                        <td>{estacaoReserva.Ciclos ? estacaoReserva.Ciclos.toString() : ''}</td>
                                        <td>{estacaoReserva.nome}</td>
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
            </div>

        </Wrapper >
    );
}

export default TabelaEstacaoReserva;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    
    .wrapper-tabela{
        overflow-y: scroll;
    }
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
    -webkit-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    -moz-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
`;

