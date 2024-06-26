class OrderStatus {
    static PENDING = 'pendente';
    static IN_PRODUCTION = 'em produção';
    static IN_DELIVERY = 'em rota de entrega';
    static COMPLETED = 'concluído';
    static CANCELED = 'cancelado';
}

module.exports = { OrderStatus };