class Messages {
    static welcome() {
        return "\`\`\`Olá e bem-vindo à nossa loja! 🌟 Como posso ajudá-lo hoje?\`\`\`\n\n- Para fazer um pedido, digite \`0\`.\n- Para verificar o status de um pedido, digite \`1\`.\n- Para cancelar um pedido, digite \`2\`.\n- Para falar com um de nossos atendentes, digite \`3\`.\n\nEstamos aqui para tornar sua experiência conosco a melhor possível. 😊"
    }

    static notFound() {
        return "Desculpe, não reconheci essa opção. 🤔 Por favor, escolha uma das opções listadas abaixo:\n\n- Para fazer um pedido, digite \`0\`.\n- Para verificar o status de um pedido, digite \`1\`.\n- Para cancelar um pedido, digite \`2\`.\n- Para falar com um de nossos atendentes, digite \`3\`.\n\nSe precisar de mais ajuda, estou aqui para ajudar! 😊"
    }

    static orderRequest() {
        return "Ótimo! Por favor, informe os detalhes do seu pedido agora. 📝\n\nDigite o nome do produto, a quantidade desejada e qualquer outra informação relevante para que possamos processar seu pedido. 😊"
    }
    
    static orderSuccess() {
        return "\`\`\`🎉 Parabéns! Seu pedido foi efetuado com sucesso! 🎉\`\`\`\n\nAgradecemos por escolher nossa loja. Seu pedido está sendo processado e você receberá atualizações sobre o status em breve.\n\nCaso precise de mais alguma coisa, não hesite em nos contatar. Estamos sempre aqui para ajudar! 😊"
    }
    
    static orderError() {
        return "Lamentamos informar que não foi possível processar seu pedido neste momento. 🙁\n\nPor favor, verifique se todos os detalhes estão corretos e tente novamente. Se o problema persistir, entre em contato com nosso suporte para obter assistência.\n\nAgradecemos sua compreensão e esperamos poder atendê-lo melhor da próxima vez."
    }
    
    static orderCanceled() {
        return "Lamentamos informar que seu pedido foi cancelado.\n\nEntendemos que podem surgir circunstâncias imprevistas e estamos aqui para ajudar com qualquer dúvida ou problema que possa ter surgido durante o processo de pedido.\n\nSe precisar de mais assistência ou quiser discutir alguma coisa, não hesite em nos contatar. Estamos aqui para ajudar e esperamos poder atendê-lo melhor no futuro. Obrigado pela compreensão."
    }
    
    static deliveryRequest() {
        return "Para concluir seu pedido, precisamos saber o local de entrega. 📍\n\nPor favor, informe o endereço completo onde deseja receber o seu pedido, incluindo rua, número, bairro e ponto de referência."
    }

    static addressRequest() {
        return "Para processar seu pedido com precisão, solicitamos que você forneça todas as informações de entrega em uma única mensagem. 🏡\n\nPor favor, inclua as seguintes informações:\n\n- Nome da rua\n- Número da casa\n- Cor da casa\n- Ponto de referência (algo que nos ajude a localizar sua residência mais facilmente)\n\nAgradecemos sua colaboração! Estamos prontos para prosseguir com o seu pedido assim que recebermos seus dados. 😊"
    }

    static addressError() {
        return "Desculpe, parece que houve um erro ao processar as informações do endereço fornecido. 🚫\n\nPor favor, verifique se todos os detalhes estão corretos e tente novamente. Se o problema persistir, entre em contato com nosso suporte para obter assistência."
    }
}

module.exports = { Messages };