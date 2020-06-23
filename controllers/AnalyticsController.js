import {Customer, orderDetails, orders, products, sequelize, Sequelize, users} from '../models';
import moment from "moment";

const {gte, lte, and, eq} = Sequelize.Op;

function getTopProduct(begin, end, by) {
    return products.findAll({
        include: [
            {
                model: orderDetails,
                as: 'orderDetails',
                attributes: [],
                where: {
                    [and]: [
                        sequelize.where(sequelize.col('createdAt'), {[gte]: begin}),
                        sequelize.where(sequelize.col('createdAt'), {[lte]: end})
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
                sequelize.where(sequelize.col('createdAt'), {[gte]: begin}),
                sequelize.where(sequelize.col('createdAt'), {[lte]: end})
            ]
        },
        include: [
            {model: orderDetails, as: 'orderDetail', attributes: []}
        ],
        attributes: [
            [sequelize.fn(by, sequelize.col('createdAt')), by],
            [sequelize.fn('YEAR', sequelize.col('createdAt')), 'YEAR'],
            [sequelize.fn('SUM', sequelize.col('orderDetail.interest')), 'revenue'],
        ],
        raw: true, //The god who saved the day
        group: [[sequelize.fn(by, sequelize.col('createdAt'))], [sequelize.fn('YEAR', sequelize.col('createdAt'))]],
        order: [[sequelize.fn(by, sequelize.col('createdAt')), 'ASC']]
    });
}

async function getCurMonthRevenue() {
    const by = 'MONTH';
    const month = new Date().getUTCMonth() + 1;
    return orders.findAll({
        where: sequelize.where(sequelize.fn(by, sequelize.col('createdAt')), {[eq]: month}),
        include: [
            {model: orderDetails, as: 'orderDetail', attributes: []}
        ],
        attributes: [
            [sequelize.fn(by, sequelize.col('createdAt')), by],
            [sequelize.fn('SUM', sequelize.col('orderDetail.interest')), 'revenue'],
        ],
        raw: true, //The god who saved the day
        group: [sequelize.fn(by, sequelize.col('createdAt'))],
        order: [[sequelize.fn(by, sequelize.col('createdAt')), 'ASC']]
    });
}

async function getNumberOfUser() {
    return users.count();
}

async function getNumerOfCustomer() {
    return Customer.count();
}

function getMonday(d) {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}


export async function analyticsController(req, res) {
    let obj = {};
    // console.log('body', req.query);
    let {
        begin = moment().startOf('year').toDate(),
        end = moment().endOf('year').toDate(),
        by = 'MONTH'
    } = req.query;

    try {
        const now = new Date();
        const [revenues, topProducts, numberOfUser, numberOfCustomer, curMonthRevenue] = await Promise.all([
            getRevenue(begin, end, by),
            getTopProduct(begin, end, by),
            getNumberOfUser(),
            getNumerOfCustomer(),
            getCurMonthRevenue()
            // getRevenue(now.getUTCMonth() + 1, now.getUTCMonth() + 1, 'MONTH'),
            // getRevenue(now.getFullYear(), now.getFullYear(), 'YEAR')
        ]);
        obj = {revenues, topProducts, numberOfUser, numberOfCustomer, curMonthRevenue}

        // obj.month = curMonth;
        // obj.year = curYear;
    } catch (e) {
        res.send(e.message);
    }
    res.send(obj);
}
