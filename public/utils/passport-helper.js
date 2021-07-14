"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const JWT_AUDIENCE = 'mobixtec.com';
const JWT_ISSUER = 'accounts.mobixtec.com';
const JWT_SECRET = process.env.JWT_SECRET;
const jwtOpts = {
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
};
const usePassport = () => {
    const jwtStrategy = new passport_jwt_1.default.Strategy(jwtOpts, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        return done(null, payload);
    }));
    passport_1.default.use(jwtStrategy);
};
exports.usePassport = usePassport;
//# sourceMappingURL=passport-helper.js.map