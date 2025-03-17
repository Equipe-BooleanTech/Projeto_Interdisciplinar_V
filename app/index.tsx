import { useState } from 'react';
import { Introduction } from '@/src/screens';
import images from '@/assets';

interface IntroData {
  [key: number]: {
    title: string;
    description: string;
    image: any;
    step: number;
  };
}
const introData: IntroData = {
  1: {
    title: 'Tenha controle sobre seu veículo',
    description:
      'Gerenciar as manutenções e obrigações de um veículo pode ser uma tarefa desafiadora. Pensando nisso, o `Lembraí` surge como uma solução completa para organização e controle de veículos.',
    image: images.unsplash_1,
    step: 1,
  },
  2: {
    title: 'Controle automatizado das manutenções do seu veículo',
    description:
      'Controle as manutenções realizadas em seu veículo por meio de um registro detalhado de todas as intervenções realizadas no veículo, facilitando o acompanhamento e evitando serviços desnecessários.',
    image: images.unsplash_2,
    step: 2,
  },
  3: {
    title: 'Gerencie os custos do seu veículo automaticamente',
    description:
      'No Lembraí, é possível gerenciar gastos com cada manutenção, quaisquer seja seu tipo, facilitando o acompanhamento e evitando custos com serviços desnecessários.',
    image: images.unsplash_3,
    step: 3,
  },
  4: {
    title: 'Lembretes Inteligentes',
    description:
      'Receba notificações personalizadas para vencimento de IPVA, licenciamento, seguro, revisões, troca de óleo e demais manutenções recomendadas pelos fabricantes.',
    image: images.unsplash_4,
    step: 4,
  },
};
export default function Index() {
  const [step, setStep] = useState(1);
  return (
    <Introduction
      step={step}
      title={introData[step].title}
      description={introData[step].description}
      image={introData[step].image}
      onPress={() => setStep(step + 1)}
    />
  );
}
