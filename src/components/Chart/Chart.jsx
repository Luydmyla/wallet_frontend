import { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Container, Text, StatisticsText } from './Chart.styled';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart() {
  const { t } = useTranslation();
  const [chartData] = useState({
    labels: [
      t('diagramTab.reduxData.basic'),
      t('diagramTab.reduxData.products'),
      t('diagramTab.reduxData.car'),
      t('diagramTab.reduxData.health'),
      t('diagramTab.reduxData.kids'),
      t('diagramTab.reduxData.home'),
      t('diagramTab.reduxData.education'),
      t('diagramTab.reduxData.leisure'),
      t('diagramTab.reduxData.other'),
    ],
    datasets: [
      {
        data: [
          8700.0, 3800.74, 1500.0, 800.0, 2208.5, 300.0, 3400.0, 1230.0, 610.0,
        ],
        backgroundColor: [
          '#FED057',
          '#FFD8D0',
          '#FD9498',
          '#C5BAFF',
          '#6E78E8',
          '#4A56E2',
          '#81E1FF',
          '#24CCA7',
          '#00AD84',
        ],
        hoverOffset: 5,
        borderWidth: 0,
        cutout: '70%',
        radius: '95%',
      },
    ],
  });

  const [chartOption] = useState({
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (toolTipItem) {
            return `${toolTipItem.label}: ₴ ${toolTipItem.formattedValue}`;
          },
        },
      },
    },
  });

  return (
    <Container>
      <StatisticsText>Statistics</StatisticsText>

      <Doughnut data={chartData} options={chartOption} />
      <Text>₴ 24 000.00</Text>
    </Container>
  );
}
