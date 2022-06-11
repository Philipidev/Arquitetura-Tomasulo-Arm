import React, { useContext } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from '../App';
import TabelaEstacaoReserva from './TabelaEstacaoReserva';
import TabelaRegistradores from './TabelaRegistradores';
import TabelasInstrucoes from './TabelasInstrucoes';


const RigthSideScreen: React.FC = () => {
    const {

    } = useContext(IntrucaoContext);

    return (
        <Wrapper>
            <div className='registradores'>
                <TabelaRegistradores />
            </div>
            <div className='instrucao-estacao-reserva'>
                <TabelasInstrucoes />
                <TabelaEstacaoReserva />
            </div>
        </Wrapper >
    );
}

export default RigthSideScreen;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    height: 100%;
    position: relative;

    .registradores{
        top: 0;
        position: absolute;
        display: flex;
        align-items: end;
        margin-top: 20px;
    }

    .instrucao-estacao-reserva{
        max-height: 600px;
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
    }
`;
