import React, { useEffect, useState } from "react";
import { FlatList } from 'react-native';
import { VictoryPie, VictoryTooltip } from 'victory-native';

import { EXPENSES } from '../utils/expenses';

import { Card, CardProps } from '../components/Card';
import { Header, MonthsProps } from '../components/Header';


import { ChartContainer, Container } from './styles';

export function Home() {
  const [selected, setSelected] = useState('');
  const [month, setMonth] = useState<MonthsProps>("Janeiro");
  const [chartDatas, setChartDatas] = useState<CardProps[]>([]);


  function handleCardOnPress(id: string) {
    setSelected(prev => prev === id ? '' : id);
  }

  useEffect(() => {
    setChartDatas(EXPENSES[month]);
  }, [month]);

  return (
    <Container>
      <Header
        onValueChange={setMonth}
        selectedValue={month}
      />

      <ChartContainer>
        <VictoryPie
          data={chartDatas}// array com informações de cada item do gráfico
          x="label"//qual valor do chartDatas ficara no x(label) do gráfico
          y="value"//qual valor do chartDatas ficara no y(value) do gráfico
          colorScale={chartDatas.map(data => data.color)}// setando a cor de cada fatia
          innerRadius={60}//raio interno
          padAngle={3}// espaçamento entre as fatias
          height={300}
          animate={{// propriedade para colocar animação no gráfico
            // duration: 2000
            easing: 'bounce'  // animação linear
          }}
          style={{// estilizar elementos do gráfico (datum: informações de cada item do gráfico)
            labels: {
              fill: '#FFF'
            },
            data: {
              fillOpacity: ({ datum }) => (datum.id === selected || selected === '') ? 1 : 0.5,
              stroke: ({ datum }) => (datum.id === selected) ? datum.color : 'none',
              strokeWidth: 10,
              strokeOpacity: 0.5
              // stroke: ({ datum }) => datum.color,
              // strokeWidth: 10,
              // strokeOpacity: 0.5
            }
          }}
          labelComponent={// propriedade para poder editar conteúdo do label
            <VictoryTooltip //componente de ToolTip 
              renderInPortal={false}// escondendo ToolTip por padrão
              flyoutStyle={{//reestilizando ToolTip
                stroke: 0,
                fill: ({ datum }) => datum.color
              }}
            />
          }
        />
      </ChartContainer>

      <FlatList
        data={EXPENSES[month]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card
            data={item}
            selected={false}
            onPress={() => handleCardOnPress(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
