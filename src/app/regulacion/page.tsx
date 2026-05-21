import { RegulacionDashboard } from '@/components/organisms/RegulacionDashboard';

export const metadata = {
  title: 'Transparencia y Regulación | Cabletelco',
  description: 'Acceda a toda la normatividad legal, contratos de condiciones uniformes (CCU), políticas de calidad, compensación automática y resoluciones de la CRC para Cabletelco / Osmas TV S.A.S.',
  keywords: [
    'contrato condiciones uniformes', 
    'regulacion crc colombia', 
    'resolucion 5111 de 2017', 
    'compensacion automatica', 
    'ley 679 de 2001', 
    'equipos en desuso', 
    'Cabletelco', 
    'Osmas TV'
  ]
};

export default function RegulacionPage() {
  return <RegulacionDashboard />;
}
