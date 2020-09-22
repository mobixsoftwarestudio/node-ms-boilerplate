"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateHourAndMinutes = ({ date, hour, minutes, seconds, }) => {
    try {
        return new Date(new Date(date).setHours(hour, minutes, seconds));
    }
    catch (error) {
        return 'Date is invalid';
    }
};
exports.isDate = (x) => {
    const date = new Date(x);
    return Object.prototype.toString.call(date) === '[object Date]';
};
exports.default = (req) => {
    const findOptions = {};
    if (req.query.createdAtInitial && exports.isDate(req.query.createdAtInitial)) {
        findOptions['createdAt'] = {
            $gte: exports.formatDateHourAndMinutes({
                date: req.query.createdAtInitial,
                hour: 0,
                minutes: 0,
                seconds: 0,
            }),
        };
    }
    if (req.query.createdAtFinal && exports.isDate(req.query.createdAtFinal)) {
        findOptions['createdAt'] = Object.assign(Object.assign({}, findOptions.createdAt), { $lte: exports.formatDateHourAndMinutes({
                date: req.query.createdAtFinal,
                hour: 23,
                minutes: 59,
                seconds: 59,
            }) });
    }
    if (req.query.updatedAtInitial && exports.isDate(req.query.updatedAtInitial)) {
        findOptions['updatedAt'] = {
            $gte: exports.formatDateHourAndMinutes({
                date: req.query.updatedAtInitial,
                hour: 0,
                minutes: 0,
                seconds: 0,
            }),
        };
    }
    if (req.query.updatedAtFinal && exports.isDate(req.query.updatedAtFinal)) {
        findOptions['updatedAt'] = Object.assign(Object.assign({}, findOptions.updatedAt), { $lte: exports.formatDateHourAndMinutes({
                date: req.query.updatedAtFinal,
                hour: 23,
                minutes: 59,
                seconds: 59,
            }) });
    }
    return findOptions;
};
//# sourceMappingURL=filterDate.js.map