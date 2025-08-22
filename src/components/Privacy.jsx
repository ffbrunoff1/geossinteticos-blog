import React, { useEffect } from 'react'

export default function Privacy() {
  useEffect(() => {
    // Scroll para o topo da página quando o componente for montado
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 xl:pl-80">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              Política de Privacidade
            </h1>
            
            <div className="space-y-8 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Introdução
                </h2>
                <p className="text-lg leading-relaxed">
                  Esta Política de Privacidade descreve como o Geossintéticos.Blog coleta, usa e protege suas informações pessoais quando você visita nosso site. 
                  Comprometemo-nos a proteger sua privacidade e a usar suas informações apenas para melhorar sua experiência em nosso portal.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Coleta e Uso de Informações
                </h2>
                <p className="text-lg leading-relaxed">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros sem seu consentimento explícito, 
                  exceto quando exigido por lei. Utilizamos cookies e tecnologias similares para melhorar a funcionalidade do site e analisar o tráfego.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Cookies e Tecnologias
                </h2>
                <p className="text-lg leading-relaxed">
                  Você pode desativar os cookies em seu navegador a qualquer momento, embora isso possa afetar algumas funcionalidades do site. 
                  Nossas tecnologias são utilizadas exclusivamente para melhorar sua experiência de navegação.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Segurança das Informações
                </h2>
                <p className="text-lg leading-relaxed">
                  Suas informações são armazenadas de forma segura e implementamos medidas de segurança adequadas para protegê-las contra acesso não autorizado. 
                  Utilizamos protocolos de criptografia e práticas de segurança recomendadas pela indústria.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Atualizações da Política
                </h2>
                <p className="text-lg leading-relaxed">
                  Reservamo-nos o direito de atualizar esta política periodicamente, notificando sobre mudanças significativas através do site. 
                  Recomendamos que você revise esta política regularmente para se manter informado sobre nossas práticas de privacidade.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Contato
                </h2>
                <p className="text-lg leading-relaxed">
                  Se você tiver dúvidas sobre esta política ou sobre como tratamos suas informações, entre em contato conosco através dos canais disponíveis no site. 
                  Nossa equipe está pronta para esclarecer qualquer questão relacionada à sua privacidade.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
