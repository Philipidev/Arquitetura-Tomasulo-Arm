import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useArray, UseArrayActions } from './hooks/useArray';
import ListaInstrucoes from './ListaInstrucoes';
import TabelasInstrucoes from './TabelasInstrucoes';
import Tabelas from './TabelasInstrucoes';


interface IInstrucoes {
	nome: string;
	enviada: boolean;
	executada: boolean;
	escrita: boolean;
	entrada1: string;
	entrada2: string;
	entrada3?: string;
}

interface IEstacaoReserva {
	nome: string;
	ocupada: boolean;
	operacao: string;//Ver se é melhor criar uma tipagem para isso
	Vj: number;
	Vk: number;
	Qj: number;
	Qk: number;
	A: string;
}

interface IRegistrador {
	nome: string;
	valor: string;
}

export interface IIntrucaoContextProps {
	arrInstrucoes: UseArrayActions<IInstrucoes>;
	arrEstacaoReserva: UseArrayActions<IEstacaoReserva>;
	arrRegistrador: UseArrayActions<IRegistrador>;
}

export const IntrucaoContext = React.createContext<IIntrucaoContextProps>({} as IIntrucaoContextProps);

function App() {
	const arrInstrucoes = useArray<IInstrucoes>([]);
	const arrEstacaoReserva = useArray<IEstacaoReserva>([]);
	const arrRegistrador = useArray<IRegistrador>([]);

	const defaultValue: IIntrucaoContextProps = {
		arrInstrucoes,
		arrEstacaoReserva,
		arrRegistrador
	}

	const onMount = () => {
		if (arrInstrucoes.length) return;
		const arrInstrucoesAux: IInstrucoes[] = [
			{
				nome: 'Add',
				enviada: true,
				escrita: true,
				executada: true,
				entrada1: 'F0',
				entrada2: '10',
				entrada3: 'F1'
			},
			{
				nome: 'Mult',
				enviada: true,
				escrita: true,
				executada: false,
				entrada1: 'F2',
				entrada2: 'F0',
				entrada3: '10'
			},
			{
				nome: 'Sub',
				enviada: true,
				escrita: false,
				executada: false,
				entrada1: 'F1',
				entrada2: 'F2',
				entrada3: 'F0'
			},
			{
				nome: 'Ld',
				enviada: false,
				escrita: false,
				executada: false,
				entrada1: 'F0',
				entrada2: '20',
			},
		]

		arrInstrucoes.setValue(arrInstrucoesAux);
	}
	useEffect(onMount, []);

	return (
		<WrapperSiderContent>
			<IntrucaoContext.Provider value={defaultValue}>
				<div className='container-direita'>
					<ListaInstrucoes />
				</div>
				<div className='container-esquerda'>
					<TabelasInstrucoes />
				</div>
			</IntrucaoContext.Provider>
		</WrapperSiderContent>
	);
}

export default App;


const WrapperSiderContent = styled.div`
	display: flex;
	flex-direction: row;
	/* height: 100%;
	flex: 1; */

	.container-direita{
		width: 30%;
		height: 100%;
		background: #00fff278;
	}
	.container-esquerda{
		width: 70%;
		height: 100%;
		background: #01a54088;
	}
`;