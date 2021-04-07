//用于判断当前的环境
const ZZUOJ_PRODUCTION = process.env.NODE_ENV === 'production';
const ZZUOJ_DEV = process.env.NODE_ENV === 'development';

export const ZZUOJ_ENV = {
    PROD: ZZUOJ_PRODUCTION,
    DEV: ZZUOJ_DEV,
};
