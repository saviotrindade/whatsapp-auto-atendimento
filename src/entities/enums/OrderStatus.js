class OrderStatus {
    static PENDING = 'pendente';
    static IN_PRODUCTION = 'produção';
    static IN_DELIVERY = 'enviado';
    static COMPLETED = 'concluído';
    static CANCELED = 'cancelado';
}

module.exports = { OrderStatus };