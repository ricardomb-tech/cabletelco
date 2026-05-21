'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Logo } from '@/components/atoms/Logo';
import { cn } from '@/lib/utils';
import { MinTicLogo, CrcLogo, SicLogo } from '@/components/atoms/RegulatoryLogos';

// Definición de la estructura de un documento regulatorio
interface RegulatoryDocument {
  id: string;
  title: string;
  shortTitle: string;
  code: string;
  subtitle: string;
  date: string;
  authority: string;
  sections: {
    title: string;
    paragraphs: string[];
  }[];
  category: 'Comercial' | 'Técnico' | 'Legal' | 'Seguridad' | 'Ética';
  officialLinks?: { label: string; url: string }[];
}

export function RegulacionDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDocId, setActiveDocId] = useState('contrato-servicios');
  const [zoomScale, setZoomScale] = useState(100); // en porcentaje: 90, 100, 110, 120, 130
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'viewer'>('list'); // Para vistas móviles
  
  const documentRef = useRef<HTMLDivElement>(null);

  // Documentos regulatorios detallados
  const documents: RegulatoryDocument[] = [
    {
      id: 'terminos-promociones',
      title: 'Términos y Condiciones Generales para Promociones y Ofertas Temporales',
      shortTitle: 'Términos y condiciones de las promociones',
      code: 'T&C-PRM-2026-V1',
      subtitle: 'Condiciones de adquisición, vigencia y facturación de tarifas promocionales',
      date: '21 de Mayo de 2026',
      authority: 'Osmas TV S.A.S. / Comisión de Regulación de Comunicaciones (CRC)',
      category: 'Comercial',
      sections: [
        {
          title: 'Artículo 1: Objeto y Alcance',
          paragraphs: [
            'La presente política regula los términos, condiciones y límites aplicables a todas las promociones, incentivos, descuentos temporales y empaquetamientos ofrecidos por Osmas TV S.A.S. (bajo la marca Cabletelco) en el territorio nacional colombiano.',
            'Cualquier promoción especial estará sujeta a los términos descritos aquí y a las condiciones particulares que se publiquen para cada campaña específica en nuestros canales oficiales.'
          ]
        },
        {
          title: 'Artículo 2: Transparencia y Vigencia de las Ofertas',
          paragraphs: [
            'En cumplimiento estricto del Régimen de Protección al Usuario (Resolución CRC 5111 de 2017), toda oferta promocional indicará claramente su fecha de inicio y de finalización, o en su defecto, el número máximo de cupos o usuarios disponibles.',
            'Finalizado el periodo de vigencia de la promoción, la tarifa del servicio se reajustará de manera automática al valor del cargo fijo mensual pleno del plan contratado, el cual es previamente informado y aceptado por el usuario en el respectivo contrato.'
          ]
        },
        {
          title: 'Artículo 3: Cláusulas de Permanencia Mínima',
          paragraphs: [
            'Cabletelco no impondrá cláusulas de permanencia mínima para sus planes de internet hogar y televisión en fibra óptica, a menos de que exista una financiación expresa de equipos terminales de red (CPE) o subsidios totales del costo de instalación física del servicio.',
            'De pactarse una permanencia mínima, esta no podrá ser superior a doce (12) meses y el valor de la sanción por terminación anticipada decrecerá mes a mes de forma proporcional, conforme a las fórmulas establecidas por la CRC.'
          ]
        },
        {
          title: 'Artículo 4: Modificación de Condiciones',
          paragraphs: [
            'Cabletelco no modificará de forma unilateral las tarifas pactadas durante la vigencia de una promoción en curso.',
            'Cualquier reajuste general en el valor de las tarifas plenas del mercado será comunicado al suscriptor por escrito (a través de la factura física, digital o mensaje de texto) con un mínimo de quince (15) días calendario de anticipación.'
          ]
        }
      ]
    },
    {
      id: 'equipos-desuso',
      title: 'Política de Retorno de Equipos Terminales y Gestión Ambiental RAEE',
      shortTitle: 'Política de equipos en desuso',
      code: 'POL-CPE-ENV-02',
      subtitle: 'Procedimiento de devolución de módems, decodificadores y gestión ambiental posconsumo',
      date: '21 de Mayo de 2026',
      authority: 'Ministerio de Ambiente y Desarrollo Sostenible / CRC',
      category: 'Técnico',
      sections: [
        {
          title: 'Artículo 1: Propiedad de los Equipos en Comodato',
          paragraphs: [
            'Los equipos terminales de red necesarios para la prestación del servicio de internet de fibra óptica (ONU / Módem) y televisión digital (Decodificadores / Set-Top Box) son propiedad exclusiva de Osmas TV S.A.S.',
            'Dichos equipos se entregan al suscriptor bajo la figura jurídica de comodato precario (préstamo gratuito de uso) o alquiler, con la obligación correlativa de conservarlos en buen estado y devolverlos al finalizar el contrato.'
          ]
        },
        {
          title: 'Artículo 2: Plazos y Canales para la Devolución',
          paragraphs: [
            'Una vez cancelado, terminado o retirado el servicio de telecomunicaciones por cualquier causa, el usuario tiene la obligación legal de devolver la totalidad de los equipos e interfaces de red provistos dentro de los cinco (5) días hábiles siguientes.',
            'Los canales autorizados para la devolución son: (a) Entrega presencial en nuestras oficinas de Experiencia al Cliente, o (b) Solicitud de recolección programada a domicilio, la cual se puede agendar mediante nuestra línea de soporte 24/7 sin costo para el usuario.'
          ]
        },
        {
          title: 'Artículo 3: Cargos por Pérdida o Deterioro',
          paragraphs: [
            'El suscriptor responderá por el valor de reposición de los equipos en caso de pérdida, hurto, destrucción total o daños atribuibles a negligencia, sobrecargas eléctricas internas del predio o manipulación técnica no autorizada.',
            'Los valores vigentes de reposición por equipo se encuentran detallados en el anexo de tarifas del Contrato de Condiciones Uniformes.'
          ]
        },
        {
          title: 'Artículo 4: Compromiso Ambiental Posconsumo (RAEE)',
          paragraphs: [
            'Cabletelco está plenamente comprometido con el cuidado del medio ambiente. Los equipos recolectados que cumplen su vida útil tecnológica o presentan fallas irreparables son ingresados a nuestro flujo de Residuos de Aparatos Eléctricos y Electrónicos (RAEE).',
            'Trabajamos en alianza con gestores ambientales certificados para garantizar que el plástico, silicio, cobre y metales pesados sean reciclados o dispuestos de manera segura, evitando la contaminación de fuentes hídricas y suelos colombianos.'
          ]
        }
      ]
    },
    {
      id: 'compensacion-automatica',
      title: 'Manual y Procedimiento de Compensación Automática de Facturación',
      shortTitle: 'Compensación automática',
      code: 'MAN-COM-AUT-03',
      subtitle: 'Régimen de compensación por fallas o interrupciones en la disponibilidad del servicio',
      date: '21 de Mayo de 2026',
      authority: 'Comisión de Regulación de Comunicaciones (CRC)',
      category: 'Legal',
      sections: [
        {
          title: 'Artículo 1: Derecho de Compensación al Usuario',
          paragraphs: [
            'El usuario tiene el derecho inalienable de recibir compensación por parte de Cabletelco cuando el servicio contratado presente fallas técnicas, cortes o indisponibilidades que no sean atribuibles a fuerza mayor, caso fortuito o culpa exclusiva del propio usuario.'
          ]
        },
        {
          title: 'Artículo 2: Umbral de Indisponibilidad',
          paragraphs: [
            'En consonancia con la regulación expedida por la CRC, la compensación automática se activará obligatoriamente si el servicio de internet o de televisión por cable acumula interrupciones iguales o superiores a dos punto cinco (2.5) horas en el periodo de facturación mensual.',
            'Para el cálculo, nuestros sistemas centrales de red registran la desconexión del equipo terminal (ONU) del abonado y computan los lapsos de interrupción de manera exacta.'
          ]
        },
        {
          title: 'Artículo 3: Fórmula y Aplicación en Facturación',
          paragraphs: [
            'La compensación se calcula multiplicando el cargo fijo mensual por la fracción de tiempo que el servicio estuvo caído respecto al total de horas del mes.',
            'La aplicación de este descuento es AUTOMÁTICA. Cabletelco tiene prohibido exigir al usuario la radicación de peticiones o reclamos de compensación para realizar la deducción. El descuento se reflejará explícitamente en el siguiente ciclo de facturación bajo el concepto: "Compensación por Falla del Servicio - CRC 5111".'
          ]
        },
        {
          title: 'Artículo 4: Excepciones a la Compensación',
          paragraphs: [
            'No habrá lugar a compensación en los siguientes casos: (a) Daños en la red interna del usuario, (b) Suspensión del servicio por mora en el pago de la factura, (c) Cortes programados de mantenimiento preventivo informados previamente por el operador con mínimo tres (3) días hábiles de antelación, y (d) Eventos de vandalismo o robo de fibra óptica exterior debidamente certificados ante autoridad policiva.'
          ]
        }
      ]
    },
    {
      id: 'seguridad-red',
      title: 'Manual de Recomendaciones y Buenas Prácticas sobre Seguridad de la Red',
      shortTitle: 'Recomendaciones sobre seguridad de la red',
      code: 'GUI-SEG-NET-04',
      subtitle: 'Instrucciones para la protección de Wi-Fi, control de accesos y prevención de incidentes digitales',
      date: '21 de Mayo de 2026',
      authority: 'Oficina de Ciberseguridad Cabletelco / ColCERT',
      category: 'Seguridad',
      sections: [
        {
          title: 'Artículo 1: Seguridad Física y Lógica del Router',
          paragraphs: [
            'El módem u ONU suministrado por Cabletelco cuenta con configuraciones de seguridad estándar. Se recomienda enfáticamente cambiar la clave de acceso de administrador y el nombre de red (SSID) después de la instalación inicial.',
            'Use contraseñas robustas con una longitud mínima de 12 caracteres, que combinen letras mayúsculas, minúsculas, números y caracteres especiales (como @, #, $, etc.). Evite fechas de nacimiento o secuencias sencillas.'
          ]
        },
        {
          title: 'Artículo 2: Protección de la Red Inalámbrica Wi-Fi',
          paragraphs: [
            'Utilice protocolos de encriptación modernos como WPA2-AES o WPA3. Desactive la función WPS (Wi-Fi Protected Setup) en la configuración de su router si no la está utilizando de manera activa, dado que representa una vulnerabilidad común para intrusos.',
            'Para visitas o dispositivos domésticos inteligentes (IoT), se sugiere habilitar una "Red de Invitados" aislada de su red doméstica principal para proteger sus datos personales y computadoras principales.'
          ]
        },
        {
          title: 'Artículo 3: Prevención de Malware y Phishing',
          paragraphs: [
            'Cabletelco realiza filtros en la red troncal para mitigar ataques masivos de spam o denegación de servicio, pero es responsabilidad del usuario final contar con firewalls y software antivirus actualizado en sus dispositivos personales.',
            'No ingrese datos bancarios o contraseñas en enlaces sospechosos recibidos a través de correos no solicitados o mensajes de SMS. Recuerde que ninguna entidad financiera u operador le solicitará claves personales por estos medios.'
          ]
        },
        {
          title: 'Artículo 4: Protección a Menores de Edad',
          paragraphs: [
            'Como proveedor de internet, recomendamos configurar soluciones de DNS con filtro familiar (como OpenDNS FamilyShield o Cloudflare Families 1.1.1.3) para bloquear contenidos de violencia explícita o no aptos para menores de edad en todo el hogar.'
          ]
        }
      ]
    },
    {
      id: 'contrato-servicios',
      title: 'Contrato de Condiciones Uniformes para Servicios de Telecomunicaciones',
      shortTitle: 'Contrato de prestación de servicios',
      code: 'CCU-CABLETELCO-2026',
      subtitle: 'Condiciones jurídicas que rigen la suscripción y suministro de servicios de internet y televisión',
      date: '21 de Mayo de 2026',
      authority: 'Comisión de Regulación de Comunicaciones (CRC) / SIC',
      category: 'Legal',
      sections: [
        {
          title: 'Artículo 1: Naturaleza del Contrato',
          paragraphs: [
            'El Contrato de Condiciones Uniformes (CCU) es el documento jurídico mediante el cual Osmas TV S.A.S. (Cabletelco) define de manera general e imparcial los derechos, deberes, obligaciones y tarifas para prestar los servicios de internet de fibra óptica y televisión por suscripción.',
            'Sus cláusulas son obligatorias para ambas partes desde el momento en que el usuario solicita verbalmente o por escrito la instalación del servicio y este es activado por el personal técnico.'
          ]
        },
        {
          title: 'Artículo 2: Obligaciones del Operador',
          paragraphs: [
            'Prestar el servicio contratado de forma continua, eficiente y cumpliendo con las velocidades de descarga y subida simétrica pactadas en el plan comercial.',
            'Suministrar facturación clara e inteligible que discrimine detalladamente el costo de los servicios, consumos adicionales y el IVA correspondiente.',
            'Disponer de canales de atención presenciales, telefónicos y digitales idóneos para recibir y tramitar peticiones, quejas, reclamos y recursos.'
          ]
        },
        {
          title: 'Artículo 3: Obligaciones del Suscriptor',
          paragraphs: [
            'Pagar de manera oportuna el valor del cargo fijo mensual de su servicio antes de la fecha de vencimiento señalada en la factura.',
            'Dar un uso estrictamente residencial y privado a los servicios, quedando prohibida la reventa, distribución ilegal de señal o uso comercial no pactado de la red.',
            'Facilitar el acceso de técnicos de Cabletelco, plenamente identificados, para efectuar operaciones de reparación, verificación o retiro de equipos.'
          ]
        },
        {
          title: 'Artículo 4: Suspensión y Terminación del Servicio',
          paragraphs: [
            'La falta de pago oportuno de una factura mensual otorgará a Cabletelco el derecho de suspender el servicio al día calendario siguiente de la fecha límite de pago.',
            'El suscriptor puede solicitar la terminación del contrato en cualquier momento del mes. Dicha solicitud deberá presentarse con una anticipación mínima de tres (3) días hábiles a la fecha de facturación o corte, sin que el operador pueda exigir condiciones o trámites adicionales al usuario.'
          ]
        }
      ]
    },
    {
      id: 'resolucion-5111',
      title: 'Régimen de Protección de los Derechos de los Usuarios de Servicios de Comunicaciones',
      shortTitle: 'Resolución 5111 de 2017',
      code: 'RES-CRC-5111-17',
      subtitle: 'Estatuto general de derechos de los consumidores de telecomunicaciones en Colombia',
      date: '21 de Mayo de 2026',
      authority: 'Comisión de Regulación de Comunicaciones (CRC)',
      category: 'Legal',
      sections: [
        {
          title: 'Artículo 1: Propósito del Régimen',
          paragraphs: [
            'La Resolución CRC 5111 de 2017 establece las reglas de juego en materia de consumo de telecomunicaciones en Colombia, buscando equilibrar la relación comercial entre los operadores y los usuarios finales, garantizando que el usuario sea el centro de la regulación.'
          ]
        },
        {
          title: 'Artículo 2: Derechos Fundamentales del Usuario',
          paragraphs: [
            'Derecho a la libre elección: Elegir libremente el operador, el plan y los servicios sin condicionamientos abusivos.',
            'Derecho a la información: Recibir información clara, veraz, oportuna y completa sobre las tarifas, condiciones del plan y trámites.',
            'Derecho al debido trámite de PQR: Radicar solicitudes en cualquier momento y recibir respuesta de fondo dentro de los 15 días hábiles siguientes.',
            'Derecho a la facturación exacta: Pagar únicamente los servicios efectivamente contratados, consumidos y autorizados.'
          ]
        },
        {
          title: 'Artículo 3: Prohibición de Trámites Complejos',
          paragraphs: [
            'Los operadores no podrán imponer barreras o exigir documentos complejos para dar por terminado el contrato. El trámite de retiro de servicios debe ser tan rápido y sencillo como el proceso de contratación inicial.',
            'No es obligatorio presentarse físicamente a las oficinas para cancelar un servicio; puede realizarse mediante la página web, línea telefónica o app.'
          ]
        },
        {
          title: 'Artículo 4: Recurso de Reposición y Apelación',
          paragraphs: [
            'Frente a cualquier respuesta negativa o insatisfactoria a una queja formal por parte del operador, el usuario cuenta con el derecho de interponer el Recurso de Reposición (para que el operador revise su caso de nuevo) y en Subsidio de Apelación (para que la Superintendencia de Industria y Comercio evalúe y decida de forma definitiva sobre el reclamo).'
          ]
        }
      ]
    },
    {
      id: 'denuncia-pornografia',
      title: 'Protocolo de Prevención de la Explotación Sexual y Comercial Infantil en Internet',
      shortTitle: 'Denuncia pornografía infantil',
      code: 'PRO-LE-679-05',
      subtitle: 'Mecanismos de reporte y bloqueo de material de abuso sexual infantil',
      date: '21 de Mayo de 2026',
      authority: 'Policía Nacional de Colombia / Ministerio de las TIC / ICBF',
      category: 'Seguridad',
      sections: [
        {
          title: 'Artículo 1: Marco Legal y Obligatoriedad',
          paragraphs: [
            'En cumplimiento de lo ordenado por la Ley 679 de 2001 y la Ley 1336 de 2009, Osmas TV S.A.S. (Cabletelco) tiene la obligación de combatir de manera decidida la explotación sexual y comercial infantil en las redes globales de información.',
            'La compañía implementa bloqueos preventivos del tráfico hacia portales catalogados en las listas negras de la Policía Nacional y coopera activamente con la justicia para la persecución de delitos informáticos asociados.'
          ]
        },
        {
          title: 'Artículo 2: Deber de Denuncia Ciudadana',
          paragraphs: [
            'Toda persona que identifique páginas web, foros, redes sociales o transmisiones en línea que alojen, distribuyan, comercialicen o promuevan material de explotación sexual infantil, debe denunciarlo inmediatamente ante las autoridades.',
            'El reporte se puede hacer de manera totalmente anónima y no genera responsabilidades civiles o penales para el denunciante.'
          ]
        },
        {
          title: 'Artículo 3: Canales Directos de Denuncia en Colombia',
          paragraphs: [
            'Portal Web Te Protejo: www.teprotejo.org (Plataforma dedicada a la protección infantil en internet liderada por Red PaPaz).',
            'Línea de Atención ICBF: Línea 141 (Instituto Colombiano de Bienestar Familiar para emergencias infantiles).',
            'Policía Nacional - CAI Virtual: caivirtual.policia.gov.co (Para delitos informáticos y ciberseguridad).',
            'Fiscalía General de la Nación: www.fiscalia.gov.co o llamando a la línea gratuita nacional 01 8000 9197 48.'
          ]
        },
        {
          title: 'Artículo 4: Advertencia Legal de Delitos',
          paragraphs: [
            'La pornografía infantil es un delito de gravedad extrema en la legislación colombiana. Su almacenamiento, posesión, distribución o promoción conlleva penas de prisión de diez (10) a veinte (20) años sin derecho a beneficios de libertad condicional.'
          ]
        }
      ]
    },
    {
      id: 'cero-tolerancia',
      title: 'Política Institucional de Cero Tolerancia al Fraude y la Corrupción',
      shortTitle: 'Cero Tolerancia',
      code: 'POL-ZERO-TOL-06',
      subtitle: 'Directrices éticas para el comportamiento de colaboradores, proveedores y usuarios',
      date: '21 de Mayo de 2026',
      authority: 'Junta Directiva Osmas TV S.A.S.',
      category: 'Ética',
      sections: [
        {
          title: 'Artículo 1: Principios Éticos Corporativos',
          paragraphs: [
            'Osmas TV S.A.S. se rige bajo principios de honestidad, legalidad y transparencia. Mantenemos una política de Cero Tolerancia frente al soborno, el tráfico de influencias, la falsificación de documentos, el fraude financiero y cualquier otra conducta que atente contra la ética comercial y pública.'
          ]
        },
        {
          title: 'Artículo 2: Prohibición de Ofrecimientos e Incentivos Ilegales',
          paragraphs: [
            'Nuestros colaboradores técnicos y comerciales tienen estrictamente prohibido recibir o solicitar dinero, obsequios o prebendas a cambio de acelerar instalaciones, condonar deudas de facturación de manera ilegal, o alterar la configuración técnica de los equipos de red.',
            'De igual manera, se prohíbe a los usuarios u oferentes intentar sobornar al personal técnico para obtener conexiones de internet de manera irregular ("banda pirata").'
          ]
        },
        {
          title: 'Artículo 3: Prevención y Sanción de Delitos contra la Red',
          paragraphs: [
            'La manipulación clandestina de postes, corte ilegal de fibra óptica ajena, redireccionamiento de señales ("cajas piratas") y reventa no autorizada de servicios constituyen delitos penales en Colombia, tipificados en el Código Penal como hurto agravado y daño en bien ajeno.',
            'Cabletelco interpondrá denuncias penales formales ante la Fiscalía General de la Nación contra cualquier persona natural o jurídica involucrada en redes de fraude o sabotaje de nuestra infraestructura.'
          ]
        },
        {
          title: 'Artículo 4: No Discriminación y Clima de Respeto',
          paragraphs: [
            'Bajo el amparo de la Constitución Política de Colombia (Artículo 13), Cabletelco promueve un entorno de cero discriminación. Garantizamos que no discriminaremos a ningún usuario o empleado por motivos de origen, raza, género, religión u orientación política.',
            'Exigimos respeto mutuo: el maltrato físico o verbal del usuario hacia nuestros asesores en centros de experiencia o vía telefónica facultará a la empresa para terminar de manera unilateral el contrato de prestación de servicios.'
          ]
        }
      ]
    }
  ];

  // Escuchar cambios de hash en la URL
  useEffect(() => {
    const handleHashChange = () => {
      let hash = window.location.hash.replace('#', '');
      
      // Mapear hashes legacy/antiguos para mantener retrocompatibilidad
      if (hash === 'contrato') {
        hash = 'contrato-servicios';
      } else if (hash === 'neutralidad' || hash === 'derechos') {
        hash = 'resolucion-5111';
      }

      if (hash) {
        const matchedDoc = documents.find(d => d.id === hash);
        if (matchedDoc) {
          setActiveDocId(matchedDoc.id);
          setMobileView('viewer');

          // Desplazarse de forma suave al contenedor del documento
          setTimeout(() => {
            const documentEl = document.getElementById('printable-document');
            if (documentEl) {
              documentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
        }
      }
    };

    // Ejecutar al montar
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Filtrado de documentos según la búsqueda
  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.sections.some(s => s.paragraphs.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  // Obtener documento activo
  const activeDoc = documents.find(d => d.id === activeDocId) || documents[0];

  // Simulación de descarga
  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadSuccess(false);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            setDownloadSuccess(true);
            
            // Autoocultar el aviso de éxito
            setTimeout(() => setDownloadSuccess(false), 3000);
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 150);
  };

  // Impresión real (abre diálogo del sistema enfocado en el div del documento)
  const handlePrint = () => {
    window.print();
  };

  // Zoom
  const zoomIn = () => setZoomScale(prev => Math.min(prev + 10, 130));
  const zoomOut = () => setZoomScale(prev => Math.max(prev - 10, 80));
  const resetZoom = () => setZoomScale(100);

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16 selection:bg-[#e2532a] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de la página */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-4 border border-slate-300">
            Cumplimiento Regulatorio Oficial
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Regulaciones y Leyes
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            En cumplimiento de la legislación nacional y las directrices de la CRC y la SIC, ponemos a disposición del público general y de nuestros usuarios las normativas y términos contractuales de nuestros servicios.
          </p>
        </div>

        {/* Layout Principal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Panel Izquierdo: Sidebar de Temas (Oculto en móvil si el visor está activo) */}
          <div className={cn(
            "lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-md p-5 space-y-5 lg:block",
            mobileView === 'viewer' ? 'hidden' : 'block'
          )}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Buscador Regulatorio
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar ley, contrato, PQR..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#e2532a] focus:border-transparent text-sm bg-slate-50 transition-all text-slate-800"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                </svg>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Listado de Documentos
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                  {filteredDocs.length} {filteredDocs.length === 1 ? 'ítem' : 'ítems'}
                </span>
              </div>

              <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                {filteredDocs.length > 0 ? (
                  filteredDocs.map((doc) => {
                    const isActive = doc.id === activeDocId;
                    return (
                      <button
                        key={doc.id}
                        onClick={() => {
                          setActiveDocId(doc.id);
                          setMobileView('viewer');
                        }}
                        className={cn(
                          "w-full text-left p-3.5 rounded-xl transition-all duration-200 flex items-start gap-3 border outline-none group cursor-pointer",
                          isActive
                            ? "bg-[#e2532a]/5 border-[#e2532a] text-[#e2532a] shadow-xs"
                            : "bg-white border-slate-100 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                        )}
                      >
                        <span className={cn(
                          "flex-shrink-0 w-2.5 h-2.5 rounded-full mt-1.5 transition-transform duration-300 group-hover:scale-125",
                          isActive ? "bg-[#e2532a]" : "bg-slate-300 group-hover:bg-slate-400"
                        )} />
                        <div>
                          <p className={cn(
                            "font-extrabold text-sm leading-tight transition-colors",
                            isActive ? "text-[#e2532a]" : "text-slate-900"
                          )}>
                            {doc.shortTitle}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={cn(
                              "text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm",
                              doc.category === 'Legal' && "bg-blue-50 text-blue-600 border border-blue-100",
                              doc.category === 'Técnico' && "bg-purple-50 text-purple-600 border border-purple-100",
                              doc.category === 'Comercial' && "bg-amber-50 text-amber-600 border border-amber-100",
                              doc.category === 'Seguridad' && "bg-emerald-50 text-emerald-600 border border-emerald-100",
                              doc.category === 'Ética' && "bg-rose-50 text-rose-600 border border-rose-100"
                            )}>
                              {doc.category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">{doc.code}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="text-center py-8 px-4 text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 mx-auto text-slate-300 mb-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
                    </svg>
                    <p className="text-xs font-semibold">No se encontraron documentos.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Ayuda y Enlace PQR */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <span>💬</span> ¿Tienes alguna duda regulatoria?
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Si requieres interponer una petición, queja o recurso formal (PQR) puedes radicarlo en línea inmediatamente.
              </p>
              <div className="flex gap-2">
                <a
                  href="/legal/pqr"
                  className="flex-1 text-center py-2 bg-[#e2532a] hover:bg-[#d04620] text-white text-xs font-extrabold rounded-lg transition-colors shadow-xs"
                >
                  Radicar PQR
                </a>
                <a
                  href="https://www.sic.gov.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-extrabold rounded-lg transition-colors border border-slate-300/80 shadow-xs"
                >
                  Portal SIC
                </a>
              </div>
            </div>
          </div>

          {/* Panel Derecho: Visor Digital de Documento (A4 PDF Simulator) */}
          <div className={cn(
            "lg:col-span-8 flex flex-col space-y-4",
            mobileView === 'list' ? 'hidden lg:flex' : 'flex'
          )}>
            
            {/* Barra de Herramientas del Visor */}
            <div className="bg-slate-100 text-slate-800 px-4 py-3 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-sm border border-slate-200">
              
              {/* Botón Volver (Móvil únicamente) */}
              <button
                onClick={() => setMobileView('list')}
                className="lg:hidden flex items-center gap-1 bg-slate-200 hover:bg-slate-300 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-slate-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Volver a la Lista
              </button>

              <div className="hidden sm:flex items-center gap-2">
                <div className="bg-[#e2532a] w-2 h-2 rounded-full animate-pulse" />
                <span className="text-xs font-bold tracking-wider font-mono text-slate-500 uppercase">
                  Visor Oficial de PDF
                </span>
              </div>

              {/* Controles de Zoom */}
              <div className="flex items-center gap-1">
                <button
                  onClick={zoomOut}
                  disabled={zoomScale <= 80}
                  className="p-1.5 bg-slate-200 hover:bg-slate-350 rounded-lg text-slate-700 disabled:opacity-50 transition-colors cursor-pointer"
                  title="Reducir Texto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                  </svg>
                </button>
                <button
                  onClick={resetZoom}
                  className="px-2 py-1 bg-slate-200 hover:bg-slate-350 rounded-lg text-[10px] font-mono font-bold text-slate-700 transition-colors"
                  title="Restablecer Zoom"
                >
                  {zoomScale}%
                </button>
                <button
                  onClick={zoomIn}
                  disabled={zoomScale >= 130}
                  className="p-1.5 bg-slate-200 hover:bg-slate-350 rounded-lg text-slate-700 disabled:opacity-50 transition-colors cursor-pointer"
                  title="Aumentar Texto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
              </div>

              {/* Acciones del Archivo */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 bg-slate-200 hover:bg-slate-350 text-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors border border-slate-300 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" className="w-3.5 h-3.5 text-slate-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.821V7.5a3.75 3.75 0 1 1 7.5 0v6.321m-10.5 0a3.75 3.75 0 1 1 7.5 0m-7.5 0h7.5m-.001 0h1.5a2.25 2.25 0 0 1 2.25 2.25v1.875c0 .621-.504 1.125-1.125 1.125H2.25A1.125 1.125 0 0 1 1.125 16.5v-1.875a2.25 2.25 0 0 1 2.25-2.25h1.5" />
                  </svg>
                  <span>Imprimir</span>
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-1.5 bg-[#e2532a] hover:bg-[#d04620] disabled:bg-slate-300 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>Descargar</span>
                </button>
              </div>
            </div>

            {/* Aviso de Éxito de Descarga */}
            {downloadSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 text-xs font-bold flex items-center gap-2 animate-fade-in shadow-xs">
                <span className="text-base">✓</span>
                <span>¡Documento `{activeDoc.code}.pdf` generado y descargado con éxito en su carpeta local! (Simulación completa)</span>
              </div>
            )}

            {/* Canvas del lector PDF */}
            <div className="relative bg-slate-200/50 p-4 sm:p-6 rounded-2xl border border-slate-250 shadow-inner overflow-hidden flex justify-center h-[78vh] min-h-[620px]">
              
              {/* Overlay de Carga durante la Descarga */}
              {isDownloading && (
                <div className="absolute inset-0 bg-white/90 z-20 flex flex-col items-center justify-center text-slate-800 px-6">
                  <div className="w-full max-w-xs space-y-4">
                    <div className="flex justify-between text-xs font-bold tracking-wider font-mono text-slate-700">
                      <span>GENERANDO PDF CERTIFICADO</span>
                      <span>{downloadProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden border border-slate-350/20">
                      <div
                        className="bg-[#e2532a] h-full rounded-full transition-all duration-150"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-center text-slate-500 font-sans italic animate-pulse">
                      Firmando digitalmente mediante algoritmos del operador Osmas TV S.A.S...
                    </p>
                  </div>
                </div>
              )}

              {/* La Hoja A4 como elemento imprimible */}
              <div
                id="printable-document"
                ref={documentRef}
                className="bg-white text-slate-800 w-full max-w-[850px] h-full border border-slate-350 shadow-2xl p-6 sm:p-10 relative flex flex-col justify-start transition-all duration-200 overflow-y-auto"
                style={{ fontSize: `${zoomScale}%` }}
              >
                {/* Sello de agua del fondo oficial */}
                <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.03] select-none">
                  <Logo showText={false} variant="vertical" className="w-[450px] h-[450px]" />
                </div>

                <div className="relative z-10 space-y-6 min-h-full">
                  {/* Membrete Oficial */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-300 gap-4">
                    <Logo showText={true} textColor="text-slate-800" className="scale-90 origin-left" />
                    <div className="text-left sm:text-right font-mono text-[9px] sm:text-[10px] text-slate-500 leading-tight">
                      <p className="font-extrabold text-slate-700">OSMAS TV S.A.S.</p>
                      <p>NIT: 900.234.567-8</p>
                      <p>Código Regulatorio: {activeDoc.code}</p>
                      <p>Bogotá D.C. - Colombia</p>
                    </div>
                  </div>

                  {/* Título del Documento */}
                  <div className="space-y-1.5 text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                      {activeDoc.title}
                    </h2>
                    <p className="text-xs font-semibold text-[#e2532a] font-sans">
                      {activeDoc.subtitle}
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1 text-[10px] text-slate-400 font-mono">
                      <span>Fecha de Emisión: {activeDoc.date}</span>
                      <span className="hidden sm:inline">|</span>
                      <span>Autoridad: {activeDoc.authority}</span>
                    </div>
                  </div>

                  {/* Cuerpo del Documento */}
                  <div className="space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify pb-6">
                    {activeDoc.sections.map((section, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="font-extrabold text-slate-900 border-l-2 border-[#e2532a] pl-2 text-xs sm:text-sm uppercase tracking-wide">
                          {section.title}
                        </h4>
                        {section.paragraphs.map((p, pidx) => (
                          <p key={pidx} className="text-slate-600">
                            {p}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pie de Página del Documento */}
                <div className="relative z-10 pt-6 border-t border-slate-350/70 mt-8 text-[9px] text-slate-400 font-mono leading-tight space-y-3 flex-shrink-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Documento radicado y vigilado ante autoridades nacionales.</span>
                    </div>
                    
                    {/* Logos Oficiales en miniatura */}
                    <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/50 px-2 py-0.5 rounded-md">
                      <MinTicLogo className="scale-75 origin-left opacity-75" />
                      <div className="w-[1px] h-3.5 bg-slate-200" />
                      <CrcLogo className="scale-75 origin-left opacity-75" />
                      <div className="w-[1px] h-3.5 bg-slate-200" />
                      <SicLogo className="scale-75 origin-left opacity-75" />
                    </div>
                  </div>
                  <div className="flex justify-between text-[8px] text-slate-400">
                    <p className="font-sans italic">
                      Este documento se encuentra digitalizado bajo la norma NTC-ISO 27001 para seguridad de la información.
                    </p>
                    <span>Página 1 de 1</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Sección de Entidades de Regulación y Vigilancia */}
        <div className="mt-16 border-t border-slate-200 pt-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Entidades de Regulación y Vigilancia
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Conoce las instituciones colombianas encargadas de regular, inspeccionar y vigilar el correcto suministro de nuestros servicios y la protección de tus derechos como usuario.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card MinTIC */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-4">
                <MinTicLogo className="scale-110 origin-left" />
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                  Ministerio
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-[#e2532a] transition-colors">
                MinTIC
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                El Ministerio de Tecnologías de la Información y las Comunicaciones diseña, adopta y promueve las políticas, planes, programas y proyectos del sector TIC en Colombia.
              </p>
              <a 
                href="https://www.mintic.gov.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-[#e2532a] hover:text-[#d04620] transition-colors gap-1.5"
              >
                <span>Visitar mintic.gov.co</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>

            {/* Card CRC */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-4">
                <CrcLogo className="scale-110 origin-left" />
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-orange-50 text-[#e2532a] border border-orange-100">
                  Comisión
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-[#e2532a] transition-colors">
                CRC Colombia
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                La Comisión de Regulación de Comunicaciones promueve la competencia, evita el abuso de posición dominante y regula los mercados de redes y servicios de comunicaciones.
              </p>
              <a 
                href="https://www.crcom.gov.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-[#e2532a] hover:text-[#d04620] transition-colors gap-1.5"
              >
                <span>Visitar crcom.gov.co</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>

            {/* Card SIC */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
              <div className="flex items-center justify-between mb-4">
                <SicLogo className="scale-110 origin-left" />
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-150">
                  Superintendencia
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-[#e2532a] transition-colors">
                SIC Colombia
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4">
                La Superintendencia de Industria y Comercio protege los derechos de los consumidores, la libre competencia y actúa como segunda instancia para la resolución de PQR.
              </p>
              <a 
                href="https://www.sic.gov.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-[#e2532a] hover:text-[#d04620] transition-colors gap-1.5"
              >
                <span>Visitar sic.gov.co</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Sección de Denuncias de Explotación Sexual Infantil en Internet */}
        <div className="mt-16 border-t border-slate-200 pt-12">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Puedes Presentar Denuncias Por Pornografía Infantil En Los Siguientes Enlaces
            </h2>
            <p className="text-slate-500 text-sm mt-3">
              Si identificas contenido de explotación sexual infantil en internet, repórtalo de inmediato en estos canales oficiales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col items-center text-center gap-4">
              <div className="w-full h-28 rounded-xl bg-white border border-emerald-100 flex items-center justify-center px-3 overflow-hidden">
                <svg viewBox="0 0 320 120" className="w-full h-full" role="img" aria-label="Bienestar Familiar">
                  <rect width="320" height="120" fill="white" />
                  <path d="M88 92c-17-25-18-48-1-65 8-8 18-12 30-12 8 0 16 2 23 6-8 7-14 15-17 24-4 12-4 26 0 44H88Z" fill="#74c044" />
                  <path d="M232 92c17-25 18-48 1-65-8-8-18-12-30-12-8 0-16 2-23 6 8 7 14 15 17 24 4 12 4 26 0 44h35Z" fill="#74c044" />
                  <circle cx="138" cy="33" r="10" fill="#231f20" />
                  <circle cx="160" cy="26" r="10" fill="#231f20" />
                  <circle cx="182" cy="33" r="10" fill="#231f20" />
                  <path d="M131 58c0-17 13-30 29-30s29 13 29 30v28h-58V58Z" fill="#231f20" opacity="0.95" />
                  <rect x="116" y="95" width="88" height="6" rx="3" fill="#74c044" />
                </svg>
              </div>
              <a
                href="https://www.icbf.gov.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center py-2.5 rounded-lg bg-[#5b4695] hover:bg-[#4f3f82] text-white text-sm font-extrabold transition-colors"
              >
                Denuncie Aquí
              </a>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col items-center text-center gap-4">
              <div className="w-full h-28 rounded-xl bg-white border border-lime-100 flex items-center justify-center px-3 overflow-hidden">
                <svg viewBox="0 0 320 120" className="w-full h-full" role="img" aria-label="Centro Cibernetico Policial">
                  <rect width="320" height="120" fill="white" />
                  <circle cx="120" cy="64" r="35" fill="none" stroke="#8bc34a" strokeWidth="6" opacity="0.85" />
                  <circle cx="120" cy="64" r="24" fill="none" stroke="#cddc39" strokeWidth="5" opacity="0.9" />
                  <circle cx="120" cy="64" r="14" fill="#1f2937" />
                  <text x="160" y="54" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#6b7280">CENTRO</text>
                  <text x="160" y="80" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="800" fill="#315b54">CIBERNÉTICO POLICIAL</text>
                </svg>
              </div>
              <a
                href="https://caivirtual.policia.gov.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center py-2.5 rounded-lg bg-[#5b4695] hover:bg-[#4f3f82] text-white text-sm font-extrabold transition-colors"
              >
                Denuncie Aquí
              </a>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col items-center text-center gap-4">
              <div className="w-full h-28 rounded-xl bg-white border border-fuchsia-100 flex items-center justify-center px-3 overflow-hidden">
                <svg viewBox="0 0 320 120" className="w-full h-full" role="img" aria-label="En TIC Confio">
                  <rect width="320" height="120" fill="white" />
                  <rect x="92" y="18" width="136" height="84" rx="22" fill="#c21872" />
                  <text x="120" y="54" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="900" fill="white">en</text>
                  <text x="157" y="52" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="900" fill="#ffeb3b">TIC</text>
                  <text x="116" y="80" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="900" fill="white">Confio</text>
                  <text x="198" y="80" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="900" fill="white">+</text>
                </svg>
              </div>
              <a
                href="https://ciberpaz.gov.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center py-2.5 rounded-lg bg-[#5b4695] hover:bg-[#4f3f82] text-white text-sm font-extrabold transition-colors"
              >
                Denuncie Aquí
              </a>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col items-center text-center gap-4">
              <div className="w-full h-28 rounded-xl bg-white border border-blue-100 flex items-center justify-center px-3 overflow-hidden">
                <svg viewBox="0 0 320 120" className="w-full h-full" role="img" aria-label="Fiscalia General de la Nacion">
                  <rect width="320" height="120" fill="white" />
                  <rect x="114" y="18" width="92" height="84" rx="8" fill="#23408e" />
                  <path d="M160 28l10 10-10 10-10-10 10-10Z" fill="#f1c40f" />
                  <rect x="154" y="30" width="12" height="60" rx="6" fill="#f1c40f" />
                  <path d="M136 48l10-10 10 10-10 10-10-10Zm38-10l10 10-10 10-10-10 10-10Zm-38 34l10-10 10 10-10 10-10-10Zm38-10l10 10-10 10-10-10 10-10Z" fill="#f1c40f" opacity="0.95" />
                  <text x="160" y="104" textAnchor="middle" fontFamily="Georgia, serif" fontSize="24" fontWeight="700" fill="#d7261e">FISCALÍA</text>
                </svg>
              </div>
              <a
                href="https://www.fiscalia.gov.co/colombia/servicios-de-informacion-al-ciudadano/donde-y-como-denunciar/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center py-2.5 rounded-lg bg-[#5b4695] hover:bg-[#4f3f82] text-white text-sm font-extrabold transition-colors"
              >
                Denuncie Aquí
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
