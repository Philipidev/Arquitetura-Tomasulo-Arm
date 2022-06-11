import { Input } from 'antd';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from './App';
import { TipoInstrucao } from './Enums/TipoInstrucao';

interface IProps {
}

const CiclosPorInstrucao: React.FC<IProps> = () => {
    const {
        arrCicloPorInstrucao
    } = useContext(IntrucaoContext);

    return (
        <Wrapper>
            <label>
                Ciclos por instrução:
            </label>
            {
                Object.keys(TipoInstrucao).map((i: any, ind: number) =>
                    <div className='ciclo-por-instrucao' key={'ciclo-por-instrucao-' + ind}>
                        <label>
                            {i}
                        </label>
                        <Input
                            value={arrCicloPorInstrucao.findByStringId(i, 'TipoInstrucao').quantidade}
                            type="number"
                            onChange={(e) => {
                                if (Number(e.target.value) <= 0) return;
                                arrCicloPorInstrucao.setValue(
                                    [
                                        ...arrCicloPorInstrucao.value.map(cpi => {
                                            if (cpi.TipoInstrucao === i) {
                                                cpi.quantidade = Number(e.target.value);
                                            }
                                            return cpi;
                                        })
                                    ])
                            }}
                        />

                    </div>
                )
            }
        </Wrapper>
    );
}

export default CiclosPorInstrucao;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
    margin-bottom: 15px;
    align-items: end;

    -webkit-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    -moz-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    .ciclo-por-instrucao{
        display: flex;
        flex-direction: row;
        /* align-items: center; */
        margin-bottom: 3px;
        
        label{
            margin-right: 10px;
        }
    }

    input{
        width: 100px;
    }
`;
