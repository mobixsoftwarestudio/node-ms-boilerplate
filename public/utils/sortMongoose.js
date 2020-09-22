"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.formatFieldQueryStringAggregate = (field) => field
    .split(',')
    .map((item) => item.trim())
    .map((item) => {
    const newItem = item.split('-');
    const sort = {};
    if (newItem.length === 1)
        sort[newItem[0]] = 1;
    else
        sort[newItem[1]] = -1;
    return sort;
})
    .reduce((map, item) => (Object.assign(Object.assign({}, map), { item })));
exports.formatFieldQueryString = (field) => field
    .split(',')
    .map((item) => item.trim())
    .map((item) => {
    const newItem = item.split('-');
    let sort = [];
    if (newItem.length === 1)
        sort = sort.concat([newItem[0], 1]);
    else
        sort = sort.concat([newItem[1], -1]);
    return sort;
});
exports.sortFieldQueryString = (field) => !!field && lodash_1.isString(field) ? exports.formatFieldQueryString(field) : [['_id', -1]];
exports.sortFieldQueryStringAggreate = (field) => !!field && lodash_1.isString(field) ? exports.formatFieldQueryStringAggregate(field) : { _id: -1 };
//# sourceMappingURL=sortMongoose.js.map