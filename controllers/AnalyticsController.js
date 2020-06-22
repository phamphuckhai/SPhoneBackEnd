import {orderDetails, orders, products, Sequelize, sequelize} from '../models';

const {gte, lte, and} = Sequelize.Op;

function getTopProduct(begin, end, by) {
    return products.findAll({
        include: [
            {
                model: orderDetails,
                as: 'orderDetails',
                attributes: [],
                where: {
                    [and]: [
                        sequelize.where(sequelize.fn(by, sequelize.col('createdAt')), {[gte]: begin}),
                        sequelize.where(sequelize.fn(by, sequelize.col('createdAt')), {[lte]: end})
                    ]
                },
            }
        ],
        attributes: [
            'id',
            'name',
            [sequelize.fn(by, sequelize.col('createdAt')), by],
            [sequelize.fn('SUM', sequelize.col('orderDetails.quantity')), 'quantity'],
        ],
        raw: true, //The god who saved me
        group: 'id',
        order: [[sequelize.fn('SUM', sequelize.col('orderDetails.quantity')), 'DESC']]
    });
}

function getRevenue(begin, end, by) {
    return orders.findAll({
        where: {
            [and]: [
                sequelize.where(sequelize.fn(by, sequelize.col('createdAt')), {[gte]: begin}),
                sequelize.where(sequelize.fn(by, sequelize.col('createdAt')), {[lte]: end})
            ]
        },
        include: [
            {model: orderDetails, as: 'orderDetail', attributes: []}
        ],
        attributes: [
            [sequelize.fn(by, sequelize.col('createdAt')), by],
            [sequelize.fn('SUM', sequelize.col('orderDetail.interest')), 'revenue'],
        ],
        raw: true, //The god who saved the day
        group: [sequelize.fn(by, sequelize.col('createdAt'))]
    });
}

export async function analyticsController(req, res) {
    const obj = {};
    let {begin, end, by} = req.body;
    switch (by) {
        case 'MONTH':
            begin = new Date(begin);
            begin = begin.getMonth() + 1;
            end = new Date(end);
            end = end.getMonth() + 1;
            break;
        case 'YEAR':
            begin = new Date(begin);
            begin = begin.getFullYear();
            end = new Date(end);
            end = end.getFullYear();
            break;
        default:
            throw new Error('Invalid Input');
    }

    try {
        obj.revenues = await getRevenue(begin, end, by);
        obj.topProducts = await getTopProduct(begin, end, by);
    } catch (e) {
        res.send(e.message);
    }
    res.send(obj);
}
