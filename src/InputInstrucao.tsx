import { Input, Select } from 'antd';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { IntrucaoContext } from './App';
import { TipoInstrucao } from './Enums/TipoInstrucao';

interface IProps {
    index: number;
}

const InputInstrucao: React.FC<IProps> = ({
    index
}) => {
    const {
        arrInstrucoes,
    } = useContext(IntrucaoContext);

    const AssociarInstrucao = (valor: string, indexInstrucao: number) => {
        const newArray = arrInstrucoes.value.map((i, ind) => {
            if (ind === index) {
                if (indexInstrucao === 1)
                    i.entrada1 = valor;
                else if (indexInstrucao === 2)
                    i.entrada2 = valor;
                else if (indexInstrucao === 3)
                    i.entrada3 = valor;
                else if (indexInstrucao === 4)
                    i.nome = valor as any;
            }
            return i;
        })
        arrInstrucoes.setValue([...newArray]);
    }

    const onMount = () => {
        if (index >= arrInstrucoes.length)
            arrInstrucoes.push({
                nome: 'Add',
                enviada: false,
                executada: false,
                escrita: false,
                entrada1: '',
                entrada2: '',
                entrada3: '',
            });
        else {
            throw new Error('Index inválido, tem algo errado aí! (InputInstrucao.OnMount)');
        }
        return () => {
            arrInstrucoes.removeIndex(index);
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onMount, []);

    return (
        <Wrapper>
            <label style={{ marginRight: '12px' }}>
                Instrução {index + 1}
            </label>
            <Select
                style={{ width: '75px' }}
                defaultValue={arrInstrucoes.value[index]?.nome ?? 'Add'}
                onChange={(valor: any) => { AssociarInstrucao(valor, 4) }}
            >
                {
                    Object.keys(TipoInstrucao).map((i: any, ind: number) =>
                        <Select.Option key={"option-tipo-instrucao-" + ind} value={i}>
                            <div >
                                <label>
                                    {i}
                                </label>
                            </div>

                        </Select.Option>
                    )
                }
            </Select>
            <Input
                placeholder='Instrução'
                onChange={(e) => { AssociarInstrucao(e.target.value, 1) }}
            />
            <Input placeholder='Instrução'
                onChange={(e) => { AssociarInstrucao(e.target.value, 2) }}
            />
            <Input placeholder='Instrução'
                onChange={(e) => { AssociarInstrucao(e.target.value, 3) }}
            />
        </Wrapper>
    );
}

export default InputInstrucao;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
    -webkit-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    -moz-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    input{
        width: 100px;
    }
`;
