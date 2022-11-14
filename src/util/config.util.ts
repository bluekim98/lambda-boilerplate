export enum PROCESS_STAGE {
    PRODUCTION = 'PRODUCTION',
    STAGING = 'STAGING',
    LOCALHOST = 'LOCALHOST',
}
export const getStage = (): PROCESS_STAGE => {
    switch (process.env.stage) {
        case 'production':
        case 'prod':
        case 'prd':
            return PROCESS_STAGE.PRODUCTION;
        case 'stg':
            return PROCESS_STAGE.STAGING;
        case 'local':
            return PROCESS_STAGE.LOCALHOST;
        default:
            return PROCESS_STAGE.LOCALHOST;
    }
};
