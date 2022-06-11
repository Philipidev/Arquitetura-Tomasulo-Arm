import React, { useState } from 'react';
import styled from 'styled-components';
import { useArray, UseArrayActions } from './hooks/useArray';
import { TipoInstrucao } from './Enums/TipoInstrucao';
import { TipoRegistrador } from './Enums/TipoRegistrador';
import LeftSideScreen from './LeftSide/LeftSideScreen';
import RigthSideScreen from './RigthSide/RigthSideScreen';

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
	nome: string;
	TipoRegistrador: keyof typeof TipoRegistrador;
	destino?: string;
	registradorSendoUtilizado?: string;
	ocupada: boolean;
	operacao?: string;//Ver se é melhor criar uma tipagem para isso
	Vj?: string;
	Vk?: string;
	Qj?: string;
	Qk?: string;
	A?: string;
	Ciclos?: number;
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
	setQuantidadeInstrucoes: React.Dispatch<React.SetStateAction<number>>;
	quantidadeInstrucoes: number;
	setConfirmado: React.Dispatch<React.SetStateAction<boolean>>;
	confirmado: boolean;
	setCicloAtual: React.Dispatch<React.SetStateAction<number>>;
	cicloAtual: number;
}

export const IntrucaoContext = React.createContext<IIntrucaoContextProps>({} as IIntrucaoContextProps);

function App() {
	const [cicloAtual, setCicloAtual] = React.useState(0);
	const [quantidadeInstrucoes, setQuantidadeInstrucoes] = useState<number>(1);
	const [confirmado, setConfirmado] = useState<boolean>(false);
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
		quantidadeInstrucoes, setQuantidadeInstrucoes,
		confirmado, setConfirmado,
		cicloAtual, setCicloAtual,
	}

	return (
		<WrapperSiderContent>
			<IntrucaoContext.Provider value={defaultValue}>
				<div className='container-direita'>
					<LeftSideScreen />
				</div>
				<div className='container-esquerda'>
					<RigthSideScreen />
				</div>
			</IntrucaoContext.Provider>
		</WrapperSiderContent>
	);
}

export default App;


const WrapperSiderContent = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;
    height: 99vh;

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