import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useArray, UseArrayActions } from './hooks/useArray';
import ListaInstrucoes from './ListaInstrucoes';
import TabelasInstrucoes from './TabelasInstrucoes';
import { TipoInstrucao } from './Enums/TipoInstrucao';
import { TipoRegistrador } from './Enums/TipoRegistrador';
import 'antd/dist/antd.min.css';

export interface IInstrucoes {
	nome: keyof typeof TipoInstrucao;
	enviada: boolean;
	executada: boolean;
	escrita: boolean;
	entrada1: string;
	entrada2: string;
	entrada3?: string;
}

export interface IEstacaoReserva {
	// nome: string;
	TipoRegistrador: keyof typeof TipoRegistrador;
	ocupada: boolean;
	operacao?: string;//Ver se é melhor criar uma tipagem para isso
	Vj?: string;
	Vk?: string;
	Qj?: string;
	Qk?: string;
	A?: string;
}

export interface IRegistrador {
	nome: string;
	valor: string;
}

export interface ICicloPorInstrucao {
	TipoInstrucao: keyof typeof TipoInstrucao;
	quantidade: number;
}

export interface ITipoRegistrador {
	TipoRegistrador: keyof typeof TipoRegistrador;
	quantidade: number;
}

export interface IIntrucaoContextProps {
	arrInstrucoes: UseArrayActions<IInstrucoes>;
	arrEstacaoReserva: UseArrayActions<IEstacaoReserva>;
	arrRegistrador: UseArrayActions<IRegistrador>;
	arrCicloPorInstrucao: UseArrayActions<ICicloPorInstrucao>;
	arrTipoRegistrador: UseArrayActions<ITipoRegistrador>;
}

export const IntrucaoContext = React.createContext<IIntrucaoContextProps>({} as IIntrucaoContextProps);

function App() {
	const arrInstrucoes = useArray<IInstrucoes>([]);
	const arrEstacaoReserva = useArray<IEstacaoReserva>([]);
	const arrRegistrador = useArray<IRegistrador>([]);
	const arrCicloPorInstrucao = useArray<ICicloPorInstrucao>(Object.keys(TipoInstrucao).map((i: any, ind: number) => {
		return (
			{
				quantidade: 1,
				TipoInstrucao: i
			}
		)
	}));
	const arrTipoRegistrador = useArray<ITipoRegistrador>(Object.keys(TipoRegistrador).map((i: any, ind: number) => {
		return (
			{
				quantidade: 1,
				TipoRegistrador: i
			}
		)
	}));

	const defaultValue: IIntrucaoContextProps = {
		arrInstrucoes,
		arrEstacaoReserva,
		arrRegistrador,
		arrCicloPorInstrucao,
		arrTipoRegistrador,
	}

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
    height: 100%;

	.container-direita{
		width: 30%;
		height: 100%;
		border-right: 1px solid grey;
	}
	.container-esquerda{
		width: 70%;
		height: 100%;
	}
`;