"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const TaskSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
}, {
    timestamps: true,
});
TaskSchema.methods.serialize = function () {
    const obj = {
        _id: this._id,
        title: this.title,
        description: this.description,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
    return obj;
};
exports.default = mongoose_1.default.model('Task', TaskSchema);
//# sourceMappingURL=task.js.map